---
---

# 🚀 **Array.reduce() — The Power Tool of Arrays**

## 📌 Definition

`reduce()` executes a function **on each element of the array** and **reduces the array to a single value**.

### Single value can be:

✔ number
✔ string
✔ object
✔ another array
✔ ANYTHING you return

---

## 🧠 Real-world Analogy

Imagine counting total money in your pocket:

- You take a coin
- Add to total
- Take next coin
- Add to total
- Continue…

At the end → **one final total**

That's what reduce does.

---

## 🧪 Syntax

```js
array.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, initialValue);
```

### Terms:

| Term             | Meaning                                   |
| ---------------- | ----------------------------------------- |
| **accumulator**  | Stores total/previous result              |
| **currentValue** | Current item in array                     |
| **initialValue** | Starting value (optional but recommended) |

---

# 🌰 Example 1 — Sum of numbers

```js
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, cur) => acc + cur, 0);

console.log(sum); // 10
```

Flow:

```
acc=0, cur=1 → 1
acc=1, cur=2 → 3
acc=3, cur=3 → 6
acc=6, cur=4 → 10  → final result
```

---

# 🌰 Example 2 — Find Max Value

```js
const nums = [5, 9, 3, 12, 7];

const max = nums.reduce((acc, cur) => (cur > acc ? cur : acc));

console.log(max); // 12
```

---

# 🌰 Example 3 — Count Occurrences (VERY IMPORTANT IN INTERVIEWS)

```js
const letters = ["a", "b", "a", "c", "a", "b"];

const count = letters.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});

console.log(count); // {a:3, b:2, c:1}
```

---

# 🌎 Real Use Cases

### 1. Total cart price in e-commerce

### 2. total Likes/Comments

### 3. transforming data for backend

### 4. converting array → object

### 5. flatten nested arrays

---

# 🌰 Example 4 — Total Price (Shopping Cart)

```js
const cart = [
  { item: "Shirt", price: 1200 },
  { item: "Shoes", price: 2500 },
  { item: "Cap", price: 600 },
];

const total = cart.reduce((acc, cur) => acc + cur.price, 0);

console.log(total); // 4300
```

---

# 🌰 Example 5 — Grouping Data

```js
const people = [
  { name: "Ali", age: 20 },
  { name: "Sara", age: 22 },
  { name: "John", age: 20 },
];

const grouped = people.reduce((acc, person) => {
  (acc[person.age] = acc[person.age] || []).push(person.name);
  return acc;
}, {});

console.log(grouped);
// {20: ["Ali","John"], 22:["Sara"]}
```

---

# 🌰 Example 6 — Flatten Array

```js
const arr = [
  [1, 2],
  [3, 4],
  [5, 6],
];

const flat = arr.reduce((acc, cur) => acc.concat(cur), []);

console.log(flat); // [1,2,3,4,5,6]
```

---

# 🌰 Example 7 — Chaining Map + Filter + Reduce

```js
const nums = [10, 25, 7, 30, 45];

const result = nums
  .filter((n) => n > 20)
  .map((n) => n * 2)
  .reduce((acc, cur) => acc + cur, 0);

console.log(result); // (25*2 + 30*2 + 45*2) = 200
```

Real use: dashboards, analytics, finance calculations.

---

# 🔥 Why reduce is powerful?

Because **it can replace map, filter, find, group operations**
Reduce = Swiss Army Knife of arrays.

---

# ⚠ Common Mistakes

❌ Forgetting initial value
❌ Not returning accumulator
❌ Confusing map/filter tasks with reduce

Correct:

```js
arr.reduce((acc, cur) => acc + cur, 0);
```

---

# 📝 Interview Questions (with answers)

### **1. What does reduce do?**

**Answer:**
It processes array elements and reduces them to **a single output value** using an accumulator.

---

### **2. Why is initial value important?**

**Answer:**
It sets starting accumulator value and prevents bugs when array is empty.

---

### **3. Can reduce return a non-number?**

**Answer:**
Yes. It can return string, object, array, anything.

---

### **4. Use reduce to count frequency of elements.**

(Already above 👆)

---

### **5. Difference between reduce, map, filter?**

| Feature            | map    | filter | reduce       |
| ------------------ | ------ | ------ | ------------ |
| transform elements | ✅     | ❌     | ⚠ can do     |
| remove/filter      | ❌     | ✅     | ⚠ can do     |
| final output       | array  | array  | single value |
| power              | medium | medium | 🔥 very high |

---
