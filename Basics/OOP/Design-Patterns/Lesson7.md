# Lesson 8: The Strategy Pattern in JavaScript

## 1. What Is the Strategy Pattern?

The **Strategy Pattern** is a behavioral design pattern that lets you define multiple algorithms, place each algorithm in its own object or function, and switch between them without changing the code that uses them.

In simple words:

> The Strategy Pattern lets you choose how something is done without changing the code that uses it.

Imagine an online shopping application that supports different payment methods:

- Credit card
- PayPal
- Bank transfer

Each payment method performs the same general task—paying for an order—but uses a different process.

Instead of writing all the payment logic inside one large `if...else` statement, you can implement each payment method as a separate strategy.

### Real-world use cases

- Payment methods
- Shipping cost calculations
- Discount algorithms
- Sorting algorithms
- Authentication methods
- Image compression
- Route planning
- Tax calculations

---

## 2. The Problem: Too Many Conditional Statements

Imagine you are building a shopping application.

The application supports three payment methods.

A first attempt might look like this:

```js
class PaymentService {
  pay(method, amount) {
    if (method === "credit-card") {
      console.log(`Paid $${amount} using credit card.`);
    } else if (method === "paypal") {
      console.log(`Paid $${amount} using PayPal.`);
    } else if (method === "bank-transfer") {
      console.log(`Paid $${amount} using bank transfer.`);
    } else {
      throw new Error("Unsupported payment method.");
    }
  }
}

const payment = new PaymentService();

payment.pay("credit-card", 100);
payment.pay("paypal", 200);
```

Output:

```text
Paid $100 using credit card.
Paid $200 using PayPal.
```

This works, but consider what happens when you add:

- Apple Pay
- Google Pay
- Cryptocurrency payments
- A new payment provider

You must keep modifying the `pay()` method.

As the number of algorithms grows, the conditional logic becomes harder to maintain and test.

The Strategy Pattern moves each algorithm into its own strategy.

---

## 3. Understand the Structure

The Strategy Pattern usually has three main participants.

| Participant | Responsibility |
|---|---|
| Strategy | Defines the operation that interchangeable algorithms provide. |
| Concrete strategy | Implements one specific algorithm. |
| Context | Uses the selected strategy without needing to know its internal implementation. |

For our payment example:

- `PaymentStrategy` describes the expected payment operation.
- `CreditCardStrategy`, `PayPalStrategy`, and `BankTransferStrategy` implement different payment methods.
- `PaymentService` uses whichever strategy is selected.

JavaScript does not require a formal interface or abstract class for this pattern. We can use classes, functions, or objects that follow the same expected contract.

---

## 4. Implement the Strategy Pattern Step by Step

### Step 1: Define the strategy contract

JavaScript does not have a built-in `interface` keyword like TypeScript.

We can document the expected method by using a base class.

```js
class PaymentStrategy {
  pay(amount) {
    throw new Error("The pay() method must be implemented.");
  }
}
```

This base class describes the operation each payment strategy should provide.

If a subclass doesn't override `pay()`, the error helps identify the problem.

A base class is optional in JavaScript; the same design can be implemented with objects or functions.

### Step 2: Create concrete strategies

Each strategy implements the same operation differently.

#### Credit card strategy

```js
class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using credit card.`);
  }
}
```

#### PayPal strategy

```js
class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using PayPal.`);
  }
}
```

#### Bank transfer strategy

```js
class BankTransferStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using bank transfer.`);
  }
}
```

Each strategy follows the same method contract:

```js
pay(amount)
```

However, each class can provide its own implementation.

### Step 3: Create the context

The context uses a strategy instead of implementing every payment algorithm itself.

```js
class PaymentService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  pay(amount) {
    if (!this.strategy) {
      throw new Error("A payment strategy is required.");
    }

    return this.strategy.pay(amount);
  }
}
```

Let's understand the important parts.

The constructor receives a strategy:

```js
constructor(strategy) {
  this.strategy = strategy;
}
```

The `setStrategy()` method allows the strategy to change later:

```js
setStrategy(strategy) {
  this.strategy = strategy;
}
```

The `pay()` method delegates the operation:

```js
pay(amount) {
  if (!this.strategy) {
    throw new Error("A payment strategy is required.");
  }

  return this.strategy.pay(amount);
}
```

Notice that `PaymentService` doesn't need a large conditional statement.

It simply calls the selected strategy.

### Step 4: Use the strategies

```js
const creditCard = new CreditCardStrategy();
const paypal = new PayPalStrategy();
const bankTransfer = new BankTransferStrategy();

const payment = new PaymentService(creditCard);

payment.pay(100);

payment.setStrategy(paypal);
payment.pay(200);

payment.setStrategy(bankTransfer);
payment.pay(300);
```

Output:

```text
Paid $100 using credit card.
Paid $200 using PayPal.
Paid $300 using bank transfer.
```

The same `PaymentService` uses three different strategies.

We changed the behavior without rewriting the context.

---

## 5. The Complete Payment Example

Here is the complete implementation in one place.

```js
class PaymentStrategy {
  pay(amount) {
    throw new Error("The pay() method must be implemented.");
  }
}

class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using credit card.`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using PayPal.`);
  }
}

class BankTransferStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using bank transfer.`);
  }
}

class PaymentService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  pay(amount) {
    if (!this.strategy) {
      throw new Error("A payment strategy is required.");
    }

    return this.strategy.pay(amount);
  }
}

const payment = new PaymentService(
  new CreditCardStrategy()
);

payment.pay(100);

payment.setStrategy(new PayPalStrategy());
payment.pay(200);

payment.setStrategy(new BankTransferStrategy());
payment.pay(300);
```

**Important:** This is a demonstration of interchangeable algorithms, not a real payment processor. Real payment integrations require secure provider APIs, validation, error handling, and appropriate handling of sensitive payment information.

---

## 6. A Simpler Strategy Pattern Using Functions

In JavaScript, strategies do not always need to be classes.

Functions are first-class values, so you can pass them as strategies directly.

Let's calculate discounts for an online store.

### Without the Strategy Pattern

```js
function calculatePrice(price, discountType) {
  if (discountType === "regular") {
    return price;
  }

  if (discountType === "student") {
    return price * 0.9;
  }

  if (discountType === "premium") {
    return price * 0.8;
  }

  throw new Error("Unknown discount type.");
}

console.log(calculatePrice(100, "student"));
```

Output:

```text
90
```

### With the Strategy Pattern

First, define the discount strategies.

```js
const regularDiscount = price => price;

const studentDiscount = price => price * 0.9;

const premiumDiscount = price => price * 0.8;
```

Each function represents a different algorithm.

Next, create a context that accepts a strategy.

```js
function calculatePrice(price, discountStrategy) {
  return discountStrategy(price);
}
```

Finally, use the desired strategy.

```js
console.log(calculatePrice(100, regularDiscount));
console.log(calculatePrice(100, studentDiscount));
console.log(calculatePrice(100, premiumDiscount));
```

Output:

```text
100
90
80
```

The caller chooses the algorithm by passing a function.

There is no need for a `discountType` conditional inside `calculatePrice()`.

### Why is this useful?

You can introduce a new discount algorithm without modifying `calculatePrice()`.

```js
const holidayDiscount = price => price * 0.75;

console.log(calculatePrice(100, holidayDiscount));
```

Output:

```text
75
```

This is one of the most natural ways to use the Strategy Pattern in JavaScript.

---

## 7. A Practical Example: Shipping Cost Calculator

Suppose an online store offers three shipping methods:

- Standard shipping
- Express shipping
- Overnight shipping

Each method calculates the shipping cost differently.

### Step 1: Create the strategies

```js
const standardShipping = order =>
  order.weight * 2;

const expressShipping = order =>
  order.weight * 5;

const overnightShipping = order =>
  order.weight * 10;
```

For this example, the formulas use a simplified rate per unit of weight.

### Step 2: Create the context

```js
class ShippingCalculator {
  calculate(order, strategy) {
    return strategy(order);
  }
}
```

The calculator does not know how each strategy calculates its cost.

It simply calls the provided function.

### Step 3: Use the strategies

```js
const calculator = new ShippingCalculator();

const order = {
  weight: 4
};

console.log(
  calculator.calculate(order, standardShipping)
);

console.log(
  calculator.calculate(order, expressShipping)
);

console.log(
  calculator.calculate(order, overnightShipping)
);
```

Output:

```text
8
20
40
```

The algorithm changes according to the selected function.

**Design lesson:** The context knows what operation it needs, but the strategy determines how that operation is performed.

---

## 8. Strategy Pattern vs. Factory Pattern

You have already learned the Factory Pattern.

Both patterns can involve selecting between different implementations, but their purposes are different.

| Feature | Factory | Strategy |
|---|---|---|
| Category | Creational | Behavioral |
| Main purpose | Encapsulates object creation. | Encapsulates interchangeable algorithms. |
| Main question | Which object should be created? | Which behavior or algorithm should be used? |
| Typical example | Create a `PayPalPayment` object. | Choose a discount calculation algorithm. |
| Focus | Object creation. | Behavior selection. |

### Factory example

```js
function createPaymentMethod(type) {
  if (type === "card") {
    return new CreditCardStrategy();
  }

  if (type === "paypal") {
    return new PayPalStrategy();
  }

  throw new Error("Unknown payment method.");
}
```

The Factory creates the selected object.

### Strategy example

```js
const payment = new PaymentService(
  new CreditCardStrategy()
);

payment.pay(100);
```

The Strategy Pattern allows the context to use a selected behavior.

**Important:** Factory and Strategy can work together. A Factory can create a strategy, which is then passed to a context.

---

## 9. Strategy Pattern vs. State Pattern

The Strategy and State Patterns can look very similar because both can use interchangeable objects.

However, they address different design problems.

| Feature | Strategy | State |
|---|---|---|
| Main purpose | Choose an algorithm. | Change behavior based on an object's state. |
| Who typically selects the behavior? | The client or calling code. | The current state or the context's state-transition logic. |
| Typical example | Select a shipping method. | An order changes from pending to shipped. |
| Main focus | How an operation is performed. | How behavior changes as state changes. |

For example:

```js
calculator.calculate(order, expressShipping);
```

This explicitly selects a shipping algorithm.

A State Pattern example might change an order's behavior when its state changes from `Pending` to `Shipped`.

These patterns have similar structures but different intentions.

---

## 10. Advantages of the Strategy Pattern

### 1. Replaces complicated conditionals

Separate algorithms into independent implementations rather than keeping every algorithm inside one large method.

### 2. Makes algorithms interchangeable

You can change the strategy without rewriting the context.

### 3. Improves testability

Each strategy can be tested independently.

For example:

```js
const studentDiscount = price => price * 0.9;

console.assert(studentDiscount(100) === 90);
```

### 4. Supports extension

New strategies can often be added without modifying existing context code.

### 5. Encourages composition

Instead of relying on inheritance to vary behavior, the context receives the behavior it needs.

---

## 11. Disadvantages of the Strategy Pattern

### 1. More objects or functions

For a very simple problem, creating several strategy classes may be unnecessary.

A small function can be enough.

### 2. The client must choose a strategy

The calling code needs a way to decide which strategy to pass.

### 3. Strategies need a compatible contract

If the context expects `pay(amount)`, each strategy must provide a compatible `pay()` method.

### 4. Additional complexity

A simple conditional with two stable cases may be easier to understand than a full strategy architecture.

Use the pattern when the algorithms are meaningful, likely to change, or useful to test independently.

---

## 12. Common Mistakes

### Mistake 1: Keeping all the conditionals inside the context

This defeats the main purpose of the pattern.

Avoid:

```js
class PaymentService {
  pay(method, amount) {
    if (method === "card") {
      // Card algorithm.
    } else if (method === "paypal") {
      // PayPal algorithm.
    }
  }
}
```

Prefer delegating the operation to a strategy.

### Mistake 2: Giving every strategy a different interface

If the context expects:

```js
strategy.pay(amount);
```

then a strategy that only provides:

```js
strategy.makePayment(amount);
```

won't work without an adapter or some other adjustment.

Keep strategy interfaces compatible.

### Mistake 3: Using classes when simple functions would work

In JavaScript, a function can be a perfectly good strategy.

```js
const double = value => value * 2;

const applyStrategy = (value, strategy) =>
  strategy(value);

console.log(applyStrategy(5, double));
```

Output:

```text
10
```

Don't add classes just because you're implementing a design pattern.

### Mistake 4: Making strategies depend unnecessarily on the context

A strategy should generally perform its own algorithm rather than reach into the context to manipulate unrelated internal properties.

Passing the required data as arguments often keeps the design simpler.

### Mistake 5: Forgetting to validate input

The Strategy Pattern doesn't automatically validate data.

For example, a shipping calculator might need to reject negative weights before applying a strategy.

---

## 13. Practice Exercises

Try each exercise before opening its solution.

### Exercise 1: Calculator Strategies

Create three functions:

- `add(a, b)`
- `subtract(a, b)`
- `multiply(a, b)`

Create a function called `calculate(a, b, strategy)` that uses the supplied strategy.

Example:

```js
console.log(calculate(10, 5, add));
console.log(calculate(10, 5, subtract));
console.log(calculate(10, 5, multiply));
```

Expected output:

```text
15
5
50
```

<details>
  <summary>Show solution</summary>

  ```js
  const add = (a, b) => a + b;

  const subtract = (a, b) => a - b;

  const multiply = (a, b) => a * b;

  function calculate(a, b, strategy) {
    return strategy(a, b);
  }

  console.log(calculate(10, 5, add));
  console.log(calculate(10, 5, subtract));
  console.log(calculate(10, 5, multiply));
  ```

</details>

### Exercise 2: Notification Strategies

Create two notification strategies:

- `emailNotification(message)`
- `smsNotification(message)`

Create a `NotificationService` class that receives a notification strategy and calls it through a `send(message)` method.

Expected output:

```text
Sending email: Hello!
Sending SMS: Hello!
```

<details>
  <summary>Show solution</summary>

  ```js
  class NotificationService {
    constructor(strategy) {
      this.strategy = strategy;
    }

    setStrategy(strategy) {
      this.strategy = strategy;
    }

    send(message) {
      if (typeof this.strategy !== "function") {
        throw new Error("A valid notification strategy is required.");
      }

      return this.strategy(message);
    }
  }

  const emailNotification = message => {
    console.log(`Sending email: ${message}`);
  };

  const smsNotification = message => {
    console.log(`Sending SMS: ${message}`);
  };

  const notifications = new NotificationService(
    emailNotification
  );

  notifications.send("Hello!");

  notifications.setStrategy(smsNotification);
  notifications.send("Hello!");
  ```

</details>

### Exercise 3: Discount Calculator

Create these discount strategies:

- Regular discount: no discount.
- Student discount: 10% off.
- Premium discount: 20% off.
- Holiday discount: 25% off.

Create a `DiscountCalculator` class that accepts a strategy and calculates the final price.

For a starting price of `200`, your results should be:

| Strategy | Expected final price |
|---|---:|
| Regular | 200 |
| Student | 180 |
| Premium | 160 |
| Holiday | 150 |

<details>
  <summary>Show solution</summary>

  ```js
  const regularDiscount = price => price;

  const studentDiscount = price => price * 0.9;

  const premiumDiscount = price => price * 0.8;

  const holidayDiscount = price => price * 0.75;

  class DiscountCalculator {
    constructor(strategy) {
      this.strategy = strategy;
    }

    calculate(price) {
      if (typeof this.strategy !== "function") {
        throw new Error("A valid discount strategy is required.");
      }

      return this.strategy(price);
    }

    setStrategy(strategy) {
      this.strategy = strategy;
    }
  }

  const calculator = new DiscountCalculator(regularDiscount);

  console.log(calculator.calculate(200));

  calculator.setStrategy(studentDiscount);
  console.log(calculator.calculate(200));

  calculator.setStrategy(premiumDiscount);
  console.log(calculator.calculate(200));

  calculator.setStrategy(holidayDiscount);
  console.log(calculator.calculate(200));
  ```

</details>

---

## 14. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Strategy? | Behavioral. |
| What is its main purpose? | Encapsulate interchangeable algorithms. |
| What does the context do? | Uses the selected strategy. |
| Can strategies be functions? | Yes. |
| Does JavaScript require an interface? | No. A compatible method or function contract is enough. |
| How is Strategy different from Factory? | Factory focuses on object creation; Strategy focuses on behavior. |
| How is Strategy different from State? | Strategy selects an algorithm; State models behavior associated with changing state. |
| When should you use it? | When multiple algorithms should be interchangeable without complicating the context. |

---

## 15. Design Patterns Learned So Far

You have now learned eight design patterns.

| Pattern | Category | Main purpose |
|---|---|---|
| Factory | Creational | Encapsulate object creation. |
| Singleton | Creational | Provide one shared instance. |
| Builder | Creational | Construct complex objects step by step. |
| Adapter | Structural | Make incompatible interfaces work together. |
| Decorator | Structural | Add behavior by wrapping objects. |
| Facade | Structural | Simplify access to a complicated subsystem. |
| Observer | Behavioral | Notify multiple observers about events. |
| Strategy | Behavioral | Make algorithms interchangeable. |

### Remember these three

- **Observer:** Notify multiple listeners.
- **Strategy:** Switch between algorithms.
- **Facade:** Simplify a complicated subsystem.

---

## 16. What's Next?

### Lesson 9: The Command Pattern

The Command Pattern is a behavioral design pattern that encapsulates a request as an object.

Instead of calling an operation directly, you represent the request as a command that can be executed later.

For example, a text editor might use commands for:

- Copy
- Paste
- Undo
- Redo

You can also use commands for task queues, job scheduling, and application actions.
