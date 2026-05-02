# ⚛️ Atomic Design Thinking with Tailwind CSS

### A Beginner's Step-by-Step Guide to Building UIs That Scale

> **What you'll learn:** How to think about UI in layers — from the tiniest
> button to a full page — using Atomic Design methodology combined with
> Tailwind CSS utility classes.
>
> **Project:** We'll build pieces of a real **Job Board UI** (like LinkedIn or Rozee.pk)
> as our running example throughout this guide.
>
> **Prerequisites:** Basic HTML, basic React (JSX), Tailwind CSS installed.

---

## The Problem This Solves

Imagine you're building a large website. You have:

- A button on the homepage
- The same button in a form
- The same button in a modal
- The same button in a card

Without a system, you copy-paste styles everywhere.
Then the client says _"make all buttons rounded"_ — and you update 40 places.

**Atomic Design** gives you a system.
**Tailwind CSS** gives you the tools.
Together, they make your UI **consistent**, **maintainable**, and **fast to build**.

---

## What is Atomic Design?

Atomic Design was created by Brad Frost. The idea is borrowed from chemistry:

> Everything in the universe is made of **atoms**.
> Atoms combine to form **molecules**.
> Molecules combine to form **organisms**.
> Organisms are arranged into **templates**.
> Templates filled with real content become **pages**.

In UI terms:

| Level         | Chemistry Analogy     | UI Example                   |
| ------------- | --------------------- | ---------------------------- |
| **Atoms**     | Single element (H, O) | Button, Input, Badge, Avatar |
| **Molecules** | Two atoms bonded      | Search bar (Input + Button)  |
| **Organisms** | Group of molecules    | Job Card, Navbar, Footer     |
| **Templates** | Page skeleton         | Job Listing Layout           |
| **Pages**     | Template + real data  | The actual Job Board page    |

---

## Folder Structure

This is how you organise your project files using Atomic Design.
Every level gets its own folder. Never mix levels.

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── Avatar.jsx
│   │   ├── Input.jsx
│   │   └── Tag.jsx
│   │
│   ├── molecules/
│   │   ├── SearchBar.jsx
│   │   ├── JobMeta.jsx
│   │   └── FormField.jsx
│   │
│   ├── organisms/
│   │   ├── JobCard.jsx
│   │   ├── Navbar.jsx
│   │   └── JobFilters.jsx
│   │
│   ├── templates/
│   │   └── JobListingTemplate.jsx
│   │
│   └── pages/
│       └── JobBoardPage.jsx
│
├── styles/
│   └── globals.css       ← Tailwind base imports live here
│
└── App.jsx
```

> **Golden Rule of Folder Structure:**
> A component should only import from levels **below** it.
> A `molecule` can import `atoms`.
> An `organism` can import `molecules` and `atoms`.
> A `template` can import `organisms`, `molecules`, and `atoms`.
> **Never** let an atom import a molecule. That breaks the hierarchy.

---

## Setting Up Tailwind CSS

If you're starting fresh with Vite + React:

```bash
npm create vite@latest job-board -- --template react
cd job-board
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**`tailwind.config.js`** — tell Tailwind which files to scan:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan ALL files in src
  ],
  theme: {
    extend: {
      // We'll add custom colours here later
      colors: {
        brand: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};
```

**`src/styles/globals.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**`src/main.jsx`** — import the CSS:

```jsx
import "./styles/globals.css";
```

---

## Level 1 — Atoms 🔵

> **What is an Atom?**
> The smallest possible UI piece that still makes sense on its own.
> An atom has **no children components** — only HTML elements and Tailwind classes.
> It accepts **props** to make it flexible.

---

### Atom 1 — Button

The most common atom in any UI. One component, all variants.

```jsx
// src/components/atoms/Button.jsx

// We define all visual variants as a lookup object
// This keeps all style logic in ONE place
const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 border-transparent",
  secondary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 border-transparent",
  ghost: "bg-transparent text-brand-600 hover:bg-brand-50 border-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

function Button({
  children,
  variant = "primary", // default variant
  size = "md", // default size
  disabled = false,
  fullWidth = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-lg border
        transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
```

> **Why build it this way?**
>
> Notice the `variants` and `sizes` objects at the top. All style decisions
> live there — not buried inside `className`. When the designer says
> "make the primary button darker", you change **one line** in `variants.primary`.
>
> The `disabled:` and `focus:` Tailwind prefixes handle accessibility states
> automatically — no extra JavaScript needed.

**How you use it:**

```jsx
<Button variant="primary" size="lg">Apply Now</Button>
<Button variant="secondary">Save Job</Button>
<Button variant="danger" size="sm">Remove</Button>
<Button variant="ghost">Learn More</Button>
<Button disabled>Applications Closed</Button>
```

---

### Atom 2 — Badge

Small coloured labels for tags like "Full-time", "Remote", "New".

```jsx
// src/components/atoms/Badge.jsx

const colours = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  red: "bg-red-100 text-red-800",
  gray: "bg-gray-100 text-gray-700",
  purple: "bg-purple-100 text-purple-800",
};

function Badge({ label, colour = "gray" }) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        rounded-full text-xs font-medium
        ${colours[colour]}
      `}
    >
      {label}
    </span>
  );
}

export default Badge;
```

> **Why is Badge an atom and not just inline Tailwind?**
> You could write `<span className="bg-blue-100 text-blue-800 ...">Full-time</span>`
> everywhere. But then if the designer changes the badge style, you hunt
> through 50 files. The Badge atom means you change it once, everywhere updates.

**How you use it:**

```jsx
<Badge label="Full-time" colour="blue" />
<Badge label="Remote" colour="green" />
<Badge label="Urgent" colour="red" />
<Badge label="New" colour="yellow" />
```

---

### Atom 3 — Avatar

A profile picture with a fallback to initials.

```jsx
// src/components/atoms/Avatar.jsx

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
};

function Avatar({ src, alt, initials, size = "md" }) {
  // If an image src is provided, show the image
  // Otherwise fall back to initials (great for companies without logos)
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeMap[size]} rounded-full object-cover ring-2 ring-white`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeMap[size]}
        rounded-full bg-brand-600 text-white
        flex items-center justify-center
        font-semibold ring-2 ring-white
      `}
    >
      {initials}
    </div>
  );
}

export default Avatar;
```

> **The fallback pattern is important.**
> Real-world apps have missing images constantly — startups don't always have logos.
> Building the fallback into the atom means you handle it once, not every time
> you display a company logo.

---

### Atom 4 — Input

A single text input field (just the input itself, not its label — that's a molecule).

```jsx
// src/components/atoms/Input.jsx

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  hasError = false,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full px-3 py-2
        text-sm text-gray-900
        bg-white border rounded-lg
        placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        transition-colors duration-150
        ${hasError ? "border-red-400 focus:ring-red-400" : "border-gray-300"}
      `}
    />
  );
}

export default Input;
```

> **`hasError` prop changes the visual state.**
> Notice how the border colour switches from `border-gray-300` to `border-red-400`
> based on a prop — not a CSS class toggled manually. The atom owns its own states.

---

## Level 2 — Molecules 🟡

> **What is a Molecule?**
> A molecule is a group of **2 or more atoms** working together as a unit.
> Each molecule has **one clear job**.
> It imports atoms — never other molecules or organisms.

---

### Molecule 1 — SearchBar

The classic combination: an Input atom + a Button atom.

```jsx
// src/components/molecules/SearchBar.jsx

import Input from "../atoms/Input";
import Button from "../atoms/Button";

function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search jobs...",
}) {
  // Handle pressing Enter key inside the input
  function handleKeyDown(e) {
    if (e.key === "Enter") onSearch();
  }

  return (
    // The molecule controls the LAYOUT of its atoms
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button variant="primary" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
```

> **The molecule owns the layout — atoms own the appearance.**
> The Input atom doesn't know it's inside a search bar.
> The Button atom doesn't know it triggers a search.
> The SearchBar molecule _connects_ them and owns the `flex gap-2` layout.
> This separation is the core idea of Atomic Design.

---

### Molecule 2 — JobMeta

A small info cluster showing job metadata: location, salary, job type.
Reused inside every job card.

```jsx
// src/components/molecules/JobMeta.jsx

import Badge from "../atoms/Badge";

// A tiny internal helper — just an icon + text pair
// Too small to be its own atom, only used here
function MetaItem({ icon, text }) {
  return (
    <span className="flex items-center gap-1 text-sm text-gray-500">
      <span className="text-gray-400">{icon}</span>
      {text}
    </span>
  );
}

function JobMeta({ location, salary, jobType, isRemote }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <MetaItem icon="📍" text={location} />
      <MetaItem icon="💰" text={salary} />
      <Badge
        label={jobType}
        colour={jobType === "Full-time" ? "blue" : "yellow"}
      />
      {isRemote && <Badge label="Remote" colour="green" />}
    </div>
  );
}

export default JobMeta;
```

> **Why not just put all this inside the JobCard?**
> Because job metadata might appear in other places too — a job detail page,
> a search result snippet, an email template. By extracting it as a molecule,
> you can drop `<JobMeta />` anywhere without duplicating the layout logic.

---

### Molecule 3 — FormField

Label + Input + error message. Used in any form across the app.

```jsx
// src/components/molecules/FormField.jsx

import Input from "../atoms/Input";

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      {/* Label — tied to the input via htmlFor/id for accessibility */}
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hasError={!!error}
      />

      {/* Error message only renders if there's an error */}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

export default FormField;
```

> **`!!error` converts the error string to a boolean.**
> `hasError={!!error}` means: if `error` is an empty string or undefined,
> `hasError` is `false`. If error has content, `hasError` is `true`.
> The Input atom only receives a boolean — it doesn't care about the message.
> The FormField molecule manages the message display.

---

## Level 3 — Organisms 🟠

> **What is an Organism?**
> A **complex, self-contained section** of the UI.
> Organisms are meaningful standalone pieces — a job card, a navbar, a sidebar.
> They combine molecules and atoms, and they often manage their own **state**.

---

### Organism 1 — JobCard

The centrepiece of any job board. This is what users actually interact with.

```jsx
// src/components/organisms/JobCard.jsx

import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import JobMeta from "../molecules/JobMeta";

function JobCard({ job }) {
  // Destructure everything from the job prop at the top
  // Clean and readable — no job.title, job.company etc throughout
  const {
    title,
    company,
    logo,
    location,
    salary,
    jobType,
    isRemote,
    postedDate,
    isNew,
    tags,
  } = job;

  return (
    <article
      className="
      bg-white rounded-xl border border-gray-200
      p-5 flex flex-col gap-4
      hover:shadow-md hover:border-brand-200
      transition-all duration-200
      cursor-pointer
    "
    >
      {/* Card Header: Company logo + name + posted date */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src={logo}
            alt={`${company} logo`}
            initials={company.slice(0, 2).toUpperCase()}
            size="md"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{company}</p>
            <p className="text-xs text-gray-400">{postedDate}</p>
          </div>
        </div>

        {/* "New" badge only appears for recent listings */}
        {isNew && <Badge label="New" colour="yellow" />}
      </div>

      {/* Job Title */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {title}
        </h3>
      </div>

      {/* Metadata row: location, salary, job type badges */}
      <JobMeta
        location={location}
        salary={salary}
        jobType={jobType}
        isRemote={isRemote}
      />

      {/* Skill Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} label={tag} colour="gray" />
          ))}
        </div>
      )}

      {/* Card Footer: Action buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <Button variant="primary" size="sm" fullWidth>
          Apply Now
        </Button>
        <Button variant="secondary" size="sm">
          Save
        </Button>
      </div>
    </article>
  );
}

export default JobCard;
```

> **The organism receives a single `job` prop and handles everything internally.**
> The caller doesn't assemble the card piece by piece —
> they just pass one clean data object. This is called **encapsulation**.
> From the outside: `<JobCard job={jobData} />`. Simple.
> The complexity is hidden inside the organism.

**The `job` data shape it expects:**

```js
const jobData = {
  title: "Senior Frontend Developer",
  company: "TechCorp",
  logo: "https://...", // or null for initials fallback
  location: "Karachi, Pakistan",
  salary: "PKR 250k – 350k",
  jobType: "Full-time",
  isRemote: true,
  postedDate: "2 days ago",
  isNew: true,
  tags: ["React", "TypeScript", "Tailwind"],
};
```

---

### Organism 2 — Navbar

The site-wide navigation bar.

```jsx
// src/components/organisms/Navbar.jsx

import Button from "../atoms/Button";
import Avatar from "../atoms/Avatar";

function Navbar({ user }) {
  // `user` is null when logged out, an object when logged in
  const isLoggedIn = !!user;

  return (
    <nav
      className="
      sticky top-0 z-50
      bg-white border-b border-gray-200
      px-4 md:px-8
    "
    >
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-brand-600 tracking-tight">
          JobBoard
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {["Find Jobs", "Companies", "Salary Guide"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-gray-600 hover:text-brand-600 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Side: Auth actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            // Logged-in state
            <>
              <Button variant="secondary" size="sm">
                Post a Job
              </Button>
              <Avatar
                src={user.avatar}
                initials={user.name.slice(0, 2).toUpperCase()}
                size="sm"
              />
            </>
          ) : (
            // Logged-out state
            <>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

> **`sticky top-0 z-50`** — Tailwind's positioning utilities keep the navbar
> fixed at the top as the user scrolls. `z-50` ensures it appears above cards
> and dropdowns below it. This is a common real-world pattern.

---

### Organism 3 — JobFilters

The sidebar filter panel. An organism because it has multiple molecules
and manages filter state.

```jsx
// src/components/organisms/JobFilters.jsx

import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

// Filter config — easy to extend by adding entries here
const filterGroups = [
  {
    label: "Job Type",
    key: "jobType",
    options: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  {
    label: "Experience",
    key: "experience",
    options: ["Entry Level", "Mid Level", "Senior", "Manager"],
  },
  {
    label: "Work Mode",
    key: "workMode",
    options: ["On-site", "Remote", "Hybrid"],
  },
];

function JobFilters({ activeFilters, onFilterChange, onClearAll }) {
  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
        <button
          onClick={onClearAll}
          className="text-xs text-brand-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Dynamic Filter Groups */}
      {filterGroups.map((group) => (
        <div key={group.key} className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const isActive = activeFilters[group.key] === option;
              return (
                <button
                  key={option}
                  onClick={() => onFilterChange(group.key, option)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium border
                    transition-colors duration-150
                    ${
                      isActive
                        ? "bg-brand-600 text-white border-brand-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-brand-400"
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}

export default JobFilters;
```

> **The filter config array `filterGroups` is defined outside the component.**
> Adding a new filter group (like "Salary Range") means adding one object
> to the array — no JSX changes. This is the "data-driven UI" pattern
> used in real production codebases.

---

## Level 4 — Templates 🔴

> **What is a Template?**
> A template is the **skeleton of a page** — layout only, no real data.
> It defines: where the navbar goes, where the sidebar goes, where cards go.
> It uses **slots** (children props) to accept organisms without caring what they are.

```jsx
// src/components/templates/JobListingTemplate.jsx

function JobListingTemplate({ navbar, filters, jobList, pagination }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar slot — render whatever navbar is passed in */}
      {navbar}

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Find your next opportunity
          </p>
        </div>

        {/* Two-column layout: filters sidebar + job list */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar — fixed width on desktop */}
          <aside className="w-full md:w-64 flex-shrink-0">{filters}</aside>

          {/* Job List — takes remaining space */}
          <section className="flex-1 flex flex-col gap-4">
            {jobList}

            {/* Pagination slot */}
            <div className="mt-4">{pagination}</div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default JobListingTemplate;
```

> **Why pass organisms as props instead of importing them directly?**
> The template doesn't know which navbar you'll use — maybe a recruiter sees
> a different navbar than a job seeker. Maybe on mobile the filters move
> to a drawer. By accepting organisms as props (`{navbar}`, `{filters}`),
> the template stays flexible and reusable across different scenarios.
>
> This pattern is called **Composition** — the template composes pieces
> without being tightly coupled to any of them.

---

## Level 5 — Pages 🟢

> **What is a Page?**
> A page is where everything comes together with **real data**.
> It imports the template, fills the slots with organisms,
> and feeds those organisms real (or fetched) data.
> Pages are the only level that should connect to APIs or state management.

```jsx
// src/components/pages/JobBoardPage.jsx

import { useState } from "react";

import JobListingTemplate from "../templates/JobListingTemplate";
import Navbar from "../organisms/Navbar";
import JobFilters from "../organisms/JobFilters";
import JobCard from "../organisms/JobCard";
import SearchBar from "../molecules/SearchBar";
import Button from "../atoms/Button";

// Sample data — in a real app this comes from an API call
const ALL_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: null,
    location: "Karachi, Pakistan",
    salary: "PKR 250k – 350k",
    jobType: "Full-time",
    isRemote: true,
    postedDate: "2 days ago",
    isNew: true,
    tags: ["React", "TypeScript", "Tailwind"],
    experience: "Senior",
    workMode: "Remote",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "StartupXYZ",
    logo: null,
    location: "Lahore, Pakistan",
    salary: "PKR 180k – 240k",
    jobType: "Full-time",
    isRemote: false,
    postedDate: "1 day ago",
    isNew: true,
    tags: ["Node.js", "MongoDB", "AWS"],
    experience: "Mid Level",
    workMode: "On-site",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignStudio",
    logo: null,
    location: "Islamabad, Pakistan",
    salary: "PKR 120k – 160k",
    jobType: "Contract",
    isRemote: true,
    postedDate: "5 days ago",
    isNew: false,
    tags: ["Figma", "Prototyping", "User Research"],
    experience: "Mid Level",
    workMode: "Hybrid",
  },
  {
    id: 4,
    title: "Junior React Developer",
    company: "AgencyHub",
    logo: null,
    location: "Karachi, Pakistan",
    salary: "PKR 80k – 110k",
    jobType: "Full-time",
    isRemote: false,
    postedDate: "3 days ago",
    isNew: false,
    tags: ["React", "JavaScript", "CSS"],
    experience: "Entry Level",
    workMode: "On-site",
  },
];

const LOGGED_IN_USER = {
  name: "Ahmed Khan",
  avatar: null,
};

function JobBoardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  // Filter jobs based on search and active filters
  const filteredJobs = ALL_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesJobType =
      !activeFilters.jobType || job.jobType === activeFilters.jobType;

    const matchesExperience =
      !activeFilters.experience || job.experience === activeFilters.experience;

    const matchesWorkMode =
      !activeFilters.workMode || job.workMode === activeFilters.workMode;

    return (
      matchesSearch && matchesJobType && matchesExperience && matchesWorkMode
    );
  });

  function handleFilterChange(key, value) {
    setActiveFilters((prev) => ({
      ...prev,
      // Toggle: if same filter is clicked again, remove it
      [key]: prev[key] === value ? undefined : value,
    }));
  }

  function handleClearAll() {
    setActiveFilters({});
    setSearchQuery("");
  }

  // Build each slot for the template
  const navbarSlot = <Navbar user={LOGGED_IN_USER} />;

  const filtersSlot = (
    <div className="flex flex-col gap-4">
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={() => {}} // search is live — no button action needed
        placeholder="Job title or company..."
      />
      <JobFilters
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
      />
    </div>
  );

  const jobListSlot = (
    <>
      <p className="text-sm text-gray-500">
        {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
      </p>
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-3xl mb-2">🔍</p>
          <p className="font-medium">No jobs match your filters</p>
          <p className="text-sm mt-1">
            Try adjusting your search or clearing filters
          </p>
        </div>
      )}
    </>
  );

  const paginationSlot = (
    <div className="flex justify-center gap-2">
      <Button variant="secondary" size="sm">
        ← Previous
      </Button>
      <Button variant="secondary" size="sm">
        Next →
      </Button>
    </div>
  );

  // Render: pass all slots into the template
  return (
    <JobListingTemplate
      navbar={navbarSlot}
      filters={filtersSlot}
      jobList={jobListSlot}
      pagination={paginationSlot}
    />
  );
}

export default JobBoardPage;
```

> **The page is the only place with `useState` and data.**
> Every level below it (template, organisms, molecules, atoms) is
> "dumb" — they receive data as props and display it. They don't
> fetch data, they don't manage global state.
>
> This separation means you can swap out the data source later
> (fake data → real API → database) without touching a single atom or molecule.

---

## The Mental Model — How to Think in Atomic Design

When you look at **any** UI, train yourself to break it into layers.

```
Look at a UI element and ask:

"Can I break this down further?"
     │
     ├── NO  → It's an Atom  (Button, Input, Badge, Avatar)
     │
     └── YES → Ask: "Does it have ONE job?"
                    │
                    ├── YES, combines 2-3 atoms → Molecule  (SearchBar, FormField)
                    │
                    └── NO, it's a complex section → Organism  (JobCard, Navbar)

Then:
"Is this just a layout skeleton?" → Template
"Does this have real data and logic?" → Page
```

---

## Common Beginner Mistakes

**❌ Mistake 1: Making atoms too smart**

```jsx
// WRONG — atom fetching its own data
function Button({ jobId }) {
  const job = fetch(`/api/jobs/${jobId}`); // ❌ atoms never fetch
  return <button>{job.title}</button>;
}

// RIGHT — atom only renders what it receives
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
```

**❌ Mistake 2: Skipping levels**

```jsx
// WRONG — jumping from atom straight to page
function JobBoardPage() {
  return (
    <div>
      {/* Building everything directly in the page */}
      <div className="flex ...">
        <input className="border ..." />
        <button className="bg-blue-500 ...">Search</button>
      </div>
    </div>
  );
}
```

```jsx
// RIGHT — compose through the levels
function JobBoardPage() {
  return (
    <JobListingTemplate
      filters={<SearchBar ... />}   // molecule used here
      jobList={jobs.map(j => <JobCard job={j} />)}  // organism
    />
  );
}
```

**❌ Mistake 3: Hardcoding styles in organisms**

```jsx
// WRONG — organism hardcodes the button style
function JobCard() {
  return (
    <div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Apply
      </button>
    </div>
  );
}

// RIGHT — organism uses the Button atom
function JobCard() {
  return (
    <div>
      <Button variant="primary" size="sm">
        Apply
      </Button>
    </div>
  );
}
```

---

## Quick Reference Card

```
ATOM         → Smallest unit. No children components. Has variants via props.
               Examples: Button, Badge, Avatar, Input, Tag, Spinner, Divider

MOLECULE     → 2+ atoms with ONE job. Owns the layout between its atoms.
               Examples: SearchBar, FormField, JobMeta, NavLink, AlertBanner

ORGANISM     → Complex section. Can have state. Combines molecules + atoms.
               Examples: JobCard, Navbar, Footer, Sidebar, Modal, DataTable

TEMPLATE     → Layout skeleton only. No real data. Uses slot props.
               Examples: JobListingTemplate, DashboardTemplate, AuthTemplate

PAGE         → Real data + state. Fills template slots with organisms.
               Examples: JobBoardPage, LoginPage, ProfilePage, DashboardPage
```

---

## What to Build Next

Now that you understand Atomic Design + Tailwind, practice by building these:

**Level 1 — Atoms only:**
Write a `Spinner`, a `Divider`, and a `Tooltip` atom from scratch.

**Level 2 — Molecule:**
Build a `PaginationBar` molecule using Button atoms: `← Prev | 1 2 3 | Next →`

**Level 3 — Organism:**
Build a `CompanyCard` organism showing a company logo, name, location,
number of open jobs, and a "View Jobs" button.

**Level 4 — Full page:**
Build a simple Login page using the hierarchy:
`Input` + `Button` atoms → `FormField` molecule → `LoginForm` organism →
`AuthTemplate` template → `LoginPage` page.

---

> 🎓 **The Atomic Design mindset is more important than the folder names.**
> The real skill is learning to look at any UI — Daraz, LinkedIn, YouTube —
> and instantly see the atoms, molecules, and organisms inside it.
> Once you see it, you can build anything systematically.
