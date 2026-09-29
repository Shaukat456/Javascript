
# JavaScript Assignment — Fundamentals

**Topics covered:**
`var`, `let`, `const`, operators, conditions, `&&`, `||`, `!`, arrays, objects, nested arrays/objects, and basic decision-making.



## Part A — Code-Based Questions

### Questions 1–25

### 1. `var`, `let`, `const`

What will be the output?

```javascript
var age = 20;
let name = "Ali";
const country = "Pakistan";

console.log(age);
console.log(name);
console.log(country);
```

---

### 2. Changing Variables

What will be the output?

```javascript
let age = 20;
age = 21;

console.log(age);
```

What happens if `age` was declared using `const` instead?

---

### 3. `const`

Identify the problem in this code:

```javascript
const pi = 3.14;
pi = 3.14159;

console.log(pi);
```

Will the program successfully execute?

---

### 4. `var`

What will be printed?

```javascript
var x = 10;
var x = 20;

console.log(x);
```

---

### 5. Operators

Calculate the output:

```javascript
let a = 10;
let b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
```

---

### 6. Comparison Operators

What will each line print?

```javascript
let age = 20;

console.log(age > 18);
console.log(age < 18);
console.log(age == 20);
console.log(age != 20);
console.log(age >= 20);
console.log(age <= 19);
```

---

### 7. `==` vs `===`

Predict the output:

```javascript
console.log(5 == "5");
console.log(5 === "5");
```

Explain why the results are different.

---

### 8. Logical AND `&&`

What will be printed?

```javascript
let age = 22;
let hasID = true;

console.log(age >= 18 && hasID);
```

What happens if `hasID` becomes `false`?

---

### 9. Logical OR `||`

Predict the output:

```javascript
let hasMoney = false;
let hasCard = true;

console.log(hasMoney || hasCard);
```

---

### 10. Logical NOT `!`

What will be printed?

```javascript
let isLoggedIn = false;

console.log(!isLoggedIn);
```

---

### 11. Multiple Conditions

What will be printed?

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log("You can drive");
} else {
    console.log("You cannot drive");
}
```

---

### 12. `if / else`

Find the output:

```javascript
let marks = 72;

if (marks >= 80) {
    console.log("A");
} else if (marks >= 60) {
    console.log("B");
} else {
    console.log("C");
}
```

---

### 13. Nested Conditions

What will be printed?

```javascript
let age = 20;
let hasID = true;

if (age >= 18) {
    if (hasID) {
        console.log("Entry allowed");
    } else {
        console.log("ID required");
    }
} else {
    console.log("Underage");
}
```

---

### 14. Array Access

What is the output?

```javascript
let fruits = ["Apple", "Banana", "Mango", "Orange"];

console.log(fruits[0]);
console.log(fruits[2]);
console.log(fruits[3]);
```

---

### 15. Array Modification

What will the final array be?

```javascript
let numbers = [10, 20, 30];

numbers[1] = 50;

console.log(numbers);
```

---

### 16. Array + Condition

What will be printed?

```javascript
let marks = [45, 78, 90, 32];

if (marks[1] >= 50) {
    console.log("Pass");
} else {
    console.log("Fail");
}
```

---

### 17. Array Length

What is the output?

```javascript
let subjects = ["Physics", "Math", "Programming", "English"];

console.log(subjects.length);
```

---

### 18. Objects

Predict the output:

```javascript
let student = {
    name: "Ahmed",
    age: 21,
    department: "Physics"
};

console.log(student.name);
console.log(student.age);
console.log(student.department);
```

---

### 19. Modifying an Object

What will be the output?

```javascript
let student = {
    name: "Ali",
    age: 20
};

student.age = 21;

console.log(student.age);
```

---

### 20. Object + Condition

What will be printed?

```javascript
let student = {
    name: "Sara",
    marks: 85
};

if (student.marks >= 50) {
    console.log(student.name + " passed");
} else {
    console.log(student.name + " failed");
}
```

---

### 21. Array of Objects

What will be printed?

```javascript
let students = [
    { name: "Ali", age: 20 },
    { name: "Sara", age: 22 },
    { name: "Ahmed", age: 19 }
];

console.log(students[1].name);
console.log(students[2].age);
```

---

### 22. Nested Array

Predict the output:

```javascript
let numbers = [
    [10, 20],
    [30, 40],
    [50, 60]
];

console.log(numbers[0][1]);
console.log(numbers[2][0]);
```

---

### 23. `&&` and `||` Together

What will be printed?

```javascript
let age = 20;
let student = true;
let employee = false;

if (age >= 18 && (student || employee)) {
    console.log("Allowed");
} else {
    console.log("Not Allowed");
}
```

---

### 24. Truthy/Falsy Condition

What will be printed?

```javascript
let username = "";

if (username) {
    console.log("Username exists");
} else {
    console.log("Username is empty");
}
```

---

### 25. Debug the Code

The following code is supposed to print `"Adult"` when the person's age is 18 or above.

Find and fix the error.

```javascript
let age = 20;

if (age > 18) {
    console.log("Adult");
} else {
    console.log("Not Adult");
}
```

Test your corrected code mentally for:

* `age = 20`
* `age = 18`
* `age = 15`

---

# Part B — Theory & Conceptual Questions

### Questions 26–40

### 26. `var`, `let`, and `const`

Explain the difference between:

```javascript
var
let
const
```

Give **one situation where each could be used**.

---

### 27. Reassignment

What does **reassignment** mean in JavaScript?

Which of the following can be reassigned?

* `var`
* `let`
* `const`

Explain your answer.

---

### 28. Declaration vs Assignment

Explain the difference between:

**Declaration**

and

**Assignment**

Give a JavaScript example of each.

---

### 29. Operators

What is an operator?

Explain the purpose of these operators:

```text
+
-
*
/
%
>
<
>=
<=
==
===
!=
!==
```

---

### 30. Comparison Operators

What is the difference between:

```javascript
=
==
===
```

Give an example of where each one is used.

---

### 31. `&&`

Explain the logical AND operator:

```javascript
&&
```

When does an `&&` condition become `true`?

Give a real-life example.

---

### 32. `||`

Explain the logical OR operator:

```javascript
||
```

When does an `||` condition become `true`?

Give a real-life example.

---

### 33. `!`

What does the logical NOT operator do?

Explain what happens when:

```javascript
!true
!false
```

---

### 34. Combining Logical Operators

Explain the difference between:

```javascript
age >= 18 && hasID
```

and

```javascript
age >= 18 || hasID
```

Give a situation where each condition would make sense.

---

### 35. Conditions

What is the purpose of an `if` statement?

Explain how the following structure works:

```javascript
if (condition) {
    // code
} else {
    // code
}
```

---

### 36. `else if`

Why would we use:

```javascript
else if
```

instead of multiple separate `if` statements?

Give an example involving student grades.

---

### 37. Arrays

What is an array?

Why would we use an array instead of creating separate variables like:

```javascript
let student1 = "Ali";
let student2 = "Ahmed";
let student3 = "Sara";
```

---

### 38. Array Indexing

Why does JavaScript use **zero-based indexing** for arrays?

For:

```javascript
let fruits = ["Apple", "Banana", "Mango"];
```

What is the index of each fruit?

---

### 39. Objects

What is an object in JavaScript?

Explain what **properties** are.

For example:

```javascript
let student = {
    name: "Ali",
    age: 20
};
```

Identify:

* Object
* Properties
* Property values

---

### 40. Array vs Object

Explain the difference between an **array** and an **object**.

When would you use:

```javascript
["Ali", "Ahmed", "Sara"]
```

and when would you use:

```javascript
{
    name: "Ali",
    age: 20,
    department: "Physics"
}
```

---

# Part C — Application & Problem-Solving

### Questions 41–45

These questions combine multiple concepts.

---

### 41. Student Result System

Create a JavaScript program using:

* `let` or `const`
* an object
* `if / else if / else`
* comparison operators

The object should contain:

```text
name
marks
```

Print:

* `"A"` if marks ≥ 80
* `"B"` if marks ≥ 60
* `"C"` if marks ≥ 50
* `"Fail"` otherwise

---

### 42. Login System

Create a program with:

```javascript
let username = "admin";
let password = "12345";
```

Use `&&` to check whether **both** username and password are correct.

Print:

```text
Login Successful
```

or

```text
Invalid Credentials
```

---

### 43. University Admission

Create an object:

```javascript
student
```

containing:

```text
age
marks
hasEntryTest
```

A student can be admitted only when:

* age ≥ 18
* marks ≥ 60
* entry test is passed

Use `&&` to implement the condition.

---

### 44. Product Eligibility

Create an object:

```javascript
customer
```

containing:

```text
age
hasMembership
hasCoupon
```

A customer gets a special offer if:

* they are 18 or older **AND**
* they either have membership **OR** have a coupon.

Use both:

```javascript
&&
||
```

in your condition.

---

### 45. Student Data

Create an array containing **at least 3 student objects**.

Each student should have:

```text
name
age
marks
```

Example structure:

```javascript
let students = [
    {
        name: "...",
        age: ...,
        marks: ...
    },
    {
        name: "...",
        age: ...,
        marks: ...
    }
];
```

Then write code to:

1. Print the name of the first student.
2. Print the marks of the second student.
3. Check whether the third student passed.
4. Print `"Passed"` if marks ≥ 50.
5. Otherwise print `"Failed"`.

---

## Submission Checklist

Before submitting, make sure you can explain:

* [ ] Difference between `var`, `let`, and `const`
* [ ] Declaration vs assignment
* [ ] Arithmetic operators
* [ ] Comparison operators
* [ ] `==` vs `===`
* [ ] `if / else`
* [ ] `else if`
* [ ] `&&`
* [ ] `||`
* [ ] `!`
* [ ] Truthy/falsy conditions
* [ ] Array indexing
* [ ] Array length
* [ ] Changing array values
* [ ] Objects and properties
* [ ] Accessing object properties
* [ ] Modifying object properties
* [ ] Arrays of objects
* [ ] Nested arrays
* [ ] Combining arrays, objects, and conditions
