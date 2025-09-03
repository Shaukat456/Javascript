Perfect 👌 you spotted the **capturing/target/bubbling** phases — that’s where many JS beginners get confused, so let’s really nail this with **real-world analogies + interactive examples**.

---

# 🧠 Event Flow: Capturing → Target → Bubbling

### 🔄 How it works

1. **Capturing phase** → event starts from the **document root** and travels _down_ the DOM tree toward the target.
2. **Target phase** → event reaches the **element you interacted with**.
3. **Bubbling phase** → event travels _back up_ the DOM tree toward the root.

👉 By default, JS listens during **bubbling**. If you want capturing, pass `true` in `addEventListener`.

---

### 🎯 Real-world Analogy

Imagine throwing a ball into a glass inside a box inside a cupboard inside your house:

- **Capturing phase** → from house → cupboard → box → glass (moving inward).
- **Target phase** → the ball lands in the **glass**.
- **Bubbling phase** → the sound/impact _echoes back out_: glass → box → cupboard → house (moving outward).

---

## 🔹 Code Example: Capturing vs Bubbling

```html
<div id="parent" style="padding:20px; background:lightblue;">
  Parent
  <div id="child" style="padding:20px; background:lightgreen;">
    Child
    <button id="btn">Click Me</button>
  </div>
</div>

<script>
  document.getElementById("parent").addEventListener("click", () => {
    console.log("PARENT clicked (bubbling)");
  });

  document.getElementById("child").addEventListener("click", () => {
    console.log("CHILD clicked (bubbling)");
  });

  document.getElementById("btn").addEventListener("click", () => {
    console.log("BUTTON clicked (target)");
  });

  // Capturing example
  document.getElementById("parent").addEventListener(
    "click",
    () => {
      console.log("PARENT clicked (capturing)");
    },
    true
  );
</script>
```

👉 Try clicking the button:

- First, you’ll see `"PARENT clicked (capturing)"`
- Then `"CHILD clicked (bubbling)"`
- Then `"BUTTON clicked (target)"`
- Finally `"PARENT clicked (bubbling)"`

That’s the event flow 🚀.

---

# ✅ Real-world Event Examples

### 1️⃣ Dropdown Menu (Click Outside to Close)

```js
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
    dropdown.style.display = "none"; // bubbling makes this possible
  }
});
```

---

### 2️⃣ Modal Popup (Esc key to close)

```js
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});
```

---

### 3️⃣ Delegated Todo List

```js
document.getElementById("todoList").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done"); // bubbling allows single listener
  }
});
```

---

### 4️⃣ Prevent Form Submit Refresh

```js
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop default behavior
  console.log("Form data handled with JS!");
});
```

---

### 5️⃣ Navbar Active State (Event Delegation)

```js
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    document
      .querySelectorAll("nav a")
      .forEach((a) => a.classList.remove("active"));
    e.target.classList.add("active");
  }
});
```

---

⚡ **Tips to Become an Event Genius**

- Use **event delegation** for dynamic elements (saves memory).
- Use `stopPropagation()` if you don’t want bubbling beyond an element.
- Use capturing (`true`) if you need “first access” to the event.
- Always know **when to `preventDefault()`** (forms, links, checkboxes).

---
