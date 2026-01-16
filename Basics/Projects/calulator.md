Perfect 👍
A **Calculator** is an **excellent beginner project** because it connects:

- HTML structure
- CSS styling
- **DOM manipulation**
- **Events**
- **JS logic**
- **Arrays & functions**
- Real-world UI thinking

We’ll build it **slowly**, **properly**, and **professionally**.

---

# 🧮 PROJECT: **Beginner Calculator (Real-World Style)**

### Features

✔ Numbers input
✔ + − × ÷
✔ Clear button
✔ Equal (=)
✔ Keyboard-like behavior
✔ Uses **JS logic (not eval first)**

---

## 🧠 BIG IDEA (IMPORTANT)

> Calculator = **Input → State → Operation → Output**

We don’t magically calculate.
We **store values**, then **operate**.

---

# 🧱 STEP 1: HTML (Structure Only)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Calculator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="calculator">
      <input id="display" disabled />

      <div class="buttons">
        <button class="btn">7</button>
        <button class="btn">8</button>
        <button class="btn">9</button>
        <button class="btn operator">+</button>

        <button class="btn">4</button>
        <button class="btn">5</button>
        <button class="btn">6</button>
        <button class="btn operator">-</button>

        <button class="btn">1</button>
        <button class="btn">2</button>
        <button class="btn">3</button>
        <button class="btn operator">*</button>

        <button class="btn">0</button>
        <button class="btn clear">C</button>
        <button class="btn equal">=</button>
        <button class="btn operator">/</button>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

---

# 🎨 STEP 2: CSS (Simple but Clean)

```css
body {
  font-family: Arial;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.calculator {
  width: 250px;
  padding: 15px;
  border-radius: 10px;
  background: #222;
}

#display {
  width: 100%;
  height: 40px;
  font-size: 20px;
  margin-bottom: 10px;
  text-align: right;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
}

.btn {
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
}

.operator {
  background: orange;
}

.equal {
  background: green;
  color: white;
}

.clear {
  background: red;
  color: white;
}
```

---

# 🧠 STEP 3: JavaScript – Select Elements

```js
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
```

🧠 `querySelectorAll` returns a **NodeList (like array)**
We can loop on it.

---

# 🧠 STEP 4: Calculator State (VERY IMPORTANT)

```js
let currentInput = "";
let operator = "";
let previousInput = "";
```

### What do these mean?

| Variable      | Purpose            |
| ------------- | ------------------ |
| currentInput  | Number being typed |
| operator      | + − × ÷            |
| previousInput | Stored value       |

---

# 🧠 STEP 5: Handle Button Clicks

```js
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;
    handleInput(value);
  });
});
```

🧠 Real-world idea:

> Every button sends its value → one function handles logic

---

# 🧠 STEP 6: Input Controller Function

```js
function handleInput(value) {
  if (!isNaN(value)) {
    currentInput += value;
    display.value = currentInput;
  }
}
```

### 🔍 Explanation

- `isNaN(value)` → checks if number
- Digits are **concatenated as strings**
- Display updates

---

# ➕ STEP 7: Operators Logic

```js
function handleInput(value) {
  if (!isNaN(value)) {
    currentInput += value;
    display.value = currentInput;
  } else if (["+", "-", "*", "/"].includes(value)) {
    operator = value;
    previousInput = currentInput;
    currentInput = "";
  }
}
```

🧠 We **store state**, not calculate yet.

---

# 🧮 STEP 8: Calculate Result

```js
else if (value === "=") {
  const num1 = Number(previousInput);
  const num2 = Number(currentInput);

  let result;

  if (operator === "+") result = num1 + num2;
  if (operator === "-") result = num1 - num2;
  if (operator === "*") result = num1 * num2;
  if (operator === "/") result = num1 / num2;

  display.value = result;
  currentInput = result;
}
```

🧠 This is **pure JS logic**

---

# 🧹 STEP 9: Clear Button

```js
else if (value === "C") {
  currentInput = "";
  previousInput = "";
  operator = "";
  display.value = "";
}
```

---

# ✅ FINAL COMPLETE JAVASCRIPT

```js
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.innerText);
  });
});

function handleInput(value) {
  if (!isNaN(value)) {
    currentInput += value;
    display.value = currentInput;
  } else if (["+", "-", "*", "/"].includes(value)) {
    operator = value;
    previousInput = currentInput;
    currentInput = "";
  } else if (value === "=") {
    const num1 = Number(previousInput);
    const num2 = Number(currentInput);

    let result;
    if (operator === "+") result = num1 + num2;
    if (operator === "-") result = num1 - num2;
    if (operator === "*") result = num1 * num2;
    if (operator === "/") result = num1 / num2;

    display.value = result;
    currentInput = result;
  } else if (value === "C") {
    currentInput = "";
    previousInput = "";
    operator = "";
    display.value = "";
  }
}
```

---

# 🧠 WHAT STUDENTS REALLY LEARN HERE

| Concept         | Used             |
| --------------- | ---------------- |
| DOM             | buttons, display |
| Events          | click            |
| State           | inputs, operator |
| Arrays          | button loops     |
| Functions       | logic            |
| Conditionals    | operations       |
| Real-world flow | UI → Logic → UI  |

---

# 🔥 NEXT LEVEL (Highly Recommended)

Choose one:

1️⃣ Add **decimal support**
2️⃣ Add **keyboard input**
3️⃣ Use `eval()` → then explain why it’s dangerous
4️⃣ Add **history (array of results)**
5️⃣ Convert into **React logic model**
6️⃣ Refactor using **objects instead of if-else**
