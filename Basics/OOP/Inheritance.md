# Inheritance in JavaScript

## 1. What Is Inheritance?

**Inheritance** is an OOP concept that allows one class to acquire properties and methods from another class.

It helps us reuse existing code instead of writing the same functionality repeatedly.

Let's understand this with a real-world example.

Imagine we are building a program that represents different animals.

A dog and a cat have some things in common:

- Both have a name.
- Both can eat.
- Both can sleep.

However, they can also have different behaviors:

- A dog can bark.
- A cat can meow.

Instead of writing the same properties and methods repeatedly in separate classes, we can create a common `Animal` class and let `Dog` and `Cat` inherit from it.

This is the basic idea behind inheritance.

---

## 2. Understanding Parent and Child Classes

Inheritance commonly involves two types of classes.

| Term | Meaning |
|---|---|
| Parent class | A class that provides properties and methods to another class. |
| Child class | A class that inherits from another class and can add or customize functionality. |
| `extends` | A JavaScript keyword used to establish class inheritance. |

Let's create a simple example.

```javascript
class Animal {
  eat() {
    console.log("This animal is eating.");
  }

  sleep() {
    console.log("This animal is sleeping.");
  }
}

class Dog extends Animal {
  bark() {
    console.log("The dog is barking.");
  }
}

const dog = new Dog();

dog.eat();
dog.sleep();
dog.bark();
```

### Output

```text
This animal is eating.
This animal is sleeping.
The dog is barking.
```

### Understanding the Code

**Step 1: Create the parent class**

```javascript
class Animal {
  eat() {
    console.log("This animal is eating.");
  }
}
```

The `Animal` class defines the `eat()` method.

**Step 2: Create the child class**

```javascript
class Dog extends Animal {
  bark() {
    console.log("The dog is barking.");
  }
}
```

The `extends Animal` part tells JavaScript that `Dog` inherits from `Animal`.

**Step 3: Create an instance**

```javascript
const dog = new Dog();
```

This creates a new `Dog` object.

**Step 4: Use inherited behavior**

```javascript
dog.eat();
```

Even though `eat()` is not defined directly inside `Dog`, the dog can use it because `Dog` inherits from `Animal`.

The `Dog` class can also use its own `bark()` method.

**Key takeaway:** A child class can use inherited methods while also defining its own methods.

---

## 3. Why Do We Need Inheritance?

Let's compare two approaches.

### Approach A: Without inheritance

Suppose we create separate classes for dogs and cats.

```javascript
class Dog {
  eat() {
    console.log("The dog is eating.");
  }

  sleep() {
    console.log("The dog is sleeping.");
  }

  bark() {
    console.log("Woof!");
  }
}

class Cat {
  eat() {
    console.log("The cat is eating.");
  }

  sleep() {
    console.log("The cat is sleeping.");
  }

  meow() {
    console.log("Meow!");
  }
}
```

Both classes repeat similar functionality.

If we need to change how animals eat or sleep, we may need to update multiple classes.

### Approach B: With inheritance

```javascript
class Animal {
  eat() {
    console.log("The animal is eating.");
  }

  sleep() {
    console.log("The animal is sleeping.");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  meow() {
    console.log("Meow!");
  }
}
```

Now, the shared behavior is defined in one place.

```javascript
const dog = new Dog();
const cat = new Cat();

dog.eat();
dog.bark();

cat.eat();
cat.meow();
```

### Why is this better?

- Shared behavior is defined once.
- Child classes can add their own functionality.
- Changes to shared methods can be made in one place.
- Related classes can be organized into a clear structure.

Inheritance is useful when classes have a genuine **is-a relationship**. For example, a dog is an animal.

It should not be used merely to avoid repeating a few lines of code when the classes do not logically belong in the same hierarchy.

---

## 4. Inheriting Properties with `constructor()`

So far, we have inherited methods. We can also inherit properties initialized by a parent constructor.

Consider this example:

```javascript
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(
      `My name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const dog = new Dog("Buddy", 3);

dog.introduce();
dog.bark();
```

### Output

```text
My name is Buddy and I am 3 years old.
Buddy says Woof!
```

### What happens here?

The `Animal` class has a constructor that initializes:

- `name`
- `age`

The `Dog` class extends `Animal`, so it can use the parent class's constructor when a `Dog` instance is created.

Because `Dog` does not define its own constructor, JavaScript provides a default derived constructor that forwards the arguments to the parent constructor.

Therefore:

```javascript
const dog = new Dog("Buddy", 3);
```

initializes the inherited `name` and `age` properties.

The dog can then access those properties through `this.name` and `this.age`.

---

## 5. Understanding `super()`

Now let's make the child class define its own constructor.

When a derived class defines a constructor, it must call `super()` before accessing `this`.

The `super()` call invokes the parent class's constructor.

### Example

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);

    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} is barking.`);
  }
}

const dog = new Dog("Buddy", "German Shepherd");

console.log(dog.name);
console.log(dog.breed);

dog.eat();
dog.bark();
```

### Output

```text
Buddy
German Shepherd
Buddy is eating.
Buddy is barking.
```

### Step-by-step explanation

**Step 1: The parent constructor**

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}
```

The parent constructor initializes the `name` property.

**Step 2: The child constructor**

```javascript
constructor(name, breed) {
  super(name);

  this.breed = breed;
}
```

The child constructor receives two parameters:

- `name`
- `breed`

**Step 3: Call `super(name)`**

```javascript
super(name);
```

This calls the `Animal` constructor and initializes `this.name`.

**Step 4: Initialize the child property**

```javascript
this.breed = breed;
```

This adds the `breed` property to the new dog instance.

The resulting object has both inherited data and its own additional data.

### Important rule

In a derived class constructor, you must call `super()` before using `this`.

For example, this is invalid:

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    this.breed = breed; // ReferenceError
    super(name);
  }
}
```

The correct order is:

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
```

---

## 6. What Is Method Overriding?

**Method overriding** happens when a child class defines a method with the same name as a method inherited from its parent.

When that method is called on the child instance, JavaScript uses the child's implementation.

### Example

```javascript
class Animal {
  makeSound() {
    console.log("The animal makes a sound.");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof!");
  }
}

const animal = new Animal();
const dog = new Dog();

animal.makeSound();
dog.makeSound();
```

### Output

```text
The animal makes a sound.
Woof!
```

### Why does this happen?

The `Animal` class defines `makeSound()`.

The `Dog` class also defines `makeSound()`, so it overrides the inherited method.

When we call:

```javascript
dog.makeSound();
```

JavaScript finds the method defined on `Dog` first and executes it.

The parent's implementation still exists and can be called explicitly when needed.

Method overriding is also an important part of polymorphism, which we can study separately.

---

## 7. Calling a Parent Method with `super`

Sometimes we want to override a method while keeping the parent's behavior.

We can use `super.methodName()` to call the parent method.

### Example

```javascript
class Animal {
  makeSound() {
    console.log("The animal makes a sound.");
  }
}

class Dog extends Animal {
  makeSound() {
    super.makeSound();

    console.log("Woof!");
  }
}

const dog = new Dog();

dog.makeSound();
```

### Output

```text
The animal makes a sound.
Woof!
```

### Explanation

```javascript
super.makeSound();
```

calls the parent class's `makeSound()` method.

After that, the child class executes its own additional code.

This allows a child class to extend the behavior of a parent method instead of replacing it completely.

Remember the difference:

| Syntax | Purpose |
|---|---|
| `super()` | Calls the parent constructor. |
| `super.methodName()` | Calls a parent method. |

---

## 8. Multilevel Inheritance

**Multilevel inheritance** occurs when one class extends another class, which itself extends a third class.

Consider this structure:

`Animal` → `Mammal` → `Dog`

Here:

- `Animal` is the base class.
- `Mammal` extends `Animal`.
- `Dog` extends `Mammal`.

### Example

```javascript
class Animal {
  eat() {
    console.log("Eating...");
  }
}

class Mammal extends Animal {
  walk() {
    console.log("Walking...");
  }
}

class Dog extends Mammal {
  bark() {
    console.log("Barking...");
  }
}

const dog = new Dog();

dog.eat();
dog.walk();
dog.bark();
```

### Output

```text
Eating...
Walking...
Barking...
```

The `Dog` instance can use methods defined in all three classes.

This works because inheritance forms a chain.

However, very deep inheritance hierarchies can make code harder to understand. Keep the structure simple and meaningful.

---

## 9. Checking Inheritance with `instanceof`

JavaScript provides the `instanceof` operator to check whether an object is an instance of a class or has that class in its prototype chain.

### Example

```javascript
class Animal {}

class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
```

Why are all three results `true`?

- `dog` was created from `Dog`.
- `Dog` extends `Animal`.
- JavaScript class instances normally inherit through a prototype chain that ultimately includes `Object.prototype`.

This is useful when you need to check an object's class relationship.

---

## 10. Important Rules to Remember

1. Use `extends` to create a child class.
2. A child class inherits accessible methods from its parent through the prototype chain.
3. A child class can add its own properties and methods.
4. A child class can inherit property initialization from the parent constructor.
5. If a child class defines a constructor, it must call `super()` before accessing `this`.
6. Use `super.methodName()` to call a parent method.
7. Method overriding lets a child class provide a different implementation of an inherited method.
8. Multilevel inheritance creates a chain of related classes.
9. A JavaScript class can extend only one class directly.
10. Use inheritance when the relationship between classes makes sense, not just to reduce repeated code.

---

## 11. Common Beginner Mistakes

### Mistake 1: Forgetting `extends`

```javascript
class Animal {
  eat() {
    console.log("Eating...");
  }
}

class Dog {
  bark() {
    console.log("Barking...");
  }
}

const dog = new Dog();

// dog.eat(); // TypeError: dog.eat is not a function
```

The `Dog` class does not inherit from `Animal` because we did not use `extends`.

Correct version:

```javascript
class Dog extends Animal {
  bark() {
    console.log("Barking...");
  }
}
```

### Mistake 2: Forgetting `super()`

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    this.breed = breed;
    super(name); // Invalid order
  }
}
```

Correct version:

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
```

### Mistake 3: Thinking overriding deletes the parent method

```javascript
class Animal {
  makeSound() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof!");
  }
}
```

The parent's method is not deleted. The child method takes precedence when accessed through a `Dog` instance.

You can still call it from the child method:

```javascript
class Dog extends Animal {
  makeSound() {
    super.makeSound();
    console.log("Woof!");
  }
}
```

### Mistake 4: Using inheritance when the relationship does not make sense

Inheritance should represent a meaningful relationship.

For example, a `Dog` is an `Animal`, so that relationship makes sense.

But a `Car` is not an `Animal`. Making `Car` extend `Animal` simply to reuse a method would create a confusing design.

---

## 12. Practice Exercises

Try to solve these exercises yourself before opening the solutions.

### Exercise 1: Person and Student

Create a `Person` class with:

- A `name` property.
- An `introduce()` method.

Then create a `Student` class that extends `Person` and adds:

- A `grade` property.
- A `study()` method.

Create a student and call both methods.

<details>
  <summary>Show solution</summary>

  ```javascript
  class Person {
    constructor(name) {
      this.name = name;
    }

    introduce() {
      console.log(`My name is ${this.name}.`);
    }
  }

  class Student extends Person {
    constructor(name, grade) {
      super(name);
      this.grade = grade;
    }

    study() {
      console.log(`${this.name} is studying.`);
    }
  }

  const student = new Student("Ali", "A");

  student.introduce();
  student.study();
  ```
</details>

### Exercise 2: Vehicle and Car

Create a `Vehicle` class with:

- A `brand` property.
- A `start()` method.

Then create a `Car` class that extends `Vehicle` and adds:

- A `model` property.
- A `displayInfo()` method.

Create a car and use both the inherited method and the child method.

<details>
  <summary>Show solution</summary>

  ```javascript
  class Vehicle {
    constructor(brand) {
      this.brand = brand;
    }

    start() {
      console.log(`${this.brand} is starting.`);
    }
  }

  class Car extends Vehicle {
    constructor(brand, model) {
      super(brand);
      this.model = model;
    }

    displayInfo() {
      console.log(`${this.brand} ${this.model}`);
    }
  }

  const car = new Car("Toyota", "Corolla");

  car.start();
  car.displayInfo();
  ```
</details>

### Exercise 3: Method Overriding

Create an `Animal` class with a `makeSound()` method.

Then create `Dog` and `Cat` classes that extend `Animal` and override `makeSound()` with their own sounds.

<details>
  <summary>Show solution</summary>

  ```javascript
  class Animal {
    makeSound() {
      console.log("The animal makes a sound.");
    }
  }

  class Dog extends Animal {
    makeSound() {
      console.log("Woof!");
    }
  }

  class Cat extends Animal {
    makeSound() {
      console.log("Meow!");
    }
  }

  const dog = new Dog();
  const cat = new Cat();

  dog.makeSound();
  cat.makeSound();
  ```
</details>

---

## 13. Final Summary

Inheritance allows classes to reuse and extend functionality from other classes.

The most important concepts are:

- **Parent class:** Provides shared functionality.
- **Child class:** Inherits and extends that functionality.
- **`extends`:** Establishes inheritance.
- **`super()`:** Calls the parent constructor.
- **`super.methodName()`:** Calls a parent method.
- **Method overriding:** Allows a child class to customize inherited behavior.
- **Multilevel inheritance:** Creates a chain of classes.

Before moving forward, make sure you can create a parent class, extend it, initialize inherited properties, use `super()`, and override a method.

Once these concepts are clear, we can study **polymorphism** as a separate topic.
