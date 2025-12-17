---
---

# 🧠 What is a Callback Function? (From Zero)

## 📌 Simple Definition (One-Line)

A **callback function** is a **function that is passed as an argument to another function**, and is **called later**, usually **after some task is finished**.

> 📞 **Callback = “I’ll call you back when I’m done.”**

---

## 🧩 Why Did Callbacks Come Into JavaScript?

### ❌ Problem Without Callbacks

JavaScript is **single-threaded**:

- It can do **one thing at a time**
- If something takes time (API call, timer, file read), JS **cannot wait** by blocking everything

Example problem:

```js
const data = fetchData(); // takes 2 seconds
console.log(data); // ❌ JS doesn't wait → undefined
```

👉 JS needed a way to say:

> “Do this task, and **when it finishes**, run this code.”

✅ **Solution → Callbacks**

---

## 🛠 Real-Life Analogy (Very Important)

### 🍔 Restaurant Analogy

You order food 🍕
You **don’t stand at the counter waiting**

Instead:

- You give your **phone number**
- Restaurant says: _“We’ll call you when food is ready”_

📞 That phone number = **callback function**

---

## 🧱 Basic Structure of a Callback

### 1️⃣ Function that ACCEPTS a callback

```js
function doSomething(callback) {
  // do some work
  callback();
}
```

### 2️⃣ Function that is PASSED as callback

```js
function sayHello() {
  console.log("Hello!");
}

doSomething(sayHello);
```

📌 **Important**:

- You pass **function reference**
- NOT `sayHello()`
- Just `sayHello`

---

## 🔍 Very Simple Example (Step-by-Step)

```js
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

function sayBye() {
  console.log("Bye!");
}

greet("Ali", sayBye);
```

### 🧠 What Happens?

1. `greet()` runs
2. Prints `"Hello Ali"`
3. Calls `sayBye()`
4. Prints `"Bye!"`

---

## ⏱ Callbacks with Time (Asynchronous)

### ⏰ `setTimeout` (Classic Example)

```js
setTimeout(function () {
  console.log("This runs after 2 seconds");
}, 2000);
```

📌 Explanation:

- JS says: “Timer started”
- JS continues other work
- After 2 seconds → callback runs

---

## 🧪 Named vs Anonymous Callback

### 🔹 Anonymous Callback

```js
setTimeout(() => {
  console.log("Done");
}, 1000);
```

### 🔹 Named Callback

```js
function onDone() {
  console.log("Done");
}

setTimeout(onDone, 1000);
```

📌 **Interview Tip**:

> Both are callbacks — difference is **readability & reuse**

---

## 🧮 Callback in Array Methods (VERY COMMON)

### 1️⃣ `forEach`

```js
[1, 2, 3].forEach(function (num) {
  console.log(num);
});
```

📌 Here:

- `forEach` calls your function for **each element**
- Your function = callback

---

### 2️⃣ `map`

```js
const doubled = [1, 2, 3].map(function (num) {
  return num * 2;
});
```

---

### 3️⃣ `filter`

```js
const even = [1, 2, 3, 4].filter(function (num) {
  return num % 2 === 0;
});
```

📌 **All array methods work because of callbacks**

---

## 🌍 Real-World Use Cases

### 📡 1. API Call (Old Style)

```js
function fetchUser(callback) {
  setTimeout(() => {
    const user = { name: "Ali", age: 22 };
    callback(user);
  }, 2000);
}

fetchUser(function (user) {
  console.log(user.name);
});
```

---

### 🖱 2. Button Click (DOM)

```js
button.addEventListener("click", function () {
  console.log("Button clicked");
});
```

📌 Browser calls your function **when event happens**

---

### 📂 3. File Upload (Conceptual)

```js
uploadFile(file, function () {
  console.log("Upload complete");
});
```

---

## ⚠️ Callback Hell (BIG PROBLEM)

### 😵 Nested Callbacks

```js
getUser(id, function (user) {
  getOrders(user.id, function (orders) {
    getPayment(orders[0], function (payment) {
      console.log(payment);
    });
  });
});
```

📌 Problems:

- Hard to read
- Hard to debug
- Ugly indentation
- Error handling nightmare

❗ **This is why Promises came**

---

## 🧠 Error-First Callback (Interview Favorite)

Used in Node.js

```js
function readFile(callback) {
  const error = null;
  const data = "File data";

  callback(error, data);
}

readFile(function (err, data) {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Data:", data);
  }
});
```

📌 Rule:

```
callback(error, result)
```

---

## 🔄 Sync vs Async Callback

### ✅ Synchronous Callback

```js
[1, 2, 3].map((n) => n * 2);
```

### ⏳ Asynchronous Callback

```js
setTimeout(() => {
  console.log("Async");
}, 1000);
```

📌 Same concept — different timing

---

## ⚛️ Callbacks in React (VERY IMPORTANT)

### 🔹 Parent → Child Callback

```jsx
function Parent() {
  function handleClick() {
    console.log("Clicked from child");
  }

  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}
```

📌 Why callbacks in React?

- Child **talks back** to parent
- Parent controls state

---

## 🧠 Callbacks vs Promises vs Async/Await

| Feature        | Callback         | Promise       | Async/Await    |
| -------------- | ---------------- | ------------- | -------------- |
| Readability    | ❌ Low           | ✅ Better     | ✅ Best        |
| Error Handling | ❌ Hard          | ✅ `.catch()` | ✅ `try/catch` |
| Nesting        | ❌ Callback Hell | ⚠️ Chain      | ✅ Flat        |

📌 Modern JS prefers:
👉 **Promises → async/await**
But callbacks still exist **everywhere**

---

## 🎯 Common Interview Questions

### ❓ What is a callback?

A function passed as an argument and executed later.

### ❓ Why callbacks are needed?

To handle asynchronous operations.

### ❓ What is callback hell?

Deeply nested callbacks that reduce readability.

### ❓ Are callbacks synchronous?

They can be **both sync and async**.

### ❓ Where are callbacks used?

Events, timers, APIs, array methods, React props.

---

## 🧠 Mental Model (Remember This)

> **Callbacks = Control inversion**
>
> You don’t call the function
> Someone else calls it **for you**

---
