---
---

# 🧠 **1. What is HEAD in Git?**

**Definition:**

- `HEAD` is a **pointer** that tells Git **which commit or branch you are currently on**.
- Think of it as Git’s **current “you are here” marker**.

**Analogy:**

- Git = a map of your project history
- Commits = cities
- `HEAD` = your **current location on the map**

---

# 🧠 **2. HEAD Points to a Branch or Commit**

### Diagram – HEAD pointing to a branch

```
main
o---o---o  <-- HEAD (on main)
```

- Here `HEAD` points to the **main branch**, which in turn points to the latest commit.
- Any new commit moves the branch forward, and `HEAD` moves along.

---

### Diagram – HEAD pointing to a specific commit (detached HEAD)

```
main
o---o---o

HEAD
 |
 v
(commit id abc123)
```

- Detached HEAD = you are **looking at an older commit**, not a branch.
- Making commits here **won’t move the main branch** unless you create a new branch.

**Analogy:** Like taking a snapshot of an old page in your notebook — you can write notes, but it won’t affect the current notebook unless you save it to a new page.

---

# 🧠 **3. Checking HEAD**

```bash
git status
git log --oneline
```

- `git status` shows current branch → `HEAD` is there
- `git log --oneline` shows commits; `HEAD` points to the latest commit

```bash
git rev-parse HEAD
```

- Gives the **commit hash** where HEAD is currently pointing

---

# 🧠 **4. HEAD and Branches (Practical Example)**

```bash
git checkout main        # HEAD moves to main branch
git checkout -b feature  # Create and switch to feature branch
```

- Now HEAD points to `feature` branch
- Any commit moves `feature` forward, `HEAD` moves with it

---

# 🧠 **5. Detached HEAD Example**

```bash
git checkout abc123      # checkout a past commit by hash
git status
```

- `HEAD detached at abc123` → not on any branch
- Any new commits here are “floating”
- To save them → create a branch:

```bash
git checkout -b save-work
```

**Analogy:** Detached HEAD = writing on a **scratch paper**. If you don’t save it, it might get lost.

---

# 🧠 **6. Visual Summary**

```
# Normal HEAD
main
o---o---o  <-- HEAD

# Detached HEAD
main
o---o---o
     ^
    HEAD (not on branch)
```

- Normal HEAD → points to branch → safe
- Detached HEAD → points to commit → temporary

---

# 🧠 **7. Key Points**

1. HEAD always **points to the current branch or commit**
2. New commits move the branch and HEAD forward
3. Detached HEAD → commits don’t affect any branch unless saved
4. Many Git commands implicitly **use HEAD** (checkout, reset, commit, revert)

---

# 🧠 **8. Interview Questions Around HEAD**

1. What is HEAD in Git?
2. What happens if HEAD is detached?
3. How do you move HEAD to another branch?
4. Explain HEAD vs branch pointer
5. How do you recover a commit from a detached HEAD?

---
