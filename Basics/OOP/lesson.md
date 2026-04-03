# 🧠 Object-Oriented Programming Mastery in JavaScript

### From Zero to Real-World Architect

> **Who this is for:** Complete beginners to intermediate developers who want to write clean, scalable, maintainable JavaScript using OOP principles and battle-tested design patterns.

---

## 📚 Table of Contents

1. [What is OOP? (And Why Should You Care?)](#what-is-oop)
2. [Classes & Objects — The Building Blocks](#classes--objects)
3. [The Four Pillars of OOP](#the-four-pillars)
   - [Encapsulation](#encapsulation)
   - [Abstraction](#abstraction)
   - [Inheritance](#inheritance)
   - [Polymorphism](#polymorphism)
4. [Getters, Setters & Private Fields](#getters-setters--private-fields)
5. [Static Methods & Properties](#static-methods--properties)
6. [Mixins — Multiple Inheritance Workaround](#mixins)
7. [Real-World Project: E-Commerce System](#real-world-project-e-commerce-system)
8. [Design Patterns for Beginners](#design-patterns-for-beginners)
   - [Singleton Pattern](#1-singleton-pattern)
   - [Factory Pattern](#2-factory-pattern)
   - [Observer Pattern](#3-observer-pattern)
   - [Strategy Pattern](#4-strategy-pattern)
   - [Builder Pattern](#5-builder-pattern)
   - [Decorator Pattern](#6-decorator-pattern)
   - [Module Pattern](#7-module-pattern)
9. [When to Use OOP vs Functional](#when-to-use-oop-vs-functional)
10. [Cheat Sheet & Quick Reference](#cheat-sheet--quick-reference)

---

## What is OOP?

**Object-Oriented Programming (OOP)** is a way of writing code by organizing it around **objects** — bundles of data (properties) and behavior (methods) — instead of writing a long list of instructions.

Think of it like this:

> 🏦 A **Bank** has accounts. Each **Account** has an owner, a balance, and can deposit/withdraw money. You don't care _how_ the bank stores the money internally — you just use the account.

That's OOP in a nutshell: **model the real world as objects that talk to each other.**

### Why OOP Matters

| Without OOP                | With OOP                        |
| -------------------------- | ------------------------------- |
| Logic scattered everywhere | Logic grouped inside objects    |
| Hard to reuse code         | Inheritance & composition       |
| Bugs affect whole program  | Encapsulation limits damage     |
| Hard to scale              | Easy to extend with new classes |

---

## Classes & Objects

A **class** is a blueprint. An **object** is a real thing built from that blueprint.

### Real-World Analogy: Car Factory 🚗

```js
// The blueprint (class)
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.speed = 0;
  }

  accelerate(amount) {
    this.speed += amount;
    console.log(`${this.make} ${this.model} is going ${this.speed} km/h`);
  }

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount);
    console.log(`Slowed down to ${this.speed} km/h`);
  }

  getInfo() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

// Creating objects (instances) from the blueprint
const myCar = new Car("Toyota", "Corolla", 2022);
const yourCar = new Car("Honda", "Civic", 2023);

myCar.accelerate(60); // Toyota Corolla is going 60 km/h
myCar.brake(20); // Slowed down to 40 km/h
console.log(yourCar.getInfo()); // 2023 Honda Civic
```

**Key Terms:**

- `class` — the blueprint/template
- `constructor()` — runs automatically when you create a new object; sets up initial data
- `this` — refers to the current object instance
- `new Car(...)` — creates a new instance of the Car class

---

## The Four Pillars

### Encapsulation

> **Wrap data and the code that works on it together. Hide the messy internals.**

**Real-World Scenario: Bank Account 🏦**

Without encapsulation, anyone can directly mess with your balance:

```js
// ❌ Bad — no encapsulation
const account = {
  balance: 1000,
};
account.balance = -99999; // Anyone can set it to anything!
```

With encapsulation, you control access:

```js
// ✅ Good — encapsulated Bank Account
class BankAccount {
  #balance; // private field (ES2022+)
  #owner;

  constructor(owner, initialDeposit) {
    this.#owner = owner;
    this.#balance = initialDeposit;
    this.#transactionHistory = [];
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.#balance += amount;
    this.#logTransaction("deposit", amount);
    return this;
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    this.#logTransaction("withdrawal", amount);
    return this;
  }

  getBalance() {
    return this.#balance;
  }

  getStatement() {
    return {
      owner: this.#owner,
      balance: this.#balance,
      history: [...this.#transactionHistory],
    };
  }

  // Private helper — internal use only
  #logTransaction(type, amount) {
    this.#transactionHistory.push({
      type,
      amount,
      date: new Date().toISOString(),
    });
  }
}

const account = new BankAccount("Ali Hassan", 5000);
account.deposit(2000).withdraw(500); // method chaining!
console.log(account.getBalance()); // 6500
// account.#balance = 99999; // ❌ SyntaxError — can't access private field
```

**Why this matters:** Users of `BankAccount` can't accidentally corrupt the balance. The internal logic (transaction history, validation) is hidden.

---

### Abstraction

> **Show only what's necessary. Hide the complexity.**

**Real-World Scenario: Coffee Machine ☕**

You press a button — you don't care about water temperature, pressure, or grind time:

```js
class CoffeeMachine {
  constructor(brand) {
    this.brand = brand;
    this.waterLevel = 100; // percentage
    this.beanLevel = 100;
  }

  // Public interface — simple to use
  makeCoffee(type = "espresso") {
    this.#checkResources();
    this.#heatWater();
    this.#grindBeans();
    this.#brew(type);
    return `☕ Your ${type} is ready!`;
  }

  refillWater() {
    this.waterLevel = 100;
    console.log("Water refilled!");
  }

  // Private — complex internal logic hidden from user
  #checkResources() {
    if (this.waterLevel < 10) throw new Error("Water level too low!");
    if (this.beanLevel < 10) throw new Error("Out of beans!");
  }

  #heatWater() {
    // Complex heating logic hidden
    this.waterLevel -= 10;
  }

  #grindBeans() {
    // Complex grinding logic hidden
    this.beanLevel -= 15;
  }

  #brew(type) {
    const time = type === "espresso" ? 25 : 45;
    // Simulate brewing process
    console.log(`Brewing ${type} for ${time} seconds...`);
  }
}

const machine = new CoffeeMachine("Nespresso");
console.log(machine.makeCoffee("latte")); // ☕ Your latte is ready!
// No need to know about heating, grinding, brewing internals
```

---

### Inheritance

> **A child class inherits properties and methods from a parent class. Reuse and extend.**

**Real-World Scenario: Vehicle Fleet 🚗🚌🏍️**

```js
// Parent class — shared by all vehicles
class Vehicle {
  constructor(make, model, year, fuelType) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.fuelType = fuelType;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    console.log(`${this.make} ${this.model} engine started. 🟢`);
  }

  stop() {
    this.isRunning = false;
    console.log(`${this.make} ${this.model} engine stopped. 🔴`);
  }

  getFuelType() {
    return this.fuelType;
  }

  toString() {
    return `${this.year} ${this.make} ${this.model} (${this.fuelType})`;
  }
}

// Child class — inherits from Vehicle, adds car-specific features
class Car extends Vehicle {
  constructor(make, model, year, fuelType, numDoors) {
    super(make, model, year, fuelType); // call parent constructor
    this.numDoors = numDoors;
    this.gear = 1;
  }

  changeGear(gear) {
    if (!this.isRunning) return console.log("Start the car first!");
    this.gear = gear;
    console.log(`Shifted to gear ${gear}`);
  }

  toString() {
    return `${super.toString()} — ${this.numDoors}-door car`;
  }
}

// Child class — inherits from Vehicle, adds truck-specific features
class Truck extends Vehicle {
  constructor(make, model, year, fuelType, payloadTons) {
    super(make, model, year, fuelType);
    this.payloadTons = payloadTons;
    this.cargoLoaded = 0;
  }

  loadCargo(tons) {
    if (tons > this.payloadTons) {
      throw new Error(`Overloaded! Max payload: ${this.payloadTons} tons`);
    }
    this.cargoLoaded = tons;
    console.log(`Loaded ${tons} tons of cargo.`);
  }

  toString() {
    return `${super.toString()} — Truck (${this.payloadTons}t payload)`;
  }
}

// Child class — electric vehicle with extra battery features
class ElectricCar extends Car {
  constructor(make, model, year, numDoors, batteryKwh) {
    super(make, model, year, "Electric", numDoors);
    this.batteryKwh = batteryKwh;
    this.chargePercent = 80;
  }

  charge() {
    this.chargePercent = 100;
    console.log(`${this.make} ${this.model} fully charged! ⚡`);
  }

  estimateRange() {
    const kmPerKwh = 6;
    return Math.round((this.chargePercent / 100) * this.batteryKwh * kmPerKwh);
  }
}

const sedan = new Car("Toyota", "Camry", 2023, "Petrol", 4);
const bigTruck = new Truck("Ford", "F-250", 2022, "Diesel", 2);
const tesla = new ElectricCar("Tesla", "Model 3", 2024, 4, 75);

sedan.start();
sedan.changeGear(3);
console.log(sedan.toString());
// 2023 Toyota Camry (Petrol) — 4-door car

bigTruck.loadCargo(1.5);
console.log(bigTruck.toString());
// 2022 Ford F-250 (Diesel) — Truck (2t payload)

tesla.charge();
console.log(`Tesla range: ${tesla.estimateRange()} km`); // Tesla range: 450 km
console.log(tesla.toString());
// 2024 Tesla Model 3 (Electric) — 4-door car
```

**Key rule:** Use `super()` to call the parent constructor. Use `extends` to inherit.

---

### Polymorphism

> **The same method name, different behavior depending on the object. "Many forms."**

**Real-World Scenario: Payment System 💳**

```js
class Payment {
  constructor(amount, currency = "USD") {
    this.amount = amount;
    this.currency = currency;
  }

  // Each payment type overrides this differently
  process() {
    throw new Error("process() must be implemented by subclass");
  }

  validate() {
    return this.amount > 0;
  }

  getReceipt() {
    return `Payment of ${this.currency} ${this.amount.toFixed(2)}`;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, cardNumber, cvv) {
    super(amount);
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  process() {
    // Credit card specific logic
    const masked = "*".repeat(12) + this.cardNumber.slice(-4);
    console.log(`💳 Processing credit card payment of $${this.amount}`);
    console.log(`   Card: ${masked}`);
    return {
      success: true,
      method: "credit_card",
      transactionId: this.#generateTxId(),
    };
  }

  #generateTxId() {
    return "CC-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}

class PayPalPayment extends Payment {
  constructor(amount, email) {
    super(amount);
    this.email = email;
  }

  process() {
    console.log(`🔵 Processing PayPal payment of $${this.amount}`);
    console.log(`   Account: ${this.email}`);
    return {
      success: true,
      method: "paypal",
      transactionId: "PP-" + Date.now(),
    };
  }
}

class CryptoPayment extends Payment {
  constructor(amount, walletAddress, coin = "BTC") {
    super(amount, coin);
    this.walletAddress = walletAddress;
    this.coin = coin;
  }

  process() {
    console.log(
      `₿ Processing ${this.coin} payment of ${this.amount} ${this.coin}`,
    );
    console.log(`   Wallet: ${this.walletAddress.slice(0, 8)}...`);
    return { success: true, method: "crypto", coin: this.coin };
  }

  validate() {
    return super.validate() && this.walletAddress.length > 20;
  }
}

// 🔑 Polymorphism in action — same function, works for all types!
function processCheckout(payments) {
  return payments.map((payment) => {
    if (!payment.validate()) {
      return { success: false, error: "Validation failed" };
    }
    const result = payment.process(); // Same call — different behavior!
    console.log(`   Receipt: ${payment.getReceipt()}\n`);
    return result;
  });
}

const cart = [
  new CreditCardPayment(150.0, "4111111111111234", "123"),
  new PayPalPayment(75.5, "user@example.com"),
  new CryptoPayment(0.002, "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"),
];

const results = processCheckout(cart);
console.log("\nAll transactions:", results);
```

---

## Getters, Setters & Private Fields

Getters and setters let you control how properties are read and written — like a smart property.

**Real-World Scenario: User Profile 👤**

```js
class UserProfile {
  #firstName;
  #lastName;
  #email;
  #age;
  #passwordHash;

  constructor(firstName, lastName, email, age) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.email = email; // uses setter for validation
    this.age = age; // uses setter for validation
  }

  // Getter — computed property
  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  // Setter — update name
  set fullName(name) {
    const parts = name.trim().split(" ");
    if (parts.length < 2) throw new Error("Please provide first and last name");
    this.#firstName = parts[0];
    this.#lastName = parts.slice(1).join(" ");
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) throw new Error("Invalid email address");
    this.#email = value.toLowerCase();
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (typeof value !== "number" || value < 0 || value > 150) {
      throw new Error("Age must be a number between 0 and 150");
    }
    this.#age = value;
  }

  get isAdult() {
    return this.#age >= 18;
  }

  // Write-only: set password but never read it back
  set password(plainText) {
    if (plainText.length < 8) throw new Error("Password must be 8+ characters");
    this.#passwordHash = this.#hashPassword(plainText);
  }

  checkPassword(plainText) {
    return this.#hashPassword(plainText) === this.#passwordHash;
  }

  #hashPassword(text) {
    // Simple demo hash — use bcrypt in production!
    return btoa(text + "salt_secret");
  }
}

const user = new UserProfile("Ahmed", "Khan", "Ahmed@Example.COM", 25);

console.log(user.fullName); // Ahmed Khan
console.log(user.email); // ahmed@example.com (auto-lowercase)
console.log(user.isAdult); // true

user.fullName = "Ali Hassan";
console.log(user.fullName); // Ali Hassan

user.password = "MySecurePass123";
console.log(user.checkPassword("MySecurePass123")); // true
// console.log(user.#passwordHash); // ❌ Error — private field
```

---

## Static Methods & Properties

Static members belong to the **class itself**, not to instances.

**Real-World Scenario: Math Utilities & App Config 🔧**

```js
class MathUtils {
  // Static property
  static PI = 3.14159265358979;
  static #callCount = 0;

  static circleArea(radius) {
    MathUtils.#callCount++;
    return MathUtils.PI * radius ** 2;
  }

  static circlePerimeter(radius) {
    MathUtils.#callCount++;
    return 2 * MathUtils.PI * radius;
  }

  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  static randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getUsageCount() {
    return MathUtils.#callCount;
  }
}

// No need to create an instance — just use the class directly
console.log(MathUtils.circleArea(5)); // 78.539...
console.log(MathUtils.circlePerimeter(5)); // 31.415...
console.log(MathUtils.clamp(150, 0, 100)); // 100
console.log(MathUtils.getUsageCount()); // 2

// Real-world: factory method pattern
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.id = User.#generateId();
    this.createdAt = new Date();
  }

  static #generateId() {
    return "USR-" + Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  // Static factory methods
  static createAdmin(name) {
    return new User(name, "admin");
  }

  static createGuest() {
    return new User("Guest", "guest");
  }
}

const admin = User.createAdmin("Fatima");
const guest = User.createGuest();

console.log(admin); // User { name: 'Fatima', role: 'admin', id: 'USR-...', ... }
console.log(guest); // User { name: 'Guest', role: 'guest', id: 'USR-...', ... }
```

---

## Mixins

JavaScript only supports single inheritance (one parent class). **Mixins** let you share behavior across unrelated classes.

**Real-World Scenario: Serializable + Timestamped + Validatable Objects 📦**

```js
// Mixin: adds JSON serialization
const Serializable = (Base) =>
  class extends Base {
    serialize() {
      return JSON.stringify(this);
    }

    static deserialize(json) {
      return Object.assign(new this(), JSON.parse(json));
    }
  };

// Mixin: adds timestamps
const Timestamped = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.createdAt = new Date().toISOString();
      this.updatedAt = new Date().toISOString();
    }

    touch() {
      this.updatedAt = new Date().toISOString();
      return this;
    }
  };

// Mixin: adds validation
const Validatable = (Base) =>
  class extends Base {
    validate() {
      const errors = [];
      for (const [field, rule] of Object.entries(this.validationRules || {})) {
        if (!rule(this[field])) {
          errors.push(`Invalid ${field}`);
        }
      }
      return { valid: errors.length === 0, errors };
    }
  };

// Base class
class Entity {
  constructor(id) {
    this.id = id;
  }
}

// Apply multiple mixins
class Product extends Serializable(Timestamped(Validatable(Entity))) {
  constructor(id, name, price, stock) {
    super(id);
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.validationRules = {
      name: (v) => typeof v === "string" && v.length > 0,
      price: (v) => typeof v === "number" && v > 0,
      stock: (v) => Number.isInteger(v) && v >= 0,
    };
  }
}

const laptop = new Product("P001", "MacBook Pro", 2499.99, 10);

console.log(laptop.validate()); // { valid: true, errors: [] }
console.log(laptop.createdAt); // ISO timestamp
console.log(laptop.serialize()); // JSON string

laptop.price = -100;
console.log(laptop.validate()); // { valid: false, errors: ['Invalid price'] }
```

---

## Real-World Project: E-Commerce System

Let's combine everything into a realistic mini e-commerce system:

```js
// ─── Product Catalog ───────────────────────────────────────────────
class Product {
  #id;
  #price;
  #stock;

  constructor(id, name, price, stock, category) {
    this.#id = id;
    this.name = name;
    this.#price = price;
    this.#stock = stock;
    this.category = category;
  }

  get id() {
    return this.#id;
  }
  get price() {
    return this.#price;
  }
  get stock() {
    return this.#stock;
  }
  get inStock() {
    return this.#stock > 0;
  }

  set price(value) {
    if (value < 0) throw new Error("Price cannot be negative");
    this.#price = value;
  }

  reduceStock(quantity) {
    if (quantity > this.#stock) throw new Error(`Only ${this.#stock} in stock`);
    this.#stock -= quantity;
  }

  toString() {
    return `[${this.#id}] ${this.name} - $${this.#price.toFixed(2)} (${this.#stock} in stock)`;
  }
}

class DigitalProduct extends Product {
  constructor(id, name, price, downloadUrl) {
    super(id, name, price, Infinity, "digital"); // never runs out of stock
    this.downloadUrl = downloadUrl;
  }

  reduceStock() {
    // Digital products don't decrease in stock
  }

  get inStock() {
    return true;
  }
}

// ─── Shopping Cart ──────────────────────────────────────────────────
class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  get subtotal() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  #items = new Map();
  #discountCode = null;
  #discountPercent = 0;

  addItem(product, quantity = 1) {
    if (!product.inStock) throw new Error(`${product.name} is out of stock`);

    if (this.#items.has(product.id)) {
      this.#items.get(product.id).quantity += quantity;
    } else {
      this.#items.set(product.id, new CartItem(product, quantity));
    }

    console.log(`✅ Added ${quantity}x ${product.name} to cart`);
    return this;
  }

  removeItem(productId) {
    if (!this.#items.has(productId)) throw new Error("Item not in cart");
    const item = this.#items.get(productId);
    console.log(`🗑️ Removed ${item.product.name} from cart`);
    this.#items.delete(productId);
    return this;
  }

  applyDiscount(code, percent) {
    this.#discountCode = code;
    this.#discountPercent = percent;
    console.log(`🎟️ Discount applied: ${percent}% off`);
    return this;
  }

  get subtotal() {
    let total = 0;
    for (const item of this.#items.values()) {
      total += item.subtotal;
    }
    return total;
  }

  get discount() {
    return this.subtotal * (this.#discountPercent / 100);
  }

  get total() {
    return this.subtotal - this.discount;
  }

  get itemCount() {
    let count = 0;
    for (const item of this.#items.values()) {
      count += item.quantity;
    }
    return count;
  }

  getSummary() {
    console.log("\n🛒 Cart Summary");
    console.log("─".repeat(40));
    for (const item of this.#items.values()) {
      console.log(
        `  ${item.product.name} x${item.quantity} = $${item.subtotal.toFixed(2)}`,
      );
    }
    console.log("─".repeat(40));
    console.log(`  Subtotal: $${this.subtotal.toFixed(2)}`);
    if (this.#discountCode) {
      console.log(
        `  Discount (${this.#discountCode}): -$${this.discount.toFixed(2)}`,
      );
    }
    console.log(`  Total: $${this.total.toFixed(2)}`);
    console.log(`  Items: ${this.itemCount}`);
    return this;
  }
}

// ─── Order System ───────────────────────────────────────────────────
class Order {
  static #orderCounter = 1000;

  constructor(cart, customer, paymentMethod) {
    this.orderId = `ORD-${++Order.#orderCounter}`;
    this.customer = customer;
    this.total = cart.total;
    this.paymentMethod = paymentMethod;
    this.status = "pending";
    this.createdAt = new Date();
    this.items = Array.from(cart["_ShoppingCart__items"]?.values() || []);
  }

  fulfill() {
    this.status = "fulfilled";
    console.log(`📦 Order ${this.orderId} fulfilled!`);
    return this;
  }

  cancel() {
    if (this.status === "fulfilled")
      throw new Error("Cannot cancel fulfilled order");
    this.status = "cancelled";
    console.log(`❌ Order ${this.orderId} cancelled.`);
    return this;
  }
}

// ─── Usage ──────────────────────────────────────────────────────────
const laptop = new Product("P001", "Laptop Pro 15", 1299.99, 5, "electronics");
const mouse = new Product("P002", "Wireless Mouse", 49.99, 20, "accessories");
const course = new DigitalProduct(
  "D001",
  "JS Mastery Course",
  99.0,
  "https://cdn.example.com/course",
);

const cart = new ShoppingCart();

cart
  .addItem(laptop, 1)
  .addItem(mouse, 2)
  .addItem(course, 1)
  .applyDiscount("SAVE20", 20);

cart.getSummary();
// 🛒 Cart Summary
// ──────────────────────────────────────────
//   Laptop Pro 15 x1 = $1299.99
//   Wireless Mouse x2 = $99.98
//   JS Mastery Course x1 = $99.00
// ──────────────────────────────────────────
//   Subtotal: $1498.97
//   Discount (SAVE20): -$299.79
//   Total: $1199.18
```

---

## Design Patterns for Beginners

Design patterns are **reusable solutions to common problems**. Think of them as proven recipes for common coding situations.

> 💡 You don't need to memorize all 23 GoF patterns. Learn these 7 — they cover 90% of real-world use cases.

---

### 1. Singleton Pattern

> **Ensure only one instance of a class exists — ever.**

**Use Cases:** App config, database connection, logger, theme manager.

```js
class AppConfig {
  static #instance = null;

  #settings = {
    theme: "light",
    language: "en",
    apiUrl: "https://api.example.com",
    debugMode: false,
  };

  constructor() {
    if (AppConfig.#instance) {
      return AppConfig.#instance; // return existing instance
    }
    AppConfig.#instance = this;
  }

  get(key) {
    return this.#settings[key];
  }

  set(key, value) {
    this.#settings[key] = value;
    console.log(`Config updated: ${key} = ${JSON.stringify(value)}`);
    return this;
  }

  static getInstance() {
    if (!AppConfig.#instance) {
      AppConfig.#instance = new AppConfig();
    }
    return AppConfig.#instance;
  }
}

// Both variables point to the SAME object
const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

config1.set("theme", "dark");
console.log(config2.get("theme")); // "dark" — they're the same object!
console.log(config1 === config2); // true

// Real-world: Logger Singleton
class Logger {
  static #instance = null;
  #logs = [];
  #level = "INFO";

  static getInstance() {
    if (!Logger.#instance) Logger.#instance = new Logger();
    return Logger.#instance;
  }

  log(message, level = "INFO") {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };
    this.#logs.push(entry);
    const emoji =
      { INFO: "ℹ️", WARN: "⚠️", ERROR: "❌", DEBUG: "🐛" }[level] || "📝";
    console.log(`${emoji} [${level}] ${message}`);
  }

  getHistory() {
    return [...this.#logs];
  }
}

const logger = Logger.getInstance();
logger.log("App started");
logger.log("User logged in", "INFO");
logger.log("Payment failed", "ERROR");

// Anywhere in your codebase
const sameLogger = Logger.getInstance();
console.log(sameLogger.getHistory().length); // 3 — same history!
```

---

### 2. Factory Pattern

> **Let a factory decide which class to instantiate. Hide the `new` keyword.**

**Use Cases:** Creating notifications, UI elements, database adapters, shape renderers.

```js
// Real-World: Notification System 🔔
class EmailNotification {
  constructor(recipient, subject, body) {
    this.type = "email";
    this.recipient = recipient;
    this.subject = subject;
    this.body = body;
  }

  send() {
    console.log(`📧 Email to ${this.recipient}: "${this.subject}"`);
    console.log(`   Body: ${this.body}`);
    return true;
  }
}

class SMSNotification {
  constructor(phoneNumber, message) {
    this.type = "sms";
    this.phoneNumber = phoneNumber;
    this.message = message.slice(0, 160); // SMS limit
  }

  send() {
    console.log(`📱 SMS to ${this.phoneNumber}: "${this.message}"`);
    return true;
  }
}

class PushNotification {
  constructor(deviceToken, title, message, data = {}) {
    this.type = "push";
    this.deviceToken = deviceToken;
    this.title = title;
    this.message = message;
    this.data = data;
  }

  send() {
    console.log(`🔔 Push to device ${this.deviceToken.slice(0, 8)}...`);
    console.log(`   Title: ${this.title} | Msg: ${this.message}`);
    return true;
  }
}

class SlackNotification {
  constructor(webhookUrl, channel, message) {
    this.type = "slack";
    this.webhookUrl = webhookUrl;
    this.channel = channel;
    this.message = message;
  }

  send() {
    console.log(`💬 Slack message to #${this.channel}: "${this.message}"`);
    return true;
  }
}

// 🏭 The Factory — one place to create all notification types
class NotificationFactory {
  static #creators = {
    email: (opts) =>
      new EmailNotification(opts.recipient, opts.subject, opts.body),
    sms: (opts) => new SMSNotification(opts.phone, opts.message),
    push: (opts) =>
      new PushNotification(opts.token, opts.title, opts.message, opts.data),
    slack: (opts) =>
      new SlackNotification(opts.webhook, opts.channel, opts.message),
  };

  static create(type, options) {
    const creator = this.#creators[type];
    if (!creator) throw new Error(`Unknown notification type: "${type}"`);
    return creator(options);
  }

  // Register new types dynamically
  static register(type, creatorFn) {
    this.#creators[type] = creatorFn;
    console.log(`Registered new notification type: ${type}`);
  }

  static getAvailableTypes() {
    return Object.keys(this.#creators);
  }
}

// Usage — caller doesn't need to know about specific classes
const notifications = [
  NotificationFactory.create("email", {
    recipient: "ali@example.com",
    subject: "Order Confirmed",
    body: "Your order #1234 has been placed!",
  }),
  NotificationFactory.create("sms", {
    phone: "+923001234567",
    message: "Your OTP is 485920",
  }),
  NotificationFactory.create("push", {
    token: "abc123xyz456def789",
    title: "Flash Sale!",
    message: "50% off for the next hour",
  }),
];

notifications.forEach((n) => n.send());

// Easily add a new type without changing existing code
NotificationFactory.register("discord", (opts) => ({
  type: "discord",
  send: () =>
    console.log(`🎮 Discord alert in #${opts.channel}: "${opts.message}"`),
}));
```

---

### 3. Observer Pattern

> **One object notifies many others when something changes. Event-driven programming.**

**Use Cases:** Event systems, real-time dashboards, pub/sub, UI data binding.

```js
// The core Observer infrastructure
class EventEmitter {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(callback);
    return () => this.off(event, callback); // returns unsubscribe function
  }

  off(event, callback) {
    this.#listeners.get(event)?.delete(callback);
  }

  emit(event, data) {
    this.#listeners.get(event)?.forEach((callback) => callback(data));
  }

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

// Real-World: Stock Price Monitor 📈
class StockMarket extends EventEmitter {
  #prices = {};
  #previousPrices = {};

  updatePrice(symbol, price) {
    this.#previousPrices[symbol] = this.#prices[symbol];
    this.#prices[symbol] = price;

    const change = price - (this.#previousPrices[symbol] || price);
    const changePercent = this.#previousPrices[symbol]
      ? ((change / this.#previousPrices[symbol]) * 100).toFixed(2)
      : 0;

    this.emit("priceUpdate", { symbol, price, change, changePercent });

    if (Math.abs(changePercent) >= 5) {
      this.emit("significantChange", { symbol, price, changePercent });
    }
  }

  getPrice(symbol) {
    return this.#prices[symbol];
  }
}

// Observer: Price Alert System
class PriceAlert {
  constructor(symbol, targetPrice, type = "above") {
    this.symbol = symbol;
    this.targetPrice = targetPrice;
    this.type = type;
    this.triggered = false;
  }

  check({ symbol, price }) {
    if (symbol !== this.symbol || this.triggered) return;

    const shouldTrigger =
      (this.type === "above" && price >= this.targetPrice) ||
      (this.type === "below" && price <= this.targetPrice);

    if (shouldTrigger) {
      console.log(
        `🚨 ALERT: ${symbol} hit $${price} (target: ${this.type} $${this.targetPrice})`,
      );
      this.triggered = true;
    }
  }
}

// Observer: Portfolio Tracker
class Portfolio {
  #holdings = {};
  #totalValue = 0;

  addHolding(symbol, shares, purchasePrice) {
    this.#holdings[symbol] = { shares, purchasePrice };
  }

  update({ symbol, price }) {
    if (this.#holdings[symbol]) {
      const holding = this.#holdings[symbol];
      const value = holding.shares * price;
      const gain = (price - holding.purchasePrice) * holding.shares;
      const gainPct = (
        ((price - holding.purchasePrice) / holding.purchasePrice) *
        100
      ).toFixed(2);
      const emoji = gain >= 0 ? "📈" : "📉";
      console.log(
        `${emoji} Portfolio: ${symbol} = $${value.toFixed(2)} (${gainPct}% P/L)`,
      );
    }
  }
}

// Wiring everything together
const market = new StockMarket();
const portfolio = new Portfolio();
const tslaAlert = new PriceAlert("TSLA", 250, "above");

portfolio.addHolding("TSLA", 10, 200);
portfolio.addHolding("AAPL", 5, 150);

// Subscribe to events
market.on("priceUpdate", (data) => {
  console.log(`📊 ${data.symbol}: $${data.price} (${data.changePercent}%)`);
});

market.on("priceUpdate", (data) => tslaAlert.check(data));
market.on("priceUpdate", (data) => portfolio.update(data));
market.on("significantChange", ({ symbol, changePercent }) => {
  console.log(`⚡ SIGNIFICANT MOVE: ${symbol} moved ${changePercent}%!`);
});

// Simulate market activity
market.updatePrice("TSLA", 210);
market.updatePrice("AAPL", 155);
market.updatePrice("TSLA", 255); // Triggers alert + significant change!
```

---

### 4. Strategy Pattern

> **Define a family of algorithms, put each in its own class, make them interchangeable.**

**Use Cases:** Sorting strategies, payment methods, compression algorithms, auth strategies.

```js
// Real-World: Shipping Cost Calculator 🚚
class FedExShipping {
  getName() {
    return "FedEx Express";
  }
  calculate(weightKg, distance) {
    const base = 15;
    const perKg = 2.5;
    const perKm = 0.01;
    return base + weightKg * perKg + distance * perKm;
  }
  getDeliveryDays() {
    return 1;
  }
}

class UPSShipping {
  getName() {
    return "UPS Standard";
  }
  calculate(weightKg, distance) {
    const base = 8;
    const perKg = 1.8;
    const perKm = 0.008;
    return base + weightKg * perKg + distance * perKm;
  }
  getDeliveryDays() {
    return 3;
  }
}

class LocalCourierShipping {
  getName() {
    return "Local Courier";
  }
  calculate(weightKg, distance) {
    if (distance > 50) throw new Error("Local courier only covers 50km radius");
    return 5 + weightKg * 1.2;
  }
  getDeliveryDays() {
    return 0;
  } // same day
}

class FreeShipping {
  getName() {
    return "Free Standard Shipping";
  }
  calculate() {
    return 0;
  }
  getDeliveryDays() {
    return 7;
  }
}

// Context class that uses a strategy
class Checkout {
  #shippingStrategy;
  #items = [];

  constructor(shippingStrategy) {
    this.#shippingStrategy = shippingStrategy;
  }

  setShippingStrategy(strategy) {
    this.#shippingStrategy = strategy;
    return this;
  }

  addItem(name, price, weightKg) {
    this.#items.push({ name, price, weightKg });
    return this;
  }

  get subtotal() {
    return this.#items.reduce((sum, item) => sum + item.price, 0);
  }

  get totalWeight() {
    return this.#items.reduce((sum, item) => sum + item.weightKg, 0);
  }

  calculateTotal(distanceKm) {
    const shipping = this.#shippingStrategy.calculate(
      this.totalWeight,
      distanceKm,
    );
    return {
      subtotal: this.subtotal,
      shipping: shipping.toFixed(2),
      total: (this.subtotal + shipping).toFixed(2),
      carrier: this.#shippingStrategy.getName(),
      deliveryDays: this.#shippingStrategy.getDeliveryDays(),
    };
  }
}

const checkout = new Checkout(new FedExShipping());
checkout.addItem("Laptop", 1299, 2.5).addItem("Mouse", 49, 0.2);

// Switch strategy at runtime
const strategies = [
  new FedExShipping(),
  new UPSShipping(),
  new LocalCourierShipping(),
];

console.log("💰 Shipping Options (distance: 30km):\n");
strategies.forEach((strategy) => {
  checkout.setShippingStrategy(strategy);
  const result = checkout.calculateTotal(30);
  console.log(`${result.carrier}:`);
  console.log(
    `  Shipping: $${result.shipping} | Total: $${result.total} | ETA: ${result.deliveryDays}d`,
  );
});

// Auto-apply free shipping over $500
if (checkout.subtotal >= 500) {
  checkout.setShippingStrategy(new FreeShipping());
  console.log("\n🎉 Order qualifies for FREE shipping!");
  console.log(checkout.calculateTotal(30));
}
```

---

### 5. Builder Pattern

> **Construct complex objects step by step. Separate construction from representation.**

**Use Cases:** Complex queries, HTML generation, configuration objects, test data factories.

```js
// Real-World: SQL Query Builder 🗃️
class QueryBuilder {
  #table = "";
  #conditions = [];
  #columns = ["*"];
  #orderBy = null;
  #limitValue = null;
  #offsetValue = 0;
  #joins = [];
  #groupBy = null;

  select(...columns) {
    this.#columns = columns.length > 0 ? columns : ["*"];
    return this;
  }

  from(table) {
    this.#table = table;
    return this;
  }

  where(condition) {
    this.#conditions.push(condition);
    return this;
  }

  join(table, on) {
    this.#joins.push(`JOIN ${table} ON ${on}`);
    return this;
  }

  leftJoin(table, on) {
    this.#joins.push(`LEFT JOIN ${table} ON ${on}`);
    return this;
  }

  orderBy(column, direction = "ASC") {
    this.#orderBy = `${column} ${direction}`;
    return this;
  }

  limit(n) {
    this.#limitValue = n;
    return this;
  }

  offset(n) {
    this.#offsetValue = n;
    return this;
  }

  groupBy(column) {
    this.#groupBy = column;
    return this;
  }

  build() {
    if (!this.#table) throw new Error("Table name is required");
    let query = `SELECT ${this.#columns.join(", ")} FROM ${this.#table}`;

    if (this.#joins.length) query += `\n  ${this.#joins.join("\n  ")}`;
    if (this.#conditions.length)
      query += `\n  WHERE ${this.#conditions.join(" AND ")}`;
    if (this.#groupBy) query += `\n  GROUP BY ${this.#groupBy}`;
    if (this.#orderBy) query += `\n  ORDER BY ${this.#orderBy}`;
    if (this.#limitValue !== null) query += `\n  LIMIT ${this.#limitValue}`;
    if (this.#offsetValue > 0) query += ` OFFSET ${this.#offsetValue}`;

    return query;
  }
}

const query = new QueryBuilder()
  .select("u.id", "u.name", "u.email", "COUNT(o.id) AS order_count")
  .from("users u")
  .leftJoin("orders o", "o.user_id = u.id")
  .where("u.active = true")
  .where("u.created_at > '2024-01-01'")
  .groupBy("u.id")
  .orderBy("order_count", "DESC")
  .limit(20)
  .offset(40)
  .build();

console.log(query);
/*
SELECT u.id, u.name, u.email, COUNT(o.id) AS order_count FROM users u
  LEFT JOIN orders o ON o.user_id = u.id
  WHERE u.active = true AND u.created_at > '2024-01-01'
  GROUP BY u.id
  ORDER BY order_count DESC
  LIMIT 20 OFFSET 40
*/
```

---

### 6. Decorator Pattern

> **Add new functionality to an object without modifying its class.**

**Use Cases:** Logging, caching, rate limiting, validation middleware, feature flags.

```js
// Real-World: API Service with Decorators 🌐
class ApiService {
  async fetchUser(id) {
    console.log(`Fetching user ${id} from API...`);
    // Simulate API call
    return { id, name: "Ahmed", email: "ahmed@example.com", role: "user" };
  }

  async fetchProducts(category) {
    console.log(`Fetching products in category: ${category}...`);
    return [
      { id: 1, name: "Laptop", price: 1299 },
      { id: 2, name: "Mouse", price: 49 },
    ];
  }
}

// Decorator: Adds in-memory caching
class CachedApiService {
  #service;
  #cache = new Map();
  #ttlMs;

  constructor(service, ttlSeconds = 60) {
    this.#service = service;
    this.#ttlMs = ttlSeconds * 1000;
  }

  async fetchUser(id) {
    const key = `user:${id}`;
    const cached = this.#cache.get(key);

    if (cached && Date.now() - cached.timestamp < this.#ttlMs) {
      console.log(`📦 Cache HIT for user ${id}`);
      return cached.data;
    }

    const data = await this.#service.fetchUser(id);
    this.#cache.set(key, { data, timestamp: Date.now() });
    console.log(`💾 Cached user ${id}`);
    return data;
  }

  async fetchProducts(category) {
    const key = `products:${category}`;
    const cached = this.#cache.get(key);

    if (cached && Date.now() - cached.timestamp < this.#ttlMs) {
      console.log(`📦 Cache HIT for products:${category}`);
      return cached.data;
    }

    const data = await this.#service.fetchProducts(category);
    this.#cache.set(key, { data, timestamp: Date.now() });
    return data;
  }
}

// Decorator: Adds performance logging
class LoggedApiService {
  #service;

  constructor(service) {
    this.#service = service;
  }

  async fetchUser(id) {
    const start = performance.now();
    try {
      const result = await this.#service.fetchUser(id);
      const ms = (performance.now() - start).toFixed(2);
      console.log(`⏱️ fetchUser(${id}) completed in ${ms}ms`);
      return result;
    } catch (err) {
      console.error(`❌ fetchUser(${id}) failed: ${err.message}`);
      throw err;
    }
  }

  async fetchProducts(category) {
    const start = performance.now();
    const result = await this.#service.fetchProducts(category);
    console.log(
      `⏱️ fetchProducts(${category}) completed in ${(performance.now() - start).toFixed(2)}ms`,
    );
    return result;
  }
}

// Stack decorators — order matters!
const api = new LoggedApiService(
  new CachedApiService(
    new ApiService(),
    30, // cache for 30 seconds
  ),
);

// First call — hits the real API
const user = await api.fetchUser(42);

// Second call — serves from cache!
const userAgain = await api.fetchUser(42);
```

---

### 7. Module Pattern

> **Group related code into a self-contained module. Expose only what's needed.**

**Use Cases:** Utility libraries, service modules, feature modules.

```js
// Real-World: Authentication Module 🔐
const AuthModule = (() => {
  // ─ Private state ─────────────────────────────────────
  const sessions = new Map();
  const failedAttempts = new Map();
  const MAX_ATTEMPTS = 5;
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  // ─ Private functions ──────────────────────────────────
  function generateToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
  }

  function isLockedOut(username) {
    const attempts = failedAttempts.get(username);
    if (!attempts) return false;
    return (
      attempts.count >= MAX_ATTEMPTS &&
      Date.now() - attempts.lastAttempt < 15 * 60 * 1000
    ); // 15 min lockout
  }

  function recordFailedAttempt(username) {
    const current = failedAttempts.get(username) || { count: 0 };
    failedAttempts.set(username, {
      count: current.count + 1,
      lastAttempt: Date.now(),
    });
  }

  // ─ Public API ─────────────────────────────────────────
  return {
    login(username, password) {
      if (isLockedOut(username)) {
        return {
          success: false,
          error: "Account temporarily locked. Try again in 15 minutes.",
        };
      }

      // Simulate password check (use bcrypt in production)
      const isValid = password === "secret123"; // demo only

      if (!isValid) {
        recordFailedAttempt(username);
        const attempts = failedAttempts.get(username)?.count || 1;
        return {
          success: false,
          error: `Invalid credentials (${MAX_ATTEMPTS - attempts} attempts remaining)`,
        };
      }

      const token = generateToken();
      sessions.set(token, {
        username,
        createdAt: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION,
      });

      failedAttempts.delete(username); // reset on success
      return { success: true, token };
    },

    validate(token) {
      const session = sessions.get(token);
      if (!session) return { valid: false, error: "Invalid token" };
      if (Date.now() > session.expiresAt) {
        sessions.delete(token);
        return { valid: false, error: "Session expired" };
      }
      return { valid: true, username: session.username };
    },

    logout(token) {
      sessions.delete(token);
      return { success: true };
    },

    getActiveSessions() {
      return sessions.size;
    },
  };
})();

// Usage
const loginResult = AuthModule.login("ali", "secret123");
console.log(loginResult); // { success: true, token: "..." }

const validation = AuthModule.validate(loginResult.token);
console.log(validation); // { valid: true, username: 'ali' }

console.log(AuthModule.getActiveSessions()); // 1

// Private state is completely hidden
// console.log(AuthModule.sessions); // undefined — not accessible
```

---

## When to Use OOP vs Functional

| Situation                     | Use OOP                   | Use Functional               |
| ----------------------------- | ------------------------- | ---------------------------- |
| Modeling real-world entities  | ✅ User, Order, Product   |                              |
| Complex shared state          | ✅ Cart, Session          |                              |
| Building reusable components  | ✅ UI components          |                              |
| Data transformation pipelines |                           | ✅ `map`, `filter`, `reduce` |
| Pure calculations             |                           | ✅ No side effects           |
| Event handling                | ✅ Observer, EventEmitter |                              |
| Configuration/setup logic     | ✅ Builder, Factory       |                              |

> 💡 **The best code uses both.** OOP for structure, functional for data processing inside methods.

---

## Cheat Sheet & Quick Reference

```js
// ─── CLASS ANATOMY ─────────────────────────────────────────────────
class Animal {
  // Static property
  static count = 0;

  // Private fields
  #name;
  #sound;

  constructor(name, sound) {
    this.#name = name;
    this.#sound = sound;
    Animal.count++;
  }

  // Getter
  get name() {
    return this.#name;
  }

  // Setter
  set name(value) {
    if (!value) throw new Error("Name required");
    this.#name = value;
  }

  // Instance method
  speak() {
    return `${this.#name} says ${this.#sound}!`;
  }

  // Static method
  static getCount() {
    return Animal.count;
  }

  // toString override
  toString() {
    return `Animal(${this.#name})`;
  }
}

// ─── INHERITANCE ───────────────────────────────────────────────────
class Dog extends Animal {
  constructor(name) {
    super(name, "Woof"); // must call super first!
    this.tricks = [];
  }

  learn(trick) {
    this.tricks.push(trick);
    return this;
  }

  // Override parent method
  speak() {
    return `${super.speak()} *wags tail*`;
  }
}

// ─── PATTERN QUICK REFERENCE ───────────────────────────────────────
/*
  Singleton  → only one instance ever (config, logger)
  Factory    → create objects without knowing exact class
  Observer   → subscribe/notify pattern (events, pub/sub)
  Strategy   → swap algorithms at runtime (sorting, shipping)
  Builder    → fluent interface for complex objects (queries)
  Decorator  → add behavior without modifying class (cache, log)
  Module     → encapsulate private state (IIFE or ES modules)
*/

// ─── THE 4 PILLARS IN ONE SENTENCE EACH ────────────────────────────
/*
  Encapsulation → Bundle data + behavior, hide internals (#private fields)
  Abstraction   → Show simple interface, hide complex logic
  Inheritance   → extends + super = reuse parent code
  Polymorphism  → Same method name, different behavior per class
*/
```

---

## 🚀 What to Learn Next

Once you're comfortable with these concepts, explore:

1. **SOLID Principles** — The 5 rules of good OOP design
2. **TypeScript** — Add types to make OOP even more powerful
3. **Advanced Patterns** — Command, Proxy, Composite, State
4. **Domain-Driven Design (DDD)** — OOP for large-scale apps
5. **Testing OOP Code** — Unit tests with Jest for classes

---
