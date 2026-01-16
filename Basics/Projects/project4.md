- 🟢 Very beginner-friendly
- 🟢 Small but **REAL-WORLD useful**
- 🟢 Uses **arrays, objects, map, filter**
- 🟢 Uses **DOM + CSS manipulation**
- 🟢 Builds **professional JS thinking**

---

# 📌 PROJECT: **Expense Tracker (Mini Version)**

This is a **classic real-world app** used in:

- personal finance apps
- dashboards
- mobile apps
- interviews

But we’ll keep it **simple**.

---

## 🧠 CORE IDEA (IMPORTANT)

> **Data first, UI second**

We store expenses in an **array of objects**
UI is created using **map()**

---

# 🧱 STEP 1: HTML (Simple Structure)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Expense Tracker</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Expense Tracker</h1>

    <input id="titleInput" placeholder="Expense title" />
    <input id="amountInput" type="number" placeholder="Amount" />
    <button id="addBtn">Add Expense</button>

    <h3>Total: <span id="total">0</span></h3>

    <ul id="expenseList"></ul>

    <script src="script.js"></script>
  </body>
</html>
```

---

# 🎨 STEP 2: CSS (Clean & Beginner Friendly)

```css
body {
  font-family: Arial;
  padding: 20px;
}

input {
  padding: 6px;
  margin-right: 5px;
}

button {
  padding: 6px 10px;
  cursor: pointer;
}

.expense {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.amount {
  font-weight: bold;
}
```

---

# 🧠 STEP 3: JavaScript – Data Store

```js
let expenses = [];
```

Each expense will look like:

```js
{
  id: 123,
  title: "Food",
  amount: 500
}
```

---

# 🧠 STEP 4: Select DOM Elements

```js
const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("expenseList");
const totalText = document.getElementById("total");
```

---

# ➕ STEP 5: Add Expense (Objects + Array)

```js
addBtn.addEventListener("click", () => {
  const expense = {
    id: Date.now(),
    title: titleInput.value,
    amount: Number(amountInput.value),
  };

  expenses.push(expense);

  renderExpenses();
  updateTotal();

  titleInput.value = "";
  amountInput.value = "";
});
```

---

# 🧠 STEP 6: Render Expenses using `map()`

```js
function renderExpenses() {
  list.innerHTML = "";

  expenses.map((expense) => {
    const li = document.createElement("li");
    li.className = "expense";

    li.innerHTML = `
      <span>${expense.title}</span>
      <span class="amount">${expense.amount}</span>
      <button onclick="deleteExpense(${expense.id})">❌</button>
    `;

    list.appendChild(li);
  });
}
```

🧠 **map = data → UI**

---

# 🧮 STEP 7: Calculate Total (reduce concept without complexity)

```js
function updateTotal() {
  let total = 0;

  expenses.forEach((e) => {
    total += e.amount;
  });

  totalText.innerText = total;
}
```

---

# 🧠 STEP 8: Delete Expense (filter)

```js
function deleteExpense(id) {
  expenses = expenses.filter((e) => e.id !== id);
  renderExpenses();
  updateTotal();
}
```

---

# 🧠 WHAT THIS PROJECT TEACHES

| Concept         | Where             |
| --------------- | ----------------- |
| Arrays          | expenses          |
| Objects         | expense           |
| map             | render list       |
| filter          | delete            |
| DOM             | UI                |
| State           | total             |
| Real-world flow | finance app logic |

---

# 🔥 MINI CHALLENGES (For Students)

1️⃣ Highlight expenses above 1000
2️⃣ Add category (food, travel)
3️⃣ Save data in `localStorage`
4️⃣ Show today’s total only
5️⃣ Convert logic into `reduce()`

---

# 🧠 REAL WORLD TAKEAWAY

Every professional app works like this:

```
User Action
 ↓
Update Data
 ↓
Re-Render UI
```

---
