# Lesson 4: The Adapter Pattern in JavaScript

## 1. What Is the Adapter Pattern?

The **Adapter Pattern** is a structural design pattern that allows two incompatible interfaces to work together.

In simple words:

> An Adapter acts as a bridge between two objects that expect different interfaces.

Imagine you have an application that expects a method named `pay()`, but an external payment service provides a method named `makePayment()`.

Your application cannot use the external service directly without adapting its interface.

Instead of changing the external service or rewriting your application, you can create an Adapter that translates one interface into another.

### Real-world analogy

Imagine you have a laptop with a USB-C port, but your USB device uses a different connector.

You use an adapter to connect them.

The adapter doesn't need to change the laptop or the device. It allows them to work together despite their different interfaces.

The Adapter Pattern applies the same idea to software.

### Common use cases

- Integrating third-party APIs.
- Working with legacy code.
- Connecting services with different method names or data formats.
- Replacing an old implementation without rewriting the entire application.
- Making external libraries compatible with your own interfaces.

---

## 2. The Problem: Incompatible Interfaces

Imagine you're building an application that processes payments.

Your application expects every payment service to provide a `pay()` method.

First, let's create a payment service.

```js
class PaymentProcessor {
  pay(amount) {
    console.log(`Processing payment of $${amount}`);
  }
}

const processor = new PaymentProcessor();

processor.pay(100);

// Output:
// Processing payment of $100
```

This works because the class provides the method your application expects.

Now imagine you integrate an external payment service.

```js
class ExternalPaymentService {
  makePayment(amount) {
    console.log(`External service processing $${amount}`);
  }
}
```

Notice the difference:

- Your application expects `pay()`.
- The external service provides `makePayment()`.

Let's try using the external service directly.

```js
const externalService = new ExternalPaymentService();

externalService.pay(100);
```

This produces a `TypeError` because `pay()` does not exist on the external service.

JavaScript cannot automatically know that `makePayment()` is intended to perform the same operation.

We need a way to make the interfaces compatible.

That's where the Adapter Pattern helps.

---

## 3. Implementing the Adapter Pattern

Let's solve the problem step by step.

### Step 1: Keep the external service unchanged

```js
class ExternalPaymentService {
  makePayment(amount) {
    console.log(`External service processing $${amount}`);
  }
}
```

Suppose this class belongs to a third-party library.

We don't want to modify it because:

- We may not own its source code.
- Other parts of the application may depend on it.
- Updating the library could overwrite our changes.

Instead, we'll adapt it.

### Step 2: Create the Adapter class

```js
class PaymentAdapter {
  constructor(externalService) {
    this.externalService = externalService;
  }

  pay(amount) {
    this.externalService.makePayment(amount);
  }
}
```

Let's understand each part.

#### The constructor

```js
constructor(externalService) {
  this.externalService = externalService;
}
```

The Adapter receives an instance of the external service and stores it.

#### The `pay()` method

```js
pay(amount) {
  this.externalService.makePayment(amount);
}
```

Our application calls `pay()`, but the Adapter forwards that call to `makePayment()`.

The Adapter translates the interface expected by our application into the interface provided by the external service.

### Step 3: Use the Adapter

```js
const externalService = new ExternalPaymentService();

const payment = new PaymentAdapter(externalService);

payment.pay(100);

// Output:
// External service processing $100
```

Now the external service works with our application without changing its original class.

### What happened?

The application calls:

```js
payment.pay(100);
```

The Adapter then calls:

```js
this.externalService.makePayment(100);
```

The external service performs the operation.

**Key takeaway:** The Adapter changes how an object is accessed, not necessarily what the underlying object does.

---

## 4. Understanding the Adapter Structure

The Adapter Pattern commonly involves three parts.

| Component | Responsibility |
|---|---|
| Client | The code that wants to use a service. |
| Target interface | The interface the client expects. |
| Adaptee | The existing service with an incompatible interface. |
| Adapter | Translates the expected interface into the adaptee's interface. |

In our example:

- Client: The code calling `payment.pay(100)`.
- Target interface: An object that provides `pay()`.
- Adaptee: `ExternalPaymentService`.
- Adapter: `PaymentAdapter`.

JavaScript does not require a formal interface declaration for this pattern. The expected interface can simply be an agreed-upon set of method names.

---

## 5. A More Realistic Example: Notification Adapter

Imagine an application that sends notifications.

Your application expects every notification service to implement:

```js
send(message)
```

However, an external notification library uses:

```js
sendMessage(text)
```

We can create an Adapter to make them compatible.

### Step 1: Define the external service

```js
class ExternalNotificationService {
  sendMessage(text) {
    console.log(`External notification: ${text}`);
  }
}
```

### Step 2: Create the Adapter

```js
class NotificationAdapter {
  constructor(service) {
    this.service = service;
  }

  send(message) {
    this.service.sendMessage(message);
  }
}
```

### Step 3: Use it in the application

```js
const externalService = new ExternalNotificationService();

const notification = new NotificationAdapter(externalService);

notification.send("Your order has shipped!");

// Output:
// External notification: Your order has shipped!
```

The application uses `send()`, while the external service uses `sendMessage()`.

The Adapter bridges the difference.

---

## 6. Adapting Data Formats

The Adapter Pattern can also translate data, not just method names.

Suppose your application expects users in this format:

```js
{
  id: 1,
  fullName: "Ali Khan"
}
```

But an external API returns:

```js
{
  user_id: 1,
  first_name: "Ali",
  last_name: "Khan"
}
```

The property names and structure are different.

We can create a User Adapter.

### Implementation

```js
class UserAdapter {
  constructor(apiUser) {
    this.apiUser = apiUser;
  }

  getUser() {
    return {
      id: this.apiUser.user_id,
      fullName: `${this.apiUser.first_name} ${this.apiUser.last_name}`
    };
  }
}

const apiUser = {
  user_id: 1,
  first_name: "Ali",
  last_name: "Khan"
};

const adapter = new UserAdapter(apiUser);

console.log(adapter.getUser());

// Output:
// {
//   id: 1,
//   fullName: "Ali Khan"
// }
```

### How does it work?

The Adapter reads the external data format and produces the format our application expects.

```js
return {
  id: this.apiUser.user_id,
  fullName: `${this.apiUser.first_name} ${this.apiUser.last_name}`
};
```

This is useful when working with APIs that use different property names or response structures.

**Important:** An Adapter should perform only the translation needed to make the interfaces compatible. Business rules and unrelated application logic should generally remain in their appropriate layers.

---

## 7. Adapter vs. Factory vs. Builder

You've now learned three creational patterns and are beginning structural patterns.

These patterns solve different problems.

| Pattern | Category | Main purpose |
|---|---|---|
| Factory | Creational | Create the appropriate object. |
| Singleton | Creational | Share a particular instance. |
| Builder | Creational | Construct an object step by step. |
| Adapter | Structural | Make incompatible interfaces work together. |

### Factory example

```js
const notification = createNotification("email");
```

The Factory decides which object to create.

### Builder example

```js
const computer = new ComputerBuilder()
  .setRAM("32GB")
  .setStorage("2TB SSD")
  .build();
```

The Builder configures an object step by step.

### Adapter example

```js
const payment = new PaymentAdapter(externalService);

payment.pay(100);
```

The Adapter makes an existing service compatible with the interface expected by the application.

**Remember:**

- Factory: Create.
- Builder: Construct step by step.
- Adapter: Translate interfaces.

---

## 8. Advantages of the Adapter Pattern

### 1. Reuses existing code

You can integrate an existing class or external library without rewriting it.

### 2. Reduces changes to existing code

The Adapter can isolate compatibility logic in one place.

### 3. Improves integration

Different services can work together even when their interfaces differ.

### 4. Simplifies the client code

The client can use one consistent interface.

For example:

```js
payment.pay(100);
```

The client does not need to know whether the underlying service uses `pay()`, `makePayment()`, or another method.

### 5. Helps replace implementations

You can introduce a different external service by providing another compatible Adapter, provided it supports the same expected interface.

---

## 9. Disadvantages of the Adapter Pattern

### 1. Additional code

You may need to create and maintain extra classes.

For a simple one-line conversion, a standalone function may be enough.

### 2. More layers to understand

A method call may pass through an Adapter before reaching the actual service.

### 3. It cannot automatically fix every incompatibility

If two systems differ in authentication, business rules, data semantics, or error handling, simply renaming a method will not be sufficient.

The Adapter must translate the relevant differences correctly.

### 4. Poorly designed adapters can hide problems

An Adapter should not silently discard important information or pretend two operations are equivalent when they behave differently.

---

## 10. Common Mistakes

### Mistake 1: Changing the external service unnecessarily

If a third-party library already provides `makePayment()`, you usually don't need to rewrite the library just to add `pay()`.

An Adapter can keep the original implementation intact.

### Mistake 2: Calling the wrong method

This will fail:

```js
const service = new ExternalPaymentService();

service.pay(100);
```

The external service only implements `makePayment()`.

Use the Adapter instead:

```js
const service = new ExternalPaymentService();

const adapter = new PaymentAdapter(service);

adapter.pay(100);
```

### Mistake 3: Putting unrelated business logic into the Adapter

An Adapter should primarily translate between interfaces.

For example, calculating discounts, deciding whether a customer is eligible for a payment, and managing an order's business rules may belong elsewhere.

### Mistake 4: Using an Adapter when interfaces already match

If two objects already expose the interface the client needs, an Adapter might add unnecessary complexity.

Use the pattern when there is a genuine compatibility problem.

---

## 11. Practice Exercises

Try solving these exercises before revealing the solutions.

### Exercise 1: Payment Adapter

Create an `OldPaymentGateway` class with a method named:

```js
makePayment(amount)
```

Then create a `PaymentAdapter` that exposes:

```js
pay(amount)
```

Your Adapter should call `makePayment()` internally.

Expected usage:

```js
const gateway = new OldPaymentGateway();

const payment = new PaymentAdapter(gateway);

payment.pay(250);

// Expected output:
// Old gateway processing payment of $250
```

<details>
  <summary>Show solution</summary>

  ```js
  class OldPaymentGateway {
    makePayment(amount) {
      console.log(
        `Old gateway processing payment of $${amount}`
      );
    }
  }

  class PaymentAdapter {
    constructor(gateway) {
      this.gateway = gateway;
    }

    pay(amount) {
      this.gateway.makePayment(amount);
    }
  }

  const gateway = new OldPaymentGateway();

  const payment = new PaymentAdapter(gateway);

  payment.pay(250);

  // Output:
  // Old gateway processing payment of $250
  ```

</details>

### Exercise 2: User Data Adapter

An external API returns users in this format:

```js
const apiUser = {
  user_id: 5,
  first_name: "Sara",
  last_name: "Ahmed",
  email_address: "sara@example.com"
};
```

Your application expects this format:

```js
{
  id: 5,
  name: "Sara Ahmed",
  email: "sara@example.com"
}
```

Create a `UserAdapter` class that converts the API data into the expected structure.

<details>
  <summary>Show solution</summary>

  ```js
  class UserAdapter {
    constructor(apiUser) {
      this.apiUser = apiUser;
    }

    getUser() {
      return {
        id: this.apiUser.user_id,
        name: `${this.apiUser.first_name} ${this.apiUser.last_name}`,
        email: this.apiUser.email_address
      };
    }
  }

  const apiUser = {
    user_id: 5,
    first_name: "Sara",
    last_name: "Ahmed",
    email_address: "sara@example.com"
  };

  const adapter = new UserAdapter(apiUser);

  console.log(adapter.getUser());

  // Output:
  // {
  //   id: 5,
  //   name: "Sara Ahmed",
  //   email: "sara@example.com"
  // }
  ```

</details>

### Exercise 3: Notification Adapter

An existing service provides this method:

```js
sendMessage(text, priority)
```

Your application expects:

```js
send(message)
```

Build an Adapter that calls `sendMessage()` with the message and a default priority of `"normal"`.

<details>
  <summary>Show solution</summary>

  ```js
  class ExistingNotificationService {
    sendMessage(text, priority) {
      console.log(`[${priority}] ${text}`);
    }
  }

  class NotificationAdapter {
    constructor(service) {
      this.service = service;
    }

    send(message) {
      this.service.sendMessage(message, "normal");
    }
  }

  const service = new ExistingNotificationService();

  const notification = new NotificationAdapter(service);

  notification.send("Your order has shipped!");

  // Output:
  // [normal] Your order has shipped!
  ```

</details>

---

## 12. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Adapter? | Structural. |
| What is its main purpose? | Make incompatible interfaces work together. |
| What is an adaptee? | The existing object whose interface needs adapting. |
| What does the Adapter do? | Translates calls or data into the form the client expects. |
| Does the Adapter require inheritance? | No. It can use composition by holding a reference to another object. |
| When should you use it? | When integrating existing code with an incompatible interface. |
| Should every method call use an Adapter? | No. Use it when it solves a real compatibility problem. |

---

## 13. What's Next?

You've now learned four design patterns:

1. **Factory** — create the appropriate object.
2. **Singleton** — share one instance.
3. **Builder** — construct objects step by step.
4. **Adapter** — make incompatible interfaces work together.

The next pattern is:

### Lesson 5: The Decorator Pattern

The Decorator Pattern is a structural design pattern that adds behavior to an object without changing its original class.

For example, imagine a basic coffee object. You can add milk, sugar, or extra espresso to enhance its behavior or cost without creating a separate class for every possible combination.

Once you're comfortable with Adapter, continue with the Decorator Pattern.
