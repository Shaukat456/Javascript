# Lesson 13: Mediator Pattern in JavaScript

## 1. What Is the Mediator Pattern?

The **Mediator Pattern** is a behavioral design pattern that centralizes communication between multiple objects so they don't need to communicate with one another directly.

In simple words:

> Instead of objects talking to each other directly, they communicate through a mediator that coordinates their interactions.

Imagine an airport.

Pilots don't independently coordinate every other aircraft in the sky. Air traffic control helps coordinate takeoffs, landings, and movements.

The mediator acts like that central coordinator.

### Real-world examples

- A chat room that routes messages between users.
- An air traffic control system coordinating aircraft.
- A form that coordinates interactions between input fields.
- A game controller coordinating characters and game events.
- A checkout system coordinating payments, inventory, and order confirmation.

## 2. The Problem Without the Mediator Pattern

Imagine we're building a chat application with three users.

Each user needs to send messages to the other users.

Without a mediator, each user might need references to every other user.

```js
class User {
  constructor(name) {
    this.name = name;
    this.contacts = [];
  }

  addContact(user) {
    this.contacts.push(user);
  }

  sendMessage(message) {
    for (const contact of this.contacts) {
      contact.receiveMessage(message, this);
    }
  }

  receiveMessage(message, sender) {
    console.log(
      `${this.name} received from ${sender.name}: ${message}`
    );
  }
}

const ali = new User("Ali");
const sara = new User("Sara");
const ahmed = new User("Ahmed");

ali.addContact(sara);
ali.addContact(ahmed);

sara.addContact(ali);
sara.addContact(ahmed);

ahmed.addContact(ali);
ahmed.addContact(sara);

ali.sendMessage("Hello, everyone!");
```

This can work, but there are problems.

- Each user manages a list of other users.
- Adding or removing users requires updating relationships.
- Communication logic is spread across individual objects.
- More complex rules can make the relationships difficult to maintain.

As the number of objects grows, managing all their connections becomes harder.

This is sometimes described as a **many-to-many dependency problem**.

The Mediator Pattern gives these objects a central point for coordinating communication.

## 3. The Core Idea

Instead of every user knowing every other user, each user knows only the chat room.

```text
            Chat Room
           /    |    \
          /     |     \
       Ali     Sara   Ahmed
```

The chat room acts as the mediator.

When Ali sends a message:

1. Ali sends the message to the chat room.
2. The chat room determines who should receive it.
3. The chat room delivers the message to the appropriate users.

The users no longer need to manage direct connections with one another.

## 4. Build a Simple Mediator

Let's implement a chat room that coordinates communication.

### Step 1: Create the mediator

```js
class ChatRoom {
  constructor() {
    this.users = [];
  }

  register(user) {
    this.users.push(user);
    user.chatRoom = this;
  }

  sendMessage(message, sender) {
    for (const user of this.users) {
      if (user !== sender) {
        user.receiveMessage(message, sender);
      }
    }
  }
}
```

Let's understand the methods.

**`register(user)`**

Adds a user to the chat room and gives that user a reference to the room.

**`sendMessage(message, sender)`**

The mediator sends a message to every registered user except the sender.

The chat room decides how the communication should happen.

### Step 2: Create the colleague objects

Objects that communicate through a mediator are often called **colleagues**.

In this example, the users are colleagues.

```js
class User {
  constructor(name) {
    this.name = name;
    this.chatRoom = null;
  }

  sendMessage(message) {
    if (!this.chatRoom) {
      throw new Error("User is not registered in a chat room.");
    }

    this.chatRoom.sendMessage(message, this);
  }

  receiveMessage(message, sender) {
    console.log(
      `${this.name} received from ${sender.name}: ${message}`
    );
  }
}
```

Notice that `User` doesn't keep a list of other users.

It only knows about the mediator.

### Step 3: Connect everything

```js
const chatRoom = new ChatRoom();

const ali = new User("Ali");
const sara = new User("Sara");
const ahmed = new User("Ahmed");

chatRoom.register(ali);
chatRoom.register(sara);
chatRoom.register(ahmed);

ali.sendMessage("Hello, everyone!");
```

Output:

```text
Sara received from Ali: Hello, everyone!
Ahmed received from Ali: Hello, everyone!
```

The users communicate through the chat room, not directly with each other.

## 5. Understand the Roles

The Mediator Pattern usually has two important roles.

| Role | Responsibility | Our example |
|---|---|---|
| Mediator | Coordinates communication | `ChatRoom` |
| Colleague | Participates in communication | `User` |

The mediator owns the coordination logic.

The colleagues perform their own responsibilities and delegate communication to the mediator.

This separation is the key to understanding the pattern.

## 6. Improve the Chat Room

Our first implementation works, but it has some limitations.

For example:

- The same user could be registered more than once.
- We have no way to unregister a user.
- Messages cannot be sent privately.
- The mediator doesn't keep track of message history.

Let's improve it.

```js
class ChatRoom {
  #users = [];
  #history = [];

  register(user) {
    if (this.#users.includes(user)) {
      return;
    }

    this.#users.push(user);
    user.chatRoom = this;
  }

  unregister(user) {
    this.#users = this.#users.filter(
      registeredUser => registeredUser !== user
    );

    if (user.chatRoom === this) {
      user.chatRoom = null;
    }
  }

  sendMessage(message, sender) {
    if (!this.#users.includes(sender)) {
      throw new Error("Sender is not registered in this chat room.");
    }

    const record = {
      sender: sender.name,
      message,
      type: "public",
    };

    this.#history.push(record);

    for (const user of this.#users) {
      if (user !== sender) {
        user.receiveMessage(message, sender);
      }
    }
  }

  sendPrivateMessage(message, sender, recipient) {
    if (
      !this.#users.includes(sender) ||
      !this.#users.includes(recipient)
    ) {
      throw new Error("Both users must be registered in this chat room.");
    }

    if (sender === recipient) {
      throw new Error("You cannot send a private message to yourself.");
    }

    this.#history.push({
      sender: sender.name,
      recipient: recipient.name,
      message,
      type: "private",
    });

    recipient.receiveMessage(message, sender);
  }

  getHistory() {
    return this.#history.map(record => ({ ...record }));
  }
}
```

Now update the `User` class.

```js
class User {
  constructor(name) {
    this.name = name;
    this.chatRoom = null;
  }

  sendMessage(message) {
    if (!this.chatRoom) {
      throw new Error("User is not registered in a chat room.");
    }

    this.chatRoom.sendMessage(message, this);
  }

  sendPrivateMessage(message, recipient) {
    if (!this.chatRoom) {
      throw new Error("User is not registered in a chat room.");
    }

    this.chatRoom.sendPrivateMessage(
      message,
      this,
      recipient
    );
  }

  receiveMessage(message, sender) {
    console.log(
      `${this.name} received from ${sender.name}: ${message}`
    );
  }
}
```

### Try it out

```js
const room = new ChatRoom();

const ali = new User("Ali");
const sara = new User("Sara");
const ahmed = new User("Ahmed");

room.register(ali);
room.register(sara);
room.register(ahmed);

ali.sendMessage("Hello, everyone!");

sara.sendPrivateMessage("Hi Ali!", ali);

console.log(room.getHistory());
```

Output from message delivery:

```text
Sara received from Ali: Hello, everyone!
Ahmed received from Ali: Hello, everyone!
Ali received from Sara: Hi Ali!
```

The history stores information about both public and private messages. In a production application, private message history would require careful access control so users cannot read messages that aren't intended for them.

## 7. A Practical Example: Form Mediator

The Mediator Pattern isn't limited to chat rooms.

Imagine a registration form with three fields:

- Username
- Password
- Confirm password

We want the form to coordinate validation rather than having each field directly control the others.

Here's a simplified example.

```js
class RegistrationForm {
  constructor() {
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
  }

  setUsername(username) {
    this.username = username;
    return this.validate();
  }

  setPassword(password) {
    this.password = password;
    return this.validate();
  }

  setConfirmPassword(password) {
    this.confirmPassword = password;
    return this.validate();
  }

  validate() {
    return {
      usernameValid: this.username.trim().length >= 3,
      passwordValid: this.password.length >= 8,
      passwordsMatch:
        this.password === this.confirmPassword &&
        this.confirmPassword.length > 0,
    };
  }
}

const form = new RegistrationForm();

console.log(form.setUsername("Ali"));
console.log(form.setPassword("securepass123"));
console.log(form.setConfirmPassword("securepass123"));
```

The form coordinates the validation rules and provides one place to maintain them.

This is a simple demonstration. A real form would also need to manage UI updates, error messages, submission, and appropriate security measures.

## 8. Mediator vs. Observer

You already learned the Observer Pattern, so it's important to understand the difference.

Both patterns help manage communication, but their primary purposes are different.

| Feature | Mediator | Observer |
|---|---|---|
| Main purpose | Coordinate interactions between objects | Notify subscribers when an event occurs |
| Central component | Mediator | Subject or event source |
| Typical communication | Colleagues communicate through the mediator | Subject notifies observers |
| Decision-making | Often coordinates who communicates and what happens next | Usually broadcasts an event to subscribers |
| Example | Chat room routing messages | Newsletter notifying subscribers |

### Observer example

A news publisher announces a new article to its subscribers.

```js
class NewsPublisher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  publish(article) {
    for (const subscriber of this.subscribers) {
      subscriber(article);
    }
  }
}

const publisher = new NewsPublisher();

publisher.subscribe(article => {
  console.log(`Subscriber A received: ${article}`);
});

publisher.subscribe(article => {
  console.log(`Subscriber B received: ${article}`);
});

publisher.publish("A new article is available!");
```

The publisher broadcasts an update to its subscribers.

### Mediator example

In the chat room, the mediator decides which users receive a message.

```js
chatRoom.sendMessage("Hello!", ali);
```

The chat room coordinates delivery according to its rules.

**Remember:**

- Observer focuses on notifying interested parties.
- Mediator focuses on coordinating interactions between colleagues.

They can also be combined. For example, a mediator might use events to notify the user interface when a chat message arrives.

## 9. Advantages of the Mediator Pattern

### 1. Reduces direct dependencies

Objects don't need to know about every other object they interact with.

### 2. Centralizes coordination

Communication rules can live in one place.

### 3. Improves maintainability

Changing how messages are routed may require changes to the mediator rather than every colleague.

### 4. Encourages reusable components

A colleague can be easier to reuse because it depends on the mediator interface rather than many specific colleagues.

### 5. Supports complex interactions

The mediator can coordinate workflows involving several objects and conditions.

## 10. Disadvantages of the Mediator Pattern

### 1. The mediator can become too large

If every business rule is placed in one mediator, it can turn into a complicated class that is difficult to understand.

This is sometimes called a *god object* problem.

### 2. It adds another component

For simple communication between two objects, a mediator may add unnecessary complexity.

### 3. It can hide relationships

When objects communicate indirectly, following the execution flow may require understanding the mediator's rules.

### 4. The mediator can become a bottleneck

If one mediator handles too many responsibilities, changing or testing it can become difficult.

**Best practice:** Keep the mediator focused on coordination. Move unrelated business logic into separate classes or services.

## 11. Common Mistakes

### Mistake 1: Colleagues still communicate directly

If every user still maintains a list of other users and sends messages directly, the mediator isn't providing much benefit.

Prefer this:

```js
this.chatRoom.sendMessage(message, this);
```

Rather than maintaining direct references to every recipient.

### Mistake 2: Putting everything inside the mediator

A mediator should coordinate interactions, not necessarily perform every task in the application.

For example, payment calculations, database access, and inventory management may belong in separate services.

### Mistake 3: Forgetting validation

The mediator should verify that the sender and recipient are allowed participants before processing a message.

Never assume an object is registered simply because it calls a method.

### Mistake 4: Creating a mediator for every tiny interaction

If two simple objects can communicate cleanly without creating tight coupling, a mediator may not be necessary.

Use the pattern when coordination complexity justifies it.

## 12. Practice Exercises

Try solving these exercises before opening the solutions.

### Exercise 1: Build a Simple Chat Room

Create two classes:

- `ChatRoom`
- `User`

Requirements:

- Register users in the room.
- Let users send public messages.
- Deliver each message to every registered user except the sender.
- Users must communicate through the chat room.

<details>
<summary>Show solution</summary>

```js
class ChatRoom {
  constructor() {
    this.users = [];
  }

  register(user) {
    if (!this.users.includes(user)) {
      this.users.push(user);
      user.chatRoom = this;
    }
  }

  sendMessage(message, sender) {
    if (!this.users.includes(sender)) {
      throw new Error("Sender is not registered.");
    }

    for (const user of this.users) {
      if (user !== sender) {
        user.receiveMessage(message, sender);
      }
    }
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.chatRoom = null;
  }

  sendMessage(message) {
    if (!this.chatRoom) {
      throw new Error("Join a chat room first.");
    }

    this.chatRoom.sendMessage(message, this);
  }

  receiveMessage(message, sender) {
    console.log(
      `${this.name} received from ${sender.name}: ${message}`
    );
  }
}

const room = new ChatRoom();

const ali = new User("Ali");
const sara = new User("Sara");

room.register(ali);
room.register(sara);

ali.sendMessage("Hello, Sara!");
```

Output:

```text
Sara received from Ali: Hello, Sara!
```

</details>

### Exercise 2: Add Private Messages

Extend the chat room so a user can send a message to one specific registered user.

Requirements:

- Add a `sendPrivateMessage()` method to the mediator.
- Add a corresponding method to `User`.
- Only the recipient should receive the private message.
- Reject senders and recipients who aren't registered.

<details>
<summary>Show solution</summary>

Add this method to `ChatRoom`:

```js
sendPrivateMessage(message, sender, recipient) {
  if (
    !this.users.includes(sender) ||
    !this.users.includes(recipient)
  ) {
    throw new Error("Both users must be registered.");
  }

  if (sender === recipient) {
    throw new Error("Sender and recipient must be different.");
  }

  recipient.receiveMessage(message, sender);
}
```

Add this method to `User`:

```js
sendPrivateMessage(message, recipient) {
  if (!this.chatRoom) {
    throw new Error("Join a chat room first.");
  }

  this.chatRoom.sendPrivateMessage(
    message,
    this,
    recipient
  );
}
```

Usage:

```js
ali.sendPrivateMessage("Can we talk?", sara);
```

Only Sara receives the message. This example assumes both users belong to the same room.

</details>

### Exercise 3: Build a Smart Home Mediator

Imagine a smart home with three devices:

- `Light`
- `AirConditioner`
- `SecuritySystem`

Create a `SmartHomeMediator` class that coordinates them.

Requirements:

- When the security system is activated, turn off the light and air conditioner.
- Devices should notify the mediator rather than directly controlling one another.
- Add console messages so you can observe the behavior.

<details>
<summary>Show solution</summary>

```js
class SmartHomeMediator {
  constructor() {
    this.light = null;
    this.airConditioner = null;
    this.securitySystem = null;
  }

  registerDevices({ light, airConditioner, securitySystem }) {
    this.light = light;
    this.airConditioner = airConditioner;
    this.securitySystem = securitySystem;
  }

  notify(sender, event) {
    if (
      sender === this.securitySystem &&
      event === "security-activated"
    ) {
      this.light.turnOff();
      this.airConditioner.turnOff();
    }
  }
}

class Light {
  constructor(mediator) {
    this.mediator = mediator;
    this.isOn = true;
  }

  turnOff() {
    this.isOn = false;
    console.log("Light turned off.");
  }
}

class AirConditioner {
  constructor(mediator) {
    this.mediator = mediator;
    this.isOn = true;
  }

  turnOff() {
    this.isOn = false;
    console.log("Air conditioner turned off.");
  }
}

class SecuritySystem {
  constructor(mediator) {
    this.mediator = mediator;
    this.isActive = false;
  }

  activate() {
    this.isActive = true;
    console.log("Security system activated.");

    this.mediator.notify(this, "security-activated");
  }
}

const mediator = new SmartHomeMediator();

const light = new Light(mediator);
const airConditioner = new AirConditioner(mediator);
const securitySystem = new SecuritySystem(mediator);

mediator.registerDevices({
  light,
  airConditioner,
  securitySystem,
});

securitySystem.activate();
```

Output:

```text
Security system activated.
Light turned off.
Air conditioner turned off.
```

The mediator coordinates the devices without requiring the security system to know how to operate the light or air conditioner.

</details>

## 13. Final Recap

You have learned:

- What the Mediator Pattern is.
- How direct dependencies can make object interactions harder to maintain.
- How a mediator centralizes communication.
- The roles of mediators and colleagues.
- How to build a chat room using the pattern.
- How to coordinate form validation and smart-home devices.
- The difference between the Mediator and Observer Patterns.
- The advantages, limitations, and common implementation mistakes.

**The most important takeaway:**

The Mediator Pattern reduces direct communication between objects by giving them a central coordinator that manages their interactions.

Use it when communication between several objects becomes complicated—not simply because you want to add another class.

## 14. What's Next?

**Lesson 14: Memento Pattern**

You'll learn how to capture and restore an object's previous state without unnecessarily exposing its internal details.

We'll build examples such as an undo feature for a text editor and explore how the Memento Pattern differs from the Command Pattern.
