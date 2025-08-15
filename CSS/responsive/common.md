1. **`calc()`** – math in CSS
2. **CSS Variables** – custom reusable values
3. **`!important`** – when to use (and when not to)
4. Other **high-value CSS features** that make you faster & smarter

---

## **1️⃣ `calc()` – Math Directly in CSS**

💡 `calc()` lets you do **calculations** inside CSS so you can mix units, subtract gaps, or adjust dynamically.

**Syntax:**

```css
property: calc(value1 operator value2);
```

Operators: `+`, `-`, `*`, `/`

---

**Example:**

```css
.card {
  width: calc(33.333% - 20px); /* 3 columns minus 20px gap */
}

.header {
  height: calc(100vh - 60px); /* full height minus navbar */
}
```

**Why it’s powerful:**

- Removes guesswork in layouts
- Lets you mix `%` and `px`
- Adapts automatically when screen size changes

---

## **2️⃣ CSS Variables (Custom Properties)**

💡 Store reusable values and use them everywhere in CSS.
Defined with `--` and accessed with `var(--name)`.

**Example:**

```css
:root {
  --main-color: #3498db;
  --spacing: 20px;
  --max-width: 1200px;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing);
  background-color: var(--main-color);
}

.button {
  background-color: var(--main-color);
  padding: var(--spacing);
}
```

**Why it’s powerful:**

- Change one variable → updates everywhere
- Works with `calc()`:

```css
section {
  padding: calc(var(--spacing) * 2);
}
```

- Perfect for **themes** (dark mode, brand colors)

---

## **3️⃣ `!important` – Override All Other Rules**

💡 Forces a CSS rule to win in the cascade.

**Example:**

```css
p {
  color: red !important;
}
```

**BUT…**
❌ Overuse = messy code & hard debugging
✅ Good use cases:

- Quick override in prototypes
- Overriding inline styles you can’t control (like from a third-party library)

---

## **4️⃣ Other High-Value CSS Features**

---

### **A. `clamp()` – Fluid + Boundaries**

💡 Defines a value with a **min**, **preferred**, and **max**.

Example:

```css
h1 {
  font-size: clamp(1.5rem, 2vw, 3rem);
}
```

- **1.5rem** → min font size
- **2vw** → grows with viewport width
- **3rem** → max font size

Perfect for **fluid typography & spacing**.

---

### **B. `min()` and `max()`**

- `min()` → chooses smallest value
- `max()` → chooses largest value

Example:

```css
.box {
  width: min(90%, 800px); /* never wider than 800px */
}
```

---

### **C. `aspect-ratio`**

💡 Keeps elements in the same shape across devices.

Example:

```css
.video {
  aspect-ratio: 16/9;
}
```

Great for responsive images, videos, cards.

---

### **D. Pseudo-classes & elements**

- `:hover` → mouse hover state
- `:focus` → keyboard focus state
- `::before` / `::after` → add decorative elements without extra HTML

Example:

```css
button::after {
  content: " →";
}
```

---

### **E. `object-fit` for Images**

```css
img {
  width: 100%;
  height: 300px;
  object-fit: cover; /* crops without distortion */
}
```

---

### **F. `scroll-behavior`**

```css
html {
  scroll-behavior: smooth;
}
```
