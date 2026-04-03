# 🧠 JavaScript Internals — Before You Touch React

> **Course Pre-requisite Module**
> Understanding how JavaScript _actually works_ under the hood — so that React, hooks, async data fetching, and state management make _intuitive sense_ instead of feeling like magic.

---

## 📚 Table of Contents

1. [The JavaScript Engine & Runtime](#1-the-javascript-engine--runtime)
2. [Execution Context](#2-execution-context)
3. [The Call Stack](#3-the-call-stack)
4. [Scope & the Scope Chain](#4-scope--the-scope-chain)
5. [Hoisting](#5-hoisting)
6. [Closures](#6-closures)
7. [The Event Loop](#7-the-event-loop)
8. [Callbacks, Promises & Async/Await](#8-callbacks-promises--asyncawait)
9. [The `this` Keyword](#9-the-this-keyword)
10. [Prototypes & Prototype Chain](#10-prototypes--the-prototype-chain)
11. [How This All Connects to React](#11-how-this-all-connects-to-react)

---

## 1. The JavaScript Engine & Runtime

### 🏭 The Analogy — A Restaurant Kitchen

Think of a **restaurant** operating during dinner service:

| Restaurant                                      | JavaScript                   |
| ----------------------------------------------- | ---------------------------- |
| The Kitchen                                     | JS Engine (V8, SpiderMonkey) |
| The Order Tickets                               | Your JavaScript Code         |
| The Head Chef                                   | The Call Stack               |
| The Expediter (coordinates kitchen ↔ waitstaff) | The Event Loop               |
| Orders waiting in the queue                     | Callback / Task Queue        |
| Prep cooks working in the background            | Web APIs (setTimeout, fetch) |

The **JavaScript Engine** (like Google's V8, which runs Node.js and Chrome) is responsible for reading, compiling, and executing your code.

```
Your Code (.js file)
      │
      ▼
  JS Engine
  ┌─────────────────────────┐
  │  Parser (reads code)    │
  │  Compiler (JIT)         │
  │  Interpreter (runs it)  │
  └─────────────────────────┘
      │
      ▼
  JavaScript Runtime
  ┌────────────────────────────────────────────┐
  │  Call Stack  │  Heap (Memory)              │
  │  ─────────── │  ──────────────────────     │
  │  Web APIs    │  (setTimeout, fetch, DOM)   │
  │  Event Loop  │  Task Queue / Micro Queue   │
  └────────────────────────────────────────────┘
```

> ⚡ **Key Insight:** JavaScript is **single-threaded** — it can only do one thing at a time. The Event Loop is the clever trick that makes it _seem_ concurrent.

---

## 2. Execution Context

### 🏠 The Analogy — A Room with Everything You Need

Imagine you're about to write an exam. The exam room provides you with:

- A **desk** (your working memory / variables)
- A **rulebook** (the language rules)
- A **reference sheet** of what's already defined (the outer environment)

An **Execution Context** is exactly this — a contained environment that JavaScript creates every time code runs. It packages together:

1. **Variable Environment** — all variables and function declarations
2. **Scope Chain** — links to the outer environment
3. **`this` binding** — what `this` refers to in that context

### 🔬 Two Phases of Execution Context Creation

Every execution context is created in **two phases**:

```
Phase 1: CREATION PHASE
─────────────────────────────────────────
• Memory allocated for variables (set to undefined)
• Function declarations stored in full
• `this` is determined
• Scope chain is created

Phase 2: EXECUTION PHASE
─────────────────────────────────────────
• Code runs line by line
• Variables get assigned their actual values
• Functions are called (creating new contexts)
```

### 💻 Code Example

```javascript
// When JavaScript first loads this file, it creates the
// Global Execution Context (GEC)

const name = "Ahmed"; // Phase 1: name = undefined → Phase 2: name = "Ahmed"
const age = 25; // Phase 1: age = undefined  → Phase 2: age = 25

function greet(person) {
  // Phase 1: greet = <function stored in full>
  const message = `Hello, ${person}!`;
  return message;
}

const result = greet(name); // A NEW Execution Context is created for greet()
```

**What JavaScript is actually doing:**

```
GLOBAL EXECUTION CONTEXT
┌─────────────────────────────────────┐
│ Variable Environment:               │
│   name      → "Ahmed"              │
│   age       → 25                   │
│   greet     → <function>           │
│   result    → undefined → "Hello!" │
│                                     │
│ this → window (browser) /          │
│        global (Node.js)            │
└─────────────────────────────────────┘

When greet("Ahmed") is called:
┌─────────────────────────────────────┐
│ greet() EXECUTION CONTEXT           │
│ Variable Environment:               │
│   person    → "Ahmed"              │
│   message   → "Hello, Ahmed!"      │
│                                     │
│ Scope Chain → points to GEC above  │
└─────────────────────────────────────┘
```

> 🔑 **There is always exactly one Global Execution Context.** Every function call creates a brand new Execution Context stacked on top.

---

## 3. The Call Stack

### 📚 The Analogy — A Stack of Plates

Picture a stack of plates at a buffet:

- You can only **add** plates to the top (**push**)
- You can only **remove** plates from the top (**pop**)
- The plate on top is always the one being worked on

The **Call Stack** works exactly the same way with Execution Contexts. It's a **LIFO** (Last In, First Out) data structure.

```javascript
function bake() {
  console.log("Baking the cake...");
}

function prepare() {
  bake(); // ← calls bake
  console.log("Preparation done");
}

function makeWeddingCake() {
  prepare(); // ← calls prepare
  console.log("Wedding cake ready!");
}

makeWeddingCake();
```

**Call Stack in action:**

```
Step 1: makeWeddingCake() called
┌─────────────────────┐
│  makeWeddingCake()  │  ← TOP (currently executing)
├─────────────────────┤
│  Global Context     │
└─────────────────────┘

Step 2: prepare() called from inside makeWeddingCake
┌─────────────────────┐
│     prepare()       │  ← TOP
├─────────────────────┤
│  makeWeddingCake()  │
├─────────────────────┤
│  Global Context     │
└─────────────────────┘

Step 3: bake() called from inside prepare
┌─────────────────────┐
│      bake()         │  ← TOP (executing now)
├─────────────────────┤
│     prepare()       │
├─────────────────────┤
│  makeWeddingCake()  │
├─────────────────────┤
│  Global Context     │
└─────────────────────┘

Step 4: bake() finishes → POPPED off
Step 5: prepare() finishes → POPPED off
Step 6: makeWeddingCake() finishes → POPPED off
Step 7: Only Global Context remains
```

### ⚠️ Stack Overflow

When a function calls itself forever (infinite recursion), the stack runs out of space:

```javascript
// 🚨 This will crash: "Maximum call stack size exceeded"
function infinite() {
  infinite(); // calls itself with no exit condition
}

infinite();
```

> 💡 **This is where the term "Stack Overflow" comes from** — yes, the website is named after this exact bug!

---

## 4. Scope & the Scope Chain

### 🏢 The Analogy — Floors of a Building

Imagine a company building:

- **Ground Floor (Global Scope)** — the lobby, accessible to everyone
- **Floor 2 (Function Scope)** — an office, only people in that office can use its equipment
- **Floor 3 (Block Scope)** — a private meeting room inside that office

When you look for something (a variable), you start on your floor. If you can't find it, you go **down** to the floor below. You **never** go up to a floor above you.

```javascript
const company = "TechCorp"; // Global scope — everyone can see this

function department() {
  const team = "Frontend"; // department() scope

  function employee() {
    const name = "Sara"; // employee() scope

    // Sara can see: name, team, company ✅
    console.log(`${name} works on ${team} at ${company}`);
  }

  // department() can see: team, company ✅
  // department() CANNOT see: name ❌
  employee();
}

// Global can see: company ✅
// Global CANNOT see: team or name ❌
department();
```

**The Scope Chain:**

```
employee() scope
  │ has: name = "Sara"
  │ can't find 'team'? → looks UP ↑
  ▼
department() scope
  │ has: team = "Frontend"
  │ can't find 'company'? → looks UP ↑
  ▼
global scope
  │ has: company = "TechCorp"
  │ found it! ✅
```

### `let`, `const` vs `var` — Block Scope vs Function Scope

```javascript
function example() {
  if (true) {
    var x = 10; // Function-scoped — leaks OUT of the if block
    let y = 20; // Block-scoped — stays INSIDE the if block
    const z = 30; // Block-scoped — stays INSIDE the if block
  }

  console.log(x); // ✅ 10 — var leaks
  console.log(y); // ❌ ReferenceError — let is block-scoped
  console.log(z); // ❌ ReferenceError — const is block-scoped
}
```

> 🚦 **Rule of thumb:** Always use `const` by default, `let` when you need to reassign, and **avoid `var`** — its function-scoped behavior leads to subtle bugs.

---

## 5. Hoisting

### 🏗️ The Analogy — Construction Blueprint vs Actual Building

When a building is under construction, the architect's blueprint exists _before_ any walls are built. Hoisting is JavaScript's way of "reading the blueprint" (Creation Phase) before actually "building" (Execution Phase).

During the **Creation Phase** of an Execution Context:

- **`var` declarations** are hoisted and initialized to `undefined`
- **Function declarations** are hoisted **in full** (definition included)
- **`let` and `const`** are hoisted but **NOT initialized** (Temporal Dead Zone)

```javascript
// What you write:
console.log(city); // ?
var city = "Karachi";
console.log(city); // ?

greet(); // ?
function greet() {
  console.log("Hello!");
}

// What JavaScript sees (after hoisting):
var city; // declaration hoisted, value is undefined
greet; // function hoisted IN FULL

console.log(city); // undefined  (not an error, but not "Karachi" yet)
city = "Karachi";
console.log(city); // "Karachi"

greet(); // "Hello!" — works because full function was hoisted
function greet() {
  console.log("Hello!");
}
```

### The Temporal Dead Zone (TDZ)

```javascript
// 🚨 This throws: Cannot access 'city' before initialization
console.log(city);
let city = "Karachi";

// `let` and `const` are hoisted but sit in a "Temporal Dead Zone"
// from the start of the block until the declaration line is reached.
```

```
Timeline of a `let` variable:

Start of scope ──────────► Declaration line ──────────► End of scope
      │                           │                           │
   [TDZ begins]              [TDZ ends]                [variable dies]
      │                           │
  ❌ Access here             ✅ Access here
  throws ReferenceError       works normally
```

---

## 6. Closures

### 📬 The Analogy — A Backpack from Home

Imagine you leave your hometown (Karachi) to study abroad. You take a **backpack** filled with things from home — your local contacts, your mother's recipes, a house key.

Even in a new country (a new function scope), you still have access to everything in your backpack (the variables from where you came from).

**A closure is a function that carries its backpack — it remembers the variables from the scope where it was created, even after that scope has finished executing.**

```javascript
function makeCounter() {
  let count = 0; // This is the "backpack" item

  return function () {
    // This inner function closes over `count`
    count++;
    return count;
  };
}

const counter = makeCounter();
// makeCounter() has finished executing.
// Normally, `count` would be gone.
// But the returned function still holds a reference to it! (the backpack)

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**Memory diagram:**

```
makeCounter() finishes → execution context removed from stack
BUT the returned function holds a reference:

returned function
  └── [[Closure]] backpack
        └── count = 3  (persists in memory)
```

### 🔒 Closures for Data Privacy

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private — no direct outside access

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited ${amount}. Balance: ${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("Insufficient funds!");
        return;
      }
      balance -= amount;
      console.log(`Withdrew ${amount}. Balance: ${balance}`);
    },
    getBalance() {
      return balance;
    },
  };
}

const myAccount = createBankAccount(1000);

myAccount.deposit(500); // Deposited 500. Balance: 1500
myAccount.withdraw(200); // Withdrew 200. Balance: 1300
console.log(myAccount.balance); // undefined — balance is PRIVATE
console.log(myAccount.getBalance()); // 1300 — only accessible via closure
```

### ⚠️ Classic Closure Gotcha (and the Fix)

```javascript
// 🐛 The Bug — all functions share the SAME `i`
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // prints 3, 3, 3 — not 0, 1, 2!
  }, 1000);
}
// `var` is function-scoped, so all callbacks close over the SAME variable

// ✅ Fix 1 — use `let` (block-scoped, new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // prints 0, 1, 2 ✅
  }, 1000);
}

// ✅ Fix 2 — use an IIFE to capture current value
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // prints 0, 1, 2 ✅
    }, 1000);
  })(i);
}
```

> 💡 **React Connection:** `useState`, `useEffect`, and `useCallback` all heavily rely on closures. When you see stale state bugs in React, it's almost always a closure issue.

---

## 7. The Event Loop

### 🚦 The Analogy — A Single Cashier at a Busy Café

A café has **one cashier** (single thread). People order coffee that takes time to brew (async operations). The cashier doesn't stand there waiting — they hand the order to the barista (Web API), take the next customer, and only come back to deliver coffee when they're free AND the order is ready.

**The pieces:**

| Café                              | JavaScript                               |
| --------------------------------- | ---------------------------------------- |
| Cashier                           | Call Stack (one at a time)               |
| Customer Orders                   | Function calls                           |
| Barista / Kitchen                 | Web APIs (setTimeout, fetch, DOM events) |
| Ready orders waiting to be served | Task Queue (Callback Queue)              |
| Manager watching queue & cashier  | Event Loop                               |
| VIP orders (processed first)      | Microtask Queue (Promises)               |

```
┌──────────────────────────────────────────────────────────┐
│                    JavaScript Runtime                     │
│                                                          │
│  ┌─────────────┐        ┌──────────────────────────┐    │
│  │  Call Stack │        │        Web APIs           │    │
│  │             │        │  (setTimeout, fetch,      │    │
│  │  greet()    │◄──────►│   DOM events, etc.)       │    │
│  │  main()     │        │                          │    │
│  └──────┬──────┘        └──────────────────────────┘    │
│         │                            │                   │
│         │ Event Loop                 │ when done         │
│         │ watches both               ▼                   │
│         │               ┌────────────────────────┐      │
│         │               │   Microtask Queue      │      │
│         │               │  (Promise callbacks)   │      │
│         │               ├────────────────────────┤      │
│         └──────────────►│   Task / Callback Queue│      │
│                         │  (setTimeout, etc.)    │      │
│                         └────────────────────────┘      │
└──────────────────────────────────────────────────────────┘
```

**The Event Loop Rule:**

> "If the Call Stack is empty, take the first item from the Microtask Queue (if any), else take from the Task Queue, and push it onto the Call Stack."

### 💻 Step-by-Step Walkthrough

```javascript
console.log("1: Start");

setTimeout(function taskA() {
  console.log("3: setTimeout callback");
}, 0);

Promise.resolve().then(function microA() {
  console.log("2: Promise .then");
});

console.log("4: End");

// Output order:
// 1: Start
// 4: End
// 2: Promise .then       ← Microtask Queue runs BEFORE Task Queue
// 3: setTimeout callback ← Task Queue runs LAST
```

**Why this order?**

```
Timeline:
─────────────────────────────────────────────────────────
[Sync code runs first]
  console.log("1") → logs "1: Start"
  setTimeout → handed off to Web API, registered for ~0ms later
  Promise.resolve().then → .then callback placed in Microtask Queue
  console.log("4") → logs "4: End"

[Call Stack is now empty — Event Loop checks queues]
  Microtask Queue has microA → pushed to Call Stack
  microA runs → logs "2: Promise .then"
  Microtask Queue empty

  Task Queue has taskA → pushed to Call Stack
  taskA runs → logs "3: setTimeout callback"
─────────────────────────────────────────────────────────
```

> 🔑 **Microtasks (Promises) ALWAYS run before Macrotasks (setTimeout, setInterval)**. This is why Promise chains resolve "sooner" than timeouts even with 0ms delay.

---

## 8. Callbacks, Promises & Async/Await

### 📦 The Analogy — Ordering a Package Online

**Callback = Leaving a sticky note:** "Call me when the package arrives"
**Promise = A tracking number:** "Here's proof it's coming. You can check on it."
**Async/Await = Just waiting at the door:** Simplified way to handle the Promise result.

### Callbacks

```javascript
// 🍕 Order pizza — tell them to call you when it's ready
function orderPizza(topping, callback) {
  console.log(`Ordering ${topping} pizza...`);

  setTimeout(function () {
    const pizza = `${topping} pizza 🍕`;
    callback(pizza); // "Here's your pizza!"
  }, 2000);
}

orderPizza("Margherita", function (pizza) {
  console.log(`Got my ${pizza}!`);
});
```

### 😵 Callback Hell

```javascript
// Reading a file → parsing it → fetching data → saving result
readFile("config.json", function (err, config) {
  if (err) handleError(err);
  else {
    parseConfig(config, function (err, settings) {
      if (err) handleError(err);
      else {
        fetchUserData(settings.userId, function (err, user) {
          if (err) handleError(err);
          else {
            saveToDatabase(user, function (err, result) {
              if (err) handleError(err);
              else {
                console.log("Done!"); // We're now 4 levels deep 😵
              }
            });
          }
        });
      }
    });
  }
});
// This "pyramid of doom" is hard to read, debug, and maintain.
```

### Promises — A Better Way

```javascript
// A Promise is an object that represents a value
// that will be available NOW, in the FUTURE, or NEVER

const pizzaPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    const success = true;

    if (success) {
      resolve("Margherita pizza 🍕"); // Order fulfilled ✅
    } else {
      reject("Pizza shop closed ❌"); // Order failed ❌
    }
  }, 2000);
});

pizzaPromise
  .then((pizza) => console.log(`Got: ${pizza}`)) // handles success
  .catch((error) => console.log(`Error: ${error}`)) // handles failure
  .finally(() => console.log("Order complete")); // runs either way
```

**Promise States:**

```
         ┌─── resolve() ──► FULFILLED
PENDING ──┤
         └─── reject()  ──► REJECTED
```

### Promise Chaining — Escape from Callback Hell

```javascript
readFile("config.json")
  .then((config) => parseConfig(config))
  .then((settings) => fetchUserData(settings.userId))
  .then((user) => saveToDatabase(user))
  .then((result) => console.log("Done! ✅", result))
  .catch((err) => console.error("Something went wrong:", err));
// Flat, readable, maintainable ✅
```

### Async/Await — Promises with a Friendly Face

```javascript
// async/await is syntactic sugar over Promises.
// It doesn't change how the Event Loop works.
// It just makes async code LOOK synchronous.

async function orderAndEat() {
  try {
    console.log("Placing order...");

    const pizza = await orderPizza("Pepperoni"); // waits here
    console.log(`Received: ${pizza}`);

    const drink = await orderDrink("Pepsi"); // waits here
    console.log(`Received: ${drink}`);

    console.log("Enjoying meal! 🍽️");
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

orderAndEat();
// The function appears to "pause" at each await,
// but under the hood, it's all Promises and the Event Loop.
```

### Running Promises in Parallel

```javascript
// ❌ Sequential (slow — each waits for the previous)
const pizza = await orderPizza("Margherita"); // wait 2s
const drink = await orderDrink("Pepsi"); // wait 1s
const salad = await orderSalad("Caesar"); // wait 1s
// Total: 4 seconds

// ✅ Parallel (fast — all start at the same time)
const [pizza, drink, salad] = await Promise.all([
  orderPizza("Margherita"),
  orderDrink("Pepsi"),
  orderSalad("Caesar"),
]);
// Total: 2 seconds (longest operation)
```

---

## 9. The `this` Keyword

### 🪞 The Analogy — "This Table" at a Restaurant

When a waiter says "this table needs water," **"this"** depends on **which table they're standing at** — the context determines the meaning.

In JavaScript, `this` refers to the **object that is currently executing the function** — and it depends entirely on _how_ the function is called.

```javascript
// Rule 1: Global context → this = window (browser) or global (Node.js)
console.log(this); // Window { ... }

// Rule 2: Object method → this = the object before the dot
const user = {
  name: "Fatima",
  greet() {
    console.log(`Hi, I'm ${this.name}`); // this = user object
  },
};
user.greet(); // "Hi, I'm Fatima"

// Rule 3: Regular function → this = undefined (strict mode) or window
function showThis() {
  console.log(this); // Window (or undefined in strict mode)
}
showThis();

// Rule 4: Arrow function → this = inherited from surrounding scope
const team = {
  name: "Frontend",
  members: ["Ali", "Sara"],

  listMembers() {
    this.members.forEach((member) => {
      // Arrow function: `this` = team (from listMembers' context)
      console.log(`${member} is on ${this.name}`);
    });
  },
};
team.listMembers();
// "Ali is on Frontend"
// "Sara is on Frontend"
```

### `call`, `apply`, `bind` — Manually Setting `this`

```javascript
function introduce(city, country) {
  console.log(`I'm ${this.name} from ${city}, ${country}`);
}

const person = { name: "Hassan" };

// call — invoke immediately, args passed individually
introduce.call(person, "Karachi", "Pakistan");
// "I'm Hassan from Karachi, Pakistan"

// apply — invoke immediately, args passed as array
introduce.apply(person, ["Karachi", "Pakistan"]);
// "I'm Hassan from Karachi, Pakistan"

// bind — returns a NEW function with `this` permanently set
const hasanIntro = introduce.bind(person);
hasanIntro("Karachi", "Pakistan");
// "I'm Hassan from Karachi, Pakistan"
```

---

## 10. Prototypes & the Prototype Chain

### 🧬 The Analogy — Family Traits

A child inherits traits from their parents. If you ask "can the child speak?", you check the child first. Not found? Check the parent. Not found? Check the grandparent. That's a prototype chain.

```javascript
// Every object in JS has a hidden link: [[Prototype]]
// to another object — its "parent"

const animal = {
  breathe() {
    console.log("Breathing...");
  },
};

const dog = {
  bark() {
    console.log("Woof!");
  },
};

// Set animal as dog's prototype
Object.setPrototypeOf(dog, animal);

dog.bark(); // ✅ Found on dog itself
dog.breathe(); // ✅ Not on dog → found on animal (prototype)
```

**Prototype Chain lookup:**

```
dog.breathe()
  │
  ▼ Look in dog → not found
  │
  ▼ Look in dog.__proto__ (= animal) → FOUND ✅
```

### Constructor Functions & Classes

```javascript
// Modern class syntax (syntactic sugar over prototypes)
class Vehicle {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  describe() {
    return `${this.make} goes ${this.speed}km/h`;
  }
}

class Car extends Vehicle {
  constructor(make, speed, doors) {
    super(make, speed); // calls Vehicle's constructor
    this.doors = doors;
  }

  describe() {
    return `${super.describe()} with ${this.doors} doors`;
  }
}

const myCar = new Car("Toyota", 180, 4);
console.log(myCar.describe());
// "Toyota goes 180km/h with 4 doors"
```

**The chain:**

```
myCar → Car.prototype → Vehicle.prototype → Object.prototype → null
```

---

## 11. How This All Connects to React

Now that you understand the internals, let's see exactly _why_ React works the way it does.

### Closures → useState & Stale State

```javascript
// React's useState is built on closures!
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count); // ⚠️ Stale closure!
      // `count` was captured when the effect ran (count = 0)
      // The interval callback closes over the OLD value of count
    }, 1000);

    return () => clearInterval(interval);
  }, []); // empty dep array = only runs once = closure over count=0

  // Fix: include count in dependencies OR use functional update
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1); // ✅ functional update — no stale closure
    }, 1000);
    return () => clearInterval(interval);
  }, []);
}
```

### Event Loop → Why setState is Async

```javascript
// React batches state updates — they go into a queue,
// not the Call Stack immediately.

function handleClick() {
  setCount(count + 1);
  setName("Ali");
  setAge(25);

  // React doesn't re-render 3 times.
  // It batches all 3 updates and re-renders ONCE
  // after the current synchronous block finishes
  // — this is Event Loop + microtask behavior!
}
```

### Execution Context → Component Scope

```javascript
// Every component function call = a new Execution Context
function UserCard({ userId }) {
  // This entire function body is ONE execution context
  // Each render = a new context with fresh variables

  const [user, setUser] = useState(null); // variable in this context

  // The hook "remembers" state between renders via React's fiber system
  // not the execution context (which is fresh each time)
}
```

### Prototype Chain → Why `instanceof` Works in React

```javascript
class MyError extends Error {
  // extends the Error prototype chain
  constructor(message) {
    super(message);
    this.name = "MyError";
  }
}

// React Error Boundaries use instanceof checks on the prototype chain
// to decide whether to catch an error
```

### Async/Await → Data Fetching in Next.js

```javascript
// Next.js Server Components use async/await natively
// because of Promise support built on the Event Loop

// app/page.js (Next.js 13+ App Router)
async function Page() {
  // This is an async Server Component
  const data = await fetch("https://api.example.com/posts");
  const posts = await data.json();

  return (
    <main>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
```

---

## 📝 Quick Reference Cheatsheet

| Concept               | One-liner                                                          | React Relevance                                      |
| --------------------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
| **Execution Context** | The environment where code runs (variables + `this` + scope chain) | Every component render creates a new one             |
| **Call Stack**        | LIFO stack of execution contexts                                   | Understanding render order, errors                   |
| **Scope Chain**       | Variable lookup from inner → outer scope                           | Accessing props and context inside components        |
| **Hoisting**          | `var` & function declarations moved to top during creation phase   | Avoid `var` in components                            |
| **Closures**          | Functions that remember their birthplace scope                     | `useState`, `useCallback`, `useMemo`, event handlers |
| **Event Loop**        | Manages async execution via Call Stack + Queues                    | Why state updates are batched, why `fetch` works     |
| **Promises**          | Objects representing future values (pending/fulfilled/rejected)    | `useEffect`, data fetching, loading states           |
| **Async/Await**       | Cleaner syntax for Promises                                        | Server components, API routes, client fetching       |
| **`this`**            | The object context of a function call                              | Class components (legacy), event handlers            |
| **Prototype Chain**   | Inheritance chain of objects                                       | Classes, `instanceof`, `extends` in React            |

---

## 🧪 Practice Exercises

### Exercise 1 — Predict the Output

```javascript
let x = 10;

function outer() {
  let x = 20;

  function inner() {
    console.log(x);
  }

  inner();
}

outer();
console.log(x);
```

_What does each `console.log` print, and why?_

---

### Exercise 2 — Fix the Closure Bug

```javascript
const fns = [];

for (var i = 0; i < 5; i++) {
  fns.push(function () {
    return i;
  });
}

console.log(fns[0]()); // Expected: 0, Actual: ?
console.log(fns[3]()); // Expected: 3, Actual: ?
```

_Identify the bug and provide two ways to fix it._

---

### Exercise 3 — Event Loop Order

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

console.log("E");
```

_Write the exact output order and explain why._

---

### Exercise 4 — Build a Rate Limiter Using Closures

```javascript
// Using closures, build a function `createRateLimiter(limit, interval)`
// that returns a function which only allows `limit` calls per `interval` ms.

const limiter = createRateLimiter(3, 1000); // max 3 calls per second

limiter(() => console.log("Call 1")); // executes
limiter(() => console.log("Call 2")); // executes
limiter(() => console.log("Call 3")); // executes
limiter(() => console.log("Call 4")); // blocked (limit reached)
```

---

### Exercise 5 — Convert to Async/Await

```javascript
// Convert this callback-based code to use async/await with proper error handling:
function loadUserData(userId, callback) {
  fetchUser(userId, function (err, user) {
    if (err) return callback(err);
    fetchPosts(user.id, function (err, posts) {
      if (err) return callback(err);
      fetchComments(posts[0].id, function (err, comments) {
        if (err) return callback(err);
        callback(null, { user, posts, comments });
      });
    });
  });
}
```

---

## 🎓 You're Ready for React When You Can Answer:

- [ ] Why does `console.log(count)` inside `setTimeout` show a stale value in React?
- [ ] Why does `setState` not immediately update the component?
- [ ] Why does an arrow function in a React event handler behave differently from a regular function regarding `this`?
- [ ] Why does `Promise.all` load data faster than sequential `await` calls?
- [ ] What is the Temporal Dead Zone, and why should you never use `var` in components?

Once these feel natural — **you're ready to understand React from the inside out.**

---
