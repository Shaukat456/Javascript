// ---

// # **📍 Stage 3: JavaScript Data Types**

// ---

// ## **1. What is a Data Type?**

// A **data type** tells JavaScript **what kind of value** is stored in a variable and how it can be used.

// 💡 **Analogy:**
// Imagine you have boxes labeled **"Books"**, **"Clothes"**, and **"Electronics"**.

// * You wouldn’t try to *wear* a book or *read* a T-shirt.
// * Similarly, JavaScript treats different types of data differently.

// ---

// ## **2. Two Main Categories**

// 1. **Primitive types** → stored directly in memory as simple values
// 2. **Reference types** → stored as references (pointers) to where data is kept in memory

// ---

// ## **3. Primitive Data Types** (7 total)

// ### **a) String** — text

// ```javascript
// let name = "Ali";
// let message = 'Hello!';
// let template = `Hi, ${name}!`;
// ```

// * Can use **single**, **double**, or **backticks**
// * Backticks allow **template literals** (`${}` interpolation)

// 💡 **Analogy:** Strings are like **sentences written on paper** — they hold text.

// ---

// ### **b) Number** — integers & decimals

// ```javascript
// let age = 25;
// let price = 19.99;
// ```

// * JavaScript has **only one number type** (64-bit floating point)
// * Special values: `Infinity`, `-Infinity`, `NaN` (Not a Number)

// 💡 **Analogy:** Numbers are like **labels on measuring cups** — they represent quantities.

// ---

// ### **c) Boolean** — true or false

// ```javascript
// let isLoggedIn = true;
// let isLightOn = false;
// ```

// 💡 **Analogy:** A **light switch** — only two states: on/off.

// ---

// ### **d) Undefined** — declared but not assigned

// ```javascript
// let x;
// console.log(x); // undefined
// ```

// 💡 **Analogy:** An **empty mailbox** — it exists, but nothing’s inside.

// ---

// ### **e) Null** — intentional empty value

// ```javascript
// let car = null;
// ```

// 💡 **Analogy:** A **reserved parking spot with no car yet** — it’s empty on purpose.

// ---

// ### **f) Symbol** — unique identifiers (ES6+)

// ```javascript
// let id = Symbol("id");
// let id2 = Symbol("id");
// console.log(id === id2); // false
// ```

// 💡 **Analogy:** Secret **VIP keys** — even if they look the same, they’re different.

// ---

// ### **g) BigInt** — very large integers

// ```javascript
// let bigNumber = 123456789012345678901234567890n;
// ```

// 💡 **Analogy:** A **super large warehouse** that can store gigantic numbers.

// ---

// ## **4. Reference Data Types**

// ### **a) Object** — key-value pairs

// ```javascript
// let person = {
//   name: "Ali",
//   age: 25
// };
// ```

// 💡 **Analogy:** A **dictionary** — each word (key) has a meaning (value).

// ---

// ### **b) Array** — ordered list

// ```javascript
// let fruits = ["Apple", "Banana", "Mango"];
// ```

// 💡 **Analogy:** A **bookshelf** — each slot has a number (index) and a book (value).

// ---

// ### **c) Function** — reusable block of code

// ```javascript
// function greet() {
//   console.log("Hello!");
// }
// ```

// 💡 **Analogy:** A **coffee machine** — you press a button (call function) to get the same result each time.

// ---

// ## **5. typeof Operator**

// Check the type of a value:

// ```javascript
// console.log(typeof "Ali"); // string
// console.log(typeof 42);    // number
// console.log(typeof null);  // object (quirk in JS)
// ```

// ---

// ## **6. Type Conversion**

// ### **a) String to Number**

// ```javascript
// Number("42");  // 42
// parseInt("42"); // 42
// parseFloat("42.5"); // 42.5
// ```

// ### **b) Number to String**

// ```javascript
// String(42);   // "42"
// 42 + "";      // "42"
// ```

// ### **c) Boolean Conversion**

// ```javascript
// Boolean(1);   // true
// Boolean(0);   // false
// Boolean("");  // false
// Boolean("hi");// true
// ```

// ---

// ## **7. Real-World Examples**

// * **Login system**: Boolean (`isLoggedIn`)
// * **E-commerce**: Number (`price`), String (`productName`), Object (`productDetails`)
// * **Game**: Number (`score`), Boolean (`gameOver`), Array (`levels`)

// ---

// ## **📌 Stage 3 Summary**

// You now know:

// 1. Primitive vs Reference types
// 2. 7 primitive types and their uses
// 3. Common reference types (object, array, function)
// 4. `typeof` operator
// 5. Type conversion tricks

// ---

// ## **💻 Mini Project**

// **"Simple Product Info"**

// ```javascript
// let productName = "Laptop";
// let price = 899.99;
// let inStock = true;

// console.log(`Product: ${productName}`);
// console.log(`Price: $${price}`);
// console.log(`In Stock: ${inStock}`);
// ```
