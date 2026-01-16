- You know **basic HTML**
- You know **basic JavaScript variables & functions**
- But **DOM is new / confusing** → that’s OK

---

# 🧠 PART 1: What is the DOM? (Before Code)

## 📌 Simple Definition

**DOM = Document Object Model**

> The DOM is a **live tree representation** of your HTML that **JavaScript can read and change**.

### Real-World Analogy 🏠

- HTML = **House blueprint**
- Browser = **Builds the house**
- DOM = **Actual house with rooms & furniture**
- JavaScript = **Remote control** to:

  - add furniture
  - remove furniture
  - change color
  - move things

---

### Example HTML

```html
<h1>Hello</h1>
```

Browser converts this into a **DOM node**:

```
Document
 └── h1
     └── "Hello"
```

👉 JavaScript can now **talk to this tree**

---

# 🧠 PART 2: DOM Manipulation = 4 Core Steps

Every DOM task follows this pattern:

1️⃣ **Select** element
2️⃣ **Read or change** it
3️⃣ **Listen** to events
4️⃣ **Update DOM**

We’ll repeat this pattern again & again.

---

# 🧪 PART 3: Our Todo App – Final Goal

We will build this:

- Input box
- Add button
- Todo list
- Delete todo

---

# 🧱 PART 4: HTML Structure (Skeleton)

👉 **HTML is just structure (NO logic)**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Todo App</title>
  </head>
  <body>
    <h1>Todo List</h1>

    <input type="text" id="todoInput" placeholder="Enter todo" />
    <button id="addBtn">Add</button>

    <ul id="todoList"></ul>

    <script src="script.js"></script>
  </body>
</html>
```

---

## 🔍 What Important IDs Mean

IDs are **handles** for JavaScript

| ID        | Purpose        |
| --------- | -------------- |
| todoInput | Get user text  |
| addBtn    | Detect click   |
| todoList  | Add items here |

---

# 🧠 PART 5: JavaScript Starts (script.js)

## Step 1️⃣: Select DOM Elements

```js
const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("todoList");
```

### 🔍 What’s happening?

- `document` = whole HTML page
- `getElementById()` = find element
- Now variables store **real DOM objects**

Think:

```js
input → <input />
button → <button />
list → <ul />
```

---

# 🧠 PART 6: Listening to User Actions (Events)

## What is an Event?

> An event = something user does
> (click, type, scroll, hover)

---

### Add Click Listener

```js
button.addEventListener("click", addTodo);
```

### Meaning in English 🗣️

> “When button is clicked, run addTodo function”

---

# 🧠 PART 7: Creating the addTodo Function

```js
function addTodo() {
  console.log("Button clicked");
}
```

👉 Test this
Click button → see console

✔️ This confirms:

- DOM selection works
- Event listener works

---

# 🧠 PART 8: Reading Input Value

```js
function addTodo() {
  const todoText = input.value;
  console.log(todoText);
}
```

### 🔍 What is `.value`?

- Input fields store text inside `.value`

📌 **Important**

```js
input.innerText ❌
input.value ✅
```

---

# 🧠 PART 9: Creating New DOM Elements

Now we want to add this text as a **list item**

---

### Step-by-step creation

```js
const li = document.createElement("li");
```

👉 This creates:

```html
<li></li>
```

---

### Add text inside it

```js
li.innerText = todoText;
```

Now:

```html
<li>Buy milk</li>
```

---

# 🧠 PART 10: Adding Element to Page

```js
list.appendChild(li);
```

### DOM Tree Update 🌳

Before:

```
ul
```

After:

```
ul
 └── li
```

---

# 🧠 PART 11: Clear Input After Adding

```js
input.value = "";
```

User experience improvement 👍

---

# ✅ FULL WORKING ADD TODO CODE

```js
function addTodo() {
  const todoText = input.value;

  if (todoText === "") return;

  const li = document.createElement("li");
  li.innerText = todoText;

  list.appendChild(li);
  input.value = "";
}
```

---

# 🧠 PART 12: Adding Delete Button to Each Todo

Each todo should look like:

```
[ Buy milk ] [ ❌ ]
```

---

### Create delete button

```js
const deleteBtn = document.createElement("button");
deleteBtn.innerText = "❌";
```

---

### Append button inside li

```js
li.appendChild(deleteBtn);
```

Now DOM:

```
li
 ├── "Buy milk"
 └── button
```

---

# 🧠 PART 13: Deleting Todo (Event inside Event)

```js
deleteBtn.addEventListener("click", function () {
  list.removeChild(li);
});
```

### Explanation 🧠

- Button knows its parent `li`
- List removes that `li`

---

# 🧩 FINAL COMPLETE JAVASCRIPT

```js
const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("todoList");

button.addEventListener("click", addTodo);

function addTodo() {
  const todoText = input.value;

  if (todoText === "") return;

  const li = document.createElement("li");
  li.innerText = todoText;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";

  deleteBtn.addEventListener("click", function () {
    list.removeChild(li);
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);

  input.value = "";
}
```

---

# 🧠 WHAT YOU LEARNED (VERY IMPORTANT)

✅ DOM is a **tree**
✅ JavaScript **controls HTML**
✅ You can:

- select elements
- create elements
- modify elements
- delete elements
- respond to user actions

---
