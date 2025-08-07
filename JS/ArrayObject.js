// ---

// # 🧱 JavaScript Objects and Arrays

// These are **foundation data structures** in JS:

// * `Objects` model **real-world entities**
// * `Arrays` store **ordered lists** of things

// ---

// ## ✳️ 1. What is an **Object**?

// 🧠 **Analogy**: Think of an object like a **real-world object**, such as a "Person" — it has **properties** (name, age) and **actions** (speak, walk).

// ### 📘 Syntax:

// ```javascript
// let person = {
//   name: "Ali",
//   age: 25,
//   isStudent: true,
//   speak: function () {
//     console.log("Hello, I’m " + this.name);
//   },
// };
// ```

// * `name`, `age`, `isStudent` → **properties**
// * `speak()` → **method**

// ### 🔍 Accessing Data:

// ```javascript
// console.log(person.name);       // Dot notation
// console.log(person["age"]);     // Bracket notation
// person.speak();                 // Method call
// ```

// ---

// ### ✅ Real-World Use Case:

// ```javascript
// let user = {
//   id: 101,
//   username: "shaukat",
//   password: "secure",
//   lastLogin: "2025-07-29T07:00:00",
// };
// ```

// 🧰 Objects are great for:

// * User profiles
// * Settings/configuration
// * Storing API responses

// ---

// ## 📦 2. Arrays — Ordered Collections

// 🧠 **Analogy**: Think of an array as a **train** of boxes (items) in order:

// * Indexed from `0` onward
// * You can loop over them

// ### 📘 Syntax:

// ```javascript
// let fruits = ["apple", "banana", "grape"];
// ```

// ### 🔍 Access:

// ```javascript
// console.log(fruits[0]); // "apple"
// ```

// ### 🔄 Modify:

// ```javascript
// fruits[1] = "mango"; // change "banana" to "mango"
// fruits.push("orange"); // add at end
// fruits.pop();          // remove from end
// ```

// ---

// ### 🔁 Looping Over Arrays:

// ```javascript
// for (let fruit of fruits) {
//   console.log(fruit);
// }
// ```

// or

// ```javascript
// fruits.forEach((item, index) => {
//   console.log(index, item);
// });
// ```

// ---

// ## 🧬 3. Objects Inside Arrays (Data Records)

// Often in real-world apps, you’ll see arrays of objects:

// ```javascript
// let students = [
//   { name: "Ali", age: 20 },
//   { name: "Sara", age: 22 },
//   { name: "John", age: 21 },
// ];

// console.log(students[1].name); // "Sara"
// ```

// ### 🔍 Use Case:

// * Lists of products
// * Student records
// * Search results
// * Messages in chat

// ---

// ## 📘 4. Arrays Inside Objects

// ```javascript
// let course = {
//   title: "JavaScript Bootcamp",
//   topics: ["Variables", "Loops", "Functions"],
// };

// console.log(course.topics[0]); // "Variables"
// ```

// ---

// ## 🔁 Common Array Methods

// | Method               | Description                |
// | -------------------- | -------------------------- |
// | `.push(item)`        | Add to end                 |
// | `.pop()`             | Remove from end            |
// | `.shift()`           | Remove from start          |
// | `.unshift()`         | Add to start               |
// | `.slice(start, end)` | Get subarray               |
// | `.splice()`          | Add/remove items anywhere  |
// | `.map()`             | Transform array            |
// | `.filter()`          | Remove unwanted items      |
// | `.reduce()`          | Combine all into one value |

// ---

// ## 🧠 Memory Internals

// ### Objects:

// * Stored as key-value pairs in memory
// * Keys are strings, values can be anything
// * JS stores reference to objects, not copies

// ### Arrays:

// * Contiguous in memory (like C-style arrays internally)
// * Each item is indexed
// * Memory depends on length × size of element (loosely typed)

// ```javascript
// let a = [1, 2, 3];
// let b = a;
// b[0] = 99;
// console.log(a[0]); // 99 → because arrays are passed by **reference**
// ```

// ---

// ## ⚠️ Key Difference: `==` vs Reference

// ```javascript
// let x = { a: 1 };
// let y = { a: 1 };

// console.log(x === y); // false – different references

// let z = x;
// console.log(z === x); // true – same reference
// ```

// ---

// ## 🧪 Practice Challenges

// 1. Create an object for a **car** with properties: brand, model, year.
// 2. Create an array of 5 users with name and isOnline status.
// 3. Write a loop to count how many users are online.

// ---

// ## 🧱 Summary Table

// | Type      | Description                  | Use Case                   |
// | --------- | ---------------------------- | -------------------------- |
// | Object    | Key-value pairs              | Model real-world entities  |
// | Array     | Ordered list                 | Store multiple values      |
// | Object\[] | Array of objects             | Lists like students, items |
// | Array{}   | Object with arrays as values | Categorized lists          |
