Great! Let’s learn **JavaScript Loops** in the clearest and most practical way possible — with **examples, diagrams, and real-world use cases**.

---

# 🚀 **Mastering Loops in JavaScript (Beginner → Advanced)**

A **loop** lets you **repeat a task multiple times** — automatically.

💡 **Analogy:**
Loops are like **washing machines**.
You set them once → they repeat the cycle until done.

---

# 🌟 Types of Loops in JavaScript

1. **for**
2. **while**
3. **do…while**
4. **for…of**
5. **for…in**
6. **forEach (array method)**

We’ll go through each with:

✔ Syntax
✔ Simple example
✔ Real-world example
✔ Edge cases

---

# 1️⃣ **for Loop** (Most common loop)

### ✔ Syntax

```js
for (start; condition; update) {
  // code
}
```

### ✔ Example

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### 🔍 What happens?

- Start: `i = 1`
- Run while `i <= 5`
- Increase `i++` each time

### 🌍 Real-world: Print 10 students

```js
for (let roll = 1; roll <= 10; roll++) {
  console.log("Student Roll Number:", roll);
}
```

---

# 2️⃣ **while Loop**

Runs **as long as** condition is true.

### ✔ Syntax

```js
while (condition) {
  // code
}
```

### ✔ Example

```js
let num = 1;

while (num <= 5) {
  console.log(num);
  num++;
}
```

### ⚠️ Edge Case

If you forget `num++`, loop becomes **infinite**.

---

### 🌍 Real-world: ATM PIN Retry

```js
let attempts = 0;

while (attempts < 3) {
  console.log("Enter PIN:");
  attempts++;
}
```

---

# 3️⃣ **do…while Loop**

✔ Runs **at least once**, even if condition is false.

### Syntax

```js
do {
  // code
} while (condition);
```

### Example

```js
let count = 1;

do {
  console.log(count);
  count++;
} while (count <= 3);
```

### 🌍 Real-world: Show popup 1 time minimum

```js
let wantsMore = false;

do {
  console.log("Showing message...");
} while (wantsMore);
```

---

# 4️⃣ **for…of Loop** (Arrays / Strings)

Used to loop through **values** of arrays or strings.

### Example

```js
let fruits = ["Apple", "Mango", "Banana"];

for (let fruit of fruits) {
  console.log(fruit);
}
```

### 🌍 Real-world: Show all products

```js
let products = ["Phone", "Laptop", "Tablet"];

for (let item of products) {
  console.log("Product:", item);
}
```

---

# 5️⃣ **for…in Loop** (Objects)

Used to loop through **keys of an object**.

### Example

```js
let user = {
  name: "Ali",
  age: 20,
  city: "Lahore",
};

for (let key in user) {
  console.log(key, user[key]);
}
```

### 🌍 Real-world: Print user profile

```js
for (let key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

---

# 6️⃣ **Array.forEach()** (Array-only)

BEST for looping through arrays.

### Example

```js
let nums = [10, 20, 30];

nums.forEach(function (n) {
  console.log("Number:", n);
});
```

### 🌍 Real-world: Display cart items

```js
let cart = ["Shoes", "Shirt", "Watch"];

cart.forEach((item) => {
  console.log("Cart Item:", item);
});
```

---

# 💥 Loop Control: break & continue

### **break → stops the loop**

```js
for (let i = 1; i <= 10; i++) {
  if (i === 5) break;
  console.log(i);
}
// Output: 1 2 3 4
```

---

### **continue → skip one iteration**

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
// Output: 1 2 4 5
```

---

# ⭐ Real-World Mini Projects

---

## ✔ 1. Print Multiplication Table

```js
let n = 5;

for (let i = 1; i <= 10; i++) {
  console.log(`${n} x ${i} = ${n * i}`);
}
```

---

## ✔ 2. Count Even & Odd Numbers

```js
let numbers = [1, 2, 3, 4, 5, 6];

let even = 0,
  odd = 0;

numbers.forEach((num) => {
  num % 2 === 0 ? even++ : odd++;
});

console.log(even, odd);
```

---

## ✔ 3. Find Total Price of Cart

```js
let cart = [1200, 500, 300];

let total = 0;

for (let price of cart) {
  total += price;
}

console.log("Total:", total);
```

---

## ✔ 4. Show Properties of a Car Object

```js
let car = {
  brand: "Toyota",
  year: 2020,
  color: "White",
};

for (let prop in car) {
  console.log(prop, "=", car[prop]);
}
```

---

# 🎯 Summary Table

| Loop          | Best Used For                     |
| ------------- | --------------------------------- |
| **for**       | Counted loops                     |
| **while**     | Unknown number of repeats         |
| **do…while**  | Run at least once                 |
| **for…of**    | Arrays & strings                  |
| **for…in**    | Object properties                 |
| **forEach()** | Array iteration (cleaner & safer) |

---
