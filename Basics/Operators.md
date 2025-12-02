---
---

# 🚀 **Mastering JavaScript Operators (Deep & Practical Guide)**

Operators are **symbols that tell JavaScript to perform actions**.
Think of them as the **verbs** of the programming language.

We will cover:

1. **Arithmetic Operators**
2. **Assignment Operators**
3. **Comparison Operators**
4. **Logical Operators**
5. **Ternary Operator**
6. **Unary Operators**
7. **String Operators**
8. **Operator Precedence**
9. **Real-world use cases**

---

# 1️⃣ **Arithmetic Operators** (Math)

These perform math operations.

| Operator | Name           | Example  | Result |
| -------- | -------------- | -------- | ------ |
| `+`      | Addition       | 10 + 5   | 15     |
| `-`      | Subtraction    | 10 - 5   | 5      |
| `*`      | Multiplication | 10 \* 5  | 50     |
| `/`      | Division       | 10 / 5   | 2      |
| `%`      | Remainder      | 10 % 3   | 1      |
| `**`     | Exponent       | 2 \*\* 3 | 8      |

---

### ✅ **Examples & Edge Cases**

#### **1. Division**

```js
console.log(10 / 0); // Infinity ✔️
```

#### **2. Remainder usage**

```js
console.log(11 % 2); // 1 (Check odd/even)
```

#### **3. Exponent**

```js
console.log(3 ** 3); // 27
```

---

### 🌍 **Real-World Example: Shopping Cart**

```js
let price = 1200;
let qty = 3;
let total = price * qty;

console.log(total); // 3600
```

---

# 2️⃣ **Assignment Operators**

They assign values to variables.

| Operator | Meaning           | Example            |
| -------- | ----------------- | ------------------ |
| `=`      | Assign            | x = 10             |
| `+=`     | Add & assign      | x += 5 → x = x + 5 |
| `-=`     | Subtract & assign | x -= 2             |
| `*=`     | Multiply & assign | x \*= 2            |
| `/=`     | Divide & assign   | x /= 2             |

---

### 🌍 **Real-World Case: Bank Balance Update**

```js
let balance = 5000;

balance += 2000; // deposit
balance -= 1500; // withdrawal

console.log(balance); // 5500
```

---

# 3️⃣ **Comparison Operators** (Boolean: true/false)

Used for decision-making.

| Operator | Checks           | Example   | Result |
| -------- | ---------------- | --------- | ------ |
| `==`     | Equal (loose)    | 5 == "5"  | true   |
| `===`    | Equal (strict)   | 5 === "5" | false  |
| `!=`     | Not equal        | 5 != 6    | true   |
| `!==`    | Strict not equal | 5 !== "5" | true   |
| `>`      | Greater than     | 7 > 3     | true   |
| `<`      | Less than        | 7 < 3     | false  |
| `>=`     | Greater or equal | 10 >= 10  | true   |
| `<=`     | Less or equal    | 7 <= 9    | true   |

---

### ⚠️ **Edge Case: Loose vs Strict**

```js
console.log(0 == false); // true
console.log(0 === false); // false
```

> Always prefer **===** for accurate comparison.

---

### 🌍 **Real-World Example: Pass or Fail**

```js
let marks = 60;

if (marks >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}
```

---

# 4️⃣ **Logical Operators**

Used to combine multiple conditions.

| Operator | Meaning | Example         |             |     |     |     |
| -------- | ------- | --------------- | ----------- | --- | --- | --- |
| `&&`     | AND     | a > 18 && hasID |             |     |     |     |
|          | OR      | isAdmin         | isModerator |     |     |
| `!`      | NOT     | !isLoggedIn     |             |     |     |     |

---

### 👍 **AND (&&)**

Both must be true.

```js
let age = 19;
let hasID = true;

console.log(age > 18 && hasID); // true
```

### 👍 **OR (||)**

At least one true.

```js
console.log(true || false); // true
```

### 👍 **NOT (!)**

```js
console.log(!true); // false
```

---

### 🌍 **Real-World: Login check**

```js
if (username && password) {
  console.log("Login Successful");
}
```

---

# 5️⃣ **Ternary Operator** (Shortcut for if-else)

```js
condition ? resultIfTrue : resultIfFalse;
```

### Example:

```js
let age = 17;
let type = age >= 18 ? "Adult" : "Minor";
```

---

### 🌍 **Real-World: Online Status**

```js
let isOnline = true;

console.log(isOnline ? "User is Online" : "User is Offline");
```

---

# 6️⃣ **Unary Operators**

### **Increment / Decrement**

| Operator | Meaning       |
| -------- | ------------- |
| `++`     | Increase by 1 |
| `--`     | Decrease by 1 |

```js
let x = 5;
x++; // 6
--x; // 5
```

---

### Prefix vs Postfix

```js
let a = 5;
console.log(++a); // 6 (updates first)
console.log(a++); // 6 (prints first, then updates)
```

---

# 7️⃣ **String Operator**

### Concatenation using `+`

```js
console.log("Hello " + "World"); // Hello World
```

### Mixed with numbers

```js
console.log("Price: " + 500);
```

⚠️ **Left-to-right rule**

```js
console.log(1 + 2 + "3"); // "33"
console.log("1" + 2 + 3); // "123"
```

---

# 8️⃣ **Operator Precedence** (Order of execution)

Like math:
`*` and `/` come before `+` and `-`.

```js
let result = 10 + 2 * 3; // 10 + (6) = 16
```

Use parentheses for clarity:

```js
(10 + 2) * 3; // 36
```

---

# 🎯 **Real-World Mini Projects Using Operators**

---

## ⭐ **1. Simple Grade Checker**

```js
let marks = prompt("Enter your marks:");
let result = marks >= 50 ? "Pass" : "Fail";

console.log(result);
```

---

## ⭐ **2. Age-Based Ticket Pricing**

```js
let age = 15;
let price = age <= 12 ? 100 : age <= 18 ? 200 : 300;

console.log("Your ticket price is " + price);
```

---

## ⭐ **3. Discount Calculation**

```js
let price = 2000;
let discount = price > 1500 ? 20 : 10;

let finalPrice = price - (price * discount) / 100;

console.log(finalPrice);
```

---

## ⭐ **4. Login Validation**

```js
let email = "user@mail.com";
let pass = "12345";

if (email && pass) {
  console.log("Login Successful");
} else {
  console.log("Missing Details");
}
```

---

# 🎉 **Summary: What You Now Understand**

You learned:

✔ Arithmetic Operators
✔ Assignment Operators
✔ Comparison Operators
✔ Logical Operators
✔ Ternary Operator
✔ Unary Operators
✔ String Operators
✔ Precedence Rules
✔ Practical real-world cases

---
