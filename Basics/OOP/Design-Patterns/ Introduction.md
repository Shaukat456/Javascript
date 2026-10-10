# Common Software Design Patterns in JavaScript

Now that you've learned OOP and its four pillars, the next step is learning Software Design Patterns.

Design patterns are reusable ways to solve common problems in software development. They help you organize code so it is easier to understand, maintain, and extend.

We'll learn them one at a time, with simple JavaScript examples, real-world analogies, and practice exercises.

## 1. What is a design pattern?

A design pattern is a proven approach to a recurring software design problem.

Imagine you're building an application. You need to manage user settings, create different types of notifications, or let several components react when something changes.

Instead of inventing a new structure every time, you can use a design pattern that fits the problem.

A design pattern is not a library or a piece of code you must copy. It's a general solution that you adapt to your application.

## 2. The three main categories

Most classic design patterns are grouped into three categories.

### 1. Creational patterns


Concerned with how objects are created.

Examples: Factory, Singleton, Builder.

### 2. Structural patterns

Concerned with how classes and objects are organized together.

Examples: Adapter, Decorator, Facade.

### 3. Behavioral patterns

Concerned with how objects communicate and distribute responsibilities.

Examples: Observer, Strategy, Command.

## 3. Common design patterns you should learn

| Pattern | Category | Main idea |
|---|---|---|
| Factory | Creational | Create objects without exposing all creation details. |
| Singleton | Creational | Provide one shared instance when that restriction is appropriate. |
| Builder | Creational | Construct complex objects step by step. |
| Adapter | Structural | Make incompatible interfaces work together. |
| Decorator | Structural | Add behavior to an object without changing its original class. |
| Facade | Structural | Provide a simple interface to a complicated subsystem. |
| Observer | Behavioral | Notify subscribers when something changes. |
| Strategy | Behavioral | Swap between different algorithms or behaviors. |
| Command | Behavioral | Represent an action as an object. |
| State | Behavioral | Change an object's behavior according to its current state. |

You don't need to memorize all of these immediately. Understanding the problem each pattern solves is more useful than memorizing its name.

# Lesson 1: The Factory Pattern

Let's start with the Factory Pattern, one of the easiest patterns to understand.

## 4. What is the Factory Pattern?

The Factory Pattern centralizes object creation so the calling code doesn't need to know all the details of how an object is constructed.

In simple words:

> Instead of creating objects directly everywhere, you use a function or class responsible for creating the appropriate objects.

### Real-world analogy

Imagine a restaurant.

You order a pizza, burger, or sandwich. You don't need to manage every preparation step yourself. The kitchen takes your order and prepares the requested item.

A factory in programming serves a similar purpose: you request an object, and the factory creates the appropriate type.

## 5. Without the Factory Pattern

Imagine an application that creates different notifications.

```js
class EmailNotification {
  send(message) {
    console.log(`Email: ${message}`);
  }
}

class SMSNotification {
  send(message) {
    console.log(`SMS: ${message}`);
  }
}

const notificationType = "email";

let notification;

if (notificationType === "email") {
  notification = new EmailNotification();
} else if (notificationType === "sms") {
  notification = new SMSNotification();
}

notification.send("Your order has shipped!");
```

**Output:**

```text
Email: Your order has shipped!
```

This works. However, if several parts of your application need to create notifications, the same selection logic may get repeated.

## 6. With the Factory Pattern

We can move the creation logic into one place.

```js
class EmailNotification {
  send(message) {
    console.log(`Email: ${message}`);
  }
}

class SMSNotification {
  send(message) {
    console.log(`SMS: ${message}`);
  }
}

function createNotification(type) {
  if (type === "email") {
    return new EmailNotification();
  }

  if (type === "sms") {
    return new SMSNotification();
  }

  throw new Error(`Unknown notification type: ${type}`);
}

const notification = createNotification("email");

notification.send("Your order has shipped!");
```

**Output:**

```text
Email: Your order has shipped!
```

The important change is this line:

```js
const notification = createNotification("email");
```

The calling code requests a notification without constructing the concrete class itself.

The factory handles the selection and creation.

## 7. Understanding the code step by step

### Step 1: Define the products

```js
class EmailNotification {
  send(message) {
    console.log(`Email: ${message}`);
  }
}

class SMSNotification {
  send(message) {
    console.log(`SMS: ${message}`);
  }
}
```

These classes represent the different kinds of objects the application can create.

### Step 2: Create the factory function

```js
function createNotification(type) {
  if (type === "email") {
    return new EmailNotification();
  }

  if (type === "sms") {
    return new SMSNotification();
  }

  throw new Error(`Unknown notification type: ${type}`);
}
```

The factory decides which object to return.

### Step 3: Request an object

```js
const notification = createNotification("sms");
```

The factory returns an `SMSNotification` object.

### Step 4: Use the object

```js
notification.send("Hello!");
```

**Output:**

```text
SMS: Hello!
```

Notice that the calling code can use the returned object without needing to repeat the creation logic.

## 8. When should you use the Factory Pattern?

It is useful when:

- You need to create different object types based on input or configuration.
- Object creation involves enough logic that centralizing it improves clarity.
- Several parts of your application need the same creation rules.
- You want the calling code to depend less on concrete constructors.

You don't need a factory for every object. For a simple object with a straightforward constructor, using `new MyClass()` directly is often clearer.

## 9. Practice exercises

Try these before revealing the solutions.

### Exercise 1: Payment Factory

Create two classes:

- `CashPayment`, with a `pay()` method that prints `"Paid with cash"`.
- `CardPayment`, with a `pay()` method that prints `"Paid with card"`.

Then write a `createPayment(type)` factory function that returns the correct object.

<details>
  <summary>Check my solution</summary>

  Or reveal a sample solution:

  <details>
    <summary>Show solution</summary>

    ```js
    class CashPayment {
      pay() {
        console.log("Paid with cash");
      }
    }

    class CardPayment {
      pay() {
        console.log("Paid with card");
      }
    }

    function createPayment(type) {
      if (type === "cash") {
        return new CashPayment();
      }

      if (type === "card") {
        return new CardPayment();
      }

      throw new Error(`Unknown payment type: ${type}`);
    }

    const payment = createPayment("card");

    payment.pay();

    // Output:
    // Paid with card
    ```

  </details>
</details>

## 10. What's next?

A good learning order is:

1. Factory — create the right object.
2. Singleton — manage a shared instance.
3. Builder — construct complex objects step by step.
4. Adapter — make incompatible interfaces work together.
5. Decorator — add behavior dynamically.
6. Facade — simplify a complicated subsystem.
7. Observer — notify interested objects about changes.
8. Strategy — switch between interchangeable behaviors.
9. Command — represent actions as objects.
10. State — change behavior based on an object's state.

