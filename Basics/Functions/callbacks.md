# JavaScript Callbacks & Higher-Order Functions

Now we move to a very important step.

You already know:

* Variables
* Conditions
* Loops
* Arrays
* Objects
* Functions
* `return`

Now we're going to combine them.

The key idea is:

> **In JavaScript, functions can be treated like values.**

That single idea leads to **callbacks**, **higher-order functions**, `map()`, `filter()`, `forEach()`, and eventually **asynchronous JavaScript**.

---

# 1. Functions Are Values

Normally, we store values in variables:

```js
let name = "Ali";
let age = 22;
let marks = 85;
```

But JavaScript also allows us to store a **function** in a variable.

```js
function greet() {
    console.log("Hello");
}

let myFunction = greet;
```

Now:

```js
myFunction();
```

Output:

```text
Hello
```

Think of it like:

```text
String → stored in variable
Number → stored in variable
Array  → stored in variable
Object → stored in variable
Function → stored in variable
```

This is one of the most important characteristics of JavaScript.

---

# 2. Function vs Function Call

Be very careful here.

```js
greet
```

means:

> The function itself.

While:

```js
greet()
```

means:

> Execute the function.

Example:

```js
function greet() {
    console.log("Hello");
}

let x = greet;
```

Here `x` contains the function.

But:

```js
let x = greet();
```

would execute the function immediately and store its return value in `x`.

---

# 3. Passing a Function as an Argument

You already know:

```js
function add(a, b) {
    return a + b;
}

add(10, 20);
```

Here, numbers are being passed as arguments.

But JavaScript also allows:

```js
function greet() {
    console.log("Hello");
}

function execute(fn) {
    fn();
}

execute(greet);
```

Output:

```text
Hello
```

Let's understand this carefully.

We have:

```js
function greet() {
    console.log("Hello");
}
```

Then:

```js
function execute(fn) {
    fn();
}
```

When we do:

```js
execute(greet);
```

the value of `greet` is passed into `fn`.

So internally:

```text
fn → greet
```

Then:

```js
fn();
```

is effectively:

```js
greet();
```

---

# 4. What is a Callback?

A **callback function is a function passed to another function as an argument, which the receiving function can execute.**

Example:

```js
function greet() {
    console.log("Hello");
}

function execute(fn) {
    fn();
}

execute(greet);
```

Here:

```js
greet
```

is the **callback**.

Why?

Because it was passed into another function:

```js
execute(greet);
```

---

# 5. A Real-World Analogy

Imagine you order food.

You tell the restaurant:

> "When my food is ready, call me."

You don't stand in the kitchen waiting.

You give them your callback:

```text
Order food
    ↓
Restaurant prepares it
    ↓
Food is ready
    ↓
Call customer
```

In programming:

```text
Start operation
    ↓
Do some work
    ↓
When appropriate
    ↓
Call callback function
```

This becomes especially important in **asynchronous JavaScript**.

---

# 6. Callback with Parameters

Callbacks can also receive data.

```js
function processUser(name, callback) {

    console.log("Processing " + name);

    callback(name);
}
```

Callback:

```js
function finished(name) {
    console.log(name + " is finished.");
}
```

Use:

```js
processUser("Ali", finished);
```

Output:

```text
Processing Ali
Ali is finished.
```

Flow:

```text
processUser("Ali", finished)
          ↓
name = "Ali"
callback = finished
          ↓
callback(name)
          ↓
finished("Ali")
```

---

# 7. Anonymous Callback Functions

We don't always need to create a named function.

Instead of:

```js
function greet() {
    console.log("Hello");
}

execute(greet);
```

We can write:

```js
execute(function() {
    console.log("Hello");
});
```

The function has no name.

This is called an **anonymous function**.

---

# 8. Arrow Function Callback

Modern JavaScript usually makes this shorter:

```js
execute(() => {
    console.log("Hello");
});
```

Or if it's one simple statement:

```js
execute(() => console.log("Hello"));
```

This is why arrow functions became very common in modern JavaScript.

---

# 9. What is a Higher-Order Function?

A **higher-order function** is a function that does at least one of these:

1. Takes another function as an argument.
2. Returns a function.

For example:

```js
function execute(fn) {
    fn();
}
```

`execute()` is a higher-order function because it accepts a function.

---

# 10. Callback vs Higher-Order Function

This distinction is important.

```js
function greet() {
    console.log("Hello");
}
```

`greet` → callback when passed somewhere.

```js
function execute(fn) {
    fn();
}
```

`execute` → higher-order function.

So:

```text
Callback
    ↓
The function being passed

Higher-order function
    ↓
The function receiving/returning another function
```

---

# 11. `forEach()` — Your First Important Higher-Order Function

Remember loops?

You could do:

```js
let numbers = [10, 20, 30, 40];

for (let number of numbers) {
    console.log(number);
}
```

JavaScript provides another way:

```js
numbers.forEach(function(number) {
    console.log(number);
});
```

Or using an arrow function:

```js
numbers.forEach(number => {
    console.log(number);
});
```

Output:

```text
10
20
30
40
```

---

# 12. How `forEach()` Works

Think of:

```js
numbers.forEach(callback);
```

as:

```text
Take first item
    ↓
Give it to callback
    ↓
Take second item
    ↓
Give it to callback
    ↓
Take third item
    ↓
Give it to callback
```

For:

```js
let numbers = [10, 20, 30];
```

conceptually:

```text
callback(10)
callback(20)
callback(30)
```

---

# 13. `forEach()` with Index

The callback can receive more information.

```js
let students = ["Ali", "Sara", "Ahmed"];

students.forEach((student, index) => {
    console.log(index, student);
});
```

Output:

```text
0 Ali
1 Sara
2 Ahmed
```

The callback can receive:

```text
value
index
array
```

For example:

```js
students.forEach((student, index, array) => {
    console.log(student);
});
```

---

# 14. `map()`

Now we reach one of the most important array methods.

Suppose:

```js
let numbers = [1, 2, 3, 4];
```

We want:

```text
1 → 2
2 → 4
3 → 6
4 → 8
```

We could use a loop:

```js
let result = [];

for (let number of numbers) {
    result.push(number * 2);
}
```

But `map()` makes this easier:

```js
let result = numbers.map(number => {
    return number * 2;
});
```

Output:

```js
[2, 4, 6, 8]
```

---

# 15. The Mental Model of `map()`

Remember:

> **`map()` transforms every element.**

```text
Original array
     ↓
   map()
     ↓
Transform each item
     ↓
New array
```

Example:

```text
[1, 2, 3, 4]
      ↓
   × 2
      ↓
[2, 4, 6, 8]
```

---

# 16. `map()` Always Returns a New Array

Example:

```js
let numbers = [1, 2, 3];

let doubled = numbers.map(number => number * 2);

console.log(numbers);
console.log(doubled);
```

Output:

```text
[1, 2, 3]
[2, 4, 6]
```

The original array remains unchanged.

---

# 17. `map()` with Objects

This is extremely common in real applications.

Suppose:

```js
let students = [
    { name: "Ali", marks: 80 },
    { name: "Sara", marks: 90 },
    { name: "Ahmed", marks: 70 }
];
```

We only want the names.

```js
let names = students.map(student => {
    return student.name;
});
```

Result:

```js
["Ali", "Sara", "Ahmed"]
```

This pattern appears constantly when working with API data.

---

# 18. `filter()`

Now suppose we have:

```js
let numbers = [10, 15, 20, 25, 30];
```

We only want even numbers.

```js
let result = numbers.filter(number => {
    return number % 2 === 0;
});
```

Output:

```js
[10, 20, 30]
```

Mental model:

> **`filter()` keeps items that satisfy a condition.**

```text
Original
[10, 15, 20, 25, 30]
        ↓
      filter
        ↓
 condition:
 number % 2 === 0
        ↓
[10, 20, 30]
```

---

# 19. `map()` vs `filter()`

This is a very common source of confusion.

### `map()`

**Transforms every item.**

```js
let numbers = [1, 2, 3];

let result = numbers.map(n => n * 10);
```

Result:

```js
[10, 20, 30]
```

Same number of elements.

### `filter()`

**Selects some items.**

```js
let numbers = [1, 2, 3];

let result = numbers.filter(n => n > 1);
```

Result:

```js
[2, 3]
```

Number of elements can decrease.

### Memory Trick

```text
map    → change
filter → choose
```

---

# 20. `find()`

Suppose:

```js
let students = [
    { id: 1, name: "Ali" },
    { id: 2, name: "Sara" },
    { id: 3, name: "Ahmed" }
];
```

We want the student with ID `2`.

```js
let student = students.find(student => {
    return student.id === 2;
});
```

Result:

```js
{
    id: 2,
    name: "Sara"
}
```

### Important difference

`filter()` returns an array:

```js
[
    { id: 2, name: "Sara" }
]
```

`find()` returns the first matching element:

```js
{ id: 2, name: "Sara" }
```

---

# 21. `some()`

Suppose:

```js
let marks = [40, 55, 30, 70];
```

Question:

> Does at least one student have marks above 60?

```js
let result = marks.some(mark => mark > 60);
```

Result:

```js
true
```

Mental model:

> **`some()` = Is there at least one?**

---

# 22. `every()`

Question:

> Did every student pass?

```js
let marks = [60, 75, 80, 90];

let result = marks.every(mark => mark >= 50);
```

Result:

```js
true
```

Mental model:

```text
some()
  ↓
At least ONE?

every()
  ↓
ALL?
```

---

# 23. `reduce()`

This one is slightly more advanced.

Suppose:

```js
let numbers = [10, 20, 30, 40];
```

We want the total.

Using a loop:

```js
let total = 0;

for (let number of numbers) {
    total += number;
}
```

Using `reduce()`:

```js
let total = numbers.reduce((sum, number) => {
    return sum + number;
}, 0);
```

Result:

```text
100
```

Mental model:

> **`reduce()` takes many values and reduces them into one result.**

```text
[10, 20, 30, 40]
        ↓
      reduce
        ↓
       100
```

---

# 24. Why `0`?

Look at:

```js
}, 0);
```

The `0` is the **initial value** of the accumulator.

Conceptually:

```text
sum = 0

sum + 10 → 10
sum + 20 → 30
sum + 30 → 60
sum + 40 → 100
```

---

# 25. The Big Five Array Methods

You should remember these mental models:

| Method      | Meaning                       |
| ----------- | ----------------------------- |
| `forEach()` | Do something for every item   |
| `map()`     | Transform every item          |
| `filter()`  | Keep matching items           |
| `find()`    | Find the first matching item  |
| `reduce()`  | Combine items into one result |

And:

| Method    | Question                 |
| --------- | ------------------------ |
| `some()`  | Does at least one match? |
| `every()` | Do all match?            |

---

# 26. Real-World Example: E-Commerce

Suppose:

```js
let products = [
    { name: "Laptop", price: 100000 },
    { name: "Mouse", price: 3000 },
    { name: "Keyboard", price: 5000 },
    { name: "Monitor", price: 30000 }
];
```

### Get product names

```js
let names = products.map(product => product.name);
```

Result:

```js
["Laptop", "Mouse", "Keyboard", "Monitor"]
```

### Get cheap products

```js
let cheapProducts = products.filter(product => product.price < 10000);
```

### Find laptop

```js
let laptop = products.find(product => product.name === "Laptop");
```

### Calculate total

```js
let total = products.reduce((sum, product) => {
    return sum + product.price;
}, 0);
```

Now we're doing real data processing.

---

# 27. Combining Methods

These methods can be chained.

Suppose:

```js
let products = [
    { name: "Laptop", price: 100000 },
    { name: "Mouse", price: 3000 },
    { name: "Keyboard", price: 5000 },
    { name: "Monitor", price: 30000 }
];
```

We want:

> Names of products costing less than 10,000.

```js
let result = products
    .filter(product => product.price < 10000)
    .map(product => product.name);
```

Result:

```js
["Mouse", "Keyboard"]
```

Flow:

```text
products
   ↓
filter()
   ↓
cheap products
   ↓
map()
   ↓
product names
```

This style is extremely common in modern JavaScript.

---

# 28. A More Realistic Example

Suppose we have users:

```js
let users = [
    {
        name: "Ali",
        age: 22,
        active: true
    },
    {
        name: "Sara",
        age: 17,
        active: true
    },
    {
        name: "Ahmed",
        age: 25,
        active: false
    },
    {
        name: "Zain",
        age: 30,
        active: true
    }
];
```

We want:

> Names of active users who are adults.

```js
let result = users
    .filter(user => user.active && user.age >= 18)
    .map(user => user.name);
```

Result:

```js
["Ali", "Zain"]
```

Look at how many concepts are combined:

```text
Array
 ↓
Objects
 ↓
Functions
 ↓
Callbacks
 ↓
Conditions
 ↓
AND operator
 ↓
filter()
 ↓
map()
```

---

# 29. Why This Is Better Than Huge Loops

You could write:

```js
let result = [];

for (let user of users) {

    if (user.active && user.age >= 18) {
        result.push(user.name);
    }

}
```

This is completely valid.

But:

```js
let result = users
    .filter(user => user.active && user.age >= 18)
    .map(user => user.name);
```

expresses the intention very clearly:

> Filter the users, then map them to names.

Both approaches are useful.

**Don't stop understanding loops just because array methods exist.** Under the hood, these methods still involve iteration.

---

# 30. Callback Parameters

Remember:

```js
numbers.map(number => number * 2);
```

The callback receives the current item.

You can also receive the index:

```js
numbers.map((number, index) => {
    console.log(index, number);

    return number * 2;
});
```

For:

```js
[10, 20, 30]
```

you'll conceptually get:

```text
index 0 → number 10
index 1 → number 20
index 2 → number 30
```

---

# 31. Callback Functions Can Be Reused

Instead of:

```js
numbers.map(number => number * 2);
```

we can define:

```js
function double(number) {
    return number * 2;
}
```

Then:

```js
numbers.map(double);
```

This is useful when the callback logic is complex or needs to be reused.

---

# 32. Higher-Order Functions Can Return Functions

This is the other definition of a higher-order function.

For example:

```js
function createGreeting(greeting) {

    return function(name) {
        return greeting + ", " + name;
    };

}
```

Now:

```js
let sayHello = createGreeting("Hello");
```

`createGreeting()` returns a function.

Then:

```js
console.log(sayHello("Ali"));
```

Output:

```text
Hello, Ali
```

Flow:

```text
createGreeting("Hello")
        ↓
returns a function
        ↓
sayHello
        ↓
sayHello("Ali")
        ↓
"Hello, Ali"
```

This leads us toward **closures**, which are an important JavaScript concept.

---

# 33. Callback → Async JavaScript

Now you can understand why callbacks matter for asynchronous programming.

Imagine:

```js
downloadFile();
```

Downloading something may take time.

We don't want JavaScript to freeze the entire application while waiting.

Conceptually:

```text
Start download
      ↓
Continue doing other work
      ↓
Download finishes
      ↓
Run callback
```

For example, older asynchronous APIs often looked like:

```js
downloadFile(function() {
    console.log("Download complete!");
});
```

The callback says:

> "When the operation is complete, run this function."

Modern JavaScript has evolved beyond callback-based APIs toward:

```text
Callbacks
   ↓
Promises
   ↓
async / await
```

We'll study that properly later.

---

# 34. One Very Important Rule

Don't confuse:

```js
setTimeout(greet, 2000);
```

with:

```js
setTimeout(greet(), 2000);
```

The first passes the function:

```js
greet
```

The second executes it immediately:

```js
greet()
```

This distinction becomes **critical** in asynchronous JavaScript.

---

# 35. Your Mental Model

At this point, your JavaScript knowledge should look like:

```text
VARIABLES
    ↓
CONDITIONS
    ↓
LOOPS
    ↓
ARRAYS
    ↓
OBJECTS
    ↓
FUNCTIONS
    ↓
FUNCTIONS AS VALUES
    ↓
CALLBACKS
    ↓
HIGHER-ORDER FUNCTIONS
    ↓
map / filter / find / reduce
    ↓
ASYNCHRONOUS JAVASCRIPT
```

And the most important mental models are:

```text
forEach  → do something to every item

map      → transform every item

filter   → keep some items

find     → find first matching item

some     → at least one?

every    → all?

reduce   → many values → one value
```

## Practice

Try these yourself:

1. Create a callback-based function `runTask(task)`.
2. Use `forEach()` to print every element of an array.
3. Use `map()` to square `[1,2,3,4,5]`.
4. Use `filter()` to get numbers greater than 50.
5. Use `find()` to find a user by ID.
6. Use `some()` to check whether any student failed.
7. Use `every()` to check whether all students passed.
8. Use `reduce()` to calculate the total price of a shopping cart.
9. Given an array of objects, use `filter()` + `map()` to get the names of active users.
10. Create a higher-order function that accepts a function and executes it.


