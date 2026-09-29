
# JavaScript Assignment — Loops + Core Concepts

**Total Questions:** 45
**Code-Based:** 25
**Theory:** 15
**Application / Problem-Solving:** 5

### Concepts Covered

* `for` loop
* `while` loop
* `do...while`
* Loop counters
* `break`
* `continue`
* Nested loops
* Arrays + loops
* Objects + loops
* Array of objects
* Functions + loops
* Conditions + loops
* `&&`, `||`, `!`
* `var`, `let`, `const`
* Operators
* Practical problem solving

**Instruction:** For code questions, predict the output **before running the code**.

---

# Part A — Code-Based Questions

## Questions 1–25

### 1. Basic `for` Loop

What will be the output?

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

---

### 2. Understanding the Counter

What will be printed?

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

Why does this print `0` to `4` instead of `1` to `5`?

---

### 3. Increment by 2

Predict the output:

```javascript
for (let i = 2; i <= 10; i += 2) {
    console.log(i);
}
```

---

### 4. Countdown

Write the output:

```javascript
for (let i = 5; i >= 1; i--) {
    console.log(i);
}
```

What is the purpose of `i--`?

---

### 5. Loop + Condition

What will be printed?

```javascript
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}
```

---

### 6. Loop + `&&`

Predict the output:

```javascript
for (let age = 15; age <= 22; age++) {
    if (age >= 18 && age <= 20) {
        console.log(age);
    }
}
```

---

### 7. Loop + `||`

What will be printed?

```javascript
for (let i = 1; i <= 10; i++) {
    if (i === 3 || i === 7) {
        console.log(i);
    }
}
```

---

### 8. `continue`

Predict the output:

```javascript
for (let i = 1; i <= 5; i++) {

    if (i === 3) {
        continue;
    }

    console.log(i);
}
```

Why isn't `3` printed?

---

### 9. `break`

What will be printed?

```javascript
for (let i = 1; i <= 10; i++) {

    if (i === 6) {
        break;
    }

    console.log(i);
}
```

What is the difference between `break` and `continue`?

---

### 10. `while` Loop

Predict the output:

```javascript
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
```

What would happen if `i++` were removed?

---

### 11. `while` + Condition

What will be printed?

```javascript
let number = 1;

while (number <= 10) {

    if (number % 2 !== 0) {
        console.log(number);
    }

    number++;
}
```

---

### 12. `do...while`

What will be printed?

```javascript
let i = 10;

do {
    console.log(i);
    i++;
} while (i < 5);
```

Why does the loop execute even though `i < 5` is false?

---

### 13. Array + `for` Loop

Predict the output:

```javascript
let fruits = ["Apple", "Banana", "Mango", "Orange"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```

Why is `fruits.length` useful here?

---

### 14. Array + Condition

What will be printed?

```javascript
let marks = [45, 72, 33, 90, 61];

for (let i = 0; i < marks.length; i++) {

    if (marks[i] >= 50) {
        console.log(marks[i]);
    }
}
```

---

### 15. Array + Function + Loop

What will be printed?

```javascript
function printNumber(number) {
    console.log("Number:", number);
}

let numbers = [10, 20, 30];

for (let i = 0; i < numbers.length; i++) {
    printNumber(numbers[i]);
}
```

Explain how the loop and function work together.

---

### 16. Calculate Total

Predict the output:

```javascript
let numbers = [10, 20, 30, 40];

let total = 0;

for (let i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
}

console.log(total);
```

What is the purpose of `total = 0` before the loop?

---

### 17. Find the Largest Number

What will be printed?

```javascript
let numbers = [10, 45, 23, 78, 12];

let largest = numbers[0];

for (let i = 1; i < numbers.length; i++) {

    if (numbers[i] > largest) {
        largest = numbers[i];
    }
}

console.log(largest);
```

Trace the value of `largest` as the loop runs.

---

### 18. Array + Objects

Predict the output:

```javascript
let students = [
    { name: "Ali", marks: 70 },
    { name: "Sara", marks: 85 },
    { name: "Ahmed", marks: 45 }
];

for (let i = 0; i < students.length; i++) {
    console.log(students[i].name);
}
```

---

### 19. Array of Objects + Condition

What will be printed?

```javascript
let students = [
    { name: "Ali", marks: 70 },
    { name: "Sara", marks: 85 },
    { name: "Ahmed", marks: 45 }
];

for (let i = 0; i < students.length; i++) {

    if (students[i].marks >= 50) {
        console.log(students[i].name);
    }
}
```

---

### 20. Function + Array of Objects + Loop

What will this program print?

```javascript
function checkResult(student) {

    if (student.marks >= 50) {
        return "Pass";
    } else {
        return "Fail";
    }
}

let students = [
    { name: "Ali", marks: 70 },
    { name: "Sara", marks: 45 },
    { name: "Ahmed", marks: 80 }
];

for (let i = 0; i < students.length; i++) {
    console.log(
        students[i].name,
        checkResult(students[i])
    );
}
```

---

### 21. Nested Loop

Predict the output:

```javascript
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 2; j++) {
        console.log(i, j);
    }
}
```

How many times does the inner loop execute in total?

---

### 22. Nested Loop + Condition

What will be printed?

```javascript
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 3; j++) {

        if (i === j) {
            console.log(i, j);
        }
    }
}
```

---

### 23. Nested Array

Predict the output:

```javascript
let numbers = [
    [10, 20],
    [30, 40],
    [50, 60]
];

for (let i = 0; i < numbers.length; i++) {

    for (let j = 0; j < numbers[i].length; j++) {
        console.log(numbers[i][j]);
    }
}
```

Explain why two loops are needed.

---

### 24. `break` + Array Search

What will be printed?

```javascript
let numbers = [10, 20, 30, 40, 50];

for (let i = 0; i < numbers.length; i++) {

    if (numbers[i] === 30) {
        console.log("Found");
        break;
    }

    console.log(numbers[i]);
}
```

Why is `break` useful in this situation?

---

### 25. Complete Trace

Predict the exact output:

```javascript
function processStudents(students) {

    for (let i = 0; i < students.length; i++) {

        if (students[i].marks < 50) {
            continue;
        }

        if (students[i].marks >= 80) {
            console.log(students[i].name, "Excellent");
        } else {
            console.log(students[i].name, "Passed");
        }
    }
}

const students = [
    { name: "Ali", marks: 85 },
    { name: "Sara", marks: 45 },
    { name: "Ahmed", marks: 70 },
    { name: "Usman", marks: 92 }
];

processStudents(students);
```

Explain:

1. Why `Sara` isn't printed.
2. Why `Ali` gets `"Excellent"`.
3. Why `Ahmed` gets `"Passed"`.
4. Why `Usman` gets `"Excellent"`.

---

# Part B — Theory & Concepts

## Questions 26–40

### 26. What is a Loop?

What is a loop?

Why do programmers use loops instead of writing:

```javascript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

---

### 27. `for` Loop

Explain each part of:

```javascript
for (let i = 0; i < 10; i++) {
    // code
}
```

Explain:

* Initialization
* Condition
* Increment
* Loop body

---

### 28. `while` Loop

What is a `while` loop?

When would you choose a `while` loop instead of a `for` loop?

---

### 29. `do...while`

What is the major difference between:

```javascript
while (condition)
```

and:

```javascript
do {
    
} while (condition);
```

---

### 30. Infinite Loops

What is an infinite loop?

Why would this code be problematic?

```javascript
let i = 1;

while (i <= 10) {
    console.log(i);
}
```

How can you fix it?

---

### 31. `break`

What does `break` do inside a loop?

Give a practical situation where using `break` makes sense.

---

### 32. `continue`

What does `continue` do?

Explain the difference between:

```text
break
```

and

```text
continue
```

---

### 33. Loop + Array

Why is this pattern so common?

```javascript
for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}
```

Explain the relationship between:

* index
* `i`
* `array.length`
* `array[i]`

---

### 34. Loop + Condition

Why are loops and conditions commonly used together?

Give a real-world example such as:

> "Go through all students and find students who passed."

Explain how the loop and condition divide the work.

---

### 35. Accumulator

What is an **accumulator variable**?

Explain this:

```javascript
let total = 0;

for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
}
```

Why does `total` start at `0`?

---

### 36. Nested Loops

What is a nested loop?

Explain this structure:

```javascript
for (...) {

    for (...) {

    }
}
```

Give one real-world example where nested loops could be useful.

---

### 37. Functions + Loops

Why might we put a loop inside a function?

For example:

```javascript
function printStudents(students) {

    for (let i = 0; i < students.length; i++) {
        console.log(students[i]);
    }

}
```

What advantage does this provide?

---

### 38. Arrays of Objects

Why is this structure useful in real applications?

```javascript
let students = [
    {
        name: "Ali",
        age: 20,
        marks: 80
    },
    {
        name: "Sara",
        age: 21,
        marks: 90
    }
];
```

How can a loop process all these students?

---

### 39. Choosing the Right Loop

Explain when you might use:

**`for`**

**`while`**

**`do...while`**

Give one example for each.

---

### 40. Connected Concepts

Explain how the following concepts can work together in a real program:

```text
variables
      ↓
arrays
      ↓
objects
      ↓
conditions
      ↓
loops
      ↓
functions
```

Give one example of a program that could use **all six**.

---

# Part C — Application & Problem-Solving

## Questions 41–45

These are designed to make you combine everything you've learned so far.

---

### 41. Student Result Processing System

Create an array of at least **5 student objects**:

```javascript
let students = [
    {
        name: "Ali",
        marks: 75
    },
    // more students
];
```

Create a function:

```javascript
getGrade(marks)
```

The function should return:

```text
A → 80+
B → 60–79
C → 50–59
Fail → below 50
```

Then use a loop to print:

```text
Ali - B
Sara - A
Ahmed - Fail
```

You must use:

* Array
* Objects
* Function
* Loop
* `if / else if / else`

---

### 42. Find Students Who Meet Multiple Conditions

Create an array of student objects containing:

```text
name
age
marks
hasEntryTest
```

Use a loop to find students who satisfy **all** of these:

```text
age >= 18
marks >= 60
hasEntryTest === true
```

Use `&&`.

Print:

```text
Ali is eligible
```

for every eligible student.

---

### 43. Shopping Cart

Create an array:

```javascript
let cart = [
    {
        name: "Laptop",
        price: 100000,
        quantity: 1
    },
    {
        name: "Mouse",
        price: 2000,
        quantity: 2
    }
];
```

Create a function:

```javascript
calculateTotal(cart)
```

Use a loop to calculate:

```text
price × quantity
```

for every product.

Return the final total.

**Example:**

```text
Laptop → 100000
Mouse → 4000

Total → 104000
```

---

### 44. Number Analyzer

Create a function:

```javascript
analyzeNumbers(numbers)
```

Given:

```javascript
let numbers = [10, 15, 22, 7, 30, 41, 50];
```

Use a loop to calculate:

1. Total numbers
2. Sum
3. Number of even numbers
4. Number of odd numbers
5. Largest number
6. Smallest number

Use appropriate conditions and variables.

**Do not use built-in functions such as `Math.max()` or `Math.min()` for finding largest/smallest.**

---

### 45. Mini Student Management System

Build a small program using **everything you've learned so far**.

Create an array of student objects:

```javascript
let students = [
    {
        name: "Ali",
        age: 20,
        marks: 85
    },
    {
        name: "Sara",
        age: 19,
        marks: 72
    }
];
```

Create functions such as:

```javascript
addStudent()
getGrade()
printStudents()
findStudent()
calculateAverage()
```

Your program should be able to:

### 1. Print all students

Use a loop.

### 2. Print grades

Use a function + condition.

### 3. Find a student

Search through the array using a loop.

### 4. Calculate average marks

Use a loop and accumulator.

### 5. Find the highest scorer

Use a loop and condition.

### 6. Check passing students

Use a condition such as:

```javascript
marks >= 50
```

### 7. Use `break`

Stop searching once the requested student is found.

---

# Concept Connection Challenge

By the end of this assignment, you should be able to see the relationship:

```text
var / let / const
        ↓
    Variables
        ↓
 Operators
        ↓
 Conditions
   ↓         ↓
 &&  ||     if/else
        ↓
      Arrays
        ↓
     Objects
        ↓
      Loops
        ↓
     Functions
        ↓
Real Programs
```

For example, a real student-management program isn't **"a loops program"** or **"a functions program."**

It naturally combines everything:

```javascript
const students = [
    { name: "Ali", marks: 85 },
    { name: "Sara", marks: 45 },
    { name: "Ahmed", marks: 72 }
];

function getGrade(marks) {

    if (marks >= 80) {
        return "A";
    } else if (marks >= 60) {
        return "B";
    } else if (marks >= 50) {
        return "C";
    } else {
        return "Fail";
    }
}

for (let i = 0; i < students.length; i++) {

    const student = students[i];

    console.log(
        student.name,
        getGrade(student.marks)
    );
}
```
---
