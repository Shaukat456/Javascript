// ---

// # **📍 Stage 5: Control Flow**

// ---

// ## **1. What is Control Flow?**

// Control flow is **the order in which your code runs** and how you can change that order based on conditions.

// 💡 **Analogy:**
// Think of it like a **traffic system**:

// * Green light → go straight
// * Red light → stop
// * Yellow light → slow down
// * Detour sign → take another path

// Without control flow, your program is like a car that drives straight forever — no turns, no stops.

// ---

// ## **2. Decision Making Statements**

// ---

// ### **a) `if` Statement**

// Runs code **only if** the condition is true.

// **Syntax:**

// ```javascript
// if (condition) {
//   // code runs if condition is true
// }
// ```

// **Example:**

// ```javascript
// let temperature = 30;
// if (temperature > 25) {
//   console.log("It's hot outside!");
// }
// ```

// 💡 *Real-world:*
// If it’s raining, take an umbrella.

// ---

// ### **b) `if...else`**

// Adds an alternative path.

// **Example:**

// ```javascript
// let age = 16;
// if (age >= 18) {
//   console.log("You can vote");
// } else {
//   console.log("You are too young to vote");
// }
// ```

// 💡 *Real-world:*
// If shop is open → enter, else → go home.

// ---

// ### **c) `if...else if...else`**

// Checks multiple conditions in order.

// **Example:**

// ```javascript
// let marks = 72;

// if (marks >= 80) {
//   console.log("Grade A");
// } else if (marks >= 60) {
//   console.log("Grade B");
// } else {
//   console.log("Grade C");
// }
// ```

// 💡 *Real-world:*
// If weather = sunny → go park
// Else if weather = cloudy → go café
// Else → stay home

// ---

// ### **d) `switch` Statement**

// Cleaner way to handle multiple possible values of a variable.

// **Example:**

// ```javascript
// let day = "Monday";

// switch (day) {
//   case "Monday":
//     console.log("Start of the week");
//     break;
//   case "Friday":
//     console.log("Almost weekend!");
//     break;
//   default:
//     console.log("Just another day");
// }
// ```

// 💡 *Real-world:*
// Choosing a drink from a menu.

// ---

// ## **3. Loops – Repeating Actions**

// ---

// ### **a) `for` Loop**

// Runs code a fixed number of times.

// **Example:**

// ```javascript
// for (let i = 1; i <= 5; i++) {
//   console.log("Step", i);
// }
// ```

// 💡 *Real-world:*
// Walking up 10 stairs — one step at a time.

// ---

// ### **b) `while` Loop**

// Runs while a condition is true.

// **Example:**

// ```javascript
// let count = 1;
// while (count <= 3) {
//   console.log("Count:", count);
//   count++;
// }
// ```

// 💡 *Real-world:*
// Keep filling the water bottle until it’s full.

// ---

// ### **c) `do...while` Loop**

// Runs **at least once**, then repeats if condition is true.

// **Example:**

// ```javascript
// let num = 5;
// do {
//   console.log("Number is:", num);
//   num--;
// } while (num > 0);
// ```

// 💡 *Real-world:*
// You eat one cookie — then check if there are more.

// ---

// ### **d) `for...of` Loop**

// Used for looping over arrays or strings.

// **Example:**

// ```javascript
// let fruits = ["apple", "banana", "cherry"];

// for (let fruit of fruits) {
//   console.log(fruit);
// }
// ```

// 💡 *Real-world:*
// Picking each fruit from a basket one by one.

// ---

// ## **4. Breaking & Skipping**

// ---

// ### **`break`**

// Stops the loop immediately.

// ```javascript
// for (let i = 1; i <= 10; i++) {
//   if (i === 5) break;
//   console.log(i);
// }
// ```

// ### **`continue`**

// Skips the current iteration.

// ```javascript
// for (let i = 1; i <= 5; i++) {
//   if (i === 3) continue;
//   console.log(i);
// }
// ```

// ---

// ## **📌 Stage 5 Summary**

// You now know:

// 1. **if, else, else if** → decision making
// 2. **switch** → clean multi-choice
// 3. **for, while, do...while, for...of** → repetition
// 4. **break & continue** → controlling loops

// ---

// ## **💻 Mini Project**

// **Number Guessing Game**

// ```javascript
// let secret = 7;
// let guess;

// do {
//   guess = Number(prompt("Guess the number (1-10):"));

//   if (guess > secret) {
//     console.log("Too high!");
//   } else if (guess < secret) {
//     console.log("Too low!");
//   }
// } while (guess !== secret);

// console.log("🎉 Correct!");
// ```
