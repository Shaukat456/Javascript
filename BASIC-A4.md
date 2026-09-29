
# JavaScript Assignment — DOM + Miscellaneous Concepts

### Topics Covered

**DOM**

* `document`
* `getElementById()`
* `querySelector()`
* `querySelectorAll()`
* `textContent`
* `innerHTML`
* `value`
* `style`
* `classList`
* Creating elements
* `appendChild()`
* Removing elements
* Event listeners
* `click`
* `input`
* `submit`
* `preventDefault()`

**Miscellaneous**

* `typeof`
* Template literals
* Truthy / falsy
* `null` / `undefined`
* Type conversion
* `parseInt()`
* `Number()`
* `String()`
* `NaN`
* `&&`, `||`, `!`
* Functions
* Arrays
* Objects
* Loops
* Basic debugging

---

# Part A — Code-Based Questions

## Questions 1–25

### 1. Selecting an Element

HTML:

```html
<h1 id="title">Hello World</h1>
```

JavaScript:

```javascript
let heading = document.getElementById("title");

console.log(heading);
```

What does `heading` contain?

---

### 2. Changing Text

HTML:

```html
<h1 id="title">Old Title</h1>
```

JavaScript:

```javascript
const heading = document.getElementById("title");

heading.textContent = "New Title";
```

What will the user see on the webpage?

---

### 3. `textContent`

What will happen?

```javascript
const message = document.getElementById("message");

message.textContent = "Hello <b>Student</b>";
```

Will **Student** become bold?

Explain why.

---

### 4. `innerHTML`

What will the browser display?

```javascript
const message = document.getElementById("message");

message.innerHTML = "Hello <b>Student</b>";
```

How is this different from `textContent`?

---

### 5. Getting an Input Value

HTML:

```html
<input id="username" value="Ali">
```

JavaScript:

```javascript
const input = document.getElementById("username");

console.log(input.value);
```

What will be printed?

---

### 6. Changing an Input

HTML:

```html
<input id="username">
```

JavaScript:

```javascript
const input = document.getElementById("username");

input.value = "Ahmed";
```

What will appear inside the input box?

---

### 7. `querySelector`

HTML:

```html
<p class="message">Hello</p>
```

What does this code select?

```javascript
const element = document.querySelector(".message");

console.log(element);
```

---

### 8. `querySelectorAll`

HTML:

```html
<p class="item">Apple</p>
<p class="item">Banana</p>
<p class="item">Mango</p>
```

What does this return?

```javascript
const items = document.querySelectorAll(".item");

console.log(items.length);
```

What will be the output?

---

### 9. DOM + Loop

HTML:

```html
<p class="item">Apple</p>
<p class="item">Banana</p>
<p class="item">Mango</p>
```

What will this code do?

```javascript
const items = document.querySelectorAll(".item");

for (let i = 0; i < items.length; i++) {
    console.log(items[i].textContent);
}
```

---

### 10. DOM + Loop + Condition

HTML:

```html
<p class="item">Apple</p>
<p class="item">Banana</p>
<p class="item">Mango</p>
```

Predict what happens:

```javascript
const items = document.querySelectorAll(".item");

for (let i = 0; i < items.length; i++) {

    if (i === 1) {
        items[i].textContent = "Orange";
    }
}
```

What will the webpage contain afterward?

---

### 11. Button Click

HTML:

```html
<button id="btn">Click Me</button>
<p id="message"></p>
```

JavaScript:

```javascript
const button = document.getElementById("btn");
const message = document.getElementById("message");

button.addEventListener("click", function() {
    message.textContent = "Button clicked!";
});
```

What happens when the button is clicked?

---

### 12. Counter

HTML:

```html
<button id="btn">Increase</button>
<p id="count">0</p>
```

JavaScript:

```javascript
let count = 0;

const button = document.getElementById("btn");
const display = document.getElementById("count");

button.addEventListener("click", function() {

    count++;

    display.textContent = count;
});
```

What will happen if the user clicks the button five times?

---

### 13. `style`

HTML:

```html
<p id="message">Hello</p>
```

What does this code do?

```javascript
const message = document.getElementById("message");

message.style.fontSize = "30px";
message.style.fontWeight = "bold";
```

---

### 14. `classList`

HTML:

```html
<p id="message">Hello</p>
```

JavaScript:

```javascript
const message = document.getElementById("message");

message.classList.add("active");
```

What is the purpose of `classList.add()`?

---

### 15. Toggle Class

What does this code do?

```javascript
const button = document.getElementById("btn");

button.addEventListener("click", function() {
    document.body.classList.toggle("dark");
});
```

Explain what `toggle()` means.

---

### 16. `typeof`

Predict the output:

```javascript
console.log(typeof 10);
console.log(typeof "10");
console.log(typeof true);
console.log(typeof undefined);
```

---

### 17. Type Conversion

Predict the output:

```javascript
let age = "20";

console.log(age + 5);
console.log(Number(age) + 5);
```

Why are the results different?

---

### 18. `parseInt()`

What will be printed?

```javascript
let price = "150";

let result = parseInt(price) + 50;

console.log(result);
```

Why is conversion necessary?

---

### 19. `NaN`

What will happen?

```javascript
let result = Number("Hello");

console.log(result);
console.log(typeof result);
```

What does `NaN` mean?

---

### 20. Template Literals

What will be printed?

```javascript
const name = "Ali";
const age = 20;

console.log(`My name is ${name} and I am ${age} years old.`);
```

Why might template literals be easier than string concatenation?

---

### 21. Form + DOM

HTML:

```html
<input id="name">
<button id="btn">Submit</button>
<p id="output"></p>
```

JavaScript:

```javascript
const input = document.getElementById("name");
const button = document.getElementById("btn");
const output = document.getElementById("output");

button.addEventListener("click", function() {
    output.textContent = `Hello ${input.value}`;
});
```

What happens when the user enters:

```text
Sara
```

and clicks the button?

---

### 22. Form Validation

What will this code do?

```javascript
const input = document.getElementById("name");
const button = document.getElementById("btn");
const output = document.getElementById("output");

button.addEventListener("click", function() {

    if (input.value === "") {
        output.textContent = "Please enter your name";
    } else {
        output.textContent = `Welcome ${input.value}`;
    }

});
```

Why is the condition necessary?

---

### 23. DOM + Array + Loop

HTML:

```html
<ul id="students"></ul>
```

JavaScript:

```javascript
const students = ["Ali", "Sara", "Ahmed"];

const list = document.getElementById("students");

for (let i = 0; i < students.length; i++) {

    const item = document.createElement("li");

    item.textContent = students[i];

    list.appendChild(item);
}
```

What will appear on the webpage?

---

### 24. DOM + Objects + Loop

HTML:

```html
<div id="students"></div>
```

JavaScript:

```javascript
const students = [
    { name: "Ali", marks: 80 },
    { name: "Sara", marks: 45 },
    { name: "Ahmed", marks: 72 }
];

const container = document.getElementById("students");

for (let i = 0; i < students.length; i++) {

    const p = document.createElement("p");

    p.textContent =
        `${students[i].name}: ${students[i].marks}`;

    container.appendChild(p);
}
```

What will the webpage display?

---

### 25. Complete DOM Flow

HTML:

```html
<input id="number">
<button id="btn">Check</button>
<p id="result"></p>
```

JavaScript:

```javascript
const input = document.getElementById("number");
const button = document.getElementById("btn");
const result = document.getElementById("result");

button.addEventListener("click", function() {

    const number = Number(input.value);

    if (number % 2 === 0) {
        result.textContent = `${number} is even`;
    } else {
        result.textContent = `${number} is odd`;
    }

});
```

Explain the complete flow:

```text
User input
    ↓
.value
    ↓
Number()
    ↓
%
    ↓
if / else
    ↓
textContent
    ↓
Webpage changes
```

---

# Part B — Theory & Conceptual Questions

## Questions 26–40

### 26. What is the DOM?

What is the **Document Object Model (DOM)**?

Explain how HTML becomes something JavaScript can interact with.

---

### 27. `document`

What is the purpose of:

```javascript
document
```

Why do we commonly write:

```javascript
document.getElementById(...)
```

?

---

### 28. Selecting Elements

Explain the difference between:

```javascript
getElementById()
```

```javascript
querySelector()
```

and

```javascript
querySelectorAll()
```

Give one example of each.

---

### 29. `textContent` vs `innerHTML`

What is the difference between:

```javascript
element.textContent
```

and:

```javascript
element.innerHTML
```

When would you use each?

---

### 30. `.value`

Why do we use:

```javascript
input.value
```

for input elements?

What is the difference between:

```javascript
input
```

and:

```javascript
input.value
```

?

---

### 31. Events

What is a JavaScript event?

Give examples of at least **five browser events**.

For example:

```text
click
input
submit
```

---

### 32. Event Listener

What does this mean?

```javascript
button.addEventListener("click", function() {
    // code
});
```

Explain:

* `button`
* `addEventListener`
* `"click"`
* callback function

---

### 33. Callback Connection

You previously learned callbacks.

Explain why the function here is a **callback**:

```javascript
button.addEventListener("click", function() {
    console.log("Clicked");
});
```

---

### 34. Dynamic DOM

What does it mean to **dynamically create HTML using JavaScript**?

Explain the purpose of:

```javascript
document.createElement()
```

and:

```javascript
appendChild()
```

---

### 35. `classList`

Explain these methods:

```javascript
classList.add()
classList.remove()
classList.toggle()
classList.contains()
```

Give a practical example where `toggle()` would be useful.

---

### 36. Type Conversion

Why do we sometimes need to convert values?

Explain:

```javascript
Number()
String()
parseInt()
parseFloat()
```

Give an example where a user enters a number into an `<input>`.

---

### 37. `null` vs `undefined`

Explain the difference between:

```javascript
null
```

and:

```javascript
undefined
```

Give a simple example of each.

---

### 38. Truthy and Falsy

What does **truthy/falsy** mean in JavaScript?

Give at least **five falsy values**.

Explain why this works:

```javascript
if (input.value) {
    console.log("Input has something");
}
```

---

### 39. Template Literals

What are template literals?

Explain:

```javascript
`Hello ${name}`
```

Why are they useful when generating dynamic DOM content?

---

### 40. Debugging

Suppose this code isn't working:

```javascript
const button = document.getElementById("btn");

button.addEventListener("click", function() {
    console.log("Clicked");
});
```

List **at least three things** you would check to debug it.

For example:

* Does the HTML element exist?
* Is the ID correct?
* Is the JavaScript loaded?

---

# Part C — Application & Problem-Solving

## Questions 41–45

These are the main **mini-project style questions**.

---

## 41. Interactive Greeting App

Create:

```html
<input id="name">
<button id="btn">Greet</button>
<p id="message"></p>
```

When the user enters their name and clicks the button:

```text
Hello, Ali!
```

should appear.

### Requirements

Use:

* DOM selection
* `.value`
* Function
* Event listener
* `if/else`
* Template literal
* `textContent`

If the input is empty, display:

```text
Please enter your name.
```

---

# 42. Student Result App

Create a webpage containing:

```text
Name input
Marks input
Check Result button
Result paragraph
```

When the user clicks the button, use a function:

```javascript
getGrade(marks)
```

to determine:

```text
80+     → A
60–79   → B
50–59   → C
Below 50 → Fail
```

Display:

```text
Ali — A
```

on the webpage.

### Requirements

You must use:

* DOM
* `.value`
* `Number()`
* Function
* `if / else if / else`
* Event listener
* Template literals
* `textContent`

---

# 43. Dynamic Student List

Create an array:

```javascript
const students = [
    {
        name: "Ali",
        marks: 80
    },
    {
        name: "Sara",
        marks: 45
    },
    {
        name: "Ahmed",
        marks: 72
    },
    {
        name: "Usman",
        marks: 90
    }
];
```

Create a button:

```text
Show Students
```

When clicked, dynamically generate a list on the webpage.

Example:

```text
Ali — 80
Sara — 45
Ahmed — 72
Usman — 90
```

### Requirements

Use:

* Array
* Objects
* Function
* Loop
* `createElement()`
* `appendChild()`
* DOM selection
* Event listener

---

# 44. Search Student

Create a student search application.

Use:

```javascript
const students = [
    { name: "Ali", marks: 80 },
    { name: "Sara", marks: 90 },
    { name: "Ahmed", marks: 65 },
    { name: "Usman", marks: 72 }
];
```

Create:

```text
Search input
Search button
Result area
```

The user enters:

```text
Sara
```

and clicks **Search**.

Display:

```text
Student Found
Name: Sara
Marks: 90
```

If the student doesn't exist:

```text
Student not found.
```

### Requirements

Use:

* Array
* Objects
* Function
* Loop
* `if/else`
* `break`
* DOM
* `.value`
* Event listener

---

# 45. Mini To-Do Application

Build a simple **To-Do List**.

The webpage should contain:

```text
Task input
Add Task button
Task list
```

When the user enters:

```text
Study JavaScript
```

and clicks **Add Task**, the webpage should dynamically create:

```text
☐ Study JavaScript
```

The user should be able to add multiple tasks.

### Minimum Requirements

Use:

* `const` / `let`
* Function
* Array
* Object
* Loop
* Condition
* DOM selection
* `.value`
* `createElement()`
* `appendChild()`
* Event listener
* `classList`
* Template literals

### Bonus

Add a **Delete** button beside every task.

For example:

```text
Study JavaScript       [Delete]
Practice DOM           [Delete]
Revise Functions       [Delete]
```

When Delete is clicked, that particular task should disappear.

---

# Final Concept Connection

At this point, students should stop thinking of JavaScript as separate chapters.

Instead, they should see a complete flow:

```text
                         JAVASCRIPT
                              │
              ┌───────────────┴───────────────┐
              │                               │
           DATA                          BEHAVIOUR
              │                               │
      ┌───────┼────────┐                Functions
      │       │        │                     │
   Variables Arrays  Objects                 │
      │       │        │                     │
      └───────┼────────┘                     │
              │                              │
          Conditions                         │
              │                              │
            Loops                            │
              └──────────────┬───────────────┘
                             │
                           DOM
                             │
                         Events
                             │
                             ↓
                    Interactive Website
```

For example, a **To-Do App** is not simply a "DOM project":

```text
User types task
      ↓
input.value
      ↓
Object created
      ↓
Object stored in Array
      ↓
Function processes task
      ↓
DOM element created
      ↓
appendChild()
      ↓
Event listener handles Delete
      ↓
Condition decides what happens
      ↓
Loop can render multiple tasks
      ↓
Interactive webpage
```

**That's the level students should reach after these assignments: not just knowing individual syntax, but understanding how the pieces connect to build an actual JavaScript application.**
