# Lesson 2: The Singleton Pattern in JavaScript

## 1. What Is the Singleton Pattern?

The **Singleton Pattern** is a creational design pattern that ensures a class has only one instance and provides a way to access that instance.

In simple words:

> Create one shared object and reuse that same object throughout the application instead of creating multiple independent instances.

### Real-world analogy

Imagine an application has a central settings manager.

It stores settings such as:

- Application theme
- Language preference
- Application configuration

If different parts of the application create separate settings managers, they might store different values.

Instead, you might want all those parts to access the same settings manager.

That's the idea behind the Singleton Pattern.

### Important terminology

| Term | Meaning |
|---|---|
| Class | A blueprint for creating objects. |
| Instance | An object created from a class. |
| Singleton | A design approach that provides one shared instance. |
| Static property | A property that belongs to the class itself rather than an individual instance. |

---

## 2. The Problem: Creating Multiple Instances

Let's create a simple settings class.

```js
class AppSettings {
  constructor() {
    this.theme = "light";
  }
}

const settings1 = new AppSettings();
const settings2 = new AppSettings();

console.log(settings1.theme); // "light"
console.log(settings2.theme); // "light"

console.log(settings1 === settings2); // false
```

### Why does this happen?

Every time we use `new AppSettings()`, JavaScript creates a new object.

```js
const settings1 = new AppSettings();
const settings2 = new AppSettings();
```

These variables refer to two different objects.

Even though both objects initially contain the same data, they have separate identities.

Let's change the theme of the first object.

```js
settings1.theme = "dark";

console.log(settings1.theme); // "dark"
console.log(settings2.theme); // "light"
```

Changing one object does not change the other.

This behavior is correct, but sometimes we want all parts of an application to share the same instance.

That's where the Singleton Pattern can help.

---

## 3. Understanding Object Identity

Before implementing Singleton, let's understand an important JavaScript concept.

Two objects can have identical properties but still be different objects.

```js
const user1 = {
  name: "Ali"
};

const user2 = {
  name: "Ali"
};

console.log(user1 === user2); // false
```

Both objects have the same property and value, but they are separate objects.

Now consider this example.

```js
const user1 = {
  name: "Ali"
};

const user2 = user1;

console.log(user1 === user2); // true
```

Here, `user2` references the same object as `user1`.

Changing the object through either variable affects the same underlying object.

```js
user2.name = "Ahmed";

console.log(user1.name); // "Ahmed"
```

**Key takeaway:** Singleton is about sharing the same instance, not merely creating objects with identical data.

---

## 4. Implementing Singleton Using a Class

Let's implement a Singleton step by step.

### Step 1: Create the class

First, define an ordinary class.

```js
class AppSettings {
  constructor() {
    this.theme = "light";
  }
}
```

This class creates a new instance every time its constructor is called using `new`.

We need to change that behavior.

### Step 2: Add a static property

A static property belongs to the class itself rather than to individual instances.

```js
class AppSettings {
  static instance;

  constructor() {
    this.theme = "light";
  }
}
```

We can access the static property through the class:

```js
console.log(AppSettings.instance);
```

Initially, its value is `undefined`.

We'll use this property to store the shared instance.

### Step 3: Check whether an instance already exists

```js
class AppSettings {
  static instance;

  constructor() {
    if (AppSettings.instance) {
      return AppSettings.instance;
    }

    this.theme = "light";

    AppSettings.instance = this;
  }
}
```

Let's understand the important parts.

#### Check for an existing instance

```js
if (AppSettings.instance) {
  return AppSettings.instance;
}
```

When the constructor runs, it checks whether an instance already exists.

- If an instance exists, the constructor returns the stored object.
- If no instance exists, the constructor continues initializing the new object.

#### Initialize the first instance

```js
this.theme = "light";
```

Inside the constructor, `this` refers to the newly created instance.

#### Store the instance

```js
AppSettings.instance = this;
```

This saves the first instance so subsequent constructor calls can reuse it.

### Step 4: Test the Singleton

```js
class AppSettings {
  static instance;

  constructor() {
    if (AppSettings.instance) {
      return AppSettings.instance;
    }

    this.theme = "light";

    AppSettings.instance = this;
  }
}

const settings1 = new AppSettings();
const settings2 = new AppSettings();

console.log(settings1 === settings2); // true
```

Both variables now reference the same instance.

Let's verify that changes are shared.

```js
settings1.theme = "dark";

console.log(settings2.theme); // "dark"
```

Because both variables reference the same object, the updated value is visible through both.

**Important:** This is a basic class-based Singleton implementation. It works for ordinary construction through this class, but it does not guarantee one instance across separate JavaScript execution contexts or independent copies of a module.

---

## 5. A Practical Example: Logger Singleton

A logger records messages about what an application is doing.

For example, it might record:

- When the application starts.
- When a user logs in.
- When a task completes.

Suppose different parts of the application need to use the logger.

We can create a shared logger instance.

### Implementation

```js
class Logger {
  static instance;

  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    this.logs = [];

    Logger.instance = this;
  }

  log(message) {
    this.logs.push(message);

    console.log(message);
  }

  getLogs() {
    return [...this.logs];
  }
}

const logger1 = new Logger();
const logger2 = new Logger();

logger1.log("Application started");
logger2.log("User logged in");

console.log(logger1 === logger2); // true

console.log(logger1.getLogs());
// ["Application started", "User logged in"]
```

### How does it work?

First, we create a logger.

```js
const logger1 = new Logger();
```

The constructor creates the `logs` array and saves the instance.

Next, we create another logger.

```js
const logger2 = new Logger();
```

Instead of returning a separate logger object, the constructor returns the existing instance.

Both variables reference the same logger.

When we call:

```js
logger1.log("Application started");
logger2.log("User logged in");
```

Both messages are added to the same `logs` array.

### Why use `[...this.logs]`?

Our `getLogs()` method returns a copy of the array.

```js
getLogs() {
  return [...this.logs];
}
```

This prevents callers from directly modifying the logger's internal array through the returned value.

For example:

```js
const logs = logger1.getLogs();

logs.push("Fake message");

console.log(logger1.getLogs());
// ["Application started", "User logged in"]
```

The original array remains unchanged.

This is a useful encapsulation technique, although it makes only a shallow copy.

---

## 6. A Cleaner Approach: Singleton Using a Module

In modern JavaScript, a module is often a simpler way to share one object.

JavaScript modules are evaluated once per resolved module instance in a given JavaScript environment. Subsequent imports of that same module instance reuse its exports.

Instead of enforcing Singleton behavior through a class constructor, we can create and export one object.

### Step 1: Create `settings.js`

```js
class AppSettings {
  constructor() {
    this.theme = "light";
    this.language = "en";
  }

  setTheme(theme) {
    this.theme = theme;
  }

  getTheme() {
    return this.theme;
  }
}

const settings = new AppSettings();

export default settings;
```

Notice that we create the object only once in the module.

```js
const settings = new AppSettings();
```

Then we export that object.

```js
export default settings;
```

### Step 2: Use it in `app.js`

```js
import settings from "./settings.js";

console.log(settings.getTheme()); // "light"

settings.setTheme("dark");

console.log(settings.getTheme()); // "dark"
```

### Step 3: Use it in another file

For example, in `dashboard.js`:

```js
import settings from "./settings.js";

console.log(settings.getTheme()); // "dark"
```

Provided both files import the same resolved module instance in the same JavaScript environment, they use the same settings object.

### Why is this approach useful?

- Object creation happens in one place.
- Importing code can use the shared object directly.
- There is no need for a special constructor check.
- The code is straightforward and easy to understand.

**Recommendation:** In many modern JavaScript applications, exporting a shared module instance is simpler than implementing Singleton behavior inside a class.

---

## 7. Singleton vs. Factory Pattern

You have now learned two creational design patterns.

They solve different problems.

| Feature | Factory Pattern | Singleton Pattern |
|---|---|---|
| Main purpose | Centralize object creation. | Provide one shared instance. |
| Main question | Which object should be created? | How can different parts share one instance? |
| Typical result | May create many different objects. | Reuses one particular instance. |
| Example | Creating email or SMS notifications. | Sharing an application settings object. |

### Factory example

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

The factory selects which object to create.

### Singleton example

```js
const settings = new AppSettings();
```

A module can export this one object so different files reuse it.

**Remember:**

- Factory focuses on *how objects are created*.
- Singleton focuses on *sharing a particular instance*.

The patterns can also be used together, depending on the design.

---

## 8. Advantages of the Singleton Pattern

### 1. Shared state

Different parts of an application can access the same object and its state.

```js
settings.setTheme("dark");
```

Other code using that same instance can observe the updated theme.

### 2. Centralized management

A shared object can manage configuration, caching, or logging from one place.

### 3. Avoiding unnecessary instances

When a resource is intended to be shared, a Singleton-style design can prevent repeated construction of equivalent objects.

### 4. Convenient access

With module exports, different files can import a shared instance without manually passing it through every function.

However, dependency injection and explicit parameter passing can be better choices when you want dependencies to remain visible and easy to replace.

---

## 9. Disadvantages of the Singleton Pattern

Singleton is useful in some situations, but it also has drawbacks.

### 1. Global shared state

If many parts of an application can modify the same object, tracking changes can become difficult.

For example:

```js
settings.setTheme("dark");
```

If another module later changes the theme to `"light"`, the first module might not expect that change.

### 2. Harder testing

Tests can interfere with one another when they share a mutable Singleton instance.

For example, one test might change a setting and forget to restore it.

### 3. Hidden dependencies

A module that imports a global shared object may depend on it without making that dependency obvious in its function parameters.

### 4. More difficult replacement

Code tightly coupled to one shared instance can be harder to test with a mock object or replace with another implementation.

### Should you always use Singleton?

No.

Use it only when a shared instance genuinely makes the design clearer.

A normal object, a module export, or a dependency passed into a function may be a better solution.

---

## 10. Common Mistakes

### Mistake 1: Thinking identical objects are the same instance

```js
const first = { theme: "light" };
const second = { theme: "light" };

console.log(first === second); // false
```

Identical properties do not mean identical object identity.

### Mistake 2: Forgetting to save the instance

```js
class AppSettings {
  constructor() {
    this.theme = "light";
  }
}
```

This is an ordinary class, not a Singleton implementation.

Each call to `new AppSettings()` creates another instance.

### Mistake 3: Assuming a Singleton is shared everywhere

A module-level Singleton is generally shared among imports of the same resolved module instance in the same JavaScript environment.

Different workers, processes, isolated environments, or duplicated module instances can have separate objects.

### Mistake 4: Using Singleton for everything

Not every service needs one shared instance.

For example, creating multiple independent user objects is usually reasonable:

```js
const user1 = new User("Ali");
const user2 = new User("Sara");
```

Each user represents a different entity and should usually have a separate instance.

---

## 11. Practice Exercises

Try solving these exercises before revealing the solutions.

### Exercise 1: Create a Singleton Counter

Create a `Counter` class that:

- Stores a `count` property initialized to `0`.
- Has an `increment()` method that increases the count by `1`.
- Has a `getCount()` method that returns the count.
- Ensures that repeated construction through the class returns the same instance.

Test it by creating two variables.

```js
const counter1 = new Counter();
const counter2 = new Counter();

counter1.increment();

console.log(counter1 === counter2); // true
console.log(counter2.getCount());   // 1
```

<details>
  <summary>Show solution</summary>

  ```js
  class Counter {
    static instance;

    constructor() {
      if (Counter.instance) {
        return Counter.instance;
      }

      this.count = 0;

      Counter.instance = this;
    }

    increment() {
      this.count++;
    }

    getCount() {
      return this.count;
    }
  }

  const counter1 = new Counter();
  const counter2 = new Counter();

  counter1.increment();

  console.log(counter1 === counter2); // true
  console.log(counter2.getCount());   // 1
  ```

</details>

### Exercise 2: Create a Singleton Application Configuration

Create an `AppConfig` class that:

- Stores an application name.
- Stores a debug mode setting.
- Returns the same instance when constructed repeatedly.
- Provides a method to update debug mode.
- Provides a method to retrieve the current settings.

Expected behavior:

```js
const config1 = new AppConfig();
const config2 = new AppConfig();

console.log(config1 === config2); // true
```

<details>
  <summary>Show solution</summary>

  ```js
  class AppConfig {
    static instance;

    constructor() {
      if (AppConfig.instance) {
        return AppConfig.instance;
      }

      this.appName = "My Application";
      this.debug = false;

      AppConfig.instance = this;
    }

    setDebug(value) {
      this.debug = value;
    }

    getSettings() {
      return {
        appName: this.appName,
        debug: this.debug
      };
    }
  }

  const config1 = new AppConfig();
  const config2 = new AppConfig();

  config1.setDebug(true);

  console.log(config1 === config2); // true
  console.log(config2.getSettings());

  // {
  //   appName: "My Application",
  //   debug: true
  // }
  ```

</details>

---

## 12. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Singleton? | Creational. |
| What is its main purpose? | To provide one shared instance. |
| What does `static` mean here? | The property belongs to the class rather than an individual instance. |
| Why store `this`? | To retain the first created instance. |
| What does `===` check for objects? | Whether both references point to the same object. |
| Is Singleton always necessary? | No. Use it only when shared-instance behavior is appropriate. |
| What is a common modern JavaScript approach? | Export one shared object from a module. |

## 13. What's Next?

You've now learned:

1. **Factory Pattern** — centralize the creation of different object types.
2. **Singleton Pattern** — share one particular instance.

The next pattern in our learning sequence is:

### Lesson 3: The Builder Pattern

The Builder Pattern helps you construct complex objects step by step, especially when an object has many optional settings or configuration choices.

For example, you could build a user profile with a name, email, role, preferences, and optional metadata without putting every construction detail into one long constructor.

Once you're comfortable with Singleton, continue with the Builder Pattern.
