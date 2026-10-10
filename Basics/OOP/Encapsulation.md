# Encapsulation in JavaScript

## 1. What Is Encapsulation?

**Encapsulation** is an OOP principle that combines data and the methods that operate on that data while controlling how the data can be accessed or modified.

In simple words, encapsulation helps us protect an object's internal data and control how other parts of the program interact with it.

Let's understand this with an example.

Imagine we are building a bank account application.

A bank account has:

- An account holder's name.
- A balance.
- A method to deposit money.
- A method to withdraw money.

Now, imagine that anyone can directly change the balance to any value.

```javascript
const account = {
  owner: "Ali",
  balance: 1000,
};

account.balance = -5000;

console.log(account.balance); // -5000
```

This is a problem because the account balance can be changed to an invalid value without following any rules.

We want to control how the balance changes.

This is where encapsulation becomes useful.

**Key idea:** Encapsulation allows us to hide internal data and expose controlled ways to interact with it.

---

## 2. Why Do We Need Encapsulation?

Let's compare two approaches.

### Approach A: Without Encapsulation

```javascript
class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }
}

const account = new BankAccount("Ali", 1000);

account.balance = -5000;

console.log(account.balance); // -5000
```

The `balance` property is public, so code outside the class can change it directly.

The class does not control how the balance is modified.

### Approach B: With Encapsulation

JavaScript supports private class fields, which are declared using the `#` symbol.

```javascript
class BankAccount {
  #balance;

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }

    this.#balance += amount;
  }
}

const account = new BankAccount("Ali", 1000);

account.deposit(500);

console.log(account.getBalance()); // 1500
```

Here, `#balance` is private.

Code outside the class cannot access or modify it directly.

Instead, the class provides methods that control how the balance is accessed and changed.

**Important:** Encapsulation is not simply making everything private. It is about deciding what should be accessible and enforcing the rules that protect an object's state.

---

## 3. Public Properties vs. Private Fields

JavaScript class properties can be public or private.

### Public Properties

A public property can be accessed and modified from outside the class.

```javascript
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const student = new Student("Ali", 18);

console.log(student.name); // Ali

student.age = 19;

console.log(student.age); // 19
```

Here, `name` and `age` are public properties.

### Private Fields

A private field is declared using `#` before its name.

```javascript
class Student {
  #age;

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  getAge() {
    return this.#age;
  }
}

const student = new Student("Ali", 18);

console.log(student.name);   // Ali
console.log(student.getAge()); // 18

// console.log(student.#age); // SyntaxError
```

The `#age` field is accessible only within the class's permitted private-field scope.

External code cannot read or assign it directly.

For example, the following is invalid:

```javascript
student.#age = 20;
```

Private fields are enforced by JavaScript itself, rather than being private merely by convention.

### Comparison

| Feature | Public Property | Private Field |
|---|---|---|
| Declaration | `this.name` | `#name` |
| Accessible outside the class | Yes | No |
| Can be modified directly outside the class | Yes | No |
| Can be used inside class methods | Yes | Yes |
| Enforced privacy | No | Yes |

---

## 4. Controlling Data with Methods

One way to implement encapsulation is to keep data private and provide public methods for interacting with it.

These methods act as a controlled interface to the object's internal state.

### Example: Bank Account

```javascript
class BankAccount {
  #balance;

  constructor(owner, initialBalance) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative.");
    }

    this.owner = owner;
    this.#balance = initialBalance;
  }

  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }

    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive.");
    }

    if (amount > this.#balance) {
      throw new Error("Insufficient balance.");
    }

    this.#balance -= amount;
  }
}

const account = new BankAccount("Ali", 1000);

account.deposit(500);
account.withdraw(200);

console.log(account.getBalance()); // 1300
```

### Understanding the Code

**Step 1: Declare the private field**

```javascript
#balance;
```

This declares a private field for storing the account balance.

**Step 2: Initialize the private field**

```javascript
this.#balance = initialBalance;
```

The constructor stores the initial balance after checking that it is valid.

**Step 3: Read the balance through a method**

```javascript
getBalance() {
  return this.#balance;
}
```

This method provides read access without exposing the field itself.

**Step 4: Validate deposits**

```javascript
deposit(amount) {
  if (amount <= 0) {
    throw new Error("Deposit amount must be positive.");
  }

  this.#balance += amount;
}
```

The method checks the amount before changing the balance.

**Step 5: Validate withdrawals**

```javascript
withdraw(amount) {
  if (amount <= 0) {
    throw new Error("Withdrawal amount must be positive.");
  }

  if (amount > this.#balance) {
    throw new Error("Insufficient balance.");
  }

  this.#balance -= amount;
}
```

The method prevents withdrawals that violate the account's rules.

### Why Is This Encapsulation?

The balance is stored internally, and all normal access to it goes through methods that enforce the class's rules.

External code cannot bypass these checks by directly assigning a new value to `#balance`.

---

## 5. What Are Getters and Setters?

JavaScript provides **getters** and **setters** as another way to control access to an object's properties.

- A **getter** runs when a property is read.
- A **setter** runs when a property is assigned a value.

They allow us to use property syntax while executing custom logic.

### Example

```javascript
class Student {
  #age;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (value < 0) {
      throw new Error("Age cannot be negative.");
    }

    this.#age = value;
  }
}

const student = new Student("Ali", 18);

console.log(student.age); // 18

student.age = 19;

console.log(student.age); // 19
```

### Understanding the Code

**Getter**

```javascript
get age() {
  return this.#age;
}
```

This runs when we read:

```javascript
console.log(student.age);
```

Notice that we use `student.age`, not `student.age()`.

**Setter**

```javascript
set age(value) {
  if (value < 0) {
    throw new Error("Age cannot be negative.");
  }

  this.#age = value;
}
```

This runs when we assign:

```javascript
student.age = 19;
```

The setter validates the supplied value before storing it.

### What Happens with Invalid Data?

```javascript
student.age = -5;
```

The setter throws an error because the age is negative.

The private field remains unchanged because the assignment occurs only after validation.

### Why Use Getters and Setters?

They are useful when you want property-like syntax while controlling reading or writing.

However, you do not need a getter and setter for every property. Use them when they provide useful behavior, such as validation or a calculated value.

---

## 6. Encapsulation with Read-Only Access

Sometimes, we want a value to be readable from outside a class but not directly changeable.

We can achieve this by providing a getter without a corresponding setter and storing the value in a private field.

### Example

```javascript
class User {
  #email;

  constructor(email) {
    this.#email = email;
  }

  get email() {
    return this.#email;
  }
}

const user = new User("ali@example.com");

console.log(user.email); // ali@example.com
```

The email can be read through the getter.

However, this assignment does not update the private field:

```javascript
user.email = "new@example.com";
```

In ordinary non-strict code, assigning to a getter-only property may fail silently. In strict mode, including JavaScript class code, the assignment throws a `TypeError`.

The private field remains unchanged.

If the value needs to be updated, you can deliberately provide a method or setter that validates the new value.

---

## 7. Encapsulation vs. Abstraction

Encapsulation and abstraction are related, but they are not the same.

| Encapsulation | Abstraction |
|---|---|
| Controls access to internal data and behavior. | Hides unnecessary implementation details. |
| Focuses on protecting and managing an object's state. | Focuses on exposing a simpler interface. |
| Often uses private fields, methods, getters, and setters. | Often uses public methods that hide complex internal operations. |

### Example

```javascript
class CoffeeMachine {
  #waterLevel = 100;

  makeCoffee() {
    if (this.#waterLevel < 10) {
      console.log("Not enough water.");
      return;
    }

    this.#waterLevel -= 10;

    console.log("Coffee is ready.");
  }
}

const machine = new CoffeeMachine();

machine.makeCoffee();
```

**Encapsulation:** `#waterLevel` is private, and the class controls how it changes.

**Abstraction:** The user calls `makeCoffee()` without needing to know the internal steps used to prepare the coffee.

Both principles can work together in the same class.

---

## 8. Common Beginner Mistakes

### Mistake 1: Trying to access a private field directly

```javascript
class Person {
  #name = "Ali";
}

const person = new Person();

// console.log(person.#name); // SyntaxError
```

Private fields can only be accessed from permitted locations inside the class.

Provide a public method or getter if outside code needs access.

### Mistake 2: Thinking an underscore creates a private property

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
}

const person = new Person("Ali");

person._name = "Sara";

console.log(person._name); // Sara
```

The underscore is only a naming convention. It does not enforce privacy.

For actual private fields, use `#name`.

### Mistake 3: Forgetting validation

```javascript
class Product {
  #price;

  constructor(price) {
    this.#price = price;
  }
}

const product = new Product(-100);
```

The field is private, but the class still accepts an invalid initial price.

**Privacy does not automatically validate data.** You must add the appropriate validation rules.

### Mistake 4: Creating unnecessary getters and setters

```javascript
class Student {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}
```

A getter is useful when you need controlled read access. But if a property can safely remain public, adding a private field and getter may add unnecessary complexity.

Choose the simplest design that meets your requirements.

---

## 9. Practice Exercises

Try solving these exercises yourself before opening the solutions.

### Exercise 1: Create a Bank Account

Create a `BankAccount` class with:

- A private `#balance` field.
- A constructor that accepts an initial balance.
- A `getBalance()` method.
- A `deposit(amount)` method that rejects non-positive amounts.

Test your class by depositing money and displaying the updated balance.

<details>
  <summary>Show solution</summary>

  ```javascript
  class BankAccount {
    #balance;

    constructor(initialBalance) {
      if (initialBalance < 0) {
        throw new Error("Initial balance cannot be negative.");
      }

      this.#balance = initialBalance;
    }

    getBalance() {
      return this.#balance;
    }

    deposit(amount) {
      if (amount <= 0) {
        throw new Error("Deposit amount must be positive.");
      }

      this.#balance += amount;
    }
  }

  const account = new BankAccount(1000);

  account.deposit(500);

  console.log(account.getBalance()); // 1500
  ```
</details>

### Exercise 2: Validate a Student's Age

Create a `Student` class with:

- A public `name` property.
- A private `#age` field.
- An `age` getter.
- An `age` setter that rejects negative ages.

Test the setter with a valid age and an invalid age.

<details>
  <summary>Show solution</summary>

  ```javascript
  class Student {
    #age;

    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    get age() {
      return this.#age;
    }

    set age(value) {
      if (value < 0) {
        throw new Error("Age cannot be negative.");
      }

      this.#age = value;
    }
  }

  const student = new Student("Ali", 18);

  student.age = 19;

  console.log(student.age); // 19

  // student.age = -5; // Throws an error
  ```
</details>

### Exercise 3: Create a Product

Create a `Product` class with:

- A private `#price` field.
- A constructor that accepts a price.
- A getter named `price`.
- A setter that rejects negative prices.

Test your class by setting a valid price and then attempting to set an invalid price.

<details>
  <summary>Show solution</summary>

  ```javascript
  class Product {
    #price;

    constructor(price) {
      this.price = price;
    }

    get price() {
      return this.#price;
    }

    set price(value) {
      if (value < 0) {
        throw new Error("Price cannot be negative.");
      }

      this.#price = value;
    }
  }

  const product = new Product(100);

  product.price = 150;

  console.log(product.price); // 150

  // product.price = -50; // Throws an error
  ```
</details>

---

## 10. What You Should Understand Before Moving On

Make sure you can explain these concepts in your own words:

- [ ] What encapsulation means.
- [ ] Why controlling access to internal data is useful.
- [ ] The difference between public properties and private fields.
- [ ] How the `#` syntax creates private fields.
- [ ] How methods provide controlled access to internal data.
- [ ] How getters and setters work.
- [ ] How validation helps maintain valid object state.
- [ ] The difference between encapsulation and abstraction.
- [ ] Why private fields do not automatically validate data.

## 11. Final Summary

**Encapsulation means controlling how an object's internal data is accessed and modified.**

In JavaScript:

- Public properties are accessible from outside the class.
- Private fields, declared with `#`, are enforced by the language.
- Methods provide controlled ways to interact with private data.
- Getters control how values are read.
- Setters control how values are assigned.
- Validation prevents invalid changes when implemented correctly.
- Encapsulation and abstraction are different concepts that often work together.

Once these concepts are clear, you can move on to **polymorphism** as the next OOP topic.
