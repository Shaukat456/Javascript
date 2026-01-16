--

# 🧠 **1. Git Basics – Local Repository**

### Diagram:

```
Project Folder (local)
┌────────────┐
│  index.html│
│  style.css │
│  script.js │
└────────────┘
         │ git init
         ▼
   Local Git Repository (.git folder created)
```

- `git init` → creates `.git` folder
- `.git` tracks all changes
- Local repository = your **private notebook**

**Analogy:** You start keeping a journal of every change you make in your project.

---

# 🧠 **2. Git Workflow (Stage → Commit → Log)**

### Diagram:

```
Working Directory          Staging Area         Git Repository
(index.html changed)    (git add index.html)  (git commit)
       │                       │                   │
       ▼                       ▼                   ▼
  Modified file           Ready to commit       Saved snapshot
```

**Commands:**

```bash
git status
git add index.html
git commit -m "Add homepage"
```

**Analogy:**

- Working directory → rough draft
- Staging area → marked for review
- Commit → take a photo for the timeline

---

# 🧠 **3. Git Branches**

### Diagram:

```
main
  │
  │
  ├── feature-login
  │
  └── feature-navbar
```

- Main branch = published version
- Feature branches = working on new parts

**Commands:**

```bash
git branch feature-login    # create branch
git checkout feature-login  # switch to branch
```

**Analogy:** Each branch = a **new chapter of your book**. You can write independently without affecting the main story.

---

# 🧠 **4. Git Merge**

### Diagram:

```
      main
       │
       ▼
   "Old version"
       │
  Merge feature-login
       │
       ▼
      main
   "Updated with login feature"
```

**Commands:**

```bash
git checkout main
git merge feature-login
```

**Analogy:** Merge = combining your new chapter with the main story. If two chapters conflict → resolve conflict manually.

---

# 🧠 **5. GitHub – Remote Repository**

### Diagram:

```
Local Repo                    Remote Repo (GitHub)
┌────────────┐                ┌────────────┐
│ index.html │ <--push-->     │ index.html │
│ style.css  │                │ style.css  │
│ script.js  │                │ script.js  │
└────────────┘                └────────────┘
```

**Commands:**

```bash
git remote add origin https://github.com/username/repo.git
git push -u origin main
git pull origin main
```

**Analogy:** Local repo = your notebook
Remote repo = cloud library where others can read or contribute

---

# 🧠 **6. Collaboration Workflow**

### Diagram:

```
          GitHub
          ┌───────────────┐
          │   main branch │
          └───────────────┘
                 ▲
                 │ Pull
         ---------------------
        |                     |
     Alice                  Bob
 ┌─────────────┐        ┌─────────────┐
 │ local repo  │        │ local repo  │
 │ feature-A   │        │ feature-B   │
 └─────────────┘        └─────────────┘
        │ push                  │ push
        ▼                       ▼
      Pull Request & Merge → GitHub main
```

- Developers work on **branches**
- Push branches to GitHub
- Open **Pull Requests (PRs)**
- Review → Merge → Main updated

**Analogy:** Each contributor writes a chapter, submits it for editor review → published in the final book.

---

# 🧠 **7. Undo / Restore Changes**

### Diagram:

```
Working Directory
┌────────────┐
│ index.html │  (modified)
└────────────┘
       │ git restore index.html
       ▼
┌────────────┐
│ index.html │  (restored)
└────────────┘
```

**Analogy:** Undo = erasing the draft page and restoring original version from your notebook.

---

# 🧠 **8. Git Cheat Sheet (Visual)**

```
git init       → initialize repo
git status     → check changes
git add        → stage files
git commit     → save snapshot
git branch     → create branch
git checkout   → switch branch
git merge      → combine branches
git remote add → connect GitHub
git push       → upload code
git pull       → fetch latest
```

**Analogy:** Think of Git as a **timeline + multiple drafts + cloud library**.
