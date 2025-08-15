// ---

// # **📍 Stage 4: JavaScript Operators**

// ---

// ## **1. What is an Operator?**

// An **operator** is a **symbol** that tells JavaScript to perform an action on values (operands).

// 💡 **Analogy:**
// Think of operators like **kitchen tools**:

// * Knife = cut (subtraction)
// * Blender = mix (addition)
// * Measuring cup = compare sizes (comparison)
// * Light switch = turn on/off (logical)

// ---

// We’ll group them into **5 main categories**:

// ---

// ## **2. Arithmetic Operators** ➕➖✖️➗

// Used for math operations.

// | Operator | Example  | Result        |
// | -------- | -------- | ------------- |
// | `+`      | 5 + 2    | 7             |
// | `-`      | 5 - 2    | 3             |
// | `*`      | 5 \* 2   | 10            |
// | `/`      | 5 / 2    | 2.5           |
// | `%`      | 5 % 2    | 1 (remainder) |
// | `**`     | 5 \*\* 2 | 25 (exponent) |

// 💡 **Real-world example:**

// * Price calculation: `total = price * quantity;`
// * Finding remainder: `if (year % 4 === 0)` → Leap year check.

// ---

// ## **3. Assignment Operators** 📦

// Assign values to variables.

// | Operator | Example | Same as    |
// | -------- | ------- | ---------- |
// | `=`      | x = 5   | x = 5      |
// | `+=`     | x += 3  | x = x + 3  |
// | `-=`     | x -= 2  | x = x - 2  |
// | `*=`     | x \*= 2 | x = x \* 2 |
// | `/=`     | x /= 2  | x = x / 2  |

// 💡 **Real-world example:**
// Updating bank balance:

// ```javascript
// balance += deposit;
// balance -= withdrawal;
// ```

// ---

// ## **4. Comparison Operators** ⚖️

// Used to compare values.
// Return **true** or **false**.

// | Operator | Example   | Result                                 |
// | -------- | --------- | -------------------------------------- |
// | `==`     | 5 == "5"  | true (loose equality, type conversion) |
// | `===`    | 5 === "5" | false (strict equality, no conversion) |
// | `!=`     | 5 != "5"  | false                                  |
// | `!==`    | 5 !== "5" | true                                   |
// | `>`      | 5 > 3     | true                                   |
// | `<`      | 5 < 3     | false                                  |
// | `>=`     | 5 >= 5    | true                                   |
// | `<=`     | 3 <= 5    | true                                   |

// 💡 **Real-world example:**
// Check if a student passed:

// ```javascript
// if (marks >= 50) {
//   console.log("Pass");
// } else {
//   console.log("Fail");
// }
// ```

// ---

// ## **5. Logical Operators** 🔀

// Used for combining conditions.

// | Operator | Meaning | Example             |    |          |   |              |
// | -------- | ------- | ------------------- | -- | -------- | - | ------------ |
// | `&&`     | AND     | (age > 18 && hasID) |    |          |   |              |
// | \`       |         | \`                  | OR | (isAdmin |   | isModerator) |
// | `!`      | NOT     | !isLoggedIn         |    |          |   |              |

// 💡 **Real-world example:**
// Allow entry if **age ≥ 18** **and** has ticket:

// ```javascript
// if (age >= 18 && hasTicket) {
//   console.log("Entry allowed");
// }
// ```

// ---

// ## **6. Ternary Operator** ❓

// Shortcut for `if...else`.

// Syntax:

// ```javascript
// condition ? valueIfTrue : valueIfFalse
// ```

// Example:

// ```javascript
// let age = 20;
// let message = age >= 18 ? "Adult" : "Minor";
// console.log(message);
// ```

// 💡 **Real-world example:**
// Display:

// ```javascript
// isOnline ? "User is online" : "User is offline";
// ```

// ---

// ## **7. Operator Precedence**

// Some operators run before others.
// Example:

// ```javascript
// let result = 5 + 3 * 2; // 5 + (3 * 2) = 11
// ```

// 💡 **Tip:** Use parentheses `()` to make the order clear.

// ---

// ## **📌 Stage 4 Summary**

// You now know:

// 1. Arithmetic (`+ - * / % **`)
// 2. Assignment (`= += -= *= /=`)
// 3. Comparison (`== === != !== > < >= <=`)
// 4. Logical (`&& || !`)
// 5. Ternary (`? :`)
// 6. Precedence rules

// ---

// ## **💻 Mini Project**

// **"Simple Grade Checker"**

// ```javascript
// let marks = prompt("Enter your marks:");
// let result = marks >= 50 ? "Pass" : "Fail";
// console.log(result);
// ```
