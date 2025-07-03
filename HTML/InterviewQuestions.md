## 🟢 **Beginner-Level Questions**

### 1. ❓ What is HTML?

**Tip:** Define its purpose, not just the acronym.

✅ **Sample Answer:**
HTML (HyperText Markup Language) is the standard language used to structure content on the web. It defines the structure and meaning of web content using elements like headings, paragraphs, links, images, and more.

---

### 2. ❓ What’s the difference between `<div>` and `<span>`?

✅ **Sample Answer:**
`<div>` is a block-level element used to group sections of content, while `<span>` is an inline element used for small chunks like words or phrases inside text.

---

### 3. ❓ What are semantic HTML elements?

✅ **Sample Answer:**
Semantic elements clearly describe their meaning to both the browser and developer. Examples include `<header>`, `<article>`, `<nav>`, and `<footer>`. They improve readability, SEO, and accessibility.

---

### 4. ❓ How do you make a link open in a new tab?

✅ **Sample Answer:**
Use the `target="_blank"` attribute in the `<a>` tag:

```html
<a href="https://example.com" target="_blank">Visit</a>
```

---

### 5. ❓ What is the purpose of the `alt` attribute in images?

✅ **Sample Answer:**
The `alt` attribute provides alternative text for an image if it fails to load and improves accessibility for screen readers.

---

## 🟡 **Intermediate-Level Questions**

### 6. ❓ What is the difference between `id` and `class` in HTML?

✅ **Sample Answer:**

- `id` is unique and should be used once per page.
- `class` can be reused on multiple elements.

---

### 7. ❓ What is the use of the `defer` and `async` attributes in script tags?

✅ **Sample Answer:**

- `defer`: Loads the script in parallel but executes it after HTML parsing is complete, **in order**.
- `async`: Loads and executes the script as soon as it's ready, possibly **out of order**.

---

### 8. ❓ What are void (self-closing) elements in HTML?

✅ **Sample Answer:**
Void elements do not have closing tags. Examples include `<img>`, `<input>`, `<br>`, and `<hr>`.

---

### 9. ❓ What’s the difference between `<section>`, `<article>`, and `<div>`?

✅ **Sample Answer:**

- `<section>`: Thematic grouping of content.
- `<article>`: Independent content like blog posts or news.
- `<div>`: Non-semantic container for styling or scripting.

---

### 10. ❓ How do you create a form in HTML?

✅ **Sample Answer:**

```html
<form action="/submit" method="POST">
  <input type="text" name="username" />
  <button type="submit">Submit</button>
</form>
```

---

## 🔴 **Advanced-Level Questions**

### 11. ❓ What is the DOM and how does HTML relate to it?

✅ **Sample Answer:**
The DOM (Document Object Model) is a tree-like structure created by the browser from HTML. HTML elements become nodes in the DOM, which JavaScript can manipulate dynamically.

---

### 12. ❓ What is accessibility in HTML and why is it important?

✅ **Sample Answer:**
Accessibility ensures that web content is usable by people with disabilities. Using semantic tags, `alt` attributes, and proper form labels makes content screen reader-friendly and compliant with accessibility standards.

---

### 13. ❓ What’s the purpose of the `meta` tag?

✅ **Sample Answer:**
Meta tags provide metadata such as charset, page description, and viewport settings. Example:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

### 14. ❓ How is HTML5 different from older HTML versions?

✅ **Sample Answer:**
HTML5 introduced semantic elements (`<header>`, `<article>`, etc.), multimedia tags (`<audio>`, `<video>`), local storage, and better form controls. It removed outdated elements like `<font>` and is more mobile-friendly.

---

### 15. ❓ What is the `data-*` attribute used for?

✅ **Sample Answer:**
It stores custom data in HTML elements for use in JavaScript.

```html
<div data-user-id="123">User</div>
```

---
