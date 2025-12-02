# 🔀 **Control Flow** in JavaScript

Control flow lets your program **decide what to do**, **when to do it**, and **under what conditions** — just like making decisions in real life.

We’ll cover:

1.  `if`, `else if`, `else`
2.  `switch`
3.  Ternary operator
4.  Real-world examples
5.  Internals & Best Practices

---

## 🧠 1. `if`, `else if`, `else`

### 📘 Syntax:

```javascript
if (condition) {
   code if true
} else if (anotherCondition) {
   code if previous was false, but this is true
} else {
   code if none are true
}
```

### 🎯 Real-World Example:

```javascript
let temp = 32;

if (temp > 40) {
  console.log("🔥 Too hot!");
} else if (temp >= 30) {
  console.log("🌤️ Pleasant");
} else {
  console.log("❄️ Cold");
}
```

🧠 **Analogy**: Like a security check:

- If you have ID → enter.
- Else if you have invitation → enter.
- Else → no entry.

---

### Internals:

- JS **evaluates conditions top to bottom**.
- As soon as it finds a `true`, it executes and skips the rest.

---

## 🎭 2. `switch` Statement

When you want to compare a **single value** against **multiple options**.

### 📘 Syntax:

```javascript
switch (expression) {
  case value1:
     do something
    break;
  case value2:
     do something else
    break;
  default:
     if nothing matches
}
```

### 🎯 Real-World Example:

```javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Weekend is near!");
    break;
  default:
    console.log("Regular day");
}
```

🧠 **Analogy**: Like a waiter checking your menu selection:

- "Chicken" → cook chicken.
- "Beef" → cook beef.
- Otherwise → cook veggies.

---

### ⚠️ Why Use `break`?

Without `break`, JavaScript **falls through** to the next case:

```javascript
let color = "blue";

switch (color) {
  case "blue":
    console.log("It's blue");
  case "green":
    console.log("Maybe it's green?");
}
 Output: "It's blue" AND "Maybe it's green?"
```

---

## ❓ 3. Ternary Operator — Short `if-else`

When you want **quick one-line conditions**.

### 📘 Syntax:

```javascript
condition ? doIfTrue : doIfFalse;
```

### 🧪 Example:

```javascript
let age = 18;
let msg = age >= 18 ? "Allowed" : "Not allowed";
console.log(msg);
("Allowed");
```

### 🔍 Use case: UI text, short display logic, pricing, login status

```javascript
let isLoggedIn = false;
console.log(isLoggedIn ? "Logout" : "Login");
```

---

## 🛠️ Real-World Project Example

### 🔒 Login Check

```javascript
let username = "admin";
let password = "1234";

if (username === "admin" && password === "1234") {
  console.log("✅ Access granted");
} else {
  console.log("❌ Access denied");
}
```

✅ Combines comparison & logical operators in control flow.

---

## ⚙️ Internals: How JS Evaluates Conditions

- Any **truthy** value passes the `if` check.
- JS uses **short-circuit evaluation**:

  - `&&` stops if first is `false`
  - `||` stops if first is `true`

```javascript
let user = null;

if (user || "Guest") {
  console.log("Welcome");  This runs
}
```

---

## 🔎 Common Mistakes

| Mistake                         | Explanation                                     |
| ------------------------------- | ----------------------------------------------- |
| Using `=` instead of `==`/`===` | `=` assigns value; use `===` to compare         |
| Forgetting `break` in `switch`  | Can lead to unwanted code execution             |
| Overusing nested `if`           | Use `switch` or combine conditions              |
| Misunderstanding truthy/falsy   | Empty strings, 0, `null`, `undefined` are falsy |

---

## 💡 Tips

- Prefer `===` over `==` for strict comparison
- Use `switch` when comparing a single variable with many values
- Use ternary for small decisions only (avoid nesting them)

---

## 🔁 Quick Practice

**Q1: What will this output?**

```javascript
let role = "admin";

if (role === "user") {
  console.log("User Panel");
} else if (role === "admin") {
  console.log("Admin Panel");
} else {
  console.log("Guest View");
}
```

✅ Output: `Admin Panel`

---

### ✅ Summary

| Structure | Use Case                      |
| --------- | ----------------------------- |
| `if/else` | Conditions with varying paths |
| `switch`  | Comparing 1 variable to many  |
| `? :`     | Simple, short conditions      |

---
