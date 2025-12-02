// We’ll make a **Simple Food Ordering System** 🍔 that simulates:

// * Taking orders (functions, parameters, default values)
// * Applying offers (callbacks)
// * Calculating totals (higher-order functions, rest parameters, arrow functions)
// * Keeping order count (closures)

// ---

// ## **📂 foodOrderSystem.js**

// ```javascript
// // ========================
// // 1. Closure for Order Counter
// // ========================
// function createOrderCounter() {
//     let count = 0; // private variable
//     return function () {
//         count++;
//         return count;
//     };
// }
// const orderCounter = createOrderCounter();

// // ========================
// // 2. Function Declaration (Hoisted)
// // ========================
// function greetCustomer(name = "Guest") {
//     console.log(`👋 Welcome, ${name}!`);
// }

// // ========================
// // 3. Function Expression
// // ========================
// const displayMenu = function () {
//     console.log("\n📜 Menu:");
//     console.log("1. Burger - $5");
//     console.log("2. Fries - $3");
//     console.log("3. Coke - $2");
// };

// // ========================
// // 4. Arrow Function with Rest Parameters
// // ========================
// const calculateBill = (...prices) => prices.reduce((total, price) => total + price, 0);

// // ========================
// // 5. Callback Function Example
// // ========================
// function applyDiscount(total, discountCallback) {
//     return discountCallback(total);
// }

// // Discount Strategies (Higher-Order Functions)
// function percentageDiscount(percent) {
//     return function (total) {
//         return total - (total * percent) / 100;
//     };
// }

// // ========================
// // 6. Place Order Function (Using Default Parameters)
// // ========================
// function placeOrder(customerName = "Guest", ...items) {
//     greetCustomer(customerName);
//     displayMenu();

//     const prices = {
//         Burger: 5,
//         Fries: 3,
//         Coke: 2
//     };

//     // Map items to prices
//     const orderPrices = items.map(item => prices[item]);

//     let total = calculateBill(...orderPrices);

//     // Apply 10% discount if order > $10
//     if (total > 10) {
//         total = applyDiscount(total, percentageDiscount(10));
//         console.log("🎉 Discount Applied (10%)!");
//     }

//     const orderNumber = orderCounter();
//     console.log(`🛒 Order #${orderNumber}: ${items.join(", ")}`);
//     console.log(`💰 Total: $${total.toFixed(2)}\n`);
// }

// // ========================
// // 7. IIFE to Start Simulation
// // ========================
// (function runDemo() {
//     placeOrder("Ali", "Burger", "Fries", "Coke");
//     placeOrder("Sara", "Burger", "Burger", "Fries");
//     placeOrder("Guest", "Coke");
// })();
// ```

// ---

// ## **🔍 What We Used Here**

// | Concept                   | Example in Project                                | Real-World Role                       |
// | ------------------------- | ------------------------------------------------- | ------------------------------------- |
// | **Closure**               | `createOrderCounter`                              | Keeps track of total orders privately |
// | **Function Declaration**  | `greetCustomer`                                   | Welcome message                       |
// | **Function Expression**   | `displayMenu`                                     | Shows menu                            |
// | **Arrow Function**        | `calculateBill`                                   | Fast price calculation                |
// | **Rest Parameters**       | `(...items)`                                      | Handle multiple order items           |
// | **Callback**              | `applyDiscount`                                   | Apply discount strategy               |
// | **Higher-Order Function** | `percentageDiscount`                              | Returns discount calculator           |
// | **Default Parameters**    | `customerName = "Guest"`                          | No name? Use Guest                    |
// | **IIFE**                  | `(function runDemo(){...})();`                    | Start program immediately             |
// | **Hoisting**              | `greetCustomer` can be called before it’s defined | Flexible calling                      |

// ---

// ## **💡 Output Example**

// ```
// 👋 Welcome, Ali!

// 📜 Menu:
// 1. Burger - $5
// 2. Fries - $3
// 3. Coke - $2
// 🎉 Discount Applied (10%)!
// 🛒 Order #1: Burger, Fries, Coke
// 💰 Total: $9.00

// 👋 Welcome, Sara!

// 📜 Menu:
// 1. Burger - $5
// 2. Fries - $3
// 3. Coke - $2
// 🎉 Discount Applied (10%)!
// 🛒 Order #2: Burger, Burger, Fries
// 💰 Total: $11.70

// 👋 Welcome, Guest!

// 📜 Menu:
// 1. Burger - $5
// 2. Fries - $3
// 3. Coke - $2
// 🛒 Order #3: Coke
// 💰 Total: $2.00
// ```
