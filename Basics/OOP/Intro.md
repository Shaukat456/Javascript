# Object-Oriented Programming (OOP) in JavaScript

## 1. What is OOP?

**Object-Oriented Programming (OOP)** is a programming paradigm in which we organize code around objects that combine data and behavior.

Let's start with a simple example.

Imagine we're building a student management application. Every student has some information:

- Name
- Age
- Grade

And every student can perform certain actions:

- Introduce themselves
- Study
- Take an exam

In JavaScript, we can represent a student as an object.

```javascript
const student = {
  name: "Ali",
  age: 18,
  grade: "A",

  introduce() {
    console.log(`My name is ${this.name}.`);
  },

  study() {
    console.log(`${this.name} is studying.`);
  },
};

console.log(student.name);
student.introduce();
student.study();
```

Output:

```text
Ali
My name is Ali.
Ali is studying.
```

Notice that the object contains both information and actions.

| Part | Example | Purpose |
|---|---|---|
| Object | `student` | Represents a student |
| Property | `name`, `age`, `grade` | Stores information |
| Method | `introduce()`, `study()` | Defines behavior |
| `this` | `this.name` | Refers to the object in this method call |

This is the basic idea behind OOP: **keep related data and behavior together.**

---

## 2. Why do we need OOP?

You might be thinking: "I can already create objects in JavaScript. Why do I need OOP?"

Good question.

Let's compare two approaches.

### Approach A: Repeating code

Suppose we need to represent three students.

```javascript
const student1 = {
  name: "Ali",
  age: 18,
  introduce() {
    console.log(`My name is ${this.name}.`);
  },
};

const student2 = {
  name: "Sara",
  age: 19,
  introduce() {
    console.log(`My name is ${this.name}.`);
  },
};

const student3 = {
  name: "Ahmed",
  age: 20,
  introduce() {
    console.log(`My name is ${this.name}.`);
  },
};
```

This works, but we keep writing almost the same structure.

Imagine creating 500 students. Maintaining all that repeated code would become inconvenient.

### Approach B: Use a reusable function

Before learning classes, we can already improve the code using a function.

```javascript
function createStudent(name, age) {
  return {
    name: name,
    age: age,

    introduce() {
      console.log(`My name is ${this.name}.`);
    },
  };
}

const student1 = createStudent("Ali", 18);
const student2 = createStudent("Sara", 19);
const student3 = createStudent("Ahmed", 20);

student1.introduce();
student2.introduce();
student3.introduce();
```

Now we define the structure once and create as many students as we need.

We can simplify the object properties using JavaScript shorthand syntax:

```javascript
function createStudent(name, age) {
  return {
    name,
    age,

    introduce() {
      console.log(`My name is ${this.name}.`);
    },
  };
}
```

This works because when a variable and a property have the same name, `name` is shorthand for `name: name`.

### So, why learn OOP?

OOP gives us ways to organize related data and behavior, create consistent objects, and manage larger programs.

However, remember something important: **OOP is not always better than functional programming or simpler object-based code.** The right approach depends on the problem.

---

## 3. What is an object?

An **object** is a value that can hold related properties and methods.

```javascript
const phone = {
  brand: "Samsung",
  model: "Galaxy S25",
  price: 800,

  call() {
    console.log("Calling...");
  },
};
```

Here, `phone` is an object.

### Accessing properties

There are two common ways to access properties.

**Dot notation**

```javascript
console.log(phone.brand);
console.log(phone.price);
```

**Bracket notation**

```javascript
console.log(phone["brand"]);
console.log(phone["price"]);
```

Both can access properties. Bracket notation is especially useful when the property name is stored in a variable.

```javascript
const propertyName = "brand";

console.log(phone[propertyName]); // Samsung
```

### Updating properties

```javascript
phone.price = 750;

console.log(phone.price); // 750
```

### Adding properties

```javascript
phone.color = "Black";

console.log(phone.color); // Black
```

### Adding methods

```javascript
phone.turnOn = function () {
  console.log("Phone is turning on.");
};

phone.turnOn();
```

An object's structure can be changed after creation unless some additional restrictions have been applied.

---

## 4. What is a method?

A **method** is a function associated with an object.

```javascript
const calculator = {
  add(a, b) {
    return a + b;
  },

  subtract(a, b) {
    return a - b;
  },
};

console.log(calculator.add(10, 5));      // 15
console.log(calculator.subtract(10, 5)); // 5
```

The methods `add()` and `subtract()` represent operations belonging to the calculator.

Compare a regular function:

```javascript
function add(a, b) {
  return a + b;
}
```

With a method:

```javascript
const calculator = {
  add(a, b) {
    return a + b;
  },
};
```

Both can perform the same calculation. The method is grouped with the object it logically belongs to.

**Key idea:** A method is not a special kind of calculation. It is a function used as part of an object's interface.

---

## 5. Understanding `this` — a very important concept

If you want to understand JavaScript OOP properly, pay close attention to `this`.

Consider this example:

```javascript
const student = {
  name: "Ali",

  introduce() {
    console.log(this.name);
  },
};

student.introduce();
```

Output:

```text
Ali
```

Why?

When `student.introduce()` is called as a method, `this` refers to the object before the dot: `student`.

Therefore:

```javascript
this.name
```

means:

```javascript
student.name
```

### One method, different objects

```javascript
const student1 = {
  name: "Ali",

  introduce() {
    console.log(`My name is ${this.name}.`);
  },
};

const student2 = {
  name: "Sara",

  introduce() {
    console.log(`My name is ${this.name}.`);
  },
};

student1.introduce();
student2.introduce();
```

Output:

```text
My name is Ali.
My name is Sara.
```

The same behavior works with different data because each method call has its own `this` value.

### A common mistake

```javascript
const student = {
  name: "Ali",

  introduce: () => {
    console.log(this.name);
  },
};

student.introduce();
```

This does **not** work like the earlier example. Arrow functions do not get their own `this` based on the object method call.

For ordinary object methods that use `this`, prefer method syntax:

```javascript
const student = {
  name: "Ali",

  introduce() {
    console.log(this.name);
  },
};
```

One more detail: `this` depends on how a function is called. If you take a method out of its object and call it separately, its `this` behavior may change.

---

## 6. What is a class?

So far, we've created objects directly or used a function to create them.

Now let's learn **classes**.

A **class** is a blueprint for creating objects with a shared structure and behavior.

Think of a class as a design for a house. Multiple houses can follow the same design, but each house can have different details.

In JavaScript:

```javascript
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`My name is ${this.name}.`);
  }
}

const student1 = new Student("Ali", 18);
const student2 = new Student("Sara", 19);

student1.introduce();
student2.introduce();
```

Output:

```text
My name is Ali.
My name is Sara.
```

Let's break this down carefully.

### `class Student`

```javascript
class Student {
}
```

This declares a class named `Student`.

### `constructor()`

```javascript
constructor(name, age) {
  this.name = name;
  this.age = age;
}
```

The constructor initializes a new object when we create an instance using `new`.

For example:

```javascript
const student1 = new Student("Ali", 18);
```

The supplied values are passed to the constructor:

- `name` receives `"Ali"`.
- `age` receives `18`.

Then the constructor assigns those values to the new object's properties.

### `this.name = name`

This line is especially important.

```javascript
this.name = name;
```

- The `name` on the left is a property of the object being initialized.
- The `name` on the right is the constructor's parameter.

You can think of it as storing the supplied name on the new object.

### `new Student(...)`

The `new` keyword creates a new instance of the class and runs its constructor.

```javascript
const student1 = new Student("Ali", 18);
const student2 = new Student("Sara", 19);
```

These are two separate objects created from the same class.

```javascript
console.log(student1.name); // Ali
console.log(student2.name); // Sara
```

Changing one object's property does not automatically change the other object's property:

```javascript
student1.name = "Ahmed";

console.log(student1.name); // Ahmed
console.log(student2.name); // Sara
```

---

## 7. Class vs. object vs. instance

These terms are related, but they do not mean the same thing.

| Term | Meaning | Example |
|---|---|---|
| Class | A blueprint for creating instances | `Student` |
| Object | A value containing properties and behavior | `student1` |
| Instance | An object created from a particular class | `student1` |
| Constructor | Initializes a newly created instance | `constructor(name)` |
| Method | A function defined as part of a class or object | `introduce()` |

Example:

```javascript
class Student {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(`I am ${this.name}.`);
  }
}

const student1 = new Student("Ali");

console.log(student1 instanceof Student); // true
console.log(typeof student1);             // object
```

`student1` is an object and an instance of `Student`.

The class is not the same thing as the instance. The class defines behavior that instances can use.

---

## 8. How do class methods work?

Consider this class:

```javascript
class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  showBalance() {
    console.log(`${this.owner}'s balance: ${this.balance}`);
  }
}

const account1 = new BankAccount("Ali", 1000);
const account2 = new BankAccount("Sara", 2000);

account1.deposit(500);

account1.showBalance();
account2.showBalance();
```

Output:

```text
Ali's balance: 1500
Sara's balance: 2000
```

Notice that both instances use the class's methods, but each method operates on the instance referenced by `this`.

Also, JavaScript class methods are generally stored on the class's prototype rather than being recreated as separate own properties on every instance.

You can verify this:

```javascript
console.log(
  Object.hasOwn(account1, "balance")
); // true

console.log(
  Object.hasOwn(account1, "showBalance")
); // false
```

The `balance` property belongs directly to the instance, while `showBalance()` is found through its prototype.

You don't need to master prototypes yet, but this detail will help you understand JavaScript's object model later.

---

## 9. What does OOP look like in a real application?

Let's build a small product example.

```javascript
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotalValue() {
    return this.price * this.quantity;
  }

  display() {
    console.log(
      `${this.name}: $${this.price}, Quantity: ${this.quantity}`
    );
  }
}

const laptop = new Product("Laptop", 1000, 3);
const mouse = new Product("Mouse", 25, 10);

laptop.display();
mouse.display();

console.log(laptop.getTotalValue()); // 3000
console.log(mouse.getTotalValue());  // 250
```

Why is this useful?

Each product has its own data, while the class defines common operations that every product can perform.

If we later need another product, we can create it without rewriting the class:

```javascript
const keyboard = new Product("Keyboard", 75, 5);

keyboard.display();
console.log(keyboard.getTotalValue()); // 375
```

This is the main practical benefit of using classes for this kind of problem.

---

## 10. Are JavaScript classes completely different from objects?

No. JavaScript uses a **prototype-based object model**.

JavaScript classes provide a clearer syntax for creating objects and working with prototypes. They are not identical to classes in every other programming language.

For now, remember:

- Objects hold data and behavior.
- Classes provide a convenient way to define the structure and methods of instances.
- Instances can access class methods through their prototype.
- JavaScript's `class` syntax is built on top of its prototype system.

We'll leave deeper prototype mechanics for later.

---

## 11. Common beginner mistakes

### Mistake 1: Forgetting `new`

```javascript
class Student {
  constructor(name) {
    this.name = name;
  }
}

// const student = Student("Ali"); // TypeError
const student = new Student("Ali");

console.log(student.name);
```

Call a class constructor using `new`.

### Mistake 2: Confusing parameters with properties

```javascript
class Student {
  constructor(name) {
    this.name = name;
  }
}
```

`name` is the parameter. `this.name` is the instance property.

### Mistake 3: Forgetting `this` inside a method

```javascript
class Student {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(this.name);
  }
}
```

The method needs `this.name` to access the current instance's name.

### Mistake 4: Expecting all instances to share their own properties

```javascript
const student1 = new Student("Ali");
const student2 = new Student("Sara");
```

Each instance has its own `name` property. Changing `student1.name` does not change `student2.name`.

### Mistake 5: Thinking a class automatically validates data

```javascript
class Product {
  constructor(price) {
    this.price = price;
  }
}

const product = new Product(-100);

console.log(product.price); // -100
```

The class accepts the negative price because we have not added any validation. A class is not automatically a validation system.

---

## 12. Practice exercises

Try solving these without looking at the solutions first.

### Exercise 1: Create a Book

Create a `Book` class with `title` and `author` properties. Add a `describe()` method that prints the book's title and author.

<details>
  <summary>Show solution</summary>

  ```javascript
  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }

    describe() {
      console.log(`${this.title} was written by ${this.author}.`);
    }
  }

  const book = new Book("The Hobbit", "J. R. R. Tolkien");
  book.describe();
  ```
</details>

### Exercise 2: Create a Rectangle

Create a `Rectangle` class with `width` and `height` properties. Add an `area()` method that returns the area.

<details>
  <summary>Show solution</summary>

  ```javascript
  class Rectangle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }

    area() {
      return this.width * this.height;
    }
  }

  const rectangle = new Rectangle(5, 4);
  console.log(rectangle.area()); // 20
  ```
</details>

### Exercise 3: Create a Bank Account

Create a `BankAccount` class with `owner` and `balance` properties. Add `deposit(amount)` and `getBalance()` methods. Create two accounts and verify that their balances are independent.

<details>
  <summary>Show solution</summary>

  ```javascript
  class BankAccount {
    constructor(owner, balance) {
      this.owner = owner;
      this.balance = balance;
    }

    deposit(amount) {
      this.balance += amount;
    }

    getBalance() {
      return this.balance;
    }
  }

  const account1 = new BankAccount("Ali", 1000);
  const account2 = new BankAccount("Sara", 500);

  account1.deposit(200);

  console.log(account1.getBalance()); // 1200
  console.log(account2.getBalance()); // 500
  ```
</details>

---

## 13. What you should understand before moving on

Make sure you can explain these concepts in your own words:

- [ ] What OOP means and why it can be useful.
- [ ] What an object is.
- [ ] The difference between properties and methods.
- [ ] How `this` works when calling an object method.
- [ ] What a class is and how to create an instance.
- [ ] What `constructor()` does.
- [ ] What `new` does.
- [ ] The difference between a class, an object, and an instance.
- [ ] How multiple instances can use the same methods while maintaining separate data.

**Our next step should be encapsulation**, after these fundamentals feel comfortable. We will not move to inheritance until you are ready.
