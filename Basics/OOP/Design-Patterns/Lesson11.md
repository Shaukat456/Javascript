# Lesson 12: Iterator Pattern in JavaScript

## 1. What Is the Iterator Pattern?

The **Iterator Pattern** is a behavioral design pattern that provides a standard way to access elements in a collection one at a time without exposing the collection's internal structure.

In simpler words:

> An iterator lets you go through a collection of items one by one without needing to know how those items are stored internally.

Imagine you have a playlist containing songs. You want to play the songs one by one.

You shouldn't need to know whether the songs are stored in an array, a linked list, or some other data structure. You just need a way to get the next song.

That's the idea behind the Iterator Pattern.

### Real-world examples

- A music player moving through songs in a playlist.
- A book reader moving through pages.
- A shopping application displaying products one at a time.
- A file explorer traversing files in a folder.
- JavaScript's `for...of` loop iterating over arrays, strings, maps, and sets.

## 2. The Problem Without the Iterator Pattern

Suppose we have a collection of students.

```js
const students = [
  "Ali",
  "Sara",
  "Ahmed",
  "Ayesha",
];

for (let i = 0; i < students.length; i++) {
  console.log(students[i]);
}
```

Output:

```text
Ali
Sara
Ahmed
Ayesha
```

This works perfectly well for an array.

But what if our students are stored in a different data structure?

```js
const students = {
  first: "Ali",
  second: "Sara",
  third: "Ahmed",
};
```

Now we cannot use the same array-based loop because this object doesn't have a `length` property or numeric indexes.

We might write different traversal logic for each data structure:

```js
// Array traversal
for (let i = 0; i < studentsArray.length; i++) {
  console.log(studentsArray[i]);
}

// Object traversal
for (const key in studentsObject) {
  console.log(studentsObject[key]);
}
```

As an application grows, having different traversal logic everywhere can make code harder to maintain.

**The Iterator Pattern provides a consistent interface for traversing a collection.**

Note: Using different loops for different data structures is not automatically bad. The pattern becomes useful when you want to separate traversal behavior from collection storage and give consumers a consistent way to access items.

## 3. The Core Idea

A simple iterator needs to answer two questions:

1. What is the next item?
2. Are there any items left?

For example, consider this sequence:

```text
Ali → Sara → Ahmed → Ayesha → Finished
```

An iterator tracks its current position and returns one item at a time.

We can represent the idea with a simple object:

```js
const iterator = {
  next() {
    return {
      value: "Ali",
      done: false,
    };
  },
};
```

This is only a demonstration. Every call currently returns `"Ali"`, so it is not yet a useful iterator.

Let's build a real one.

## 4. Build a Simple Custom Iterator

We'll create an iterator for an array of names.

### Step 1: Create the collection

```js
const names = ["Ali", "Sara", "Ahmed"];
```

### Step 2: Create the iterator

```js
function createIterator(items) {
  let index = 0;

  return {
    next() {
      if (index < items.length) {
        return {
          value: items[index++],
          done: false,
        };
      }

      return {
        value: undefined,
        done: true,
      };
    },
  };
}
```

Let's understand each part.

**`let index = 0`**

This variable remembers which item should be returned next.

**`next()`**

Each time we call this method, the iterator advances to the next item.

**`value`**

This contains the item returned by the iterator.

**`done`**

This tells us whether iteration has finished:

- `false`: An item was returned and iteration can continue.
- `true`: There are no more items.

### Step 3: Use the iterator

```js
const namesIterator = createIterator(names);

console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
```

Output:

```js
{ value: "Ali", done: false }
{ value: "Sara", done: false }
{ value: "Ahmed", done: false }
{ value: undefined, done: true }
```

Notice that the iterator remembers its position between calls.

You don't need to pass an index to `next()`. The iterator manages that detail internally.

### Step 4: Read items using a loop

```js
const iterator = createIterator([
  "JavaScript",
  "Python",
  "Java",
]);

let result = iterator.next();

while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
```

Output:

```text
JavaScript
Python
Java
```

Our iterator now provides a consistent way to retrieve items one at a time.

## 5. JavaScript's Built-in Iterator Protocol

JavaScript already has a standard mechanism for iteration.

There are two important concepts:

| Concept | Meaning |
|---|---|
| Iterable | An object that can provide an iterator. |
| Iterator | An object that provides a `next()` method. |

An iterable implements a method named `Symbol.iterator`. Calling this method returns an iterator.

An iterator's `next()` method returns an object containing `value` and `done`.

Let's look at an array:

```js
const colors = ["Red", "Green", "Blue"];

const iterator = colors[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```js
{ value: "Red", done: false }
{ value: "Green", done: false }
{ value: "Blue", done: false }
{ value: undefined, done: true }
```

Here is the sequence:

1. `colors` is an iterable.
2. `colors[Symbol.iterator]()` creates an iterator.
3. `iterator.next()` returns the next iteration result.
4. Once the items are exhausted, `done` becomes `true`.

This is the protocol used by many JavaScript language features.

## 6. Why Does `for...of` Work?

You've probably used this before:

```js
const fruits = ["Apple", "Banana", "Mango"];

for (const fruit of fruits) {
  console.log(fruit);
}
```

Output:

```text
Apple
Banana
Mango
```

But what happens behind the scenes?

Conceptually, `for...of`:

1. Gets an iterator from the iterable.
2. Calls `next()` repeatedly.
3. Reads each result's `value`.
4. Stops when `done` becomes `true`.

You normally don't need to implement this loop yourself. JavaScript handles it for you.

The important point is that `for...of` works with **iterables**, not with every object automatically.

For example:

```js
const person = {
  name: "Ali",
  age: 20,
};

// This throws a TypeError because person is not iterable.
// for (const value of person) {
//   console.log(value);
// }
```

To make a custom object work with `for...of`, we can implement `Symbol.iterator`.

## 7. Create Your Own Iterable Collection

Now let's create a class that follows JavaScript's iterable protocol.

We'll make a `Playlist` class that stores songs internally.

```js
class Playlist {
  #songs;

  constructor(songs) {
    this.#songs = [...songs];
  }

  addSong(song) {
    this.#songs.push(song);
  }

  [Symbol.iterator]() {
    let index = 0;
    const songs = this.#songs;

    return {
      next() {
        if (index < songs.length) {
          return {
            value: songs[index++],
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };
  }
}
```

### Understanding the implementation

**1. Private collection**

```js
#songs;
```

The `#songs` field keeps the internal array private. Code outside the class cannot directly access it.

**2. The iterator method**

```js
[Symbol.iterator]() {
  // ...
}
```

This method allows JavaScript to request an iterator from our playlist.

**3. Independent iterator state**

```js
let index = 0;
```

Every time `[Symbol.iterator]()` is called, a new index is created.

That means two independent loops can each start at the beginning.

**4. Returning iteration results**

```js
return {
  value: songs[index++],
  done: false,
};
```

Each call returns the next song until the collection is exhausted.

### Using our custom iterable

```js
const playlist = new Playlist([
  "Song A",
  "Song B",
  "Song C",
]);

for (const song of playlist) {
  console.log(song);
}
```

Output:

```text
Song A
Song B
Song C
```

Even though `Playlist` is a custom class, `for...of` works because the class implements `Symbol.iterator`.

We can also use the iterator directly:

```js
const iterator = playlist[Symbol.iterator]();

console.log(iterator.next().value); // Song A
console.log(iterator.next().value); // Song B
console.log(iterator.next().value); // Song C
```

The playlist exposes a way to traverse songs without exposing its private array.

## 8. A Simpler Approach: Generator Functions

JavaScript generators can make custom iterators much easier to write.

A generator function uses `function*` instead of `function`.

Inside it, the `yield` keyword produces one value at a time.

Let's rewrite the playlist iterator using a generator.

```js
class Playlist {
  #songs;

  constructor(songs) {
    this.#songs = [...songs];
  }

  addSong(song) {
    this.#songs.push(song);
  }

  *[Symbol.iterator]() {
    for (const song of this.#songs) {
      yield song;
    }
  }
}
```

Usage remains exactly the same:

```js
const playlist = new Playlist([
  "Song A",
  "Song B",
  "Song C",
]);

for (const song of playlist) {
  console.log(song);
}
```

Output:

```text
Song A
Song B
Song C
```

### What does `yield` do?

Consider this generator:

```js
function* generateNumbers() {
  yield 10;
  yield 20;
  yield 30;
}

const numbers = generateNumbers();

console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
```

Output:

```js
{ value: 10, done: false }
{ value: 20, done: false }
{ value: 30, done: false }
{ value: undefined, done: true }
```

Each `yield` pauses the generator and provides a value. When `next()` is called again, execution resumes from where it paused.

**Important:** A generator function does not immediately return the yielded values as an array. Calling it returns a generator object, which is an iterator and an iterable.

For most custom iteration tasks, generators are an excellent starting point because they reduce the amount of code you need to maintain.

## 9. Practical Example: A Product Collection

Let's create a collection that stores products and allows other parts of an application to iterate over them.

```js
class ProductCollection {
  #products = [];

  add(product) {
    this.#products.push(product);
  }

  get count() {
    return this.#products.length;
  }

  *[Symbol.iterator]() {
    for (const product of this.#products) {
      yield product;
    }
  }
}

const products = new ProductCollection();

products.add({
  id: 1,
  name: "Keyboard",
  price: 50,
});

products.add({
  id: 2,
  name: "Mouse",
  price: 25,
});

products.add({
  id: 3,
  name: "Monitor",
  price: 200,
});

for (const product of products) {
  console.log(`${product.name}: $${product.price}`);
}
```

Output:

```text
Keyboard: $50
Mouse: $25
Monitor: $200
```

The calling code doesn't need to know that the products are stored in a private array.

It only needs to know that `ProductCollection` is iterable.

### Use it with other JavaScript features

Because `ProductCollection` is iterable, you can use it with several built-in features.

**Spread syntax**

```js
const allProducts = [...products];

console.log(allProducts.length); // 3
```

**Array conversion**

```js
const productNames = Array.from(products, product => product.name);

console.log(productNames);
// ["Keyboard", "Mouse", "Monitor"]
```

**Manual iterator access**

```js
const iterator = products[Symbol.iterator]();

console.log(iterator.next().value.name); // Keyboard
console.log(iterator.next().value.name); // Mouse
```

An iterable can work with these features because they know how to request and consume an iterator.

## 10. Iterable vs. Iterator

These concepts sound similar, but they have different responsibilities.

| Feature | Iterable | Iterator |
|---|---|---|
| Main purpose | Provides a way to begin iteration | Produces the next result |
| Required method | `[Symbol.iterator]()` | `next()` |
| Typical result | An iterator | `{ value, done }` |
| Example | An array | The object returned by `array[Symbol.iterator]()` |
| Common use | `for...of` | Manual calls to `next()` |

Here's a quick demonstration:

```js
const numbers = [100, 200, 300];

// The array is iterable.
const iterator = numbers[Symbol.iterator]();

// The iterator produces results.
console.log(iterator.next());
```

An object can be both iterable and an iterator, but they do not have to be the same object.

A generator object, for example, supports both protocols.

## 11. Iterator Pattern vs. Other Design Patterns

You have now studied several behavioral patterns. Here's how the Iterator Pattern differs from some of them.

| Pattern | Main purpose |
|---|---|
| Iterator | Access collection elements one at a time |
| Strategy | Select an algorithm or behavior |
| Command | Represent an action as an object |
| Observer | Notify subscribers when something changes |
| State | Change behavior according to an object's state |
| Template Method | Define an algorithm's structure while allowing steps to vary |

Consider an online store:

- **Iterator:** Go through all products in a catalog.
- **Strategy:** Calculate shipping costs using a selected strategy.
- **Command:** Represent an action such as adding a product to a cart.
- **Observer:** Notify the interface when the cart changes.

These patterns solve different problems and can be used together.

## 12. Advantages of the Iterator Pattern

### 1. Encapsulation

The consumer can traverse a collection without accessing its internal storage.

### 2. Consistent interface

Different collection types can expose the same iteration protocol.

### 3. Separation of responsibilities

The collection manages its data; the iterator manages traversal.

### 4. Lazy evaluation

Generators can produce values as needed instead of building an entire result array in advance.

This is especially useful for large sequences or streams of data.

### 5. Integration with JavaScript

A custom iterable works with `for...of`, spread syntax, `Array.from()`, and other iteration-aware features.

## 13. Disadvantages and Limitations

### 1. Extra complexity

For a simple array, a custom iterator may add unnecessary code.

```js
const names = ["Ali", "Sara", "Ahmed"];

for (const name of names) {
  console.log(name);
}
```

There is no need to implement your own iterator just to loop over an ordinary array.

### 2. Iteration state needs care

Each iterator should generally maintain its own position. Sharing one mutable index between independent iterators can cause unexpected behavior.

### 3. Mutation during iteration

If a collection changes while it is being traversed, the behavior depends on how the iterator was implemented.

For example, an iterator over an array might observe items added before iteration ends.

You should decide what behavior your collection needs and document it when necessary.

### 4. Not every object is iterable

Ordinary objects are not automatically compatible with `for...of`. They need to implement the iterable protocol.

For simple object properties, `Object.keys()`, `Object.values()`, or `Object.entries()` may be more appropriate.

## 14. Common Mistakes

### Mistake 1: Forgetting `Symbol.iterator`

This object has a `next()` method, but it isn't iterable because it doesn't provide `[Symbol.iterator]()`.

```js
const customIterator = {
  next() {
    return {
      value: 1,
      done: false,
    };
  },
};

// This won't work:
// for (const value of customIterator) {}
```

To make it iterable, implement `[Symbol.iterator]()` so it returns an iterator.

### Mistake 2: Returning the wrong shape

A JavaScript iterator should return an iteration result object.

Correct:

```js
{
  value: "Hello",
  done: false,
}
```

Incorrect:

```js
"Hello"
```

The `next()` method must return an object with the appropriate `done` and `value` properties.

### Mistake 3: Never finishing iteration

If `done` never becomes `true`, a loop that relies on the iterator reaching its end may continue indefinitely.

Ensure your iterator has a clear stopping condition.

### Mistake 4: Sharing iterator state accidentally

Consider this design:

```js
class BadCollection {
  #items = [1, 2, 3];
  #index = 0;

  next() {
    if (this.#index >= this.#items.length) {
      return {
        value: undefined,
        done: true,
      };
    }

    return {
      value: this.#items[this.#index++],
      done: false,
    };
  }
}
```

This class mixes collection storage with a single shared iteration position. If two consumers need to iterate independently, they'll interfere with each other.

A better design creates a new iterator with its own index each time `[Symbol.iterator]()` is called.

### Mistake 5: Assuming `done: true` means the value must be `undefined`

The iterator protocol allows an iteration result to have a `value` even when `done` is `true`. Consumers normally stop when they see `done: true`.

For an exhausted array-like iterator, `value` is commonly `undefined`, but that is not the only permitted result.

## 15. Practice Exercises

Try solving these exercises before opening the solutions.

### Exercise 1: Number Iterator

Create a function named `createNumberIterator()` that takes an array of numbers and returns an iterator.

Requirements:

- Return one number per call to `next()`.
- Return `done: true` when all numbers have been consumed.
- Test it with `[10, 20, 30]`.

<details>
<summary>Show solution</summary>

```js
function createNumberIterator(numbers) {
  let index = 0;

  return {
    next() {
      if (index < numbers.length) {
        return {
          value: numbers[index++],
          done: false,
        };
      }

      return {
        value: undefined,
        done: true,
      };
    },
  };
}

const iterator = createNumberIterator([10, 20, 30]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```js
{ value: 10, done: false }
{ value: 20, done: false }
{ value: 30, done: false }
{ value: undefined, done: true }
```

</details>

### Exercise 2: Make a Class Iterable

Create a `BookShelf` class.

Requirements:

- Store book titles in a private field.
- Accept an array of book titles in the constructor.
- Implement `[Symbol.iterator]()` using a generator.
- Make the class work with `for...of`.

<details>
<summary>Show solution</summary>

```js
class BookShelf {
  #books;

  constructor(books) {
    this.#books = [...books];
  }

  *[Symbol.iterator]() {
    for (const book of this.#books) {
      yield book;
    }
  }
}

const shelf = new BookShelf([
  "Clean Code",
  "The Pragmatic Programmer",
  "Eloquent JavaScript",
]);

for (const book of shelf) {
  console.log(book);
}
```

Output:

```text
Clean Code
The Pragmatic Programmer
Eloquent JavaScript
```

The generator automatically creates the iterator behavior for the shelf.

</details>

### Exercise 3: Iterate Over Even Numbers

Write a generator function called `evenNumbers()` that yields even numbers from `2` through `10`.

Expected output:

```text
2
4
6
8
10
```

<details>
<summary>Show solution</summary>

```js
function* evenNumbers() {
  for (let number = 2; number <= 10; number += 2) {
    yield number;
  }
}

for (const number of evenNumbers()) {
  console.log(number);
}
```

Each `yield` produces the next even number. The generator finishes when the loop ends.

</details>

### Exercise 4: Build a Task Collection

Create a `TaskCollection` class.

Requirements:

- Store task names in a private array.
- Add a task using `addTask(task)`.
- Implement an iterator with a generator.
- Use `for...of` to print every task.

<details>
<summary>Show solution</summary>

```js
class TaskCollection {
  #tasks = [];

  addTask(task) {
    this.#tasks.push(task);
  }

  *[Symbol.iterator]() {
    for (const task of this.#tasks) {
      yield task;
    }
  }
}

const tasks = new TaskCollection();

tasks.addTask("Learn JavaScript");
tasks.addTask("Practice design patterns");
tasks.addTask("Build a project");

for (const task of tasks) {
  console.log(task);
}
```

Output:

```text
Learn JavaScript
Practice design patterns
Build a project
```

The collection controls how tasks are stored, while the iterator controls how they are traversed.

</details>

## 16. Final Recap

You have learned:

- What the Iterator Pattern is and when to use it.
- How to create a manual iterator using `next()`.
- The meaning of `value` and `done`.
- The difference between an iterable and an iterator.
- How `Symbol.iterator` works.
- How custom classes can work with `for...of`.
- How generator functions and `yield` simplify iterator implementation.
- How iteration integrates with spread syntax and `Array.from()`.
- The advantages, limitations, and common mistakes of the pattern.

**The most important takeaway:**

The Iterator Pattern separates *how you access the next item* from *how the collection stores its items*.

In modern JavaScript, you will often use built-in iterables and generators rather than implementing every iterator manually.

## 17. What's Next?

**Lesson 13: Mediator Pattern**

You'll learn how to reduce direct dependencies between objects by introducing a central mediator that coordinates their communication.

We'll build practical examples and compare the Mediator Pattern with the Observer Pattern you studied earlier.
