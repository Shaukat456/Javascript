# Git & GitHub Complete Guide

## Table of Contents

1. [What is Git?](#what-is-git)
2. [What is GitHub?](#what-is-github)
3. [Git vs GitHub](#git-vs-github)
4. [Basic Git Concepts](#basic-git-concepts)
5. [Git Installation & Setup](#git-installation--setup)
6. [Essential Git Commands](#essential-git-commands)
7. [Working with Branches](#working-with-branches)
8. [Remote Repositories](#remote-repositories)
9. [GitHub Features](#github-features)
10. [Git Workflows](#git-workflows)
11. [Common Git Scenarios](#common-git-scenarios)
12. [Best Practices](#best-practices)

## What is Git?

**Git** is a distributed version control system that tracks changes in files and coordinates work among multiple people. It's like having a time machine for your code!

### Why Git?

- **Track Changes**: See what changed, when, and who changed it
- **Backup**: Never lose your work again
- **Collaboration**: Multiple people can work on the same project
- **Branching**: Work on different features simultaneously
- **History**: Go back to any previous version of your code

### Key Features:

- **Distributed**: Every copy is a complete backup
- **Fast**: Optimized for speed and efficiency
- **Reliable**: Data integrity through checksums
- **Branching**: Lightweight and fast branching
- **Merging**: Intelligent merge capabilities

## What is GitHub?

**GitHub** is a cloud-based platform that hosts Git repositories and adds collaboration features on top of Git.

### GitHub Features:

- **Repository Hosting**: Store your Git repos in the cloud
- **Issue Tracking**: Track bugs and feature requests
- **Pull Requests**: Code review and collaboration
- **Actions**: Automated workflows (CI/CD)
- **Pages**: Host static websites
- **Projects**: Project management tools
- **Wiki**: Documentation
- **Security**: Vulnerability scanning and security alerts

## Git vs GitHub

| Git                    | GitHub                          |
| ---------------------- | ------------------------------- |
| Version control system | Hosting platform for Git        |
| Command-line tool      | Web-based interface             |
| Local repositories     | Remote repositories             |
| Works offline          | Requires internet               |
| Free and open-source   | Free tier + paid plans          |
| Core functionality     | Enhanced collaboration features |

## Basic Git Concepts

### Repository (Repo)

A directory that contains your project files and the complete history of changes.

### Working Directory

The current state of your files that you're actively editing.

### Staging Area (Index)

A temporary area where you prepare changes before committing them.

### Commit

A snapshot of your project at a specific point in time.

### Branch

A parallel version of your repository, allowing you to work on different features.

### Merge

Combining changes from different branches.

### Remote

A version of your repository hosted on a server (like GitHub).

### Clone

Creating a local copy of a remote repository.

### Fork

Creating your own copy of someone else's repository.

### Pull Request (PR)

A request to merge your changes into another repository.

## Git Installation & Setup

### Installation

**Windows:**

```bash
# Download from https://git-scm.com/download/windows
# Or use package manager
winget install Git.Git
```

**macOS:**

```bash
# Using Homebrew
brew install git

# Or download from https://git-scm.com/download/mac
```

**Linux:**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git

# CentOS/RHEL
sudo yum install git
```

### Initial Configuration

```bash
# Set your name and email (required)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Set default editor
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "nano"         # Nano

# Check configuration
git config --list
```

## Essential Git Commands

### Repository Commands

```bash
# Initialize a new repository
git init

# Clone an existing repository
git clone <repository-url>
git clone https://github.com/username/repo-name.git

# Check repository status
git status

# View commit history
git log
git log --oneline  # Compact view
git log --graph    # Visual graph
```

### Working with Changes

```bash
# Add files to staging area
git add <filename>        # Add specific file
git add .                # Add all files
git add *.js             # Add all JavaScript files

# Remove files from staging area
git reset <filename>     # Unstage specific file
git reset               # Unstage all files

# Commit changes
git commit -m "Your commit message"
git commit -am "Add and commit in one step"

# View differences
git diff                # Working directory vs staging
git diff --staged       # Staging area vs last commit
git diff HEAD~1         # Current vs previous commit
```

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- <filename>
git restore <filename>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (creates new commit)
git revert <commit-hash>
```

## Working with Branches

### Branch Commands

```bash
# List branches
git branch              # Local branches
git branch -r           # Remote branches
git branch -a           # All branches

# Create a new branch
git branch <branch-name>
git checkout -b <branch-name>  # Create and switch
git switch -c <branch-name>    # Modern syntax

# Switch branches
git checkout <branch-name>
git switch <branch-name>       # Modern syntax

# Delete a branch
git branch -d <branch-name>    # Safe delete
git branch -D <branch-name>    # Force delete
```

### Merging Branches

```bash
# Merge a branch into current branch
git merge <branch-name>

# Create a merge commit even for fast-forward
git merge --no-ff <branch-name>

# Abort a merge in case of conflicts
git merge --abort
```

### Resolving Merge Conflicts

When Git can't automatically merge changes:

1. **Identify conflicted files:**

   ```bash
   git status
   ```

2. **Edit files to resolve conflicts:**

   ```
   <<<<<<< HEAD
   Your changes
   =======
   Other changes
   >>>>>>> branch-name
   ```

3. **Mark as resolved and commit:**
   ```bash
   git add <resolved-file>
   git commit -m "Resolve merge conflict"
   ```

## Remote Repositories

### Working with Remotes

```bash
# Add a remote repository
git remote add origin <repository-url>

# List remotes
git remote -v

# Remove a remote
git remote remove <remote-name>

# Rename a remote
git remote rename <old-name> <new-name>
```

### Pushing and Pulling

```bash
# Push changes to remote
git push origin <branch-name>
git push origin main
git push -u origin main  # Set upstream tracking

# Pull changes from remote
git pull origin <branch-name>
git pull  # From tracked branch

# Fetch changes without merging
git fetch origin
git fetch --all
```

## GitHub Features

### Creating a Repository

1. **On GitHub:**

   - Click "New repository"
   - Choose name and settings
   - Click "Create repository"

2. **Connect local repo:**
   ```bash
   git remote add origin https://github.com/username/repo-name.git
   git branch -M main
   git push -u origin main
   ```

### Pull Requests

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/new-feature
   # Make changes and commit
   git push origin feature/new-feature
   ```

2. **Create PR on GitHub:**

   - Go to repository on GitHub
   - Click "Compare & pull request"
   - Add description and submit

3. **Review and merge:**
   - Team reviews code
   - Address feedback
   - Merge when approved

### Issues

Track bugs, features, and tasks:

- **Create Issue**: Describe problem or feature
- **Assign**: Assign to team members
- **Labels**: Categorize (bug, enhancement, etc.)
- **Milestones**: Group issues by release
- **Link to PRs**: Reference issues in commits

### GitHub Actions

Automate workflows:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"
      - run: npm install
      - run: npm test
```

## Git Workflows

### Feature Branch Workflow

1. Create feature branch from main
2. Work on feature and commit changes
3. Push branch to remote
4. Create pull request
5. Review and merge
6. Delete feature branch

```bash
# Start new feature
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# Work and commit
git add .
git commit -m "Add user login functionality"
git push origin feature/user-authentication

# After merge, cleanup
git checkout main
git pull origin main
git branch -d feature/user-authentication
```

### Gitflow Workflow

More structured approach with specific branch types:

- **main**: Production-ready code
- **develop**: Integration branch
- **feature/**: New features
- **release/**: Prepare releases
- **hotfix/**: Emergency fixes

### GitHub Flow

Simpler workflow:

1. Create branch from main
2. Make changes and commit
3. Open pull request
4. Review and discuss
5. Merge to main
6. Deploy

## Common Git Scenarios

### Scenario 1: Starting a New Project

```bash
# Option 1: Start locally
mkdir my-project
cd my-project
git init
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/username/my-project.git
git push -u origin main

# Option 2: Start on GitHub
git clone https://github.com/username/my-project.git
cd my-project
# Start working
```

### Scenario 2: Contributing to Open Source

```bash
# 1. Fork repository on GitHub
# 2. Clone your fork
git clone https://github.com/your-username/original-repo.git
cd original-repo

# 3. Add upstream remote
git remote add upstream https://github.com/original-owner/original-repo.git

# 4. Create feature branch
git checkout -b fix/bug-description

# 5. Make changes and commit
git add .
git commit -m "Fix: description of bug fix"

# 6. Push to your fork
git push origin fix/bug-description

# 7. Create pull request on GitHub

# 8. Keep fork updated
git checkout main
git pull upstream main
git push origin main
```

### Scenario 3: Emergency Hotfix

```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# Fix the bug
# ... make changes ...
git add .
git commit -m "Hotfix: resolve critical security issue"

# Push and create PR
git push origin hotfix/critical-bug
# Create PR on GitHub for immediate review and merge
```

### Scenario 4: Collaborative Development

```bash
# Start of day: sync with remote
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/shopping-cart

# Work and push regularly
git add .
git commit -m "Add cart item component"
git push origin feature/shopping-cart

# Before merging: sync with latest main
git checkout main
git pull origin main
git checkout feature/shopping-cart
git merge main  # or git rebase main

# Resolve any conflicts, then push
git push origin feature/shopping-cart
```

## Best Practices

### Commit Messages

**Good commit messages:**

```
feat: add user authentication system
fix: resolve memory leak in image processing
docs: update installation instructions
style: format code according to style guide
refactor: extract utility functions to separate module
test: add unit tests for payment processing
```

**Bad commit messages:**

```
fix
update
changes
asdf
work in progress
```

### Commit Guidelines

- **Atomic commits**: One logical change per commit
- **Descriptive messages**: Explain what and why, not how
- **Present tense**: "Add feature" not "Added feature"
- **Imperative mood**: "Fix bug" not "Fixes bug"
- **Reference issues**: "Fix #123: resolve login error"

### Branch Naming

```bash
# Good branch names
feature/user-authentication
fix/login-button-styling
hotfix/security-vulnerability
docs/api-documentation
refactor/payment-processing

# Bad branch names
fix
my-branch
test123
branch1
```

### .gitignore Best Practices

```gitignore
# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
*.exe
*.dll

# Environment files
.env
.env.local
.env.production

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Temporary files
tmp/
temp/
```

### Security Best Practices

- **Never commit secrets**: API keys, passwords, tokens
- **Use .gitignore**: Prevent sensitive files from being tracked
- **Environment variables**: Store secrets in environment variables
- **Scan for secrets**: Use tools like git-secrets or GitHub's secret scanning
- **Review commits**: Check what you're committing before pushing

### Repository Organization

```
project-root/
├── .github/
│   ├── workflows/     # GitHub Actions
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/              # Documentation
├── src/               # Source code
├── tests/             # Test files
├── .gitignore
├── README.md
├── LICENSE
└── package.json       # Project metadata
```

### README.md Template

````markdown
# Project Name

Brief description of what this project does.

## Installation

```bash
npm install
```
````

## Usage

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

````

## Advanced Git Topics

### Rebasing

Rewriting commit history for cleaner project history:

```bash
# Interactive rebase to edit last 3 commits
git rebase -i HEAD~3

# Rebase feature branch onto main
git checkout feature-branch
git rebase main
````

### Stashing

Temporarily save changes without committing:

```bash
# Stash current changes
git stash

# List stashes
git stash list

# Apply latest stash
git stash pop

# Apply specific stash
git stash apply stash@{1}
```

### Cherry-picking

Apply specific commits to current branch:

```bash
# Apply specific commit to current branch
git cherry-pick <commit-hash>

# Cherry-pick multiple commits
git cherry-pick <commit1> <commit2>
```

### Submodules

Include other Git repositories as subdirectories:

```bash
# Add submodule
git submodule add https://github.com/user/repo.git path/to/submodule

# Clone repository with submodules
git clone --recursive <repository-url>

# Update submodules
git submodule update --init --recursive
```

## Troubleshooting Common Issues

### "Repository not found"

- Check repository URL
- Verify access permissions
- Ensure you're authenticated

### Merge conflicts

- Use `git status` to see conflicted files
- Edit files to resolve conflicts
- Add resolved files and commit

### Accidentally committed sensitive data

```bash
# Remove file from history (dangerous!)
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch path/to/file' \
--prune-empty --tag-name-filter cat -- --all

# Better: Use BFG Repo-Cleaner or GitHub support
```

### Large file issues

- Use Git LFS for large files
- Remove large files from history
- Use .gitignore to prevent future issues

### Detached HEAD state

```bash
# Create branch from detached HEAD
git checkout -b new-branch-name

# Or return to main branch
git checkout main
```

This comprehensive guide covers everything you need to know about Git and GitHub, from basic concepts to advanced workflows and best practices!
