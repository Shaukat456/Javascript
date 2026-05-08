# 🧠 Object-Oriented Programming in JavaScript

### Beginner → Intermediate: Everything You Need

> _"OOP isn't about typing less code. It's about thinking more clearly."_

---

## 📋 Table of Contents

| #   | Topic                                                                  | Level           |
| --- | ---------------------------------------------------------------------- | --------------- |
| 1   | [What is OOP & Why It Exists](#1-what-is-oop--why-it-exists)           | 🟢 Beginner     |
| 2   | [Objects — The Foundation](#2-objects--the-foundation)                 | 🟢 Beginner     |
| 3   | [Classes — Blueprints for Objects](#3-classes--blueprints-for-objects) | 🟢 Beginner     |
| 4   | [Pillar 1 — Encapsulation](#4-pillar-1--encapsulation)                 | 🟡 Intermediate |
| 5   | [Pillar 2 — Abstraction](#5-pillar-2--abstraction)                     | 🟡 Intermediate |
| 6   | [Pillar 3 — Inheritance](#6-pillar-3--inheritance)                     | 🟡 Intermediate |
| 7   | [Pillar 4 — Polymorphism](#7-pillar-4--polymorphism)                   | 🟡 Intermediate |
| 8   | [The Prototype Chain & `this`](#8-the-prototype-chain--this)           | 🟡 Intermediate |
| 9   | [Composition vs Inheritance](#9-composition-vs-inheritance)            | 🟡 Intermediate |
| 10  | [Interview Q&A Masterlist](#10-interview-qa-masterlist)                | 🎯 All Levels   |
| 11  | [Cheat Sheet & Common Pitfalls](#11-cheat-sheet--common-pitfalls)      | 📌 Reference    |

---

## 1. What is OOP & Why It Exists

### The Problem It Solves

Before OOP, all code was **procedural** — a list of steps, one after another. That works fine for small programs. But as software grows to thousands of lines, procedural code becomes a nightmare to manage.

**The core problem:** data and the functions that work on that data live separately, with no formal relationship between them.

```js
// ❌ Procedural — data and functions are disconnected
let user1Name = "Alice";
let user1Email = "alice@test.com";
let user1Age = 30;

let user2Name = "Bob";
let user2Email = "bob@test.com";
let user2Age = 25;

function greetUser1() {
  console.log(`Hello, ${user1Name}!`);
}
function greetUser2() {
  console.log(`Hello, ${user2Name}!`);
}
function validateUser1Email() {
  return user1Email.includes("@");
}
// Imagine this for 1,000 users. 💀
```

```js
// ✅ OOP — data and behavior travel together
class User {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  greet() {
    console.log(`Hello, ${this.name}!`);
  }
  validateEmail() {
    return this.email.includes("@");
  }
}

const alice = new User("Alice", "alice@test.com", 30);
const bob = new User("Bob", "bob@test.com", 25);

alice.greet(); // Hello, Alice!
bob.greet(); // Hello, Bob!
// Scale to 1,000,000 users — same 3 lines of class definition.
```

---

### The Real-World Mindset Shift

OOP says: **think in things, not steps.**

Everything in the real world is an object with:

- **Properties** (data it has): A car _has_ a color, speed, fuel level
- **Methods** (things it can do): A car _can_ accelerate, brake, refuel

| Real World Thing | Properties         | Methods                             |
| ---------------- | ------------------ | ----------------------------------- |
| Bank Account     | owner, balance     | deposit(), withdraw()               |
| User Profile     | name, email, role  | login(), logout(), updateProfile()  |
| Shopping Cart    | items, total       | addItem(), removeItem(), checkout() |
| Timer            | seconds, isRunning | start(), stop(), reset()            |

---

### The 4 Pillars — Quick Mental Model

Think of building a **hospital system**:

| Pillar            | Hospital Analogy                                                                        | What It Means in Code                                       |
| ----------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Encapsulation** | Patient records are locked — only authorized doctors can view them                      | Bundle data + behavior, hide internals                      |
| **Abstraction**   | Doctors use a simple form to order medication — they don't manage the pharmacy database | Show a simple interface, hide complex implementation        |
| **Inheritance**   | All doctors share general medical training; surgeons additionally know surgery          | Child classes reuse parent class features and add their own |
| **Polymorphism**  | `treat(patient)` means different things for a surgeon vs. a psychiatrist                | Same method name, different behavior per class              |

---

### When to Use OOP

✅ **Great fit for OOP:**

- Modeling real-world entities (User, Product, Order, Payment)
- Systems with many interacting parts
- Code that will be reused and extended over time
- Teams that need clear structure and boundaries

⚠️ **Maybe not OOP:**

- Simple one-off scripts
- Pure data transformation pipelines
- Utilities that are just functions with no shared state

---

## 2. Objects — The Foundation

### What is an Object?

An object is a **container** that groups related data (properties) and behavior (methods) together. Think of it like a filing folder — everything about one "thing" lives in one place.

```js
// Object literal — the most direct way to create an object
const laptop = {
  // Properties (data)
  brand: "Apple",
  ram: 16,
  storage: 512,
  isOn: false,

  // Methods (behavior)
  powerOn() {
    this.isOn = true;
    console.log(`${this.brand} laptop is booting...`);
  },

  powerOff() {
    this.isOn = false;
    console.log(`${this.brand} laptop is shutting down.`);
  },

  getSpecs() {
    return `${this.brand} | ${this.ram}GB RAM | ${this.storage}GB Storage`;
  },
};

laptop.powerOn(); // Apple laptop is booting...
console.log(laptop.getSpecs()); // Apple | 16GB RAM | 512GB Storage
console.log(laptop.isOn); // true
```

> 💡 **`this`** is the object's way of referring to itself. When `powerOn()` runs, `this` points to the `laptop` object.

---

### Objects are Reference Types

This is a crucial concept — understanding it prevents a whole class of bugs:

```js
// Primitives are copied by VALUE
let a = 5;
let b = a;
b = 99;
console.log(a); // 5 — a is unchanged

// Objects are copied by REFERENCE
const car1 = { color: "red", speed: 0 };
const car2 = car1; // car2 points to the SAME object in memory!

car2.color = "blue";
console.log(car1.color); // "blue" — car1 was affected! 😱

// To create an independent copy:
const car3 = { ...car1 }; // shallow copy using spread
car3.color = "green";
console.log(car1.color); // "blue" — car1 unchanged now ✅

// For nested objects, use structuredClone (deep copy)
const user = { name: "Alice", address: { city: "NYC" } };
const userCopy = structuredClone(user);
userCopy.address.city = "LA";
console.log(user.address.city); // "NYC" — unchanged ✅
```

---

### Dot Notation vs Bracket Notation

```js
const person = { name: "Alice", age: 30, "favorite color": "blue" };

// Dot notation — cleaner, most common
console.log(person.name); // Alice
person.age = 31;

// Bracket notation — required for dynamic keys or keys with spaces
const key = "name";
console.log(person[key]); // Alice — key is a variable

console.log(person["favorite color"]); // blue — key has a space

// Useful for dynamic property access
const fields = ["name", "age"];
fields.forEach((field) => console.log(person[field])); // Alice, 31
```

---

### Checking and Inspecting Objects

```js
const phone = {
  brand: "Samsung",
  model: "Galaxy S24",
  battery: 80,
};

// Check if property exists
console.log("brand" in phone); // true
console.log("price" in phone); // false
console.log(phone.hasOwnProperty("brand")); // true

// Get all keys, values, entries
console.log(Object.keys(phone)); // ["brand", "model", "battery"]
console.log(Object.values(phone)); // ["Samsung", "Galaxy S24", 80]
console.log(Object.entries(phone));
// [["brand","Samsung"], ["model","Galaxy S24"], ["battery",80]]

// Delete a property
delete phone.battery;
console.log(phone); // { brand: "Samsung", model: "Galaxy S24" }

// Prevent modification
const config = Object.freeze({ apiKey: "abc123", version: 2 });
config.apiKey = "hacked"; // silently fails in non-strict mode
console.log(config.apiKey); // "abc123" — unchanged
```

---

### Factory Functions — Creating Multiple Similar Objects

Before we get to classes, factory functions show the core need:

```js
// A factory function returns a new object every time it's called
function createPlayer(name, role) {
  // Private state via closure — truly inaccessible from outside
  let score = 0;
  let lives = 3;

  return {
    name,
    role,

    addScore(points) {
      if (points < 0) return;
      score += points;
      console.log(`${name} scored! Total: ${score}`);
    },

    loseLife() {
      lives--;
      if (lives <= 0) console.log(`${name} is out!`);
      return lives;
    },

    getStats() {
      return { name, role, score, lives };
    },
  };
}

const alice = createPlayer("Alice", "Warrior");
const bob = createPlayer("Bob", "Mage");

alice.addScore(100); // Alice scored! Total: 100
bob.addScore(200); // Bob scored! Total: 200

console.log(alice.getStats()); // { name: "Alice", role: "Warrior", score: 100, lives: 3 }
// alice.score → undefined (truly private via closure)
```

**The limitation:** Each object created by a factory gets its own **copy** of every method. With 10,000 players, that's 10,000 copies of `addScore`, `loseLife`, etc. — memory-inefficient. Classes solve this by sharing methods via the prototype.

---

### Interview Questions — Objects

**Q: What is the difference between `null` and `undefined` when used as object values?**

> `undefined` means a property doesn't exist or hasn't been set. `null` means the property exists but intentionally has no value — it's an explicit "nothing." Use `null` to represent "no value assigned yet" (e.g., `currentUser: null` before login).

**Q: What does `Object.freeze()` do? Is it deep?**

> `Object.freeze()` prevents adding, deleting, or modifying properties on an object. However, it's **shallow** — nested objects are not frozen. To deeply freeze, you'd need to recursively freeze all nested objects.

---

## 3. Classes — Blueprints for Objects

### The Blueprint Analogy

A **class** is like an architectural blueprint for a house. The blueprint defines: how many rooms, where the doors go, what materials to use. From one blueprint, you can build (instantiate) thousands of identical-but-separate houses (objects), each with their own address, paint color, and furniture.

```
Class (Blueprint)          Objects (Instances)
─────────────────      →   alice:  { name: "Alice", age: 30 }
    User               →   bob:    { name: "Bob",   age: 25 }
  { name, age,         →   carol:  { name: "Carol", age: 28 }
    greet() }          →   ...10,000 more
```

---

### Anatomy of a Class

```js
class BankAccount {
  // ── STATIC PROPERTY — belongs to the class, not instances
  static interestRate = 0.05;
  static #totalAccounts = 0; // private static (ES2022)

  // ── INSTANCE FIELD — default value for all instances
  currency = "USD";

  // ── CONSTRUCTOR — runs automatically when you call `new BankAccount(...)`
  constructor(owner, initialBalance = 0) {
    // Instance properties — each object gets its own copy
    this.owner = owner;
    this.balance = initialBalance;
    this.id = ++BankAccount.#totalAccounts;
    this.transactions = [];
  }

  // ── INSTANCE METHOD — defined on prototype, shared by all instances
  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
    this.transactions.push({ type: "deposit", amount, date: new Date() });
    console.log(`✅ Deposited $${amount}. New balance: $${this.balance}`);
    return this; // enables method chaining
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
    this.transactions.push({ type: "withdrawal", amount, date: new Date() });
    console.log(`✅ Withdrew $${amount}. New balance: $${this.balance}`);
    return this;
  }

  // ── GETTER — accessed like a property, no ()
  get summary() {
    return `Account #${this.id} [${this.owner}]: ${this.currency} ${this.balance.toFixed(2)}`;
  }

  // ── SETTER — validates/transforms on assignment
  set owner(name) {
    if (!name || name.trim().length < 2) throw new Error("Invalid name");
    this._owner = name.trim(); // store in _owner to avoid recursion
  }
  get owner() {
    return this._owner;
  }

  // ── STATIC METHOD — utility called on the class, not an instance
  static create(owner, balance) {
    return new BankAccount(owner, balance);
  }

  static getTotalAccounts() {
    return BankAccount.#totalAccounts;
  }

  // ── toString — called automatically when object is used as a string
  toString() {
    return this.summary;
  }
}

// ── Usage ────────────────────────────────────────────────
const alice = new BankAccount("Alice", 1000);
const bob = BankAccount.create("Bob", 500); // static factory

// Method chaining (each method returns `this`)
alice.deposit(500).deposit(200).withdraw(100);

console.log(alice.summary);
// Account #1 [Alice]: USD 1600.00

console.log(`${bob}`);
// Account #2 [Bob]: USD 500.00

console.log(BankAccount.getTotalAccounts()); // 2
console.log(BankAccount.interestRate); // 0.05
// alice.interestRate → undefined (static, not on instance)
```

---

### The `new` Keyword — What Happens Internally

When you write `new BankAccount("Alice", 1000)`, JavaScript does 4 things:

```js
// What `new` does internally (conceptual):

// 1. Creates a brand new empty object
const obj = {};

// 2. Sets its __proto__ to BankAccount.prototype
//    (This is how instances share methods efficiently)
Object.setPrototypeOf(obj, BankAccount.prototype);

// 3. Runs the constructor with `this` = obj
BankAccount.call(obj, "Alice", 1000);
// Now obj has: { _owner: "Alice", balance: 1000, id: 1, ... }

// 4. Returns obj
return obj;
```

This is why **methods are on the prototype** (shared, memory-efficient) but **properties are on each instance** (unique per object).

---

### Static vs Instance — When to Use Which

```js
class MathHelper {
  // ── STATIC: utility functions, factories, constants
  // Don't need any instance data to work
  static PI = 3.14159265;

  static circleArea(radius) {
    return MathHelper.PI * radius ** 2;
  }

  static clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  // ── INSTANCE: works with specific object's state
  constructor(precision = 2) {
    this.precision = precision;
  }

  format(number) {
    return number.toFixed(this.precision);
  }
}

// Static — no object needed
console.log(MathHelper.circleArea(5)); // 78.54
console.log(MathHelper.clamp(150, 0, 100)); // 100

// Instance — needs the object's state
const math = new MathHelper(4);
console.log(math.format(3.14159265)); // 3.1416

// Real-world static examples you already know:
// Array.isArray([])        — utility on the Array class
// Object.keys({})          — utility on the Object class
// Math.random()            — all of Math is static
// JSON.stringify(obj)      — utility on JSON class
```

---

### Method Chaining — Fluent Interface Pattern

Returning `this` from methods makes code read like English:

```js
class QueryBuilder {
  #table = "";
  #conditions = [];
  #fields = ["*"];
  #limitVal = null;
  #orderField = null;
  #orderDir = "ASC";

  from(table) {
    this.#table = table;
    return this;
  }
  select(...fields) {
    this.#fields = fields;
    return this;
  }
  where(condition) {
    this.#conditions.push(condition);
    return this;
  }
  limit(n) {
    this.#limitVal = n;
    return this;
  }
  orderBy(field, dir = "ASC") {
    this.#orderField = field;
    this.#orderDir = dir;
    return this;
  }

  build() {
    if (!this.#table) throw new Error("Table is required");
    let sql = `SELECT ${this.#fields.join(", ")} FROM ${this.#table}`;
    if (this.#conditions.length)
      sql += ` WHERE ${this.#conditions.join(" AND ")}`;
    if (this.#orderField)
      sql += ` ORDER BY ${this.#orderField} ${this.#orderDir}`;
    if (this.#limitVal) sql += ` LIMIT ${this.#limitVal}`;
    return sql;
  }
}

const query = new QueryBuilder()
  .from("users")
  .select("id", "name", "email")
  .where("age > 18")
  .where("active = 1")
  .orderBy("name")
  .limit(10)
  .build();

console.log(query);
// SELECT id, name, email FROM users WHERE age > 18 AND active = 1 ORDER BY name ASC LIMIT 10
```

---

### Interview Questions — Classes

**Q: What is the difference between a class and an object?**

> A **class** is a blueprint/template that defines structure and behavior. An **object** is a concrete instance created from that blueprint with its own data. `class Dog { }` defines what a dog is. `const rex = new Dog("Rex")` is an actual dog. You can create millions of dogs from one blueprint — each independent.

**Q: What does the constructor do? What happens if you don't define one?**

> The constructor runs automatically when `new ClassName()` is called. It's where you initialize instance properties. If you don't define one, JavaScript provides a default empty constructor (`constructor() {}`). If the class extends another, the default constructor calls `super()` automatically.

**Q: Why return `this` from methods?**

> Returning `this` enables **method chaining** — calling multiple methods in one expression: `obj.method1().method2().method3()`. Each method gets the object back, so the next method has something to call on. Common in query builders, configuration APIs, and animation libraries.

**Q: What is the difference between a class field and a property set in the constructor?**

> Class fields (`myField = value`) are defined on the instance, same as `this.myField = value` in the constructor. The difference: fields are defined at the class level so they're more visible and declarative. Private fields (`#myField`) _must_ be declared as class fields — you can't create a private field inside the constructor alone.

---

## 4. Pillar 1 — Encapsulation

### The Core Idea

> **Encapsulation** = Bundle data + behavior into one unit, and **control who can access what**.

Think of it as building walls around your data — not to hide it maliciously, but to protect it from accidental corruption and to maintain a clear contract: _"You interact with me through this door, not by breaking through the walls."_

---

### The Analogy: A Capsule Pill

A medicine capsule bundles the active ingredients (data) inside a protective shell. You take the whole capsule — you don't open it and handle the chemicals yourself. The shell:

- **Protects** the medicine from the environment
- **Protects you** from direct contact with harsh chemicals
- **Controls the release** of medicine in a safe, controlled way

That shell is encapsulation.

---

### Why It Matters — The Real Bug Story

```js
// ❌ WITHOUT encapsulation — state is wide open
class GameCharacter {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }
}

const hero = new GameCharacter("Hero", 100);

// Anywhere in your 10,000-line codebase, someone can do:
hero.health = -999; // invalid state!
hero.health = "dead"; // wrong type!
hero.name = ""; // breaks UI!
hero.health += 1000000; // cheating!

// Bugs are silent and hard to trace.
// Where did health become -999? Who knows. Could be anywhere.
```

```js
// ✅ WITH encapsulation — state is protected, changes are controlled
class GameCharacter {
  // Private fields — the # prefix makes them truly private (ES2022)
  #health;
  #maxHealth;
  #name;
  #isAlive = true;

  constructor(name, maxHealth = 100) {
    this.#setName(name);
    this.#maxHealth = maxHealth;
    this.#health = maxHealth;
  }

  // ── PUBLIC INTERFACE ────────────────────────────────────

  // Read-only getters (no setter = can't be assigned)
  get name() {
    return this.#name;
  }
  get health() {
    return this.#health;
  }
  get maxHealth() {
    return this.#maxHealth;
  }
  get isAlive() {
    return this.#isAlive;
  }
  get healthPercent() {
    return Math.round((this.#health / this.#maxHealth) * 100);
  }

  takeDamage(amount) {
    if (!this.#isAlive) return; // can't damage the dead
    if (amount < 0) throw new Error("Damage must be positive");
    this.#health = Math.max(0, this.#health - amount);
    if (this.#health === 0) {
      this.#isAlive = false;
      console.log(`💀 ${this.#name} has been defeated!`);
    } else {
      console.log(
        `💥 ${this.#name} took ${amount} damage! HP: ${this.#health}/${this.#maxHealth}`,
      );
    }
  }

  heal(amount) {
    if (!this.#isAlive) {
      console.log(`❌ Can't heal ${this.#name} — they're defeated.`);
      return;
    }
    if (amount < 0) throw new Error("Heal amount must be positive");
    const actual = Math.min(amount, this.#maxHealth - this.#health);
    this.#health += actual;
    console.log(
      `❤️  ${this.#name} healed ${actual} HP! HP: ${this.#health}/${this.#maxHealth}`,
    );
  }

  getStatus() {
    const bar =
      "█".repeat(Math.floor(this.healthPercent / 10)) +
      "░".repeat(10 - Math.floor(this.healthPercent / 10));
    return `${this.#name} [${bar}] ${this.#health}/${this.#maxHealth} HP`;
  }

  // ── PRIVATE HELPERS — internal details, not part of public API
  #setName(name) {
    if (!name || name.trim().length < 1) throw new Error("Name required");
    this.#name = name.trim();
  }
}

const hero = new GameCharacter("Arthas", 200);

hero.takeDamage(75); // Arthas took 75 damage! HP: 125/200
hero.heal(30); // Arthas healed 30 HP! HP: 155/200
hero.takeDamage(200); // Arthas has been defeated!
hero.heal(50); // Can't heal Arthas — they're defeated.

console.log(hero.getStatus());

// These are now impossible:
// hero.#health = -999    → SyntaxError (truly private)
// hero.health  = -999    → silently fails (no setter)
```

---

### Private Fields (`#`) vs Convention (`_`)

```js
class Example {
  // True private — enforced by the JavaScript engine
  #truePrivate = "nobody can touch this";

  // Convention only — accessible, just "please don't"
  _conventionPrivate = "technically accessible";

  publicProp = "open to everyone";

  getPrivate() {
    return this.#truePrivate;
  }
}

const e = new Example();

console.log(e.publicProp); // "open to everyone" ✅
console.log(e._conventionPrivate); // "technically accessible" — works!
// console.log(e.#truePrivate);      // SyntaxError — genuinely blocked ✅

// Danger with convention:
e._conventionPrivate = "corrupted!"; // nothing stops this
// e.#truePrivate = "corrupted!";    // SyntaxError — blocked ✅
```

---

### Getters & Setters Deep Dive

```js
class Temperature {
  #celsius;

  constructor(celsius) {
    this.celsius = celsius; // intentionally goes through the setter
  }

  // Setter — intercepts assignment, validates and transforms
  set celsius(value) {
    if (typeof value !== "number")
      throw new TypeError("Temperature must be a number");
    if (value < -273.15) throw new RangeError("Below absolute zero!");
    this.#celsius = value;
  }

  // Getter — returns the stored value
  get celsius() {
    return this.#celsius;
  }

  // Computed getters — derived from celsius, no storage needed
  get fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }
  get kelvin() {
    return this.#celsius + 273.15;
  }

  get description() {
    if (this.#celsius < 0) return "Freezing";
    if (this.#celsius < 20) return "Cold";
    if (this.#celsius < 30) return "Comfortable";
    return "Hot";
  }

  toString() {
    return `${this.#celsius}°C / ${this.fahrenheit}°F / ${this.kelvin}K (${this.description})`;
  }
}

const boiling = new Temperature(100);
console.log(String(boiling)); // 100°C / 212°F / 373.15K (Hot)

boiling.celsius = 22;
console.log(String(boiling)); // 22°C / 71.6°F / 295.15K (Comfortable)

boiling.celsius = -300; // RangeError: Below absolute zero!
boiling.celsius = "hot"; // TypeError: Temperature must be a number
```

---

### Real-World Use Case: Form Validation

```js
class FormField {
  #value = "";
  #validators = [];
  #errors = [];
  #touched = false;

  constructor(name, initialValue = "") {
    this.name = name;
    this.#value = initialValue;
  }

  // Chainable validator registration
  required(message = `${this.name} is required`) {
    this.#validators.push({ fn: (v) => v.trim().length > 0, message });
    return this;
  }

  minLength(n, message = `${this.name} must be at least ${n} characters`) {
    this.#validators.push({ fn: (v) => v.length >= n, message });
    return this;
  }

  matches(regex, message = `${this.name} format is invalid`) {
    this.#validators.push({ fn: (v) => regex.test(v), message });
    return this;
  }

  // Setting value triggers validation
  set value(val) {
    this.#value = val;
    this.#touched = true;
    this.#validate();
  }

  get value() {
    return this.#value;
  }
  get errors() {
    return [...this.#errors];
  } // return a copy
  get isValid() {
    return this.#errors.length === 0;
  }
  get isDirty() {
    return this.#touched;
  }

  #validate() {
    this.#errors = this.#validators
      .filter((v) => !v.fn(this.#value))
      .map((v) => v.message);
  }

  toString() {
    return `${this.name}: ${this.isValid ? "✅ Valid" : `❌ ${this.#errors.join(", ")}`}`;
  }
}

// Usage — build fields with chained validators
const emailField = new FormField("Email")
  .required()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Must be a valid email address");

const passwordField = new FormField("Password")
  .required()
  .minLength(8)
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[0-9]/, "Must contain at least one number");

emailField.value = "not-an-email";
console.log(String(emailField));
// Email: ❌ Must be a valid email address

emailField.value = "alice@example.com";
console.log(String(emailField)); // Email: ✅ Valid

passwordField.value = "weak";
console.log(passwordField.errors);
// ["Password must be at least 8 characters", "Must contain at least one uppercase letter", ...]

passwordField.value = "StrongPass1";
console.log(String(passwordField)); // Password: ✅ Valid
```

---

### Interview Questions — Encapsulation

**Q: What is encapsulation and why is it important?**

> Encapsulation bundles data and the methods that work on it into one unit, while restricting direct external access to internal state. It's important because:
>
> - **Data integrity**: No code can silently corrupt your object's state
> - **Maintainability**: You can change the internal implementation without breaking the public API
> - **Reduced coupling**: Other parts of the system depend on your interface, not your internals

**Q: What's the difference between `#private` and `_convention`?**

> `#private` is **truly private** — enforced by the JS engine. Accessing it from outside throws a `SyntaxError`. There is no workaround.
> `_convention` is just a naming agreement. It's still fully accessible — nothing actually prevents access. It just signals to other developers "treat this as internal."

**Q: When would you use a getter instead of a regular method?**

> Use a **getter** when the value should feel like reading a property: `user.fullName`, `account.balance`, `circle.area`. They signal "this is a value I have" not "this is an action I do."
> Use a **method** when: it requires parameters, has side effects, or is clearly an action: `user.save()`, `account.deposit(500)`.

**Q: Can private fields be accessed by subclasses?**

> No. `#private` fields are strictly scoped to the class they're defined in — not even subclasses can access them. If a subclass needs access, you must provide a getter or protected method in the parent class.

---

## 5. Pillar 2 — Abstraction

### The Core Idea

> **Abstraction** = Show only what's **necessary**. Hide what's **complex**.

Abstraction lets users of your class interact with a simple, clean interface — without needing to understand (or even know about) the complex machinery inside.

---

### The Analogy: A TV Remote

You press **power** and the TV turns on. You don't know or care about:

- How infrared signals are encoded and transmitted
- How the TV's processor decodes the signal
- How millions of pixels update to display the new image

You just press **power**. That's the abstraction — a simple button (interface) over massive complexity (implementation).

---

### Abstraction vs Encapsulation (They Work Together)

This is the most commonly confused distinction:

|                         | Encapsulation                | Abstraction                                     |
| ----------------------- | ---------------------------- | ----------------------------------------------- |
| **Question it answers** | _Who_ can access this?       | _What_ should users see?                        |
| **Focus**               | Protecting data              | Simplifying the interface                       |
| **Mechanism**           | Private fields, getters      | Simple public methods, hiding complex internals |
| **Analogy**             | Engine locked under the hood | Steering wheel and pedals                       |

_Encapsulation is the lock on the hood. Abstraction is the steering wheel design._

---

### Creating Abstract-Style Classes in JavaScript

JavaScript has no `abstract` keyword, but you simulate it:

```js
class Notification {
  constructor(recipient, message) {
    // Prevent direct instantiation of the abstract class
    if (new.target === Notification) {
      throw new Error(
        "Notification is abstract — use EmailNotification, SMSNotification, etc.",
      );
    }
    this.recipient = recipient;
    this.message = message;
    this.createdAt = new Date();
    this.sent = false;
  }

  // ── ABSTRACT METHODS — subclasses MUST implement these ──
  // The naming convention is just throwing to force override

  send() {
    throw new Error(`${this.constructor.name} must implement send()`);
  }

  getPreview() {
    throw new Error(`${this.constructor.name} must implement getPreview()`);
  }

  // ── CONCRETE METHODS — shared by all notification types ──
  // These use the abstract methods above (template method pattern)

  deliver() {
    console.log(
      `📤 Preparing ${this.constructor.name} for ${this.recipient}...`,
    );
    this.send(); // polymorphic — calls whichever subclass version
    this.sent = true;
    console.log(`✅ Delivered at ${new Date().toLocaleTimeString()}`);
  }

  toString() {
    return `[${this.constructor.name}] To: ${this.recipient} | ${this.getPreview()}`;
  }
}

class EmailNotification extends Notification {
  constructor(recipient, subject, body) {
    super(recipient, body);
    this.subject = subject;
  }

  send() {
    // In real code: call SMTP library, handle retries, encode content, etc.
    console.log(`  📧 Sending email to ${this.recipient}`);
    console.log(`     Subject: ${this.subject}`);
    console.log(`     Body: ${this.message.slice(0, 50)}...`);
    // All SMTP complexity is hidden here
  }

  getPreview() {
    return `"${this.subject}" — ${this.message.slice(0, 30)}...`;
  }
}

class SMSNotification extends Notification {
  constructor(phoneNumber, message) {
    if (message.length > 160) throw new Error("SMS must be ≤ 160 characters");
    super(phoneNumber, message);
  }

  send() {
    // In real code: call Twilio API, handle carrier routing, etc.
    console.log(`  📱 Sending SMS to ${this.recipient}: "${this.message}"`);
  }

  getPreview() {
    return this.message.slice(0, 40);
  }
}

class PushNotification extends Notification {
  constructor(deviceToken, title, body) {
    super(deviceToken, body);
    this.title = title;
  }

  send() {
    // In real code: call FCM/APNs API, handle device tokens, badges, etc.
    console.log(`  🔔 Push to device ${this.recipient.slice(0, 8)}...`);
    console.log(`     Title: ${this.title}`);
  }

  getPreview() {
    return `"${this.title}": ${this.message.slice(0, 25)}...`;
  }
}

// ── THE POINT: callers only see the simple interface ──────
// They don't know about SMTP, Twilio, FCM — completely hidden

function notifyUser(notification) {
  notification.deliver(); // same call, different behavior
}

const notifications = [
  new EmailNotification(
    "alice@example.com",
    "Order Confirmed",
    "Your order #1234 has been confirmed and is being processed...",
  ),
  new SMSNotification("+1-555-0100", "OTP: 7291. Valid for 5 mins."),
  new PushNotification(
    "device_token_abc123",
    "Flash Sale!",
    "50% off for the next hour!",
  ),
];

notifications.forEach((n) => {
  notifyAll(n);
  console.log(String(n));
  console.log("---");
});

function notifyAll(n) {
  n.deliver();
}

// new Notification("x", "y") → Error: Notification is abstract
```

---

### Abstraction in Everyday APIs

Look at browser/Node APIs you use daily — they're great examples:

```js
// fetch() — abstract interface over HTTP complexity
// You don't manage: TCP connections, TLS handshakes, HTTP/2 multiplexing,
//                   redirect following, cookie handling, chunked encoding...
const response = await fetch("https://api.example.com/users");
const users = await response.json();
// Two lines. Massive complexity hidden.

// Array.sort() — abstract interface over sorting algorithms
// You don't manage: quicksort, mergesort, timsort, memory allocation...
const sorted = [3, 1, 4, 1, 5, 9].sort((a, b) => a - b);
// One line. The algorithm is irrelevant to you.

// YOUR class should feel the same way:
class ImageResizer {
  // Simple interface
  async resize(imagePath, width, height) {
    const image = await this.#load(imagePath);
    const processed = await this.#processPixels(image, width, height);
    const output = await this.#compress(processed);
    return this.#save(output, imagePath);
  }

  // Complex implementation — hidden
  async #load(path) {
    /* read file, decode format */
  }
  async #processPixels(img, w, h) {
    /* bicubic interpolation, gamma correction */
  }
  async #compress(img) {
    /* quantization, entropy coding */
  }
  async #save(img, path) {
    /* write to disk, update metadata */
  }
}

// Caller only sees:
const resizer = new ImageResizer();
await resizer.resize("photo.jpg", 800, 600); // that's it.
```

---

### Real-World Use Case: Payment Processing

```js
// The abstraction: a simple, consistent interface for ALL payment methods
class PaymentGateway {
  constructor(config) {
    if (new.target === PaymentGateway) throw new Error("Abstract class");
    this.config = config;
  }

  // Abstract — every gateway must implement these
  async charge(amount, currency, source) {
    throw new Error("Implement charge()");
  }
  async refund(transactionId, amount) {
    throw new Error("Implement refund()");
  }
  async getTransaction(transactionId) {
    throw new Error("Implement getTransaction()");
  }

  // Concrete — shared across all gateways
  validateAmount(amount) {
    if (typeof amount !== "number" || amount <= 0)
      throw new Error("Amount must be a positive number");
    if (amount > 999999.99) throw new Error("Amount exceeds maximum limit");
  }

  async safeCharge(amount, currency, source) {
    this.validateAmount(amount);
    try {
      const result = await this.charge(amount, currency, source);
      console.log(
        `✅ Payment of $${amount} ${currency} processed: ${result.transactionId}`,
      );
      return result;
    } catch (err) {
      console.error(`❌ Payment failed: ${err.message}`);
      throw err;
    }
  }
}

class StripeGateway extends PaymentGateway {
  constructor(secretKey) {
    super({ secretKey });
    // this.stripe = new Stripe(secretKey) in real code
  }

  async charge(amount, currency, source) {
    // Stripe-specific: handle their API format, idempotency keys,
    // payment intents, webhook events, 3D Secure, etc.
    console.log(`  [Stripe] Charging ${amount} ${currency}...`);
    return {
      transactionId: `ch_${Date.now()}`,
      status: "succeeded",
      gateway: "stripe",
    };
  }

  async refund(transactionId, amount) {
    console.log(`  [Stripe] Refunding ${transactionId}...`);
    return { refundId: `re_${Date.now()}`, status: "succeeded" };
  }

  async getTransaction(transactionId) {
    return { id: transactionId, gateway: "stripe" };
  }
}

class PayPalGateway extends PaymentGateway {
  constructor(clientId, secret) {
    super({ clientId, secret });
  }

  async charge(amount, currency, source) {
    // PayPal-specific: OAuth tokens, order creation, capture flow, etc.
    console.log(`  [PayPal] Processing ${amount} ${currency}...`);
    return {
      transactionId: `PAYID-${Date.now()}`,
      status: "COMPLETED",
      gateway: "paypal",
    };
  }

  async refund(transactionId, amount) {
    console.log(`  [PayPal] Issuing refund for ${transactionId}...`);
    return { refundId: `REFID-${Date.now()}`, status: "PENDING" };
  }

  async getTransaction(transactionId) {
    return { id: transactionId, gateway: "paypal" };
  }
}

// ── CheckoutService only knows about the abstract interface ──
// Switching from Stripe to PayPal = change ONE line
class CheckoutService {
  constructor(paymentGateway) {
    this.gateway = paymentGateway;
  }

  async processOrder(order) {
    const { customerId, items, currency = "USD" } = order;
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    return this.gateway.safeCharge(total, currency, customerId);
  }
}

// Development/Testing
const stripeService = new CheckoutService(new StripeGateway("sk_test_..."));
const paypalService = new CheckoutService(
  new PayPalGateway("client_id", "secret"),
);

const order = {
  customerId: "cus_alice",
  items: [
    { name: "Laptop", price: 999, qty: 1 },
    { name: "Mouse", price: 49, qty: 2 },
  ],
};

await stripeService.processOrder(order);
// ✅ Payment of $1097 USD processed: ch_...

await paypalService.processOrder(order);
// ✅ Payment of $1097 USD processed: PAYID-...
```

---

### Interview Questions — Abstraction

**Q: What's the difference between abstraction and encapsulation?**

> **Abstraction** is a _design principle_ — deciding what to expose and what to hide. **Encapsulation** is the _mechanism_ you use to implement it — private fields, access modifiers.
>
> In a car: The steering wheel + pedals = **abstraction** (the simple interface you're given). The locked engine compartment = **encapsulation** (the mechanism hiding the internals). They work together.

**Q: How do you create an abstract class in JavaScript?**

> JavaScript has no `abstract` keyword. You simulate it with two conventions:
>
> 1. Check `new.target === YourClass` in the constructor and throw if someone tries to instantiate it directly
> 2. Have "abstract" methods throw `Error` by default, forcing subclasses to override them
>
> TypeScript does have a native `abstract` keyword if you need enforcement at compile time.

**Q: What is a "leaky abstraction"?**

> A leaky abstraction is when implementation details bleed through the interface — forcing users to know about things they shouldn't. Example: an HTTP client that throws `AWSNetworkError` instead of a generic `NetworkError` leaks the fact that it uses AWS. Now your callers have AWS knowledge. Good abstractions are completely opaque about their internals.

---

## 6. Pillar 3 — Inheritance

### The Core Idea

> **Inheritance** = A child class **receives** all properties and methods from a parent class, and can **add or override** them.

It's code reuse with a formal relationship. You define the common behavior once, and every child class benefits automatically.

---

### The Analogy: Family Traits

You inherit your parents' traits (eye color, height tendency) but you're your own person — you have traits they don't have, and sometimes you express a shared trait differently (your laugh vs. your dad's laugh — both are laughs, different sounds).

```
Person (grandparent class)
  ├── has: name, age
  ├── can: eat(), sleep(), breathe()
  │
  ├── Employee (parent class — IS-A Person, + more)
  │     ├── has: company, salary
  │     ├── can: work(), getPaycheck()
  │     │
  │     ├── Developer (child class — IS-A Employee, + more)
  │     │     ├── has: programmingLanguages
  │     │     └── can: writeCode(), deployApp()
  │     │
  │     └── Manager (child class — IS-A Employee, + more)
  │           ├── has: teamSize
  │           └── can: conductReview(), hirePerson()
  │
  └── Student (child class — IS-A Person, + more)
        ├── has: school, gpa
        └── can: study(), takeExam()
```

---

### Basic Inheritance

```js
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.energy = 100;
  }

  eat(food) {
    this.energy = Math.min(100, this.energy + 20);
    console.log(`🍖 ${this.name} eats ${food}. Energy: ${this.energy}`);
    return this;
  }

  sleep(hours) {
    this.energy = Math.min(100, this.energy + hours * 10);
    console.log(`💤 ${this.name} sleeps ${hours}h. Energy: ${this.energy}`);
    return this;
  }

  toString() {
    return `${this.name} (${this.species})`;
  }
}

class Dog extends Animal {
  #tricks = [];

  constructor(name, breed) {
    // super() MUST be called first — it sets up the parent's properties
    super(name, "Canis lupus familiaris");
    this.breed = breed; // dog-specific property
  }

  // Dog-specific methods (not in Animal)
  bark(times = 1) {
    this.energy -= 5;
    console.log(`🐕 ${this.name}: ${"Woof! ".repeat(times).trim()}`);
    return this;
  }

  learnTrick(trick) {
    this.#tricks.push(trick);
    console.log(`✨ ${this.name} learned: "${trick}"!`);
    return this;
  }

  perform() {
    if (this.#tricks.length === 0) {
      console.log(`${this.name} doesn't know any tricks yet.`);
      return this;
    }
    const trick = this.#tricks[Math.floor(Math.random() * this.#tricks.length)];
    console.log(`🎭 ${this.name} performs: "${trick}"!`);
    return this;
  }

  // Override parent's toString() — extend, not replace
  toString() {
    return `${super.toString()} — ${this.breed}`; // super.method() calls parent version
  }
}

class Cat extends Animal {
  constructor(name, isIndoor = true) {
    super(name, "Felis catus");
    this.isIndoor = isIndoor;
  }

  purr() {
    console.log(`😺 ${this.name}: Purrrr...`);
    return this;
  }

  // Cats override eat() — they're picky
  eat(food) {
    const dislikes = ["broccoli", "carrots", "salad"];
    if (dislikes.includes(food.toLowerCase())) {
      console.log(`😾 ${this.name} sniffs ${food} and walks away.`);
      return this;
    }
    return super.eat(food); // delegate to Animal's eat() for acceptable food
  }

  toString() {
    return `${super.toString()} — ${this.isIndoor ? "indoor" : "outdoor"} cat`;
  }
}

// ── Usage ────────────────────────────────────────────────
const rex = new Dog("Rex", "German Shepherd");
const luna = new Cat("Luna");

// Rex inherits eat() and sleep() from Animal
rex.eat("kibble").sleep(4).bark(3);
rex.learnTrick("sit").learnTrick("roll over");
rex.perform();

console.log(String(rex)); // Rex (Canis lupus familiaris) — German Shepherd

// Luna inherits sleep() from Animal, but overrides eat()
luna.eat("broccoli"); // sniffs and walks away
luna.eat("tuna"); // eats normally
luna.purr();

// instanceof checks the ENTIRE inheritance chain
console.log(rex instanceof Dog); // true
console.log(rex instanceof Animal); // true
console.log(rex instanceof Cat); // false
console.log(luna instanceof Animal); // true
```

---

### `super` — Both Uses Explained

```js
class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.speed = 0;
  }

  accelerate(amount) {
    this.speed += amount;
    console.log(`${this.make} ${this.model}: ${this.speed} km/h`);
    return this;
  }

  toString() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

class ElectricVehicle extends Vehicle {
  #batteryLevel = 100;

  constructor(make, model, year, range) {
    // ── USE 1: super() in constructor ──────────────────────
    // Calls the parent constructor. MUST come before any `this` usage.
    super(make, model, year); // sets this.make, this.model, this.year
    this.range = range; // EV-specific, added after super()
  }

  accelerate(amount) {
    // ── USE 2: super.method() in a method ──────────────────
    // Calls the parent's version — lets you extend, not just replace
    super.accelerate(amount); // still update speed and log
    this.#batteryLevel -= amount * 0.2; // also drain battery (EV-specific)
    console.log(`  🔋 Battery: ${this.#batteryLevel.toFixed(1)}%`);
    return this;
  }

  charge(percent = 100) {
    this.#batteryLevel = Math.min(100, this.#batteryLevel + percent);
    console.log(`⚡ ${super.toString()} charged to ${this.#batteryLevel}%`);
    return this;
  }

  get batteryLevel() {
    return this.#batteryLevel;
  }
}

const tesla = new ElectricVehicle("Tesla", "Model 3", 2024, 570);
tesla.accelerate(60).accelerate(40);
// Tesla Model 3: 60 km/h
//   🔋 Battery: 88.0%
// Tesla Model 3: 100 km/h
//   🔋 Battery: 80.0%

tesla.charge(15);
// ⚡ 2024 Tesla Model 3 charged to 95%
```

---

### Multi-Level Inheritance

```js
class LivingThing {
  alive = true;
  breathe() {
    return `${this.constructor.name} breathes`;
  }
}

class Animal extends LivingThing {
  constructor(name) {
    super();
    this.name = name;
  }
  eat(food) {
    return `${this.name} eats ${food}`;
  }
}

class Mammal extends Animal {
  warmBlooded = true;
  nurse() {
    return `${this.name} nurses its young`;
  }
}

class Dog extends Mammal {
  bark() {
    return `${this.name}: Woof!`;
  }
}

class GoldenRetriever extends Dog {
  fetch(item) {
    return `${this.name} fetches the ${item}!`;
  }
}

const buddy = new GoldenRetriever("Buddy");

// buddy can access the entire chain
console.log(buddy.breathe()); // GoldenRetriever breathes (from LivingThing)
console.log(buddy.eat("kibble")); // Buddy eats kibble (from Animal)
console.log(buddy.nurse()); // Buddy nurses its young (from Mammal)
console.log(buddy.bark()); // Buddy: Woof! (from Dog)
console.log(buddy.fetch("ball")); // Buddy fetches the ball! (own)

console.log(buddy instanceof GoldenRetriever); // true
console.log(buddy instanceof Dog); // true
console.log(buddy instanceof Mammal); // true
console.log(buddy instanceof Animal); // true
console.log(buddy instanceof LivingThing); // true
```

> ⚠️ **Depth warning**: Keep inheritance chains shallow (2-3 levels max). Deep hierarchies become brittle and hard to understand.

---

### Extending Built-in Classes

```js
// You can extend JavaScript's built-in types
class SmartArray extends Array {
  // Add custom methods
  sum() {
    return this.reduce((a, b) => a + b, 0);
  }
  average() {
    return this.sum() / this.length;
  }
  max() {
    return Math.max(...this);
  }
  min() {
    return Math.min(...this);
  }

  unique() {
    return new SmartArray(...new Set(this));
  }

  groupBy(keyFn) {
    return this.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) groups[key] = new SmartArray();
      groups[key].push(item);
      return groups;
    }, {});
  }
}

const scores = new SmartArray(85, 92, 78, 92, 65, 85, 99);

console.log(scores.sum()); // 596
console.log(scores.average()); // 85.14
console.log(scores.max()); // 99
console.log([...scores.unique()]); // [85, 92, 78, 65, 99]

// Still works as a real Array
const passing = scores.filter((s) => s >= 70);
console.log(passing instanceof SmartArray); // true — filter preserves subtype!
console.log(passing.average()); // 90.2
```

---

### Real-World Use Case: UI Component System

```js
class Component {
  #props;
  #state = {};

  constructor(props = {}) {
    if (new.target === Component) throw new Error("Component is abstract");
    this.#props = Object.freeze({ ...props }); // immutable props
  }

  get props() {
    return this.#props;
  }
  get state() {
    return { ...this.#state };
  }

  setState(updates) {
    this.#state = { ...this.#state, ...updates };
    this.onStateChange?.();
  }

  // Abstract — must implement
  render() {
    throw new Error(`${this.constructor.name} must implement render()`);
  }

  // Lifecycle hooks — optional override
  onMount() {}
  onUnmount() {}
}

class Button extends Component {
  constructor({ label, variant = "primary", onClick }) {
    super({ label, variant, onClick });
    this.setState({ loading: false, disabled: false });
  }

  setLoading(val) {
    this.setState({ loading: val });
    return this;
  }
  disable() {
    this.setState({ disabled: true });
    return this;
  }
  enable() {
    this.setState({ disabled: false });
    return this;
  }

  render() {
    const { label, variant } = this.props;
    const { loading, disabled } = this.state;
    const content = loading ? "Loading..." : label;
    return `<button class="btn btn-${variant}" ${disabled ? "disabled" : ""}>${content}</button>`;
  }
}

class IconButton extends Button {
  constructor(props) {
    super(props);
    this.icon = props.icon || "▶";
  }

  render() {
    // Leverage Button's render, inject icon
    return super
      .render()
      .replace(this.props.label, `${this.icon} ${this.props.label}`);
  }
}

class SubmitButton extends Button {
  constructor({ label = "Submit", formId }) {
    super({ label, variant: "success" });
    this.formId = formId;
  }

  async submit(asyncAction) {
    this.setLoading(true).disable();
    try {
      await asyncAction();
    } finally {
      this.setLoading(false).enable();
    }
  }
}

const primary = new Button({ label: "Save", variant: "primary" });
const icon = new IconButton({ label: "Play", icon: "▶", variant: "secondary" });
const submit = new SubmitButton({ label: "Create Account", formId: "signup" });

console.log(primary.render());
// <button class="btn btn-primary" >Save</button>

console.log(icon.render());
// <button class="btn btn-secondary" >▶ Play</button>

primary.setLoading(true);
console.log(primary.render());
// <button class="btn btn-primary" >Loading...</button>
```

---

### Interview Questions — Inheritance

**Q: What is the difference between `extends` and `super`?**

> `extends` establishes the inheritance relationship: `class Dog extends Animal` means Dog is a subclass of Animal.
> `super` is used inside the subclass: `super()` calls the parent constructor, `super.method()` calls a parent method.

**Q: Why must `super()` be called before `this` in a constructor?**

> Before `super()` runs, the parent hasn't set up its portion of the object. JavaScript enforces that the parent initializes the object first. Accessing `this` before that moment — when the object isn't fully set up — would cause a `ReferenceError`. It's a safety mechanism to ensure the object is always in a valid state.

**Q: What is method overriding? How is it different from overloading?**

> **Overriding**: A subclass redefines a method with the same name as the parent. The subclass version takes precedence. You can still call the parent version via `super.method()`.
> **Overloading**: Multiple methods with the same name but different parameter signatures. JavaScript does NOT support this — the last definition wins. You simulate it with argument inspection.

**Q: When should you NOT use inheritance?**

> Don't use inheritance when:
>
> - The relationship is "has-a" not "is-a" (`Car has an Engine`, not `Car is an Engine`)
> - You'd go more than 2-3 levels deep (fragile base class problem)
> - You're only reusing code, not modeling a real IS-A relationship (use composition or mixins instead)
> - The parent class might change in ways that could silently break child classes

---

## 7. Pillar 4 — Polymorphism

### The Core Idea

> **Polymorphism** = "Many forms." The **same operation** produces **different results** depending on the object it's called on.

This is the payoff of inheritance and abstraction. Once you have a common interface, you can write code that works with **any object that implements it** — without caring which specific type it is.

---

### The Analogy: The "Area" Request

Imagine you hand a form to three different people asking "What's the area of your shape?"

- The **circle person** uses `π × r²`
- The **rectangle person** uses `width × height`
- The **triangle person** uses `½ × base × height`

Same question (`area()`). Three completely different calculations. That's polymorphism.

---

### Runtime Polymorphism (Method Overriding)

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  // Base version — will be overridden
  speak() {
    return `${this.name} makes a sound`;
  }

  // Concrete method that uses the overridable speak()
  introduce() {
    return `Hi, I'm ${this.name}. ${this.speak()}`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks: Woof!`;
  }
}

class Cat extends Animal {
  speak() {
    return `${this.name} meows: Meow!`;
  }
}

class Cow extends Animal {
  speak() {
    return `${this.name} moos: Mooo!`;
  }
}

class Snake extends Animal {
  speak() {
    return `${this.name} hisses: Ssss!`;
  }
}

// ── THE POWER: One function, works with any Animal subclass ──
function makeAllSpeak(animals) {
  animals.forEach((animal) => {
    console.log(animal.introduce()); // same call, different result
  });
}

const animals = [
  new Dog("Rex"),
  new Cat("Luna"),
  new Cow("Bessie"),
  new Snake("Sly"),
  new Animal("Unknown"), // base version
];

makeAllSpeak(animals);
// Hi, I'm Rex. Rex barks: Woof!
// Hi, I'm Luna. Luna meows: Meow!
// Hi, I'm Bessie. Bessie moos: Mooo!
// Hi, I'm Sly. Sly hisses: Ssss!
// Hi, I'm Unknown. Unknown makes a sound

// No if/else. No switch/case. Just polymorphism.
// Adding a new animal = add a new class, ZERO changes to makeAllSpeak
```

---

### Duck Typing — JavaScript's Natural Polymorphism

JavaScript is dynamically typed, so polymorphism often happens without formal inheritance — as long as objects have the right methods, they work:

```js
// "If it walks like a duck and quacks like a duck, it's a duck"
// These objects are completely unrelated — no shared parent class

const circle = {
  name: "Circle",
  area() {
    return Math.PI * 5 * 5;
  },
  describe() {
    return `${this.name}: area = ${this.area().toFixed(2)}`;
  },
};

const rectangle = {
  name: "Rectangle",
  area() {
    return 8 * 6;
  },
  describe() {
    return `${this.name}: area = ${this.area().toFixed(2)}`;
  },
};

const triangle = {
  name: "Triangle",
  area() {
    return 0.5 * 10 * 4;
  },
  describe() {
    return `${this.name}: area = ${this.area().toFixed(2)}`;
  },
};

// This works with ANY object that has describe() — no inheritance required
function renderShapes(shapes) {
  shapes.forEach((s) => console.log(s.describe()));
  const total = shapes.reduce((sum, s) => sum + s.area(), 0);
  console.log(`Total area: ${total.toFixed(2)}`);
}

renderShapes([circle, rectangle, triangle]);
// Circle: area = 78.54
// Rectangle: area = 48.00
// Triangle: area = 20.00
// Total area: 146.54
```

---

### Real-World Use Case: Export System

```js
// Different export formats — same interface
class DataExporter {
  constructor() {
    if (new.target === DataExporter) throw new Error("Abstract");
  }

  // Abstract
  format(data) {
    throw new Error(`${this.constructor.name} must implement format()`);
  }
  get fileExtension() {
    throw new Error("Must provide fileExtension");
  }
  get mimeType() {
    throw new Error("Must provide mimeType");
  }

  // Concrete — shared
  export(data, filename) {
    const content = this.format(data);
    const fullName = `${filename}.${this.fileExtension}`;
    console.log(`💾 Exporting "${fullName}" [${this.mimeType}]`);
    console.log(`   Size: ~${content.length} bytes`);
    // In real code: trigger file download / write to disk
    return { filename: fullName, content, mimeType: this.mimeType };
  }
}

class JSONExporter extends DataExporter {
  format(data) {
    return JSON.stringify(data, null, 2);
  }
  get fileExtension() {
    return "json";
  }
  get mimeType() {
    return "application/json";
  }
}

class CSVExporter extends DataExporter {
  format(data) {
    if (!Array.isArray(data) || data.length === 0) return "";
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((v) => `"${v}"`)
        .join(","),
    );
    return [headers, ...rows].join("\n");
  }
  get fileExtension() {
    return "csv";
  }
  get mimeType() {
    return "text/csv";
  }
}

class XMLExporter extends DataExporter {
  format(data) {
    const toXML = (obj) =>
      Object.entries(obj)
        .map(([k, v]) => `  <${k}>${v}</${k}>`)
        .join("\n");

    const items = Array.isArray(data)
      ? data.map((item) => `<item>\n${toXML(item)}\n</item>`).join("\n")
      : `<item>\n${toXML(data)}\n</item>`;
    return `<?xml version="1.0"?>\n<data>\n${items}\n</data>`;
  }
  get fileExtension() {
    return "xml";
  }
  get mimeType() {
    return "application/xml";
  }
}

class MarkdownExporter extends DataExporter {
  format(data) {
    if (!Array.isArray(data) || data.length === 0) return "";
    const keys = Object.keys(data[0]);
    const header = `| ${keys.join(" | ")} |`;
    const divider = `| ${keys.map(() => "---").join(" | ")} |`;
    const rows = data.map((row) => `| ${Object.values(row).join(" | ")} |`);
    return [header, divider, ...rows].join("\n");
  }
  get fileExtension() {
    return "md";
  }
  get mimeType() {
    return "text/markdown";
  }
}

// ── Usage: same interface, different outputs ──────────────
const users = [
  { id: 1, name: "Alice", role: "admin", active: true },
  { id: 2, name: "Bob", role: "user", active: true },
  { id: 3, name: "Carol", role: "editor", active: false },
];

const exporters = [
  new JSONExporter(),
  new CSVExporter(),
  new XMLExporter(),
  new MarkdownExporter(),
];

// Same call on all — polymorphism handles the rest
exporters.forEach((exporter) => exporter.export(users, "users_report"));

// Add a new format? Create a new class. Zero changes to existing code.
```

---

### Polymorphism Removes Conditionals

One of polymorphism's greatest benefits — eliminating long `if/else` or `switch` chains:

```js
// ❌ WITHOUT polymorphism — brittle, grows forever
function processPayment(payment) {
  if (payment.type === "credit_card") {
    // credit card logic
    console.log("Processing credit card...");
  } else if (payment.type === "paypal") {
    // paypal logic
    console.log("Processing PayPal...");
  } else if (payment.type === "crypto") {
    // crypto logic
    console.log("Processing crypto...");
  }
  // New type? Edit this function. Risk breaking existing types.
}

// ✅ WITH polymorphism — clean, extensible
class CreditCardPayment {
  process() {
    console.log("Processing credit card...");
  }
}
class PayPalPayment {
  process() {
    console.log("Processing PayPal...");
  }
}
class CryptoPayment {
  process() {
    console.log("Processing crypto...");
  }
}

// Same call for any type:
function processPayment(payment) {
  payment.process(); // no conditionals needed
}

// Add new type: just add a class, never touch processPayment()
class BankTransferPayment {
  process() {
    console.log("Processing bank transfer...");
  }
}
```

---

### Interview Questions — Polymorphism

**Q: What is polymorphism? Give a simple example.**

> Polymorphism means "many forms" — the same operation behaves differently based on the object it's called on. Example: `animal.speak()` returns "Woof!" for a Dog, "Meow!" for a Cat, "Moo!" for a Cow — same call, different result. The code that calls `.speak()` doesn't need to know which animal type it has.

**Q: What is duck typing?**

> Duck typing means "if it has the right methods, it works" — no formal inheritance required. JavaScript is naturally duck-typed. If your object has a `speak()` method, it can participate in any code that calls `speak()`, regardless of its class hierarchy.

**Q: How does polymorphism improve code maintainability?**

> Polymorphism eliminates conditional branching (`if/else`, `switch`) based on object type. When you add a new type, you create a new class — you don't modify existing code. This follows the Open/Closed Principle: open for extension, closed for modification. Changes are isolated; existing behavior is unaffected.

**Q: What is the difference between method overriding and method overloading?**

> **Overriding** (runtime polymorphism): A subclass provides its own implementation of a method defined in the parent. Resolved at runtime based on the actual object type.
> **Overloading** (compile-time polymorphism): Multiple methods with the same name but different parameter signatures. JavaScript does **not** support true overloading — you simulate it by inspecting arguments manually.

---

## 8. The Prototype Chain & `this`

### How Objects Really Inherit in JavaScript

Classes are "syntactic sugar" — under the hood, JavaScript uses **prototypal inheritance**. Every object has a hidden link (`[[Prototype]]`) to another object. When you access a property, JavaScript walks this chain until it finds it or hits `null`.

```
rex (Dog instance)
  → Dog.prototype        (has: bark, learnTrick, toString)
    → Animal.prototype   (has: eat, sleep, toString)
      → Object.prototype (has: hasOwnProperty, valueOf, toString...)
        → null           (end of chain)
```

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    return `${this.name} eats`;
  }
}

class Dog extends Animal {
  bark() {
    return `${this.name}: Woof!`;
  }
}

const rex = new Dog("Rex");

// Walking the chain manually:
console.log(Object.getPrototypeOf(rex) === Dog.prototype); // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null — end of chain

// Property lookup:
// rex.bark() →
//   Look on rex itself            → not found
//   Look on Dog.prototype         → FOUND! bark() exists here ✅

// rex.eat() →
//   Look on rex itself            → not found
//   Look on Dog.prototype         → not found
//   Look on Animal.prototype      → FOUND! eat() exists here ✅

// rex.hasOwnProperty() →
//   Walks all the way to Object.prototype → FOUND ✅

// Own vs. inherited
console.log(rex.hasOwnProperty("name")); // true — set in constructor, on rex itself
console.log(rex.hasOwnProperty("bark")); // false — on Dog.prototype, not rex
console.log("bark" in rex); // true — checks the whole chain
```

---

### `this` — The Complete Beginner-to-Intermediate Guide

`this` is JavaScript's most misunderstood concept. The rule is simple: **`this` depends on HOW a function is called, not where it's defined** (except arrow functions).

```js
// ── 1. In a class/object method — `this` = the object ─────
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi, I'm ${this.name}`;
  } // this = Person instance
}
const alice = new Person("Alice");
console.log(alice.greet()); // Hi, I'm Alice

// ── 2. Losing `this` — the classic trap ───────────────────
const greetFn = alice.greet; // extract the method
// greetFn(); // TypeError in strict mode! `this` is undefined

// ── 3. Fixing lost `this` ─────────────────────────────────

// Fix A: bind() — creates a new function with `this` locked in
const boundGreet = alice.greet.bind(alice);
console.log(boundGreet()); // Hi, I'm Alice ✅

// Fix B: Arrow function — inherits `this` from enclosing scope
class Timer {
  count = 0;

  // ❌ Regular function in callback — `this` is lost
  startBad() {
    setInterval(function () {
      this.count++; // `this` is undefined (strict) or global!
    }, 1000);
  }

  // ✅ Arrow function in callback — `this` from class body
  startGood() {
    setInterval(() => {
      this.count++; // `this` = Timer instance ✅
      console.log(this.count);
    }, 1000);
  }
}

// Fix C: Store `this` in a variable (old-school, less preferred)
class OldStyle {
  count = 0;
  start() {
    const self = this; // capture `this`
    setInterval(function () {
      self.count++; // use `self` instead of `this` ✅
    }, 1000);
  }
}

// ── 4. call(), apply(), bind() — explicit `this` ──────────
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const user = { name: "Bob" };

// call — pass `this`, then args individually
console.log(introduce.call(user, "Hello", "!")); // Hello, I'm Bob!

// apply — pass `this`, then args as array
console.log(introduce.apply(user, ["Hi", "?"])); // Hi, I'm Bob?

// bind — returns NEW function with `this` locked, doesn't call it
const sayHi = introduce.bind(user, "Hey");
console.log(sayHi(".")); // Hey, I'm Bob.
```

---

### Arrow Functions and `this` — The Key Difference

```js
class EventHandler {
  constructor(name) {
    this.name = name;
  }

  // ── Prototype method: `this` determined at call time ────
  handleClick() {
    console.log(`Clicked by ${this.name}`);
  }

  // ── Class field arrow: `this` locked to instance at creation ──
  handleClickArrow = () => {
    console.log(`Clicked by ${this.name}`);
  };

  setup() {
    const button = { addEventListener: (e, fn) => fn() }; // mock button

    // ❌ Prototype method loses `this` in event listener
    button.addEventListener("click", this.handleClick);
    // Logs: "Clicked by undefined"

    // ✅ Arrow field keeps `this`
    button.addEventListener("click", this.handleClickArrow);
    // Logs: "Clicked by [name]"

    // ✅ .bind() also works
    button.addEventListener("click", this.handleClick.bind(this));
    // Logs: "Clicked by [name]"
  }
}
```

---

### `instanceof` and Type Checking

```js
class Shape {}
class Circle extends Shape {}
class Rectangle extends Shape {}

const c = new Circle();

// instanceof — walks the prototype chain
console.log(c instanceof Circle); // true
console.log(c instanceof Shape); // true
console.log(c instanceof Rectangle); // false
console.log(c instanceof Object); // true — everything is an Object

// constructor.name — get the class name as string
console.log(c.constructor.name); // "Circle"
console.log(c.constructor === Circle); // true

// Object.getPrototypeOf
console.log(Object.getPrototypeOf(c) === Circle.prototype); // true

// for objects you don't control, typeof:
console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof {}); // "object"
console.log(typeof []); // "object" — arrays are objects!
console.log(Array.isArray([])); // true — better check for arrays
console.log(typeof null); // "object" — historical JS quirk!
```

---

### Interview Questions — Prototype & `this`

**Q: What is the prototype chain?**

> Every object has an internal `[[Prototype]]` link. When you access a property, JavaScript searches the object itself, then follows the chain through prototypes until it finds the property or reaches `null`. This is how inheritance works under the hood — child instances find parent methods by walking up the chain.

**Q: What are the 4 ways `this` is determined?**

> 1. **`new` binding**: `this` = newly created object (`new Dog("Rex")`)
> 2. **Explicit binding**: `call()`, `apply()`, `bind()` set `this` explicitly
> 3. **Implicit binding**: Method call on an object — `obj.method()` → `this = obj`
> 4. **Default binding**: Standalone function call — `this = undefined` (strict mode) or global
>
> Arrow functions are special: they capture `this` from the enclosing scope at definition time — none of the above rules apply to them.

**Q: Why are class methods on the prototype rather than the instance?**

> Memory efficiency. If methods were on each instance, 10,000 User objects would have 10,000 copies of `greet()`. By putting them on `User.prototype`, there's exactly ONE copy, shared by all instances. The lookup cost is minimal (one hop up the chain), but the memory savings are enormous.

---

## 9. Composition vs Inheritance

### The "IS-A" vs "HAS-A" Rule

The most important rule for deciding when to use inheritance vs composition:

> - **Inheritance**: use when the relationship is **IS-A**
>   - A `Dog` IS AN `Animal` ✅
>   - A `Manager` IS AN `Employee` ✅
> - **Composition**: use when the relationship is **HAS-A**
>   - A `Car` HAS AN `Engine` ✅ (not: Car IS AN Engine ❌)
>   - A `Person` HAS AN `Address` ✅

---

### Why "Prefer Composition Over Inheritance"

This is famous advice from the Gang of Four book. Here's why:

```js
// ❌ WRONG: Using inheritance for a HAS-A relationship
class Engine {
  start() {
    console.log("Vroom!");
  }
  stop() {
    console.log("Engine off.");
  }
}

class Car extends Engine {
  // "A Car IS AN Engine" — that makes no sense!
}

// Problems:
// 1. Conceptually wrong — a car isn't a type of engine
// 2. Car now has start() and stop() which feel weird from outside
// 3. What if Car also needs GPS, Audio, ABS? Can't extend multiple classes

// ✅ CORRECT: Composition for HAS-A
class Engine {
  start() {
    console.log("🔧 Engine started: Vroom!");
  }
  stop() {
    console.log("🔧 Engine stopped.");
  }
  get rpm() {
    return 3000;
  }
}

class GPS {
  navigate(destination) {
    console.log(`📍 Navigating to: ${destination}`);
  }
  get currentLocation() {
    return "40.7128° N, 74.0060° W";
  }
}

class AudioSystem {
  play(song) {
    console.log(`🎵 Playing: ${song}`);
  }
  pause() {
    console.log("⏸ Paused");
  }
  setVolume(v) {
    console.log(`🔊 Volume: ${v}`);
  }
}

class Car {
  // Car HAS-A engine, HAS-A gps, HAS-A audio — composition
  #engine = new Engine();
  #gps = new GPS();
  #audio = new AudioSystem();
  #speed = 0;

  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  // Car's own interface — delegates to composed objects
  start() {
    this.#engine.start();
  }
  stop() {
    this.#engine.stop();
  }
  navigate(destination) {
    this.#gps.navigate(destination);
  }
  playMusic(song) {
    this.#audio.play(song);
  }

  drive(destination, song) {
    this.start();
    this.navigate(destination);
    this.playMusic(song);
    console.log(`🚗 ${this.make} ${this.model} is rolling!`);
  }
}

const tesla = new Car("Tesla", "Model 3");
tesla.drive("Airport", "Highway to Hell");
// 🔧 Engine started: Vroom!
// 📍 Navigating to: Airport
// 🎵 Playing: Highway to Hell
// 🚗 Tesla Model 3 is rolling!
```

---

### Mixins — When You Need Multiple Behaviors

JavaScript doesn't support multiple inheritance, but **mixins** let you compose behaviors from multiple sources:

```js
// Mixins are functions that take a Base class and return it with added behavior
const Serializable = (Base) =>
  class extends Base {
    serialize() {
      return JSON.stringify(this);
    }
    toJSON() {
      return { ...this };
    }
  };

const Timestamped = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    touch() {
      this.updatedAt = new Date();
      return this;
    }
  };

const Validatable = (Base) =>
  class extends Base {
    #errors = [];

    get isValid() {
      return this.#errors.length === 0;
    }
    get errors() {
      return [...this.#errors];
    }

    addError(field, message) {
      this.#errors.push({ field, message });
    }

    clearErrors() {
      this.#errors = [];
      return this;
    }

    validate() {
      this.clearErrors();
      this._runValidations?.(); // subclass hook
      return this.isValid;
    }
  };

// Base model with nothing
class BaseModel {}

// User gets ALL THREE behaviors composed together
class User extends Serializable(Timestamped(Validatable(BaseModel))) {
  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
  }

  _runValidations() {
    if (!this.name || this.name.length < 2)
      this.addError("name", "Must be at least 2 characters");
    if (!this.email.includes("@"))
      this.addError("email", "Must be a valid email");
  }

  save() {
    if (!this.validate()) {
      console.log("❌ Save failed:", this.errors);
      return false;
    }
    this.touch(); // update timestamp
    const json = this.serialize();
    console.log("✅ Saved:", json);
    return true;
  }
}

const alice = new User("Alice", "alice@example.com");
console.log(alice.createdAt); // Date object (from Timestamped)
alice.save(); // ✅ Saved: {"name":"Alice","email":"alice@example.com",...}

const bad = new User("X", "not-an-email");
bad.save();
// ❌ Save failed: [{ field: "name", ... }, { field: "email", ... }]
```

---

### Choosing the Right Tool

```
┌─────────────────────────────────────────────────────────┐
│             When should I use what?                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  IS-A relationship?          → Inheritance (extends)   │
│    Dog is an Animal ✅                                  │
│                                                         │
│  HAS-A relationship?         → Composition              │
│    Car has an Engine ✅       (store as property)       │
│                                                         │
│  Share behavior across       → Mixin                   │
│  unrelated classes?            (function returning class)│
│    User & Product both                                  │
│    need Serializable ✅                                 │
│                                                         │
│  Need only one instance?     → Singleton                │
│                                                         │
│  Inheritance > 3 levels?     → Rethink. Use composition │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### Interview Questions — Composition vs Inheritance

**Q: Why do developers say "prefer composition over inheritance"?**

> Inheritance creates tight coupling — changes to a parent class can silently break all child classes (the "fragile base class problem"). Composition is more flexible: you can swap out components, mix and match behaviors, and change implementations without affecting the rest of the system. Inheritance works well for IS-A relationships but is often misused for code reuse alone.

**Q: What is the fragile base class problem?**

> When a parent class changes its internal behavior, child classes that depend on that behavior break — even without any changes to the child classes. This is dangerous in deep hierarchies. Solution: keep hierarchies shallow, prefer composition, and don't override methods that child classes call via `super` unexpectedly.

**Q: What are mixins and what problem do they solve?**

> Mixins are a pattern for sharing behavior across classes without inheritance. Since JavaScript only supports single inheritance (`extends` one class), mixins let you "mix in" behaviors from multiple sources. They're implemented as functions that take a class and return a new class with added methods. Example: both `User` and `Product` can get `Serializable` behavior without sharing a parent class.

---

## 10. Interview Q&A Masterlist

### 🟢 Beginner Questions

---

**Q: What are the four pillars of OOP?**

> 1. **Encapsulation** — Bundle data + methods, hide internal state
> 2. **Abstraction** — Expose simple interfaces, hide complex implementation
> 3. **Inheritance** — Child classes reuse and extend parent class features
> 4. **Polymorphism** — Same interface, different behavior per class

---

**Q: What's the difference between `==` and `===` when comparing objects?**

> For objects, both `==` and `===` check **reference equality** — whether both variables point to the exact same object in memory. Two objects with identical properties are NOT equal unless they're the same reference. To compare object contents, you need to compare properties manually or use `JSON.stringify()` (for simple objects).
>
> ```js
> const a = { x: 1 };
> const b = { x: 1 };
> const c = a;
> console.log(a === b); // false — different objects in memory
> console.log(a === c); // true  — same reference
> ```

---

**Q: What is a constructor? What happens if you don't define one?**

> A constructor is a special method that runs when `new ClassName()` is called. It's where you initialize instance properties. If you don't define one, JavaScript provides a default: `constructor() {}`. In a subclass, the default constructor automatically calls `super()`.

---

**Q: What does `instanceof` check?**

> `instanceof` checks whether an object appears anywhere in the prototype chain of a class. `rex instanceof Animal` is true even if `rex` is a `Dog` that extends `Animal` — because `Animal.prototype` is in `rex`'s prototype chain.

---

**Q: Why is `this` undefined sometimes in a class method?**

> When you extract a method from a class and call it without the object, `this` loses its reference:
>
> ```js
> const greet = alice.greet; // extract method
> greet(); // `this` is undefined — no longer called as alice.greet()
> ```
>
> Fix with `.bind(alice)` or use an arrow class field instead.

---

### 🟡 Intermediate Questions

---

**Q: Can you explain method overriding with an example?**

> Method overriding is when a subclass provides its own implementation of a method defined in the parent. JavaScript looks up the prototype chain from the most specific class, so the child's version is found first:
>
> ```js
> class Shape {
>   area() {
>     return 0;
>   }
> }
> class Circle extends Shape {
>   area() {
>     return Math.PI * 5 ** 2;
>   }
> }
> class Square extends Shape {
>   area() {
>     return 10 ** 2;
>   }
> }
>
> const shapes = [new Circle(), new Square(), new Shape()];
> shapes.forEach((s) => console.log(s.area())); // 78.54, 100, 0
> ```

---

**Q: What is the difference between `Object.keys()`, `for...in`, and `Object.getOwnPropertyNames()`?**

> - `Object.keys()` — returns enumerable **own** property names (most common)
> - `for...in` — iterates enumerable **own + inherited** properties (use `hasOwnProperty` check)
> - `Object.getOwnPropertyNames()` — returns **all own** properties including non-enumerable ones (excludes Symbol keys)
>
> ```js
> class Animal {
>   eat() {}
> }
> class Dog extends Animal {}
> const rex = new Dog();
> rex.name = "Rex";
>
> console.log(Object.keys(rex)); // ["name"] — own enumerable
> // for...in would also include inherited enumerable (from prototype)
> ```

---

**Q: What are class fields vs constructor assignments?**

> They produce the same result but have different syntax and positioning. Class fields (`field = value`) are declared at the class level, making them visible without reading the constructor. Private fields (`#field`) MUST be declared as class fields. Both create instance properties — they don't go on the prototype.
>
> ```js
> class Dog {
>   name = "unnamed"; // class field (initialized to default)
>   #breed; // private field — must be here
>   constructor(name, breed) {
>     this.name = name; // overwrites the class field
>     this.#breed = breed;
>   }
> }
> ```

---

**Q: Explain the difference between shallow copy and deep copy.**

> A **shallow copy** copies the top-level properties. Nested objects are still shared by reference — modifying them in the copy also modifies the original.
> A **deep copy** recursively copies all nested objects — completely independent.
>
> ```js
> const original = { name: "Alice", address: { city: "NYC" } };
> const shallow = { ...original };
> const deep = structuredClone(original); // ES2022
>
> shallow.address.city = "LA";
> console.log(original.address.city); // "LA" — affected!
>
> deep.address.city = "Miami";
> console.log(original.address.city); // "LA" — unaffected ✅
> ```

---

**Q: What's the difference between an abstract class and an interface?**

> JavaScript has neither natively, but conceptually:
>
> - **Abstract class**: A partially implemented class that can't be instantiated. It provides concrete methods (with implementation) and abstract methods (just signatures, must be overridden). In JS, simulated with `new.target` check + throw in base methods.
> - **Interface**: A pure contract — defines method signatures with no implementation. In JS, this is enforced by convention only (throwing in unimplemented methods). TypeScript has actual `interface` support.

---

**Q: How would you implement private state without using `#` private fields (for older environments)?**

> Using closures in a factory function — the variable exists in the closure scope and is truly inaccessible from outside:
>
> ```js
> function createCounter(initial = 0) {
>   let count = initial; // truly private — in closure scope
>   return {
>     increment() {
>       count++;
>     },
>     decrement() {
>       count--;
>     },
>     get value() {
>       return count;
>     },
>   };
> }
> const c = createCounter(10);
> c.increment();
> console.log(c.value); // 11
> // c.count → undefined — no access
> ```

---

**Q: What is the Open/Closed Principle and how does OOP support it?**

> The OCP says: software entities should be **open for extension** but **closed for modification**. Add new behavior without changing existing code.
> OOP supports this through inheritance and polymorphism: add a new payment type by creating a new class, without touching the checkout system. Add a new export format by creating a new exporter class, without modifying existing exporters.

---

**Q: What is method chaining and what does it require?**

> Method chaining is calling multiple methods in sequence on the same object: `obj.setA(x).setB(y).doSomething()`. It requires each method to `return this` — so the next method has something to call on. Popularized by jQuery, used in query builders, configuration APIs, and builder patterns.

---

**Q: How does JavaScript handle the diamond problem?**

> The "diamond problem" occurs in multiple inheritance when two parent classes share a common ancestor. JavaScript avoids this by **only supporting single inheritance** — a class can only `extend` one other class. For multiple behaviors, use mixins (functions that accept a base class and return an extended class). Since they're applied in sequence, method resolution is always linear, no ambiguity.

---

## 11. Cheat Sheet & Common Pitfalls

### Class Syntax Quick Reference

```js
class MyClass extends ParentClass {
  // ── Fields ─────────────────────────────────────────
  publicField = "default value";
  #privateField = "only inside this class";
  static sharedProp = "on the class itself";

  // ── Constructor ────────────────────────────────────
  constructor(arg) {
    super(arg); // must be first in a subclass
    this.prop = arg;
  }

  // ── Instance Methods ───────────────────────────────
  publicMethod() {
    return this.prop;
  }
  #privateMethod() {
    return this.#privateField;
  }

  // ── Getters & Setters ──────────────────────────────
  get computed() {
    return this.prop.toUpperCase();
  }
  set computed(v) {
    this.prop = v.toLowerCase();
  }

  // ── Static ─────────────────────────────────────────
  static create(arg) {
    return new MyClass(arg);
  }

  // ── Overrides ──────────────────────────────────────
  toString() {
    return `MyClass(${this.prop})`;
  }
  toJSON() {
    return { prop: this.prop };
  }
}

// Creating instances
const obj = new MyClass("hello");
const obj2 = MyClass.create("world"); // static factory

// Type checking
console.log(obj instanceof MyClass); // true
console.log(obj instanceof ParentClass); // true
console.log(obj.constructor.name); // "MyClass"
```

---

### The 4 Pillars — One-Line Code Reference

```js
// ENCAPSULATION — control access
class Vault {
  #pin;
  #balance = 0;
  constructor(pin) {
    this.#pin = pin;
  }
  get balance() {
    return this.#balance;
  } // read-only
  deposit(n, pin) {
    if (pin === this.#pin) this.#balance += n;
  } // guarded write
}

// ABSTRACTION — simple interface, hidden complexity
class EmailSender {
  send(to, subject, body) {
    this.#connect();
    this.#auth();
    this.#transmit(to, subject, body);
  }
  #connect() {
    /* SMTP setup   */
  }
  #auth() {
    /* Auth flow    */
  }
  #transmit() {
    /* Send email   */
  }
}

// INHERITANCE — reuse and extend
class Animal {
  eat() {
    return "nom";
  }
}
class Dog extends Animal {
  bark() {
    return "woof!";
  }
}
const rex = new Dog();
console.log(rex.eat(), rex.bark()); // "nom", "woof!"

// POLYMORPHISM — same interface, different behavior
class Shape {
  area() {
    throw new Error("Abstract");
  }
}
class Circle extends Shape {
  area() {
    return Math.PI * 5 ** 2;
  }
}
class Square extends Shape {
  area() {
    return 10 ** 2;
  }
}
[new Circle(), new Square()].forEach((s) => console.log(s.area())); // 78.54, 100
```

---

### Common Pitfalls

```js
// ❌ PITFALL 1: Forgetting super() in subclass constructor
class Dog extends Animal {
  constructor(name) {
    // super(name); ← forgot! → ReferenceError: Must call super constructor
    this.name = name; // can't access `this` before super()
  }
}

// ❌ PITFALL 2: Returning non-this from a method you want to chain
class Builder {
  setA() {
    /* does stuff */
  } // returns undefined → chain breaks
  setA() {
    /* ... */ return this;
  } // returns this → chain works ✅
}

// ❌ PITFALL 3: Using `this` in a static method
class MyClass {
  #value = 42;
  static getVal() {
    return this.#value;
  } // ❌ `this` in static = the class itself
  static getVal() {
    return new MyClass().#value;
  } // if you really need it
}

// ❌ PITFALL 4: Mutating objects passed as arguments
class Processor {
  process(config) {
    config.processed = true; // ❌ mutates caller's object!
    const copy = { ...config, processed: true }; // ✅ work on a copy
  }
}

// ❌ PITFALL 5: Exposing references to private arrays
class Bag {
  #items = [];
  getItems() {
    return this.#items;
  } // ❌ caller can push/pop!
  getItems() {
    return [...this.#items];
  } // ✅ return a copy

  // Or use Object.freeze():
  getItems() {
    return Object.freeze([...this.#items]);
  } // ✅ immutable copy
}

// ❌ PITFALL 6: Arrow functions as methods (memory waste)
class Widget {
  // Each instance gets its OWN copy of this function — bad for 1000s of instances
  handleClick = () => {
    console.log("clicked");
  };

  // This is on the prototype — shared by all instances ✅
  handleClickProto() {
    console.log("clicked");
  }
}

// ❌ PITFALL 7: instanceof across different realms (iframes, etc.)
// An array from an iframe: [] instanceof Array → false!
// Use Array.isArray([]) instead — works across realms
```

---

### Quick Decision Guide

```
I need to model a "thing" with data + behavior
  → Use a Class

I need many independent copies of that thing
  → new ClassName() for each

Thing A IS A type of Thing B
  → class A extends B (inheritance)

Thing A HAS A Thing B
  → Composition: this.b = new B() inside class A

I need to share behavior across unrelated classes
  → Mixin: const Mixin = (Base) => class extends Base { ... }

I need to protect internal state
  → #privateFields + getters/setters

I need a simple interface over complex code
  → Abstraction: expose few public methods, hide the rest as #private

Same method name, different behavior per class
  → Polymorphism: override the method in each subclass

I want to chain methods
  → Return `this` from each method
```

---

### SOLID Principles — One-Line Summary

| Principle                 | Meaning                                      | Violation Sign                                  |
| ------------------------- | -------------------------------------------- | ----------------------------------------------- |
| **S**ingle Responsibility | One class, one job                           | "And" in your class description                 |
| **O**pen/Closed           | Extend with new classes, don't edit old ones | Editing existing code for every new feature     |
| **L**iskov Substitution   | Subclass must work where parent does         | Subclass throws errors for parent methods       |
| **I**nterface Segregation | Don't force methods that aren't needed       | Classes with `throw new Error("Not supported")` |
| **D**ependency Inversion  | Depend on abstractions, not concretions      | `new ConcreteClass()` hardcoded inside methods  |

---

> ## 🎉 You've completed Beginner → Intermediate OOP in JavaScript!
>
> **What you now know:**
>
> - What OOP is and why it exists
> - Objects, classes, constructors, getters/setters
> - All 4 pillars: Encapsulation, Abstraction, Inheritance, Polymorphism
> - How the prototype chain works
> - How `this` behaves (and misbehaves)
> - Composition vs Inheritance
> - Common patterns and pitfalls
>
> **Next steps to go Advanced:**
>
> - Design Patterns (Singleton, Observer, Strategy, Builder, Factory)
> - SOLID Principles in depth
> - Dependency Injection
> - Proxy & Reflect for meta-programming
> - TypeScript for static typing and real `abstract` support
>
> _The best way to cement this: build something real. Try a Task Manager, a simple Game, or a REST API layer using only OOP concepts._

---

_JavaScript ES2022+ | All examples run in Node.js 18+ or any modern browser_
