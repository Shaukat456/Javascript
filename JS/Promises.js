/*
🔄 JavaScript Promises - Complete Deep Dive

Learn everything about Promises:
- What problems they solve
- How they work under the hood
- Practical examples
- Best practices
- Advanced patterns

Let's master asynchronous JavaScript! 🚀
*/

console.log("🔄 Welcome to JavaScript Promises Deep Dive!\n");

// ==========================================
// 1️⃣ THE PROBLEM PROMISES SOLVE
// ==========================================

console.log("1️⃣ THE PROBLEM: Callback Hell");
console.log("=====================================");

/*
❌ Before Promises: Callback Hell

Imagine we need to:
1. Get user data
2. Get user's posts
3. Get comments for first post
4. Get author details for first comment

This creates deeply nested callbacks:
*/

// Callback Hell Example (DON'T DO THIS!)
function callbackHellExample() {
  console.log("\n❌ Callback Hell Example:");

  // Simulated async operations with callbacks
  function getUser(id, callback) {
    setTimeout(() => {
      console.log("📱 Got user data");
      callback(null, { id: id, name: "John Doe" });
    }, 500);
  }

  function getPosts(userId, callback) {
    setTimeout(() => {
      console.log("📝 Got user posts");
      callback(null, [{ id: 1, title: "My First Post" }]);
    }, 500);
  }

  function getComments(postId, callback) {
    setTimeout(() => {
      console.log("💬 Got post comments");
      callback(null, [{ id: 1, text: "Great post!", authorId: 2 }]);
    }, 500);
  }

  function getAuthor(authorId, callback) {
    setTimeout(() => {
      console.log("👤 Got comment author");
      callback(null, { id: authorId, name: "Jane Smith" });
    }, 500);
  }

  // The dreaded callback pyramid! 🔺
  getUser(1, (err, user) => {
    if (err) throw err;
    getPosts(user.id, (err, posts) => {
      if (err) throw err;
      getComments(posts[0].id, (err, comments) => {
        if (err) throw err;
        getAuthor(comments[0].authorId, (err, author) => {
          if (err) throw err;
          console.log(
            `Final result: ${author.name} commented on ${user.name}'s post`
          );
        });
      });
    });
  });
}

// callbackHellExample(); // Uncomment to see callback hell in action

// ==========================================
// 2️⃣ PROMISE FUNDAMENTALS
// ==========================================

console.log("\n2️⃣ PROMISE FUNDAMENTALS");
console.log("========================");

/*
🎯 What is a Promise?

A Promise is an object representing the eventual completion 
or failure of an asynchronous operation.

Think of it like a "placeholder" for a future value.
*/

console.log("\n📦 Promise States:");
console.log("• Pending: Initial state, neither fulfilled nor rejected");
console.log("• Fulfilled: Operation completed successfully");
console.log("• Rejected: Operation failed");
console.log("• Settled: Either fulfilled or rejected (not pending)");

// Basic Promise Creation
console.log("\n🏗️ Creating a Basic Promise:");

const basicPromise = new Promise((resolve, reject) => {
  console.log("⏳ Promise executor runs immediately");

  // Simulate async operation
  setTimeout(() => {
    const success = Math.random() > 0.3; // 70% success rate

    if (success) {
      resolve("✅ Operation successful!");
    } else {
      reject("❌ Operation failed!");
    }
  }, 1000);
});

console.log("🔄 Promise created, but not settled yet");

// ==========================================
// 3️⃣ CONSUMING PROMISES
// ==========================================

console.log("\n3️⃣ CONSUMING PROMISES");
console.log("======================");

// Method 1: .then() and .catch()
console.log("\n📖 Method 1: Using .then() and .catch()");

basicPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  })
  .finally(() => {
    console.log("🏁 Promise settled (either way)");
  });

// Method 2: async/await (we'll cover this in detail later)
console.log("\n📖 Method 2: Using async/await");

async function consumePromise() {
  try {
    const result = await basicPromise;
    console.log("Async/await success:", result);
  } catch (error) {
    console.log("Async/await error:", error);
  }
}

// consumePromise(); // Uncomment to test

// ==========================================
// 4️⃣ PROMISE CHAINING
// ==========================================

console.log("\n4️⃣ PROMISE CHAINING");
console.log("====================");

/*
🔗 Promise Chaining solves Callback Hell!

Each .then() returns a new Promise, allowing clean chaining.
*/

// Recreating our earlier example with Promises
function promiseExample() {
  console.log("\n✅ Clean Promise Chain Example:");

  // Convert callback functions to return Promises
  function getUser(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("📱 Got user data");
        resolve({ id: id, name: "John Doe" });
      }, 300);
    });
  }

  function getPosts(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("📝 Got user posts");
        resolve([{ id: 1, title: "My First Post" }]);
      }, 300);
    });
  }

  function getComments(postId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("💬 Got post comments");
        resolve([{ id: 1, text: "Great post!", authorId: 2 }]);
      }, 300);
    });
  }

  function getAuthor(authorId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("👤 Got comment author");
        resolve({ id: authorId, name: "Jane Smith" });
      }, 300);
    });
  }

  // Beautiful Promise Chain! 🌟
  getUser(1)
    .then((user) => {
      console.log("User:", user.name);
      return getPosts(user.id);
    })
    .then((posts) => {
      console.log("Post:", posts[0].title);
      return getComments(posts[0].id);
    })
    .then((comments) => {
      console.log("Comment:", comments[0].text);
      return getAuthor(comments[0].authorId);
    })
    .then((author) => {
      console.log("Author:", author.name);
      console.log("🎉 Chain complete! Much cleaner than callbacks!");
    })
    .catch((error) => {
      console.log("❌ Error in chain:", error);
    });
}

setTimeout(promiseExample, 2000); // Run after basic example

// ==========================================
// 5️⃣ PROMISE UNDER THE HOOD
// ==========================================

console.log("\n5️⃣ HOW PROMISES WORK UNDER THE HOOD");
console.log("====================================");

/*
🔧 Promise Implementation Concepts:

1. **Microtask Queue**: Promises use the microtask queue, not the callback queue
2. **Event Loop**: Microtasks have higher priority than regular callbacks
3. **State Management**: Internal state tracking (pending/fulfilled/rejected)
4. **Handler Storage**: Stores success/error handlers until promise settles
*/

console.log("\n🧠 Event Loop and Microtasks:");

console.log("1. Synchronous code");

setTimeout(() => {
  console.log("4. Callback Queue (Timer)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask Queue (Promise)");
});

console.log("2. Synchronous code continues");

// More detailed microtask example
console.log("\n🔬 Detailed Execution Order:");

console.log("Start");

setTimeout(() => console.log("Timer 1"), 0);

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve();
  })
  .then(() => console.log("Promise 2"));

setTimeout(() => console.log("Timer 2"), 0);

console.log("End");

/*
Expected Output:
Start
End
Promise 1
Promise 2
Timer 1
Timer 2

Why? Microtasks (Promises) have higher priority than macrotasks (Timers)
*/

// ==========================================
// 6️⃣ CREATING PROMISES
// ==========================================

console.log("\n6️⃣ CREATING PROMISES");
console.log("=====================");

// 1. Using Promise Constructor
console.log("\n🏗️ Method 1: Promise Constructor");

function createPromise(shouldSucceed = true) {
  return new Promise((resolve, reject) => {
    console.log("🔄 Executor function runs immediately");

    setTimeout(() => {
      if (shouldSucceed) {
        resolve("✅ Success value");
      } else {
        reject(new Error("❌ Failure reason"));
      }
    }, 500);
  });
}

// 2. Promise.resolve() - Already fulfilled
console.log("\n⚡ Method 2: Promise.resolve()");

const immediatePromise = Promise.resolve("Immediate value");
immediatePromise.then((value) => console.log("Immediate:", value));

// 3. Promise.reject() - Already rejected
console.log("\n💥 Method 3: Promise.reject()");

const rejectedPromise = Promise.reject(new Error("Immediate error"));
rejectedPromise.catch((error) => console.log("Caught:", error.message));

// 4. Converting callback to Promise
console.log("\n🔄 Method 4: Promisifying Callbacks");

function promisify(callbackFunction) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackFunction(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// Example: Promisifying setTimeout
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ==========================================
// 7️⃣ PROMISE STATIC METHODS
// ==========================================

console.log("\n7️⃣ PROMISE STATIC METHODS");
console.log("==========================");

// Promise.all() - Wait for all to complete
console.log("\n🎯 Promise.all() - All or Nothing");

const promise1 = delay(1000).then(() => "First");
const promise2 = delay(2000).then(() => "Second");
const promise3 = delay(1500).then(() => "Third");

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("Promise.all results:", results);
    // ["First", "Second", "Third"] - in original order
  })
  .catch((error) => {
    console.log("Promise.all error:", error);
    // If any promise rejects, this catch runs
  });

// Promise.allSettled() - Wait for all to settle
console.log("\n🛡️ Promise.allSettled() - Get All Results");

const mixedPromises = [
  Promise.resolve("Success"),
  Promise.reject("Error"),
  delay(1000).then(() => "Delayed success"),
];

Promise.allSettled(mixedPromises).then((results) => {
  console.log("Promise.allSettled results:");
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`${index}: ✅ ${result.value}`);
    } else {
      console.log(`${index}: ❌ ${result.reason}`);
    }
  });
});

// Promise.race() - First to finish wins
console.log("\n🏃 Promise.race() - First One Wins");

const fastPromise = delay(500).then(() => "Fast");
const slowPromise = delay(2000).then(() => "Slow");

Promise.race([fastPromise, slowPromise]).then((result) => {
  console.log("Promise.race winner:", result); // "Fast"
});

// Promise.any() - First successful one wins
console.log("\n🎖️ Promise.any() - First Success Wins");

const failPromise1 = Promise.reject("Fail 1");
const failPromise2 = delay(1000).then(() => Promise.reject("Fail 2"));
const successPromise = delay(1500).then(() => "Success!");

Promise.any([failPromise1, failPromise2, successPromise])
  .then((result) => {
    console.log("Promise.any winner:", result); // "Success!"
  })
  .catch((error) => {
    console.log("All promises rejected:", error);
  });

// ==========================================
// 8️⃣ ASYNC/AWAIT - MODERN SYNTAX
// ==========================================

console.log("\n8️⃣ ASYNC/AWAIT - MODERN SYNTAX");
console.log("===============================");

/*
🎭 async/await is syntactic sugar over Promises

- Makes asynchronous code look synchronous
- Better error handling with try/catch
- No callback hell or promise chaining
*/

// Basic async/await
async function basicAsyncExample() {
  console.log("\n🎭 Basic async/await example:");

  try {
    console.log("⏳ Starting async operation...");
    const result = await delay(1000).then(() => "Async result");
    console.log("✅ Got result:", result);

    const secondResult = await delay(500).then(() => "Second result");
    console.log("✅ Got second result:", secondResult);
  } catch (error) {
    console.log("❌ Error:", error);
  }
}

// Converting our chain example to async/await
async function asyncChainExample() {
  console.log("\n🔗 Promise chain as async/await:");

  try {
    const user = await getUser(1);
    console.log("👤 User:", user.name);

    const posts = await getPosts(user.id);
    console.log("📝 Posts:", posts.length);

    const comments = await getComments(posts[0].id);
    console.log("💬 Comments:", comments.length);

    const author = await getAuthor(comments[0].authorId);
    console.log("✍️ Comment author:", author.name);

    return `${author.name} commented on ${user.name}'s post`;
  } catch (error) {
    console.log("❌ Error in async chain:", error);
    throw error;
  }

  // Helper functions (same as before)
  async function getUser(id) {
    await delay(200);
    return { id, name: "John Doe" };
  }

  async function getPosts(userId) {
    await delay(200);
    return [{ id: 1, title: "My Post" }];
  }

  async function getComments(postId) {
    await delay(200);
    return [{ id: 1, text: "Great!", authorId: 2 }];
  }

  async function getAuthor(authorId) {
    await delay(200);
    return { id: authorId, name: "Jane Smith" };
  }
}

// Parallel async operations
async function parallelAsyncExample() {
  console.log("\n⚡ Parallel async operations:");

  const start = Date.now();

  // Sequential (slow) - 3 seconds total
  console.log("📍 Sequential approach:");
  await delay(1000);
  await delay(1000);
  await delay(1000);
  console.log(`Sequential time: ${Date.now() - start}ms`);

  // Parallel (fast) - 1 second total
  console.log("🚀 Parallel approach:");
  const parallelStart = Date.now();
  await Promise.all([delay(1000), delay(1000), delay(1000)]);
  console.log(`Parallel time: ${Date.now() - parallelStart}ms`);
}

// ==========================================
// 9️⃣ ERROR HANDLING
// ==========================================

console.log("\n9️⃣ ERROR HANDLING");
console.log("==================");

// Promise error handling
function promiseErrorHandling() {
  console.log("\n🛡️ Promise error handling patterns:");

  // Pattern 1: .catch() at the end
  Promise.resolve()
    .then(() => {
      throw new Error("Something went wrong!");
    })
    .then((result) => {
      console.log("This won't run");
    })
    .catch((error) => {
      console.log("Caught error:", error.message);
    });

  // Pattern 2: Multiple catch blocks
  Promise.resolve()
    .then(() => {
      throw new Error("First error");
    })
    .catch((error) => {
      console.log("First catch:", error.message);
      return "Recovered!";
    })
    .then((result) => {
      console.log("Continued with:", result);
    });
}

// Async/await error handling
async function asyncErrorHandling() {
  console.log("\n🎭 Async/await error handling:");

  try {
    const result = await Promise.reject(new Error("Async error"));
    console.log("Won't reach here");
  } catch (error) {
    console.log("Caught async error:", error.message);
  }

  // Multiple try/catch blocks
  try {
    await delay(100);
    console.log("✅ First operation succeeded");
  } catch (error) {
    console.log("❌ First operation failed");
  }

  try {
    throw new Error("Second operation failed");
  } catch (error) {
    console.log("❌ Caught:", error.message);
  }

  console.log("✅ Code continues after errors");
}

// ==========================================
// 🔟 REAL-WORLD EXAMPLES
// ==========================================

console.log("\n🔟 REAL-WORLD EXAMPLES");
console.log("=======================");

// 1. API Calls
async function apiExample() {
  console.log("\n🌐 API Call Example:");

  // Simulated API call
  async function fetchUser(id) {
    await delay(500);
    if (id === 1) {
      return { id: 1, name: "John", email: "john@example.com" };
    }
    throw new Error("User not found");
  }

  try {
    const user = await fetchUser(1);
    console.log("📱 Fetched user:", user);
  } catch (error) {
    console.log("❌ API Error:", error.message);
  }
}

// 2. File Operations (simulated)
async function fileExample() {
  console.log("\n📁 File Operations Example:");

  async function readFile(filename) {
    await delay(300);
    if (filename.endsWith(".txt")) {
      return `Content of ${filename}`;
    }
    throw new Error("Unsupported file type");
  }

  async function writeFile(filename, content) {
    await delay(200);
    console.log(`📝 Wrote to ${filename}: ${content}`);
    return true;
  }

  try {
    const content = await readFile("data.txt");
    console.log("📖 Read:", content);

    await writeFile("output.txt", content.toUpperCase());
    console.log("✅ File operations complete");
  } catch (error) {
    console.log("❌ File error:", error.message);
  }
}

// 3. Database Operations (simulated)
async function databaseExample() {
  console.log("\n🗄️ Database Operations Example:");

  const database = {
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
  };

  async function queryDatabase(table, id) {
    await delay(400);
    const record = database[table].find((item) => item.id === id);
    if (record) {
      return record;
    }
    throw new Error(`Record ${id} not found in ${table}`);
  }

  async function updateDatabase(table, id, updates) {
    await delay(300);
    const index = database[table].findIndex((item) => item.id === id);
    if (index !== -1) {
      database[table][index] = { ...database[table][index], ...updates };
      return database[table][index];
    }
    throw new Error(`Cannot update: Record ${id} not found`);
  }

  try {
    const user = await queryDatabase("users", 1);
    console.log("🔍 Found user:", user);

    const updated = await updateDatabase("users", 1, { name: "Alice Smith" });
    console.log("📝 Updated user:", updated);
  } catch (error) {
    console.log("❌ Database error:", error.message);
  }
}

// ==========================================
// 1️⃣1️⃣ ADVANCED PATTERNS
// ==========================================

console.log("\n1️⃣1️⃣ ADVANCED PATTERNS");
console.log("========================");

// 1. Promise Queue - Sequential execution
class PromiseQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  add(promiseFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promiseFunction,
        resolve,
        reject,
      });
      this.process();
    });
  }

  async process() {
    if (this.running || this.queue.length === 0) {
      return;
    }

    this.running = true;

    while (this.queue.length > 0) {
      const { promiseFunction, resolve, reject } = this.queue.shift();

      try {
        const result = await promiseFunction();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.running = false;
  }
}

// 2. Retry mechanism
async function withRetry(promiseFunction, maxRetries = 3, delayMs = 1000) {
  let lastError;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await promiseFunction();
    } catch (error) {
      lastError = error;

      if (i === maxRetries) {
        break; // Don't delay on last attempt
      }

      console.log(`Attempt ${i + 1} failed, retrying in ${delayMs}ms...`);
      await delay(delayMs);
    }
  }

  throw lastError;
}

// 3. Timeout wrapper
function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

// Demo advanced patterns
async function advancedPatternsDemo() {
  console.log("\n🚀 Advanced Patterns Demo:");

  // Promise Queue
  const queue = new PromiseQueue();

  console.log("📋 Adding tasks to queue...");
  queue.add(() => delay(500).then(() => console.log("Task 1 completed")));
  queue.add(() => delay(300).then(() => console.log("Task 2 completed")));
  queue.add(() => delay(200).then(() => console.log("Task 3 completed")));

  // Retry mechanism
  console.log("\n🔄 Testing retry mechanism...");
  let attemptCount = 0;
  const flakyOperation = () => {
    attemptCount++;
    if (attemptCount < 3) {
      return Promise.reject(new Error(`Attempt ${attemptCount} failed`));
    }
    return Promise.resolve(`Success on attempt ${attemptCount}`);
  };

  try {
    const result = await withRetry(flakyOperation, 5, 200);
    console.log("✅ Retry result:", result);
  } catch (error) {
    console.log("❌ Retry failed:", error.message);
  }

  // Timeout wrapper
  console.log("\n⏰ Testing timeout wrapper...");
  const slowOperation = () => delay(2000).then(() => "Finally done!");

  try {
    const result = await withTimeout(slowOperation(), 1000);
    console.log("✅ Fast result:", result);
  } catch (error) {
    console.log("❌ Timeout error:", error.message);
  }
}

// ==========================================
// 1️⃣2️⃣ BEST PRACTICES
// ==========================================

console.log("\n1️⃣2️⃣ BEST PRACTICES");
console.log("====================");

console.log(`
✅ Promise Best Practices:

1. **Always handle errors**
   - Use .catch() or try/catch
   - Don't ignore rejected promises

2. **Prefer async/await over .then() chaining**
   - More readable and maintainable
   - Better error handling

3. **Use Promise.all() for parallel operations**
   - Don't await in sequence unless necessary
   - Improves performance

4. **Avoid mixing callbacks and promises**
   - Promisify callback-based APIs
   - Stay consistent

5. **Return promises from functions**
   - Don't forget return statements
   - Enables proper chaining

6. **Use meaningful error messages**
   - Include context in errors
   - Make debugging easier

7. **Consider using utility libraries**
   - Bluebird, p-queue, p-retry
   - For advanced use cases

❌ Common Mistakes:

1. Forgetting to return promises
2. Not handling promise rejections
3. Creating unnecessary promise wrappers
4. Using async/await in unnecessary places
5. Blocking parallel operations with sequential awaits
`);

// ==========================================
// 1️⃣3️⃣ PERFORMANCE CONSIDERATIONS
// ==========================================

console.log("\n1️⃣3️⃣ PERFORMANCE CONSIDERATIONS");
console.log("=================================");

async function performanceDemo() {
  console.log("\n⚡ Performance Comparison:");

  // Test data
  const operations = [
    () => delay(100).then(() => "Op 1"),
    () => delay(150).then(() => "Op 2"),
    () => delay(120).then(() => "Op 3"),
    () => delay(80).then(() => "Op 4"),
    () => delay(200).then(() => "Op 5"),
  ];

  // Sequential execution (slow)
  console.log("🐌 Sequential execution:");
  const sequentialStart = Date.now();
  const sequentialResults = [];
  for (const operation of operations) {
    const result = await operation();
    sequentialResults.push(result);
  }
  const sequentialTime = Date.now() - sequentialStart;
  console.log(`Sequential: ${sequentialTime}ms, Results:`, sequentialResults);

  // Parallel execution (fast)
  console.log("\n🚀 Parallel execution:");
  const parallelStart = Date.now();
  const parallelResults = await Promise.all(operations.map((op) => op()));
  const parallelTime = Date.now() - parallelStart;
  console.log(`Parallel: ${parallelTime}ms, Results:`, parallelResults);

  console.log(
    `\n📊 Performance improvement: ${
      Math.round((sequentialTime / parallelTime) * 100) / 100
    }x faster`
  );
}

// ==========================================
// 🎯 FINAL DEMO - RUN EVERYTHING
// ==========================================

async function runAllExamples() {
  console.log("\n🎯 RUNNING ALL EXAMPLES");
  console.log("========================");

  console.log("\n⏱️ Starting in 3 seconds...");
  await delay(3000);

  // Run examples with delays between them
  await basicAsyncExample();
  await delay(1000);

  await asyncChainExample();
  await delay(1000);

  promiseErrorHandling();
  await delay(2000);

  await asyncErrorHandling();
  await delay(1000);

  await apiExample();
  await delay(1000);

  await fileExample();
  await delay(1000);

  await databaseExample();
  await delay(1000);

  await advancedPatternsDemo();
  await delay(2000);

  await performanceDemo();

  console.log("\n🎉 All examples completed!");
  console.log("\n📚 Summary:");
  console.log("- Learned about callback hell and how Promises solve it");
  console.log("- Understood Promise states and the event loop");
  console.log("- Practiced Promise chaining and async/await");
  console.log("- Explored error handling patterns");
  console.log("- Saw real-world examples and advanced patterns");
  console.log("- Learned best practices and performance tips");
}

// Uncomment to run all examples:
// runAllExamples();

console.log(
  "\n💡 Tip: Uncomment 'runAllExamples()' at the bottom to see everything in action!"
);
console.log("🎓 You now understand Promises from the ground up! 🚀");
