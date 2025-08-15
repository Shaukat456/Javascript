// ---

// ## **📚 Stage 6 — Working with Data Structures in JavaScript**

// ### **1. What Are Data Structures?**

// * **Definition:** Organized ways to store, manage, and access data efficiently.
// * **Analogy:** Think of data as items in a store — a **data structure** is how you arrange them: shelves (arrays), lockers (objects), or labeled drawers (maps).

// ---

// ## **A. Arrays**

// Arrays are **ordered lists**.

// ```javascript
// let fruits = ["apple", "banana", "cherry"];
// ```

// ### Key Features

// * Indexed (0-based)
// * Can hold mixed types (`["apple", 10, true]`)
// * Dynamically sized in JavaScript

// ### Common Methods

// ```javascript
// // Adding/Removing
// fruits.push("orange");    // end
// fruits.pop();             // remove end
// fruits.unshift("mango");  // start
// fruits.shift();           // remove start

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

// ```javascript
// let person = {
//     name: "Ali",
//     age: 25,
//     isStudent: true
// };
// ```

// ### Access & Modify

// ```javascript
// console.log(person.name);     // dot notation
// console.log(person["age"]);   // bracket notation

// person.age = 26;              // modify
// person.city = "Karachi";      // add
// delete person.isStudent;      // remove
// ```

// ✅ **Analogy:** A dictionary — the word is the **key**, and the definition is the **value**.

// ---

// ## **C. Sets**

// Sets store **unique values** (no duplicates).

// ```javascript
// let numbers = new Set([1, 2, 3, 3]);
// numbers.add(4);
// numbers.delete(2);
// console.log(numbers.has(1)); // true
// ```

// ✅ **Analogy:** Guest list at a wedding — no duplicate names.

// ---

// ## **D. Maps**

// Maps store **key-value pairs**, but keys can be *any type*.

// ```javascript
// let userRoles = new Map();
// userRoles.set("Ali", "Admin");
// userRoles.set({ name: "Sara" }, "Editor");

// console.log(userRoles.get("Ali"));
// ```

// ✅ **Analogy:** Locker system — each locker (key) holds an item (value), and lockers can have numbers, names, or even objects as labels.

// ---

// ## **E. WeakMap & WeakSet**

// * **WeakMap:** Like Map but keys **must be objects**, and references are weak (can be garbage collected).
// * **WeakSet:** Like Set but stores **only objects**.

// Used for **memory management** or storing private data.

// ---

// ## **F. Multidimensional & Nested Structures**

// You can combine structures for complexity:

// ```javascript
// let users = [
//     { name: "Ali", skills: ["JS", "Python"] },
//     { name: "Sara", skills: ["HTML", "CSS"] }
// ];
// ```

// ✅ **Analogy:** Filing cabinet with folders (arrays) containing documents (objects) with lists (arrays inside).

// ---

// ## **G. Iterating Over Structures**

// ```javascript
// for (let fruit of fruits) console.log(fruit); // Arrays
// for (let key in person) console.log(key, person[key]); // Objects
// numbers.forEach(n => console.log(n)); // Sets
// userRoles.forEach((role, user) => console.log(user, role)); // Maps
// ```

// ---

// ## **H. Choosing the Right Data Structure**

// | Task                  | Best Choice  | Why?                 |
// | --------------------- | ------------ | -------------------- |
// | Ordered list          | Array        | Keeps order          |
// | Key-value lookup      | Object / Map | Fast retrieval       |
// | Unique items          | Set          | Prevent duplicates   |
// | Fast object-key store | Map          | Keys can be any type |

// ---

// ## **Mini Real-World Project — Student Record System**

// ```javascript
// let students = new Map();

// function addStudent(id, name, grades) {
//     students.set(id, { name, grades });
// }

// function getAverageGrade(id) {
//     let student = students.get(id);
//     if (!student) return null;
//     let total = student.grades.reduce((sum, g) => sum + g, 0);
//     return total / student.grades.length;
// }

// addStudent(101, "Ali", [85, 90, 78]);
// addStudent(102, "Sara", [92, 88, 95]);

// console.log(getAverageGrade(101)); // 84.33
// ```
