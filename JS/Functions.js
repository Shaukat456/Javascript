// Awesome! Let’s now cover a core building block of JavaScript:

// ---

// # 🧱 JavaScript Functions

// A **function** is a reusable block of code that performs a specific task.

// We’ll cover:

// 1. What are functions (with analogy)
// 2. Function declaration
// 3. Parameters and return
// 4. Arrow functions
// 5. Anonymous and callback functions
// 6. Real-world examples
// 7. Scope and memory
// 8. Best practices

// ---

// ## 🧠 What Is a Function?

// 🧠 **Analogy:** Think of a **function** like a **vending machine**:

// * You **input** a code → it **processes** → gives you a **result**
// * You don’t need to know how it works inside — you just use it

// ```javascript
// function makeTea(sugar, milk) {
//   return "Tea with " + sugar + " sugar and " + milk + " milk";
// }
// ```

// ✅ Functions help avoid **repetition**, make code **clean**, and support **modularity**.

// ---

// ## 🧾 1. Declaring a Function

// ### 📘 Syntax:

// ```javascript
// function greet() {
//   console.log("Hello!");
// }
// ```

// ### 🧪 Call the Function:

// ```javascript
// greet(); // Output: Hello!
// ```

// ---

// ## 📦 2. Parameters & Return Values

// ### 📘 Function with parameters:

// ```javascript
// function add(a, b) {
//   return a + b;
// }

// let result = add(3, 5); // 8
// ```

// * `a` and `b` are **parameters**
// * `3` and `5` are **arguments**
// * `return` sends the result back

// 🧠 **Analogy**: Like a math function: `f(x, y) = x + y`

// ---

// ## 💡 3. Real-World Examples

// ### 🔐 Login check function:

// ```javascript
// function checkLogin(username, password) {
//   return username === "admin" && password === "1234";
// }
// ```

// ### 🛍️ Shopping cart total:

// ```javascript
// function calculateTotal(prices) {
//   let total = 0;
//   for (let price of prices) {
//     total += price;
//   }
//   return total;
// }
// ```

// ---

// ## 🏹 4. Arrow Functions (ES6+)

// Shorter, cleaner function syntax — especially useful in callbacks and array methods.

// ### 📘 Syntax:

// ```javascript
// const greet = () => {
//   console.log("Hi!");
// };
// ```

// ### With parameters:

// ```javascript
// const multiply = (a, b) => a * b;
// ```

// ✅ Implicit `return` when using one expression — no need for `{}` or `return`.

// ---

// ## 🕶️ 5. Anonymous & Callback Functions

// ### Anonymous Function (no name):

// ```javascript
// setTimeout(function () {
//   console.log("3 seconds passed");
// }, 3000);
// ```

// ### Callback Function (passed to another):

// ```javascript
// function greet(name) {
//   console.log("Hello " + name);
// }

// function processUser(callback) {
//   let user = "Sara";
//   callback(user);
// }

// processUser(greet); // Hello Sara
// ```

// 🧠 Callbacks are used for **async operations**, like API calls, animations, file loading, etc.

// ---

// ## 🧠 6. Scope & Memory

// ### Global Scope:

// Accessible anywhere

// ```javascript
// let name = "Ali";

// function showName() {
//   console.log(name); // ✅ Accessible
// }
// ```

// ### Function Scope:

// Variables inside a function are local

// ```javascript
// function test() {
//   let age = 20;
// }
// console.log(age); // ❌ Error: age is not defined
// ```

// // ✅ Variables created inside a function live **only while the function runs**.

// ---

// ## 🔂 Nested Functions & Closure

// A function inside a function can **remember** the outer variables:

// ```javascript
// function outer() {
//   let count = 0;
//   return function inner() {
//     count++;
//     console.log(count);
//   };
// }

// let counter = outer();
// counter(); // 1
// counter(); // 2
// ```

// ✅ This is called a **closure** — very powerful in JS.

// ---

// ## 🧠 Memory Tip

// Every time a function is called:

// * A **new scope is created**
// * Memory for local variables is allocated
// * After function ends, that memory is released (unless closed over)

// ---

// ## 🧱 Summary

// | Concept              | Example                     | Purpose                        |
// | -------------------- | --------------------------- | ------------------------------ |
// | Function Declaration | `function greet() {}`       | Reuse logic                    |
// | Parameters           | `function greet(name)`      | Input                          |
// | Return               | `return x + y`              | Output                         |
// | Arrow Function       | `const fn = () => {}`       | Short syntax                   |
// | Callback             | `func(() => {})`            | Used in async / event handling |
// | Scope                | Inside or outside functions | Controls accessibility         |
// | Closure              | Inner function "remembers"  | Useful in counters, modules    |

// ---

// ## 🧪 Practice Time

// Try writing a function:

// > Create a function called `isEven(number)` that returns `"Even"` if the number is even, and `"Odd"` otherwise.

// ```javascript
// function isEven(num) {
//   return num % 2 === 0 ? "Even" : "Odd";
// }
// console.log(isEven(4)); // "Even"
// ```
