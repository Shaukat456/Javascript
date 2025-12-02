Great! Let’s dive into the next essential topic:

---

# 🔁 JavaScript Loops

Loops allow you to **repeat actions** — like going through every item in a list, trying passwords, or updating game positions.

We’ll cover:

1. `for` loop
2. `while` and `do...while` loops
3. `for...of` and `for...in`
4. `Array.prototype.forEach()`
5. Real-world use cases
6. Internals & best practices

---

## 🧠 Why Loops?

Imagine you have to:

- Print all students' names
- Check every item in a shopping cart
- Generate 100 buttons

Without loops? It would be **repetitive** and **error-prone**.

---

## 🔁 1. `for` Loop — Classic Counter Loop

### 📘 Syntax:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### ⚙️ How it works:

- `let i = 0` → initialization
- `i < 5` → condition
- `i++` → increment

### 🧠 Analogy:

Like counting fingers one by one:
**Start** → **Check if still in range** → **Act** → **Move to next**

---

### ✅ Real-World Example:

```javascript
let students = ["Ali", "Sara", "John"];

for (let i = 0; i < students.length; i++) {
  console.log("Hello, " + students[i]);
}
```

🧰 Use Case: Loop through lists, menus, users, etc.

---

## 🔄 2. `while` and `do...while`

### 🔹 `while` — Loop as long as a condition is true

```javascript
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
```

🔧 Use when you **don’t know how many times** to loop — like **waiting for user input** or **sensor data**.

---

### 🔹 `do...while` — Runs at least once

```javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
```

🧠 Useful when you want the **first run guaranteed**.

---

## 🧭 3. `for...of` — Loop Through Values (Arrays, Strings)

```javascript
let colors = ["red", "green", "blue"];

for (let color of colors) {
  console.log(color);
}
```

✅ Clean and readable — **great for arrays**.

### 🧰 Use Case:

```javascript
let text = "Hello";

for (let char of text) {
  console.log(char); // H, e, l, l, o
}
```

---

## 🗂️ 4. `for...in` — Loop Through Object Keys

```javascript
let user = { name: "Ali", age: 25 };

for (let key in user) {
  console.log(key + ": " + user[key]);
}
```

✅ Use this for looping through object **properties**, not arrays.

---

## 🔄 5. `forEach()` — Array Method for Clean Iteration

```javascript
let items = ["apple", "banana", "mango"];

items.forEach(function (item, index) {
  console.log(index + ": " + item);
});
```

Or using arrow function:

```javascript
items.forEach((item) => console.log(item));
```

✅ Cleaner than `for` when working with arrays only.

---

## 💡 Real-World Applications

| Task                          | Best Loop                    |
| ----------------------------- | ---------------------------- |
| Looping through array values  | `for`, `for...of`, `forEach` |
| Looping through object props  | `for...in`                   |
| Repeat until condition breaks | `while`, `do...while`        |
| Fixed repetitions             | `for`                        |

---

## 🧠 Internals: Memory & Performance

- `for` is fastest but more verbose.
- `forEach` creates a function call for each item (slightly slower but cleaner).
- Avoid `for...in` on arrays — it includes **inherited properties** too.

---

## 🔥 Quick Practice

What will this print?

```javascript
let fruits = ["apple", "banana", "grape"];
for (let fruit of fruits) {
  console.log(fruit.toUpperCase());
}
```

✅ Output:

```
APPLE
BANANA
GRAPE
```

---

## 🧩 More Loop Examples

### 1. Nested `for` Loops (2D Array)

```javascript
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(`matrix[${row}][${col}] = ${matrix[row][col]}`);
  }
}
```

---

### 2. Breaking Out of a Loop

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // Prints 0 to 4
}
```

---

### 3. Skipping Iterations with `continue`

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // Prints 0, 1, 3, 4
}
```

---

### 4. Looping Over an Array of Objects

```javascript
let products = [
  { name: "Pen", price: 20 },
  { name: "Book", price: 100 },
  { name: "Bag", price: 250 },
];

for (let product of products) {
  console.log(`${product.name}: Rs.${product.price}`);
}
```

---

### 5. Using `forEach` with Arrow Functions

```javascript
let cities = ["Lahore", "Karachi", "Islamabad"];
cities.forEach((city) => console.log(city.toLowerCase()));
```

---

### 6. Looping Over Object Values

```javascript
let marks = { math: 90, english: 85, science: 92 };
for (let subject in marks) {
  console.log(`${subject}: ${marks[subject]}`);
}
```

---

### 7. While Loop for User Input (Simulated)

```javascript
let attempts = 0;
let password = "js123";
let guess;
let guesses = ["abc", "js12", "js123"];

while (guess !== password && attempts < guesses.length) {
  guess = guesses[attempts];
  console.log(`Attempt ${attempts + 1}: ${guess}`);
  attempts++;
}
console.log("Access granted!");
```

---

### 8. Do...While for Menu Selection (Simulated)

```javascript
let menu = ["Home", "About", "Contact"];
let idx = 0;
do {
  console.log(`Menu: ${menu[idx]}`);
  idx++;
} while (idx < menu.length);
```

---

### 9. Looping Backwards

```javascript
for (let i = 5; i > 0; i--) {
  console.log(i);
}
```

---

### 10. Filtering with Loops

```javascript
let numbers = [1, 2, 3, 4, 5, 6];
let evens = [];
for (let num of numbers) {
  if (num % 2 === 0) evens.push(num);
}
console.log(evens); // [2, 4, 6]
```

---

## 🧪 Practice Challenge

Write a loop to print all multiples of 3 from 1 to 20.

```javascript
for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0) console.log(i);
}
```

---

## 🧱 Summary Table

| Loop Type    | Use Case                             | Data Type       |
| ------------ | ------------------------------------ | --------------- |
| `for`        | Repetition with counter              | Any             |
| `while`      | Repeat until condition fails         | Any             |
| `do...while` | Ensure at least 1 run                | Any             |
| `for...of`   | Loop through values (arrays/strings) | Arrays, Strings |
| `for...in`   | Loop through object properties       | Objects         |
| `forEach()`  | Functional array looping             | Arrays          |
