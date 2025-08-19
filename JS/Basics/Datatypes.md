---
# **📍 Stage 3: JavaScript Data Types**
---

## **1. What is a Data Type?**

A **data type** tells JavaScript **what kind of value** is stored in a variable and how it can be used.

💡 **Analogy:**
Imagine you have boxes labeled **"Books"**, **"Clothes"**, and **"Electronics"**.

- You wouldn’t try to _wear_ a book or _read_ a T-shirt.
- Similarly, JavaScript treats different types of data differently.

---

## **2. Two Main Categories**

1. **Primitive types** → stored directly in memory as simple values
2. **Reference types** → stored as references (pointers) to where data is kept in memory

---

## **3. Primitive Data Types** (7 total)

### **a) String** — text

```javascript
let name = "Ali";
let message = "Hello!";
let template = `Hi, ${name}!`;
```

- Can use **single**, **double**, or **backticks**
- Backticks allow **template literals** (`${}` interpolation)

💡 **Analogy:** Strings are like **sentences written on paper** — they hold text.

---

### **b) Number** — integers & decimals

// `javascript
let age = 25;
let price = 19.99;
// `

- JavaScript has **only one number type** (64-bit floating point)
- Special values: `Infinity`, `-Infinity`, `NaN` (Not a Number)

💡 **Analogy:** Numbers are like **labels on measuring cups** — they represent quantities.

---

### **c) Boolean** — true or false

let isLoggedIn = true;
let isLightOn = false;

💡 **Analogy:** A **light switch** — only two states: on/off.

---

### **d) Undefined** — declared but not assigned

let x;
console.log(x); // undefined

💡 **Analogy:** An **empty mailbox** — it exists, but nothing’s inside.

---

### **e) Null** — intentional empty value

let car = null;

💡 **Analogy:** A **reserved parking spot with no car yet** — it’s empty on purpose.

---

### **f) Symbol** — unique identifiers (ES6+)

let id = Symbol("id");
let id2 = Symbol("id");
console.log(id === id2); // false

💡 **Analogy:** Secret **VIP keys** — even if they look the same, they’re different.

---

### **g) BigInt** — very large integers

let bigNumber = 123456789012345678901234567890n;

💡 **Analogy:** A **super large warehouse** that can store gigantic numbers.

---

## **4. Reference Data Types**

### **a) Object** — key-value pairs

```javascript
let person = {
  name: "Ali",
  age: 25,
};
```

💡 **Analogy:** A **dictionary** — each word (key) has a meaning (value).

---

### **b) Array** — ordered list

```javascript
let fruits = ["Apple", "Banana", "Mango"];
```

💡 **Analogy:** A **bookshelf** — each slot has a number (index) and a book (value).

---

### **c) Function** — reusable block of code

```javascript
function greet() {
  console.log("Hello!");
}
```

💡 **Analogy:** A **coffee machine** — you press a button (call function) to get the same result each time.

---

## **5. typeof Operator**

Check the type of a value:

```javascript
console.log(typeof "Ali"); // string
console.log(typeof 42); // number
console.log(typeof null); // object (quirk in JS)
```

---

## **6. Type Conversion**

### **a) String to Number**

```javascript
Number("42"); // 42
parseInt("42"); // 42
parseFloat(); // 42.5
```

### **b) Number to String**

```javascript
String(42); // "42"
42 + ""; // "42"
```

### **c) Boolean Conversion**

```javascript
Boolean(1); // true
Boolean(0); // false
Boolean(""); // false
Boolean("hi"); // true
```

---

## **7. Real-World Examples**

- **Login system**: Boolean (`isLoggedIn`)
- **E-commerce**: Number (`price`), String (`productName`), Object (`productDetails`)
- **Game**: Number (`score`), Boolean (`gameOver`), Array (`levels`)

---

## **📌 Stage 3 Summary**

You now know:

1. Primitive vs Reference types
2. 7 primitive types and their uses
3. Common reference types (object, array, function)
4. `typeof` operator
5. Type conversion tricks

---

## **💻 Mini Project**

**"Simple Product Info"**

```javascript
let productName = "Laptop";
let price = 899.99;
let inStock = true;

console.log(`Product: ${productName}`);
console.log(`Price: $${price}`);
console.log(`In Stock: ${inStock}`);
```

// ## 🔍 Primitive vs Reference — Key Difference

// let a = 5;
// let b = a;
// b = 10;
// console.log(a); // 5

// let obj1 = { name: "Ali" };
// let obj2 = obj1;
// obj2.name = "Sara";
// console.log(obj1.name);

// ## 📚 Summary Table

// | Type | Mutable? | Stored By | Example | Use Case |
// | --------- | -------- | --------- | ------------------- | ------------------ |
// | String | ❌ | Value | `"hello"` | Text |
// | Number | ❌ | Value | `42` | Prices, scores |
// | Boolean | ❌ | Value | `true/false` | Conditions |
// | Null | ❌ | Value | `null` | Intentional empty |
// | Undefined | ❌ | Value | `undefined` | Missing value |
// | Symbol | ❌ | Value | `Symbol("id")` | Unique keys |
// | BigInt | ❌ | Value | `9007199254740991n` | Big calculations |
// | Object | ✅ | Reference | `{ name: "Ali" }` | User, product data |
// | Array | ✅ | Reference | `[1, 2, 3]` | Lists, datasets |
// | Function | ✅ | Reference | `function() {}` | Reusable logic |

// ## 💾 How JavaScript Uses Memory

// JavaScript manages memory in two key areas:

// ### 📍 1. **Stack (Call Stack)**

// _ Fast access
// _ Stores **primitive values** and **execution context**
// _ Uses **fixed-size** memory
// _ Last In, First Out (LIFO) structure

// ### 🧠 2. **Heap**

// _ Slower, flexible memory space
// _ Stores **reference types** (objects, arrays, functions)
// _ Used for **dynamic memory allocation**
// _ Accessed via pointers (memory addresses)

// ---

// ## 🔹 Primitive Types — Stored in the Stack

// These are:

// _ `String`
// _ `Number`
// _ `Boolean`
// _ `Undefined`
// _ `Null`
// _ `Symbol`
// \* `BigInt`

// ### 🔧 Example:

// `javascript
// let a = 10;
// let b = a;
// b = 20;
// `

// 📦 **In Memory:**

// `// Stack:
// a = 10
// b = 10 → changed to 20
//`

// ✅ Each variable gets **its own memory space**. `b = a` copies the value `10`, not the reference. Changing `b` has **no effect on `a`**.

// ---

// ## 🔸 Reference Types — Stored in the Heap

// These include:

// _ `Object`
// _ `Array`
// \* `Function`

// They are **stored in the heap**, and **the variable holds only a reference (memory address)** to the actual object.

// ### 🔧 Example:

// ```javascript
// let obj1 = { name: "Ali" };
// let obj2 = obj1;

// obj2.name = "Sara";
// ```

// 📦 **In Memory:**

// ```
// Stack:
// obj1 → 📍0x123
// obj2 → 📍0x123

// Heap (at 0x123):
// { name: "Sara" }
// ```

// ✅ Both `obj1` and `obj2` **point to the same memory location**. Updating one updates the other.

// ---

// ## 🧠 Key Differences: Stack vs Heap

// | Feature | Stack | Heap |
// | ------------------ | -------------------------------- | ------------------------------- |
// | Stores | Primitive values, function calls | Objects, arrays, functions |
// | Speed | Very fast | Slower |
// | Memory size | Fixed | Dynamic |
// | Access | Direct | Indirect (by reference) |
// | Garbage Collected? | Yes (when out of scope) | Yes (when no references remain) |

// ---

// ## 🛠️ Garbage Collection (GC)

// JavaScript uses **automatic garbage collection** — unused memory is freed when:

// _ A variable **goes out of scope** (for stack)
// _ Nothing references an object (for heap)

// `javascript
// let obj = { name: "Ali" };
// obj = null; // 💡 Memory for the object is now eligible for cleanup
// `

// ✅ Engines like **V8 (used in Chrome and Node.js)** use algorithms like **Mark and Sweep** to free up unused heap memory.

// ---

// ## 🔁 Copy vs Reference Visualized

// ### 🟢 Primitive Copy

// `javascript
// let x = 5;
// let y = x;
// y = 10;
// console.log(x); // 5
// `

// _ Separate memory slots
// _ Safe from side-effects

// ### 🔴 Reference Copy

// `javascript
// let arr1 = [1, 2];
// let arr2 = arr1;
// arr2.push(3);
// console.log(arr1); // [1, 2, 3]
// `

// _ Shared heap memory
// _ One change affects all references

// ---

// ## ⚔️ Defensive Copying (Avoid Shared Memory Pitfalls)

// To avoid modifying the original object/array:

// ### ✅ Shallow Copy

// `javascript
// let user = { name: "Ali" };
// let copy = { ...user }; // New object in memory
// `

// ### ✅ Array Copy

// `javascript
// let fruits = ["apple", "banana"];
// let copy = [...fruits]; // Not pointing to original
// `

// ---

// ## 💡 Summary Chart

// | Type | Stored In | Memory Behavior | Copied By | Mutable? | Use Case |
// | --------- | --------- | ------------------- | --------- | -------- | ---------------------------- |
// | Number | Stack | Direct value | Value | ❌ | Calculations, counters |
// | String | Stack | Direct value | Value | ❌ | Names, messages |
// | Boolean | Stack | Direct value | Value | ❌ | Conditions |
// | Undefined | Stack | Direct value | Value | ❌ | Missing values |
// | Null | Stack | Direct value | Value | ❌ | Empty values |
// | Object | Heap | Stored by reference | Reference | ✅ | Users, settings, data models |
// | Array | Heap | Stored by reference | Reference | ✅ | Lists, datasets |
// | Function | Heap | Stored by reference | Reference | ✅ | Reusable logic |

// ---

// ## 🧪 Quick Quiz

// 1. What’s the output?

// `javascript
// let a = [1, 2];
// let b = a;
// b.push(3);
// console.log(a);
// `

// ✅ Output: `[1, 2, 3]` — because both `a` and `b` point to the same heap memory.

// ---
