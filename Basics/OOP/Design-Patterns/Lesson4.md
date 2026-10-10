# Lesson 5: The Decorator Pattern in JavaScript

## 1. What Is the Decorator Pattern?

The **Decorator Pattern** is a structural design pattern that allows you to add new behavior or responsibilities to an object without modifying its original class.

In simple words:

> A Decorator wraps an existing object and adds extra functionality while preserving the original object's behavior.

Instead of creating a new class for every possible combination of features, you can add features when needed.

### Real-world analogy

Imagine ordering a coffee.

You start with a basic coffee. Then you add:

- Milk
- Sugar
- Extra espresso
- Whipped cream

Each addition changes the final drink.

You don't need to create a separate class for every possible combination of ingredients. You can start with the basic coffee and decorate it with additional features.

The Decorator Pattern follows a similar idea in software development.

### Common use cases

- Adding features to objects dynamically.
- Adding logging around existing operations.
- Adding caching to a service.
- Adding validation to an existing workflow.
- Extending objects without modifying their original classes.
- Combining optional features in different ways.

---

## 2. The Problem: Too Many Subclasses

Imagine you're building a coffee-ordering application.

First, create a basic coffee class.

```js
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return "Basic Coffee";
  }
}

const coffee = new Coffee();

console.log(coffee.description()); // "Basic Coffee"
console.log(coffee.cost()); // 5
```

Now customers want to customize their coffee with milk and sugar.

One approach is to create additional classes.

```js
class CoffeeWithMilk extends Coffee {
  cost() {
    return super.cost() + 1;
  }

  description() {
    return super.description() + " + Milk";
  }
}

class CoffeeWithSugar extends Coffee {
  cost() {
    return super.cost() + 0.5;
  }

  description() {
    return super.description() + " + Sugar";
  }
}
```

This works for individual additions.

However, what happens when customers want:

- Coffee with milk and sugar.
- Coffee with milk and whipped cream.
- Coffee with sugar and extra espresso.
- Coffee with milk, sugar, and whipped cream.

You might end up creating a subclass for every combination.

With enough optional features, the number of combinations can grow rapidly.

For `n` independent optional features, there can be up to \(2^n\) combinations.

This can make the inheritance structure difficult to maintain.

The Decorator Pattern provides another approach.

---

## 3. Understanding the Core Idea

Instead of creating a subclass for every combination, we wrap an object with another object that adds a feature.

The general structure looks like this:

```text
Basic Object
     |
     v
Decorator A
     |
     v
Decorator B
     |
     v
Final Object
```

Each decorator adds behavior while preserving the interface expected by the calling code.

For example:

```text
Basic Coffee
     |
     v
Add Milk
     |
     v
Add Sugar
     |
     v
Coffee with Milk and Sugar
```

The important idea is that decorators can be combined.

You can add only milk, only sugar, or both.

---

## 4. Implementing the Decorator Pattern

Let's build the coffee example step by step.

### Step 1: Create the base class

```js
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return "Basic Coffee";
  }
}
```

This represents the original object.

It has two methods:

- `cost()` returns the coffee's price.
- `description()` returns its description.

### Step 2: Create a Milk Decorator

```js
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return this.coffee.description() + " + Milk";
  }
}
```

Let's understand the important parts.

#### Store the original object

```js
constructor(coffee) {
  this.coffee = coffee;
}
```

The decorator receives an existing coffee object and stores it.

#### Add to the cost

```js
cost() {
  return this.coffee.cost() + 1;
}
```

Instead of replacing the original cost, the decorator adds its own cost to the wrapped object's cost.

#### Extend the description

```js
description() {
  return this.coffee.description() + " + Milk";
}
```

The decorator preserves the original description and adds information about milk.

### Step 3: Create a Sugar Decorator

```js
class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 0.5;
  }

  description() {
    return this.coffee.description() + " + Sugar";
  }
}
```

The Sugar Decorator follows the same structure but adds sugar instead of milk.

### Step 4: Combine the decorators

```js
let coffee = new Coffee();

coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description());
console.log(coffee.cost());
```

**Output:**

```text
Basic Coffee + Milk + Sugar
6.5
```

Let's calculate the price:

| Item | Cost |
|---|---:|
| Basic Coffee | 5 |
| Milk | 1 |
| Sugar | 0.5 |
| Total | 6.5 |

Each decorator adds its own behavior while delegating to the object it wraps.

---

## 5. Understanding How Decorator Wrapping Works

Consider this expression:

```js
let coffee = new Coffee();

coffee = new MilkDecorator(coffee);

coffee = new SugarDecorator(coffee);
```

Let's examine each step.

### Step 1: Create the basic coffee

```js
let coffee = new Coffee();
```

The cost is `5`.

### Step 2: Wrap it with milk

```js
coffee = new MilkDecorator(coffee);
```

The Milk Decorator stores the original coffee.

Calling:

```js
coffee.cost();
```

returns:

```text
5 + 1 = 6
```

### Step 3: Wrap it with sugar

```js
coffee = new SugarDecorator(coffee);
```

The Sugar Decorator now stores the Milk Decorator.

When we call:

```js
coffee.cost();
```

the calculation is:

```text
Sugar Decorator
      |
      v
Milk Decorator
      |
      v
Basic Coffee
```

The final cost is:

```text
5 + 1 + 0.5 = 6.5
```

**Key takeaway:** Each decorator delegates to the object it wraps and adds its own behavior.

---

## 6. The Importance of a Consistent Interface

In our example, the base object and decorators all provide:

```js
cost()
description()
```

This consistency makes the decorators easy to combine.

Let's make the structure more explicit.

```js
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return "Basic Coffee";
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return `${this.coffee.description()} + Milk`;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 0.5;
  }

  description() {
    return `${this.coffee.description()} + Sugar`;
  }
}
```

Every object supports the methods the next decorator expects.

JavaScript does not require a formal interface declaration here. The objects simply follow the same interface by convention.

This is sometimes called duck typing: if an object provides the required methods, it can be used in that role.

---

## 7. A Practical Example: Logging Decorator

The Decorator Pattern isn't limited to coffee or pricing.

You can also use it to add logging around an existing service.

Imagine you have a service that retrieves user information.

```js
class UserService {
  getUser(id) {
    return {
      id,
      name: "Ali"
    };
  }
}

const service = new UserService();

console.log(service.getUser(1));

// Output:
// { id: 1, name: "Ali" }
```

Now suppose you want to log whenever someone retrieves a user.

You could modify the original class, but that would mix logging concerns with its existing responsibility.

Instead, create a decorator.

### Implementation

```js
class LoggingUserService {
  constructor(userService) {
    this.userService = userService;
  }

  getUser(id) {
    console.log(`Getting user with ID: ${id}`);

    const user = this.userService.getUser(id);

    console.log("User retrieved successfully");

    return user;
  }
}
```

### Use the decorator

```js
const userService = new UserService();

const loggingService = new LoggingUserService(userService);

const user = loggingService.getUser(1);

console.log(user);
```

**Output:**

```text
Getting user with ID: 1
User retrieved successfully
{ id: 1, name: "Ali" }
```

The original `UserService` class remains unchanged.

The decorator adds logging before and after the original operation.

This technique can also be used to add timing, caching, or other cross-cutting behavior.

---

## 8. Decorator Pattern vs. Inheritance

You have already learned inheritance as one of the four pillars of OOP.

Both inheritance and decorators can add behavior, but they do so differently.

| Feature | Inheritance | Decorator |
|---|---|---|
| How behavior is added | A subclass extends a parent class. | A wrapper adds behavior to an object. |
| When behavior is chosen | Usually determined by the object's class. | Can be composed at runtime. |
| Combining features | May require many subclasses. | Multiple decorators can be wrapped together. |
| Original class | Usually remains unchanged, but subclasses depend on it. | Can remain completely unchanged. |
| Flexibility | Useful for genuine "is-a" relationships. | Useful for optional, composable behavior. |

### Inheritance example

```js
class Coffee {
  cost() {
    return 5;
  }
}

class CoffeeWithMilk extends Coffee {
  cost() {
    return super.cost() + 1;
  }
}
```

This creates a specific subtype of coffee.

### Decorator example

```js
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }
}

const coffee = new MilkDecorator(new Coffee());

console.log(coffee.cost()); // 6
```

The decorator wraps an existing coffee object.

**Remember:** Inheritance extends a class hierarchy. Decoration composes behavior by wrapping objects.

---

## 9. Decorator Pattern vs. JavaScript Decorator Syntax

JavaScript also has decorator syntax used in certain class and member declarations.

For example, depending on the JavaScript environment and supported decorator implementation, you may encounter syntax such as:

```js
@someDecorator
class Example {}
```

This syntax is related to the broader idea of decorating code, but it is not the same thing as the object-wrapping pattern we implemented above.

In this lesson, the **Decorator Pattern** means wrapping an object to add behavior.

You can implement this pattern using ordinary JavaScript classes and composition without using `@` syntax.

---

## 10. Advantages of the Decorator Pattern

### 1. Adds behavior without modifying the original class

The original class can remain focused on its main responsibility.

### 2. Supports flexible combinations

You can combine different decorators depending on what the application needs.

```js
const coffee = new SugarDecorator(
  new MilkDecorator(
    new Coffee()
  )
);
```

### 3. Reduces subclass explosion

You don't need a separate subclass for every possible combination of optional features.

### 4. Follows the Open/Closed Principle

The Open/Closed Principle says software entities should be open for extension but closed for modification.

Decorators help extend behavior without changing the original class.

### 5. Encourages composition

Instead of relying entirely on inheritance, decorators build new behavior by combining objects.

---

## 11. Disadvantages of the Decorator Pattern

### 1. More objects

Each decorator adds another wrapper object.

### 2. Debugging can be more difficult

When multiple decorators are nested, it can take more effort to follow a method call through the wrappers.

### 3. Order can matter

Some decorators produce different results depending on their order.

For example, a discount applied before a tax calculation might produce a different price than applying the discount after tax, depending on the pricing rules.

### 4. The interface must remain compatible

Each decorator must provide the methods expected by the client and any other decorators.

If one decorator omits a required method, combining it with other decorators may fail.

---

## 12. Common Mistakes

### Mistake 1: Modifying the original object unnecessarily

A decorator should usually wrap the object rather than directly modifying its original class.

### Mistake 2: Forgetting to delegate

Incorrect:

```js
class MilkDecorator {
  cost() {
    return 1;
  }
}
```

This returns only the cost of milk and ignores the underlying coffee.

Correct:

```js
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }
}
```

The correct implementation includes the original object's cost.

### Mistake 3: Creating too many unnecessary wrappers

If a simple function can add the required behavior clearly, a decorator class might be unnecessary.

Use the pattern when wrapping and combining behavior improves the design.

### Mistake 4: Assuming decorator order never matters

The order of decorators can change the behavior or result of a composed object.

Choose the order deliberately.

---

## 13. Practice Exercises

Try these exercises before revealing the solutions.

### Exercise 1: Pizza Decorator

Create a `Pizza` class with:

- `cost()` returning `8`.
- `description()` returning `"Basic Pizza"`.

Then create:

- `CheeseDecorator`, adding `2` to the cost.
- `OliveDecorator`, adding `1` to the cost.

Each decorator should extend the description and preserve the methods of the wrapped object.

Expected usage:

```js
let pizza = new Pizza();

pizza = new CheeseDecorator(pizza);
pizza = new OliveDecorator(pizza);

console.log(pizza.description());
// "Basic Pizza + Cheese + Olives"

console.log(pizza.cost());
// 11
```

<details>
  <summary>Show solution</summary>

  ```js
  class Pizza {
    cost() {
      return 8;
    }

    description() {
      return "Basic Pizza";
    }
  }

  class CheeseDecorator {
    constructor(pizza) {
      this.pizza = pizza;
    }

    cost() {
      return this.pizza.cost() + 2;
    }

    description() {
      return `${this.pizza.description()} + Cheese`;
    }
  }

  class OliveDecorator {
    constructor(pizza) {
      this.pizza = pizza;
    }

    cost() {
      return this.pizza.cost() + 1;
    }

    description() {
      return `${this.pizza.description()} + Olives`;
    }
  }

  let pizza = new Pizza();

  pizza = new CheeseDecorator(pizza);
  pizza = new OliveDecorator(pizza);

  console.log(pizza.description());
  // "Basic Pizza + Cheese + Olives"

  console.log(pizza.cost());
  // 11
  ```

</details>

### Exercise 2: Add Logging to a Service

Create a `DataService` class with a method:

```js
fetchData() {
  return "Data loaded";
}
```

Then create a `LoggingDecorator` that:

1. Logs `"Fetching data..."` before calling the original method.
2. Calls the original `fetchData()` method.
3. Logs `"Fetch complete"` afterward.
4. Returns the original result.

Expected usage:

```js
const service = new LoggingDecorator(new DataService());

console.log(service.fetchData());

// Expected output:
// Fetching data...
// Fetch complete
// Data loaded
```

<details>
  <summary>Show solution</summary>

  ```js
  class DataService {
    fetchData() {
      return "Data loaded";
    }
  }

  class LoggingDecorator {
    constructor(service) {
      this.service = service;
    }

    fetchData() {
      console.log("Fetching data...");

      const result = this.service.fetchData();

      console.log("Fetch complete");

      return result;
    }
  }

  const service = new LoggingDecorator(new DataService());

  console.log(service.fetchData());

  // Output:
  // Fetching data...
  // Fetch complete
  // Data loaded
  ```

</details>

---

## 14. Quick Revision

| Question | Answer |
|---|---|
| What type of pattern is Decorator? | Structural. |
| What is its main purpose? | Add behavior to an object without modifying its original class. |
| What does a decorator wrap? | An existing object. |
| Why does a decorator delegate to the wrapped object? | To preserve and extend the original behavior. |
| How is it different from inheritance? | It composes behavior through wrappers rather than creating subclasses for every combination. |
| Can decorators be combined? | Yes, provided they maintain compatible interfaces. |
| Does the pattern require `@` syntax? | No. Ordinary JavaScript classes and objects are enough. |

---

## 15. What's Next?

You've now learned five design patterns:

1. **Factory** — create the appropriate object.
2. **Singleton** — share one instance.
3. **Builder** — construct objects step by step.
4. **Adapter** — make incompatible interfaces work together.
5. **Decorator** — add behavior by wrapping an object.

The next pattern is:

### Lesson 6: The Facade Pattern

The Facade Pattern is a structural design pattern that provides a simple interface to a complicated subsystem.

For example, starting a home entertainment system might require turning on the television, configuring the speakers, and selecting an input. A Facade can provide one simple method, such as `startMovieMode()`, to coordinate those steps.

