# Lesson 7: The Observer Pattern in JavaScript

## 1. What Is the Observer Pattern?

The **Observer Pattern** is a behavioral design pattern in which one object notifies multiple other objects when something changes or an event occurs.

In simple words:

> The Observer Pattern allows multiple objects to listen for updates from another object without needing to know the internal details of each listener.

Imagine subscribing to a YouTube channel.

When the channel publishes a new video, its subscribers receive notifications. The channel doesn't need to know how each subscriber handles the notification.

The Observer Pattern uses a similar idea.

### Real-world examples

- A notification system alerts users when a new message arrives.
- A news service notifies subscribers when a new article is published.
- A stock price tracker updates multiple displays when a price changes.
- A user interface updates when application data changes.
- An event system notifies multiple listeners when a button is clicked.

### The main participants

| Participant | Responsibility |
|---|---|
| Subject / Publisher | Maintains a list of observers and notifies them. |
| Observer / Subscriber | Receives notifications from the subject. |
| Concrete Observer | Implements what happens when an update arrives. |
| Client | Creates the subject and observers and connects them. |

Different implementations use different names. For example, `EventEmitter` often uses the terms *event emitter* and *listener*.

---

## 2. The Problem: Tightly Coupled Code

Imagine building a news application.

Whenever a new article is published, you want to:

1. Notify subscribers.
2. Update the news feed.
3. Record an analytics event.

A simple implementation might look like this:

```js
class NewsPublisher {
  publish(article) {
    console.log(`New article: ${article}`);

    // Notify subscribers.
    console.log("Sending subscriber notifications...");

    // Update the news feed.
    console.log("Updating the news feed...");

    // Record analytics.
    console.log("Recording analytics...");
  }
}

const news = new NewsPublisher();

news.publish("JavaScript Design Patterns");
```

This works, but the publisher knows every action that must happen after publication.

What if you later need to add:

- Mobile notifications?
- An email newsletter?
- A search index update?
- A recommendation service?

You might keep modifying `NewsPublisher`.

This creates unnecessary coupling between the publisher and every feature that reacts to an article being published.

**The problem:** The publisher should not need to know every component that wants to respond to an event.

The Observer Pattern addresses this problem by allowing observers to subscribe independently.

---

## 3. Build an Observer Pattern From Scratch

Let's implement the pattern step by step.

### Step 1: Create the Subject

The subject maintains a collection of observers.

It needs three important methods:

- `subscribe()` — adds an observer.
- `unsubscribe()` — removes an observer.
- `notify()` — sends an update to all observers.

```js
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(
      item => item !== observer
    );
  }

  notify(data) {
    this.observers.forEach(observer => {
      observer.update(data);
    });
  }
}
```

Let's understand each method.

#### `subscribe(observer)`

```js
subscribe(observer) {
  this.observers.push(observer);
}
```

Adds an observer to the list.

That observer will receive future notifications.

#### `unsubscribe(observer)`

```js
unsubscribe(observer) {
  this.observers = this.observers.filter(
    item => item !== observer
  );
}
```

Removes the specified observer from the list.

The observer will no longer receive notifications from this subject.

#### `notify(data)`

```js
notify(data) {
  this.observers.forEach(observer => {
    observer.update(data);
  });
}
```

Calls `update()` on every registered observer and passes along the supplied data.

Each observer decides what to do with that data.

### Step 2: Create the observers

Let's create two observers that react differently to the same event.

```js
class EmailSubscriber {
  update(article) {
    console.log(`Email notification: ${article}`);
  }
}

class FeedSubscriber {
  update(article) {
    console.log(`Adding to news feed: ${article}`);
  }
}
```

Both classes implement an `update()` method.

JavaScript doesn't require them to inherit from a shared Observer class. They simply need to provide the method that the subject expects.

This is an example of **duck typing**: if an object provides the required behavior, it can be used.

### Step 3: Connect the observers

```js
const newsPublisher = new Subject();

const emailSubscriber = new EmailSubscriber();
const feedSubscriber = new FeedSubscriber();

newsPublisher.subscribe(emailSubscriber);
newsPublisher.subscribe(feedSubscriber);
```

Now the subject has two observers.

### Step 4: Notify the observers

```js
newsPublisher.notify("JavaScript Design Patterns");
```

Output:

```text
Email notification: JavaScript Design Patterns
Adding to news feed: JavaScript Design Patterns
```

The subject does not need to know the details of either subscriber.

It only knows that each observer provides an `update()` method.

### Step 5: Unsubscribe an observer

```js
newsPublisher.unsubscribe(emailSubscriber);

newsPublisher.notify("Understanding the Observer Pattern");
```

Output:

```text
Adding to news feed: Understanding the Observer Pattern
```

The email subscriber no longer receives updates.

The feed subscriber continues receiving them.

**Important:** The order of notifications in this implementation follows the order in which observers were added. Other Observer implementations may behave differently.

---

## 4. The Complete Implementation

Here is the entire example in one place.

```js
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(
      item => item !== observer
    );
  }

  notify(data) {
    this.observers.forEach(observer => {
      observer.update(data);
    });
  }
}

class EmailSubscriber {
  update(article) {
    console.log(`Email notification: ${article}`);
  }
}

class FeedSubscriber {
  update(article) {
    console.log(`Adding to news feed: ${article}`);
  }
}

const publisher = new Subject();

const email = new EmailSubscriber();
const feed = new FeedSubscriber();

publisher.subscribe(email);
publisher.subscribe(feed);

publisher.notify("First article");

publisher.unsubscribe(email);

publisher.notify("Second article");
```

Output:

```text
Email notification: First article
Adding to news feed: First article
Adding to news feed: Second article
```

Notice how the second notification reaches only the feed subscriber.

---

## 5. A More Practical Example: A Stock Price Tracker

Let's build a small stock price tracker.

Whenever the stock price changes, multiple components can respond:

- A price display shows the new price.
- An alert checks whether the price reaches a target.

### Step 1: Create a stock subject

```js
class Stock {
  constructor(symbol, price) {
    this.symbol = symbol;
    this.price = price;
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(
      item => item !== observer
    );
  }

  setPrice(newPrice) {
    this.price = newPrice;

    this.notify({
      symbol: this.symbol,
      price: this.price
    });
  }

  notify(data) {
    this.observers.forEach(observer => {
      observer.update(data);
    });
  }
}
```

The `setPrice()` method changes the price and then notifies the observers.

### Step 2: Create the observers

```js
class PriceDisplay {
  update(stock) {
    console.log(
      `${stock.symbol} current price: $${stock.price}`
    );
  }
}

class PriceAlert {
  constructor(targetPrice) {
    this.targetPrice = targetPrice;
  }

  update(stock) {
    if (stock.price >= this.targetPrice) {
      console.log(
        `Alert: ${stock.symbol} reached $${this.targetPrice} or higher!`
      );
    }
  }
}
```

Each observer responds differently to the same stock update.

### Step 3: Subscribe and publish updates

```js
const stock = new Stock("ABC", 90);

const display = new PriceDisplay();
const alert = new PriceAlert(100);

stock.subscribe(display);
stock.subscribe(alert);

stock.setPrice(95);
stock.setPrice(105);
```

Output:

```text
ABC current price: $95
ABC current price: $105
Alert: ABC reached $100 or higher!
```

At `$95`, only the display reports the price.

At `$105`, both observers respond.

The stock doesn't need to know what either observer does with the update.

This is the main advantage of the pattern.

---

## 6. Observer Pattern vs. Event-Driven Programming

The Observer Pattern is closely related to event-driven programming, but the concepts are not identical.

**Observer Pattern:** A design approach in which a subject notifies registered observers.

**Event-driven programming:** A broader programming style in which components respond to events.

For example, a button click can trigger an event handler:

```js
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

This is event-driven programming.

The event listener mechanism has similarities to the Observer Pattern because handlers register interest in an event and are called when it occurs.

However, not every event-driven architecture is a textbook implementation of the Observer Pattern.

---

## 7. Observer Pattern vs. Pub/Sub

These two approaches are related, but there is an important distinction.

| Feature | Observer | Pub/Sub |
|---|---|---|
| Communication | Subject notifies its registered observers. | Publishers send events through an event channel or broker. |
| Main relationship | The subject generally knows its observers. | Publishers and subscribers can be independent of each other. |
| Routing | Often directly managed by the subject. | Often managed through event names or topics. |
| Example | A stock object notifies its display and alert objects. | An event bus distributes `"stockUpdated"` events to listeners. |

In a simple Observer implementation, the subject holds references to its observers.

In Pub/Sub, a publisher might publish an event without knowing which subscribers will receive it.

In practice, the terminology sometimes overlaps, and libraries may combine ideas from both patterns.

---

## 8. Using JavaScript's Built-In EventTarget

You don't always need to implement the Observer Pattern manually.

JavaScript provides `EventTarget`, which can be used to register event listeners and dispatch events.

```js
const news = new EventTarget();

function emailListener(event) {
  console.log(`Email: ${event.detail.title}`);
}

function feedListener(event) {
  console.log(`Feed: ${event.detail.title}`);
}

news.addEventListener("articlePublished", emailListener);
news.addEventListener("articlePublished", feedListener);

news.dispatchEvent(
  new CustomEvent("articlePublished", {
    detail: {
      title: "Learning JavaScript"
    }
  })
);
```

Output:

```text
Email: Learning JavaScript
Feed: Learning JavaScript
```

To remove a listener, pass the same event type and function reference:

```js
news.removeEventListener("articlePublished", emailListener);
```

You can then dispatch another event:

```js
news.dispatchEvent(
  new CustomEvent("articlePublished", {
    detail: {
      title: "Design Patterns"
    }
  })
);
```

Only the remaining feed listener responds.

**Note:** `CustomEvent` and `EventTarget` are widely available in modern browsers and supported by modern Node.js versions. Older environments may require a different event mechanism.

---

## 9. Advantages of the Observer Pattern

### 1. Loose coupling

The subject doesn't need to know the implementation details of its observers.

### 2. Easy to add new observers

You can introduce a new observer without rewriting the subject, as long as it follows the expected interface.

### 3. Dynamic subscriptions

Observers can subscribe and unsubscribe while the application is running.

### 4. Supports one-to-many communication

One event can notify multiple components.

### 5. Encourages the Open/Closed Principle

The system can often be extended with new observers without modifying the existing subject's core logic.

---

## 10. Disadvantages of the Observer Pattern

### 1. Notifications can be difficult to trace

A single event might trigger many observers, making it harder to understand the full execution flow.

### 2. Forgotten subscriptions can cause problems

An observer that should no longer be active may continue receiving events if it is never unsubscribed.

In long-running applications, this can also keep objects reachable longer than intended.

### 3. Notification order may matter

If one observer changes data that another observer reads, the order of execution can affect the result.

Avoid relying on notification order unless your implementation explicitly guarantees it.

### 4. Errors can interrupt notifications

In the simple synchronous implementation, if one observer throws an error, later observers may not be notified.

Real systems may need error isolation, logging, or asynchronous event handling.

### 5. Too many events can hurt performance

Notifying a large number of observers very frequently can become expensive.

Use the pattern where its flexibility is useful rather than for every change in the application.

---

## 11. Common Mistakes

### Mistake 1: Subscribing the same observer multiple times

Our basic `subscribe()` method permits duplicate subscriptions.

```js
publisher.subscribe(emailSubscriber);
publisher.subscribe(emailSubscriber);
```

That observer will receive the same notification twice.

One possible improvement is to use a `Set`:

```js
class Subject {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify(data) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}
```

A `Set` prevents the same object reference from being added more than once.

### Mistake 2: Forgetting to unsubscribe

If an observer no longer needs updates, remove it.

```js
publisher.unsubscribe(emailSubscriber);
```

Otherwise, it can continue receiving notifications.

### Mistake 3: Making the subject depend on concrete observers

Avoid writing code like this inside the subject:

```js
// Avoid tightly coupling the subject to specific classes.
if (observer instanceof EmailSubscriber) {
  // Special email handling.
}
```

The subject should generally call the shared method expected from its observers.

### Mistake 4: Confusing an observer with an observable

An **observer** receives updates.

A **subject**, sometimes called an observable, maintains observers and sends updates.

The exact terminology depends on the library or implementation, so focus on the roles each object plays.

---

## 12. Practice Exercises

Try these exercises before opening the solutions.

### Exercise 1: Weather Station

Create a `WeatherStation` class with:

- `subscribe(observer)`
- `unsubscribe(observer)`
- `setTemperature(temperature)`
- `notify()`

Then create two observers:

- `TemperatureDisplay`, which prints the temperature.
- `TemperatureLogger`, which prints a message that the temperature was recorded.

When the temperature changes, both observers should receive the update.

Expected output when the temperature is set to `28`:

```text
Current temperature: 28°C
Temperature 28°C recorded.
```

<details>
  <summary>Show solution</summary>

  ```js
  class WeatherStation {
    constructor() {
      this.observers = new Set();
      this.temperature = 0;
    }

    subscribe(observer) {
      this.observers.add(observer);
    }

    unsubscribe(observer) {
      this.observers.delete(observer);
    }

    setTemperature(temperature) {
      this.temperature = temperature;
      this.notify();
    }

    notify() {
      for (const observer of this.observers) {
        observer.update(this.temperature);
      }
    }
  }

  class TemperatureDisplay {
    update(temperature) {
      console.log(`Current temperature: ${temperature}°C`);
    }
  }

  class TemperatureLogger {
    update(temperature) {
      console.log(`Temperature ${temperature}°C recorded.`);
    }
  }

  const station = new WeatherStation();

  station.subscribe(new TemperatureDisplay());
  station.subscribe(new TemperatureLogger());

  station.setTemperature(28);
  ```

</details>

### Exercise 2: Chat Room Notifications

Create a `ChatRoom` class that allows users to subscribe and unsubscribe.

When a new message is sent, all subscribed users should receive it.

Create a `User` class with:

- A constructor accepting a username.
- An `update(message)` method that prints the username and message.

Expected output:

```text
Alex received: Hello everyone!
Sam received: Hello everyone!
```

<details>
  <summary>Show solution</summary>

  ```js
  class ChatRoom {
    constructor() {
      this.users = new Set();
    }

    subscribe(user) {
      this.users.add(user);
    }

    unsubscribe(user) {
      this.users.delete(user);
    }

    sendMessage(message) {
      for (const user of this.users) {
        user.update(message);
      }
    }
  }

  class User {
    constructor(username) {
      this.username = username;
    }

    update(message) {
      console.log(`${this.username} received: ${message}`);
    }
  }

  const chatRoom = new ChatRoom();

  const alex = new User("Alex");
  const sam = new User("Sam");

  chatRoom.subscribe(alex);
  chatRoom.subscribe(sam);

  chatRoom.sendMessage("Hello everyone!");
  ```

</details>

### Exercise 3: Improve the Subject

Take the original `Subject` implementation and improve it so that:

1. Duplicate observers are prevented.
2. An observer can be removed.
3. The subject doesn't crash or stop notifying other observers if one observer throws an error.

Hint: Use a `Set` and a `try...catch` inside the notification loop.

<details>
  <summary>Show solution</summary>

  ```js
  class Subject {
    constructor() {
      this.observers = new Set();
    }

    subscribe(observer) {
      this.observers.add(observer);
    }

    unsubscribe(observer) {
      this.observers.delete(observer);
    }

    notify(data) {
      for (const observer of this.observers) {
        try {
          observer.update(data);
        } catch (error) {
          console.error("Observer update failed:", error);
        }
      }
    }
  }
  ```

  This implementation isolates synchronous errors thrown by individual observers. It does not automatically catch errors from asynchronous operations started by an observer.

</details>

---

## 13. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Observer? | Behavioral. |
| What is its main purpose? | Notify multiple observers when an event or change occurs. |
| What does the subject do? | Maintains observers and notifies them. |
| What does an observer do? | Reacts to updates. |
| How do you add an observer? | Call `subscribe()`. |
| How do you remove an observer? | Call `unsubscribe()`. |
| What is the difference between Observer and Pub/Sub? | Observer commonly connects a subject directly to its observers; Pub/Sub commonly uses an intermediary event channel. |
| Does JavaScript support event listeners? | Yes. APIs such as `EventTarget` provide event-listener functionality. |

---

## 14. Design Patterns Learned So Far

You have now learned seven design patterns.

| Pattern | Category | Main purpose |
|---|---|---|
| Factory | Creational | Create objects without exposing all creation details. |
| Singleton | Creational | Provide one shared instance. |
| Builder | Creational | Construct complex objects step by step. |
| Adapter | Structural | Make incompatible interfaces work together. |
| Decorator | Structural | Add behavior by wrapping objects. |
| Facade | Structural | Simplify access to a complicated subsystem. |
| Observer | Behavioral | Notify multiple observers when an event occurs. |

### A simple way to remember Observer

Think:

**One subject → Many observers → One update can trigger many responses.**

The subject publishes a change, and each subscribed observer decides how to respond.

---

## 15. What's Next?

### Lesson 8: The Strategy Pattern

The Strategy Pattern is a behavioral design pattern that lets you define multiple algorithms, encapsulate each one, and switch between them without putting every algorithm inside one large conditional statement.

For example, a shopping application might support:

- Credit card payments.
- PayPal payments.
- Bank transfer payments.

Instead of placing all payment logic inside one enormous `if...else` block, you can create separate strategies and select the one you need.

In the next lesson, we'll implement the Strategy Pattern in JavaScript, compare it with the Factory Pattern, and practice replacing conditional logic with interchangeable strategies.
