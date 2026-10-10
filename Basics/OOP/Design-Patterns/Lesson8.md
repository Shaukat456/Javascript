# Lesson 9: The Command Pattern in JavaScript

## 1. What Is the Command Pattern?

The **Command Pattern** is a behavioral design pattern that turns a request or action into a separate object.

In simple words:

> The Command Pattern separates the object that requests an action from the object that knows how to perform it.

Instead of calling a method directly, the client creates or receives a command and asks that command to execute the operation.

### Real-world analogy

Imagine using a remote control.

When you press the power button, the remote sends a command to turn on the television.

The remote doesn't need to know the internal details of how the television powers on.

It only needs to trigger the appropriate command.

### Common use cases

- Undo and redo systems.
- Text editor actions.
- Remote controls.
- Task queues.
- Job scheduling.
- Menu actions.
- Background processing.
- Transaction workflows.

---

## 2. The Problem: Direct Method Calls

Imagine you're building a simple application that controls a light.

```js
class Light {
  turnOn() {
    console.log("Light is ON.");
  }

  turnOff() {
    console.log("Light is OFF.");
  }
}

const light = new Light();

light.turnOn();
light.turnOff();
```

This works perfectly for a small program.

However, suppose you're building a remote control that can operate:

- A light.
- A television.
- A fan.
- An air conditioner.

Without the Command Pattern, the remote might need to know the details of every device and every action.

```js
class RemoteControl {
  constructor(light, television) {
    this.light = light;
    this.television = television;
  }

  pressLightOn() {
    this.light.turnOn();
  }

  pressLightOff() {
    this.light.turnOff();
  }

  pressTelevisionOn() {
    this.television.turnOn();
  }

  pressTelevisionOff() {
    this.television.turnOff();
  }
}
```

As more devices and actions are added, the remote control can become tightly coupled to many concrete classes.

The Command Pattern lets us represent each action as an independent command.

---

## 3. Understand the Structure

The Command Pattern commonly has four participants.

| Participant | Responsibility |
|---|---|
| Command | Defines the operation used to execute a request. |
| Concrete Command | Implements a particular request and connects it to a receiver. |
| Receiver | Performs the actual work. |
| Invoker | Triggers a command without needing to know its implementation details. |

There is also usually a **Client**, which creates and connects the command, receiver, and invoker.

Let's understand these roles using the remote-control example.

- `Light` is the receiver.
- `TurnOnCommand` is a concrete command.
- `RemoteControl` is the invoker.
- The code that wires them together is the client.

---

## 4. Implement the Command Pattern Step by Step

### Step 1: Create the receiver

The receiver is the object that performs the actual work.

```js
class Light {
  turnOn() {
    console.log("Light is ON.");
  }

  turnOff() {
    console.log("Light is OFF.");
  }
}
```

The `Light` class knows how to turn itself on and off.

It doesn't need to know anything about commands or remote controls.

### Step 2: Create the command contract

A command commonly exposes an `execute()` method.

```js
class Command {
  execute() {
    throw new Error("The execute() method must be implemented.");
  }
}
```

This class documents the expected command interface.

JavaScript doesn't require a formal interface or base class. Commands can also be implemented using plain objects or functions.

### Step 3: Create concrete commands

Each concrete command represents a specific action.

#### Turn-on command

```js
class TurnOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}
```

#### Turn-off command

```js
class TurnOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }
}
```

Notice that both commands expose the same method:

```js
execute()
```

However, they perform different operations.

The command holds a reference to the receiver and delegates the work to it.

### Step 4: Create the invoker

The invoker triggers the command without knowing how the command performs its operation.

```js
class RemoteControl {
  pressButton(command) {
    command.execute();
  }
}
```

The remote control doesn't need to know whether the command operates a light, television, or fan.

It only needs a command that supports `execute()`.

### Step 5: Connect everything

```js
const light = new Light();

const turnOn = new TurnOnCommand(light);
const turnOff = new TurnOffCommand(light);

const remote = new RemoteControl();

remote.pressButton(turnOn);
remote.pressButton(turnOff);
```

Output:

```text
Light is ON.
Light is OFF.
```

The remote control triggers commands without knowing the details of the light.

This is the central idea of the Command Pattern.

---

## 5. The Complete Implementation

Here is the full example in one place.

```js
class Command {
  execute() {
    throw new Error("The execute() method must be implemented.");
  }
}

class Light {
  turnOn() {
    console.log("Light is ON.");
  }

  turnOff() {
    console.log("Light is OFF.");
  }
}

class TurnOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}

class TurnOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }
}

class RemoteControl {
  pressButton(command) {
    command.execute();
  }
}

const light = new Light();

const turnOn = new TurnOnCommand(light);
const turnOff = new TurnOffCommand(light);

const remote = new RemoteControl();

remote.pressButton(turnOn);
remote.pressButton(turnOff);
```

The invoker can trigger either command through the same interface.

This means we can add more commands without having to create a special method in the remote control for each device action.

---

## 6. A More Flexible Remote Control

Let's make the remote control more realistic.

Instead of passing a command each time a button is pressed, we can assign commands to buttons.

```js
class RemoteControl {
  constructor() {
    this.commands = {};
  }

  setCommand(buttonName, command) {
    this.commands[buttonName] = command;
  }

  pressButton(buttonName) {
    const command = this.commands[buttonName];

    if (!command) {
      console.log(`No command assigned to ${buttonName}.`);
      return;
    }

    command.execute();
  }
}
```

Now the remote stores commands by button name.

### Use it

```js
const light = new Light();

const remote = new RemoteControl();

remote.setCommand(
  "powerOn",
  new TurnOnCommand(light)
);

remote.setCommand(
  "powerOff",
  new TurnOffCommand(light)
);

remote.pressButton("powerOn");
remote.pressButton("powerOff");
remote.pressButton("volumeUp");
```

Output:

```text
Light is ON.
Light is OFF.
No command assigned to volumeUp.
```

The remote control doesn't need to know how the commands work.

It simply looks up the assigned command and executes it.

---

## 7. Using Functions as Commands

Just like the Strategy Pattern, the Command Pattern can often be implemented with JavaScript functions.

If all you need is to represent an action, you may not need a separate class for every command.

### Example

```js
const turnOnLight = () => {
  console.log("Light is ON.");
};

const turnOffLight = () => {
  console.log("Light is OFF.");
};

class RemoteControl {
  pressButton(command) {
    command();
  }
}

const remote = new RemoteControl();

remote.pressButton(turnOnLight);
remote.pressButton(turnOffLight);
```

Output:

```text
Light is ON.
Light is OFF.
```

Here, each function acts as a command.

This is concise and idiomatic JavaScript.

### When should you use command classes?

Classes can be useful when commands need to:

- Store parameters.
- Keep a reference to a receiver.
- Support undo operations.
- Record command history.
- Be placed in a queue.
- Be serialized or inspected.

For simple actions, functions may be enough.

---

## 8. Practical Example: Undo and Redo

One of the best-known uses of the Command Pattern is implementing undo and redo.

Imagine a text editor that supports adding text and undoing the most recent change.

To undo an operation, a command needs to know how to reverse its effect.

Let's implement a simple version.

### Step 1: Create the receiver

```js
class TextEditor {
  constructor() {
    this.text = "";
  }

  addText(value) {
    this.text += value;
  }

  removeText(length) {
    this.text = this.text.slice(0, -length);
  }

  getText() {
    return this.text;
  }
}
```

The editor stores the text and provides methods to modify it.

### Step 2: Create a command that supports undo

```js
class AddTextCommand {
  constructor(editor, text) {
    this.editor = editor;
    this.text = text;
  }

  execute() {
    this.editor.addText(this.text);
  }

  undo() {
    this.editor.removeText(this.text.length);
  }
}
```

The command stores the text it adds.

When `undo()` is called, it removes the same number of characters.

This example assumes the command is undoing its own most recent addition. More complex editors need to preserve exact positions and prior state.

### Step 3: Create the history manager

```js
class EditorHistory {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();

    if (!command) {
      console.log("Nothing to undo.");
      return;
    }

    command.undo();
  }
}
```

The history manager stores executed commands.

When undo is requested, it removes the latest command from history and calls its `undo()` method.

### Step 4: Use the editor

```js
const editor = new TextEditor();
const history = new EditorHistory();

history.execute(
  new AddTextCommand(editor, "Hello ")
);

history.execute(
  new AddTextCommand(editor, "World!")
);

console.log(editor.getText());

history.undo();

console.log(editor.getText());

history.undo();

console.log(editor.getText());
```

Output:

```text
Hello World!
Hello
```

The final `console.log()` prints an empty string.

The two undo operations reverse the two additions in reverse order.

### Why is this useful?

Each command stores enough information to perform an operation and, where supported, reverse it.

This lets a history manager handle undo behavior without knowing the details of every editor operation.

**Note:** This is a simplified undo system. Real editors may need redo stacks, cursor positions, selection information, and more sophisticated state restoration.

---

## 9. Command Pattern vs. Strategy Pattern

You have already learned the Strategy Pattern.

Both patterns can encapsulate behavior, but they serve different purposes.

| Feature | Command | Strategy |
|---|---|---|
| Main purpose | Represent a request or action as an object. | Encapsulate interchangeable algorithms. |
| Typical method | `execute()` | A domain-specific method, such as `calculate()` or `pay()` |
| Main question | What action should be executed? | Which algorithm should perform this operation? |
| Common use | Undo, task queues, remote controls. | Shipping, discounts, payment algorithms. |
| Can support history? | Yes, especially when commands store their parameters. | Not its primary purpose. |

### Command example

```js
remote.pressButton(turnOnCommand);
```

The command represents an action that can be triggered.

### Strategy example

```js
calculator.calculate(order, expressShipping);
```

The strategy determines which algorithm performs the calculation.

A command can contain a strategy, and a strategy can be used inside a command. They are not mutually exclusive.

---

## 10. Command Pattern vs. Observer Pattern

These patterns are both behavioral patterns, but their communication flows differ.

| Feature | Command | Observer |
|---|---|---|
| Main purpose | Encapsulate a request. | Notify registered listeners of an event or change. |
| Direction | An invoker triggers a command. | A subject notifies its observers. |
| Main relationship | Invoker → Command → Receiver | Subject → Observers |
| Example | A remote control turns on a light. | A stock price update notifies several displays. |

Remember:

- **Command:** Encapsulates an action.
- **Observer:** Broadcasts an update.

---

## 11. Advantages of the Command Pattern

### 1. Separates the requester from the receiver

The invoker doesn't need to know the receiver's implementation details.

### 2. Makes commands reusable

A command can be triggered from different invokers.

For example, the same `TurnOnCommand` might be used by a remote control or a menu action.

### 3. Supports undo and redo

Commands can store the information needed to reverse or repeat an operation.

### 4. Supports queues and scheduling

Commands can be stored and executed later.

### 5. Improves extensibility

New commands can often be introduced without changing the invoker.

### 6. Supports logging and auditing

Applications can record which commands were executed, provided the commands are designed to capture the necessary information.

---

## 12. Disadvantages of the Command Pattern

### 1. More classes or objects

A separate command for every action can introduce extra code.

### 2. Undo can be difficult

Not every operation can be reversed easily.

For example, sending an email cannot truly be undone once the recipient has received it.

### 3. Commands need clear execution rules

Applications must decide what happens if a command fails, is executed twice, or is cancelled.

### 4. History can consume memory

If commands retain large objects or substantial state, storing many commands can consume significant memory.

### 5. It can be unnecessary for simple actions

A direct method call or callback may be easier to understand when you don't need command objects, history, queues, or decoupling.

---

## 13. Common Mistakes

### Mistake 1: Putting the receiver's implementation inside the command

A command should usually delegate the actual operation to its receiver.

Prefer:

```js
class TurnOnCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}
```

Rather than making the command responsible for implementing all the light's internal behavior.

### Mistake 2: Forgetting the command interface

If the invoker expects `execute()`, every command supplied to it should provide a compatible method.

Otherwise, execution can fail at runtime.

### Mistake 3: Assuming every command can be undone automatically

An `undo()` method must actually reverse the operation.

Simply defining the method does not guarantee that reversal is possible.

### Mistake 4: Not considering repeated execution

A command may be executed more than once.

For some operations, that is harmless. For others, such as creating an order or charging a payment, repeating the command may cause unwanted effects.

Real applications may need idempotency checks or execution tracking.

### Mistake 5: Storing unnecessary data in command history

Store only the information needed for execution, undo, or auditing.

Avoid retaining large unrelated objects if they are not required.

---

## 14. Practice Exercises

Try each exercise before opening its solution.

### Exercise 1: Fan Remote

Create a `Fan` class with:

- `turnOn()`
- `turnOff()`

Create two commands:

- `TurnFanOnCommand`
- `TurnFanOffCommand`

Each command should receive a fan object and implement `execute()`.

Then create a remote control that can execute either command.

Expected output:

```text
Fan is ON.
Fan is OFF.
```

<details>
  <summary>Show solution</summary>

  ```js
  class Fan {
    turnOn() {
      console.log("Fan is ON.");
    }

    turnOff() {
      console.log("Fan is OFF.");
    }
  }

  class TurnFanOnCommand {
    constructor(fan) {
      this.fan = fan;
    }

    execute() {
      this.fan.turnOn();
    }
  }

  class TurnFanOffCommand {
    constructor(fan) {
      this.fan = fan;
    }

    execute() {
      this.fan.turnOff();
    }
  }

  class RemoteControl {
    pressButton(command) {
      command.execute();
    }
  }

  const fan = new Fan();
  const remote = new RemoteControl();

  remote.pressButton(new TurnFanOnCommand(fan));
  remote.pressButton(new TurnFanOffCommand(fan));
  ```

</details>

### Exercise 2: Shopping Cart Command

Create a `ShoppingCart` class with:

- `addItem(item)`
- `removeItem(item)`
- `getItems()`

Create an `AddItemCommand` that adds an item and supports undo.

When executed, the command should add the item to the cart. When undone, it should remove that item.

<details>
  <summary>Show solution</summary>

  ```js
  class ShoppingCart {
    constructor() {
      this.items = [];
    }

    addItem(item) {
      this.items.push(item);
    }

    removeItem(item) {
      const index = this.items.indexOf(item);

      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }

    getItems() {
      return [...this.items];
    }
  }

  class AddItemCommand {
    constructor(cart, item) {
      this.cart = cart;
      this.item = item;
    }

    execute() {
      this.cart.addItem(this.item);
    }

    undo() {
      this.cart.removeItem(this.item);
    }
  }

  const cart = new ShoppingCart();

  const addBook = new AddItemCommand(cart, "Book");

  addBook.execute();
  console.log(cart.getItems());

  addBook.undo();
  console.log(cart.getItems());
  ```

  The example assumes each item is a string and that the command is reversing its own addition. For a production cart, item IDs and quantities may be safer than matching by object identity or string value.

</details>

### Exercise 3: Command History

Extend the `EditorHistory` example so it has a method called `showHistory()` that prints how many undoable commands are currently stored.

Expected behavior:

```js
history.execute(command1);
history.execute(command2);

history.showHistory();
```

Expected output:

```text
Commands available to undo: 2
```

<details>
  <summary>Show solution</summary>

  ```js
  class EditorHistory {
    constructor() {
      this.history = [];
    }

    execute(command) {
      command.execute();
      this.history.push(command);
    }

    undo() {
      const command = this.history.pop();

      if (!command) {
        console.log("Nothing to undo.");
        return;
      }

      command.undo();
    }

    showHistory() {
      console.log(
        `Commands available to undo: ${this.history.length}`
      );
    }
  }
  ```

</details>

---

## 15. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Command? | Behavioral. |
| What is its main purpose? | Encapsulate a request as a command. |
| What does a receiver do? | Performs the actual operation. |
| What does an invoker do? | Triggers a command. |
| What method is commonly used? | `execute()` |
| Can commands support undo? | Yes, if they store enough information to reverse their operations. |
| Can functions act as commands? | Yes. |
| How is Command different from Strategy? | Command represents a request; Strategy represents an interchangeable algorithm. |
| Where is Command useful? | Undo/redo, remote controls, queues, scheduled tasks, and menu actions. |

---

## 16. Design Patterns Learned So Far

You have now learned nine design patterns.

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

### Remember these three

- **Observer:** Notify multiple listeners.
- **Strategy:** Choose an algorithm.
- **Command:** Represent an action that can be executed.

---

## 17. What's Next?

### Lesson 10: The State Pattern

The State Pattern is a behavioral design pattern that allows an object's behavior to change when its internal state changes.

For example, an order might move through these states:

- Pending
- Paid
- Shipped
- Delivered

An order's available actions can depend on its current state.

Rather than putting every state-specific rule into a large collection of conditional statements, you can represent each state separately.

