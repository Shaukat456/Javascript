---
---

# 🧠 BIG IDEA (VERY IMPORTANT)

> AI is **not a mind reader**
> AI is a **junior developer + designer**
> Your prompt = **project brief**

Bad brief → bad website
Good brief → production-quality output

---

# 🏗️ MENTAL MODEL: HOW TO PROMPT FOR WEBSITES

Think in **layers** (like real software development):

1️⃣ Role
2️⃣ Goal
3️⃣ Constraints
4️⃣ Tech stack
5️⃣ UX rules
6️⃣ Output format
7️⃣ Iteration loop

We’ll turn this into **prompt templates**.

---

# 🔑 TECHNIQUE 1: ROLE PROMPTING (MANDATORY)

### ❌ Bad

> “Make a website”

### ✅ Good

> “Act as a senior frontend engineer and UI/UX designer…”

📌 **Always assign a role**

---

### ✅ Copy-Paste Template

```
Act as a senior frontend engineer and UI/UX designer
who builds clean, accessible, modern websites.
```

---

# 🔑 TECHNIQUE 2: CLEAR GOAL (WHAT ARE WE BUILDING?)

### ❌ Bad

> “Build a website”

### ✅ Good

> “Build a beginner-friendly personal portfolio website…”

---

### Template

```
Goal:
Build a [type] website for [audience]
that focuses on [key outcome].
```

---

# 🔑 TECHNIQUE 3: CONSTRAINTS (THIS IS THE MAGIC)

AI becomes powerful when **restricted**.

### Examples:

- beginner friendly
- no frameworks
- only HTML/CSS/JS
- mobile-first
- no external libraries

---

### Template

```
Constraints:
- Beginner friendly
- No frameworks
- Clean, readable code
- Well commented
- No external libraries
```

---

# 🔑 TECHNIQUE 4: TECH STACK EXPLICITLY

Never assume.

### ❌

> “Use modern tools”

### ✅

> “Use HTML, CSS, and vanilla JavaScript only”

---

### Template

```
Tech stack:
- HTML
- CSS
- Vanilla JavaScript
```

---

# 🔑 TECHNIQUE 5: UX / DESIGN RULES (VERY IMPORTANT)

This is how you get **awesome UI**, not ugly pages.

---

### Examples:

```
Design rules:
- Mobile-first layout
- Clear spacing
- Soft shadows
- Modern color palette
- Accessible contrast
- Smooth hover effects
```

---

# 🔑 TECHNIQUE 6: OUTPUT FORMAT CONTROL

Tell AI **HOW** to respond.

---

### Template

```
Output format:
1. Explain architecture briefly
2. Provide complete HTML
3. Provide complete CSS
4. Provide complete JavaScript
5. Explain key parts step by step
```

---

# 🔥 MASTER PROMPT (FULL WEBSITE GENERATOR)

### ✅ COPY-PASTE THIS

```
Act as a senior frontend engineer and UI/UX designer.

Goal:
Build a beginner-friendly interactive website.

Audience:
Students learning HTML, CSS, and JavaScript.

Constraints:
- Use only HTML, CSS, and vanilla JavaScript
- Beginner-friendly code
- No frameworks or libraries
- Clean, readable, and commented code

Features:
- Interactive UI
- DOM manipulation
- CSS class toggling
- Real-world behavior

Design rules:
- Mobile-first
- Modern, minimal UI
- Good spacing and typography
- Smooth hover and transition effects

Output format:
1. Brief explanation of the project
2. Complete HTML
3. Complete CSS
4. Complete JavaScript
4. Step-by-step explanation of logic
```

---

# 🧠 TECHNIQUE 7: BUILD IN ITERATIONS (CRITICAL)

Never ask for **everything at once**.

---

### ❌ Bad

> “Build full website with everything”

### ✅ Good

```
Step 1: Create HTML structure only.
Do not include CSS or JS yet.
```

Then:

```
Step 2: Add CSS styling only.
```

Then:

```
Step 3: Add JavaScript interactivity.
```

🔥 This mimics **real development**

---

# 🧠 TECHNIQUE 8: FORCE DATA-DRIVEN UI (PRO LEVEL)

```
Do not hardcode repeated HTML.
Store data in JavaScript arrays and render UI using map().
```

This gives **React-level thinking**.

---

# 🧠 TECHNIQUE 9: DEBUGGING PROMPTS (UNDERRATED)

```
Here is my code.
Do not rewrite everything.
Only point out mistakes and explain why they occur.
```

or

```
Fix this code with minimal changes and explain each fix.
```

---

# 🧠 TECHNIQUE 10: DESIGN IMPROVEMENT PROMPTS

```
Improve the UI while keeping the same HTML structure.
Only modify CSS.
Explain your design choices.
```

---

# 🎯 REAL EXAMPLE: LANDING PAGE PROMPT

```
Act as a senior UI/UX designer.

Build a modern landing page for a startup.

Constraints:
- HTML + CSS only
- No JavaScript
- Beginner-friendly
- Mobile-first

Sections:
- Hero
- Features
- Call to action
- Footer

Design:
- Clean typography
- Soft shadows
- Modern gradient
- Professional spacing

Explain layout decisions briefly.
```

---

# 🧠 AI PAIR-PROGRAMMING PROMPT (BEST PRACTICE)

```
You are my coding partner.
Do not jump ahead.
Wait for my confirmation after each step.
Explain like I am learning.
```

---

# 🧠 COMMON MISTAKES (AVOID THESE)

❌ Vague prompts
❌ One-line requests
❌ Asking everything at once
❌ No constraints
❌ No output format

---

# 🧠 ONE-LINE GOLDEN RULE

> **Better prompt = better website**

---

# 🚀 NEXT LEVEL (Choose One)

1️⃣ Prompting for **React websites**
2️⃣ Prompting for **UI/UX design systems**
3️⃣ Prompting for **SaaS dashboards**
4️⃣ Prompting for **animations**
5️⃣ Turning prompts into **product specs**
