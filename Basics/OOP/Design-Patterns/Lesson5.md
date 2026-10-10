# Lesson 6: The Facade Pattern in JavaScript

## 1. What Is the Facade Pattern?

The **Facade Pattern** is a structural design pattern that provides a simple, unified interface to a complicated subsystem.

In simple words:

> A Facade hides unnecessary complexity and gives the user one simple way to interact with multiple components.

Imagine you have several classes responsible for different tasks. Instead of requiring the client to understand and call every class individually, you create a Facade that coordinates them behind the scenes.

### Real-world analogy

Imagine starting a home theater system.

To watch a movie, you might need to:

- Turn on the television.
- Turn on the sound system.
- Select the correct input.
- Start the media player.

Without a Facade, you would need to manage every step yourself.

With a Facade, you could simply call:

```js
homeTheater.startMovieMode();
```

The Facade handles the remaining steps.

### Common use cases

- Simplifying complicated APIs.
- Coordinating multiple services.
- Simplifying application startup.
- Managing payment workflows.
- Hiding complex library implementations.
- Providing a simple interface to legacy systems.

---

## 2. The Problem: Too Many Subsystems

Imagine you're building an online shopping application.

When a customer places an order, several operations must happen:

1. Validate the order.
2. Process the payment.
3. Update inventory.
4. Send a confirmation email.

You might have a separate class for each operation.

```js
class OrderValidator {
  validate(order) {
    console.log("Validating order...");
    return true;
  }
}

class PaymentService {
  processPayment(order) {
    console.log("Processing payment...");
    return true;
  }
}

class InventoryService {
  updateInventory(order) {
    console.log("Updating inventory...");
  }
}

class EmailService {
  sendConfirmation(order) {
    console.log("Sending confirmation email...");
  }
}
```

Each class has its own responsibility.

That separation is good design.

However, the client must understand how to coordinate all these classes.

Without a Facade, the client might look like this:

```js
const validator = new OrderValidator();
const payment = new PaymentService();
const inventory = new InventoryService();
const email = new EmailService();

const order = {
  id: 101,
  total: 250
};

if (validator.validate(order)) {
  if (payment.processPayment(order)) {
    inventory.updateInventory(order);
    email.sendConfirmation(order);
  }
}
```

The client needs to know:

- Which services to create.
- Which methods to call.
- The correct order of operations.
- How the different services work together.

As the application grows, this coordination code may become difficult to maintain.

The Facade Pattern gives the client a simpler interface.

---

## 3. Implementing the Facade Pattern

Let's build an `OrderFacade` that coordinates the services.

### Step 1: Create the subsystem classes

```js
class OrderValidator {
  validate(order) {
    console.log("Validating order...");
    return order.total > 0;
  }
}

class PaymentService {
  processPayment(order) {
    console.log(`Processing payment of $${order.total}...`);
    return true;
  }
}

class InventoryService {
  updateInventory(order) {
    console.log(`Updating inventory for order ${order.id}...`);
  }
}

class EmailService {
  sendConfirmation(order) {
    console.log(`Sending confirmation for order ${order.id}...`);
  }
}
```

These classes represent the subsystem.

Each class has one primary responsibility.

Notice that `OrderValidator` now checks whether the order total is positive.

The other services simulate their operations using console messages.

### Step 2: Create the Facade

```js
class OrderFacade {
  constructor() {
    this.validator = new OrderValidator();
    this.payment = new PaymentService();
    this.inventory = new InventoryService();
    this.email = new EmailService();
  }

  placeOrder(order) {
    console.log("Starting order process...");

    if (!this.validator.validate(order)) {
      console.log("Order validation failed.");
      return false;
    }

    if (!this.payment.processPayment(order)) {
      console.log("Payment failed.");
      return false;
    }

    this.inventory.updateInventory(order);
    this.email.sendConfirmation(order);

    console.log("Order completed successfully.");

    return true;
  }
}
```

The Facade creates and coordinates the subsystem services.

The `placeOrder()` method provides one simple entry point.

The client no longer needs to know every implementation detail.

### Step 3: Use the Facade

```js
const orderFacade = new OrderFacade();

const order = {
  id: 101,
  total: 250
};

orderFacade.placeOrder(order);
```

**Output:**

```text
Starting order process...
Validating order...
Processing payment of $250...
Updating inventory for order 101...
Sending confirmation for order 101...
Order completed successfully.
```

The client only needs to call:

```js
orderFacade.placeOrder(order);
```

The Facade coordinates the remaining operations.

**Important:** This example is a learning simulation. A real payment and order system would also need transaction handling, persistent inventory updates, error recovery, and safeguards against duplicate processing.

---

## 4. Understanding the Structure

The Facade Pattern has three main parts.

### 1. Client

The code that wants to perform an operation.

```js
orderFacade.placeOrder(order);
```

The client uses the Facade rather than coordinating all the subsystem classes itself.

### 2. Facade

The class that exposes the simplified interface.

```js
class OrderFacade {
  placeOrder(order) {
    // Coordinate subsystem operations.
  }
}
```

The Facade knows which operations to call and in what order.

### 3. Subsystem

The classes that perform the actual work.

```js
OrderValidator
PaymentService
InventoryService
EmailService
```

The subsystem classes retain their own responsibilities.

### Architecture diagram

```text
             Client
               |
               v
          OrderFacade
               |
       +-------+-------+
       |       |       |
       v       v       v
   Validator Payment Inventory
               |
               v
          EmailService
```

The diagram is simplified. In an actual implementation, the Facade can coordinate all four services independently.

The important relationship is that the client communicates through the Facade, which delegates work to the subsystem.

---

## 5. A Smaller Example: Computer Startup

Let's use another example to make the pattern easier to understand.

Starting a computer may involve:

- Initializing the CPU.
- Checking memory.
- Loading the operating system.

### Step 1: Create subsystem classes

```js
class CPU {
  start() {
    console.log("CPU started.");
  }
}

class Memory {
  check() {
    console.log("Memory checked.");
  }
}

class OperatingSystem {
  load() {
    console.log("Operating system loaded.");
  }
}
```

Each class handles a different task.

### Step 2: Create the Facade

```js
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.os = new OperatingSystem();
  }

  startComputer() {
    this.cpu.start();
    this.memory.check();
    this.os.load();

    console.log("Computer is ready.");
  }
}
```

### Step 3: Use the Facade

```js
const computer = new ComputerFacade();

computer.startComputer();
```

**Output:**

```text
CPU started.
Memory checked.
Operating system loaded.
Computer is ready.
```

The client doesn't need to know how to initialize each component.

It simply calls:

```js
computer.startComputer();
```

This is the core idea of the Facade Pattern.

---

## 6. Facade Pattern vs. Adapter Pattern

Both Facade and Adapter are structural design patterns, but they solve different problems.

| Feature | Facade | Adapter |
|---|---|---|
| Main purpose | Simplifies a complicated subsystem. | Makes incompatible interfaces work together. |
| Main problem | Too much complexity for the client. | Two components expect different interfaces. |
| What it provides | A simpler interface. | A compatible interface. |
| Typical example | One method starts a computer. | A wrapper converts one payment API to another. |
| Does it need to change the subsystem? | Usually not. | Usually not. |

### Facade example

```js
computer.startComputer();
```

The Facade simplifies multiple operations into one entry point.

### Adapter example

```js
const payment = new PaymentAdapter(oldPaymentSystem);

payment.pay(100);
```

The Adapter translates one interface into another.

**Remember:**

- Facade simplifies.
- Adapter translates.

---

## 7. Facade Pattern vs. Decorator Pattern

You have also learned the Decorator Pattern.

The two patterns wrap or interact with objects in different ways.

| Feature | Facade | Decorator |
|---|---|---|
| Main purpose | Simplify access to a subsystem. | Add behavior to an existing object. |
| Main technique | Coordinate several components behind one interface. | Wrap an object and delegate calls while extending behavior. |
| Typical use | Simplifying a checkout workflow. | Adding logging to a service. |
| Main benefit | Reduces complexity for the client. | Enables flexible behavior composition. |

A Facade doesn't necessarily wrap a single object or preserve the same interface as its subsystem.

A Decorator typically preserves the wrapped object's interface so it can be used in its place.

---

## 8. Advantages of the Facade Pattern

### 1. Simplifies the client code

The client doesn't need to coordinate every subsystem.

### 2. Reduces coupling

The client depends on the Facade instead of directly managing all the underlying components.

### 3. Centralizes coordination

The Facade can keep the sequence of operations in one place.

### 4. Makes the application easier to use

A complicated collection of methods can be exposed through a small number of high-level operations.

### 5. Can hide implementation details

The subsystem can evolve internally while the Facade continues to provide the same public interface, provided its behavior remains compatible.

---

## 9. Disadvantages of the Facade Pattern

### 1. The Facade can become too large

If you put every application operation into one Facade, it may become a class with too many responsibilities.

Consider creating separate Facades for different workflows when appropriate.

For example:

```text
OrderFacade
UserAccountFacade
ReportingFacade
```

### 2. It may hide important details

A simplified interface can make complex behavior easier to use, but the client may still need access to lower-level functionality in some situations.

### 3. It does not automatically make operations safe

A Facade that coordinates payment, inventory, and email does not automatically provide database transactions, rollback, retries, or consistency guarantees.

Those behaviors must be designed separately.

### 4. It can become an unnecessary layer

If a subsystem is already simple, adding a Facade may add complexity instead of reducing it.

Use the pattern when it provides a meaningful simplification.

---

## 10. Common Mistakes

### Mistake 1: Putting all business logic into the Facade

The Facade should coordinate subsystem operations, not necessarily implement every underlying responsibility itself.

Prefer this:

```js
class OrderFacade {
  constructor() {
    this.validator = new OrderValidator();
    this.payment = new PaymentService();
  }

  placeOrder(order) {
    if (!this.validator.validate(order)) {
      return false;
    }

    return this.payment.processPayment(order);
  }
}
```

Instead of building one giant method that handles validation rules, payment implementation, inventory calculations, and email formatting.

### Mistake 2: Making the subsystem dependent on the Facade

The Facade should generally depend on the subsystem, not the other way around.

This helps keep subsystem components independently reusable.

### Mistake 3: Assuming a Facade removes the need for error handling

The Facade must still handle or propagate failures appropriately.

For example, if payment fails, the workflow should not continue as though payment succeeded.

### Mistake 4: Creating a Facade for everything

Not every class needs a Facade.

Use one when several components form a complicated workflow or when a simpler public interface provides real value.

---

## 11. Practice Exercises

Try solving these exercises before looking at the solutions.

### Exercise 1: Smart Home Facade

Create three classes:

- `Light` with `turnOn()`.
- `AirConditioner` with `turnOn()`.
- `Television` with `turnOn()`.

Then create a `SmartHomeFacade` that initializes these objects and exposes one method:

```js
startEveningMode()
```

Calling the method should turn on all three devices.

Expected output:

```text
Light is on.
Air conditioner is on.
Television is on.
Evening mode activated.
```

<details>
  <summary>Show solution</summary>

  ```js
  class Light {
    turnOn() {
      console.log("Light is on.");
    }
  }

  class AirConditioner {
    turnOn() {
      console.log("Air conditioner is on.");
    }
  }

  class Television {
    turnOn() {
      console.log("Television is on.");
    }
  }

  class SmartHomeFacade {
    constructor() {
      this.light = new Light();
      this.airConditioner = new AirConditioner();
      this.television = new Television();
    }

    startEveningMode() {
      this.light.turnOn();
      this.airConditioner.turnOn();
      this.television.turnOn();

      console.log("Evening mode activated.");
    }
  }

  const smartHome = new SmartHomeFacade();

  smartHome.startEveningMode();
  ```

</details>

### Exercise 2: Video Streaming Facade

Create these classes:

- `VideoPlayer` with `loadVideo(title)`.
- `AudioSystem` with `setVolume(level)`.
- `SubtitleManager` with `enableSubtitles()`.

Create a `StreamingFacade` with a method:

```js
watchMovie(title)
```

It should load the video, set the volume to `50`, enable subtitles, and print `"Movie is ready."`.

<details>
  <summary>Show solution</summary>

  ```js
  class VideoPlayer {
    loadVideo(title) {
      console.log(`Loading video: ${title}`);
    }
  }

  class AudioSystem {
    setVolume(level) {
      console.log(`Volume set to ${level}`);
    }
  }

  class SubtitleManager {
    enableSubtitles() {
      console.log("Subtitles enabled.");
    }
  }

  class StreamingFacade {
    constructor() {
      this.videoPlayer = new VideoPlayer();
      this.audioSystem = new AudioSystem();
      this.subtitleManager = new SubtitleManager();
    }

    watchMovie(title) {
      this.videoPlayer.loadVideo(title);
      this.audioSystem.setVolume(50);
      this.subtitleManager.enableSubtitles();

      console.log("Movie is ready.");
    }
  }

  const streaming = new StreamingFacade();

  streaming.watchMovie("My Favorite Movie");
  ```

</details>

---

## 12. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Facade? | Structural. |
| What is its main purpose? | Provide a simpler interface to a complicated subsystem. |
| What does the Facade do? | Coordinates subsystem components behind a high-level interface. |
| Does it replace the subsystem classes? | No. It delegates work to them. |
| How is it different from Adapter? | Facade simplifies an interface; Adapter makes interfaces compatible. |
| How is it different from Decorator? | Facade simplifies access; Decorator adds behavior to an object. |
| Should every application have a Facade? | No. Use one when it meaningfully reduces complexity. |

---

## 13. Design Patterns Learned So Far

You have now learned six design patterns.

| Pattern | Category | Main purpose |
|---|---|---|
| Factory | Creational | Create objects without exposing all creation details. |
| Singleton | Creational | Provide one shared instance. |
| Builder | Creational | Construct complex objects step by step. |
| Adapter | Structural | Make incompatible interfaces work together. |
| Decorator | Structural | Add behavior by wrapping objects. |
| Facade | Structural | Simplify access to a complicated subsystem. |

A useful way to remember the structural patterns:

- **Adapter:** Make two interfaces compatible.
- **Decorator:** Add behavior to an object.
- **Facade:** Make a complex subsystem easier to use.

---

## 14. What's Next?

### Lesson 7: The Observer Pattern

The Observer Pattern is a behavioral design pattern in which an object notifies multiple subscribers when its state changes or an event occurs.

For example, when a user subscribes to a notification system, multiple listeners can respond when a new notification is published.

You can use this pattern for:

- Event handling.
- Notification systems.
- User interface updates.
- Publish-subscribe systems.
- Application state changes.

In the next lesson, we'll build an Observer Pattern implementation in JavaScript and explore how publishers and subscribers communicate.
