
# JavaScript Functions

## 1. What is a Function?

A **function is a reusable block of code designed to perform a specific task.**

For example, suppose you want to check whether a student passed:

```js
let marks = 75;

if (marks >= 50) {
    console.log("Pass");
} else {
    console.log("Fail");
}
```

If you have 100 students, you don't want to write this logic 100 times.

Instead:

```js
function checkResult(marks) {
    if (marks >= 50) {
        console.log("Pass");
    } else {
        console.log("Fail");
    }
}
```

Now you can reuse it:

```js
checkResult(75);
checkResult(42);
checkResult(90);
```

Output:

```text
Pass
Fail
Pass
```

### Mental Model

Think of a function as a **machine**:

```text
Input
  ↓
[ FUNCTION ]
  ↓
Output
```

For example:

```text
75
 ↓
checkResult()
 ↓
"Pass"
```

---

# 2. Why Do We Use Functions?

Functions solve several important programming problems.

### 1. Reusability

Write code once and use it multiple times.

### 2. Organization

Break a large program into smaller pieces.

### 3. Maintainability

If the logic changes, you can change it in one place.

### 4. Abstraction

You don't need to know how a function works internally to use it.

For example:

```js
calculateSalary();
```

You don't need to know all the internal calculations:

```text
Basic salary
+ Allowances
- Tax
- Deductions
= Final salary
```

The function hides that complexity.

---

# 3. Creating a Function

The basic syntax is:

```js
function greet() {
    console.log("Hello!");
}
```

There are three important parts:

```text
function
   ↓
function name
   ↓
greet()
```

The code inside `{ }` is called the **function body**.

---

# 4. Defining vs Calling a Function

This is extremely important.

When you write:

```js
function greet() {
    console.log("Hello!");
}
```

you have **defined** the function.

You have created the function, but you haven't executed it.

To execute it:

```js
greet();
```

So:

```text
Function definition
        ↓
Creates the function

Function call
        ↓
Executes the function
```

### Example

```js
function greet() {
    console.log("Hello!");
}

greet();
greet();
greet();
```

Output:

```text
Hello!
Hello!
Hello!
```

---

# 5. Functions with Parameters

Usually we want to give information to a function.

```js
function greet(name) {
    console.log("Hello " + name);
}
```

Now:

```js
greet("Ali");
greet("Sara");
greet("Ahmed");
```

Output:

```text
Hello Ali
Hello Sara
Hello Ahmed
```

Here:

```js
name
```

is a **parameter**.

And:

```js
"Ali"
```

is an **argument**.

### Parameter vs Argument

```js
function greet(name) {
              ↑
          parameter
}
```

```js
greet("Ali");
      ↑
    argument
```

Remember:

> **Parameter = variable that receives the input.**
> **Argument = actual value passed to the function.**

---

# 6. Multiple Parameters

A function can accept multiple inputs.

```js
function add(a, b) {
    console.log(a + b);
}
```

Call it:

```js
add(10, 20);
add(5, 7);
add(100, 200);
```

Output:

```text
30
12
300
```

Conceptually:

```text
add(10, 20)

a = 10
b = 20

10 + 20
   ↓
  30
```

---

# 7. Functions + Conditions

Functions can contain everything you've already learned.

For example:

```js
function checkAge(age) {

    if (age >= 18) {
        console.log("Allowed");
    } else {
        console.log("Not allowed");
    }

}
```

Now:

```js
checkAge(20);
checkAge(15);
```

Output:

```text
Allowed
Not allowed
```

So a function can contain:

* variables
* operators
* conditions
* loops
* arrays
* objects
* other functions

---

# 8. The `return` Keyword

This is one of the **most important concepts in functions**.

Consider:

```js
function add(a, b) {
    console.log(a + b);
}
```

This displays the answer.

But what if we want to **use the answer somewhere else**?

For example:

```js
let result = add(10, 20);
```

We need the function to give the result back.

That's what `return` does.

```js
function add(a, b) {
    return a + b;
}
```

Now:

```js
let result = add(10, 20);

console.log(result);
```

Output:

```text
30
```

---

# 9. `console.log()` vs `return`

This distinction is critical.

### `console.log()`

Displays something.

```js
function add(a, b) {
    console.log(a + b);
}
```

### `return`

Sends a value back to whoever called the function.

```js
function add(a, b) {
    return a + b;
}
```

Think of it this way:

```text
console.log()
     ↓
Display the value

return
     ↓
Give the value back to the program
```

---

# 10. Why `return` Is Powerful

Consider:

```js
function multiply(a, b) {
    return a * b;
}
```

Now:

```js
let result = multiply(5, 4);

console.log(result);
```

But you can also do:

```js
let x = multiply(5, 4);
let y = multiply(10, 2);

console.log(x + y);
```

Output:

```text
40
```

Because:

```text
multiply(5,4)  → 20
multiply(10,2) → 20

20 + 20 = 40
```

The function becomes a reusable **calculation unit**.

---

# 11. `return` Stops the Function

Look at this:

```js
function test() {

    console.log("A");

    return 10;

    console.log("B");
}
```

Call:

```js
test();
```

Output:

```text
A
```

`"B"` never executes.

Why?

Because:

```js
return 10;
```

ends the function immediately.

---

# 12. Functions + Arrays

You can pass an entire array to a function.

```js
let numbers = [10, 20, 30, 40];
```

Function:

```js
function printNumbers(numbers) {

    for (let number of numbers) {
        console.log(number);
    }

}
```

Call:

```js
printNumbers(numbers);
```

Output:

```text
10
20
30
40
```

The array is being passed as an argument.

---

# 13. Function to Calculate Array Sum

Let's make something more useful.

```js
function calculateSum(numbers) {

    let sum = 0;

    for (let number of numbers) {
        sum += number;
    }

    return sum;
}
```

Use it:

```js
let numbers = [10, 20, 30, 40];

let result = calculateSum(numbers);

console.log(result);
```

Output:

```text
100
```

Notice how many concepts are working together:

```text
Function
   ↓
Parameter
   ↓
Array
   ↓
Loop
   ↓
Accumulator
   ↓
Return
```

This is much closer to real programming.

---

# 14. Function + Array + Condition

Suppose we have:

```js
let marks = [35, 80, 45, 90, 25, 70];
```

We want only passing marks.

```js
function getPassingMarks(marks) {

    let passing = [];

    for (let mark of marks) {

        if (mark >= 50) {
            passing.push(mark);
        }

    }

    return passing;
}
```

Use:

```js
let result = getPassingMarks(marks);

console.log(result);
```

Output:

```text
[80, 90, 70]
```

This is a very important pattern:

```text
Input
 ↓
Function
 ↓
Loop
 ↓
Condition
 ↓
Process data
 ↓
Return result
```

---

# 15. Functions + Objects

Suppose we have a student object:

```js
let student = {
    name: "Ali",
    age: 21,
    marks: 85
};
```

We can pass the object to a function:

```js
function displayStudent(student) {

    console.log("Name:", student.name);
    console.log("Age:", student.age);
    console.log("Marks:", student.marks);

}
```

Call:

```js
displayStudent(student);
```

Output:

```text
Name: Ali
Age: 21
Marks: 85
```

---

# 16. Function + Object + Condition

```js
function checkStudent(student) {

    if (student.marks >= 50) {
        return "Pass";
    } else {
        return "Fail";
    }

}
```

Use:

```js
let student = {
    name: "Ali",
    marks: 75
};

let result = checkStudent(student);

console.log(result);
```

Output:

```text
Pass
```

---

# 17. Array of Objects + Function + Loop

This structure is **extremely important in real-world JavaScript**.

```js
let students = [
    {
        id: 1,
        name: "Ali",
        marks: 80
    },
    {
        id: 2,
        name: "Sara",
        marks: 45
    },
    {
        id: 3,
        name: "Ahmed",
        marks: 90
    }
];
```

Now:

```js
function showPassingStudents(students) {

    for (let student of students) {

        if (student.marks >= 50) {
            console.log(student.name);
        }

    }
}
```

Call:

```js
showPassingStudents(students);
```

Output:

```text
Ali
Ahmed
```

This structure appears everywhere:

```text
Array
  ↓
Objects
  ↓
Loop
  ↓
Function
```

You'll see this constantly in:

* React
* Node.js
* Express
* REST APIs
* JSON
* database applications

---

# 18. Default Parameters

Sometimes you want a default value if the user doesn't provide one.

```js
function greet(name = "Guest") {
    console.log("Hello " + name);
}
```

If we provide an argument:

```js
greet("Ali");
```

Output:

```text
Hello Ali
```

If we don't:

```js
greet();
```

Output:

```text
Hello Guest
```

---

# 19. Function Expression

A function can also be stored inside a variable.

```js
const greet = function() {
    console.log("Hello");
};
```

Then:

```js
greet();
```

Output:

```text
Hello
```

Compare:

### Function Declaration

```js
function greet() {
    console.log("Hello");
}
```

### Function Expression

```js
const greet = function() {
    console.log("Hello");
};
```

Both create functions, but the syntax and some behavior differ.

---

# 20. Arrow Functions

Modern JavaScript heavily uses **arrow functions**.

Normal function:

```js
function add(a, b) {
    return a + b;
}
```

Arrow function:

```js
const add = (a, b) => {
    return a + b;
};
```

And because it's a simple one-line return:

```js
const add = (a, b) => a + b;
```

All three perform the same basic calculation.

---

# 21. Arrow Functions with One Parameter

Normal:

```js
const square = (number) => {
    return number * number;
};
```

Can be shortened:

```js
const square = number => number * number;
```

Then:

```js
console.log(square(5));
```

Output:

```text
25
```

---

# 22. Functions Calling Other Functions

Functions can call other functions.

```js
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function calculate(a, b) {

    let sum = add(a, b);
    let product = multiply(a, b);

    return sum + product;
}
```

Now:

```js
console.log(calculate(2, 3));
```

Let's trace it:

```text
add(2, 3)
   ↓
5

multiply(2, 3)
   ↓
6

5 + 6
   ↓
11
```

Output:

```text
11
```

This is how large applications are structured: **small functions work together to solve larger problems.**

---

# 23. Function Scope

Variables created inside a function are generally local to that function.

```js
function test() {

    let message = "Hello";

    console.log(message);
}

test();
```

This works.

But:

```js
console.log(message);
```

doesn't work because `message` belongs to the function's local scope.

Think:

```text
Global Scope
│
└── test()
      │
      └── message
```

`message` lives inside `test()`.

---

# 24. Functions Can Access Outer Variables

For example:

```js
let name = "Ali";

function greet() {
    console.log(name);
}

greet();
```

Output:

```text
Ali
```

The function can access variables from its surrounding scope.

This idea becomes very important later when learning **closures**.

---

# 25. Real-World Example: Shopping Cart

Let's combine everything.

```js
let cart = [
    {
        name: "Laptop",
        price: 100000
    },
    {
        name: "Mouse",
        price: 3000
    },
    {
        name: "Keyboard",
        price: 5000
    }
];
```

Function:

```js
function calculateTotal(cart) {

    let total = 0;

    for (let item of cart) {
        total += item.price;
    }

    return total;
}
```

Use:

```js
let total = calculateTotal(cart);

console.log(total);
```

Output:

```text
108000
```

This is a realistic programming pattern.

---

# 26. Functions Should Ideally Have One Responsibility

Consider this:

```js
function processStudent(student) {

    console.log(student.name);

    if (student.marks >= 50) {
        console.log("Pass");
    }

    console.log("Saving to database...");
    console.log("Sending email...");
    console.log("Generating report...");

}
```

This function is doing too many things.

A better design:

```js
function displayStudent(student) {
    console.log(student.name);
}

function checkResult(student) {
    return student.marks >= 50;
}

function saveStudent(student) {
    // database logic
}

function sendEmail(student) {
    // email logic
}
```

Each function has one clear responsibility.

This idea is related to the **Single Responsibility Principle** in software engineering.

---

# 27. Functions Are Values in JavaScript

One of JavaScript's powerful features is that **functions can be treated like values**.

For example:

```js
function greet() {
    console.log("Hello");
}
```

We can store the function in another variable:

```js
let myFunction = greet;
```

Then:

```js
myFunction();
```

Output:

```text
Hello
```

Notice:

```js
myFunction = greet;
```

We are passing the function itself.

Whereas:

```js
greet();
```

means:

> Execute the function.

This distinction is extremely important.

---

# 28. Functions as Arguments

Because functions are values, we can pass them into other functions.

```js
function greet() {
    console.log("Hello");
}

function executeFunction(fn) {
    fn();
}

executeFunction(greet);
```

Output:

```text
Hello
```

Here:

```js
greet
```

was passed into:

```js
executeFunction()
```

This is the foundation of **callbacks**.

---

# 29. Callback Functions

A callback is basically:

> **A function passed to another function so that it can be called later or at an appropriate point.**

Example:

```js
function processUser(name, callback) {

    console.log("Processing " + name);

    callback();
}
```

Another function:

```js
function done() {
    console.log("Done!");
}
```

Now:

```js
processUser("Ali", done);
```

Output:

```text
Processing Ali
Done!
```

This concept becomes extremely important when we reach:

* `map()`
* `filter()`
* `forEach()`
* events
* asynchronous JavaScript
* promises
* APIs

---

# 30. Functions + `map()`

Remember arrays?

```js
let numbers = [1, 2, 3, 4];
```

Suppose we want their squares.

```js
function square(number) {
    return number * number;
}

let result = numbers.map(square);

console.log(result);
```

Output:

```text
[1, 4, 9, 16]
```

We passed a function to `map()`.

We can also write:

```js
let result = numbers.map(number => number * number);
```

The arrow function is acting as a callback.

---

# 31. Functions + `filter()`

Suppose:

```js
let numbers = [10, 15, 20, 25, 30];
```

We want even numbers.

```js
function isEven(number) {
    return number % 2 === 0;
}
```

Then:

```js
let result = numbers.filter(isEven);

console.log(result);
```

Output:

```text
[10, 20, 30]
```

Conceptually:

```text
filter()
   ↓
Take one element
   ↓
Send it to isEven()
   ↓
true  → keep it
false → remove it
```

---

# 32. A Complete Example

Let's build a small student-result system.

```js
let students = [
    {
        name: "Ali",
        marks: 85
    },
    {
        name: "Sara",
        marks: 45
    },
    {
        name: "Ahmed",
        marks: 72
    }
];

function calculateGrade(marks) {

    if (marks >= 80) {
        return "A";
    } else if (marks >= 70) {
        return "B";
    } else if (marks >= 60) {
        return "C";
    } else if (marks >= 50) {
        return "D";
    } else {
        return "F";
    }
}

function displayResults(students) {

    for (let student of students) {

        let grade = calculateGrade(student.marks);

        console.log(
            student.name,
            "→",
            grade
        );
    }
}

displayResults(students);
```

Output:

```text
Ali → A
Sara → F
Ahmed → B
```

Look at the architecture:

```text
students
    ↓
displayResults()
    ↓
loop
    ↓
student object
    ↓
calculateGrade()
    ↓
condition
    ↓
return grade
    ↓
display result
```

This is the kind of thinking you want to develop.

---

# 33. How to Think When Creating a Function

Whenever you get a programming problem, ask four questions:

### 1. What is the task?

Example:

> Determine whether a student passed.

### 2. What is the input?

```text
marks
```

### 3. What should the output be?

```text
"Pass" or "Fail"
```

### 4. What logic is needed?

```js
function checkResult(marks) {

    if (marks >= 50) {
        return "Pass";
    }

    return "Fail";
}
```

This is called **problem decomposition**.

Instead of thinking:

> "How do I build the whole application?"

you start thinking:

> "What small functions do I need?"

---

# 34. Function Types You Should Know

| Type                   | Example                          |
| ---------------------- | -------------------------------- |
| Function Declaration   | `function add() {}`              |
| Function Expression    | `const add = function() {}`      |
| Arrow Function         | `const add = () => {}`           |
| Parameterized Function | `function add(a, b) {}`          |
| Returning Function     | `function add() { return 10 }`   |
| Callback Function      | `array.map(fn)`                  |
| Nested Function        | Function inside another function |

---

# 35. The Complete Mental Model

Keep this structure in your mind:

```text
                    FUNCTION
                       │
            ┌──────────┴──────────┐
            ↓                     ↓
         INPUT                  OUTPUT
      parameters               return
            │                     │
            └──────────┬──────────┘
                       ↓
                  FUNCTION BODY
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
      Variables    Conditions     Loops
                                     │
                                     ↓
                                  Arrays
                                     │
                                     ↓
                                  Objects
```

And then JavaScript becomes more powerful:

```text
Function
   ↓
Function as a value
   ↓
Function as an argument
   ↓
Callback
   ↓
Higher-order functions
   ↓
Asynchronous JavaScript
```

---

# 36. Most Important Things to Remember

### Function

```js
function greet() {}
```

Creates a reusable block of code.

### Call

```js
greet();
```

Executes it.

### Parameter

```js
function greet(name)
```

Receives input.

### Argument

```js
greet("Ali");
```

Actual value being passed.

### Return

```js
return result;
```

Sends a value back.

### Console

```js
console.log(result);
```

Displays something.

### Arrow function

```js
const add = (a, b) => a + b;
```

Modern concise function syntax.

### Callback

```js
numbers.map(square);
```

A function passed to another function.

---

# Practice

Try these without looking at the solutions:

### Level 1

1. Create a `greet()` function that prints `"Hello World"`.
2. Create `greetUser(name)`.
3. Create `add(a, b)` that returns the sum.
4. Create `square(number)`.
5. Create `isEven(number)` that returns `true` or `false`.

### Level 2

6. Create `findMax(a, b)`.
7. Create `calculateAverage(numbers)`.
8. Create `getPassingStudents(students)`.
9. Create `calculateTotal(cart)`.
10. Create `findStudent(students, name)`.

### Level 3

11. Create a function that returns all even numbers from an array.
12. Create a function that finds the largest number in an array.
13. Create a function that returns the student with the highest marks.
14. Create a function that returns products with `price < 5000`.
15. Create a function that accepts another function as an argument.

### Next step

The natural next topic is **Callbacks and Higher-Order Functions**, because it connects everything you've learned so far—**functions + arrays + `map()` + `filter()` + callbacks**—and then leads directly into **Asynchronous JavaScript**.
