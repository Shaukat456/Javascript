Awesome! Let's move on to the next foundational topic in JavaScript:

---

# 🔢 JavaScript Operators

Operators allow you to **manipulate values**, **compare them**, and **build logic**.

We’ll cover:

1. **Arithmetic Operators**
2. **Assignment Operators**
3. **Comparison Operators**
4. **Logical Operators**
5. **String Operators**
6. **Type Operators**
7. **Real-world Examples & Internals**

---

## 1️⃣ Arithmetic Operators — Basic Math

| Operator | Meaning             | Example  | Result  |
| -------- | ------------------- | -------- | ------- |
| `+`      | Addition            | `3 + 2`  | `5`     |
| `-`      | Subtraction         | `5 - 2`  | `3`     |
| `*`      | Multiplication      | `4 * 2`  | `8`     |
| `/`      | Division            | `6 / 2`  | `3`     |
| `%`      | Modulus (remainder) | `5 % 2`  | `1`     |
| `**`     | Exponentiation      | `2 ** 3` | `8`     |
| `++`     | Increment           | `a++`    | `a + 1` |
| `--`     | Decrement           | `a--`    | `a - 1` |

### 🧠 Real-World Example:

```javascript
let price = 100;
let tax = 18;
let total = price + tax; // 118
```

📦 Used in **billing systems, games, forms**.

---

## 2️⃣ Assignment Operators

| Operator | Meaning             | Example  | Equivalent  |
| -------- | ------------------- | -------- | ----------- |
| `=`      | Assign              | `x = 10` |             |
| `+=`     | Add and assign      | `x += 5` | `x = x + 5` |
| `-=`     | Subtract and assign | `x -= 2` | `x = x - 2` |
| `*=`     | Multiply and assign | `x *= 3` | `x = x * 3` |
| `/=`     | Divide and assign   | `x /= 2` | `x = x / 2` |

### 💡 Real-World Use:

```javascript
let score = 0;
score += 10; // score becomes 10
```

---

## 3️⃣ Comparison Operators — For Conditions

| Operator | Checks For                 | Example     | Result  |
| -------- | -------------------------- | ----------- | ------- |
| `==`     | Equality (loose)           | `"5" == 5`  | `true`  |
| `===`    | Equality + type (strict)   | `"5" === 5` | `false` |
| `!=`     | Inequality (loose)         | `5 != "5"`  | `false` |
| `!==`    | Inequality + type (strict) | `5 !== "5"` | `true`  |
| `>`      | Greater than               | `5 > 3`     | `true`  |
| `<`      | Less than                  | `3 < 5`     | `true`  |
| `>=`     | Greater or equal           | `5 >= 5`    | `true`  |
| `<=`     | Less or equal              | `4 <= 3`    | `false` |

### 🔍 Why `==` vs `===` matters

```javascript
"0" == 0     // true (type coercion)
"0" === 0    // false (type must also match)
```

✅ **Use `===` and `!==`** by default to avoid bugs due to type coercion.

---

## 4️⃣ Logical Operators — Combine Conditions

| Operator | Meaning | Example         | Result  |        |   |         |        |
| -------- | ------- | --------------- | ------- | ------ | - | ------- | ------ |
| `&&`     | AND     | `true && false` | `false` |        |   |         |        |
| \`       |         | \`              | OR      | \`true |   | false\` | `true` |
| `!`      | NOT     | `!true`         | `false` |        |   |         |        |

### 🧠 Real-World Login Example:

```javascript
let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn && isAdmin) {
  console.log("Access dashboard");
} else {
  console.log("Access denied");
}
```

---

## 5️⃣ String Operators

| Operator | Use           | Example              | Result          |
| -------- | ------------- | -------------------- | --------------- |
| `+`      | Concatenation | `"Hello" + " World"` | `"Hello World"` |
| `+=`     | Add to string | `msg += "!"`         | Adds a bang     |

```javascript
let name = "Shaukat";
let greeting = "Hello, " + name;
```

🧰 Used in **UI messages, chat apps, logs**

---

## 6️⃣ Type Operators

| Operator     | Use                   | Example                | Result     |
| ------------ | --------------------- | ---------------------- | ---------- |
| `typeof`     | Returns the data type | `typeof 42`            | `"number"` |
| `instanceof` | Check object type     | `arr instanceof Array` | `true`     |

### Example:

```javascript
typeof "hello"      // "string"
typeof null         // "object" ❗(quirk in JS)
typeof undefined    // "undefined"
```

---

## 🧠 How Operators Work Internally

* **Arithmetic Operators** work on values in the stack or references to numbers in the heap.
* **Logical and Comparison Operators** evaluate **truthy** or **falsy** values.
* JavaScript **automatically converts types** with `==`, but not with `===`.
* **Short-circuiting** in logical ops:

  ```javascript
  let user = null;
  let name = user || "Guest"; // name = "Guest"
  ```

---

## 💡 Truthy vs Falsy (Used in Logic)

| Falsy Values        | Truthy Values                |
| ------------------- | ---------------------------- |
| `false`, `0`, `""`  | Everything else              |
| `null`, `undefined` | `"false"`, `"0"`, `[]`, `{}` |
| `NaN`               |                              |

```javascript
if ("") console.log("Hi"); // won't run
if ("0") console.log("Zero"); // ✅ runs!
```

---

## 🧪 Quick Practice

1. What’s the result?

```javascript
console.log("5" + 1);    // ?
console.log("5" - 1);    // ?
console.log(5 == "5");   // ?
console.log(5 === "5");  // ?
```

✅ Output:

```
"51"  ← string concatenation
4     ← string converted to number
true  ← loose equality
false ← strict equality
```

