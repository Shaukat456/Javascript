---
---

# 🧠 **1. Basic Git & GitHub Questions**

**Q1: What is Git?**
**A:** Git is a **distributed version control system**. It tracks changes in code, allows multiple people to work together, and helps manage different versions of a project.

**Q2: What is GitHub?**
**A:** GitHub is an **online platform** for hosting Git repositories. It enables collaboration, pull requests, code reviews, and remote backup.

**Q3: Difference between Git and GitHub?**

| Git                    | GitHub                         |
| ---------------------- | ------------------------------ |
| Version control system | Cloud platform to host repos   |
| Works locally          | Works online                   |
| Tracks commits         | Hosts repositories for sharing |

**Q4: What is a commit?**
**A:** A commit is a **snapshot of your project** at a specific point in time.

**Q5: What is a branch?**
**A:** A branch is an **independent line of development**. You can work on new features without affecting the main branch.

---

# 🧠 **2. Commands Questions**

**Q6: How do you initialize a Git repository?**

```bash
git init
```

**Q7: How do you check the status of files?**

```bash
git status
```

**Q8: How do you stage and commit files?**

```bash
git add filename
git commit -m "message"
```

**Q9: How do you create a new branch and switch to it?**

```bash
git branch feature-login
git checkout feature-login
# or combined
git switch -c feature-login
```

**Q10: How do you push changes to GitHub?**

```bash
git remote add origin <repo-url>
git push -u origin main
```

---

# 🧠 **3. Merge Conflicts Questions**

**Q11: What is a merge conflict?**
**A:** A merge conflict occurs when **two branches change the same lines in a file**, and Git cannot decide which change to keep.

**Q12: How to resolve merge conflicts?**

**Step-by-step:**

1️⃣ Merge the branch:

```bash
git checkout main
git merge feature-login
```

2️⃣ Git will show conflict:

```
<<<<<<< HEAD
Main branch code
=======
Feature branch code
>>>>>>> feature-login
```

3️⃣ Open the file, choose which code to keep (or combine both)
4️⃣ After fixing:

```bash
git add filename
git commit -m "Resolve merge conflict"
```

**Diagram:**

```
main: o---o---o
feature-login:       o---o
                  \ /
                Conflict
After resolution: o---o---o---o
```

**Analogy:** Two people editing the same paragraph → must decide whose edits to keep.

---

# 🧠 **4. Undo Changes Questions**

**Q13: How to undo changes in a file?**

```bash
git restore filename    # unstage/restore file
```

**Q14: How to undo a commit?**

```bash
git reset --soft HEAD~1  # undo commit, keep changes staged
git reset --hard HEAD~1  # undo commit and discard changes
```

**Q15: How to revert a pushed commit?**

```bash
git revert <commit-id>
```

- Safe for shared branches
- Creates a new commit that **reverses changes**

---

# 🧠 **5. Advanced Questions**

**Q16: What is a detached HEAD?**

- HEAD points to a commit instead of a branch
- Commits in detached HEAD **won’t move branches** unless saved to a new branch

**Q17: Difference between `git pull` and `git fetch`?**

- `git fetch` → downloads remote changes **without merging**
- `git pull` → downloads **and merges** remote changes into local branch

**Q18: Difference between `git merge` and `git rebase`?**

- Merge → keeps history, creates merge commit
- Rebase → rewrites history to make it linear

**Q19: How does Git track changes internally?**

- Git tracks **commits** (snapshots of the project)
- Each commit stores a **hash ID, author, timestamp, and tree of files**

**Q20: How to handle large files in Git?**

- Use **Git LFS (Large File Storage)** for files like videos, datasets, etc.

---

# 🧠 **6. Practical Workflow Example (Interview Scenario)**

**Scenario:** You and a teammate are working on a website.

1. Clone repo from GitHub

```bash
git clone <repo-url>
```

2. Create feature branch

```bash
git switch -c feature-navbar
```

3. Make changes, commit

```bash
git add .
git commit -m "Add navbar"
```

4. Push to GitHub

```bash
git push origin feature-navbar
```

5. Open Pull Request → teammate reviews → merge

6. If conflict arises → resolve using steps in section 3

**Diagram:**

```
      GitHub
      ┌───────────────┐
      │   main branch │
      └───────────────┘
             ▲
             │ Pull
      -----------------
     |                 |
  Alice               Bob
feature-A          feature-B
      │ push           │ push
      ▼                 ▼
Merge & Conflict Resolution → main updated
```

---

# 🧠 **7. Key Tips for Interviews**

- **Always mention HEAD** in branch/commit questions
- **Draw diagrams** for merge, branch, and commit history
- **Mention merge conflict resolution** process explicitly
- Know **fetch vs pull**, `revert` vs `reset`, `merge` vs `rebase`
- Be ready to **explain practical workflow** for collaboration

---
