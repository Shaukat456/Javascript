# JavaScript OOP: Combining the 4 Pillars

## Project: Bank Account System

In this project, we will combine all four pillars of Object-Oriented Programming (OOP):

1. **Encapsulation** — Protect internal data.
2. **Abstraction** — Hide unnecessary implementation details.
3. **Inheritance** — Reuse and extend existing functionality.
4. **Polymorphism** — Allow the same method to behave differently for different objects.

We will create two types of bank accounts:

- **SavingsAccount** — Earns a 5% bonus based on its balance.
- **CurrentAccount** — Allows withdrawals up to $500 per transaction.

Both account types can deposit money, withdraw money, and display their details.

---

## 1. Complete Project Code

```js
// Parent class
class BankAccount {
  // Encapsulation: private balance
  #balance;

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  // Abstraction: simple public interface
  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit must be greater than zero.");
      return;
    }

    this.#balance += amount;
    console.log(`Deposited $${amount}`);
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Withdrawal must be greater than zero.");
      return;
    }

    if (amount > this.#balance) {
      console.log("Insufficient balance!");
      return;
    }

    this.#balance -= amount;
    console.log(`Withdrawn $${amount}`);
  }

  getBalance() {
    return this.#balance;
  }

  // Default implementation for subclasses
  calculateBonus() {
    return 0;
  }

  showDetails() {
    console.log(`Owner: ${this.owner}`);
    console.log(`Balance: $${this.getBalance()}`);
    console.log(`Bonus: $${this.calculateBonus()}`);
  }
}

// Inheritance: SavingsAccount extends BankAccount
class SavingsAccount extends BankAccount {
  // Polymorphism: custom bonus calculation
  calculateBonus() {
    return this.getBalance() * 0.05;
  }
}

// Inheritance: CurrentAccount extends BankAccount
class CurrentAccount extends BankAccount {
  // Polymorphism: different bonus calculation
  calculateBonus() {
    return 0;
  }

  // Method overriding: custom withdrawal rule
  withdraw(amount) {
    if (amount > 500) {
      console.log(
        "Cannot withdraw more than $500 at once."
      );
      return;
    }

    super.withdraw(amount);
  }
}

// Create objects
const savings = new SavingsAccount("Ali", 1000);
const current = new CurrentAccount("Sara", 800);

// Test the savings account
console.log("--- Savings Account ---");

savings.deposit(200);
savings.withdraw(100);
savings.showDetails();

// Test the current account
console.log("\n--- Current Account ---");

current.deposit(100);
current.withdraw(600);
current.withdraw(200);
current.showDetails();
```

### Output

```text
--- Savings Account ---
Deposited $200
Withdrawn $100
Owner: Ali
Balance: $1100
Bonus: $55

--- Current Account ---
Deposited $100
Cannot withdraw more than $500 at once.
Withdrawn $200
Owner: Sara
Balance: $700
Bonus: $0
```

---

## 2. Pillar One: Encapsulation

**Definition:** Encapsulation protects an object's internal state and controls how that state can be accessed or modified.

Look at this code:

```js
class BankAccount {
  #balance;

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  getBalance() {
    return this.#balance;
  }
}
```

### How It Works

- `#balance` is a private field.
- It can only be accessed directly from within the class.
- `getBalance()` provides controlled read access to the balance.

For example:

```js
const account = new BankAccount("Ali", 1000);

console.log(account.getBalance()); // 1000

// console.log(account.#balance); // SyntaxError
```

The private field prevents outside code from directly accessing or changing the balance.

**Remember: Encapsulation = Protect data and control access.**

---

## 3. Pillar Two: Abstraction

**Definition:** Abstraction hides unnecessary implementation details and exposes essential operations.

Look at the `deposit()` method:

```js
deposit(amount) {
  if (amount <= 0) {
    console.log("Deposit must be greater than zero.");
    return;
  }

  this.#balance += amount;

  console.log(`Deposited $${amount}`);
}
```

When we call:

```js
savings.deposit(200);
```

We do not need to manually validate the amount or update the private balance.

The method handles those steps internally.

The same idea applies to withdrawals:

```js
savings.withdraw(100);
```

The user calls a simple public method while the class manages the internal operations.

**Remember: Abstraction = Hide unnecessary complexity and expose essential operations.**

---

## 4. Pillar Three: Inheritance

**Definition:** Inheritance allows one class to reuse and extend the functionality of another class.

Look at these declarations:

```js
class SavingsAccount extends BankAccount {
  calculateBonus() {
    return this.getBalance() * 0.05;
  }
}

class CurrentAccount extends BankAccount {
  calculateBonus() {
    return 0;
  }
}
```

Here:

- `BankAccount` is the parent class.
- `SavingsAccount` is a child class.
- `CurrentAccount` is another child class.
- Both child classes inherit accessible methods from `BankAccount`.

For example, both account types can use:

```js
deposit()
withdraw()
getBalance()
showDetails()
```

The child classes do not need to rewrite all these methods.

The `CurrentAccount` class also uses:

```js
super.withdraw(amount);
```

This calls the inherited withdrawal method after the current account's extra withdrawal-limit check passes.

**Remember: Inheritance = Reuse and extend existing functionality.**

---

## 5. Pillar Four: Polymorphism

**Definition:** Polymorphism allows different objects to respond to the same method call in different ways.

Look at the `calculateBonus()` method in both child classes.

### SavingsAccount

```js
calculateBonus() {
  return this.getBalance() * 0.05;
}
```

### CurrentAccount

```js
calculateBonus() {
  return 0;
}
```

Both classes have the same method name, but their implementations differ.

Now look at the parent class:

```js
showDetails() {
  console.log(`Owner: ${this.owner}`);
  console.log(`Balance: $${this.getBalance()}`);
  console.log(`Bonus: $${this.calculateBonus()}`);
}
```

When we call:

```js
savings.showDetails();
current.showDetails();
```

JavaScript calls the appropriate `calculateBonus()` implementation for each object.

- `SavingsAccount` calculates a 5% bonus.
- `CurrentAccount` returns zero.

This is polymorphism.

The `CurrentAccount` class also overrides `withdraw()` to introduce a withdrawal limit while retaining the parent class's withdrawal logic through `super.withdraw()`.

**Remember: Polymorphism = The same method call can produce different behavior for different objects.**

---

## 6. Comparing the Four Pillars

| Pillar | Purpose | Example in This Project |
|---|---|---|
| Encapsulation | Protect internal data. | Private `#balance` field |
| Abstraction | Hide unnecessary details. | Public `deposit()` and `withdraw()` methods |
| Inheritance | Reuse and extend functionality. | `SavingsAccount extends BankAccount` |
| Polymorphism | Support different behaviors through the same interface. | Different `calculateBonus()` implementations |

### Easy Way to Remember

- **Encapsulation:** Protect the data.
- **Abstraction:** Simplify how the object is used.
- **Inheritance:** Reuse existing code.
- **Polymorphism:** Same method, different behavior.

---

## 7. Practice Exercises

Try these exercises yourself before looking at the solutions.

### Exercise 1: Encapsulation

Add a private field called `#accountNumber` to `BankAccount`.

Initialize it in the constructor and create a public method called `getAccountNumber()`.

<details>
<summary>Show solution</summary>

```js
class BankAccount {
  #accountNumber;

  constructor(owner, accountNumber) {
    this.owner = owner;
    this.#accountNumber = accountNumber;
  }

  getAccountNumber() {
    return this.#accountNumber;
  }
}

const account = new BankAccount("Ali", "123456");

console.log(account.getAccountNumber());
```

</details>

### Exercise 2: Abstraction

Add a public method called `transfer(amount, anotherAccount)` that withdraws money from the current account and deposits it into another account.

Only deposit the money into the other account if the withdrawal succeeds.

<details>
<summary>Show solution</summary>

```js
class BankAccount {
  #balance;

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  getBalance() {
    return this.#balance;
  }

  withdraw(amount) {
    if (amount <= 0 || amount > this.#balance) {
      return false;
    }

    this.#balance -= amount;
    return true;
  }

  deposit(amount) {
    if (amount <= 0) {
      return false;
    }

    this.#balance += amount;
    return true;
  }

  transfer(amount, anotherAccount) {
    if (this.withdraw(amount)) {
      anotherAccount.deposit(amount);
      console.log("Transfer successful.");
    } else {
      console.log("Transfer failed.");
    }
  }
}

const ali = new BankAccount("Ali", 1000);
const sara = new BankAccount("Sara", 500);

ali.transfer(200, sara);

console.log(ali.getBalance());  // 800
console.log(sara.getBalance()); // 700
```

</details>

### Exercise 3: Inheritance

Create a new class called `BusinessAccount` that extends `BankAccount`.

Give it a method called `businessInfo()` that prints:

```text
This is a business account.
```

<details>
<summary>Show solution</summary>

```js
class BankAccount {
  constructor(owner) {
    this.owner = owner;
  }
}

class BusinessAccount extends BankAccount {
  businessInfo() {
    console.log("This is a business account.");
  }
}

const business = new BusinessAccount("Ali");

business.businessInfo();
```

</details>

### Exercise 4: Polymorphism

Create two classes, `SavingsAccount` and `CurrentAccount`.

Both should have a method called `accountType()`.

The savings account should return `"Savings Account"`, while the current account should return `"Current Account"`.

<details>
<summary>Show solution</summary>

```js
class SavingsAccount {
  accountType() {
    return "Savings Account";
  }
}

class CurrentAccount {
  accountType() {
    return "Current Account";
  }
}

const accounts = [
  new SavingsAccount(),
  new CurrentAccount()
];

for (const account of accounts) {
  console.log(account.accountType());
}
```

Output:

```text
Savings Account
Current Account
```

</details>

---

## 8. Final Summary

The four pillars of OOP work together to create code that is organized, reusable, maintainable, and easier to extend.

In this bank account project:

- Encapsulation protects the account balance.
- Abstraction provides simple methods for depositing and withdrawing money.
- Inheritance allows different account types to reuse common functionality.
- Polymorphism allows account types to calculate their bonuses differently.

**The main goal is not simply to use all four pillars. It is to understand what problem each pillar solves and when to use it.**
