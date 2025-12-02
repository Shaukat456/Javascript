// ---

// ## **📚 Stage 6 — Working with Data Structures in JavaScript**

// ### **1. What Are Data Structures?**

// _ **Definition:** Organized ways to store, manage, and access data efficiently.
// _ **Analogy:** Think of data as items in a store — a **data structure** is how you arrange them: shelves (arrays), lockers (objects), or labeled drawers (maps).

// ---

// ## **A. Arrays**

// Arrays are **ordered lists**.

// `javascript
 let fruits = ["apple", "banana", "cherry"];
// `

// ### Key Features

// _ Indexed (0-based)
// _ Can hold mixed types (`["apple", 10, true]`)
// \* Dynamically sized in JavaScript

// ### Common Methods

// ```javascript
// // Adding/Removing
// fruits.push("orange"); // end
// fruits.pop(); // remove end
// fruits.unshift("mango"); // start
// fruits.shift(); // remove start

// // Finding
// console.log(fruits.indexOf("banana")); // 1
// console.log(fruits.includes("apple")); // true

// // Transforming
// let upper = fruits.map(f => f.toUpperCase());
// let filtered = fruits.filter(f => f.startsWith("b"));
// let totalChars = fruits.reduce((sum, f) => sum + f.length, 0);
// ```

// ✅ **Real-world analogy:** Grocery shelves — items are in order, and you can insert or remove them.

// ---

// ## **B. Objects**

// Objects store **key-value pairs**.

// `javascript
// let person = {
//     name: "Ali",
//     age: 25,
//     isStudent: true
// };
// `

// ### Access & Modify

// ```javascript
// console.log(person.name); // dot notation
// console.log(person["age"]); // bracket notation

// person.age = 26; // modify
// person.city = "Karachi"; // add
// delete person.isStudent; // remove
// ```

// ✅ **Analogy:** A dictionary — the word is the **key**, and the definition is the **value**.

// ---

// ## **C. Sets**

// Sets store **unique values** (no duplicates).

// `javascript
// let numbers = new Set([1, 2, 3, 3]);
// numbers.add(4);
// numbers.delete(2);
// console.log(numbers.has(1)); // true
// `

// ✅ **Analogy:** Guest list at a wedding — no duplicate names.

// ---

// ## **D. Maps**

// Maps store **key-value pairs**, but keys can be _any type_.

// ```javascript
// let userRoles = new Map();
// userRoles.set("Ali", "Admin");
// userRoles.set({ name: "Sara" }, "Editor");

// console.log(userRoles.get("Ali"));
// ```

// ✅ **Analogy:** Locker system — each locker (key) holds an item (value), and lockers can have numbers, names, or even objects as labels.

// ---

// ## **E. WeakMap & WeakSet**

// _ **WeakMap:** Like Map but keys **must be objects**, and references are weak (can be garbage collected).
// _ **WeakSet:** Like Set but stores **only objects**.

// Used for **memory management** or storing private data.

// ---

// ## **F. Multidimensional & Nested Structures**

// You can combine structures for complexity:

// `javascript
// let users = [
//     { name: "Ali", skills: ["JS", "Python"] },
//     { name: "Sara", skills: ["HTML", "CSS"] }
// ];
// `

// ✅ **Analogy:** Filing cabinet with folders (arrays) containing documents (objects) with lists (arrays inside).

// ---

// ## **G. Iterating Over Structures**

// `javascript
// for (let fruit of fruits) console.log(fruit); // Arrays
// for (let key in person) console.log(key, person[key]); // Objects
// numbers.forEach(n => console.log(n)); // Sets
// userRoles.forEach((role, user) => console.log(user, role)); // Maps
// `

// ---

// ## **H. Choosing the Right Data Structure**

// | Task | Best Choice | Why? |
// | --------------------- | ------------ | -------------------- |
// | Ordered list | Array | Keeps order |
// | Key-value lookup | Object / Map | Fast retrieval |
// | Unique items | Set | Prevent duplicates |
// | Fast object-key store | Map | Keys can be any type |

// ---

// ## **Mini Real-World Project — Student Record System**

// ```javascript
// let students = new Map();

// function addStudent(id, name, grades) {
// students.set(id, { name, grades });
// }

// function getAverageGrade(id) {
// let student = students.get(id);
// if (!student) return null;
// let total = student.grades.reduce((sum, g) => sum + g, 0);
// return total / student.grades.length;
// }

// addStudent(101, "Ali", [85, 90, 78]);
// addStudent(102, "Sara", [92, 88, 95]);

// console.log(getAverageGrade(101)); // 84.33
// ```

---

# 🧱 JavaScript Objects and Arrays

These are **foundation data structures** in JS:

- `Objects` model **real-world entities**
- `Arrays` store **ordered lists** of things

---

## ✳️ 1. What is an **Object**?

🧠 **Analogy**: Think of an object like a **real-world object**, such as a "Person" — it has **properties** (name, age) and **actions** (speak, walk).

### 📘 Syntax:

```javascript
let person = {
  name: "Ali",
  age: 25,
  isStudent: true,
  speak: function () {
    console.log("Hello, I’m " + this.name);
  },
};
```

- `name`, `age`, `isStudent` → **properties**
- `speak()` → **method**

### 🔍 Accessing Data:

```javascript
console.log(person.name); // Dot notation
console.log(person["age"]); // Bracket notation
person.speak(); // Method call
```

---

### ✅ Real-World Use Case:

```javascript
let user = {
  id: 101,
  username: "shaukat",
  password: "secure",
  lastLogin: "2025-07-29T07:00:00",
};
```

🧰 Objects are great for:

- User profiles
- Settings/configuration
- Storing API responses

---

## 📦 2. Arrays — Ordered Collections

🧠 **Analogy**: Think of an array as a **train** of boxes (items) in order:

- Indexed from `0` onward
- You can loop over them

### 📘 Syntax:

```javascript
let fruits = ["apple", "banana", "grape"];
```

### 🔍 Access:

```javascript
console.log(fruits[0]); // "apple"
```

### 🔄 Modify:

```javascript
fruits[1] = "mango"; // change "banana" to "mango"
fruits.push("orange"); // add at end
fruits.pop(); // remove from end
```

---

### 🔁 Looping Over Arrays:

```javascript
for (let fruit of fruits) {
  console.log(fruit);
}
```

or

```javascript
fruits.forEach((item, index) => {
  console.log(index, item);
});
```

---

## 🧬 3. Objects Inside Arrays (Data Records)

Often in real-world apps, you’ll see arrays of objects:

```javascript
let students = [
  { name: "Ali", age: 20 },
  { name: "Sara", age: 22 },
  { name: "John", age: 21 },
];

console.log(students[1].name); // "Sara"
```

### 🔍 Use Case:

- Lists of products
- Student records
- Search results
- Messages in chat

---

## 📘 4. Arrays Inside Objects

```javascript
let course = {
  title: "JavaScript Bootcamp",
  topics: ["Variables", "Loops", "Functions"],
};

console.log(course.topics[0]); // "Variables"
```

---

## 🔁 Common Array Methods

| Method               | Description                |
| -------------------- | -------------------------- |
| `.push(item)`        | Add to end                 |
| `.pop()`             | Remove from end            |
| `.shift()`           | Remove from start          |
| `.unshift()`         | Add to start               |
| `.slice(start, end)` | Get subarray               |
| `.splice()`          | Add/remove items anywhere  |
| `.map()`             | Transform array            |
| `.filter()`          | Remove unwanted items      |
| `.reduce()`          | Combine all into one value |

---

## 🧠 Memory Internals

### Objects:

- Stored as key-value pairs in memory
- Keys are strings, values can be anything
- JS stores reference to objects, not copies

### Arrays:

- Contiguous in memory (like C-style arrays internally)
- Each item is indexed
- Memory depends on length × size of element (loosely typed)

```javascript
let a = [1, 2, 3];
let b = a;
b[0] = 99;
console.log(a[0]); // 99 → because arrays are passed by **reference**
```

---

## ⚠️ Key Difference: `==` vs Reference

```javascript
let x = { a: 1 };
let y = { a: 1 };

console.log(x === y); // false – different references

let z = x;
console.log(z === x); // true – same reference
```

---

## 🧪 Practice Challenges

1. Create an object for a **car** with properties: brand, model, year.
2. Create an array of 5 users with name and isOnline status.
3. Write a loop to count how many users are online.

---

## 🧱 Summary Table

| Type      | Description                  | Use Case                   |
| --------- | ---------------------------- | -------------------------- |
| Object    | Key-value pairs              | Model real-world entities  |
| Array     | Ordered list                 | Store multiple values      |
| Object\[] | Array of objects             | Lists like students, items |
| Array{}   | Object with arrays as values | Categorized lists          |
