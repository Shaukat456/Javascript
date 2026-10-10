# Object-Oriented Programming (OOP) in JavaScript

A practical, step-by-step guide · Beginner to interview-ready

OOP is a way of designing software by organizing code around objects that contain data and behavior.

Before discussing inheritance, let's understand what OOP is, why it exists, how JavaScript supports it, and where it is useful. Then we'll study inheritance in depth as our first OOP concept.

## 1. What is OOP?

Imagine you're building an online shopping application.

Your application has customers, products, shopping carts, orders, and payments.

Each of these has information and actions associated with it.

[Visual merchandising strategies for the digital retail environment — Retail Technology Innovation Hub](https://images.openai.com/static-rsc-4/jnSsfEdeAOHsQc9USbd5BYoPGxiNR0fRhTSmm8F0SR4TO2xEk5TQqaQH9p1et5YwfvvJ_GNxxK1A7kc3gSz5j4b-zkbf5At569uUlFe0mHIWUg2lbb9RKw1-jy4Zu4muIJglT9Lm5aM9noQ-AWqDlTZ7xbdQqq1aaY-s762aIq4?purpose=inline)

Customer

Data: name, email

Behavior: updateProfile(), placeOrder()

[The parcel box opens and a shopping bag pops out 3d illustration background](https://images.openai.com/static-rsc-4/REM3z9r_CrZkrHHqw30g-ZOCL_dCxdxDcIJx6hZ1Eu99GP-dxAsQmJ9iDQrWThCA_mnEtgnIXQ3uZi2FO3DxJ7vAaN2FbSlwZE8ZfPHqQf2Rgf7-daqnETj_EaYjix6H0MvF71rBL05uquZKKaPuE9KqhndF3d2G0j6zJQCawpjy-9aBJ5zt7XwU53SuUAPx?purpose=inline)

Product

Data: name, price, stock

Behavior: updatePrice(), checkStock()

[3D Shopping cart and floating cardboard boxes. Fast delivery concept from online store. Shipping logistics package delivery. Cartoon creative design icon isolated on white background. 3D Rendering](https://images.openai.com/static-rsc-4/Q8ycEJUwYJdLNv0gCTRJVlT1pNQLcR49ATUY-WNoc4rCfKiJhPmgBb6vD2cRFM0GKxPOjXUGFZ3YDIZs-Z-CsZ9nDTAWBn_d5np1frgqGndKWXdn3QegqxTxeKXAZm8lM36sarw_5FvhgfPZ8aSBzx-HwYsxbpNTvdoGtmxMr_6Weyypb-xPhqd4SJ_qIclD?purpose=inline)

Shopping cart

Data: items, quantities

Behavior: addItem(), removeItem(), calculateTotal()

OOP encourages us to organize these concepts as objects instead of scattering their data and related operations across unrelated parts of our code.

### A simple definition

Object-Oriented Programming is a programming paradigm that organizes software around objects, which combine state and behavior.

- State means the data an object holds.
- Behavior means what an object can do.
- Object is an entity that holds state and exposes behavior.

## 2. Why do we need OOP?

Let's compare two approaches to building a product feature.

### Approach A: Without organizing around objects

```
const productName = "Keyboard";
const productPrice = 100;
const productStock = 10;

function calculateDiscount(price, percentage) {
  return price - (price * percentage) / 100;
}

function checkStock(stock) {
  return stock > 0;
}

console.log(calculateDiscount(productPrice, 10));
console.log(checkStock(productStock));
```

This code works perfectly well. Procedural code isn't inherently bad.

But as an application grows, you may have hundreds of products, multiple operations per product, and many different modules that need to manage the same data.

### Approach B: Organizing around objects

```
class Product {
  constructor(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  calculateDiscount(percentage) {
    return this.price - (this.price * percentage) / 100;
  }

  isInStock() {
    return this.stock > 0;
  }
}

const keyboard = new Product("Keyboard", 100, 10);
const mouse = new Product("Mouse", 50, 0);

console.log(keyboard.calculateDiscount(10)); // 90
console.log(keyboard.isInStock());           // true
console.log(mouse.isInStock());              // false
```

Now the data and related operations live together in the `Product` abstraction.

You can create many product objects using the same class without rewriting the logic for every product.

### The real benefit

OOP can help you:

- Organize large applications into understandable units.
- Reuse functionality across related objects.
- Control how data is accessed and changed.
- Make software easier to extend and maintain.
- Model real-world domains when that model is appropriate.

OOP is not automatically better for every problem. Small scripts and data transformations may be simpler with ordinary functions and objects.

## 3. Class vs. object vs. instance

These terms are fundamental to understanding JavaScript OOP.

Think of a class as a blueprint for creating houses.

[New Construction Townhomes in Rochester MN and New Homes](https://images.openai.com/static-rsc-4/m6ff-kTvp2OUgU-LggWQk1M8sXXMCP9WQbmbLQ2MezBceorjKxlwhidugY--6OjbvUbLl052gVxOxuVHNGy54VqVkYLscX1zcecJ0ShNPyKPEz_UdFfSJHOGq5UJwux7tDrzaNWW8IQpN0FV5aY7w4d4I2TRei3nO8agi0LmmNE?purpose=inline)

[rochesterrelocationguide.com](https://www.rochesterrelocationguide.com/new-construction)

- Class: The blueprint describing how a house is structured.
- Object: A particular house with its own characteristics.
- Instance: An object created from a particular class.

In JavaScript:

```
class House {
  constructor(color, rooms) {
    this.color = color;
    this.rooms = rooms;
  }

  describe() {
    console.log(
      `This house is ${this.color} and has ${this.rooms} rooms.`
    );
  }
}

const house1 = new House("white", 4);
const house2 = new House("blue", 3);

house1.describe();
house2.describe();
```

Output:

```
This house is white and has 4 rooms.
This house is blue and has 3 rooms.
```

Both objects come from the same class, but each has its own state.

### Understand each keyword

| Keyword         | Meaning                                                         |
| --------------- | --------------------------------------------------------------- |
| `class`         | Declares a class                                                |
| `constructor()` | Initializes a new instance                                      |
| `new`           | Creates an instance                                             |
| `this`          | Refers to the current object in this method or constructor call |
| `return`        | Returns a value from a function or method                       |

For example:

```
const house1 = new House("white", 4);
```

JavaScript creates a new instance, runs the constructor with the supplied arguments, and initializes the instance's properties.

Important: JavaScript classes are built on prototypes. They provide convenient syntax for creating objects and establishing inheritance relationships; they aren't identical to classes in every other programming language.

## 4. The four commonly taught pillars of OOP

OOP is commonly explained using four major concepts:

1\. Encapsulation

Keeping related data and behavior together and controlling how internal state is accessed or changed.

Example: A bank account allows deposits through a method rather than letting arbitrary code change its balance.

2\. Inheritance

Creating a specialized class that reuses and extends the functionality of another class.

Example: `Developer` inherits common employee behavior from `Employee`.

3\. Polymorphism

Allowing different object types to be used through a common interface, with each type providing its own behavior.

Example: Different payment methods expose `pay()`, but each processes payment differently.

4\. Abstraction

Exposing the essential operations while hiding unnecessary implementation details.

Example: You call `car.start()` without needing to know every detail of the engine's startup process.

These four pillars are a useful learning framework, not a requirement that every OOP program must use all four.

We'll now focus on inheritance only.

# Lesson 1: Inheritance in JavaScript

## 5. What is inheritance?

Inheritance allows one class to acquire and extend the behavior of another class.

Consider a company with different employee roles:

- Developer
- Manager
- Designer

All employees have a name and salary and can clock in. However, each role has its own specialized behavior.

We can put the shared behavior into an `Employee` class and extend it for each role.

Employee

name · salary · clockIn()

Developer

writeCode()

Manager

manageTeam()

Designer

createDesign()

The parent class contains shared functionality. Each child class inherits it and adds its own functionality.

Terminology:

- Parent class: The class being inherited from.
- Child class: The class that inherits.
- Superclass: Another term for parent class.
- Subclass: Another term for child class.

The core idea is reuse common functionality and specialize it where needed.

## 6. Implement inheritance using `extends`

First, create the parent class.

```
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  clockIn() {
    console.log(`${this.name} has clocked in.`);
  }

  getSalary() {
    return this.salary;
  }
}
```

Now create a child class:

```
class Developer extends Employee {
  writeCode() {
    console.log(`${this.name} is writing code.`);
  }
}

const dev = new Developer("Sara", 80000);

dev.clockIn();
dev.writeCode();

console.log(dev.getSalary());
```

Output:

```
Sara has clocked in.
Sara is writing code.
80000
```

Notice that `Developer` doesn't define `clockIn()` or `getSalary()`. It can still use them because it inherits them from `Employee`.

The `extends` keyword establishes the inheritance relationship.

## 7. Use `super()` to initialize inherited properties

Suppose a developer has an additional property: a programming language.

```
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
}

class Developer extends Employee {
  constructor(name, salary, language) {
    super(name, salary);
    this.language = language;
  }
}

const dev = new Developer("Sara", 80000, "JavaScript");

console.log(dev.name);     // Sara
console.log(dev.salary);   // 80000
console.log(dev.language); // JavaScript
```

Here:

1. `super(name, salary)` calls the parent constructor.
2. The parent initializes the common properties.
3. The child initializes its own `language` property.

Crucial rule: If a child class declares its own constructor, it must call `super()` before accessing `this`.

```
class Developer extends Employee {
  constructor(name, salary, language) {
    this.language = language; // Error!
    super(name, salary);
  }
}
```

This fails because `this` cannot be accessed before `super()` in a derived constructor.

## 8. Method overriding

A child class can replace an inherited method with its own implementation. This is called method overriding.

```
class Employee {
  describeWork() {
    console.log("I work for the company.");
  }
}

class Developer extends Employee {
  describeWork() {
    console.log("I build software.");
  }
}

const employee = new Employee();
const developer = new Developer();

employee.describeWork();  // I work for the company.
developer.describeWork(); // I build software.
```

The developer's method takes precedence when called on a `Developer` instance.

If the child also wants to call the parent's implementation, it can use `super`:

```
class Employee {
  introduce() {
    console.log("I am an employee.");
  }
}

class Developer extends Employee {
  introduce() {
    super.introduce();
    console.log("I build software.");
  }
}

new Developer().introduce();
```

Output:

```
I am an employee.
I build software.
```

Remember the distinction:

- `super()` calls the parent constructor.
- `super.method()` calls an inherited method.

## 9. Real-world use case: payment methods

An e-commerce application may support card payments and PayPal payments.

Both have an amount, but each payment method handles the payment differently.

```
class Payment {
  constructor(amount) {
    this.amount = amount;
  }

  showAmount() {
    console.log(`Payment amount: $${this.amount}`);
  }
}

class CardPayment extends Payment {
  pay() {
    console.log(`Processing card payment of $${this.amount}`);
  }
}

class PayPalPayment extends Payment {
  pay() {
    console.log(`Processing PayPal payment of $${this.amount}`);
  }
}

const card = new CardPayment(150);
const paypal = new PayPalPayment(200);

card.showAmount();
card.pay();

paypal.showAmount();
paypal.pay();
```

Both child classes reuse `showAmount()` while defining their own `pay()` method.

This illustrates a practical inheritance pattern: a shared base class with specialized subclasses.

In production, payment processing also requires secure provider integrations and error handling. This example illustrates the object structure, not a complete payment implementation.

## 10. When is inheritance appropriate?

Use the is-a test as an initial guide.

| Relationship                   | Appropriate?                    |
| ------------------------------ | ------------------------------- |
| A developer is an employee     | Yes                             |
| A car is a vehicle             | Yes                             |
| A digital product is a product | Yes                             |
| An engine is a car             | No — an engine is part of a car |
| A shopping cart is a customer  | No                              |

Inheritance is useful when a child genuinely represents a specialized form of its parent.

Avoid unnecessarily deep class hierarchies, and don't force a child to inherit behavior it cannot meaningfully support. Sometimes composition—combining objects that provide different capabilities—is a better choice.

## 11. Interview questions

Q1. What is inheritance in JavaScript?

Inheritance lets a class reuse and extend the behavior of another class. JavaScript implements class inheritance using prototypes.

Q2. Does JavaScript support multiple inheritance through classes?

No. A class can extend only one class, although composition and mixins offer other ways to combine functionality.

Q3. What is a prototype chain?

It is the sequence of objects JavaScript searches when looking up properties and methods. It enables instances to access inherited methods.

Q4. What is method overriding?

A child class provides its own implementation of a method inherited from its parent.

Q5. What is the difference between inheritance and composition?

Inheritance models an is-a relationship. Composition models a has-a relationship or combines capabilities.

## 12. Practice exercise

Build a small library system.

Create a `LibraryItem` parent class with:

- `title` and `year` properties.
- A `describe()` method that prints the title and year.

Then create a `Book` child class that:

- Extends `LibraryItem`.
- Accepts an additional `author` argument.
- Calls `super()` to initialize shared properties.
- Adds a `read()` method.

Expected usage:

```
const book = new Book("The Hobbit", 1937, "J.R.R. Tolkien");

book.describe();
book.read();
```

Expected output:

```
The Hobbit (1937)
Reading The Hobbit by J.R.R. Tolkien
```
