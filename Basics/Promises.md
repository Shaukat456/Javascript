# Async JavaScript Mastery

## Sync vs Async · Callbacks · Promises · Async/Await · Error Handling · Interview Q&A

> Built foundation-first. Every concept earns its place before the next one appears.

---

## How This Guide Is Structured

```
Mental Model → JS Engine → Sync vs Async → Callbacks → Promises →
Async/Await → Error Handling → Advanced Patterns → Interview Q&A
```

Never skip a section. Each one is the foundation of the next.

---

## Part 0 — The Mental Model You Must Build First

### JavaScript is single-threaded

This is the most important sentence in this entire guide.

JavaScript has **one call stack**. It can do exactly **one thing at a time**. There is no parallel execution of your code. If a function is running, nothing else can run until it finishes.

This raises an obvious question: how does a browser stay responsive while fetching data from a server? How does Node.js handle thousands of requests? The answer is the **Event Loop** — and understanding it changes everything.

### The four components that make async possible

```
┌─────────────────────────────────────────────────────────────────┐
│                        Your JS Code                             │
├─────────────────────────────────────────────────────────────────┤
│                         Call Stack                              │
│         (where functions execute — LIFO order)                  │
├──────────────────────┬──────────────────────────────────────────┤
│    Web APIs /        │         Callback Queue                   │
│    Node APIs         │    (waiting to get on the stack)         │
│  (setTimeout,        ├──────────────────────────────────────────┤
│   fetch, fs, etc.)   │       Microtask Queue                    │
│                      │   (Promise callbacks — higher priority)  │
└──────────────────────┴──────────────────────────────────────────┘
                              ↑
                         Event Loop
              (watches: is the call stack empty?
               if yes, move the next task in)
```

**The Event Loop's single job:** When the call stack is empty, check the microtask queue first (drain it completely), then pick one task from the callback queue and push it onto the stack.

---

## Part 1 — Synchronous JavaScript

### How the call stack works

```javascript
// Every function call creates a "stack frame" — pushed onto the stack
// When the function returns, the frame is popped off

function multiply(a, b) {
  return a * b; // 3. runs, returns 50, frame popped
}

function square(n) {
  return multiply(n, n); // 2. calls multiply — new frame pushed
} // returns 2500, frame popped

function printSquare(n) {
  const result = square(n); // 1. calls square — new frame pushed
  console.log(result); // 4. logs 2500
}

printSquare(50);

// Call stack progression:
// [printSquare]
// [printSquare] [square]
// [printSquare] [square] [multiply]
// [printSquare] [square]    ← multiply returned
// [printSquare]             ← square returned
// []                        ← printSquare returned
```

### The blocking problem

Synchronous code that takes time **blocks everything** — no clicks, no renders, no other code runs.

```javascript
// This blocks the entire thread for ~3 seconds
function slowOperation() {
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // busy-waiting — the thread is completely frozen
  }
  return "done";
}

console.log("before");
const result = slowOperation(); // UI is FROZEN for 3 seconds here
console.log("after"); // only runs after the 3 seconds

// Real consequence: if you do this in a browser, the page freezes.
// The user cannot scroll, click, or interact with anything.
// In Node.js, no other requests can be handled during this time.
```

This is why we need asynchronous code — for anything that involves **waiting** (network, disk, timers, user input).

---

## Part 2 — Asynchronous JavaScript and the Event Loop

### How async operations actually work

When you call an async API (like `fetch` or `setTimeout`), JavaScript hands the work to the **browser/Node.js runtime** (C++ under the hood), which has real threads and can do I/O without blocking your JS thread. When the work is done, the runtime puts the callback in the queue.

```javascript
console.log("1 — start"); // sync: runs immediately

setTimeout(() => {
  console.log("2 — timeout"); // async: goes to Web API, comes back later
}, 0); // even with 0ms, still async!

console.log("3 — end"); // sync: runs immediately

// Output:
// 1 — start
// 3 — end
// 2 — timeout     ← even though 0ms, it goes through the queue
```

### The microtask queue — Promises get priority

```javascript
console.log("1 — sync start");

setTimeout(() => {
  console.log("4 — setTimeout callback"); // macro-task queue
}, 0);

Promise.resolve().then(() => {
  console.log("3 — promise .then"); // microtask queue
});

console.log("2 — sync end");

// Output:
// 1 — sync start
// 2 — sync end
// 3 — promise .then     ← microtasks drain BEFORE the next macro-task
// 4 — setTimeout callback

// Rule: After each macro-task, ALL microtasks run before the next macro-task.
```

### A complete Event Loop trace

```javascript
console.log("script start"); // 1

setTimeout(() => {
  console.log("setTimeout 1"); // 6
}, 0);

setTimeout(() => {
  console.log("setTimeout 2"); // 7
}, 0);

Promise.resolve()
  .then(() => {
    console.log("promise 1"); // 4
    return Promise.resolve();
  })
  .then(() => {
    console.log("promise 2"); // 5
  });

Promise.resolve().then(() => {
  console.log("promise 3"); // 3 (wrong — see below)
});

console.log("script end"); // 2

// Actual output order:
// script start
// script end
// promise 1
// promise 3
// promise 2
// setTimeout 1
// setTimeout 2

// Why promise 3 before promise 2:
// After "promise 1" runs and returns a new Promise.resolve(),
// "promise 3" was already in the microtask queue.
// It runs first, then "promise 2" gets queued and runs.
```

---

## Part 3 — Callbacks: The Original Async Pattern

### What a callback is

A callback is simply a function you pass to another function to be called later.

```javascript
// Synchronous callback — called immediately
[1, 2, 3].forEach((n) => console.log(n));

// Asynchronous callback — called later, after something finishes
setTimeout(() => console.log("later"), 1000);

// Node.js-style callback: (error, result) convention
fs.readFile("./data.json", "utf8", (error, data) => {
  if (error) {
    console.error("Read failed:", error.message);
    return;
  }
  console.log(data);
});
```

### The Node.js error-first callback convention

Every Node.js callback follows this pattern: `(err, result)`. Always check the error first.

```javascript
const fs = require("fs");

// ─── Pattern: error-first callback ──────────────────────────────
function readConfig(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, null); // pass error up, no result
      return; // IMPORTANT: return to stop execution
    }

    try {
      const config = JSON.parse(data);
      callback(null, config); // no error, pass result
    } catch (parseError) {
      callback(new Error(`Invalid JSON: ${parseError.message}`), null);
    }
  });
}

// Usage
readConfig("./config.json", (err, config) => {
  if (err) {
    console.error("Config load failed:", err.message);
    return;
  }
  console.log("Config loaded:", config);
});
```

### Callback Hell — why callbacks break down

When you need to do async operations _in sequence_, each depending on the previous result, callbacks nest deeply. This is called **callback hell** or the **pyramid of doom**.

```javascript
// Real scenario: login → get profile → get orders → get recommendations
// Each step requires the previous step's result.

loginUser(credentials, (loginErr, user) => {
  if (loginErr) {
    handleError(loginErr);
    return;
  }

  getUserProfile(user.id, (profileErr, profile) => {
    if (profileErr) {
      handleError(profileErr);
      return;
    }

    getOrders(profile.id, (ordersErr, orders) => {
      if (ordersErr) {
        handleError(ordersErr);
        return;
      }

      getRecommendations(orders, (recsErr, recs) => {
        if (recsErr) {
          handleError(recsErr);
          return;
        }

        // Finally have everything — 4 levels deep
        renderDashboard({ user, profile, orders, recs });
      });
    });
  });
});

// Problems:
// 1. Deeply nested — hard to read and reason about
// 2. Error handling duplicated at every level
// 3. Can't run operations in parallel easily
// 4. Can't return values — must pass everything through callbacks
// 5. Hard to test individual steps
```

---

## Part 4 — Promises: A Better Contract

### What a Promise is

A Promise is an object that represents the **eventual result** of an async operation. It's a placeholder for a value you don't have yet.

```
Promise states:
┌──────────────┐
│   Pending    │  ← initial state, operation in progress
└──────┬───────┘
       │
    resolves?
   ┌───┴─────┐
   │         │
   ▼         ▼
┌────────┐ ┌──────────┐
│Fulfilled│ │ Rejected │
│(success)│ │ (failure)│
└────────┘ └──────────┘

Once settled (fulfilled or rejected), a Promise NEVER changes state.
```

### Creating Promises

```javascript
// The Promise constructor takes an "executor" function
// The executor receives two functions: resolve and reject
const promise = new Promise((resolve, reject) => {
  // Do async work here
  // Call resolve(value) on success
  // Call reject(error) on failure
});

// ─── Simple example ──────────────────────────────────────────────
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Done after ${ms}ms`), ms);
  });
}

delay(1000).then((message) => console.log(message)); // "Done after 1000ms"

// ─── Real world: wrapping a callback API in a Promise ────────────
function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err)
        reject(err); // error → reject
      else resolve(data); // success → resolve
    });
  });
}

// ─── Real world: wrapping geolocation ────────────────────────────
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(new Error(`Geolocation failed: ${error.message}`)),
    );
  });
}

// ─── Already-settled promises ────────────────────────────────────
Promise.resolve(42); // immediately fulfilled with 42
Promise.reject(new Error("nope")); // immediately rejected
```

### Consuming Promises: `.then()`, `.catch()`, `.finally()`

```javascript
// .then(onFulfilled, onRejected)
// .catch(onRejected)      — shorthand for .then(null, onRejected)
// .finally(onFinally)     — runs regardless of outcome

fetchUser(42)
  .then((user) => {
    console.log("Got user:", user.name);
    return user; // pass to next .then
  })
  .catch((error) => {
    console.error("Failed:", error.message);
    // return a value here to RECOVER — next .then receives it
    // throw here to propagate the error further
  })
  .finally(() => {
    // Always runs — use for cleanup (hide spinner, close connection)
    hideLoadingSpinner();
  });
```

### Promise Chaining — the solution to callback hell

The key insight: `.then()` always returns **a new Promise**. If you return a value from `.then()`, the next `.then()` gets that value. If you return a Promise, the chain waits for it to settle.

```javascript
// Rewriting the callback hell example with promises:
loginUser(credentials)
  .then((user) => getUserProfile(user.id)) // returns a Promise — chain waits
  .then((profile) => getOrders(profile.id)) // same pattern
  .then((orders) => getRecommendations(orders))
  .then((recs) => renderDashboard(recs))
  .catch((error) => handleError(error)); // ONE catch handles all errors above

// Compare: 4 levels of nesting → 4 flat .then() calls
// Error handling: once at the end, not duplicated everywhere
```

### Understanding the chain in depth

```javascript
// Each .then returns a NEW promise. The chain is linear.

Promise.resolve(1)
  .then((val) => {
    console.log(val); // 1
    return val + 1; // return plain value — next .then gets 2
  })
  .then((val) => {
    console.log(val); // 2
    return Promise.resolve(val + 1); // return Promise — chain waits for it
  })
  .then((val) => {
    console.log(val); // 3
    throw new Error("Something broke"); // throw — jumps to .catch
  })
  .then((val) => {
    console.log("This never runs");
  })
  .catch((err) => {
    console.log("Caught:", err.message); // "Caught: Something broke"
    return "recovered"; // return from catch = recovery
  })
  .then((val) => {
    console.log(val); // "recovered" — chain continues after catch
  });
```

### Promise static methods — parallel and race patterns

```javascript
// ─── Promise.all — wait for ALL, fail on any rejection ──────────
// Runs in parallel. Returns array of results in same order.
// If ANY rejects, the whole thing rejects immediately.

async function loadDashboard(userId) {
  const [user, orders, notifications, analytics] = await Promise.all([
    fetchUser(userId),
    fetchOrders(userId),
    fetchNotifications(userId),
    fetchAnalytics(userId),
  ]);
  // All four requests fired simultaneously — much faster than sequential
  return { user, orders, notifications, analytics };
}

// Sequential (slow): 4 requests × 500ms each = 2000ms
// Parallel (Promise.all): max(500ms, 500ms, 500ms, 500ms) = 500ms

// ─── Promise.allSettled — wait for ALL regardless of outcome ─────
// Never rejects. Returns array of { status, value/reason } objects.
// Use when you want results even from failed operations.

const results = await Promise.allSettled([
  fetchPrimaryServer(),
  fetchBackupServer(),
  fetchCacheLayer(),
]);

const successes = results
  .filter((r) => r.status === "fulfilled")
  .map((r) => r.value);

const failures = results
  .filter((r) => r.status === "rejected")
  .map((r) => r.reason.message);

console.log(`${successes.length} succeeded, ${failures.length} failed`);

// ─── Promise.race — first one wins ──────────────────────────────
// Settles as soon as ANY promise settles (fulfilled OR rejected).
// Use for timeouts and fastest-server patterns.

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms),
  );
  return Promise.race([promise, timeout]);
}

try {
  const data = await withTimeout(fetchSlowApi(), 5000);
} catch (err) {
  if (err.message.includes("Timed out")) {
    console.log("Request was too slow — showing cached data");
  }
}

// ─── Promise.any — first FULFILLED wins ──────────────────────────
// Ignores rejections. Only rejects if ALL promises reject (AggregateError).
// Use for trying multiple sources.

// Try three CDN servers — use whichever responds first successfully
const asset = await Promise.any([
  fetch("https://cdn1.example.com/asset.js"),
  fetch("https://cdn2.example.com/asset.js"),
  fetch("https://cdn3.example.com/asset.js"),
]);

// ─── Comparison table ────────────────────────────────────────────
/*
Method              | Resolves when         | Rejects when
Promise.all         | ALL fulfilled         | ANY rejects
Promise.allSettled  | ALL settled           | Never
Promise.race        | FIRST settles         | FIRST rejects
Promise.any         | FIRST fulfilled       | ALL reject
*/
```

### Building a real Promise-based API client

```javascript
// api/client.js

class ApiError extends Error {
  constructor(message, statusCode, data) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

function createApiClient(baseUrl, token) {
  function request(method, endpoint, body = null) {
    return fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new ApiError(
            data.message || `HTTP ${response.status}`,
            response.status,
            data,
          );
        });
      }
      return response.json();
    });
  }

  return {
    get: (endpoint) => request("GET", endpoint),
    post: (endpoint, body) => request("POST", endpoint, body),
    put: (endpoint, body) => request("PUT", endpoint, body),
    delete: (endpoint) => request("DELETE", endpoint),
  };
}

// Usage
const api = createApiClient("https://api.example.com", "my-token");

api
  .get("/users/42")
  .then((user) => console.log(user.name))
  .catch((err) => {
    if (err instanceof ApiError && err.statusCode === 404) {
      console.log("User not found");
    } else {
      console.error("Unexpected error:", err.message);
    }
  });
```

---

## Part 5 — Async/Await: Promises with Synchronous Syntax

### What async/await actually is

`async`/`await` is **syntactic sugar over Promises**. It does not create new behavior — it makes Promise-based code look and read like synchronous code.

```javascript
// These two are IDENTICAL in behavior:

// With Promises
function fetchUserData(id) {
  return fetchUser(id)
    .then((user) => fetchProfile(user.id))
    .then((profile) => fetchSettings(profile.userId))
    .then((settings) => ({ user, profile, settings })); // bug: user not in scope here!
}

// With async/await
async function fetchUserData(id) {
  const user = await fetchUser(id); // pause here until resolved
  const profile = await fetchProfile(user.id); // then continue
  const settings = await fetchSettings(profile.userId);
  return { user, profile, settings }; // user IS in scope — much cleaner
}

// async function always returns a Promise, even if you return a plain value
// await pauses execution of THIS function (not the whole thread!)
// Other code can still run while this function is "paused"
```

### The `async` keyword

```javascript
// async makes a function return a Promise
async function greet() {
  return "Hello!"; // automatically wrapped in Promise.resolve("Hello!")
}

greet().then((msg) => console.log(msg)); // "Hello!"

// async works on all function types
const greetArrow = async () => "Hello!";
const obj = {
  async greet() {
    return "Hello!";
  },
};
class Service {
  async fetchData() {
    return data;
  }
}
```

### The `await` keyword

```javascript
// await pauses the async function and unwraps the Promise value
// Can only be used inside async functions (and top-level modules)

async function example() {
  // These execute sequentially (each waits for the previous)
  const a = await Promise.resolve(1);
  const b = await Promise.resolve(2);
  const c = await Promise.resolve(3);

  console.log(a + b + c); // 6
}

// await on a non-Promise just returns the value
async function example2() {
  const x = await 42; // same as: const x = 42;
  console.log(x);     // 42
}

// COMMON MISTAKE: await in a non-async context
function broken() {
  const data = await fetch("/api"); // SyntaxError: await outside async function
}
```

### Sequential vs Parallel with async/await

This is the most important performance consideration in async code.

```javascript
// ─── SEQUENTIAL (slow) — each awaits the previous ────────────────
async function loadSequential(userId) {
  const user = await fetchUser(userId); // 200ms
  const orders = await fetchOrders(userId); // 300ms
  const settings = await fetchSettings(userId); // 150ms
  // Total: 200 + 300 + 150 = 650ms
  return { user, orders, settings };
}

// ─── PARALLEL with Promise.all (fast) ────────────────────────────
async function loadParallel(userId) {
  const [user, orders, settings] = await Promise.all([
    fetchUser(userId), // all three fire at the same time
    fetchOrders(userId),
    fetchSettings(userId),
  ]);
  // Total: max(200, 300, 150) = 300ms — less than half the time!
  return { user, orders, settings };
}

// ─── MIXED: some sequential, some parallel ────────────────────────
// Use this pattern when some results depend on others
async function loadSmartly(userId) {
  // Step 1: get user first (everything else needs user.id)
  const user = await fetchUser(userId);

  // Step 2: these can run in parallel since they both just need userId
  const [orders, profile] = await Promise.all([
    fetchOrders(user.id),
    fetchProfile(user.id),
  ]);

  // Step 3: this needs the profile result specifically
  const recommendations = await fetchRecommendations(profile.preferences);

  return { user, orders, profile, recommendations };
}

// ─── COMMON MISTAKE: await inside forEach ────────────────────────
// This does NOT work as expected!
async function processOrders_WRONG(orders) {
  orders.forEach(async (order) => {
    await processOrder(order); // async callback — forEach doesn't await these!
  });
  // This function returns before any order is processed
}

// CORRECT: use for...of for sequential async iteration
async function processOrders_SEQUENTIAL(orders) {
  for (const order of orders) {
    await processOrder(order); // each fully completes before the next starts
  }
}

// CORRECT: use Promise.all for parallel async iteration
async function processOrders_PARALLEL(orders) {
  await Promise.all(orders.map((order) => processOrder(order)));
}

// CORRECT: parallel with concurrency limit
async function processOrders_BATCHED(orders, batchSize = 3) {
  for (let i = 0; i < orders.length; i += batchSize) {
    const batch = orders.slice(i, i + batchSize);
    await Promise.all(batch.map((order) => processOrder(order)));
    // Process 3 at a time — prevents overwhelming the server
  }
}
```

### Top-level await (ES2022, ESM only)

```javascript
// In a module file — no async wrapper needed
const config = await fetch("/api/config").then((r) => r.json());
const db = await connectToDatabase(config.dbUrl);

export { db, config };

// This pauses the MODULE from finishing its initialization
// Any file that imports from this module will wait for it to settle
```

---

## Part 6 — Error Handling in Async Code

This section is where most developers have gaps. Error handling in async code has several failure modes.

### try/catch with async/await

```javascript
// ─── Basic pattern ───────────────────────────────────────────────
async function fetchUserData(userId) {
  try {
    const user = await fetchUser(userId);
    const profile = await fetchProfile(user.id);
    return { user, profile };
  } catch (error) {
    // Catches errors from ANY await in the try block
    console.error("Failed to load user data:", error.message);
    throw error; // re-throw if the caller should know about it
  }
}

// ─── Catching specific errors ─────────────────────────────────────
async function getUser(userId) {
  try {
    return await fetchUser(userId);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return null; // user not found — return null instead of crashing
    }
    if (error instanceof NetworkError) {
      return getCachedUser(userId); // fallback to cache
    }
    throw error; // unknown error — re-throw
  }
}

// ─── COMMON MISTAKE: forgotten await ─────────────────────────────
async function broken() {
  try {
    const data = fetchData(); // forgot await! returns a Promise, not the data
    processData(data); // passing a Promise object to processData — bug!
  } catch (err) {
    // This catch will NOT catch errors from fetchData()
    // because we didn't await it — the Promise rejection is unhandled
  }
}

// ─── CORRECT ─────────────────────────────────────────────────────
async function correct() {
  try {
    const data = await fetchData(); // await — errors are catchable
    processData(data);
  } catch (err) {
    handleError(err);
  }
}
```

### Handling errors per-operation without stopping the chain

```javascript
// Technique: .catch() on individual awaited Promises
async function loadDashboard(userId) {
  // Each can fail independently without crashing the whole function
  const user = await fetchUser(userId).catch(() => null); // if user fetch fails, continue with null

  if (!user) {
    return { error: "User not found" };
  }

  // Run in parallel, handle failures per-item
  const [orders, analytics, notifications] = await Promise.allSettled([
    fetchOrders(userId),
    fetchAnalytics(userId),
    fetchNotifications(userId),
  ]);

  return {
    user,
    orders: orders.status === "fulfilled" ? orders.value : [],
    analytics: analytics.status === "fulfilled" ? analytics.value : null,
    notifications:
      notifications.status === "fulfilled" ? notifications.value : [],
  };
}
```

### Unhandled Promise Rejections — a production issue

```javascript
// If a rejected Promise has no .catch() or try/catch, it's "unhandled"
// In Node.js 15+: crashes the process
// In browsers: fires window.unhandledrejection event

// ─── WRONG: fire-and-forget without error handling ───────────────
async function saveUserData(data) {
  updateDatabase(data); // no await, no .catch — rejection is swallowed silently!
}

// ─── CORRECT: always handle ──────────────────────────────────────
async function saveUserData(data) {
  updateDatabase(data).catch((err) => logger.error("DB update failed:", err));
}

// ─── Global handler (last resort — log, don't rely on this) ──────
// Node.js
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled rejection:", reason);
  // Gracefully shut down
  process.exit(1);
});

// Browser
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled:", event.reason);
  event.preventDefault(); // suppress browser default behavior
});
```

### Building a robust async function with retry logic

```javascript
// ─── Retry with exponential backoff ─────────────────────────────
async function withRetry(fn, options = {}) {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    backoffFactor = 2,
    shouldRetry = (err) => true, // by default, retry on any error
  } = options;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const isLastAttempt = attempt === maxAttempts;
      const willRetry = !isLastAttempt && shouldRetry(error);

      if (!willRetry) break;

      const delay = baseDelay * Math.pow(backoffFactor, attempt - 1);
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Usage
const data = await withRetry(
  () => fetch("https://unstable-api.example.com/data").then((r) => r.json()),
  {
    maxAttempts: 4,
    baseDelay: 500,
    shouldRetry: (err) => err instanceof NetworkError || err.statusCode >= 500,
  },
);

// ─── Real world: API call with retry + timeout ───────────────────
async function reliableFetch(url, options = {}) {
  return withRetry(
    async () => {
      const timeoutController = new AbortController();
      const timeoutId = setTimeout(
        () => timeoutController.abort(),
        options.timeout ?? 10000,
      );

      try {
        const response = await fetch(url, {
          ...options,
          signal: timeoutController.signal,
        });

        if (!response.ok) {
          const error = new Error(`HTTP ${response.status}`);
          error.statusCode = response.status;
          throw error;
        }

        return response.json();
      } finally {
        clearTimeout(timeoutId);
      }
    },
    { maxAttempts: 3, shouldRetry: (err) => err.statusCode >= 500 },
  );
}
```

---

## Part 7 — Advanced Async Patterns

### The async queue — controlling concurrency

```javascript
// Run N async operations at a time — no more, no less
class AsyncQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.run();
    });
  }

  async run() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;

    this.running++;
    const { fn, resolve, reject } = this.queue.shift();

    try {
      resolve(await fn());
    } catch (err) {
      reject(err);
    } finally {
      this.running--;
      this.run(); // pick up the next item
    }
  }
}

// Usage: process 100 files, max 5 at a time
const queue = new AsyncQueue(5);
const results = await Promise.all(
  files.map((file) => queue.add(() => processFile(file))),
);
```

### Async generators and streams

```javascript
// Async generators: yield values asynchronously — perfect for pagination
async function* fetchAllPages(endpoint) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data, meta } = await fetch(`${endpoint}?page=${page}`).then((r) =>
      r.json(),
    );
    yield data; // yield the current page's data
    hasMore = meta.currentPage < meta.totalPages;
    page++;
  }
}

// Consume with for-await-of
async function processAllUsers() {
  for await (const pageOfUsers of fetchAllPages("/api/users")) {
    // pageOfUsers is one page at a time — never loads all in memory
    await Promise.all(pageOfUsers.map((user) => processUser(user)));
    console.log(`Processed ${pageOfUsers.length} users`);
  }
}

// ─── Real world: streaming large file processing (Node.js) ───────
const { createReadStream } = require("fs");
const readline = require("readline");

async function* readLines(filePath) {
  const stream = createReadStream(filePath);
  const rl = readline.createInterface({ input: stream });

  for await (const line of rl) {
    yield line;
  }
}

async function processLargeCSV(filePath) {
  let rowCount = 0;
  for await (const line of readLines(filePath)) {
    if (rowCount === 0) {
      rowCount++;
      continue;
    } // skip header
    const [name, email, amount] = line.split(",");
    await saveTransaction({ name, email, amount: parseFloat(amount) });
    rowCount++;
  }
  console.log(`Processed ${rowCount - 1} rows`);
}
```

### Promise-based event emitter

```javascript
// Convert event-based APIs to Promise/async patterns
function once(emitter, eventName) {
  return new Promise((resolve, reject) => {
    function onSuccess(...args) {
      cleanup();
      resolve(args.length === 1 ? args[0] : args);
    }
    function onError(err) {
      cleanup();
      reject(err);
    }
    function cleanup() {
      emitter.off(eventName, onSuccess);
      emitter.off("error", onError);
    }

    emitter.once(eventName, onSuccess);
    emitter.once("error", onError);
  });
}

// Usage
const server = http.createServer(app);
server.listen(3000);
await once(server, "listening");
console.log("Server is ready");
```

### The Scheduler pattern — debounce and throttle

```javascript
// ─── Async debounce: wait for user to stop typing ────────────────
function asyncDebounce(fn, delay) {
  let timer = null;
  let pendingResolvers = [];

  return function (...args) {
    return new Promise((resolve, reject) => {
      pendingResolvers.push({ resolve, reject });

      clearTimeout(timer);
      timer = setTimeout(async () => {
        const resolvers = pendingResolvers.splice(0);
        try {
          const result = await fn(...args);
          resolvers.forEach(({ resolve }) => resolve(result));
        } catch (err) {
          resolvers.forEach(({ reject }) => reject(err));
        }
      }, delay);
    });
  };
}

// Usage: search API — only fires 300ms after user stops typing
const debouncedSearch = asyncDebounce(
  (query) => fetch(`/api/search?q=${query}`).then((r) => r.json()),
  300,
);

searchInput.addEventListener("input", async (e) => {
  const results = await debouncedSearch(e.target.value);
  renderResults(results);
});
```

### Caching async results

```javascript
// ─── Async memoization — prevent duplicate in-flight requests ─────
function asyncMemoize(fn, { ttl = Infinity } = {}) {
  const cache = new Map(); // key → { promise, expiresAt }

  return async function (...args) {
    const key = JSON.stringify(args);
    const now = Date.now();
    const cached = cache.get(key);

    if (cached && now < cached.expiresAt) {
      return cached.promise; // return the SAME Promise — deduplicates in-flight
    }

    const promise = fn(...args).catch((err) => {
      cache.delete(key); // remove failed requests from cache
      throw err;
    });

    cache.set(key, { promise, expiresAt: now + ttl });
    return promise;
  };
}

// Usage: same request fired 3 times simultaneously → only 1 actual fetch
const getUser = asyncMemoize(
  (id) => fetch(`/api/users/${id}`).then((r) => r.json()),
  { ttl: 60000 }, // cache for 60 seconds
);

// These three lines all get the same Promise — only 1 network request
const [a, b, c] = await Promise.all([getUser(42), getUser(42), getUser(42)]);
```

---

## Part 8 — Real-World Application Patterns

### Full async data layer: service pattern

```javascript
// services/userService.js

import { apiClient } from "./apiClient.js";
import { cache } from "./cache.js";
import { logger } from "./logger.js";

export class UserService {
  // ─── Fetch with cache ────────────────────────────────────────
  async getUser(userId) {
    const cacheKey = `user:${userId}`;
    const cached = await cache.get(cacheKey);

    if (cached) {
      logger.debug(`Cache hit for user ${userId}`);
      return cached;
    }

    const user = await apiClient.get(`/users/${userId}`);
    await cache.set(cacheKey, user, { ttl: 300 }); // 5 minutes
    return user;
  }

  // ─── Parallel loading ────────────────────────────────────────
  async getUserDashboard(userId) {
    const user = await this.getUser(userId);

    const [orders, notifications, analytics] = await Promise.allSettled([
      apiClient.get(`/users/${userId}/orders`),
      apiClient.get(`/users/${userId}/notifications`),
      apiClient.get(`/users/${userId}/analytics`),
    ]);

    return {
      user,
      orders: orders.status === "fulfilled" ? orders.value : [],
      notifications:
        notifications.status === "fulfilled" ? notifications.value : [],
      analytics: analytics.status === "fulfilled" ? analytics.value : null,
      hasPartialData: [orders, notifications, analytics].some(
        (r) => r.status === "rejected",
      ),
    };
  }

  // ─── Sequential with rollback ────────────────────────────────
  async transferBalance(fromId, toId, amount) {
    // Start a transaction
    const txn = await apiClient.post("/transactions/begin");

    try {
      await apiClient.post(`/accounts/${fromId}/debit`, {
        amount,
        txnId: txn.id,
      });
      await apiClient.post(`/accounts/${toId}/credit`, {
        amount,
        txnId: txn.id,
      });
      await apiClient.post(`/transactions/${txn.id}/commit`);

      logger.info(`Transfer of ${amount} from ${fromId} to ${toId} committed`);
      return { success: true, transactionId: txn.id };
    } catch (error) {
      // If any step fails, rollback
      await apiClient
        .post(`/transactions/${txn.id}/rollback`)
        .catch((rollbackErr) => {
          logger.error("Rollback also failed:", rollbackErr);
        });

      logger.error(`Transfer failed:`, error);
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }

  // ─── Polling: wait for async job completion ──────────────────
  async waitForExportJob(jobId, { pollInterval = 2000, maxWait = 60000 } = {}) {
    const startTime = Date.now();

    while (Date.now() - startTime < maxWait) {
      const { status, result, error } = await apiClient.get(`/jobs/${jobId}`);

      if (status === "completed") return result;
      if (status === "failed") throw new Error(`Job failed: ${error}`);

      // Still processing — wait and check again
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    throw new Error(`Job ${jobId} did not complete within ${maxWait}ms`);
  }
}
```

### React hooks pattern with async

```javascript
// hooks/useFetch.js

import { useState, useEffect, useRef, useCallback } from "react";

export function useFetch(url, options = {}) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });
  const abortControllerRef = useRef(null);

  const execute = useCallback(async () => {
    // Cancel previous request if still in-flight
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      setState({ data, loading: false, error: null });
    } catch (error) {
      if (error.name === "AbortError") return; // component unmounted — ignore
      setState({ data: null, loading: false, error: error.message });
    }
  }, [url]);

  useEffect(() => {
    execute();
    return () => abortControllerRef.current?.abort(); // cleanup on unmount
  }, [execute]);

  return { ...state, refetch: execute };
}

// Usage in a component
function UserProfile({ userId }) {
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useFetch(`/api/users/${userId}`);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  return <ProfileCard user={user} />;
}
```

---

## Part 9 — Interview Questions & Answers

### Core concepts

---

**Q1: What is the difference between synchronous and asynchronous code?**

Synchronous code executes line by line — each statement waits for the previous one to complete before running. If a sync operation takes 5 seconds, the entire thread is blocked for 5 seconds.

Asynchronous code allows the program to start an operation and move on without waiting. When the operation completes (network response, timer, file read), a callback/promise resolution/awaited value is placed in the queue and runs when the stack is free.

JavaScript is single-threaded, so asynchronous code doesn't mean parallel execution — it means the thread is free to do other work while the operation is handled by the runtime (browser/Node.js APIs).

---

**Q2: What is the Event Loop?**

The Event Loop is the mechanism that coordinates JavaScript's single call stack with queued async callbacks.

Its algorithm:

1. Execute all synchronous code (run the call stack to empty)
2. Drain the **microtask queue** completely (Promise callbacks, `queueMicrotask`)
3. Pick ONE task from the **macro-task queue** (setTimeout, setInterval, I/O)
4. Go to step 2

This means Promise `.then()` callbacks always run before `setTimeout` callbacks, even if both are already "ready".

---

**Q3: What is a Promise?**

A Promise is an object representing the eventual completion or failure of an async operation. It has three states: pending, fulfilled, or rejected. Once settled, it never changes state. You chain operations with `.then()`, handle errors with `.catch()`, and clean up with `.finally()`.

```javascript
// Key behaviors to know:
const p = new Promise((resolve, reject) => {
  resolve(42);
});

p.then((v) => v * 2) // returns NEW promise with value 84
  .then((v) => {
    throw new Error("oops");
  }) // switches to rejected
  .catch((e) => "recovered") // returns NEW promise with "recovered"
  .then((v) => console.log(v)); // "recovered" — chain continues
```

---

**Q4: What is the difference between `.then()` and `async/await`?**

They are equivalent — `async/await` is syntactic sugar over Promises. Every `async` function returns a Promise. Every `await` is equivalent to `.then()`.

```javascript
// These produce identical behavior:
function withThen() {
  return fetchUser(1).then((user) => fetchOrders(user.id));
}

async function withAwait() {
  const user = await fetchUser(1);
  return fetchOrders(user.id);
}
```

`async/await` advantages: easier to read, easier to use variables across multiple async steps, familiar try/catch syntax for errors, easier to debug (cleaner stack traces).

`.then()` advantages: useful when chaining is naturally linear, works in non-async contexts, can be more explicit about the Promise chain.

---

**Q5: What is the difference between Promise.all and Promise.allSettled?**

`Promise.all` rejects immediately if **any** Promise rejects — you lose all results even if most succeeded. Use it when all results are required and any failure should abort.

`Promise.allSettled` waits for **all** Promises regardless of outcome and gives you `{ status: "fulfilled", value }` or `{ status: "rejected", reason }` for each. Use it when you want partial results and can handle individual failures.

```javascript
// Promise.all — use for: loading required dashboard data
const [user, settings] = await Promise.all([fetchUser(), fetchSettings()]);

// Promise.allSettled — use for: sending notifications to multiple users
const results = await Promise.allSettled(users.map((u) => sendEmail(u)));
const failed = results.filter((r) => r.status === "rejected");
```

---

**Q6: What output does this code produce and why?**

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

**Answer:** A, D, C, B

- A and D are synchronous — run immediately in order
- The Promise callback (C) goes to the **microtask queue**
- The setTimeout callback (B) goes to the **macro-task queue**
- After the sync code finishes, microtasks drain first → C
- Then the next macro-task runs → B

---

**Q7: What's wrong with this code?**

```javascript
async function getUsers() {
  const users = await fetchUsers();
  users.forEach(async (user) => {
    await updateUser(user); // is this awaited?
  });
  console.log("All users updated");
}
```

**Answer:** `forEach` doesn't await async callbacks. The `getUsers` function returns (and logs "All users updated") before any `updateUser` call completes. The updates happen after the function has already finished.

**Fix:** Use `for...of` for sequential, or `Promise.all(users.map(...))` for parallel:

```javascript
// Sequential
for (const user of users) {
  await updateUser(user);
}
console.log("All users updated"); // now truly all done

// Parallel
await Promise.all(users.map((user) => updateUser(user)));
console.log("All users updated"); // all done
```

---

**Q8: What is a closure and how does it relate to async code?**

A closure is a function that retains access to variables from its outer lexical scope. In async code, closures are everywhere — the callbacks and `.then()` handlers you pass around capture variables from their surrounding scope.

```javascript
function createFetcher(baseUrl, token) {
  // fetch is a closure over baseUrl and token
  return async function fetch(endpoint) {
    const response = await globalThis.fetch(`${baseUrl}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` }, // captured via closure
    });
    return response.json();
  };
}
```

The classic async closure bug:

```javascript
// BUG: var is function-scoped — all callbacks share the same i
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 3, 3, 3
}

// FIX: let is block-scoped — each iteration has its own i
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 0, 1, 2
}
```

---

**Q9: How do you handle errors in async/await?**

Three patterns, each with its use case:

```javascript
// 1. try/catch — for recoverable errors in a function
async function loadUser(id) {
  try {
    return await fetchUser(id);
  } catch (err) {
    if (err.statusCode === 404) return null;
    throw err; // re-throw unexpected errors
  }
}

// 2. .catch() on the awaited Promise — per-operation fallback
async function loadDashboard(userId) {
  const user = await fetchUser(userId).catch(() => null);
  const orders = await fetchOrders(userId).catch(() => []);
  return { user, orders };
}

// 3. Promise.allSettled — parallel with per-result error info
const results = await Promise.allSettled([op1(), op2(), op3()]);
```

---

**Q10: What is an async generator and when would you use one?**

An async generator is a function declared `async function*` that can `yield` values asynchronously using `await`. You consume it with `for await...of`.

Use cases: paginated API results, streaming data, processing large datasets without loading everything into memory.

```javascript
async function* paginate(url) {
  let page = 1;
  while (true) {
    const { data, hasMore } = await fetch(`${url}?page=${page}`).then((r) =>
      r.json(),
    );
    yield data;
    if (!hasMore) break;
    page++;
  }
}

for await (const page of paginate("/api/users")) {
  await processPage(page); // one page at a time, no memory buildup
}
```

---

**Q11: What is Promise chaining and what does `.then()` return?**

`.then()` always returns a **new Promise**. The value that new Promise resolves to depends on what you return from the `.then()` callback:

- Return a plain value → next `.then()` gets that value
- Return a Promise → the chain waits for that Promise to settle
- Throw an error → the chain switches to rejected, caught by `.catch()`
- Return nothing → next `.then()` gets `undefined`

This is what makes chaining work — each `.then()` creates a new Promise that depends on the previous one.

---

**Q12: How would you implement a function that runs N promises with a concurrency limit?**

```javascript
async function runWithConcurrency(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const [index, task] of tasks.entries()) {
    const promise = Promise.resolve()
      .then(() => task())
      .then((result) => {
        results[index] = result;
        executing.delete(promise);
      });

    executing.add(promise);

    if (executing.size >= limit) {
      await Promise.race(executing); // wait for one to finish before adding more
    }
  }

  await Promise.all(executing); // wait for any remaining
  return results;
}

// Usage
const results = await runWithConcurrency(
  urls.map((url) => () => fetch(url).then((r) => r.json())),
  5, // max 5 concurrent requests
);
```

---

**Q13: What is the difference between `Promise.race` and `Promise.any`?**

`Promise.race` settles (resolves OR rejects) as soon as the **first** Promise settles — regardless of whether it's a success or failure.

`Promise.any` resolves as soon as the **first** Promise fulfills — it ignores rejections. Only rejects if ALL Promises reject (throws `AggregateError`).

```javascript
// race: fastest result — even if it's an error
Promise.race([
  fetchFast(), // rejects in 100ms
  fetchSlow(), // resolves in 500ms
]); // → rejects in 100ms (takes the first, which was a rejection)

// any: fastest SUCCESS
Promise.any([
  fetchFast(), // rejects in 100ms
  fetchSlow(), // resolves in 500ms
]); // → resolves in 500ms (ignores the rejection, takes first fulfillment)
```

Use `race` for: timeout implementation.
Use `any` for: trying multiple servers, taking whichever succeeds first.

---

**Q14: What happens if you throw inside an async function?**

The thrown error causes the returned Promise to reject with that error. It's equivalent to calling `reject()` manually.

```javascript
async function riskyOperation() {
  throw new Error("something broke");
  // equivalent to: return Promise.reject(new Error("something broke"))
}

// All three are equivalent ways to catch it:
riskyOperation().catch((err) => console.log(err.message));
riskyOperation().then(null, (err) => console.log(err.message));
try {
  await riskyOperation();
} catch (err) {
  console.log(err.message);
}
```

---

**Q15: Explain the output:**

```javascript
async function foo() {
  console.log("foo start");
  await bar();
  console.log("foo end");
}

async function bar() {
  console.log("bar");
}

console.log("before");
foo();
console.log("after");
```

**Answer:** before → foo start → bar → after → foo end

- "before" — sync
- `foo()` is called: logs "foo start" — sync
- `await bar()` — bar() is called synchronously (logs "bar"), but `await` causes `foo` to suspend
- Control returns to the call site — logs "after" — sync
- Microtask queue processes: `foo` resumes after the `await`, logs "foo end"

Key insight: the code _after_ `await` is a microtask — it runs after the current synchronous block finishes.

---

## Part 10 — Quick Reference Cheat Sheet

### Creating Promises

```javascript
new Promise((resolve, reject) => { ... })
Promise.resolve(value)
Promise.reject(error)
```

### Consuming Promises

```javascript
promise.then(onSuccess);
promise.then(onSuccess, onError);
promise.catch(onError);
promise.finally(onFinally);
```

### Static methods

```javascript
Promise.all([p1, p2]); // all succeed OR first failure
Promise.allSettled([p1, p2]); // all settle, results include status
Promise.race([p1, p2]); // first to settle (success or failure)
Promise.any([p1, p2]); // first success; fails only if all fail
```

### Async/Await

```javascript
async function fn() {
  return value;
} // returns Promise
const result = await somePromise; // unwraps, only in async
const result = await fetch(url).then((r) => r.json()); // chain after await
```

### Error handling

```javascript
try {
  await riskyFn();
} catch (e) {
  handle(e);
}
await riskyFn().catch((e) => fallback);
```

### Parallel patterns

```javascript
// Run all in parallel (FAST)
const [a, b] = await Promise.all([fetchA(), fetchB()]);

// Parallel with safe individual failures
const results = await Promise.allSettled([fetchA(), fetchB()]);

// Sequential (when each depends on the previous)
const a = await fetchA();
const b = await fetchB(a.id);

// Parallel iteration
await Promise.all(items.map(async (item) => processItem(item)));

// Sequential iteration (do NOT use forEach with async)
for (const item of items) {
  await processItem(item);
}
```

### Common mistakes to avoid

```javascript
// ❌ await in forEach
array.forEach(async (item) => {
  await doSomething(item);
}); // not awaited!

// ✅ use for...of
for (const item of array) {
  await doSomething(item);
}

// ❌ unhandled rejection
fetchData(); // no await, no .catch

// ✅ always handle
fetchData().catch(logger.error);

// ❌ unnecessary sequential
const a = await fetchA();
const b = await fetchB(); // slow if independent

// ✅ parallel
const [a, b] = await Promise.all([fetchA(), fetchB()]);

// ❌ missing await causes silent bugs
async function save() {
  database.insert(data);
} // fire and forget by accident

// ✅ always await async operations
async function save() {
  await database.insert(data);
}
```

---

_Read once end-to-end. Then keep the cheat sheet. Every pattern in this guide appears in real production codebases weekly._
