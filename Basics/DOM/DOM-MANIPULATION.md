# JavaScript DOM — The Foundation

Now we move from **JavaScript logic** to **JavaScript interacting with webpages**.

So far, you have mostly worked with data:

```text
Variables
Arrays
Objects
Functions
Loops
Callbacks
```

Now we will make JavaScript interact with:

* HTML elements
* Text
* Buttons
* Forms
* Inputs
* Images
* Classes
* Styles
* User actions

This is where JavaScript starts making a webpage **interactive**.

---

# 1. What is the DOM?

DOM stands for:

> **Document Object Model**

The easiest way to understand it:

> The browser takes your HTML page and converts it into a JavaScript-accessible object structure called the DOM.

Suppose your HTML is:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>

<body>

    <h1>Hello World</h1>

    <p>Welcome to my website.</p>

    <button>Click Me</button>

</body>
</html>
```

The browser creates a structure similar to:

```text
Document
│
└── html
    │
    ├── head
    │   └── title
    │
    └── body
        │
        ├── h1
        ├── p
        └── button
```

JavaScript can interact with this structure.

---

# 2. Why Do We Need the DOM?

Without JavaScript:

```html
<button>Click Me</button>
```

The button exists, but nothing special happens.

With JavaScript, we can say:

```text
When user clicks button
        ↓
change text
        ↓
change color
        ↓
show message
        ↓
update data
```

For example:

```js
document.querySelector("button").textContent = "Clicked!";
```

Now the button text changes.

---

# 3. `document`

The most important object when working with the DOM is:

```js
document
```

`document` represents the current webpage.

You can think of:

```text
document
   ↓
Your entire webpage
```

For example:

```js
console.log(document);
```

The browser gives you access to the page structure.

---

# 4. Selecting HTML Elements

Before modifying an element, we usually need to **select it**.

There are several ways.

The most important modern method is:

```js
document.querySelector()
```

---

# 5. `querySelector()`

Suppose HTML:

```html
<h1>Hello World</h1>
```

JavaScript:

```js
let heading = document.querySelector("h1");
```

Now:

```js
console.log(heading);
```

The variable contains the `<h1>` element.

Think:

```text
HTML
 ↓
querySelector()
 ↓
JavaScript variable
```

---

# 6. Selecting by Class

HTML:

```html
<p class="description">
    Welcome to my website.
</p>
```

JavaScript:

```js
let paragraph = document.querySelector(".description");
```

Remember CSS selectors:

```text
element → "p"

class   → ".description"

id      → "#title"
```

So:

```js
document.querySelector(".description");
```

means:

> Find the first element with class `description`.

---

# 7. Selecting by ID

HTML:

```html
<h1 id="title">Hello World</h1>
```

JavaScript:

```js
let title = document.querySelector("#title");
```

Now:

```js
console.log(title);
```

---

# 8. `querySelector()` Returns the First Match

Suppose:

```html
<p class="text">First</p>
<p class="text">Second</p>
<p class="text">Third</p>
```

Then:

```js
let paragraph = document.querySelector(".text");
```

selects only:

```text
First
```

because `querySelector()` returns the **first matching element**.

---

# 9. `querySelectorAll()`

If you want all matching elements:

```js
let paragraphs = document.querySelectorAll(".text");
```

Now you get a collection of elements.

```text
First
Second
Third
```

You can loop through them:

```js
paragraphs.forEach(paragraph => {
    console.log(paragraph.textContent);
});
```

Output:

```text
First
Second
Third
```

Notice the connection:

```text
querySelectorAll()
        ↓
multiple elements
        ↓
forEach()
        ↓
callback
```

This is why learning functions and callbacks first was important.

---

# 10. Changing Text

Suppose:

```html
<h1 id="title">Old Title</h1>
```

JavaScript:

```js
let title = document.querySelector("#title");

title.textContent = "New Title";
```

The webpage changes from:

```text
Old Title
```

to:

```text
New Title
```

---

# 11. `textContent`

`textContent` allows you to read or change the text inside an element.

### Read

```js
let title = document.querySelector("#title");

console.log(title.textContent);
```

### Change

```js
title.textContent = "Welcome!";
```

Think:

```text
element.textContent
        ↓
text inside the element
```

---

# 12. `innerHTML`

You can also modify HTML inside an element.

HTML:

```html
<div id="box"></div>
```

JavaScript:

```js
let box = document.querySelector("#box");

box.innerHTML = "<h2>Hello</h2>";
```

The browser creates:

```html
<div id="box">
    <h2>Hello</h2>
</div>
```

Difference:

### `textContent`

Treats content as text.

```js
element.textContent = "<b>Hello</b>";
```

Displays:

```text
<b>Hello</b>
```

### `innerHTML`

Interprets it as HTML.

```js
element.innerHTML = "<b>Hello</b>";
```

Displays:

**Hello**

---

# 13. Changing CSS

JavaScript can also change styles.

HTML:

```html
<h1 id="title">Hello</h1>
```

JavaScript:

```js
let title = document.querySelector("#title");

title.style.color = "red";
title.style.fontSize = "40px";
```

Now the heading becomes red and larger.

---

# 14. Important: CSS Property Names

CSS:

```css
background-color: blue;
```

JavaScript:

```js
element.style.backgroundColor = "blue";
```

CSS uses:

```text
background-color
```

JavaScript uses camelCase:

```text
backgroundColor
```

Other examples:

```js
element.style.fontSize = "30px";
element.style.marginTop = "20px";
element.style.borderRadius = "10px";
```

---

# 15. Don't Overuse Inline Styles

You *can* do:

```js
element.style.color = "red";
```

But in larger applications, it's often better to use CSS classes.

HTML:

```html
<div id="box">Hello</div>
```

CSS:

```css
.active {
    background-color: blue;
    color: white;
}
```

JavaScript:

```js
let box = document.querySelector("#box");

box.classList.add("active");
```

This is cleaner.

---

# 16. `classList`

JavaScript gives us:

```js
element.classList
```

Important methods:

```js
classList.add()
classList.remove()
classList.toggle()
classList.contains()
```

### Add

```js
box.classList.add("active");
```

### Remove

```js
box.classList.remove("active");
```

### Toggle

```js
box.classList.toggle("active");
```

Toggle is especially useful for things like:

* dark mode
* menus
* dropdowns
* show/hide components
* active buttons

---

# 17. The Most Important DOM Concept: Events

A webpage isn't useful if JavaScript only runs once.

We want:

> When something happens, execute some code.

These "things happening" are called **events**.

Examples:

```text
click
submit
input
change
mouseover
keydown
keyup
load
```

For example:

```text
User clicks button
        ↓
Event happens
        ↓
JavaScript responds
```

---

# 18. `addEventListener()`

The standard way to handle events is:

```js
element.addEventListener(event, callback);
```

Example:

```html
<button id="btn">Click Me</button>
```

JavaScript:

```js
let button = document.querySelector("#btn");

button.addEventListener("click", function() {
    console.log("Button clicked!");
});
```

Now every time the user clicks the button:

```text
Button clicked!
```

appears in the console.

---

# 19. Using an Arrow Function

The same thing:

```js
button.addEventListener("click", () => {
    console.log("Button clicked!");
});
```

This is extremely common.

Notice our previous topic coming back:

```text
addEventListener()
       ↓
takes a function
       ↓
callback
```

---

# 20. Why Don't We Write `callback()`?

Look at:

```js
button.addEventListener("click", handleClick);
```

We pass:

```js
handleClick
```

not:

```js
handleClick()
```

Because the browser needs the function itself so that it can call it **when the event happens**.

Example:

```js
function handleClick() {
    console.log("Clicked!");
}

button.addEventListener("click", handleClick);
```

Conceptually:

```text
Page loads
   ↓
Browser remembers handleClick
   ↓
User clicks
   ↓
Browser calls handleClick()
```

This is exactly why callbacks matter.

---

# 21. Event Object

When an event occurs, JavaScript can give your callback information about that event.

```js
button.addEventListener("click", (event) => {
    console.log(event);
});
```

The `event` object contains information about what happened.

For example:

```js
button.addEventListener("click", (event) => {
    console.log(event.type);
});
```

Output:

```text
click
```

---

# 22. Getting the Element That Triggered the Event

The event object has:

```js
event.target
```

Example:

```js
button.addEventListener("click", (event) => {
    console.log(event.target);
});
```

This gives you the element that triggered the event.

Very useful when working with multiple elements.

---

# 23. Example: Change Text When Button Is Clicked

HTML:

```html
<h1 id="message">Hello</h1>

<button id="btn">
    Change Message
</button>
```

JavaScript:

```js
let message = document.querySelector("#message");
let button = document.querySelector("#btn");

button.addEventListener("click", () => {
    message.textContent = "Button was clicked!";
});
```

Flow:

```text
User clicks
    ↓
click event
    ↓
callback runs
    ↓
textContent changes
    ↓
webpage updates
```

---

# 24. Example: Counter

HTML:

```html
<h1 id="count">0</h1>

<button id="increase">+</button>
<button id="decrease">-</button>
```

JavaScript:

```js
let count = 0;

let countElement = document.querySelector("#count");
let increaseButton = document.querySelector("#increase");
let decreaseButton = document.querySelector("#decrease");

increaseButton.addEventListener("click", () => {
    count++;
    countElement.textContent = count;
});

decreaseButton.addEventListener("click", () => {
    count--;
    countElement.textContent = count;
});
```

Now we have a real interactive application.

Notice how many concepts are connected:

```text
Variable
   ↓
DOM selection
   ↓
Event
   ↓
Callback
   ↓
Operator
   ↓
DOM modification
```

---

# 25. Getting Input Values

Suppose:

```html
<input id="nameInput">
<button id="btn">Submit</button>
```

JavaScript:

```js
let input = document.querySelector("#nameInput");
let button = document.querySelector("#btn");

button.addEventListener("click", () => {

    console.log(input.value);

});
```

If the user types:

```text
Ali
```

and clicks the button:

```text
Ali
```

is printed.

---

# 26. `.value`

For input elements:

```js
input.value
```

gives the value entered by the user.

Example:

```js
let username = input.value;

console.log(username);
```

Important:

```text
textContent
    ↓
Usually content inside an element

value
    ↓
Value of form controls like input
```

---

# 27. A Real Login Form

HTML:

```html
<input id="username" placeholder="Username">

<input id="password" type="password" placeholder="Password">

<button id="loginBtn">
    Login
</button>

<p id="message"></p>
```

JavaScript:

```js
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginButton = document.querySelector("#loginBtn");
let message = document.querySelector("#message");

loginButton.addEventListener("click", () => {

    if (
        username.value === "admin" &&
        password.value === "1234"
    ) {
        message.textContent = "Login successful!";
    } else {
        message.textContent = "Invalid credentials!";
    }

});
```

Look at the architecture:

```text
HTML
 ↓
DOM selection
 ↓
User input
 ↓
Event
 ↓
Callback
 ↓
Condition
 ↓
DOM update
```

This is the foundation of frontend development.

---

# 28. Forms and `submit`

Instead of listening to a button click, forms should usually be handled using the form's `submit` event.

HTML:

```html
<form id="loginForm">

    <input id="username">

    <input id="password" type="password">

    <button type="submit">
        Login
    </button>

</form>
```

JavaScript:

```js
let form = document.querySelector("#loginForm");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    console.log("Form submitted");

});
```

---

# 29. What Does `preventDefault()` Do?

Normally, submitting an HTML form causes the browser to perform its default behavior, often navigating/reloading the page.

```js
event.preventDefault();
```

means:

> Stop the browser's default behavior.

Then JavaScript can handle the form itself.

This is very important for modern web applications.

---

# 30. Input Events

You don't have to wait for a button.

You can react as the user types.

```js
let input = document.querySelector("#nameInput");

input.addEventListener("input", () => {
    console.log(input.value);
});
```

If the user types:

```text
A
Al
Ali
```

the event runs repeatedly.

This is useful for:

* live search
* validation
* character counters
* autocomplete
* live previews

---

# 31. `change` vs `input`

These are slightly different.

### `input`

Runs as the value changes while the user is interacting.

```js
input.addEventListener("input", () => {});
```

### `change`

Runs when the value is changed and the control's change is committed.

```js
input.addEventListener("change", () => {});
```

For live text processing, `input` is commonly more appropriate.

---

# 32. Creating Elements with JavaScript

The DOM isn't only about modifying existing HTML.

You can create new elements.

```js
let paragraph = document.createElement("p");
```

Now:

```js
paragraph.textContent = "Hello from JavaScript!";
```

But it doesn't appear on the page yet.

We need to add it.

---

# 33. `append()`

Suppose:

```html
<div id="container"></div>
```

JavaScript:

```js
let container = document.querySelector("#container");

let paragraph = document.createElement("p");

paragraph.textContent = "Hello!";

container.append(paragraph);
```

Now the DOM contains:

```html
<div id="container">
    <p>Hello!</p>
</div>
```

---

# 34. Creating Elements Dynamically

Suppose we have:

```js
let students = ["Ali", "Sara", "Ahmed"];
```

HTML:

```html
<ul id="studentList"></ul>
```

JavaScript:

```js
let list = document.querySelector("#studentList");

students.forEach(student => {

    let li = document.createElement("li");

    li.textContent = student;

    list.append(li);

});
```

Result:

```text
• Ali
• Sara
• Ahmed
```

Now you're combining:

```text
Array
 ↓
forEach()
 ↓
Callback
 ↓
DOM creation
 ↓
DOM insertion
```

---

# 35. Real-World Example: Todo List

HTML:

```html
<input id="todoInput">

<button id="addTodo">
    Add
</button>

<ul id="todoList"></ul>
```

JavaScript:

```js
let input = document.querySelector("#todoInput");
let button = document.querySelector("#addTodo");
let list = document.querySelector("#todoList");

button.addEventListener("click", () => {

    let todoText = input.value;

    let li = document.createElement("li");

    li.textContent = todoText;

    list.append(li);

    input.value = "";

});
```

Now the user can type:

```text
Study JavaScript
```

Click:

```text
Add
```

And the page creates:

```text
• Study JavaScript
```

This is a real mini-application.

---

# 36. DOM + Objects

Let's make our Todo app more realistic.

Instead of just:

```js
let todos = [
    "Study",
    "Exercise",
    "Read"
];
```

use objects:

```js
let todos = [
    {
        id: 1,
        text: "Study JavaScript",
        completed: false
    },
    {
        id: 2,
        text: "Exercise",
        completed: true
    }
];
```

Now JavaScript can use:

```text
Array
 ↓
Objects
 ↓
Functions
 ↓
Loops
 ↓
DOM
```

This is much closer to real frontend applications.

---

# 37. Event Delegation — Preview

Suppose we create 100 buttons.

Instead of adding an event listener to every button individually, JavaScript can sometimes listen on a parent element and determine which child was clicked.

This is called **event delegation**.

Example:

```js
list.addEventListener("click", (event) => {

    console.log(event.target);

});
```

If the user clicks an `<li>`, `event.target` tells you which element was clicked.

We'll study this more deeply later.

---

# 38. The DOM Is the Bridge

At this point, understand the big picture:

```text
              JAVASCRIPT
                   │
          ┌────────┴────────┐
          ↓                 ↓
       DATA              FUNCTIONS
          │                 │
          └────────┬────────┘
                   ↓
                  DOM
                   ↓
                WEBPAGE
```

JavaScript can:

```text
READ
 ↓
HTML elements
 ↓
input values
 ↓
attributes

MODIFY
 ↓
text
 ↓
HTML
 ↓
classes
 ↓
styles

CREATE
 ↓
elements

RESPOND
 ↓
events
```

---

# 39. Your Current JavaScript Progression

You have now built a very important foundation:

```text
Variables
    ↓
Operators
    ↓
Conditions
    ↓
Arrays
    ↓
Objects
    ↓
Loops
    ↓
Functions
    ↓
Callbacks
    ↓
Higher-Order Functions
    ↓
Array Methods
    ↓
DOM
    ↓
Events
    ↓
User Interaction
```

And the next major progression is:

```text
DOM
 ↓
Events
 ↓
Forms
 ↓
Validation
 ↓
Dynamic UI
 ↓
Event Delegation
 ↓
Local Storage
 ↓
Fetch API
 ↓
Promises
 ↓
async / await
 ↓
APIs
```

### Key things to master from this lesson

```text
document
querySelector()
querySelectorAll()

textContent
innerHTML

style
classList

addEventListener()

event
event.target
event.preventDefault()

value

createElement()
append()

input
click
submit
change
```

The **next natural topic** is **DOM Events in depth**: event types, event objects, bubbling, capturing, `preventDefault()`, `stopPropagation()`, event delegation, keyboard/mouse events, and building interactive components.
