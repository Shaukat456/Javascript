---
---

# 🚀 **Mastering JavaScript Objects (Beginner → Pro Guide)**

An **object** is a collection of data in **key–value pairs**.

### 💡 Real-life analogy:

An object is like a **real-world object** (e.g., a car):

- color: “white”
- brand: “Toyota”
- model: 2020

In JavaScript, we store such info using an **object**.

---

# 📌 1. **What is an Object?**

```js
let car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
};
```

✔ Keys → brand, model, year
✔ Values → "Toyota", "Corolla", 2020

---

# 📌 2. **Accessing Object Values**

### ✔ Dot notation (most common)

```js
console.log(car.brand);
```

### ✔ Bracket notation

```js
console.log(car["model"]);
```

📌 Brackets are required when:

- key has space: `"full name"`
- key starts with number: `"1stPlace"`
- key is dynamic

Example:

```js
let key = "year";
console.log(car[key]);
```

---

# 📌 3. **Adding New Properties to an Object**

```js
car.color = "White";
car["engine"] = "1800cc";
```

---

# 📌 4. **Updating Object Values**

```js
car.year = 2022;
```

---

# 📌 5. **Deleting Properties**

```js
delete car.engine;
```

---

# 📌 6. **Nested Objects**

Objects can contain **other objects**.

```js
let student = {
  name: "Ali",
  marks: {
    math: 90,
    english: 80,
  },
};

console.log(student.marks.english); // 80
```

---

# 📌 7. **Objects in Arrays** (VERY important!)

This is used everywhere (APIs, databases, apps):

```js
let users = [
  { name: "Ali", age: 20 },
  { name: "Sara", age: 25 },
  { name: "John", age: 30 },
];

console.log(users[1].name); // Sara
```

---

# 📌 8. **Looping Through Objects**

---

## ✔ for…in loop (keys)

```js
for (let key in car) {
  console.log(key, car[key]);
}
```

---

## ✔ Object.keys(), Object.values(), Object.entries()

### 🔹 Get all keys

```js
console.log(Object.keys(car));
```

### 🔹 Get all values

```js
console.log(Object.values(car));
```

### 🔹 Get key/value pairs

```js
console.log(Object.entries(car));
```

---

# 📌 9. **Object Methods (functions inside objects)**

```js
let person = {
  name: "Ahmed",
  age: 22,

  greet() {
    console.log("Hello, " + this.name);
  },
};

person.greet();
```

✔ `this.name` refers to the object's `name` value.

---

# 📌 10. **The this Keyword**

`this` refers to **the object that owns the method**.

Example:

```js
let user = {
  name: "Hina",
  show() {
    console.log(this.name);
  },
};
```

---

# 📌 11. **Object Destructuring** (Modern JavaScript)

Shortcut to extract values.

```js
let user = { name: "Ali", age: 25 };

let { name, age } = user;

console.log(name);
console.log(age);
```

Rename during destructuring:

```js
let { name: userName } = user;
```

---

# 📌 12. **Spread Operator with Objects**

Copy an object:

```js
let newCar = { ...car };
```

Add new properties:

```js
let updatedCar = { ...car, color: "Black" };
```

Merge 2 objects:

```js
let a = { x: 1 };
let b = { y: 2 };

let merged = { ...a, ...b };
```

---

# 📌 13. **Optional Chaining (?.)**

Prevents errors when accessing undefined values.

Without it:

```js
console.log(user.profile.address.city); // ❌ Error
```

With optional chaining:

```js
console.log(user?.profile?.address?.city); // undefined ✔
```

---

# 📌 14. **Real-World Mini Projects**

---

# ⭐ 1. **User Profile Object**

```js
let user = {
  name: "Ali",
  age: 21,
  email: "ali@gmail.com",
  isVerified: true,
};

console.log(`Welcome ${user.name}`);
```

---

# ⭐ 2. **Product Inventory System**

```js
let product = {
  name: "Laptop",
  price: 150000,
  stock: 5,
};

if (product.stock > 0) {
  console.log("Product Available");
}
```

---

# ⭐ 3. **Students Record (Array of Objects)**

```js
let students = [
  { name: "Ali", marks: 85 },
  { name: "Sara", marks: 45 },
  { name: "John", marks: 75 },
];

students.forEach((s) => {
  console.log(`${s.name} - ${s.marks}`);
});
```

---

# ⭐ 4. **Convert Object → JSON (Common in APIs)**

```js
let obj = { name: "Ali", age: 22 };

let json = JSON.stringify(obj);

console.log(json);
```

Convert JSON → object:

```js
JSON.parse(json);
```

---

# 🎯 Summary of What You Learned

You now understand:

✔ Basics of objects
✔ Accessing/updating/deleting values
✔ Nested objects
✔ Objects in arrays
✔ Looping through objects
✔ Object methods (`this`)
✔ Destructuring
✔ Spread operator
✔ Optional chaining
✔ Real-world use cases

---
