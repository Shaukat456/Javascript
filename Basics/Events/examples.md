===

---

# 🧭 Event Flow in Action

### 📌 Reminder

1. **Capturing**: top → down
2. **Target**: exact clicked element
3. **Bubbling**: bottom → up

By default, JS listens in **bubbling**, but we can explicitly use **capturing**.

---

## 🔹 Example 1: Website-wide Security / Analytics (Capturing)

👉 Imagine you want to **log every click** on your site before any component handles it.

```js
document.addEventListener(
  "click",
  (e) => {
    console.log(
      "Capturing: Click detected at root before anything else",
      e.target,
    );
  },
  true,
); // capturing
```

- **Capturing Phase**: lets you run _first_, no matter what.
- Real-world use: **analytics, logging, ad-block detection, or security filters**.

---

## 🔹 Example 2: Target Phase → The Element Itself

When you directly click a **button** inside a form:

```js
btn.addEventListener("click", () => {
  console.log("TARGET: Button clicked!");
});
```

- Runs exactly on the element.
- Real-world use: a **login button**, **checkout button**, or **play video button**.

---

## 🔹 Example 3: Bubbling for Event Delegation

👉 Imagine a **todo list** where new tasks can be added dynamically.

```html
<ul id="todos">
  <li>Learn JS</li>
  <li>Practice CSS</li>
</ul>
```

```js
document.getElementById("todos").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done"); // Bubbling lets parent handle it
  }
});
```

- Even new `<li>`s work without adding listeners.
- Real-world use: **chat apps, menus, infinite scroll, comments**.

---

## 🔹 Example 4: Prevent Double Handling

Suppose you have a **card** with a **delete button** inside.

```js
document.getElementById("card").addEventListener("click", () => {
  console.log("Card clicked!");
});

document.getElementById("deleteBtn").addEventListener("click", (e) => {
  e.stopPropagation(); // prevent bubbling
  console.log("Delete button clicked!");
});
```

- Without `stopPropagation`, both `deleteBtn` and `card` actions would trigger.
- Real-world use: **modals, nested menus, dropdown inside card**.

---

## 🔹 Example 5: Capturing vs Bubbling Priority

👉 Suppose you have a **parent container** and **child button**.

```js
parent.addEventListener(
  "click",
  () => {
    console.log("Parent capturing");
  },
  true,
); // capturing

btn.addEventListener("click", () => {
  console.log("Button clicked");
});

parent.addEventListener("click", () => {
  console.log("Parent bubbling");
});
```

**Click button → Output order:**

1. Parent capturing
2. Button target
3. Parent bubbling

Real-world use: **input validation**

- Capturing → check user permissions before the action.
- Target → perform action.
- Bubbling → clean up or update logs after action.

---

## 🔹 Example 6: Closing a Dropdown Menu

- **Target**: user clicks on a dropdown option.
- **Bubbling**: click bubbles up to the body → close the dropdown.
- **Capturing**: global “watcher” could log the click before the dropdown even handles it.

```js
document.body.addEventListener("click", () => {
  dropdown.style.display = "none"; // Bubbling closes dropdown
});

dropdown.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent closing when clicking inside dropdown
});
```

---

# ⚡ Quick Summary of Real-world Uses

- **Capturing** → analytics, permission checks, early interceptors
- **Target** → exact element logic (buttons, inputs, links)
- **Bubbling** → delegation, cleanup, UI updates, global shortcuts

---
