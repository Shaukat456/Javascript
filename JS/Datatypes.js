
---

## 🧠 What Are Data Types?

A **data type** defines the kind of value a variable holds. JavaScript is **dynamically typed**, meaning variables can hold any type — and that type can even change.

```javascript
let value = "hello"; // string
value = 42;          // now
//  it's a number!
```

---

## 🎯 Categories of Data Types

JavaScript has **two main categories** of data types:

### 🔹 1. **Primitive Types**

* Immutable (can’t be changed directly)
* Stored by **value**
* 7 types

### 🔸 2. **Reference Types (Objects)**

* Mutable (can change contents)
* Stored by **reference**

---

## 🔹 Primitive Types (7 total)

### 1. **String**

🧾 Used to store **text**, inside quotes `" "` or `' '`

```javascript
let name = "Shaukat";
```

🧠 **Analogy:** Like a **sentence inside quotation marks**.
🧰 **Use Case:** Usernames, messages, file names

💡 Internally: Stored as a sequence of UTF-16 characters. Strings are **immutable** (changing it creates a new one).

```javascript
let a = "hello";
a[0] = "H"; // ❌ This won't work
```

---

### 2. **Number**

🧾 Stores **integers**, **floats**, **NaN**, **Infinity**

```javascript
let age = 25;
let price = 10.99;
let temp = -2;
```

🧠 **Analogy:** Like a **calculator value**
🧰 **Use Case:** Age, scores, prices, quantities

💡 Internally: JavaScript has only **one number type** (64-bit floating point), which means it stores `10` and `10.5` similarly under the hood.

```javascript
let a = 0.1 + 0.2;
console.log(a); // ⚠️ Not 0.3, but 0.30000000000000004 due to float precision
```

---

### 3. **Boolean**

🧾 Only `true` or `false` — Used for logical decisions

```javascript
let isOnline = true;
```

🧠 **Analogy:** Like a **switch** (on/off) or **yes/no** checkbox
🧰 **Use Case:** Login status, feature toggles, conditions

💡 Internally: Stored as a single bit but wrapped in object when needed.

---

### 4. **Undefined**

🧾 A variable declared but **not assigned a value** yet

```javascript
let x;
console.log(x); // undefined
```

🧠 **Analogy:** Like a **blank form field** — it's there, but you didn’t fill it yet.
🧰 **Use Case:** Detecting uninitialized values

💡 Internally: Automatically assigned by JS engine when no value is set.

---

### 5. **Null**

🧾 Represents **"no value"** or **intentional absence**

```javascript
let user = null;
```

🧠 **Analogy:** Like **empty space reserved for future data** (e.g., an empty reserved chair)
🧰 **Use Case:** Clearing a variable, placeholder for future objects

💡 Internally: Type of `null` is weirdly `"object"` due to a legacy bug.

---

### 6. **Symbol (ES6)**

🧾 Used to create **unique identifiers**

```javascript
let id = Symbol("userID");
```

🧠 **Analogy:** Like giving a secret code name to an object key
🧰 **Use Case:** Avoiding property name conflicts in objects

💡 Internally: Guaranteed to be unique, even if created with the same description.

```javascript
Symbol("foo") === Symbol("foo"); // false
```

---

### 7. **BigInt (ES11)**

🧾 Used to represent **very large integers** beyond `2^53 - 1`

```javascript
let big = 1234567890123456789012345678901234567890n;
```

🧠 **Analogy:** Like a **super calculator** that handles astronomical numbers
🧰 **Use Case:** Cryptography, high-precision math

💡 Internally: Handled by a separate class of numbers

---

## 🔸 Reference Types (Objects, Arrays, Functions)

These are **not stored by value**, but by **reference** (i.e., memory address). Let’s explore:

---

### 1. **Object**

🧾 Key-value pairs

```javascript
let user = {
  name: "Ali",
  age: 22
};
```

🧠 **Analogy:** Like a **record** or **dictionary**
🧰 **Use Case:** Users, products, API responses

💡 Internally: Stored in the heap, accessed by reference.

---

### 2. **Array**

🧾 Ordered list of values

```javascript
let fruits = ["apple", "banana", "mango"];
```

🧠 **Analogy:** Like a **shopping list**
🧰 **Use Case:** Lists, datasets, menus

💡 Internally: Also an object, but with numeric keys.

---

### 3. **Function**

🧾 A block of reusable code

```javascript
function greet() {
  console.log("Hello!");
}
```

🧠 **Analogy:** Like a **vending machine** — input goes in, output comes out
🧰 **Use Case:** Event handling, logic reuse, modular code

💡 Internally: Functions are **first-class objects** — they can be assigned, passed, and returned.

---

## 🔍 Primitive vs Reference — Key Difference

```javascript
let a = 5;
let b = a;
b = 10;
console.log(a); // 5

let obj1 = { name: "Ali" };
let obj2 = obj1;
obj2.name = "Sara";
console.log(obj1.name); // "Sara" – both point to same memory
```

✅ **Primitive → value is copied**
✅ **Reference → memory address is shared**

---

## 📚 Summary Table

| Type      | Mutable? | Stored By | Example             | Use Case           |
| --------- | -------- | --------- | ------------------- | ------------------ |
| String    | ❌        | Value     | `"hello"`           | Text               |
| Number    | ❌        | Value     | `42`                | Prices, scores     |
| Boolean   | ❌        | Value     | `true/false`        | Conditions         |
| Null      | ❌        | Value     | `null`              | Intentional empty  |
| Undefined | ❌        | Value     | `undefined`         | Missing value      |
| Symbol    | ❌        | Value     | `Symbol("id")`      | Unique keys        |
| BigInt    | ❌        | Value     | `9007199254740991n` | Big calculations   |
| Object    | ✅        | Reference | `{ name: "Ali" }`   | User, product data |
| Array     | ✅        | Reference | `[1, 2, 3]`         | Lists, datasets    |
| Function  | ✅        | Reference | `function() {}`     | Reusable logic     |

---

## 🎮 Practice Time!

**Q1:** What will this output?

```javascript
let a = "Ali";
let b = a;
b = "Sara";
console.log(a);
```

✅ Answer: `"Ali"` — because strings are primitives, copied by value.



---

## 💾 How JavaScript Uses Memory

JavaScript manages memory in two key areas:

### 📍 1. **Stack (Call Stack)**

* Fast access
* Stores **primitive values** and **execution context**
* Uses **fixed-size** memory
* Last In, First Out (LIFO) structure

### 🧠 2. **Heap**

* Slower, flexible memory space
* Stores **reference types** (objects, arrays, functions)
* Used for **dynamic memory allocation**
* Accessed via pointers (memory addresses)

---

## 🔹 Primitive Types — Stored in the Stack

These are:

* `String`
* `Number`
* `Boolean`
* `Undefined`
* `Null`
* `Symbol`
* `BigInt`

### 🔧 Example:

```javascript
let a = 10;
let b = a;
b = 20;
```

📦 **In Memory:**

```
Stack:
a = 10
b = 10 → changed to 20
```

✅ Each variable gets **its own memory space**. `b = a` copies the value `10`, not the reference. Changing `b` has **no effect on `a`**.

---

## 🔸 Reference Types — Stored in the Heap

These include:

* `Object`
* `Array`
* `Function`

They are **stored in the heap**, and **the variable holds only a reference (memory address)** to the actual object.

### 🔧 Example:

```javascript
let obj1 = { name: "Ali" };
let obj2 = obj1;

obj2.name = "Sara";
```

📦 **In Memory:**

```
Stack:
obj1 → 📍0x123
obj2 → 📍0x123

Heap (at 0x123):
{ name: "Sara" }
```

✅ Both `obj1` and `obj2` **point to the same memory location**. Updating one updates the other.

---

## 🧠 Key Differences: Stack vs Heap

| Feature            | Stack                            | Heap                            |
| ------------------ | -------------------------------- | ------------------------------- |
| Stores             | Primitive values, function calls | Objects, arrays, functions      |
| Speed              | Very fast                        | Slower                          |
| Memory size        | Fixed                            | Dynamic                         |
| Access             | Direct                           | Indirect (by reference)         |
| Garbage Collected? | Yes (when out of scope)          | Yes (when no references remain) |

---

## 🛠️ Garbage Collection (GC)

JavaScript uses **automatic garbage collection** — unused memory is freed when:

* A variable **goes out of scope** (for stack)
* Nothing references an object (for heap)

```javascript
let obj = { name: "Ali" };
obj = null; // 💡 Memory for the object is now eligible for cleanup
```

✅ Engines like **V8 (used in Chrome and Node.js)** use algorithms like **Mark and Sweep** to free up unused heap memory.

---

## 🔁 Copy vs Reference Visualized

### 🟢 Primitive Copy

```javascript
let x = 5;
let y = x;
y = 10;
console.log(x); // 5
```

* Separate memory slots
* Safe from side-effects

### 🔴 Reference Copy

```javascript
let arr1 = [1, 2];
let arr2 = arr1;
arr2.push(3);
console.log(arr1); // [1, 2, 3]
```

* Shared heap memory
* One change affects all references

---

## ⚔️ Defensive Copying (Avoid Shared Memory Pitfalls)

To avoid modifying the original object/array:

### ✅ Shallow Copy

```javascript
let user = { name: "Ali" };
let copy = { ...user }; // New object in memory
```

### ✅ Array Copy

```javascript
let fruits = ["apple", "banana"];
let copy = [...fruits]; // Not pointing to original
```

---

## 💡 Summary Chart

| Type      | Stored In | Memory Behavior     | Copied By | Mutable? | Use Case                     |
| --------- | --------- | ------------------- | --------- | -------- | ---------------------------- |
| Number    | Stack     | Direct value        | Value     | ❌        | Calculations, counters       |
| String    | Stack     | Direct value        | Value     | ❌        | Names, messages              |
| Boolean   | Stack     | Direct value        | Value     | ❌        | Conditions                   |
| Undefined | Stack     | Direct value        | Value     | ❌        | Missing values               |
| Null      | Stack     | Direct value        | Value     | ❌        | Empty values                 |
| Object    | Heap      | Stored by reference | Reference | ✅        | Users, settings, data models |
| Array     | Heap      | Stored by reference | Reference | ✅        | Lists, datasets              |
| Function  | Heap      | Stored by reference | Reference | ✅        | Reusable logic               |

---

## 🧪 Quick Quiz

1. What’s the output?

```javascript
let a = [1, 2];
let b = a;
b.push(3);
console.log(a);
```

✅ Output: `[1, 2, 3]` — because both `a` and `b` point to the same heap memory.

---

