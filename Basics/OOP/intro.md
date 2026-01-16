---
---

# 🧠 **OOP (Object-Oriented Programming) in JS**

> OOP is a way to structure code around **objects** — like real-world objects — instead of just functions or variables.

**Core idea:** Objects have **properties (data)** and **methods (functions/behavior)**.

---

# 🧠 **1. Object Basics**

```js
const car = {
  brand: "Toyota",
  color: "Red",
  start: function () {
    console.log(`${this.brand} is starting`);
  },
};

car.start(); // Toyota is starting
```

### Explanation

- `brand` & `color` → **properties**
- `start()` → **method**
- `this` → refers to **current object**

**Analogy:** Car object = real car

- Properties = color, brand
- Methods = start, stop

---

# 🧠 **2. Classes (ES6 Syntax)**

**Old JS:** Objects made manually → repetitive
**Classes:** Blueprints to create objects

```js
class Car {
  constructor(brand, color) {
    this.brand = brand;
    this.color = color;
  }

  start() {
    console.log(`${this.brand} is starting`);
  }
}

const car1 = new Car("Toyota", "Red");
const car2 = new Car("Honda", "Blue");

car1.start(); // Toyota is starting
car2.start(); // Honda is starting
```

### Explanation

- `constructor` → initializes object properties
- `new` → creates a new object from the class

**Analogy:** Class = blueprint of a car
Objects = actual cars built from blueprint

---

# 🧠 **3. Encapsulation (Private Properties/Methods)**

> Keep some data hidden to prevent direct modification

```js
class BankAccount {
  #balance; // private property

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
    console.log(`Deposited: ${amount}`);
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // ❌ Error
```

### Key

- `#` → private property/method
- Access via **getter/setter methods only**

**Analogy:** Balance is like money in a vault — you cannot access directly, only through bank actions.

---

# 🧠 **4. Inheritance**

> Child class **inherits properties/methods** from parent class

```js
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }
  start() {
    console.log(`${this.brand} is starting`);
  }
}

class Car extends Vehicle {
  constructor(brand, color) {
    super(brand); // call parent constructor
    this.color = color;
  }
  honk() {
    console.log(`${this.brand} is honking`);
  }
}

const car = new Car("Honda", "Blue");
car.start(); // Honda is starting
car.honk(); // Honda is honking
```

**Analogy:** Vehicle = general blueprint
Car = specific type of vehicle

---

# 🧠 **5. Polymorphism**

> Same method **behaves differently** for different objects

```js
class Animal {
  speak() {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow!");
  }
}

const animals = [new Dog(), new Cat()];
animals.forEach((animal) => animal.speak());
// Woof!
// Meow!
```

**Analogy:** `speak()` method exists in all animals, but each makes a **different sound**

---

# 🧠 **6. Static Methods**

> Belong to **class**, not objects

```js
class MathUtil {
  static square(x) {
    return x * x;
  }
}

console.log(MathUtil.square(5)); // 25
```

**Analogy:** Calculator (class) has a static `square()` — you don’t need a physical calculator object to use it.

---

# 🧠 **7. Getters & Setters**

> Special methods to **access or modify properties**

```js
class Person {
  constructor(name) {
    this._name = name; // convention: _name = private-ish
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (newName.length > 2) this._name = newName;
  }
}

const p = new Person("Ali");
console.log(p.name); // Ali
p.name = "Bo"; // ignored, too short
p.name = "Sohail"; // accepted
console.log(p.name); // Sohail
```

**Analogy:** A filter for entering your name — only valid names are allowed

---

# 🧠 **8. Object.create (Alternative to Class)**

```js
const vehicle = {
  start() {
    console.log(`${this.brand} is starting`);
  },
};

const car = Object.create(vehicle);
car.brand = "Toyota";
car.start(); // Toyota is starting
```

**Analogy:** Clone a prototype object → lightweight alternative to classes

---

# 🧠 **9. Summary of OOP Concepts**

| Concept       | JS Implementation | Analogy                        |
| ------------- | ----------------- | ------------------------------ |
| Object        | `{}`              | Car, Dog, Cat                  |
| Class         | `class`           | Blueprint                      |
| Constructor   | `constructor()`   | Factory setup                  |
| Encapsulation | `#private`        | Vault, hidden money            |
| Inheritance   | `extends`         | Child inherits parent features |
| Polymorphism  | override methods  | Animal sounds                  |
| Static        | `static`          | Calculator square              |
| Getter/Setter | `get` / `set`     | Filtered access                |

---

# 🧠 **10. Real-World Mini Project Idea**

**Project:** Library System

- Class: `Book` → properties: title, author, available
- Class: `Member` → borrow book, return book
- Use **inheritance**: `SpecialMember` → extended privileges
- Use **getter/setter**: track borrowed books

This is **perfect to practice OOP in JS**.

---
