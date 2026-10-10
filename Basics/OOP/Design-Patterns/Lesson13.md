# Lesson 14: Memento Pattern in JavaScript

## 1. What Is the Memento Pattern?

The **Memento Pattern** is a behavioral design pattern that allows you to capture and restore an object's previous state without exposing its internal implementation details.

In simple words:

> The Memento Pattern lets you save a snapshot of an object's state so you can restore it later.

Imagine you're writing a document in a text editor.

You type:

```text
Hello
```

Then you change it to:

```text
Hello World
```

Then you accidentally delete the text.

You want to press **Undo** to return to the previous version.

How can your application remember the previous content?

One approach is to save snapshots of the document's state. The Memento Pattern provides a structured way to do that.

### Real-world examples

- Undo and redo in text editors.
- Restoring a previous game state.
- Reverting changes in a form.
- Saving checkpoints in an application.
- Restoring previous settings.
- Tracking previous states of a drawing or design tool.

## 2. The Problem Without the Memento Pattern

Suppose we have a simple text editor.

```js
class TextEditor {
  constructor() {
    this.text = "";
  }

  write(text) {
    this.text = text;
  }
}

const editor = new TextEditor();

editor.write("Hello");
editor.write("Hello World");

console.log(editor.text);
```

Output:

```text
Hello World
```

The problem is that the previous text has been overwritten.

If the user wants to restore `"Hello"`, our class has no built-in way to recover it.

We could add a history array directly to the editor, but this mixes the editor's main responsibility—editing text—with the responsibility of managing saved states.

The Memento Pattern gives us a way to separate these responsibilities.

## 3. The Three Main Components

The Memento Pattern commonly involves three roles.

| Component | Responsibility | Example |
|---|---|---|
| Originator | Owns the state and creates or restores snapshots | `TextEditor` |
| Memento | Stores a snapshot of the state | `TextMemento` |
| Caretaker | Keeps track of snapshots without modifying their contents | `History` |

Let's understand each role.

### Originator

The originator is the object whose state we want to save.

For example, our `TextEditor` owns the current document text.

### Memento

The memento stores a snapshot of the originator's state.

It should represent a saved version rather than a live reference that changes whenever the editor changes.

### Caretaker

The caretaker stores and manages snapshots.

For example, a history manager can save snapshots and retrieve the previous one when the user requests Undo.

The caretaker doesn't need to understand the internal structure of the editor's state.

## 4. Build a Simple Memento

Let's implement the pattern step by step.

### Step 1: Create the Memento

```js
class TextMemento {
  constructor(text) {
    this.text = text;
    Object.freeze(this);
  }
}
```

This class stores the text at a particular moment.

`Object.freeze()` prevents the stored object's own properties from being changed or removed. Since this memento stores only a string, a shallow freeze is sufficient for this example.

### Step 2: Create the Originator

```js
class TextEditor {
  constructor() {
    this.text = "";
  }

  write(text) {
    this.text = text;
  }

  save() {
    return new TextMemento(this.text);
  }

  restore(memento) {
    this.text = memento.text;
  }
}
```

Let's understand the methods.

**`write(text)`**

Changes the editor's current content.

**`save()`**

Creates and returns a snapshot of the current text.

**`restore(memento)`**

Restores the text stored in a snapshot.

The editor is responsible for creating and restoring its state.

### Step 3: Use the Memento

```js
const editor = new TextEditor();

editor.write("Hello");

const savedState = editor.save();

editor.write("Hello World");

console.log(editor.text); // Hello World

editor.restore(savedState);

console.log(editor.text); // Hello
```

Output:

```text
Hello World
Hello
```

We successfully restored the previous state.

However, we are currently managing the snapshot ourselves. Let's introduce the caretaker.

## 5. Add a History Manager

The caretaker will manage the snapshots for us.

```js
class History {
  constructor() {
    this.mementos = [];
  }

  push(memento) {
    this.mementos.push(memento);
  }

  pop() {
    return this.mementos.pop();
  }

  get length() {
    return this.mementos.length;
  }
}
```

The `History` class stores mementos but doesn't need to know how the editor works internally.

Now let's connect everything.

```js
const editor = new TextEditor();
const history = new History();

editor.write("First version");
history.push(editor.save());

editor.write("Second version");
history.push(editor.save());

editor.write("Third version");

console.log(editor.text);
// Third version

const previousState = history.pop();
editor.restore(previousState);

console.log(editor.text);
// Second version
```

Output:

```text
Third version
Second version
```

We can now save multiple snapshots and restore an earlier one.

There is still an important detail: a basic `pop()` operation removes the latest saved snapshot. To implement a complete Undo system, we should save the state before each change and define exactly how the history stack behaves.

## 6. Build a Working Undo Feature

Let's create a more practical implementation.

Our rules will be:

1. The editor stores the current text.
2. Before each edit, we save the current state.
3. Undo restores the most recent saved state.
4. If there is no history, Undo does nothing.

We'll use a stack to manage the snapshots.

```js
class TextMemento {
  constructor(text) {
    this.text = text;
    Object.freeze(this);
  }
}

class TextEditor {
  #text = "";
  #history = [];

  get text() {
    return this.#text;
  }

  write(newText) {
    this.#history.push(new TextMemento(this.#text));
    this.#text = newText;
  }

  undo() {
    const previousState = this.#history.pop();

    if (!previousState) {
      return;
    }

    this.#text = previousState.text;
  }
}
```

### Test the editor

```js
const editor = new TextEditor();

editor.write("Version 1");
console.log(editor.text);

editor.write("Version 2");
console.log(editor.text);

editor.write("Version 3");
console.log(editor.text);

editor.undo();
console.log(editor.text);

editor.undo();
console.log(editor.text);

editor.undo();
console.log(editor.text);
```

Output:

```text
Version 1
Version 2
Version 3
Version 2
Version 1

```

The final output is an empty string, so the last `console.log()` produces a blank line.

Notice that we save the current text **before** changing it. This is important because Undo needs the state that existed before the latest edit.

### What happens internally?

After writing `"Version 1"`:

```text
Current text: "Version 1"

History:
- ""
```

After writing `"Version 2"`:

```text
Current text: "Version 2"

History:
- ""
- "Version 1"
```

After writing `"Version 3"`:

```text
Current text: "Version 3"

History:
- ""
- "Version 1"
- "Version 2"
```

After one Undo:

```text
Current text: "Version 2"

History:
- ""
- "Version 1"
```

The latest snapshot is removed and restored.

This is a simple form of state history.

## 7. Improve the Design with a Caretaker

The previous version works, but the editor manages both its own state and the history stack.

Let's separate those responsibilities more clearly.

```js
class TextMemento {
  #text;

  constructor(text) {
    this.#text = text;
    Object.freeze(this);
  }

  getText() {
    return this.#text;
  }
}

class TextEditor {
  #text = "";

  get text() {
    return this.#text;
  }

  write(newText) {
    this.#text = newText;
  }

  save() {
    return new TextMemento(this.#text);
  }

  restore(memento) {
    this.#text = memento.getText();
  }
}

class History {
  #states = [];

  save(editor) {
    this.#states.push(editor.save());
  }

  undo(editor) {
    const previousState = this.#states.pop();

    if (previousState) {
      editor.restore(previousState);
    }
  }

  get canUndo() {
    return this.#states.length > 0;
  }
}
```

Now let's use it.

```js
const editor = new TextEditor();
const history = new History();

editor.write("First draft");
history.save(editor);

editor.write("Second draft");
history.save(editor);

editor.write("Final draft");

console.log(editor.text);
// Final draft

history.undo(editor);

console.log(editor.text);
// Second draft

history.undo(editor);

console.log(editor.text);
// First draft
```

The responsibilities are now clearer:

- `TextEditor` manages the text.
- `TextMemento` stores a snapshot.
- `History` manages the snapshots and Undo operation.

The memento keeps its state private, and the caretaker doesn't need to know how that state is represented internally.

## 8. Implement Redo

Undo lets you move backward through previous states.

Redo lets you move forward again after an Undo.

To support Redo, we need two stacks:

- An undo stack for previous states.
- A redo stack for states that can be restored again.

When a new edit happens, the redo stack should be cleared because the previous forward history no longer represents the path the user is following.

Let's implement a complete, small example.

```js
class TextMemento {
  constructor(text) {
    this.text = text;
    Object.freeze(this);
  }
}

class TextEditor {
  #text = "";
  #undoStack = [];
  #redoStack = [];

  get text() {
    return this.#text;
  }

  write(newText) {
    this.#undoStack.push(new TextMemento(this.#text));

    this.#text = newText;

    // A new edit creates a new history branch.
    this.#redoStack = [];
  }

  undo() {
    if (this.#undoStack.length === 0) {
      return;
    }

    this.#redoStack.push(new TextMemento(this.#text));

    const previousState = this.#undoStack.pop();

    this.#text = previousState.text;
  }

  redo() {
    if (this.#redoStack.length === 0) {
      return;
    }

    this.#undoStack.push(new TextMemento(this.#text));

    const nextState = this.#redoStack.pop();

    this.#text = nextState.text;
  }
}
```

### Test Undo and Redo

```js
const editor = new TextEditor();

editor.write("A");
editor.write("B");
editor.write("C");

console.log(editor.text); // C

editor.undo();
console.log(editor.text); // B

editor.undo();
console.log(editor.text); // A

editor.redo();
console.log(editor.text); // B

editor.redo();
console.log(editor.text); // C
```

Output:

```text
C
B
A
B
C
```

### Why clear the Redo stack after a new edit?

Consider this sequence:

1. Write `"A"`.
2. Write `"B"`.
3. Undo, returning to `"A"`.
4. Write `"X"`.

The current history now follows a new path:

```text
A → X
```

Redoing `"B"` would jump to an old branch that was abandoned when `"X"` was written.

Clearing the redo stack prevents that behavior in this simple linear-history design.

## 9. Memento Pattern and Encapsulation

One of the most important goals of the Memento Pattern is preserving encapsulation.

Imagine an editor that has several pieces of state:

```js
class Editor {
  #text = "";
  #cursorPosition = 0;
  #fontSize = 16;

  // Additional editor behavior...
}
```

A snapshot might need to preserve all three properties.

The editor should control how that snapshot is created and restored. Other objects shouldn't need unrestricted access to the editor's private fields.

For example:

```js
class EditorMemento {
  #state;

  constructor(state) {
    this.#state = Object.freeze({ ...state });
    Object.freeze(this);
  }

  getState() {
    return { ...this.#state };
  }
}
```

The editor could use it like this:

```js
class Editor {
  #text = "";
  #cursorPosition = 0;
  #fontSize = 16;

  write(text) {
    this.#text = text;
    this.#cursorPosition = text.length;
  }

  setFontSize(size) {
    this.#fontSize = size;
  }

  save() {
    return new EditorMemento({
      text: this.#text,
      cursorPosition: this.#cursorPosition,
      fontSize: this.#fontSize,
    });
  }

  restore(memento) {
    const state = memento.getState();

    this.#text = state.text;
    this.#cursorPosition = state.cursorPosition;
    this.#fontSize = state.fontSize;
  }

  getInfo() {
    return {
      text: this.#text,
      cursorPosition: this.#cursorPosition,
      fontSize: this.#fontSize,
    };
  }
}
```

Usage:

```js
const editor = new Editor();

editor.write("Hello");
editor.setFontSize(20);

const snapshot = editor.save();

editor.write("Hello World");
editor.setFontSize(30);

editor.restore(snapshot);

console.log(editor.getInfo());
```

Output:

```js
{
  text: "Hello",
  cursorPosition: 5,
  fontSize: 20
}
```

The snapshot restores multiple properties together.

**Important:** The example uses primitive values, so shallow copying is sufficient. If your state contains nested objects, arrays, dates, or other mutable values, you need a suitable snapshot strategy, such as explicitly copying the relevant data or using `structuredClone()` where supported. A shallow freeze does not make nested objects immutable.

## 10. Memento vs. Command Pattern

You previously learned the Command Pattern, which can also be used to implement Undo.

These patterns solve related but different problems.

| Feature | Memento | Command |
|---|---|---|
| Main idea | Save and restore state snapshots | Represent actions as objects |
| Stores | Previous state | Information needed to execute an action |
| Undo approach | Restore an earlier snapshot | Reverse or compensate for an action |
| Useful when | Restoring state is straightforward | Actions need execution, queuing, logging, or reversal |
| Example | Save a document version | Store a command that inserts text |

### Memento approach

Save the current text before an edit.

```js
const snapshot = editor.save();

// Make changes...

editor.restore(snapshot);
```

### Command approach

Represent the edit as an object with an `execute()` method, and possibly an `undo()` method.

```js
class ChangeTextCommand {
  constructor(editor, newText) {
    this.editor = editor;
    this.newText = newText;
    this.previousText = null;
  }

  execute() {
    this.previousText = this.editor.text;
    this.editor.write(this.newText);
  }

  undo() {
    this.editor.write(this.previousText);
  }
}
```

This is a simplified illustration; a production command-based editor would define its document API carefully to avoid creating extra undo history while executing an undo.

**Remember:**

- Memento captures state.
- Command captures an action.

A complex application can use both. Commands can perform edits while a history manager stores mementos or command objects to support Undo and Redo.

## 11. Advantages of the Memento Pattern

### 1. Supports Undo and Redo

You can restore previous states without manually reversing every individual change.

### 2. Preserves encapsulation

The object whose state is saved controls the snapshot's creation and restoration.

### 3. Separates responsibilities

A caretaker can manage saved states without needing to understand their internal representation.

### 4. Simplifies checkpoints

Applications can save a known-good state before a risky operation.

### 5. Makes restoration easier

Instead of writing special reverse logic for every modification, you can restore a previous snapshot.

## 12. Disadvantages and Limitations

### 1. Memory consumption

Saving every state of a large object can use substantial memory.

For example, saving a complete document after every keystroke may be wasteful.

Possible solutions include:

- Limiting the number of snapshots.
- Saving only at meaningful checkpoints.
- Storing incremental changes instead of full snapshots.
- Using a combination of snapshots and change logs.

### 2. Copying complex state can be difficult

Nested objects, mutable collections, and external resources require careful snapshot design.

### 3. Snapshot restoration may become expensive

Restoring a large state can take time, particularly when snapshots contain extensive data.

### 4. External side effects are not automatically reversed

Restoring an object's state doesn't automatically reverse a payment, undo a sent email, or reverse a database operation.

Those operations need their own compensating logic and appropriate transactional safeguards.

## 13. Common Mistakes

### Mistake 1: Saving a reference instead of a snapshot

Consider this code:

```js
const state = {
  text: "Hello",
};

const savedState = state;

state.text = "Goodbye";

console.log(savedState.text);
// Goodbye
```

The saved variable points to the same object. It isn't a separate snapshot.

A simple shallow copy works for this particular object:

```js
const state = {
  text: "Hello",
};

const savedState = { ...state };

state.text = "Goodbye";

console.log(savedState.text);
// Hello
```

For nested mutable data, a shallow copy may not be enough.

### Mistake 2: Saving after making the change

If you save only after changing the state, you may accidentally preserve the new version rather than the state needed for Undo.

For a simple before-change history, capture the current state before applying the edit.

### Mistake 3: Letting the caretaker change snapshot internals

The caretaker should manage snapshots rather than modify their internal data directly.

Keep snapshot creation and restoration responsibilities with the originator.

### Mistake 4: Forgetting Redo history rules

In a linear Undo/Redo system, a new edit after Undo should usually clear the redo stack.

Otherwise, Redo might restore a state from an abandoned history branch.

### Mistake 5: Saving too much

You don't always need a full snapshot after every tiny change. Choose a strategy that fits the size of the state and the experience your application needs.

## 14. Practice Exercises

Try solving each exercise before opening its solution.

### Exercise 1: Save and Restore a Counter

Create a `Counter` class that:

- Stores a number.
- Has an `increment()` method.
- Can save its current state.
- Can restore a saved state.

<details>
<summary>Show solution</summary>

```js
class CounterMemento {
  constructor(value) {
    this.value = value;
    Object.freeze(this);
  }
}

class Counter {
  #value = 0;

  get value() {
    return this.#value;
  }

  increment() {
    this.#value++;
  }

  save() {
    return new CounterMemento(this.#value);
  }

  restore(memento) {
    this.#value = memento.value;
  }
}

const counter = new Counter();

counter.increment();
counter.increment();

const snapshot = counter.save();

counter.increment();

console.log(counter.value); // 3

counter.restore(snapshot);

console.log(counter.value); // 2
```

The memento captures the counter's value at the moment `save()` is called.

</details>

### Exercise 2: Create an Undoable Notes App

Create a `NotesApp` class that:

- Stores a note as a string.
- Allows the note to be updated.
- Saves the previous state before every update.
- Supports Undo.

<details>
<summary>Show solution</summary>

```js
class NoteMemento {
  constructor(content) {
    this.content = content;
    Object.freeze(this);
  }
}

class NotesApp {
  #content = "";
  #history = [];

  get content() {
    return this.#content;
  }

  update(content) {
    this.#history.push(
      new NoteMemento(this.#content)
    );

    this.#content = content;
  }

  undo() {
    const previous = this.#history.pop();

    if (previous) {
      this.#content = previous.content;
    }
  }
}

const notes = new NotesApp();

notes.update("My first note");
notes.update("My updated note");

console.log(notes.content);
// My updated note

notes.undo();

console.log(notes.content);
// My first note
```

The history stores previous note contents, and Undo restores the most recent one.

</details>

### Exercise 3: Add Redo to the Notes App

Extend Exercise 2 with:

- An Undo stack.
- A Redo stack.
- A `redo()` method.
- Redo history clearing when a new update occurs.

<details>
<summary>Show solution</summary>

```js
class NoteMemento {
  constructor(content) {
    this.content = content;
    Object.freeze(this);
  }
}

class NotesApp {
  #content = "";
  #undoStack = [];
  #redoStack = [];

  get content() {
    return this.#content;
  }

  update(content) {
    this.#undoStack.push(
      new NoteMemento(this.#content)
    );

    this.#content = content;
    this.#redoStack = [];
  }

  undo() {
    if (this.#undoStack.length === 0) {
      return;
    }

    this.#redoStack.push(
      new NoteMemento(this.#content)
    );

    this.#content = this.#undoStack.pop().content;
  }

  redo() {
    if (this.#redoStack.length === 0) {
      return;
    }

    this.#undoStack.push(
      new NoteMemento(this.#content)
    );

    this.#content = this.#redoStack.pop().content;
  }
}

const notes = new NotesApp();

notes.update("First");
notes.update("Second");
notes.update("Third");

notes.undo();
console.log(notes.content); // Second

notes.undo();
console.log(notes.content); // First

notes.redo();
console.log(notes.content); // Second

notes.update("New version");
notes.redo();

console.log(notes.content); // New version
```

The final `redo()` does nothing because the new update cleared the redo history.

</details>

### Exercise 4: Save Multiple Properties

Create a `Player` class with:

- `name`
- `health`
- `level`

Add methods to save and restore all three properties together.

<details>
<summary>Show solution</summary>

```js
class PlayerMemento {
  constructor(state) {
    this.state = Object.freeze({ ...state });
    Object.freeze(this);
  }

  getState() {
    return { ...this.state };
  }
}

class Player {
  #name;
  #health;
  #level;

  constructor(name, health, level) {
    this.#name = name;
    this.#health = health;
    this.#level = level;
  }

  takeDamage(amount) {
    this.#health = Math.max(0, this.#health - amount);
  }

  levelUp() {
    this.#level++;
  }

  save() {
    return new PlayerMemento({
      name: this.#name,
      health: this.#health,
      level: this.#level,
    });
  }

  restore(memento) {
    const state = memento.getState();

    this.#name = state.name;
    this.#health = state.health;
    this.#level = state.level;
  }

  getInfo() {
    return {
      name: this.#name,
      health: this.#health,
      level: this.#level,
    };
  }
}

const player = new Player("Hero", 100, 1);

const checkpoint = player.save();

player.takeDamage(40);
player.levelUp();

console.log(player.getInfo());
// { name: "Hero", health: 60, level: 2 }

player.restore(checkpoint);

console.log(player.getInfo());
// { name: "Hero", health: 100, level: 1 }
```

The memento preserves a snapshot of multiple properties and restores them together.

</details>

## 15. Final Recap

You have learned:

- What the Memento Pattern is and when to use it.
- The roles of Originator, Memento, and Caretaker.
- How to save and restore object state.
- How to implement Undo and Redo.
- Why snapshot copying and encapsulation matter.
- How Memento differs from Command.
- The pattern's advantages, limitations, and common mistakes.

**The most important takeaway:**

The Memento Pattern captures an object's state at a particular moment so that the state can be restored later, while keeping the object's internal representation encapsulated.

## 16. What's Next?



