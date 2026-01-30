---
---

# 🔥 REAL GIT MERGE CONFLICT — STEP BY STEP (FULL SIMULATION)

## 🧩 Scenario

Two developers edited the **same line** in `index.html`.

---

## 1️⃣ Initial State (Clean Project)

### File: `index.html`

```html
<h1>Welcome</h1>
```

### Git history

```
main
o
```

---

## 2️⃣ Create Feature Branch

```bash
git switch -c feature-text
```

### Diagram

```
main
o
 \
  feature-text (HEAD)
```

---

## 3️⃣ Change File in Feature Branch

### `index.html` (feature branch)

```html
<h1>Welcome User</h1>
```

```bash
git add index.html
git commit -m "Update welcome text"
```

### Diagram

```
main
o
 \
  o   feature-text (HEAD)
```

---

## 4️⃣ Switch Back to main & Make Conflicting Change

```bash
git switch main
```

### Edit `index.html` on main

```html
<h1>Welcome to Our Website</h1>
```

```bash
git add index.html
git commit -m "Improve welcome message"
```

### Diagram (⚠️ SAME LINE MODIFIED)

```
main
o───o
 \
  o   feature-text
```

---

## 5️⃣ Try to Merge (CONFLICT OCCURS)

```bash
git merge feature-text
```

### ❌ Git Output

```
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

---

## 6️⃣ What Git Did Internally

Git **paused the merge** and marked the conflict.

### `git status`

```bash
On branch main
You have unmerged paths.
```

---

## 7️⃣ Conflict Markers (VERY IMPORTANT)

### Open `index.html`

```html
<<<<<<< HEAD
<h1>Welcome to Our Website</h1>
=======
<h1>Welcome User</h1>
>>>>>>> feature-text
```

### What this means 👇

```
<<<<<<< HEAD
(main branch version)
=======
(feature-text version)
>>>>>>> feature-text
```

📌 **Git is asking YOU to decide**

---

## 8️⃣ Resolve the Conflict (Human Decision)

### Final decision (combine both ideas)

```html
<h1>Welcome User to Our Website</h1>
```

✅ Remove ALL markers
✅ Keep valid HTML only

---

## 9️⃣ Tell Git Conflict is Resolved

```bash
git add index.html
git commit -m "Resolve merge conflict in welcome text"
```

---

## 🔁 Final History (Clean & Merged)

```
main
o───o────o
     \  /
      o   feature-text
```

✔ Conflict resolved
✔ Merge completed
✔ main is stable again

---

## 🧠 WHY MERGE CONFLICTS HAPPEN (INTERVIEW ANSWER)

> A merge conflict occurs when Git cannot automatically merge changes because the **same lines in the same file were modified differently** in multiple branches.

---

## 🎯 INTERVIEW QUESTIONS (WITH PERFECT ANSWERS)

### Q1: What is a merge conflict?

**A:**
A situation where Git cannot automatically merge changes because the same code lines were edited differently.

---

### Q2: How do you resolve a merge conflict?

**A:**

1. Open conflicted files
2. Manually fix code
3. Remove conflict markers
4. `git add`
5. `git commit`

---

### Q3: Where do conflict markers come from?

**A:**
Git inserts them to show differences between `HEAD` (current branch) and the merging branch.

---

### Q4: Can Git resolve conflicts automatically?

**A:**
Only when changes are in **different lines or files**. Same-line changes need manual resolution.

---

### Q5: How do you abort a merge conflict?

```bash
git merge --abort
```

---

## 🚨 COMMON BEGINNER MISTAKES

❌ Committing without removing markers
❌ Editing wrong branch
❌ Forgetting `git add` after fix
❌ Panic 😄 (conflicts are NORMAL)

---

## 🧠 FINAL MENTAL MODEL

```
Branch A edits line X
Branch B edits line X
Git ❌ confused
Human ✔ decides
```

---

## ✅ YOU NOW KNOW:

✔ Real merge conflicts
✔ How Git shows them
✔ How to resolve safely
✔ How to explain in interviews

---
