// ---

// # **📍 Stage 1: Getting Started with JavaScript**

// *(Now with Hoisting covered in detail)*

// ---

// ## **1. What is JavaScript?**

// JavaScript is a **programming language** that makes web pages interactive.

// Without JavaScript, websites would just be **flat, static pages** like a poster.
// With JavaScript, they can **react, move, calculate, and communicate**.

// ---

// **🛠 Real-world analogy:**
// HTML = The **skeleton** of a house
// CSS = The **paint and decoration**
// JavaScript = The **electricity, plumbing, and moving parts** (things that make the house actually work)

// ---

// **💡 Examples of JavaScript in action:**

// * You click “Add to Cart” → number updates instantly → **JavaScript**
// * A live scoreboard updates during a game → **JavaScript**
// * Search suggestions appear as you type → **JavaScript**

// ---

// ## **2. Embedding JavaScript in HTML**

// ### **a) Inline JavaScript**

// Small scripts directly inside HTML tags.

// ```html
// <button onclick="alert('Hello!')">Click Me</button>
// ```

// ⚠️ Bad for large projects — only for quick tests.

// ---

// ### **b) Internal JavaScript**

// Inside `<script>` tags in the same HTML file.

// ```html
// <script>
//   alert("Hello from inside HTML!");
// </script>
// ```

// ---

// ### **c) External JavaScript** ✅ (Best Practice)

// In a separate `.js` file.

// ```html
// <script src="script.js"></script>
// ```

// ```javascript
// // script.js
// alert("Hello from external file!");
// ```

// ---

// ## **3. Console for Debugging**

// The browser console is like **your detective notebook** — it logs information so you can see what’s happening inside your code.

// ```javascript
// console.log("Hello Students");
// console.error("This is an error");
// console.table(["Apple", "Banana", "Cherry"]);
// ```

// See it in **F12 → Console tab**.

// ---

// **Analogy:**
// A chef might **taste the food while cooking** to check if it’s right. `console.log()` is how we “taste” our program while making it.

// ---

// ## **4. Execution Flow**

// JavaScript reads **line by line**, top to bottom.

// ```javascript
// console.log("Step 1");
// console.log("Step 2");
// console.log("Step 3");
// ```

// Output:

// ```
// Step 1
// Step 2
// Step 3
// ```

// ---

// **Pause points:**

// ```javascript
// console.log("Start");
// alert("Hello!"); // stops until user clicks OK
// console.log("End");
// ```

// The “End” appears **only after** you close the alert.

// ---

// ## **5. Hoisting** 🪄

// **Definition:**
// Hoisting means JavaScript **moves declarations** (not assignments) to the top of their scope **before** running the code.

// ---

// ### **Example 1: Variables**

// ```javascript
// console.log(myName); // ❌ undefined, not error
// var myName = "Ali";
// ```

// Internally, JS treats it like:

// ```javascript
// var myName; // declaration moved up
// console.log(myName); // undefined
// myName = "Ali"; // assignment stays here
// ```

// ---

// ### **Example 2: Functions**

// ```javascript
// sayHello(); // ✅ works
// function sayHello() {
//   console.log("Hello!");
// }
// ```

// Function **declarations** are hoisted completely.

// ---

// ### **Example 3: let & const**

// ```javascript
// console.log(age); // ❌ ReferenceError
// let age = 25;
// ```

// `let` and `const` are **hoisted but not initialized**, so you can’t access them before declaring.

// ---

// **💡 Real-world analogy:**
// Think of a **classroom roll call**: The teacher knows all student names (declarations) before class starts, but students only speak when called (assignments happen later).

// ---

// ## **📌 Stage 1 Summary**

// You now know:

// 1. What JS is and why it’s used
// 2. How to add JS to a page
// 3. How to log/debug in the console
// 4. How JS runs (top-to-bottom)
// 5. What hoisting is and how it affects variables/functions

// ---
