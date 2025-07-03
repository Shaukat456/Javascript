## 📦 Why Do We Need `defer` or `async`?

When you include a `<script>` tag in your HTML like this:

```html
<script src="script.js"></script>
```

By default, the browser:

1. **Stops parsing HTML**
2. **Downloads and runs the JS**
3. **Resumes rendering the page**

This can **slow down** your page load and cause layout issues, especially if the JS modifies the DOM or takes time to load.

---

## ⚙️ `defer` vs `async` — What's the Difference?

| Attribute | Behavior                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `defer`   | Loads the script **in parallel**, but executes **after HTML is fully parsed**, and **in order** of appearance. |
| `async`   | Loads the script **in parallel** and executes it **as soon as it’s downloaded**, **out of order**.             |
| _(none)_  | Default: blocks parsing until script loads and runs.                                                           |

---

### 🧪 Analogy:

Imagine you’re building a house (HTML), and you call some electricians (JavaScript files):

- **No Attribute:** Electrician stops everyone from working until he's done.
- **`async`:** Each electrician does their work _whenever_ they arrive, possibly messing up order.
- **`defer`:** Electricians wait until the house is fully built, then come in **one-by-one, in order.**

---

## ✅ `defer` Example (Best Practice)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
    <script src="analytics.js" defer></script>
    <script src="app.js" defer></script>
  </head>
  <body>
    <h1>Hello!</h1>
  </body>
</html>
```

### 💡 Use When:

- You want to **preserve script order**
- Scripts **interact with the DOM**
- Scripts are **non-blocking but necessary**

---

## ⚠️ `async` Example

```html
<script src="ads.js" async></script>
```

### 💡 Use When:

- Script is **independent** (like ads or analytics)
- Doesn’t rely on DOM or other scripts

---

## 🧠 Summary Table

| Feature                    | `defer` | `async` | (no attribute) |
| -------------------------- | ------- | ------- | -------------- |
| Downloads in parallel      | ✅      | ✅      | ❌             |
| Execution blocks HTML?     | ❌      | ❌      | ✅             |
| Executes after DOM parsed? | ✅      | ❌      | ❌             |
| Executes in order?         | ✅      | ❌      | ✅             |

---

## 💡 Bonus: Use `type="module"` + `defer`

If you're using modern JavaScript (ES6 modules):

```html
<script type="module" src="main.js"></script>
```

- Automatically behaves like `defer`
- Scope is local (variables don’t pollute global space)
- Supports `import`/`export`
