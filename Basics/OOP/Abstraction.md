# Abstraction in JavaScript (OOP)

## 1. What Is Abstraction?

**Abstraction is an Object-Oriented Programming (OOP) principle that hides unnecessary implementation details and exposes only the essential features of an object.**

In simple words:

> Abstraction means focusing on **what an object does** instead of **how it does it**.

Imagine you are driving a car.

You use:
- The steering wheel to change direction.
- The accelerator to increase speed.
- The brake to slow down or stop.

You do not need to understand every detail of how the engine, fuel injection system, or braking mechanism works.

The car provides a simple interface for you to use while hiding much of its internal complexity.

This is abstraction.

### Real-world example

Think about an ATM.

When you withdraw money, you:

1. Insert your card.
2. Enter your PIN.
3. Choose an amount.
4. Receive your money.

You do not need to know exactly how the ATM communicates with the bank, checks your balance, or processes the transaction internally.

The ATM exposes the operations you need while hiding the implementation details.

### In programming

Consider a coffee machine.

You call a method such as `makeCoffee()` without needing to know all the internal steps involved in heating water, grinding beans, and mixing ingredients.

```js
class CoffeeMachine {
  makeCoffee() {
    this.#heatWater();
    this.#grindBeans();
    this.#brewCoffee();

    console.log("Coffee is ready!");
  }

  #heatWater() {
    console.log("Heating water...");
  }

  #grindBeans() {
    console.log("Grinding coffee beans...");
  }

  #brewCoffee() {
    console.log("Brewing coffee...");
  }
}

const machine = new CoffeeMachine();

machine.makeCoffee();
```

Output:

```text
Heating water...
Grinding coffee beans...
Brewing coffee...
Coffee is ready!
```

Notice what happens:

- `makeCoffee()` is the public operation.
- `#heatWater()`, `#grindBeans()`, and `#brewCoffee()` are private implementation details.
- The user of the class only needs to know how to call `makeCoffee()`.

The internal methods use JavaScript's `#` private method syntax, so they cannot be called directly from outside the class.

```js
machine.makeCoffee(); // Works

// machine.#heatWater(); // Syntax error
```

**Important:** This example uses encapsulation to help implement abstraction. Abstraction and encapsulation are related, but they are not the same concept.

---

## 2. Why Do We Need Abstraction?

Imagine you are building a payment system.

Without a clear abstraction, you might expose every internal step to the code that uses the payment system.

```js
class Payment {
  connectToBank() {
    console.log("Connecting to bank...");
  }

  verifyAccount() {
    console.log("Verifying account...");
  }

  processTransaction() {
    console.log("Processing transaction...");
  }

  sendConfirmation() {
    console.log("Sending confirmation...");
  }
}

const payment = new Payment();

payment.connectToBank();
payment.verifyAccount();
payment.processTransaction();
payment.sendConfirmation();
```

This works, but every caller must know which methods to call and in which order.

What if the implementation changes? What if an extra verification step is added?

The calling code would also need to change.

With abstraction, we can expose one straightforward operation:

```js
class Payment {
  pay() {
    this.#connectToBank();
    this.#verifyAccount();
    this.#processTransaction();
    this.#sendConfirmation();
  }

  #connectToBank() {
    console.log("Connecting to bank...");
  }

  #verifyAccount() {
    console.log("Verifying account...");
  }

  #processTransaction() {
    console.log("Processing transaction...");
  }

  #sendConfirmation() {
    console.log("Sending confirmation...");
  }
}

const payment = new Payment();

payment.pay();
```

Now the calling code only needs to do this:

```js
payment.pay();
```

The internal process can be updated without requiring the caller to understand every internal step, provided the public interface remains the same.

### Main benefits of abstraction

| Benefit | Explanation |
|---|---|
| Simplicity | Users interact with a small, understandable interface. |
| Reduced complexity | Internal implementation details remain hidden. |
| Maintainability | Internal code can change without necessarily changing the public interface. |
| Separation of concerns | The code using an object does not need to manage every internal operation. |
| Consistency | The class controls how its operations are performed. |

---

## 3. How Is Abstraction Implemented in JavaScript?

JavaScript does not have a dedicated `abstract` keyword like some other programming languages.

Instead, abstraction can be implemented using several techniques.

The most common techniques are:

1. Public methods that expose simple operations.
2. Private fields and private methods.
3. Classes that define required methods and subclasses that implement them.
4. Conventions and runtime checks that help enforce a class design.

Let's understand each one.

---

## 4. Abstraction Using Public Methods

A public method can provide a simple interface for a complicated process.

Consider a washing machine.

The user wants to wash clothes, not manually control every internal operation.

```js
class WashingMachine {
  startWash() {
    this.#fillWater();
    this.#washClothes();
    this.#drainWater();
    this.#spinClothes();

    console.log("Washing completed!");
  }

  #fillWater() {
    console.log("Filling water...");
  }

  #washClothes() {
    console.log("Washing clothes...");
  }

  #drainWater() {
    console.log("Draining water...");
  }

  #spinClothes() {
    console.log("Spinning clothes...");
  }
}

const washer = new WashingMachine();

washer.startWash();
```

Output:

```text
Filling water...
Washing clothes...
Draining water...
Spinning clothes...
Washing completed!
```

### What is happening?

- `startWash()` is the public interface.
- The private methods perform the internal steps.
- The user only needs to call `startWash()`.

This is a practical way to apply abstraction in JavaScript.

**Key idea:** Give the user a simple operation that handles the necessary complexity internally.

---

## 5. Abstraction Using Private Methods

JavaScript supports private methods and fields using the `#` prefix.

A private member can only be accessed from within the class body.

Consider a banking example:

```js
class BankAccount {
  #balance = 1000;

  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }

    this.#validateDeposit(amount);
    this.#balance += amount;

    console.log(`Deposited: ${amount}`);
  }

  getBalance() {
    return this.#balance;
  }

  #validateDeposit(amount) {
    console.log(`Validating deposit of ${amount}...`);
  }
}

const account = new BankAccount();

account.deposit(500);

console.log(account.getBalance());
```

Output:

```text
Validating deposit of 500...
Deposited: 500
1500
```

Here:

- `deposit()` is a public operation.
- `getBalance()` is a public operation.
- `#validateDeposit()` is a private implementation detail.
- `#balance` is private state.

The user can deposit money and check the balance without accessing the internal validation method or modifying the balance directly.

```js
account.deposit(500); // Works

// account.#validateDeposit(500); // Syntax error

// account.#balance = 999999; // Syntax error
```

### Is this abstraction or encapsulation?

It is useful to distinguish the two ideas:

- **Abstraction:** The user interacts through operations such as `deposit()` without needing to know the internal validation process.
- **Encapsulation:** The class protects its internal state and restricts direct access to private members.

The same design can demonstrate both principles.

---

## 6. Abstraction and Abstract Classes

Some programming languages allow you to define an **abstract class**.

An abstract class can describe what subclasses must do without necessarily implementing every operation itself.

For example, imagine an application that supports different payment methods:

- Credit card
- PayPal
- Bank transfer

Every payment method should have a `pay()` operation, but each method processes payment differently.

JavaScript does not provide a built-in `abstract class` keyword. However, we can approximate this design with a base class and runtime checks.

```js
class PaymentMethod {
  constructor() {
    if (new.target === PaymentMethod) {
      throw new Error(
        "PaymentMethod cannot be instantiated directly."
      );
    }
  }

  pay(amount) {
    throw new Error(
      "The pay() method must be implemented by a subclass."
    );
  }
}
```

Let's understand the code.

### `new.target`

Inside a constructor, `new.target` identifies the constructor that was directly invoked with `new`.

When the base class is instantiated directly, `new.target` is `PaymentMethod`.

```js
// const payment = new PaymentMethod();
// Throws an error.
```

When a subclass is instantiated, `new.target` refers to the subclass instead.

```js
class CreditCardPayment extends PaymentMethod {
  pay(amount) {
    console.log(`Paid ${amount} using a credit card.`);
  }
}

const payment = new CreditCardPayment();

payment.pay(100);
```

Output:

```text
Paid 100 using a credit card.
```

The base class establishes a common design, while the subclass supplies the actual implementation.

### Why throw an error inside `pay()`?

The base method throws an error if a subclass does not override it.

```js
class IncompletePayment extends PaymentMethod {
  // pay() has not been implemented.
}

const payment = new IncompletePayment();

// payment.pay(100);
// Throws an error because the inherited pay() method throws.
```

This helps catch incomplete implementations.

**Important:** This is a runtime convention, not a native JavaScript abstract class. The constructor check prevents direct instantiation of the base class, but JavaScript does not automatically require subclasses to override `pay()`.

---

## 7. Building a Complete Abstraction Example

Let's create a payment system with multiple payment methods.

Each payment method must provide a `pay()` operation, but the internal payment logic differs.

```js
class PaymentMethod {
  constructor() {
    if (new.target === PaymentMethod) {
      throw new Error(
        "Create a specific payment method instead."
      );
    }
  }

  pay(amount) {
    throw new Error(
      "Subclasses must implement pay()."
    );
  }
}

class CreditCardPayment extends PaymentMethod {
  pay(amount) {
    this.#validateCard();
    console.log(`Processing credit card payment of ${amount}.`);
  }

  #validateCard() {
    console.log("Validating credit card...");
  }
}

class PayPalPayment extends PaymentMethod {
  pay(amount) {
    this.#connectToPayPal();
    console.log(`Processing PayPal payment of ${amount}.`);
  }

  #connectToPayPal() {
    console.log("Connecting to PayPal...");
  }
}

const creditCard = new CreditCardPayment();
const paypal = new PayPalPayment();

creditCard.pay(100);
paypal.pay(200);
```

Output:

```text
Validating credit card...
Processing credit card payment of 100.
Connecting to PayPal...
Processing PayPal payment of 200.
```

### What makes this abstraction?

The base class defines a common operation:

```js
pay(amount)
```

Each subclass decides how that operation works internally.

The code using a payment method can call `pay()` without needing to know the exact internal process.

For example:

```js
function checkout(paymentMethod, amount) {
  paymentMethod.pay(amount);
}

checkout(creditCard, 100);
checkout(paypal, 200);
```

The `checkout()` function does not need separate instructions for credit cards and PayPal. It relies on the common interface.

This example also demonstrates polymorphism because different objects respond to the same method call in different ways.

We will study polymorphism separately.

---

## 8. Abstraction vs. Encapsulation

These two OOP principles are related, but they solve different problems.

| Abstraction | Encapsulation |
|---|---|
| Hides unnecessary implementation details from the user. | Protects internal state and controls access to an object's members. |
| Focuses on what an object does. | Focuses on how data and behavior are organized and protected. |
| Provides a simple interface. | Restricts direct access to internal implementation or state. |
| Can be implemented using public methods and common interfaces. | Can be implemented using private fields, private methods, and controlled access. |

### Example

```js
class CoffeeMachine {
  #waterLevel = 100;

  makeCoffee() {
    this.#checkWater();
    console.log("Making coffee...");
  }

  #checkWater() {
    if (this.#waterLevel <= 0) {
      throw new Error("Not enough water.");
    }
  }
}
```

**Abstraction:**

The user calls `makeCoffee()` without needing to know how the water check works.

**Encapsulation:**

The water level is private, and the checking method cannot be called directly from outside the class.

### Remember this

- Abstraction hides unnecessary complexity.
- Encapsulation protects internal state and controls access.
- A single class can use both principles at the same time.

---

## 9. Abstraction vs. Inheritance

These principles also have different purposes.

| Abstraction | Inheritance |
|---|---|
| Defines a simplified interface or common design. | Allows a class to inherit members from another class. |
| Focuses on exposing essential behavior. | Focuses on reusing and extending existing behavior. |
| Can be implemented without inheritance. | Uses a parent-child class relationship. |

For example, a function that calls `makeCoffee()` can use abstraction even if the coffee machine class does not extend another class.

Inheritance can help implement an abstraction when multiple related classes need to follow a common design.

However, **abstraction does not require inheritance**.

---

## 10. Common Beginner Mistakes

### Mistake 1: Thinking abstraction means hiding all code

Abstraction does not mean that all methods must be private.

Public methods are essential because they provide the operations that users are allowed to perform.

```js
class Light {
  turnOn() {
    this.#supplyPower();
    console.log("Light is on.");
  }

  #supplyPower() {
    console.log("Supplying power...");
  }
}
```

Here, `turnOn()` is intentionally public. The private method hides an internal step.

### Mistake 2: Thinking abstraction and encapsulation are identical

They often work together, but they are different concepts.

Abstraction simplifies interaction with an object. Encapsulation protects and organizes the object's internal state and behavior.

### Mistake 3: Assuming JavaScript has a native `abstract` keyword

JavaScript classes do not have a built-in `abstract` keyword.

You can use base classes, subclasses, common interfaces, and runtime checks to approximate abstract-class behavior.

### Mistake 4: Making every method private

If every method is private, code outside the class will not have a public way to use the object's functionality.

A class should expose the operations that its users need.

### Mistake 5: Adding unnecessary complexity

Abstraction should make code easier to use, understand, and maintain.

Creating many extra classes or methods without a real need can make a program more complicated instead of simpler.

---

## 11. Practice Exercises

Try solving these exercises yourself before opening the solutions.

### Exercise 1: Coffee Machine

Create a `CoffeeMachine` class with:

- A public `makeCoffee()` method.
- A private `#heatWater()` method.
- A private `#brewCoffee()` method.

When `makeCoffee()` is called, both private methods should run.

<details>
<summary>Show solution</summary>

```js
class CoffeeMachine {
  makeCoffee() {
    this.#heatWater();
    this.#brewCoffee();

    console.log("Coffee is ready!");
  }

  #heatWater() {
    console.log("Heating water...");
  }

  #brewCoffee() {
    console.log("Brewing coffee...");
  }
}

const machine = new CoffeeMachine();

machine.makeCoffee();
```

</details>

### Exercise 2: Car

Create a `Car` class with:

- A public `start()` method.
- A private `#checkFuel()` method.
- A private `#startEngine()` method.

The public method should call both private methods.

<details>
<summary>Show solution</summary>

```js
class Car {
  start() {
    this.#checkFuel();
    this.#startEngine();

    console.log("Car started!");
  }

  #checkFuel() {
    console.log("Checking fuel...");
  }

  #startEngine() {
    console.log("Starting engine...");
  }
}

const car = new Car();

car.start();
```

</details>

### Exercise 3: Payment Method

Create a `PaymentMethod` base class that:

- Cannot be instantiated directly.
- Defines a `pay()` method that throws an error if it is not overridden.
- Has a `CashPayment` subclass that implements `pay()`.

<details>
<summary>Show solution</summary>

```js
class PaymentMethod {
  constructor() {
    if (new.target === PaymentMethod) {
      throw new Error(
        "PaymentMethod cannot be instantiated directly."
      );
    }
  }

  pay(amount) {
    throw new Error(
      "Subclasses must implement pay()."
    );
  }
}

class CashPayment extends PaymentMethod {
  pay(amount) {
    console.log(`Paid ${amount} in cash.`);
  }
}

const cash = new CashPayment();

cash.pay(100);
```

</details>

### Exercise 4: Identify the Principle

Consider the following code:

```js
class BankAccount {
  #balance = 500;

  getBalance() {
    return this.#balance;
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("Insufficient funds.");
      return;
    }

    this.#balance -= amount;
    console.log("Withdrawal successful.");
  }
}
```

Answer these questions:

1. Which part demonstrates encapsulation?
2. Which part demonstrates abstraction?
3. Why is `#balance` private?
4. Why can users call `withdraw()` without managing the balance calculation themselves?

<details>
<summary>Show solution</summary>

1. **Encapsulation:** `#balance` is private, so outside code cannot access it directly.
2. **Abstraction:** `withdraw()` provides a simple operation that hides the internal withdrawal steps.
3. `#balance` is private to protect the account's internal state from direct external modification.
4. The `withdraw()` method handles checking the balance and updating it internally.

</details>

---

## 12. Quick Revision

Before moving on, make sure you understand these points.

- [ ] Abstraction hides unnecessary implementation details.
- [ ] Abstraction focuses on what an object does rather than how it does it.
- [ ] Public methods provide the interface that users interact with.
- [ ] Private fields and methods can hide implementation details.
- [ ] JavaScript does not have a native `abstract` class keyword.
- [ ] Base classes and subclasses can be used to establish a common design.
- [ ] Abstraction and encapsulation are related but different.
- [ ] Abstraction can be used without inheritance.
- [ ] Good abstraction makes code easier to use and maintain.

## Final Summary

**Abstraction** is an OOP principle that simplifies how we interact with objects by exposing essential operations and hiding unnecessary implementation details.

In JavaScript, you can implement abstraction using public methods, private fields and methods, and common interfaces established through base classes and subclasses.

Remember:

> **Abstraction = expose what is necessary, hide unnecessary complexity.**

The next OOP concept to learn is **Polymorphism**, which explains how different objects can respond to the same method call in different ways.
