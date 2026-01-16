---
---

# 🧠 WHAT IS `try...catch`? (BIG IDEA)

> `try...catch` is used to **handle runtime errors**
> so your app **doesn’t crash**.

### Simple English:

> “Try to run this code.
> If something goes wrong, catch the error and handle it.”

---

## ❌ WITHOUT `try...catch`

```js
console.log("Start");
let x = y + 1; // ❌ y is not defined
console.log("End");
```

👉 Program **crashes**, `"End"` never runs.

---

## ✅ WITH `try...catch`

```js
console.log("Start");

try {
  let x = y + 1;
} catch (error) {
  console.log("Something went wrong");
}

console.log("End");
```

✔ App continues
✔ Error handled gracefully

---

# 🧠 REAL-WORLD ANALOGY 🏥

### Hospital Example:

- `try` → Doctor performs surgery
- Error happens → bleeding
- `catch` → emergency treatment
- Patient survives

Without `catch` → patient dies 😄

---

# 🧠 WHAT KIND OF ERRORS DOES IT CATCH?

`try...catch` catches **runtime errors only** ❗

| Type          | Caught?             |
| ------------- | ------------------- |
| Syntax Error  | ❌ (before running) |
| Runtime Error | ✅                  |
| Logic Error   | ❌                  |

---

### ❌ Syntax error (won’t work)

```js
try {
  let x = ;
} catch (e) {}
```

---

### ❌ Logic error (wrong answer, no crash)

```js
let sum = 2 + "2"; // "22"
```

No error → nothing to catch.

---

# 🧠 BASIC SYNTAX (MEMORIZE THIS)

```js
try {
  // risky code
} catch (error) {
  // handle error
}
```

---

# 🧠 WHAT IS `error`?

```js
catch (error) {
  console.log(error.message);
}
```

`error` is an **object**:

```js
{
  name: "ReferenceError",
  message: "y is not defined",
  stack: "..."
}
```

---

# 🧪 EXAMPLE 1: Beginner Level

```js
try {
  let num = JSON.parse("abc"); // invalid JSON
} catch (err) {
  console.log("Invalid JSON");
}
```

✔ Prevents app crash
✔ User-friendly message

---

# 🧠 EXAMPLE 2: User Input Validation (REAL APP)

```js
function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  } catch (err) {
    return err.message;
  }
}

divide(10, 0); // "Cannot divide by zero"
```

---

## 🧠 IMPORTANT: `throw`

You can **create your own errors**.

```js
throw new Error("Custom error message");
```

---

# 🧠 EXAMPLE 3: DOM Example

```js
try {
  document.getElementById("btn").addEventListener("click", () => {
    console.log("Clicked");
  });
} catch (err) {
  console.log("Button not found");
}
```

Without try/catch → app crashes
With try/catch → app survives

---

# 🧠 FINALLY (VERY IMPORTANT)

`finally` **always runs**
(error ho ya na ho)

```js
try {
  console.log("Try");
} catch (e) {
  console.log("Catch");
} finally {
  console.log("Always runs");
}
```

---

# 🧠 EXAMPLE 4: Cleanup Example

```js
try {
  console.log("Opening file");
  throw new Error();
} catch {
  console.log("Error occurred");
} finally {
  console.log("Closing file");
}
```

---

# 🧠 TRY...CATCH WITH PROMISES

### ❌ This WON’T work

```js
try {
  fetch("api").then((res) => res.json());
} catch {}
```

Because Promises are **async**.

---

### ✅ Correct way (async/await)

```js
async function getData() {
  try {
    const res = await fetch("api");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Network error");
  }
}
```

🔥 **This is how real apps handle API errors**

---

# 🧠 COMMON MISTAKES (IMPORTANT)

❌ Using try/catch everywhere
❌ Hiding errors silently
❌ Catching without logging
❌ Using it for normal logic

---

# 🧠 WHEN SHOULD YOU USE TRY/CATCH?

✅ API calls
✅ JSON parsing
✅ LocalStorage
✅ User input validation
✅ File handling
❌ Normal if-else logic

---

# 🧠 SMALL PRACTICE TASKS

1️⃣ Parse invalid JSON safely
2️⃣ Handle divide by zero
3️⃣ Wrap DOM selector
4️⃣ Fetch fake API with error handling

---

# 🧠 ONE-LINE SUMMARY (EXAM / INTERVIEW)

> `try...catch` prevents application crashes by handling runtime errors gracefully.

---

# 🚀 NEXT (Tell me what you want)

- `try...catch` vs `if-else`
- Custom error classes
- Error handling patterns
- try/catch in React
- Debugging techniques
