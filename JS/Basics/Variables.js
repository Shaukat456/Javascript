# **📍 Stage 2: Variables & Constants**

---

## **1. What is a Variable?**

A **variable** is like a **named storage box** in your computer’s memory where you can keep data and reuse it later.

---

**🛠 Real-world analogy:**
Think of a **labeled jar** in your kitc hen.

* The **label** = variable name (`age`, `username`)
* The **contents** = the data/value stored (`25`, `"Ali"`)
* You can **change** the contents anytime (replace sugar with salt — but please don’t in real life).

---

**Example:**

```javascript
let name = "Ali";
let age = 20;
console.log(name, age);
```

---

## **2. Declaring Variables: var, let, const**

### **a) `var`** (Old way — function scoped)

* Can be redeclared
* Can be reassigned
* Hoisted (but initialized with `undefined`)
* Scope = **function** or global

Example:

```javascript
var city = "Karachi";
var city = "Lahore"; // ✅ works
console.log(city); // Lahore
```

---

### **b) `let`** (Modern way — block scoped)

* ❌ Cannot be redeclared in the same block
* ✅ Can be reassigned
* Hoisted but **not** initialized (Temporal Dead Zone )

Example:

```javascript
let fruit = "Apple";
fruit = "Banana"; // ✅ works
let fruit = "Orange"; //  ❌ Error if in same block
```

---

### **c) `const`** (Constant — block scoped)

* ❌ Cannot be redeclared
* ❌ Cannot be reassigned
* Must be initialized at declaration

Example:

```javascript
const country = "Pakistan";
// country = "India"; ❌ Error
```

---

// ## **3. Scope: Where Variables Live**

// * **Global scope** → available everywhere
// * **Function scope** → available only inside that function (`var`)
// * **Block scope** → available only inside `{}` (`let` and `const`)

// Example:

```javascript
{
  let x = 10;
  var y = 20;
}
console.log(y); // ✅ works (var escapes block)
console.log(x); // ❌ Error (block scoped)
```

---


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


## **4. Hoisting Recap with Variables**

From Stage 1, remember:

* `var` → hoisted & initialized with `undefined`
* `let` & `const` → hoisted but **not initialized** (access before declaration = ReferenceError)

Example:

```javascript
console.log(a); // undefined
var a = 5;

console.log(b); // ❌ ReferenceError
let b = 10;
```

---

**💡 Analogy:**
Think of `var` as a **student who shows up early** (declared early), but **sits quietly with empty hands** until given notes (value).
`let` and `const` are like **students not allowed in class** until roll call time (declaration point).

---

## **5. Naming Rules**

* Must start with **letter**, `_`, or `$`
* Cannot start with number
* Case sensitive (`Name` ≠ `name`)
* Use **camelCase** for variables: `userName`, `totalPrice`

✅ Good:

```javascript
let firstName = "Ali";
```

❌ Bad:

```javascript
let 2name = "Ali"; // ❌ SyntaxError
```

---

## **6. Real-World Examples**

* **User profile**: Store username, age, and location
* **Shopping cart**: Store number of items and total price
* **Game score**: Store player’s score and lives left

---

## **7. Memory Model (Visual)**

When you write:

```javascript
let age = 25;
```

💾 **Memory**:

```
Label: age
Value: 25
```

If you later write:

```javascript
age = 30;
```

💾 **Memory updates**:

```
Label: age
Value: 30
```

---

## **📌 Stage 2 Summary**

You now know:

1. Variables store data with names
2. `var` = function scope, `let` & `const` = block scope
3. Hoisting behavior differences
4. Naming rules
5. Real-world use cases

---

## **💻 Mini Project**

**"Simple Profile Card in Console"**

```javascript
const name = prompt("Enter your name:");
let age = prompt("Enter your age:");
const country = "Pakistan";

console.log("Profile:");
console.log("Name:", name);
console.log("Age:", age);
console.log("Country:", country);
```
