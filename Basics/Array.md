---
---

# 🚀 **Mastering Arrays in JavaScript (Complete Beginner → Pro Guide)**

An **array** is a **special variable** that stores **multiple values** in one place.

### 💡 Real-life analogy:

An array is like a **shopping bag** holding many items:

```js
let bag = ["Milk", "Bread", "Eggs"];
```

---

# 📌 1. **What is an Array?**

In JavaScript:

✔ Ordered collection
✔ Stores multiple values
✔ Values can be **any type** (string, number, boolean, objects, functions)

---

### ✔ Example:

```js
let fruits = ["Apple", "Mango", "Banana"];
```

### ✔ Mixed array:

```js
let mix = ["Ali", 20, true, { city: "Lahore" }];
```

---

# 📌 2. **Array Index**

Array items start with **index 0**.

| Index | Value  |
| ----- | ------ |
| 0     | Apple  |
| 1     | Mango  |
| 2     | Banana |

### Example:

```js
console.log(fruits[0]); // Apple
console.log(fruits[2]); // Banana
```

---

# 📌 3. **Array Length**

Total number of items.

```js
console.log(fruits.length); // 3
```

---

# 📌 4. **Modifying Array Elements**

```js
fruits[1] = "Orange";
console.log(fruits); // ["Apple", "Orange", "Banana"]
```

---

# 📌 5. **Common Array Methods (Super Important!)**

---

# ⭐ 1. **push()** → Add to end

```js
fruits.push("Grapes");
```

---

# ⭐ 2. **pop()** → Remove last

```js
fruits.pop();
```

---

# ⭐ 3. **unshift()** → Add to start

```js
fruits.unshift("Kiwi");
```

---

# ⭐ 4. **shift()** → Remove first

```js
fruits.shift();
```

---

# ⭐ 5. **includes()** → Check if exists

```js
fruits.includes("Mango"); // true/false
```

---

# ⭐ 6. **indexOf()** → Find index

```js
fruits.indexOf("Apple"); // 0
```

---

# ⭐ 7. **slice()** → Copy part of array (non-destructive)

```js
let a = fruits.slice(1, 3);
```

---

# ⭐ 8. **splice()** → Add/remove items (destructive)

```js
fruits.splice(1, 1, "Peach");
```

Meaning:

- Start at index 1
- Remove 1 item
- Insert `"Peach"`

---

# ⭐ 9. **join()** → Convert array → string

```js
let text = fruits.join(" - ");
```

---

# ⭐ 10. **sort()** → Sort alphabetically

```js
fruits.sort();
```

For numbers:

```js
numbers.sort((a, b) => a - b);
```

---

# ⭐ 11. **reverse()**

```js
fruits.reverse();
```

---

# 📌 6. **Looping Through Arrays**

---

## ✔ 1. for Loop

```js
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

---

## ✔ 2. for…of Loop

```js
for (let fruit of fruits) {
  console.log(fruit);
}
```

---

## ✔ 3. forEach()

```js
fruits.forEach((item) => console.log(item));
```

---

# 📌 7. **Array of Objects** (VERY Important in Real Projects)

```js
let users = [
  { name: "Ali", age: 20 },
  { name: "Sara", age: 25 },
  { name: "John", age: 30 },
];
```

### Example:

```js
console.log(users[1].name); // Sara
```

---

# 📌 8. **Useful Higher-Order Methods (Pro Level)**

---

# ⭐ 1. map() → Transform data

```js
let prices = [100, 200, 300];

let newPrices = prices.map((p) => p * 2);
// [200, 400, 600]
```

---

# ⭐ 2. filter() → Filter items

```js
let ages = [10, 20, 30, 40];

let adults = ages.filter((a) => a >= 18);
// [20, 30, 40]
```

---

# ⭐ 3. reduce() → Accumulate values

```js
let cart = [100, 200, 300];

let total = cart.reduce((sum, price) => sum + price, 0);
// 600
```

---

# ⭐ 4. find() → Find first matching item

```js
let user = users.find((x) => x.age > 20);
```

---

# ⭐ 5. some() / every()

```js
ages.some((a) => a > 18); // true
ages.every((a) => a > 18); // false
```

---

# 📌 9. **Real-World Mini Projects**

---

# ⭐ 1. **Shopping Cart Total**

```js
let cart = [1200, 500, 800];

let total = cart.reduce((acc, price) => acc + price, 0);

console.log("Total Price:", total);
```

---

# ⭐ 2. **Search Product by Name**

```js
let products = ["Laptop", "Phone", "Tablet"];

if (products.includes("Phone")) {
  console.log("Product Available");
}
```

---

# ⭐ 3. **Student Grades System**

```js
let marks = [40, 80, 90, 60];

let passed = marks.filter((m) => m >= 50);

console.log(passed); // [80, 90, 60]
```

---

# ⭐ 4. **Display All Users**

```js
users.forEach((u) => {
  console.log(`${u.name} - Age ${u.age}`);
});
```

---

# 🎯 Summary of What You Learned

You now understand:

✔ What arrays are
✔ Index & length
✔ Adding/removing items
✔ All major array methods
✔ Looping through arrays
✔ Array of objects
✔ map, filter, reduce
✔ Real-world applications

---
