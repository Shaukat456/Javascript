# Lesson 10: The State Pattern in JavaScript

## 1. What Is the State Pattern?

The **State Pattern** is a behavioral design pattern that allows an object's behavior to change depending on its internal state.

In simple words:

> The State Pattern lets an object behave differently when its state changes, without putting every state-specific rule into one large conditional statement.

Imagine an online order.

An order might move through these states:

- Pending
- Paid
- Shipped
- Delivered

Each state allows different actions.

For example:

- A pending order can be paid for.
- A paid order can be shipped.
- A shipped order can be marked as delivered.
- A delivered order cannot normally be shipped again.

Instead of writing one large method full of `if...else` statements, you can represent each state as a separate class.

### Real-world use cases

- Order processing.
- Media players.
- Document approval workflows.
- Traffic lights.
- User authentication flows.
- Vending machines.
- Game characters.
- Connection management.

---

## 2. The Problem: Too Many Conditional Statements

Imagine building a simple media player.

It can be in one of three states:

- Playing
- Paused
- Stopped

The behavior of the `play()` method depends on the current state.

A straightforward implementation might look like this:

```js
class MediaPlayer {
  constructor() {
    this.state = "stopped";
  }

  play() {
    if (this.state === "stopped") {
      console.log("Starting playback...");
      this.state = "playing";
    } else if (this.state === "paused") {
      console.log("Resuming playback...");
      this.state = "playing";
    } else if (this.state === "playing") {
      console.log("Already playing.");
    }
  }

  pause() {
    if (this.state === "playing") {
      console.log("Playback paused.");
      this.state = "paused";
    } else {
      console.log("Cannot pause right now.");
    }
  }

  stop() {
    if (this.state === "playing" || this.state === "paused") {
      console.log("Playback stopped.");
      this.state = "stopped";
    } else {
      console.log("Already stopped.");
    }
  }
}
```

Usage:

```js
const player = new MediaPlayer();

player.play();
player.pause();
player.play();
player.stop();
```

This works for a small example.

However, imagine adding more states:

- Buffering
- Loading
- Error
- Completed

Now every method may need more conditions.

As the number of states and actions grows, the class becomes harder to maintain.

The State Pattern moves state-specific behavior into separate objects.

---

## 3. Understand the Structure

The State Pattern typically has three main participants.

| Participant | Responsibility |
|---|---|
| Context | Maintains the current state and exposes operations to the client. |
| State | Defines the behavior expected from a state object. |
| Concrete State | Implements behavior for a particular state. |

For the media player:

- `MediaPlayer` is the context.
- `PlayerState` describes the expected state behavior.
- `PlayingState`, `PausedState`, and `StoppedState` implement particular states.

The context delegates operations to its current state.

When the state changes, the context uses a different state object.

---

## 4. Implement the State Pattern Step by Step

Let's build the media player using separate state classes.

### Step 1: Create the state contract

```js
class PlayerState {
  play(player) {
    throw new Error("play() must be implemented.");
  }

  pause(player) {
    throw new Error("pause() must be implemented.");
  }

  stop(player) {
    throw new Error("stop() must be implemented.");
  }
}
```

This base class defines the operations that each state should implement.

JavaScript doesn't require a formal interface or base class. We use this class to make the expected contract clear.

### Step 2: Create the stopped state

When the player is stopped, calling `play()` starts playback.

```js
class StoppedState extends PlayerState {
  play(player) {
    console.log("Starting playback...");
    player.setState(new PlayingState());
  }

  pause(player) {
    console.log("Cannot pause because playback is stopped.");
  }

  stop(player) {
    console.log("Already stopped.");
  }
}
```

Notice this line:

```js
player.setState(new PlayingState());
```

The state requests a transition to the playing state.

The context remains responsible for storing the current state.

### Step 3: Create the playing state

```js
class PlayingState extends PlayerState {
  play(player) {
    console.log("Already playing.");
  }

  pause(player) {
    console.log("Playback paused.");
    player.setState(new PausedState());
  }

  stop(player) {
    console.log("Playback stopped.");
    player.setState(new StoppedState());
  }
}
```

When the player is playing:

- `play()` reports that playback is already active.
- `pause()` changes the state to paused.
- `stop()` changes the state to stopped.

### Step 4: Create the paused state

```js
class PausedState extends PlayerState {
  play(player) {
    console.log("Resuming playback...");
    player.setState(new PlayingState());
  }

  pause(player) {
    console.log("Already paused.");
  }

  stop(player) {
    console.log("Playback stopped.");
    player.setState(new StoppedState());
  }
}
```

When the player is paused:

- `play()` resumes playback.
- `pause()` does nothing because playback is already paused.
- `stop()` stops playback.

Each state implements the same operations but responds differently.

### Step 5: Create the context

```js
class MediaPlayer {
  constructor() {
    this.state = new StoppedState();
  }

  setState(state) {
    this.state = state;
  }

  play() {
    this.state.play(this);
  }

  pause() {
    this.state.pause(this);
  }

  stop() {
    this.state.stop(this);
  }
}
```

The context stores the current state:

```js
this.state = new StoppedState();
```

Its public methods delegate to that state:

```js
play() {
  this.state.play(this);
}
```

The context doesn't need to check whether it is playing, paused, or stopped.

The current state object determines the behavior.

### Step 6: Use the media player

```js
const player = new MediaPlayer();

player.play();
player.pause();
player.play();
player.stop();
player.stop();
```

Output:

```text
Starting playback...
Playback paused.
Resuming playback...
Playback stopped.
Already stopped.
```

The behavior changes as the player's state changes.

This is the main idea of the State Pattern.

---

## 5. The Complete Media Player Example

Here is the full implementation in one place.

```js
class PlayerState {
  play(player) {
    throw new Error("play() must be implemented.");
  }

  pause(player) {
    throw new Error("pause() must be implemented.");
  }

  stop(player) {
    throw new Error("stop() must be implemented.");
  }
}

class StoppedState extends PlayerState {
  play(player) {
    console.log("Starting playback...");
    player.setState(new PlayingState());
  }

  pause(player) {
    console.log("Cannot pause because playback is stopped.");
  }

  stop(player) {
    console.log("Already stopped.");
  }
}

class PlayingState extends PlayerState {
  play(player) {
    console.log("Already playing.");
  }

  pause(player) {
    console.log("Playback paused.");
    player.setState(new PausedState());
  }

  stop(player) {
    console.log("Playback stopped.");
    player.setState(new StoppedState());
  }
}

class PausedState extends PlayerState {
  play(player) {
    console.log("Resuming playback...");
    player.setState(new PlayingState());
  }

  pause(player) {
    console.log("Already paused.");
  }

  stop(player) {
    console.log("Playback stopped.");
    player.setState(new StoppedState());
  }
}

class MediaPlayer {
  constructor() {
    this.state = new StoppedState();
  }

  setState(state) {
    this.state = state;
  }

  play() {
    this.state.play(this);
  }

  pause() {
    this.state.pause(this);
  }

  stop() {
    this.state.stop(this);
  }
}

const player = new MediaPlayer();

player.play();
player.pause();
player.play();
player.stop();
player.stop();
```

The client uses the same interface throughout:

```js
player.play();
player.pause();
player.stop();
```

The current state determines what each operation does.

---

## 6. A Simpler State Pattern Using Objects

In JavaScript, you don't always need classes for the State Pattern.

You can represent states as objects containing methods.

Let's create a simple traffic light.

### Step 1: Define the states

```js
const redState = {
  show() {
    console.log("Red: Stop.");
  }
};

const greenState = {
  show() {
    console.log("Green: Go when safe.");
  }
};

const yellowState = {
  show() {
    console.log("Yellow: Prepare to stop.");
  }
};
```

Each state provides the same method:

```js
show()
```

But the behavior differs.

### Step 2: Create the context

```js
class TrafficLight {
  constructor() {
    this.state = redState;
  }

  setState(state) {
    this.state = state;
  }

  show() {
    this.state.show();
  }
}
```

### Step 3: Change the state

```js
const trafficLight = new TrafficLight();

trafficLight.show();

trafficLight.setState(greenState);
trafficLight.show();

trafficLight.setState(yellowState);
trafficLight.show();
```

Output:

```text
Red: Stop.
Green: Go when safe.
Yellow: Prepare to stop.
```

This is a simplified illustration of state-dependent behavior, not a complete traffic-signal controller. Real traffic systems need carefully defined transition rules, timing, and safety requirements.

The important point is that the context delegates behavior to its current state object.

---

## 7. Practical Example: An Order Workflow

Let's model a simplified order workflow.

An order can be in these states:

1. Pending
2. Paid
3. Shipped
4. Delivered

Each state permits different operations.

For this example:

- A pending order can be paid.
- A paid order can be shipped.
- A shipped order can be delivered.
- A delivered order cannot be shipped again.

### Step 1: Create the states

```js
class PendingOrderState {
  pay(order) {
    console.log("Order paid.");
    order.setState(new PaidOrderState());
  }

  ship() {
    console.log("Cannot ship an unpaid order.");
  }

  deliver() {
    console.log("Cannot deliver an order that hasn't shipped.");
  }
}

class PaidOrderState {
  pay() {
    console.log("Order has already been paid.");
  }

  ship(order) {
    console.log("Order shipped.");
    order.setState(new ShippedOrderState());
  }

  deliver() {
    console.log("Cannot deliver an order that hasn't shipped.");
  }
}

class ShippedOrderState {
  pay() {
    console.log("Order has already been paid.");
  }

  ship() {
    console.log("Order has already shipped.");
  }

  deliver(order) {
    console.log("Order delivered.");
    order.setState(new DeliveredOrderState());
  }
}

class DeliveredOrderState {
  pay() {
    console.log("Order has already been paid.");
  }

  ship() {
    console.log("Delivered orders cannot be shipped again.");
  }

  deliver() {
    console.log("Order has already been delivered.");
  }
}
```

Each state defines what happens when the client requests an operation.

### Step 2: Create the context

```js
class Order {
  constructor() {
    this.state = new PendingOrderState();
  }

  setState(state) {
    this.state = state;
  }

  pay() {
    this.state.pay(this);
  }

  ship() {
    this.state.ship(this);
  }

  deliver() {
    this.state.deliver(this);
  }
}
```

The order delegates each operation to its current state.

### Step 3: Use the workflow

```js
const order = new Order();

order.ship();
order.pay();
order.pay();
order.ship();
order.deliver();
order.deliver();
```

Output:

```text
Cannot ship an unpaid order.
Order paid.
Order has already been paid.
Order shipped.
Order delivered.
Order has already been delivered.
```

The state object controls the behavior of each operation.

**Important:** This is a teaching example, not a production order system. Real order processing also requires persistent state, authorization, payment confirmation, error handling, and safeguards against duplicate requests.

---

## 8. State Pattern vs. Strategy Pattern

You have already learned the Strategy Pattern.

The State and Strategy Patterns can have similar structures because both use objects to represent different behaviors.

Their main difference is their intention.

| Feature | State | Strategy |
|---|---|---|
| Main purpose | Represent state-dependent behavior. | Represent interchangeable algorithms. |
| What determines behavior? | The object's current state. | The selected algorithm. |
| Typical transition | Pending → Paid → Shipped. | Standard shipping → Express shipping. |
| Who commonly changes the selection? | State transitions in the context or current state. | Client or application logic. |
| Main question | What behavior is appropriate in this state? | Which algorithm should perform this operation? |

### Strategy example

```js
calculator.calculate(order, expressShipping);
```

The client selects an algorithm.

### State example

```js
order.pay();
order.ship();
```

The order's current state determines whether the requested operation is allowed and what happens next.

**Remember:**

- Strategy changes how an operation is performed.
- State changes how an object behaves according to its current condition.

The implementations can overlap, so the intended purpose matters more than the class structure.

---

## 9. State Pattern vs. Command Pattern

The Command Pattern encapsulates a request.

The State Pattern represents state-dependent behavior.

| Feature | State | Command |
|---|---|---|
| Main purpose | Change behavior based on current state. | Encapsulate a request as an object. |
| Main participant | State object. | Command object. |
| Example | An order allows shipping only after payment. | A `ShipOrderCommand` represents a request to ship an order. |
| Common use | Workflow states and lifecycle management. | Undo/redo, queues, and action history. |

These patterns can be used together.

For example, a `ShipOrderCommand` might request that an order be shipped, while the State Pattern determines whether shipping is currently permitted.

---

## 10. Advantages of the State Pattern

### 1. Reduces large conditional statements

State-specific behavior is organized into separate classes or objects.

### 2. Keeps related behavior together

Each state contains the behavior associated with that state.

### 3. Makes transitions explicit

You can see where the application changes from one state to another.

### 4. Improves extensibility

Adding a new state can be easier when each state has a clear responsibility.

### 5. Helps enforce state-specific rules

Operations can behave differently depending on the current state.

---

## 11. Disadvantages of the State Pattern

### 1. More classes or objects

A system with many states may require many state implementations.

### 2. Transitions can become complicated

If every state can transition to many other states, it may become difficult to understand the overall workflow.

### 3. Shared behavior can be duplicated

Multiple states may implement similar methods.

You can use helper functions or carefully designed base classes when appropriate.

### 4. It can be excessive for simple logic

A few states with straightforward behavior may be easier to manage using a small conditional statement.

### 5. Invalid transitions still need attention

The pattern helps organize state-specific rules, but it does not automatically guarantee that every possible transition is valid.

You must design the transitions deliberately.

---

## 12. Common Mistakes

### Mistake 1: Keeping every conditional in the context

If the context still checks every possible state inside each operation, you may not be getting much benefit from the pattern.

Instead, delegate state-dependent behavior to the current state object.

### Mistake 2: Letting any code change the state without rules

A public method such as:

```js
order.setState(new DeliveredOrderState());
```

can allow arbitrary transitions if callers can invoke it freely.

Consider keeping state transitions controlled by the context and its state implementations.

JavaScript doesn't enforce private access automatically for ordinary methods, but you can use private fields or limit what you expose publicly.

### Mistake 3: Confusing state with data

An object's state can be represented by a string or enum-like value when the behavior is simple.

The State Pattern becomes particularly useful when different states have meaningfully different behavior.

### Mistake 4: Creating too many state classes

Do not create a separate class for every small variation unless the extra structure improves clarity.

Choose the simplest implementation that handles your requirements.

### Mistake 5: Forgetting transition validation

Before moving from one state to another, consider whether the transition is permitted.

For a real order system, a transition from `Pending` directly to `Delivered` would normally be invalid.

---

## 13. Practice Exercises

Try these exercises before opening the solutions.

### Exercise 1: Traffic Light

Create three states:

- `RedState`
- `GreenState`
- `YellowState`

Each state should implement a `show()` method.

Create a `TrafficLight` context with `setState()` and `show()`.

Expected output:

```text
Red light.
Green light.
Yellow light.
```

<details>
  <summary>Show solution</summary>

  ```js
  class RedState {
    show() {
      console.log("Red light.");
    }
  }

  class GreenState {
    show() {
      console.log("Green light.");
    }
  }

  class YellowState {
    show() {
      console.log("Yellow light.");
    }
  }

  class TrafficLight {
    constructor() {
      this.state = new RedState();
    }

    setState(state) {
      this.state = state;
    }

    show() {
      this.state.show();
    }
  }

  const light = new TrafficLight();

  light.show();

  light.setState(new GreenState());
  light.show();

  light.setState(new YellowState());
  light.show();
  ```

</details>

### Exercise 2: Document Approval

Create a document workflow with these states:

- Draft
- Reviewed
- Published

Rules:

- A draft can be reviewed.
- A reviewed document can be published.
- A published document cannot be published again.

Create a `Document` context with `review()` and `publish()` methods.

<details>
  <summary>Show solution</summary>

  ```js
  class DraftState {
    review(document) {
      console.log("Document reviewed.");
      document.setState(new ReviewedState());
    }

    publish() {
      console.log("Review the document before publishing.");
    }
  }

  class ReviewedState {
    review() {
      console.log("Document has already been reviewed.");
    }

    publish(document) {
      console.log("Document published.");
      document.setState(new PublishedState());
    }
  }

  class PublishedState {
    review() {
      console.log("Published document cannot be reviewed again.");
    }

    publish() {
      console.log("Document has already been published.");
    }
  }

  class Document {
    constructor() {
      this.state = new DraftState();
    }

    setState(state) {
      this.state = state;
    }

    review() {
      this.state.review(this);
    }

    publish() {
      this.state.publish(this);
    }
  }

  const document = new Document();

  document.publish();
  document.review();
  document.publish();
  document.publish();
  ```

</details>

### Exercise 3: Improve the Order Workflow

Extend the order example with a `cancel()` method.

Requirements:

- Pending orders can be cancelled.
- Paid orders can be cancelled in this simplified exercise.
- Shipped orders cannot be cancelled.
- Delivered orders cannot be cancelled.

When cancelled, the order should transition to a `CancelledOrderState`.

Think about which state methods should perform the transition and which should reject the operation.

<details>
  <summary>Show solution</summary>

  ```js
  class CancelledOrderState {
    pay() {
      console.log("Cancelled orders cannot be paid.");
    }

    ship() {
      console.log("Cancelled orders cannot be shipped.");
    }

    deliver() {
      console.log("Cancelled orders cannot be delivered.");
    }

    cancel() {
      console.log("Order is already cancelled.");
    }
  }

  class PendingOrderState {
    pay(order) {
      console.log("Order paid.");
      order.setState(new PaidOrderState());
    }

    ship() {
      console.log("Cannot ship an unpaid order.");
    }

    deliver() {
      console.log("Cannot deliver an order that hasn't shipped.");
    }

    cancel(order) {
      console.log("Order cancelled.");
      order.setState(new CancelledOrderState());
    }
  }

  class PaidOrderState {
    pay() {
      console.log("Order has already been paid.");
    }

    ship(order) {
      console.log("Order shipped.");
      order.setState(new ShippedOrderState());
    }

    deliver() {
      console.log("Cannot deliver an order that hasn't shipped.");
    }

    cancel(order) {
      console.log("Paid order cancelled.");
      order.setState(new CancelledOrderState());
    }
  }

  class ShippedOrderState {
    pay() {
      console.log("Order has already been paid.");
    }

    ship() {
      console.log("Order has already shipped.");
    }

    deliver(order) {
      console.log("Order delivered.");
      order.setState(new DeliveredOrderState());
    }

    cancel() {
      console.log("Shipped orders cannot be cancelled here.");
    }
  }

  class DeliveredOrderState {
    pay() {
      console.log("Order has already been paid.");
    }

    ship() {
      console.log("Delivered orders cannot be shipped again.");
    }

    deliver() {
      console.log("Order has already been delivered.");
    }

    cancel() {
      console.log("Delivered orders cannot be cancelled here.");
    }
  }

  class Order {
    constructor() {
      this.state = new PendingOrderState();
    }

    setState(state) {
      this.state = state;
    }

    pay() {
      this.state.pay(this);
    }

    ship() {
      this.state.ship(this);
    }

    deliver() {
      this.state.deliver(this);
    }

    cancel() {
      this.state.cancel(this);
    }
  }

  const order = new Order();

  order.cancel();
  order.pay();
  order.ship();
  ```

  Output:

  ```text
  Order cancelled.
  Cancelled orders cannot be paid.
  Cancelled orders cannot be shipped.
  ```

  This is a simplified workflow. In a real system, cancellation of a paid order may require a refund or other compensation, rather than merely changing the state.

</details>

---

## 14. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is State? | Behavioral. |
| What is its main purpose? | Change an object's behavior according to its current state. |
| What does the context do? | Stores the current state and delegates operations to it. |
| What does a concrete state do? | Implements behavior and may initiate transitions. |
| Must every state be a class? | No. JavaScript objects or functions can also represent states. |
| How is State different from Strategy? | State models state-dependent behavior; Strategy selects an interchangeable algorithm. |
| Does the pattern automatically prevent invalid transitions? | No. The transition rules must be implemented correctly. |
| When is it useful? | When an object has several states with meaningfully different behaviors. |

---

## 15. Design Patterns Learned So Far

Congratulations! You've now covered ten design patterns.

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
| Command | Behavioral | Encapsulate requests as commands. |
| State | Behavioral | Change behavior according to an object's state. |

### Remember these four behavioral patterns

- **Observer:** Notify multiple listeners.
- **Strategy:** Choose an algorithm.
- **Command:** Represent an action.
- **State:** Change behavior based on the current state.

---

## 16. What's Next?

### Lesson 11: The Template Method Pattern

The Template Method Pattern defines the overall steps of an algorithm in a base class while allowing subclasses to customize particular steps.

For example, different types of reports might follow the same general workflow:

1. Load data.
2. Process data.
3. Format the report.
4. Export the result.

The overall sequence remains the same, but individual steps can differ.

In the next lesson, we'll implement the Template Method Pattern in JavaScript and compare it with the Strategy Pattern to understand when to use inheritance-based customization versus interchangeable behavior.
