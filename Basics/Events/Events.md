===

---

# 🧠 Events in JavaScript

## **What is an Event?**

An **event** is an action or occurrence that happens in the browser, which JavaScript can "listen for" and respond to.

👉 Examples:

- User clicks a button 🖱️
- User types in an input ⌨️
- A webpage finishes loading 🌐
- A key is pressed 🎹
- A form is submitted 📩

---

## **Real-world Analogy 🏠**

Think of events as **doorbells**:

- The **event** is the bell ringing (click, type, hover, etc.)
- The **event listener** is you waiting for the bell
- The **event handler** is what you do when the bell rings (e.g., open door, ignore, etc.)

---

## **How to Listen for Events**

### 1️⃣ Inline HTML attribute (❌ old way, avoid)

```html
<button onclick="alert('Button clicked!')">Click Me</button>
```

### 2️⃣ DOM property (OK but limited)

```js
const btn = document.querySelector("button");
btn.onclick = function () {
  alert("Button clicked!");
};
```

👉 Downside: Only **one handler** per event.

### 3️⃣ `addEventListener()` (✅ modern & best way)

```js
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  alert("Button clicked!");
});
```

👉 You can attach **multiple handlers** to the same event.

---

## **Common Event Types**

- **Mouse events** → `click`, `dblclick`, `mouseover`, `mouseout`, `mousemove`
- **Keyboard events** → `keydown`, `keyup`, `keypress`
- **Form events** → `submit`, `change`, `input`, `focus`, `blur`
- **Window events** → `load`, `resize`, `scroll`
- **Clipboard events** → `copy`, `paste`

---

## **Examples**

### 1️⃣ Click Event

```html
<button id="btn">Click Me</button>

<script>
  document.getElementById("btn").addEventListener("click", () => {
    console.log("Button was clicked!");
  });
</script>
```

---

### 2️⃣ Key Press

```html
<input type="text" id="name" placeholder="Type your name" />

<script>
  document.getElementById("name").addEventListener("keydown", (event) => {
    console.log("Key pressed:", event.key);
  });
</script>
```

---

### 3️⃣ Form Submission

```html
<form id="myForm">
  <input type="text" required />
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault(); // stops page reload
    console.log("Form submitted!");
  });
</script>
```

---

### 4️⃣ Window Resize

```js
window.addEventListener("resize", () => {
  console.log("Window width:", window.innerWidth);
});
```

---

## **Event Object**

Whenever an event happens, JS automatically passes an **event object** with details.

```js
document.addEventListener("click", (event) => {
  console.log(event.type); // "click"
  console.log(event.target); // element clicked
});
```

---

## **Event Bubbling & Capturing**

When you click on a nested element:

1. **Capturing phase**: event moves from root → child
2. **Target phase**: event hits the clicked element
3. **Bubbling phase**: event bubbles back from child → root

👉 By default, `addEventListener` listens in **bubbling** phase.
You can change it:

```js
element.addEventListener("click", handler, true); // capture phase
```

---

## **Event Delegation (Pro Tip!)**

Instead of attaching event listeners to many elements, attach one to their parent.

```html
<ul id="list">
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>

<script>
  document.getElementById("list").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      console.log("You clicked:", e.target.textContent);
    }
  });
</script>
```

👉 Saves memory, works even for dynamically added items.

---

✅ **Summary**

- Events are actions (click, type, submit, etc.)
- Use `addEventListener()` for flexibility
- The `event` object gives details
- Understand bubbling & delegation for advanced control

---

x
