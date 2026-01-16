We will move **slow**, **visual**, **conceptual**, and **step-by-step**.

---

# 🧠 WHAT YOU’LL LEARN (Big Picture)

By the end, you’ll **fully understand**:

- How **CSS lives in the DOM**
- How JS **changes styles dynamically**
- How real websites:

  - toggle themes
  - show/hide elements
  - animate
  - respond to user actions

---

# 🏗️ WEBSITE WE WILL BUILD

### 🎯 “Interactive Profile Website”

Features:

- Light / Dark Mode 🌙
- Show / Hide About Section 👁️
- Highlight active button 🎨
- Animated hover & transitions
- Dynamic class toggling (REAL-WORLD technique)

---

# 🔑 VERY IMPORTANT CONCEPT (Before Code)

## ❌ BAD PRACTICE (inline styles everywhere)

```js
element.style.color = "red";
```

## ✅ REAL-WORLD PRACTICE

👉 **Toggle CSS classes**

```js
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
```

🔥 **This is how React, Vue, Angular work internally**

---

# 🧱 STEP 1: HTML (Structure Only)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Interactive Website</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <nav>
      <button id="themeBtn">Toggle Theme</button>
      <button id="aboutBtn">Show About</button>
    </nav>

    <section class="card">
      <h1 id="name">John Doe</h1>
      <p class="role">Frontend Developer</p>

      <div id="about" class="hidden">
        <p>I build clean, simple, and interactive websites.</p>
      </div>
    </section>

    <script src="script.js"></script>
  </body>
</html>
```

---

## 🔍 Important Observations

- No logic in HTML
- Classes = styling hooks
- IDs = JavaScript hooks

---

# 🎨 STEP 2: CSS (style.css)

```css
/* RESET */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  transition: background 0.3s, color 0.3s;
}

/* LIGHT MODE (DEFAULT) */
body {
  background: #f4f4f4;
  color: #222;
}

/* DARK MODE */
body.dark {
  background: #121212;
  color: #f4f4f4;
}

/* NAVBAR */
nav {
  padding: 15px;
  background: #ddd;
  display: flex;
  gap: 10px;
}

body.dark nav {
  background: #1f1f1f;
}

/* BUTTONS */
button {
  padding: 8px 14px;
  border: none;
  cursor: pointer;
  background: #333;
  color: white;
  border-radius: 5px;
  transition: transform 0.2s, background 0.2s;
}

button:hover {
  transform: scale(1.05);
  background: #555;
}

/* CARD */
.card {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  transition: background 0.3s;
}

body.dark .card {
  background: #1e1e1e;
}

/* ABOUT SECTION */
.hidden {
  display: none;
}
```

---

# 🧠 STEP 3: JavaScript (script.js)

## Select Elements

```js
const themeBtn = document.getElementById("themeBtn");
const aboutBtn = document.getElementById("aboutBtn");
const aboutSection = document.getElementById("about");
```

---

# 🌙 STEP 4: Theme Toggle (CSS + JS Magic)

```js
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});
```

### What Just Happened?

- JS added/removes `.dark`
- CSS reacts
- **No styles written in JS**

🔥 Real-world pattern

---

# 👁️ STEP 5: Show / Hide Section

```js
aboutBtn.addEventListener("click", function () {
  aboutSection.classList.toggle("hidden");

  if (aboutSection.classList.contains("hidden")) {
    aboutBtn.innerText = "Show About";
  } else {
    aboutBtn.innerText = "Hide About";
  }
});
```

---

# 🧠 WHAT IS `.classList`?

| Method   | Meaning                  |
| -------- | ------------------------ |
| add      | Add class                |
| remove   | Remove class             |
| toggle   | Add/remove automatically |
| contains | Check class exists       |

---

# 🎨 STEP 6: Active Button Highlight (Real UX)

### CSS

```css
button.active {
  background: #007bff;
}
```

---

### JS

```js
aboutBtn.addEventListener("click", function () {
  aboutSection.classList.toggle("hidden");
  aboutBtn.classList.toggle("active");

  aboutBtn.innerText = aboutSection.classList.contains("hidden")
    ? "Show About"
    : "Hide About";
});
```

---

# 🧠 STEP 7: Understanding Real-World Flow

### User clicks → JS → CSS → UI update

```
Click
 ↓
JS logic
 ↓
class added/removed
 ↓
CSS applied
 ↓
Visual change
```

This is **EVERY website EVER**.

---

# 🧪 MINI EXPERIMENTS (DO THESE)

1️⃣ Change font size using class
2️⃣ Add fade animation using `opacity`
3️⃣ Add color theme switch
4️⃣ Disable button dynamically

---

# 🧠 VERY IMPORTANT RULES (REAL WORLD)

❌ Don’t write all CSS in JS
❌ Don’t manipulate layout directly
✅ Toggle classes
✅ Keep logic in JS, styling in CSS

---
