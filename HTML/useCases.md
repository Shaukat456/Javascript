## 🧾 **Use Case 1: Form Validation Without JavaScript**

### 📝 Scenario:

You want to make sure the user:

- Fills in their name
- Provides a valid email
- Enters a password with at least 8 characters

> ✅ Only using **HTML5 features**, no JavaScript.

### ✅ Solution:

```html
<form>
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required />

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required minlength="8" />

  <button type="submit">Register</button>
</form>
```

### 💡 What HTML5 is doing here:

| Attribute       | Function                     |
| --------------- | ---------------------------- |
| `required`      | Field must be filled         |
| `type="email"`  | Must be a valid email format |
| `minlength="8"` | Enforces minimum length      |

### ⚠️ Bonus:

You can add **custom messages** using the `title` attribute:

```html
<input
  type="password"
  required
  minlength="8"
  title="Password must be at least 8 characters"
/>
```

---

## 📬 **Use Case 2: Contact Form with Pattern Validation**

### 📝 Scenario:

You want the user to enter a **phone number** in the format `+92-300-1234567`.

### ✅ Solution:

```html
<form>
  <label for="phone">Phone Number</label>
  <input
    id="phone"
    name="phone"
    type="tel"
    pattern="^\+92-\d{3}-\d{7}$"
    required
    placeholder="+92-300-1234567"
    title="Use format +92-300-1234567"
  />
  <button type="submit">Send</button>
</form>
```

### ✅ HTML Validates:

- Starts with `+92`
- Followed by a 3-digit code
- Followed by a 7-digit number

---

## 🛒 **Use Case 3: Product Card with Semantic HTML**

### 📝 Scenario:

Build an accessible product card.

```html
<article>
  <header>
    <h2>Noise Cancelling Headphones</h2>
  </header>

  <figure>
    <img
      src="headphones.jpg"
      alt="Black over-ear noise cancelling headphones"
    />
    <figcaption>$199.99</figcaption>
  </figure>

  <p>Enjoy immersive sound quality with up to 20 hours of battery life.</p>

  <footer>
    <button>Add to Cart</button>
  </footer>
</article>
```

### 💡 Why it's great:

- Uses semantic tags: `<article>`, `<header>`, `<figure>`, `<figcaption>`, `<footer>`
- Accessible: `alt` for images, logical structure
- Ready for e-commerce SEO and screen readers

---

## 📑 **Use Case 4: Accessible FAQ Section with `<details>`**

### 📝 Scenario:

Show/hide FAQ answers without JavaScript.

```html
<details>
  <summary>What is your return policy?</summary>
  <p>You can return any item within 30 days for a full refund.</p>
</details>
```

### ✅ Benefits:

- Fully accessible
- Keyboard- and screen reader-friendly
- No JavaScript required

---

## 📅 **Use Case 5: Booking Form with Date & Time Constraints**

### 📝 Scenario:

User can only pick a meeting date **after today** and time **between 9AM–5PM**

```html
<form>
  <label for="date">Meeting Date</label>
  <input id="date" name="date" type="date" min="2025-07-04" required />

  <label for="time">Meeting Time</label>
  <input id="time" name="time" type="time" min="09:00" max="17:00" required />

  <button type="submit">Book</button>
</form>
```

> You can use JavaScript to dynamically set the `min` date, but HTML itself handles the UI/UX.

---

## 🧠 INTERVIEW WORTHY CONCEPTS (HTML-Only)

| Question                                      | What to Show                                       |
| --------------------------------------------- | -------------------------------------------------- |
| Can you validate a form without JavaScript?   | `required`, `type`, `minlength`, `pattern`         |
| How do you make a site accessible?            | `alt`, semantic tags, `<label>`, `<details>`       |
| How would you make a mobile-friendly page?    | Use `<meta name="viewport">`, responsive structure |
| How can you load scripts efficiently?         | Use `defer`, place script at bottom, use modules   |
| What’s a real-world example of semantic HTML? | Blog post, product card, landing page sections     |

---
