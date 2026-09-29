
# JavaScript Assignment — Functions


**Topics covered:**

* Function declaration
* Calling functions
* Parameters
* Arguments
* Return values
* `return` vs `console.log()`
* Multiple parameters
* Default parameters
* Function expressions
* Arrow functions
* Scope
* Functions with conditions
* Functions with arrays and objects
* Callback functions

---

# Part A — Code-Based Questions

## Questions 1–25

### 1. Basic Function

What will be the output?

```javascript
function greet() {
    console.log("Hello!");
}

greet();
```

---

### 2. Function Without Calling

What will happen?

```javascript
function greet() {
    console.log("Hello!");
}
```

Will `"Hello!"` be printed? Explain why.

---

### 3. Calling a Function Multiple Times

What will be the output?

```javascript
function greet() {
    console.log("Welcome");
}

greet();
greet();
greet();
```

---

### 4. Function with a Parameter

What will be printed?

```javascript
function greet(name) {
    console.log("Hello " + name);
}

greet("Ali");
```

What is `name` in this example?

---

### 5. Different Arguments

Predict the output:

```javascript
function greet(name) {
    console.log("Hello " + name);
}

greet("Ali");
greet("Sara");
greet("Ahmed");
```

---

### 6. Two Parameters

What will be printed?

```javascript
function add(a, b) {
    console.log(a + b);
}

add(10, 20);
```

---

### 7. Parameter vs Argument

Look at this code:

```javascript
function multiply(x, y) {
    console.log(x * y);
}

multiply(5, 4);
```

Identify:

1. The parameters
2. The arguments
3. The output

---

### 8. Return Value

What will be the output?

```javascript
function add(a, b) {
    return a + b;
}

let result = add(10, 20);

console.log(result);
```

---

### 9. `return` vs `console.log()`

What will be printed?

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(5, 3));
```

---

### 10. Function Returning a Value

Predict the output:

```javascript
function square(number) {
    return number * number;
}

let answer = square(6);

console.log(answer);
```

---

### 11. Function Without Return

What will be printed?

```javascript
function add(a, b) {
    console.log(a + b);
}

let result = add(5, 10);

console.log(result);
```

Explain why the second output is different from the first.

---

### 12. Multiple Operations

What is the output?

```javascript
function calculate(a, b) {
    let sum = a + b;
    let product = a * b;

    return sum + product;
}

console.log(calculate(2, 3));
```

---

### 13. Function with Condition

What will be printed?

```javascript
function checkAge(age) {
    if (age >= 18) {
        return "Adult";
    } else {
        return "Minor";
    }
}

console.log(checkAge(20));
console.log(checkAge(15));
```

---

### 14. Function with `&&`

What will be printed?

```javascript
function canDrive(age, hasLicense) {
    return age >= 18 && hasLicense;
}

console.log(canDrive(20, true));
console.log(canDrive(16, true));
console.log(canDrive(20, false));
```

---

### 15. Function with `||`

Predict the output:

```javascript
function canEnter(hasTicket, isVIP) {
    return hasTicket || isVIP;
}

console.log(canEnter(true, false));
console.log(canEnter(false, true));
console.log(canEnter(false, false));
```

---

### 16. Default Parameter

What will be printed?

```javascript
function greet(name = "Guest") {
    console.log("Hello " + name);
}

greet("Ali");
greet();
```

---

### 17. Multiple Parameters

Find the output:

```javascript
function introduce(name, age, department) {
    console.log(name);
    console.log(age);
    console.log(department);
}

introduce("Ali", 21, "Physics");
```

---

### 18. Function Expression

What will be printed?

```javascript
const greet = function() {
    console.log("Hello");
};

greet();
```

What is different about this function compared with a normal function declaration?

---

### 19. Arrow Function

Predict the output:

```javascript
const add = (a, b) => {
    return a + b;
};

console.log(add(4, 6));
```

---

### 20. Short Arrow Function

What will be printed?

```javascript
const square = number => number * number;

console.log(square(5));
```

---

### 21. Function + Array

What will be printed?

```javascript
function getFirstElement(numbers) {
    return numbers[0];
}

let values = [10, 20, 30, 40];

console.log(getFirstElement(values));
```

---

### 22. Function + Object

Predict the output:

```javascript
function getStudentName(student) {
    return student.name;
}

let student = {
    name: "Ahmed",
    age: 21,
    marks: 85
};

console.log(getStudentName(student));
```

---

### 23. Function + Array of Objects

What will be printed?

```javascript
function getMarks(student) {
    return student.marks;
}

let students = [
    { name: "Ali", marks: 70 },
    { name: "Sara", marks: 85 },
    { name: "Ahmed", marks: 60 }
];

console.log(getMarks(students[1]));
```

---

### 24. Scope

What will happen?

```javascript
function test() {
    let message = "Hello";
    console.log(message);
}

test();

console.log(message);
```

Will both `console.log()` statements work? Explain.

---

### 25. Function Calling Another Function

What will be the output?

```javascript
function square(number) {
    return number * number;
}

function calculate(number) {
    return square(number) + 10;
}

console.log(calculate(5));
```

Trace the execution step by step.

---

# Part B — Theory & Conceptual Questions

## Questions 26–40

### 26. What is a Function?

What is a function in JavaScript?

Why do programmers use functions instead of writing the same code repeatedly?

---

### 27. Function Declaration

Explain the structure of a function declaration:

```javascript
function functionName(parameters) {
    // code
}
```

Explain what each part means.

---

### 28. Calling a Function

What does it mean to **call/invoke** a function?

Explain the difference between:

```javascript
greet;
```

and

```javascript
greet();
```

---

### 29. Parameters

What is a parameter?

Explain using:

```javascript
function greet(name) {
    console.log(name);
}
```

---

### 30. Arguments

What is an argument?

In the following code, identify the arguments:

```javascript
function add(a, b) {
    return a + b;
}

add(10, 20);
```

---

### 31. Parameter vs Argument

Explain the difference between a **parameter** and an **argument**.

Give your own example.

---

### 32. Return

What is the purpose of the `return` statement?

Why would we use:

```javascript
return result;
```

instead of simply:

```javascript
console.log(result);
```

---

### 33. `return` vs `console.log()`

Explain the conceptual difference between:

```javascript
console.log()
```

and

```javascript
return
```

When would you use each one?

---

### 34. Why Functions Are Useful

List at least **four advantages** of using functions in a program.

Think about:

* Reusability
* Organization
* Debugging
* Readability
* Maintenance

---

### 35. Function Parameters

Can a function have:

* Zero parameters?
* One parameter?
* Multiple parameters?

Give an example of each.

---

### 36. Default Parameters

What is a default parameter?

Explain:

```javascript
function greet(name = "Guest") {
    console.log(name);
}
```

What happens when:

```javascript
greet();
```

is called?

---

### 37. Function Expression

What is a function expression?

Explain:

```javascript
const greet = function() {
    console.log("Hello");
};
```

How is it different from a function declaration?

---

### 38. Arrow Functions

What is an arrow function?

Convert the following function into an arrow function:

```javascript
function add(a, b) {
    return a + b;
}
```

---

### 39. Scope

What does **scope** mean in JavaScript?

Explain why this code produces a problem:

```javascript
function test() {
    let x = 10;
}

console.log(x);
```

---

### 40. Callback Functions

What is a **callback function**?

Explain the basic idea using:

```javascript
function process(callback) {
    callback();
}
```

Why might we want to pass a function into another function?

---

# Part C — Application & Problem-Solving

## Questions 41–45

### 41. Student Grade Function

Create a function:

```javascript
getGrade(marks)
```

It should return:

```text
A → 80 or above
B → 60–79
C → 50–59
Fail → below 50
```

Example:

```javascript
console.log(getGrade(85));
```

Expected:

```text
A
```

---

### 42. Calculator Functions

Create **four functions**:

```text
add()
subtract()
multiply()
divide()
```

Each function should accept two numbers and return the appropriate result.

For example:

```javascript
console.log(add(10, 5));
console.log(multiply(4, 3));
```

---

### 43. Student Eligibility

Create a function:

```javascript
isEligible(age, marks, hasEntryTest)
```

A student is eligible when:

* age ≥ 18
* marks ≥ 60
* entry test is passed

Use:

```text
&&
```

The function should return either:

```text
"Eligible"
```

or

```text
"Not Eligible"
```

---

### 44. Array Function

Create a function:

```javascript
getHighest(numbers)
```

that receives an array of numbers and returns the highest number.

Example:

```javascript
let numbers = [10, 45, 23, 78, 12];

console.log(getHighest(numbers));
```

Expected:

```text
78
```

**Hint:** You may use a loop, but don't use `Math.max()`.

---

### 45. Callback Challenge

Create a function:

```javascript
calculate(a, b, operation)
```

where `operation` is a function.

For example:

```javascript
calculate(10, 5, add);
calculate(10, 5, multiply);
```

Create separate functions for:

```text
add
subtract
multiply
```

The `calculate()` function should use the callback to perform the requested operation.

### Goal

By completing this question, you should understand the basic idea behind:

**function → function as argument → callback → result**.
