# OOP in JavaScript — Lesson 2: Polymorphism

## 1. What Is Polymorphism?

Polymorphism means "many forms."

In Object-Oriented Programming (OOP), polymorphism allows different objects to share a common interface while providing different implementations of the same behavior.

### Real-World Analogy: Payment Methods

Imagine an online shopping application that supports:

- Credit card payments
- PayPal payments
- Bank transfers

The user performs the same action: **pay**.

However, each payment method processes the payment differently.

```javascript
const cardPayment = {
  pay() {
    console.log("Processing credit card payment");
  }
};

const paypalPayment = {
  pay() {
    console.log("Processing PayPal payment");
  }
};

const bankTransfer = {
  pay() {
    console.log("Processing bank transfer");
  }
};

cardPayment.pay();
paypalPayment.pay();
bankTransfer.pay();
```

Output:

```text
Processing credit card payment
Processing PayPal payment
Processing bank transfer
```

Each object has a `pay()` method, but its implementation differs.

**Key idea:** Polymorphism allows us to use a common operation without needing to know the internal implementation of every object.

---

## 2. Why Do We Need Polymorphism?

Imagine building a notification system that supports email, SMS, and push notifications.

### Without Polymorphism

We might write:

```javascript
function sendNotification(type, message) {
  if (type === "email") {
    console.log(`Sending email: ${message}`);
  } else if (type === "sms") {
    console.log(`Sending SMS: ${message}`);
  } else if (type === "push") {
    console.log(`Sending push notification: ${message}`);
  }
}

sendNotification("email", "Your order has shipped");
sendNotification("sms", "Your order has shipped");
```

This works, but adding more notification types requires adding more conditions to the function.

For a small application, this might be perfectly acceptable. However, as the system grows, the function can become harder to maintain.

### With Polymorphism

Each notification type can implement its own `send()` method.

```javascript
const email = {
  send(message) {
    console.log(`Sending email: ${message}`);
  }
};

const sms = {
  send(message) {
    console.log(`Sending SMS: ${message}`);
  }
};

const push = {
  send(message) {
    console.log(`Sending push notification: ${message}`);
  }
};

function notify(channel, message) {
  channel.send(message);
}

notify(email, "Your order has shipped");
notify(sms, "Your order has shipped");
notify(push, "Your order has shipped");
```

Output:

```text
Sending email: Your order has shipped
Sending SMS: Your order has shipped
Sending push notification: Your order has shipped
```

Notice that `notify()` does not need to know whether it receives an email, SMS, or push notification object.

It only requires the object to provide a compatible `send()` method.

### Benefits of Polymorphism

- Reduces the need for repeated type checks.
- Makes it easier to introduce new implementations.
- Separates the caller from implementation details.
- Improves extensibility and testability.
- Encourages programming against common interfaces.

---

## 3. Types of Polymorphism in JavaScript

Two important forms of polymorphism in JavaScript are:

1. Runtime polymorphism through method overriding.
2. Duck typing.

### 3.1 Runtime Polymorphism Through Method Overriding

Method overriding occurs when a child class provides its own implementation of a method inherited from its parent class.

Consider a game with different character types.

Each character can attack, but each character attacks differently.

```javascript
class Character {
  attack() {
    console.log("Character attacks");
  }
}

class Warrior extends Character {
  attack() {
    console.log("Warrior attacks with a sword");
  }
}

class Archer extends Character {
  attack() {
    console.log("Archer attacks with a bow");
  }
}

class Mage extends Character {
  attack() {
    console.log("Mage casts a spell");
  }
}

const characters = [
  new Warrior(),
  new Archer(),
  new Mage()
];

for (const character of characters) {
  character.attack();
}
```

Output:

```text
Warrior attacks with a sword
Archer attacks with a bow
Mage casts a spell
```

The loop calls the same method, `attack()`, on every object.

However, the implementation that runs depends on the actual object.

This is an example of **runtime polymorphism**.

JavaScript determines which overridden method to call at runtime based on the object's prototype chain.

#### Why Is This Useful?

Suppose you add another character:

```javascript
class Healer extends Character {
  attack() {
    console.log("Healer uses a healing ability");
  }
}
```

You can add a `Healer` instance to the existing array without changing the loop.

```javascript
characters.push(new Healer());

for (const character of characters) {
  character.attack();
}
```

The loop remains unchanged because it depends on the common `attack()` method rather than the specific character type.

### 3.2 Duck Typing

JavaScript also supports polymorphism without inheritance.

Duck typing is an approach where an object is considered suitable for an operation if it provides the required behavior.

The idea is commonly summarized as:

> If it behaves like a duck, you can treat it like a duck.

Consider the following example:

```javascript
const pdfReport = {
  generate() {
    console.log("Generating PDF report");
  }
};

const excelReport = {
  generate() {
    console.log("Generating Excel report");
  }
};

const invoice = {
  generate() {
    console.log("Generating invoice");
  }
};

function generateDocument(document) {
  document.generate();
}

generateDocument(pdfReport);
generateDocument(excelReport);
generateDocument(invoice);
```

Output:

```text
Generating PDF report
Generating Excel report
Generating invoice
```

These objects do not inherit from a common class.

They work with the same function because they all provide a compatible `generate()` method.

This is duck typing.

JavaScript is dynamically typed, so this style is common.

**Important:** Duck typing does not automatically guarantee that an object has the required method. If `generate()` is missing or not callable, the method call fails at runtime.

### Method Overriding vs. Duck Typing

| Method Overriding | Duck Typing |
| --- | --- |
| Commonly uses inheritance. | Does not require inheritance. |
| A child class replaces an inherited implementation. | Objects provide compatible behavior. |
| Example: `Warrior extends Character`. | Example: Unrelated objects implement `generate()`. |

---

## 4. Real-World Example: Payment Processing

Suppose an e-commerce application supports multiple payment methods.

Each payment method needs to process a payment, but each one has a different implementation.

```javascript
class CardPayment {
  process(amount) {
    console.log(`Charging card: $${amount}`);
  }
}

class WalletPayment {
  process(amount) {
    console.log(`Charging wallet: $${amount}`);
  }
}

class BankPayment {
  process(amount) {
    console.log(`Transferring $${amount} from bank`);
  }
}

function checkout(paymentMethod, amount) {
  paymentMethod.process(amount);
}

checkout(new CardPayment(), 100);
checkout(new WalletPayment(), 200);
checkout(new BankPayment(), 300);
```

Output:

```text
Charging card: $100
Charging wallet: $200
Transferring $300 from bank
```

### Why Is This Good Design?

The `checkout()` function depends on a common operation: `process()`.

It does not need separate branches for each payment method.

If you add another payment method, you can implement `process()` for that method and pass the new object to `checkout()`.

This design makes the checkout function easier to extend without modifying its core logic.

In a production system, payment processing also requires secure provider integrations, error handling, and clear success and failure results. This example focuses on the object design.

---

## 5. Polymorphism with a Shared Parent Class

JavaScript does not have a dedicated `interface` keyword in the same way that TypeScript does.

However, JavaScript classes can establish a common method contract through inheritance and conventions.

```javascript
class Notification {
  send(message) {
    throw new Error("send() must be implemented");
  }
}

class EmailNotification extends Notification {
  send(message) {
    console.log(`Email: ${message}`);
  }
}

class SMSNotification extends Notification {
  send(message) {
    console.log(`SMS: ${message}`);
  }
}

function notify(notification, message) {
  notification.send(message);
}

notify(new EmailNotification(), "Welcome!");
notify(new SMSNotification(), "Your verification code is ready");
```

Output:

```text
Email: Welcome!
SMS: Your verification code is ready
```

The parent class establishes a convention that notification classes should provide a `send()` method.

If someone calls `send()` directly on a plain `Notification` instance, the base implementation throws an error.

This is a runtime convention, not a built-in abstract method mechanism.

JavaScript does not natively enforce abstract classes or interfaces in the same way as TypeScript's type system.

---

## 6. Common Design Patterns That Use Polymorphism

Polymorphism is often used in larger design patterns.

### 6.1 Strategy Pattern

The Strategy pattern encapsulates interchangeable algorithms or behaviors behind a common interface.

Real-world examples include:

- Discount calculation.
- Shipping cost calculation.
- Payment selection.
- Sorting algorithms.

Example:

```javascript
const regularDiscount = {
  calculate(price) {
    return price * 0.05;
  }
};

const premiumDiscount = {
  calculate(price) {
    return price * 0.15;
  }
};

function finalPrice(price, strategy) {
  return price - strategy.calculate(price);
}

console.log(finalPrice(100, regularDiscount)); // 95
console.log(finalPrice(100, premiumDiscount)); // 85
```

The `finalPrice()` function does not need to know the details of each discount strategy.

It simply calls `calculate()` on the supplied strategy.

To introduce a new discount strategy, create another object that implements `calculate()`.

### 6.2 Plugin or Handler Pattern

A plugin system allows different implementations to perform the same general operation.

For example, a file-processing application might support CSV, JSON, and XML files.

Each handler can implement a common `process()` method.

```javascript
function runHandler(handler, input) {
  return handler.process(input);
}

const jsonHandler = {
  process(input) {
    return JSON.parse(input);
  }
};

const csvHandler = {
  process(input) {
    return input.split(",");
  }
};

console.log(
  runHandler(jsonHandler, '{"name":"Ali"}')
);

console.log(
  runHandler(csvHandler, "Ali,Sara,John")
);
```

Output:

```text
{ name: 'Ali' }
[ 'Ali', 'Sara', 'John' ]
```

These handlers perform different operations, but the caller uses the same `process()` method.

In a real file-processing system, each handler would need appropriate validation and format-specific error handling.

### 6.3 Dependency Injection

Dependency injection means providing an object or behavior to another component instead of hardcoding a specific implementation inside it.

```javascript
function createOrder(order, notifier) {
  console.log("Order created:", order.id);

  notifier.send(`Order ${order.id} created`);
}

const emailNotifier = {
  send(message) {
    console.log("Email:", message);
  }
};

const smsNotifier = {
  send(message) {
    console.log("SMS:", message);
  }
};

createOrder({ id: 101 }, emailNotifier);
createOrder({ id: 102 }, smsNotifier);
```

The order-creation function doesn't need to know how each notification is delivered.

This makes it easier to substitute implementations and use test doubles during testing.

Dependency injection and polymorphism are different concepts, but they work well together.

---

## 7. Important JavaScript Details

### 7.1 Does JavaScript Support Method Overloading?

Traditional method overloading allows multiple methods with the same name but different parameter signatures, with the language selecting the appropriate implementation.

JavaScript does not support this kind of signature-based method overloading in classes.

Consider:

```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }

  add(a, b, c) {
    return a + b + c;
  }
}

const calculator = new Calculator();

console.log(calculator.add(2, 3)); // NaN
```

The second `add()` definition replaces the first.

When called with two arguments, `c` becomes `undefined`, so the result is `NaN`.

You can instead use rest parameters:

```javascript
class Calculator {
  add(...numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
  }
}

const calculator = new Calculator();

console.log(calculator.add(2, 3));    // 5
console.log(calculator.add(2, 3, 4)); // 9
```

This provides flexible argument handling, but it is not traditional signature-based method overloading.

### 7.2 Overriding vs. Overloading

| Overriding | Overloading |
| --- | --- |
| A child class replaces an inherited method implementation. | Multiple implementations are selected by method signature in languages that support it. |
| Common in JavaScript class inheritance. | JavaScript does not support traditional signature-based method overloading. |
| Depends on inheritance in the usual class-based example. | Does not necessarily require inheritance. |

### 7.3 Can Polymorphism Exist Without Classes?

Yes.

Duck typing allows unrelated objects to provide the same method and work with the same function.

```javascript
const printer = {
  execute() {
    console.log("Printing document");
  }
};

const scanner = {
  execute() {
    console.log("Scanning document");
  }
};

function runDevice(device) {
  device.execute();
}

runDevice(printer);
runDevice(scanner);
```

No classes or inheritance are required.

---

## 8. Common Mistakes

### Mistake 1: Assuming Polymorphism Requires Inheritance

Inheritance is one way to implement polymorphic behavior, but duck typing allows unrelated objects to work through a common interface.

### Mistake 2: Using Type Checks Everywhere

If a function has many branches that check object types, consider whether a shared method or interchangeable strategy would make the design simpler.

However, conditionals are not inherently bad. Use polymorphism when it genuinely improves the design.

### Mistake 3: Giving Inconsistent Meanings to Methods

If different implementations expose a method named `process()`, callers should have a reasonable understanding of what that method does and what it returns.

A common method name is not enough; compatible behavior and expectations matter too.

### Mistake 4: Assuming Required Methods Always Exist

With duck typing, JavaScript does not automatically guarantee that an object implements the expected method.

Validate untrusted inputs and handle errors where appropriate.

### Mistake 5: Overengineering Simple Problems

Polymorphism is useful when it reduces complexity. For a small, stable operation, a straightforward conditional may be easier to understand.

---

## 9. Interview Questions

### Q1. What is polymorphism?

Polymorphism allows different objects to be used through a common interface or operation while providing different implementations.

### Q2. How does JavaScript support polymorphism?

Common techniques include method overriding through inheritance and duck typing, where objects provide compatible methods without requiring a shared parent class.

### Q3. What is the difference between inheritance and polymorphism?

Inheritance establishes a relationship between classes and enables reuse.

Polymorphism allows a common operation to produce different behavior depending on the object or implementation.

### Q4. Does polymorphism require a parent class?

No. JavaScript supports duck typing, which allows unrelated objects to work with the same function if they provide the required behavior.

### Q5. What is runtime polymorphism?

In class-based examples, runtime polymorphism occurs when an overridden method is selected according to the actual object receiving the call.

### Q6. Does JavaScript support traditional method overloading?

No. Defining multiple class methods with the same name does not create signature-based overloads. The later definition replaces the earlier one.

### Q7. What is the Strategy pattern?

The Strategy pattern encapsulates interchangeable algorithms behind a common interface, allowing the caller to select different behaviors without changing its core logic.

### Q8. What is duck typing?

Duck typing is an approach in which an object is considered suitable for an operation if it provides the required methods or behavior, regardless of its class or inheritance hierarchy.

---

## 10. Practice Questions

### Question 1: Predict the Output

```javascript
class Animal {
  speak() {
    console.log("Animal");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog");
  }
}

function makeSound(animal) {
  animal.speak();
}

makeSound(new Dog());
```

**Answer:**

```text
Dog
```

The `Dog` class overrides the inherited `speak()` method.

### Question 2: Identify the Type of Polymorphism

```javascript
const pdf = {
  render() {
    console.log("Rendering PDF");
  }
};

const webpage = {
  render() {
    console.log("Rendering webpage");
  }
};

function display(document) {
  document.render();
}

display(pdf);
display(webpage);
```

**Answer:** Duck typing.

The objects do not need to inherit from a shared class. Both provide a compatible `render()` method.

### Question 3: Refactor Using Polymorphism

Consider this function:

```javascript
function calculateShipping(type, weight) {
  if (type === "standard") {
    return weight * 5;
  }

  if (type === "express") {
    return weight * 10;
  }

  if (type === "overnight") {
    return weight * 20;
  }

  throw new Error("Unknown shipping type");
}
```

Refactor the design so that each shipping strategy implements a common `calculate(weight)` method and a shared function uses the selected strategy.

The goal is to make it easy to add new shipping strategies without adding more conditions to the central calculation function.

---

## 11. Coding Challenge

Build a notification system using polymorphism.

Requirements:

1. Create an `EmailNotification` class with a `send(message)` method.
2. Create an `SMSNotification` class with a `send(message)` method.
3. Create a `PushNotification` class with a `send(message)` method.
4. Write one `notify(notification, message)` function that works with all three.
5. Do not use `if/else` statements to determine the notification type inside `notify()`.

Expected usage:

```javascript
const email = new EmailNotification();
const sms = new SMSNotification();
const push = new PushNotification();

notify(email, "Your order has shipped");
notify(sms, "Your order has shipped");
notify(push, "Your order has shipped");
```

Each notification class should implement `send()` differently, while the `notify()` function remains unchanged.

---

## 12. Summary

Polymorphism is valuable because it allows code to depend on a common behavior instead of specific implementations.

Remember these key points:

- Polymorphism means many forms of behavior through a common interface.
- Method overriding is commonly used with inheritance.
- Duck typing enables polymorphism without inheritance.
- Strategy patterns use interchangeable behaviors.
- Dependency injection makes implementations easier to substitute.
- JavaScript does not support traditional signature-based method overloading.
- Polymorphism is useful when it simplifies extensibility and reduces unnecessary coupling.
