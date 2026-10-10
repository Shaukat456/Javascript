# Object-Oriented Programming (OOP) in JavaScript

## 1. What Is OOP?

**Object-Oriented Programming (OOP)** is a programming approach that organizes code around objects.

Objects contain:

- **Properties** — data that describes an object.
- **Methods** — functions that define what an object can do.

For example, a car can have properties such as `brand` and `color`, and methods such as `start()` and `stop()`.

## 2. Creating an Object

In JavaScript, we can create an object using object literal syntax.

```javascript
const car = {
  brand: "Toyota",
  color: "Black",

  start() {
    console.log("The car has started.");
  },
};

console.log(car.brand); // Toyota
car.start(); // The car has started.
```

Here:

- `brand` and `color` are properties.
- `start()` is a method.
- `car` is an object.

## 3. What Is a Class?

A **class** is a blueprint for creating objects.

Instead of creating every object manually, we can define a class and create multiple objects from it.

```javascript
class Car {
  constructor(brand, color) {
    this.brand = brand;
    this.color = color;
  }

  start() {
    console.log(`${this.brand} has started.`);
  }
}

const car1 = new Car("Toyota", "Black");
const car2 = new Car("Honda", "White");

console.log(car1.brand); // Toyota
console.log(car2.brand); // Honda

car1.start(); // Toyota has started.
car2.start(); // Honda has started.
```

### Understanding the Code

- `class Car` defines a class named `Car`.
- `constructor()` initializes a newly created object.
- `this.brand` refers to the `brand` property of the current object.
- `new Car(...)` creates an instance of the class.
- `car1` and `car2` are separate objects created from the same class.

## 4. The Four Main Principles of OOP

The four commonly taught principles of OOP are:

| Principle | Meaning |
|---|---|
| Encapsulation | Keeping data and related methods together while controlling access to internal data. |
| Abstraction | Hiding unnecessary implementation details and exposing a simpler interface. |
| Inheritance | Allowing one class to reuse or extend functionality from another class. |
| Polymorphism | Allowing the same method interface to produce different behavior in different objects. |

We will study these principles one at a time.

## 5. Why Use OOP?

OOP can help us:

- Organize large programs.
- Reuse code.
- Represent real-world entities.
- Keep related data and behavior together.
- Maintain and extend applications more easily.

OOP is useful when a program contains many related entities, but it is not necessary for every JavaScript program.

## 6. Practice Exercise

Create a class named `Student` with the following requirements:

1. Add a constructor that accepts `name` and `age`.
2. Store both values as properties.
3. Add a method named `introduce()` that prints the student's name and age.
4. Create two student objects and call `introduce()` on both.

### Example Output

```text
My name is Ali and I am 18 years old.
My name is Sara and I am 20 years old.
```

## 7. Summary

- OOP organizes code around objects.
- Objects contain properties and methods.
- Classes provide a blueprint for creating objects.
- The `constructor()` method initializes new instances.
- The `new` keyword creates an instance of a class.
- The four main OOP principles are encapsulation, abstraction, inheritance, and polymorphism.
