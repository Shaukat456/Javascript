# Lesson 3: The Builder Pattern in JavaScript

## 1. What Is the Builder Pattern?

The **Builder Pattern** is a creational design pattern that lets you construct complex objects step by step.

Instead of passing many arguments to a constructor at once, you build an object by setting its properties or calling methods one at a time.

In simple words:

> The Builder Pattern separates the process of constructing an object from the final object itself.

### Real-world analogy

Imagine ordering a customized burger.

You choose:

- The bun
- The cheese
- The sauce
- The vegetables
- The toppings

You don't need to decide everything in one complicated step. You can customize the burger gradually until it's ready.

The Builder Pattern follows a similar idea: create an object by specifying its configuration step by step.

### When is it useful?

It is particularly useful when:

- An object has many optional properties.
- Construction involves several steps.
- You want readable object creation code.
- You want to validate configuration before producing the final object.

---

## 2. The Problem: A Constructor With Too Many Arguments

Imagine you're building a user profile system.

A user can have a name, email, age, role, and several optional settings.

You might create a class like this:

```js
class User {
  constructor(
    name,
    email,
    age,
    role,
    isActive,
    theme
  ) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.role = role;
    this.isActive = isActive;
    this.theme = theme;
  }
}

const user = new User(
  "Ali",
  "ali@example.com",
  22,
  "admin",
  true,
  "dark"
);

console.log(user);
```

This works, but it has some problems.

### Problem 1: Too many arguments

The constructor expects several values in a specific order.

```js
new User("Ali", "ali@example.com", 22, "admin", true, "dark");
```

It can be difficult to remember which argument belongs to which property.

### Problem 2: Optional properties

What if you don't want to specify an age or theme?

You might have to pass `undefined` or introduce more complicated constructor logic.

### Problem 3: Readability

This code doesn't immediately explain what each argument represents.

```js
new User("Ali", "ali@example.com", 22, "admin", true, "dark");
```

A Builder can make the construction process easier to understand.

---

## 3. A Simple Alternative: Object Arguments

Before introducing a Builder, JavaScript offers a simple solution: pass an object to the constructor.

```js
class User {
  constructor({
    name,
    email,
    age = null,
    role = "user",
    isActive = true,
    theme = "light"
  }) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.role = role;
    this.isActive = isActive;
    this.theme = theme;
  }
}

const user = new User({
  name: "Ali",
  email: "ali@example.com",
  role: "admin",
  theme: "dark"
});

console.log(user);
```

Now the arguments have descriptive names.

This is often enough for ordinary objects.

**Important:** You don't need the Builder Pattern whenever a constructor has several parameters. Object arguments are simpler when construction is straightforward.

A Builder becomes more useful when object construction involves multiple steps, validation, conditional configuration, or more elaborate rules.

---

## 4. Creating a Builder Class

Let's implement the Builder Pattern.

We'll use the same `User` example.

### Step 1: Create the final object class

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.age = null;
    this.role = "user";
    this.isActive = true;
    this.theme = "light";
  }
}
```

This class represents the final user object.

The required properties are `name` and `email`. Other properties receive default values.

### Step 2: Create the `UserBuilder` class

```js
class UserBuilder {
  constructor(name, email) {
    this.user = new User(name, email);
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setRole(role) {
    this.user.role = role;
    return this;
  }

  setActive(isActive) {
    this.user.isActive = isActive;
    return this;
  }

  setTheme(theme) {
    this.user.theme = theme;
    return this;
  }

  build() {
    return this.user;
  }
}
```

Let's understand the important parts.

#### Creating the initial object

```js
constructor(name, email) {
  this.user = new User(name, email);
}
```

The builder creates the initial `User` object with the required properties and defaults.

#### Adding configuration methods

```js
setAge(age) {
  this.user.age = age;
  return this;
}
```

This method updates the user's age.

But why does it return `this`?

Because `this` refers to the current `UserBuilder` instance.

Returning it allows us to call another builder method immediately.

#### Finalizing the object

```js
build() {
  return this.user;
}
```

The `build()` method returns the completed user object.

### Step 3: Use the Builder

```js
const user = new UserBuilder("Ali", "ali@example.com")
  .setAge(22)
  .setRole("admin")
  .setTheme("dark")
  .build();

console.log(user);
```

The object is configured one step at a time.

You can also skip optional properties:

```js
const anotherUser = new UserBuilder(
  "Sara",
  "sara@example.com"
).build();

console.log(anotherUser);
```

The skipped properties retain their default values.

---

## 5. Understanding Method Chaining

Method chaining is a technique that allows multiple method calls to be written in one expression.

For example:

```js
const user = new UserBuilder("Ali", "ali@example.com")
  .setAge(22)
  .setRole("admin")
  .setTheme("dark")
  .build();
```

This works because each configuration method returns the builder instance.

Consider this method:

```js
setRole(role) {
  this.user.role = role;
  return this;
}
```

If it didn't return `this`, the chain would break.

For example:

```js
setRole(role) {
  this.user.role = role;
}
```

Now this expression would fail:

```js
new UserBuilder("Ali", "ali@example.com")
  .setRole("admin")
  .setTheme("dark");
```

The first method would return `undefined`, so JavaScript couldn't call `.setTheme()` on the result.

**Key takeaway:** Returning `this` enables method chaining by returning the same builder instance after each operation.

---

## 6. Adding Validation to a Builder

A useful advantage of a Builder is that you can validate values before returning the final object.

Let's improve the example.

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.age = null;
    this.role = "user";
    this.isActive = true;
    this.theme = "light";
  }
}

class UserBuilder {
  constructor(name, email) {
    this.user = new User(name, email);
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setRole(role) {
    this.user.role = role;
    return this;
  }

  setTheme(theme) {
    this.user.theme = theme;
    return this;
  }

  build() {
    if (!this.user.name) {
      throw new Error("Name is required");
    }

    if (!this.user.email) {
      throw new Error("Email is required");
    }

    if (
      this.user.age !== null &&
      (!Number.isInteger(this.user.age) || this.user.age < 0)
    ) {
      throw new Error("Age must be a non-negative integer");
    }

    if (!["light", "dark"].includes(this.user.theme)) {
      throw new Error("Theme must be light or dark");
    }

    return this.user;
  }
}

const user = new UserBuilder("Ali", "ali@example.com")
  .setAge(22)
  .setRole("admin")
  .setTheme("dark")
  .build();

console.log(user);
```

### What does `build()` do?

It checks the configured properties before returning the object.

```js
if (!this.user.name) {
  throw new Error("Name is required");
}
```

If the name is missing, it throws an error instead of returning an invalid object.

The same idea applies to the other validation rules.

**Design principle:** Keep validation rules close to the code responsible for constructing and validating the object.

---

## 7. A Practical Example: Building a Computer

Let's use another example to see where the Builder Pattern becomes useful.

A computer can have several configurable parts:

- CPU
- RAM
- Storage
- Graphics card
- Operating system

Not every computer needs the same configuration.

### Implementation

```js
class Computer {
  constructor() {
    this.cpu = "Basic CPU";
    this.ram = "8GB";
    this.storage = "256GB SSD";
    this.gpu = null;
    this.operatingSystem = "Linux";
  }
}

class ComputerBuilder {
  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu) {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram) {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage) {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu) {
    this.computer.gpu = gpu;
    return this;
  }

  setOperatingSystem(os) {
    this.computer.operatingSystem = os;
    return this;
  }

  build() {
    return this.computer;
  }
}
```

### Build a gaming computer

```js
const gamingComputer = new ComputerBuilder()
  .setCPU("High-performance CPU")
  .setRAM("32GB")
  .setStorage("2TB SSD")
  .setGPU("Dedicated GPU")
  .setOperatingSystem("Windows")
  .build();

console.log(gamingComputer);
```

### Build a basic computer

```js
const basicComputer = new ComputerBuilder()
  .setCPU("Basic CPU")
  .setRAM("8GB")
  .setStorage("256GB SSD")
  .build();

console.log(basicComputer);
```

Both objects use the same builder but have different configurations.

The basic computer keeps its default GPU and operating system values.

This example demonstrates how a Builder can simplify the creation of objects with many configurable properties.

---

## 8. Builder Pattern vs. Factory Pattern

Both patterns are creational, but they solve different problems.

| Feature | Factory Pattern | Builder Pattern |
|---|---|---|
| Main purpose | Centralize object creation and select an appropriate type. | Construct an object step by step. |
| Main question | Which object should I create? | How should I configure this object? |
| Typical input | A type or selection value. | A sequence of configuration choices. |
| Example | Create an email or SMS notification. | Configure a computer with different components. |

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

The factory chooses which kind of notification to create.

### Builder example

```js
const computer = new ComputerBuilder()
  .setRAM("32GB")
  .setStorage("2TB SSD")
  .setGPU("Dedicated GPU")
  .build();
```

The builder configures one object step by step.

**Remember:**

- Factory: choose and create an appropriate object.
- Builder: configure and construct an object step by step.

They can also be combined when an application needs to select a product type and then configure it.

---

## 9. Advantages of the Builder Pattern

### 1. Improved readability

Instead of passing many positional arguments, each method describes what is being configured.

```js
new ComputerBuilder()
  .setRAM("32GB")
  .setGPU("Dedicated GPU")
  .build();
```

### 2. Flexible configuration

You can set only the optional properties you need.

### 3. Centralized construction logic

The builder can manage defaults, validation, and the final construction process.

### 4. Easier maintenance

If an object gains new optional configuration properties, you can often add a builder method without changing every existing call site.

### 5. Clearer separation of responsibilities

The builder manages construction, while the final class represents the resulting object.

---

## 10. Disadvantages of the Builder Pattern

### 1. More code

You may need to create an additional builder class and several methods.

For a simple object, this can be unnecessary complexity.

### 2. More objects and methods to understand

Developers need to understand both the object class and its builder.

### 3. Mutable builder state

A builder typically changes its configuration as methods are called.

If you reuse the same builder carelessly, old settings might carry into the next object.

For example:

```js
const builder = new ComputerBuilder();

const firstComputer = builder
  .setRAM("32GB")
  .build();

const secondComputer = builder
  .setCPU("Different CPU")
  .build();
```

In this implementation, both returned variables refer to the same `Computer` object because the builder retains and returns that object.

Changing the builder again can affect the object previously returned.

A safer design can create a fresh object during `build()` or create a new builder for each construction.

---

## 11. A Safer Builder Implementation

Let's improve the computer example so each call to `build()` produces an independent object.

```js
class Computer {
  constructor({
    cpu = "Basic CPU",
    ram = "8GB",
    storage = "256GB SSD",
    gpu = null,
    operatingSystem = "Linux"
  } = {}) {
    this.cpu = cpu;
    this.ram = ram;
    this.storage = storage;
    this.gpu = gpu;
    this.operatingSystem = operatingSystem;
  }
}

class ComputerBuilder {
  constructor() {
    this.config = {};
  }

  setCPU(cpu) {
    this.config.cpu = cpu;
    return this;
  }

  setRAM(ram) {
    this.config.ram = ram;
    return this;
  }

  setStorage(storage) {
    this.config.storage = storage;
    return this;
  }

  setGPU(gpu) {
    this.config.gpu = gpu;
    return this;
  }

  setOperatingSystem(operatingSystem) {
    this.config.operatingSystem = operatingSystem;
    return this;
  }

  build() {
    return new Computer({ ...this.config });
  }
}

const builder = new ComputerBuilder();

const firstComputer = builder
  .setRAM("32GB")
  .build();

const secondComputer = builder
  .setCPU("High-performance CPU")
  .build();

console.log(firstComputer.ram); // "32GB"
console.log(firstComputer.cpu); // "Basic CPU"

console.log(secondComputer.ram); // "32GB"
console.log(secondComputer.cpu); // "High-performance CPU"

console.log(firstComputer === secondComputer); // false
```

### Why is this safer?

The builder stores configuration rather than one permanent `Computer` instance.

Every time `build()` runs, it creates a new object:

```js
return new Computer({ ...this.config });
```

The spread syntax copies the configuration properties into a new object.

The constructor then applies the defaults for any properties that were not provided.

This example intentionally keeps previous builder settings, so the second computer inherits the previously configured RAM. If you want completely independent configurations, create a new builder for each computer or reset the configuration after building.

---

## 12. Practice Exercises

Try solving these exercises before revealing the solutions.

### Exercise 1: Create a Pizza Builder

Create a `Pizza` class and a `PizzaBuilder` class.

Your pizza should support:

- `setSize(size)`
- `addCheese()`
- `addPepperoni()`
- `addMushrooms()`
- `build()`

Use method chaining.

Expected usage:

```js
const pizza = new PizzaBuilder()
  .setSize("Large")
  .addCheese()
  .addPepperoni()
  .build();

console.log(pizza);
```

<details>
  <summary>Show solution</summary>

  ```js
  class Pizza {
    constructor(size) {
      this.size = size;
      this.cheese = false;
      this.pepperoni = false;
      this.mushrooms = false;
    }
  }

  class PizzaBuilder {
    constructor() {
      this.pizza = new Pizza("Medium");
    }

    setSize(size) {
      this.pizza.size = size;
      return this;
    }

    addCheese() {
      this.pizza.cheese = true;
      return this;
    }

    addPepperoni() {
      this.pizza.pepperoni = true;
      return this;
    }

    addMushrooms() {
      this.pizza.mushrooms = true;
      return this;
    }

    build() {
      return this.pizza;
    }
  }

  const pizza = new PizzaBuilder()
    .setSize("Large")
    .addCheese()
    .addPepperoni()
    .build();

  console.log(pizza);

  // Pizza {
  //   size: "Large",
  //   cheese: true,
  //   pepperoni: true,
  //   mushrooms: false
  // }
  ```

</details>

### Exercise 2: Create a Website Configuration Builder

Create a builder that configures a website with:

- A title
- A theme
- A language
- A responsive setting

Your builder should provide:

- `setTitle(title)`
- `setTheme(theme)`
- `setLanguage(language)`
- `setResponsive(value)`
- `build()`

Expected usage:

```js
const website = new WebsiteBuilder()
  .setTitle("My Portfolio")
  .setTheme("dark")
  .setLanguage("en")
  .setResponsive(true)
  .build();

console.log(website);
```

<details>
  <summary>Show solution</summary>

  ```js
  class Website {
    constructor() {
      this.title = "Untitled Website";
      this.theme = "light";
      this.language = "en";
      this.responsive = true;
    }
  }

  class WebsiteBuilder {
    constructor() {
      this.website = new Website();
    }

    setTitle(title) {
      this.website.title = title;
      return this;
    }

    setTheme(theme) {
      this.website.theme = theme;
      return this;
    }

    setLanguage(language) {
      this.website.language = language;
      return this;
    }

    setResponsive(value) {
      this.website.responsive = value;
      return this;
    }

    build() {
      return this.website;
    }
  }

  const website = new WebsiteBuilder()
    .setTitle("My Portfolio")
    .setTheme("dark")
    .setLanguage("en")
    .setResponsive(true)
    .build();

  console.log(website);
  ```

</details>

---

## 13. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Builder? | Creational. |
| What is its main purpose? | Construct objects step by step. |
| What is method chaining? | Calling methods one after another in the same expression. |
| Why return `this` from builder methods? | To allow additional methods to be called on the same builder. |
| What does `build()` usually do? | Produces the final object from the configured values. |
| When is Builder useful? | When construction has many options, steps, or validation rules. |
| Should every object use Builder? | No. Simple constructors or object arguments are often enough. |

## 14. What's Next?

You've now learned three creational design patterns:

1. **Factory Pattern** — create the appropriate type of object.
2. **Singleton Pattern** — share a particular instance.
3. **Builder Pattern** — construct and configure objects step by step.

The next pattern is:

### Lesson 4: The Adapter Pattern

The Adapter Pattern is a structural design pattern that allows two incompatible interfaces to work together.

For example, imagine your application expects a payment service to provide a `pay()` method, but an external service provides a `makePayment()` method. An adapter can translate between those interfaces without requiring you to rewrite the external service.

