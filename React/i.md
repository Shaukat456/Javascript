# ⚛️ React Mastery: From Scratch to Advanced

> **A complete job-ready curriculum** — every lesson includes concepts, best/bad practices, code examples, and interview Q&A.

---

## 📚 Course Curriculum Overview

| #   | Lesson                                                | Level        |
| --- | ----------------------------------------------------- | ------------ |
| 01  | What is React & Why Use It                            | Beginner     |
| 02  | JSX Deep Dive                                         | Beginner     |
| 03  | Components: Function vs Class                         | Beginner     |
| 04  | Props & PropTypes                                     | Beginner     |
| 05  | State & useState Hook                                 | Beginner     |
| 06  | Event Handling                                        | Beginner     |
| 07  | Conditional Rendering                                 | Beginner     |
| 08  | Lists & Keys                                          | Beginner     |
| 09  | Forms & Controlled Components                         | Intermediate |
| 10  | useEffect Hook                                        | Intermediate |
| 11  | useRef Hook                                           | Intermediate |
| 12  | useContext & Context API                              | Intermediate |
| 13  | useReducer Hook                                       | Intermediate |
| 14  | Custom Hooks                                          | Intermediate |
| 15  | React Router v6                                       | Intermediate |
| 16  | Performance Optimization (memo, useMemo, useCallback) | Advanced     |
| 17  | Code Splitting & Lazy Loading                         | Advanced     |
| 18  | Error Boundaries                                      | Advanced     |
| 19  | State Management with Zustand / Redux Toolkit         | Advanced     |
| 20  | Testing React Apps (Jest + RTL)                       | Advanced     |
| 21  | React Patterns (HOC, Render Props, Compound)          | Advanced     |
| 22  | React + TypeScript                                    | Advanced     |
| 23  | Accessibility (a11y) in React                         | Advanced     |
| 24  | Production Build & Deployment                         | Advanced     |

---

## Lesson 01 — What is React & Why Use It

### 🧠 Core Concepts

React is a **JavaScript library** (not a framework) for building user interfaces, created by Facebook (Meta) in 2013. It uses a **component-based architecture** and a **Virtual DOM** to efficiently update the real DOM.

```
Key Pillars of React
─────────────────────────────────────────────
  1. Declarative UI       — Describe what you want, React figures out how
  2. Component-Based      — Reusable, self-contained pieces of UI
  3. Unidirectional Flow  — Data flows down, events bubble up
  4. Virtual DOM          — In-memory diffing for efficient updates
─────────────────────────────────────────────
```

### How the Virtual DOM Works

```
  User Action
      │
      ▼
  React re-renders Virtual DOM (in memory, fast)
      │
      ▼
  Diffing Algorithm (Reconciliation)
      │
      ▼
  Only changed nodes updated in Real DOM (minimal, efficient)
```

### Setting Up a React Project

```bash
# Modern approach — Vite (recommended for 2024+)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Create React App (legacy, slower, still used in many companies)
npx create-react-app my-app
cd my-app
npm start
```

### Project Structure (Vite)

```
my-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.jsx          ← Root component
│   ├── main.jsx         ← Entry point (ReactDOM.createRoot)
│   └── index.css
├── index.html           ← Single HTML file (SPA shell)
├── vite.config.js
└── package.json
```

### ✅ Best Practices

- Use **Vite** for new projects — significantly faster HMR than CRA
- Keep `main.jsx` minimal — only mount the root component
- Use **strict mode** in development to catch potential issues

```jsx
// main.jsx — GOOD
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### ❌ Bad Practices

```jsx
// BAD — Rendering without StrictMode hides subtle bugs
createRoot(document.getElementById("root")).render(<App />);

// BAD — Putting business logic in main.jsx
import { fetchUser } from "./api";
fetchUser().then(/* ... */); // This belongs in a component or service
createRoot(document.getElementById("root")).render(<App />);
```

---

### 🎤 Interview Questions — Lesson 01

**Q1: What is React and how does the Virtual DOM work?**

> React is a declarative JavaScript library for building UIs. The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React creates a new Virtual DOM tree, diffs it against the previous one (reconciliation), and applies only the minimal set of changes to the real DOM — avoiding expensive full re-renders.

**Q2: What is the difference between a library and a framework?**

> A library (like React) gives you tools and you call them when needed — you're in control. A framework (like Angular) calls your code — it controls the flow (Inversion of Control). React only handles the View layer; you choose your own routing, state management, etc.

**Q3: Why choose React over vanilla JavaScript?**

> React provides: component reusability, declarative UI that's easier to reason about, efficient DOM updates via Virtual DOM, a massive ecosystem (Next.js, React Native), and strong tooling. Vanilla JS becomes unmaintainable at scale as manual DOM manipulation leads to spaghetti code.

**Q4: What does `StrictMode` do?**

> `StrictMode` is a development-only tool that: double-invokes render methods and lifecycle functions to detect side effects, warns about deprecated API usage, and identifies components with unsafe lifecycles. It has zero impact on production builds.

---

## Lesson 02 — JSX Deep Dive

### 🧠 Core Concepts

JSX (JavaScript XML) is a **syntax extension** that lets you write HTML-like markup inside JavaScript. Babel compiles JSX down to `React.createElement()` calls.

```jsx
// What you write
const element = <h1 className="title">Hello, World!</h1>;

// What Babel compiles it to
const element = React.createElement(
  "h1",
  { className: "title" },
  "Hello, World!",
);
```

### JSX Rules

```jsx
// 1. Must return a single root element (or Fragment)
// ❌ Bad
function Bad() {
  return (
    <h1>Title</h1>
    <p>Para</p>
  )
}

// ✅ Good — use Fragment
function Good() {
  return (
    <>
      <h1>Title</h1>
      <p>Para</p>
    </>
  )
}

// 2. All tags must be closed
// ❌ Bad
const bad = <img src="photo.jpg">
// ✅ Good
const good = <img src="photo.jpg" />

// 3. className instead of class
// ❌ Bad
const bad2 = <div class="card">...</div>
// ✅ Good
const good2 = <div className="card">...</div>

// 4. camelCase for attributes
// ❌ Bad
const bad3 = <div onclick={handler} tabindex="0">...</div>
// ✅ Good
const good3 = <div onClick={handler} tabIndex={0}>...</div>

// 5. JavaScript expressions in curly braces
const name = 'Alice'
const el = <p>Hello, {name}!</p>
const math = <p>2 + 2 = {2 + 2}</p>
const upper = <p>{name.toUpperCase()}</p>
```

### JSX Expressions vs Statements

```jsx
// ✅ Expressions are allowed (return a value)
<p>{isLoggedIn ? 'Welcome back!' : 'Please log in'}</p>
<p>{items.map(i => <span key={i.id}>{i.name}</span>)}</p>
<p>{count > 0 && <Badge count={count} />}</p>

// ❌ Statements are NOT allowed inside JSX
// if, for, while don't work inline — use ternary or &&
<p>{if (x) { return 'yes' }}</p> // SYNTAX ERROR
```

### Spreading Props

```jsx
// ✅ Useful for passing through props
function Button({ className, ...rest }) {
  return <button className={`btn ${className}`} {...rest} />
}

// ❌ Dangerous — spreading unknown objects can inject unexpected attributes
const userInput = { onClick: hackEverything }
<div {...userInput} /> // Never spread untrusted data
```

### ✅ Best Practices

```jsx
// Keep JSX readable — extract complex expressions
// ❌ Bad
function UserList({ users }) {
  return (
    <ul>
      {users
        .filter((u) => u.active)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
    </ul>
  );
}

// ✅ Good
function UserList({ users }) {
  const activeUsers = users
    .filter((u) => u.active)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ul>
      {activeUsers.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

### 🎤 Interview Questions — Lesson 02

**Q1: What is JSX and is it required in React?**

> JSX is a syntax sugar that compiles to `React.createElement()` calls. It is NOT required — you can write React with plain JS — but JSX makes the code dramatically more readable and is universally used in practice.

**Q2: Why do we use `className` instead of `class`?**

> `class` is a reserved keyword in JavaScript (used for class declarations). Since JSX is compiled to JavaScript, using `class` would cause a syntax conflict. React uses `className` to map to the DOM's `className` property.

**Q3: What are React Fragments and when do you use them?**

> Fragments (`<>...</>` or `<React.Fragment>`) let you group multiple elements without adding an extra DOM node. Use them when returning multiple siblings from a component or when extra wrapper divs would break CSS layouts (like flex/grid containers).

**Q4: What is the difference between `{}` and `{{}}` in JSX?**

> Single `{}` is a JSX expression container. Double `{{}}` is an object literal inside a JSX expression — commonly used for inline styles: `style={{ color: 'red', fontSize: 16 }}`. The outer `{}` is JSX, the inner `{}` is the JavaScript object.

---

## Lesson 03 — Components: Function vs Class

### 🧠 Core Concepts

Components are the **building blocks** of React apps. They accept inputs (props) and return JSX describing what to render.

```
Component Types (Historical Evolution)
────────────────────────────────────────────────────
  Pre-2019 Era
  ├── Class Components     → stateful, lifecycle methods
  └── Function Components  → stateless (just props)

  Post-2019 (Hooks introduced in React 16.8)
  └── Function Components  → stateful + lifecycle via hooks
      (Class components still work but are discouraged)
────────────────────────────────────────────────────
```

### Function Components (Modern Standard)

```jsx
// Basic function component
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function syntax (equally valid)
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;

// With default props via destructuring
function Button({ label = "Click me", variant = "primary", onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

### Class Components (Legacy — Know for Interviews)

```jsx
import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props); // Always call super(props)
    this.state = { count: 0 };
    this.increment = this.increment.bind(this); // Binding required
  }

  increment() {
    this.setState((prev) => ({ count: prev.count + 1 }));
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}
```

### Side-by-Side Comparison

```jsx
// ────────────── CLASS ──────────────
class Timer extends Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((s) => ({ seconds: s.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}

// ────────────── FUNCTION (MODERN) ──────────────
import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // Cleanup
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

### Component Composition

```jsx
// Compose small components into larger ones
function Avatar({ src, alt, size = 40 }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size, borderRadius: "50%" }}
    />
  );
}

function UserCard({ user }) {
  return (
    <div className="card">
      <Avatar src={user.avatar} alt={user.name} size={60} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### ✅ Best Practices

- **Always use function components** with hooks for new code
- Keep components **small and focused** (Single Responsibility Principle)
- **Name components with PascalCase** — required for React to distinguish from HTML tags
- Extract reusable UI into **separate files**

### ❌ Bad Practices

```jsx
// ❌ Lowercase component name — React treats it as HTML tag
function myButton() {
  return <button>Click</button>;
}
// React renders: <mybutton> (unknown HTML element)

// ❌ Huge monolithic component — impossible to test/reuse
function Dashboard() {
  // 500+ lines of JSX mixing nav, sidebar, charts, tables...
}

// ❌ Direct DOM manipulation inside React
function BadComponent() {
  document.getElementById("title").innerHTML = "Changed!"; // NEVER
  return <h1 id="title">Original</h1>;
}
```

---

### 🎤 Interview Questions — Lesson 03

**Q1: What is the difference between function and class components?**

> Function components are plain JavaScript functions that return JSX. Class components extend `React.Component` and have `render()`, lifecycle methods, and `this`. Since React 16.8 introduced Hooks, function components can do everything class components can — plus they're simpler, less verbose, and easier to test. New code should always use function components.

**Q2: Can you still use class components in 2024?**

> Yes, class components still work and there are no plans to remove them. However, React's documentation now teaches only function components + hooks. Most teams are migrating away from class components because function components are simpler, avoid `this` binding bugs, and compose better with hooks.

**Q3: What is the significance of PascalCase for component names?**

> React uses the casing of the component name to distinguish user-defined components from built-in HTML elements. `<div>` is a DOM element. `<Div>` would be treated as a custom React component. If you name your component in lowercase, React renders it as an unknown HTML element instead of your component.

**Q4: What is component composition?**

> Composition is building complex UIs from small, focused components. Instead of inheritance (like class-based OOP), React favors composition — passing components as props (children pattern), or combining specialized components to form complex ones. This leads to more flexible, reusable code.

---

## Lesson 04 — Props & PropTypes

### 🧠 Core Concepts

**Props** (properties) are the mechanism for passing data from parent to child components. Props are **read-only** — a component must never mutate its own props (this is a core React principle).

```
Data Flow (Unidirectional)
─────────────────────────────────────
  Parent Component
      │
      │  props (read-only)
      ▼
  Child Component
      │
      │  callback props (events up)
      ▼
  Parent (handles the event)
─────────────────────────────────────
```

### Basic Props

```jsx
// Passing props
function App() {
  return (
    <UserProfile
      name="Alice Johnson"
      age={28}
      isAdmin={true}
      hobbies={["coding", "hiking"]}
      address={{ city: "NYC", country: "US" }}
      onLogout={() => console.log("logged out")}
    />
  );
}

// Receiving props — destructuring (preferred)
function UserProfile({ name, age, isAdmin, hobbies, address, onLogout }) {
  return (
    <div>
      <h2>
        {name} {isAdmin && "⭐ Admin"}
      </h2>
      <p>
        Age: {age} | City: {address.city}
      </p>
      <ul>
        {hobbies.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
```

### The `children` Prop

```jsx
// The children prop contains whatever is nested inside your component tags
function Card({ title, children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      <h3 className="card-title">{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage — anything between <Card> tags becomes children
function App() {
  return (
    <Card title="User Info">
      <p>Name: Alice</p>
      <p>Email: alice@example.com</p>
      <button>Edit Profile</button>
    </Card>
  );
}
```

### Default Props

```jsx
// ✅ Modern approach — default values in destructuring
function Button({
  label = "Click me",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ⚠️ Legacy approach — defaultProps (still works, not recommended)
Button.defaultProps = {
  label: "Click me",
  variant: "primary",
};
```

### PropTypes (Runtime Type Checking)

```jsx
import PropTypes from "prop-types";

function UserCard({ name, age, email, role, onEdit }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>Role: {role}</p>
      <button onClick={() => onEdit({ name, age, email })}>Edit</button>
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(["admin", "user", "moderator"]),
  onEdit: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
};

UserCard.defaultProps = {
  age: null,
  role: "user",
  tags: [],
};
```

### ✅ Best Practices

```jsx
// ✅ Destructure props for readability
function Component({ name, age, onClick }) { ... }

// ✅ Use spread for forwarding props
function InputWrapper({ label, ...inputProps }) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  )
}

// ✅ Validate all props in non-TypeScript projects
// ✅ Mark required props with .isRequired
```

### ❌ Bad Practices

```jsx
// ❌ Mutating props — NEVER do this
function BadChild({ user }) {
  user.name = 'Hacked'  // Props are read-only!
  return <div>{user.name}</div>
}

// ❌ Passing too many individual props (Prop Drilling / shotgun props)
// Consider grouping into an object or using Context
<UserCard
  firstName="Alice"
  lastName="Johnson"
  userAge={28}
  userEmail="alice@..."
  userCity="NYC"
  userCountry="US"
  userRole="admin"
  userAvatar="/img.jpg"
  userBio="..."
/>

// ✅ Better — pass an object
<UserCard user={userData} />

// ❌ Using array indexes as keys (when list can reorder)
items.map((item, index) => <Item key={index} {...item} />)
```

---

### 🎤 Interview Questions — Lesson 04

**Q1: What are props in React and why are they read-only?**

> Props are inputs passed from parent to child components. They're read-only because React enforces **unidirectional data flow** — data flows down, events bubble up. If children could mutate props, it would create unpredictable data flow and debugging nightmares. If a component needs to "change" something, it should communicate via a callback prop to the parent.

**Q2: What is the difference between state and props?**

> Props are external, passed from a parent and immutable within the component. State is internal, owned by the component, and mutable via setState/useState. Props are like function arguments; state is like local variables.

**Q3: What is prop drilling and how do you solve it?**

> Prop drilling is passing props through multiple intermediate components that don't need them, just to get data to a deeply nested child. Solutions: Context API (built-in), Zustand/Redux (global state libraries), or component composition (lifting state or using compound components).

**Q4: What are PropTypes and why might you prefer TypeScript instead?**

> PropTypes provide runtime type checking in development — they warn in the console when wrong prop types are passed. TypeScript provides compile-time type checking that catches errors before the app even runs, gives IDE autocomplete, and scales much better in large codebases. PropTypes are still useful in plain JS projects; TypeScript is the industry preference for new projects.

---

## Lesson 05 — State & useState Hook

### 🧠 Core Concepts

**State** is data that changes over time and causes the component to re-render when updated. `useState` is a Hook that adds state to function components.

```
State Update Cycle
──────────────────────────────────────────────────
  Component renders
      │
  User interacts (click, type, etc.)
      │
  setState called with new value
      │
  React schedules re-render (async, batched)
      │
  Component re-renders with new state
      │
  React updates DOM (only changed parts)
──────────────────────────────────────────────────
```

### useState Basics

```jsx
import { useState } from "react";

function Counter() {
  // [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Functional Updates (Critical!)

```jsx
// ❌ BAD — uses stale closure value
function Counter() {
  const [count, setCount] = useState(0);

  // BUG: if called 3x rapidly, all read count=0 and set to 1
  const handleTripleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Result: count = 1, not 3
  };
}

// ✅ GOOD — functional update uses latest state
function Counter() {
  const [count, setCount] = useState(0);

  const handleTripleClick = () => {
    setCount((prev) => prev + 1); // prev is always fresh
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    // Result: count = 3 ✅
  };
}
```

### State with Objects

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
  });

  // ❌ Bad — mutating state directly
  const badUpdate = () => {
    user.name = "Alice"; // Never mutate state!
    setUser(user); // Same object reference, won't re-render
  };

  // ✅ Good — create a new object with spread
  const updateName = (name) => {
    setUser((prev) => ({ ...prev, name }));
  };

  const updateEmail = (email) => {
    setUser((prev) => ({ ...prev, email }));
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={(e) => updateEmail(e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}
```

### State with Arrays

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Add — spread + new item
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  // Toggle — map returns new array
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  // Delete — filter returns new array
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Lazy Initialization

```jsx
// ❌ Bad — expensive computation runs on every render
function App() {
  const [data, setData] = useState(expensiveComputation());
  // expensiveComputation() is called EVERY render, only first result used
}

// ✅ Good — lazy initializer, runs only once
function App() {
  const [data, setData] = useState(() => expensiveComputation());
  // Arrow function called only on mount
}
```

### Multiple State Variables vs One Object

```jsx
// ✅ Prefer multiple variables for unrelated state
function ProfilePage() {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
}

// ✅ Group related state into one object
function useFormState() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
}
```

### ✅ Best Practices

- Always use **functional updates** when new state depends on old state
- **Never mutate state directly** — always return new objects/arrays
- Use **lazy initialization** for expensive initial values
- Keep state as **local as possible** — lift up only when needed
- **Collocate state** with the component that uses it

### ❌ Bad Practices

```jsx
// ❌ Storing derived data in state (causes sync issues)
function UserProfile({ user }) {
  const [fullName, setFullName] = useState(
    `${user.firstName} ${user.lastName}`,
  );
  // If user prop changes, fullName is stale!

  // ✅ Just compute it:
  const fullName = `${user.firstName} ${user.lastName}`;
}

// ❌ Redundant state that mirrors props
function Child({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  // If initialCount prop changes, count is stale

  // ✅ Use initialCount as initial value only if intentional
}
```

---

### 🎤 Interview Questions — Lesson 05

**Q1: What is the difference between `setState(value)` and `setState(prev => value)`?**

> Direct value: `setState(count + 1)` reads `count` from the closure at the time the line executes — can be stale if multiple updates are batched. Functional form: `setState(prev => prev + 1)` receives the guaranteed latest state value from React's queue. Always use the functional form when the new state depends on the old state.

**Q2: Does `useState` trigger a re-render if you set the same value?**

> No. React uses `Object.is()` comparison (like `===`). If you call `setState` with the same primitive value, React bails out and skips the re-render. For objects/arrays, it compares references — so `setState({...state})` will trigger a re-render (new reference) even if the data is identical.

**Q3: Why can't we mutate state directly?**

> React uses reference equality to detect changes. If you mutate an existing object (`state.name = 'New'`), the reference doesn't change, so React doesn't know to re-render. You must always return a new object/array. Also, direct mutation can cause subtle bugs in concurrent React features.

**Q4: What is batching in React state updates?**

> React batches multiple `setState` calls together and processes them in one re-render cycle for performance. In React 18, automatic batching was extended to async operations (setTimeout, Promise callbacks). Previously, only event handlers were batched. You can opt out with `flushSync` if you need immediate DOM updates.

**Q5: When would you use `useReducer` instead of `useState`?**

> Use `useReducer` when: state logic is complex (multiple sub-values), next state depends on previous in complex ways, you have related state transitions, or you want to colocate state logic (reducer function). `useState` is fine for simple values. Think of `useReducer` as a local Redux.

---

## Lesson 06 — Event Handling

### 🧠 Core Concepts

React wraps native browser events in **SyntheticEvents** — cross-browser normalized wrappers that have the same API everywhere. Events in React are attached with camelCase names and accept functions (not strings).

```jsx
// HTML (string-based, avoid)
<button onclick="handleClick()">Click</button>

// React (function-based)
<button onClick={handleClick}>Click</button>
```

### Common Events

```jsx
function EventDemo() {
  // Mouse events
  const handleClick = (e) => console.log("clicked", e.target);
  const handleDoubleClick = (e) => console.log("double clicked");
  const handleMouseEnter = (e) => console.log("entered");
  const handleMouseLeave = (e) => console.log("left");

  // Keyboard events
  const handleKeyDown = (e) => {
    if (e.key === "Enter") console.log("Enter pressed");
    if (e.key === "Escape") console.log("Escape pressed");
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      console.log("Ctrl+S");
    }
  };

  // Form events
  const handleChange = (e) => console.log(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("submitted");
  };
  const handleFocus = (e) => console.log("focused");
  const handleBlur = (e) => console.log("blurred");

  return (
    <div>
      <button
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover & Click Me
      </button>
      <input
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

### Passing Arguments to Handlers

```jsx
function ItemList({ items }) {
  // ✅ Use arrow function in JSX to pass arguments
  const handleDelete = (id) => {
    console.log("deleting", id);
  };

  const handleEdit = (id, name) => {
    console.log("editing", id, name);
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          {/* ✅ Arrow function in onClick */}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
          <button onClick={() => handleEdit(item.id, item.name)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}
```

### Event Delegation & Stopping Propagation

```jsx
function Modal({ onClose, children }) {
  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevent event from reaching backdrop
    // ... do something
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
}
```

### ✅ Best Practices

```jsx
// ✅ Extract handlers outside JSX
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // logic here
  };
  return <form onSubmit={handleSubmit}>...</form>;
}

// ✅ Use e.preventDefault() for form submits and link clicks
// ✅ Use e.stopPropagation() only when necessary
```

### ❌ Bad Practices

```jsx
// ❌ Calling the function instead of passing it
<button onClick={handleClick()}>Click</button>
// handleClick() runs on render, not on click!

// ✅ Correct
<button onClick={handleClick}>Click</button>

// ❌ Inline complex logic in JSX
<button onClick={(e) => {
  e.preventDefault()
  validateForm()
  const data = collectData()
  if (data.valid) submitToServer(data)
  else showErrors(data.errors)
}}>Submit</button>

// ✅ Extract to named handler
<button onClick={handleSubmit}>Submit</button>
```

---

### 🎤 Interview Questions — Lesson 06

**Q1: What is a SyntheticEvent in React?**

> A SyntheticEvent is React's cross-browser wrapper around the native browser event. It has the same API as native events (`preventDefault()`, `stopPropagation()`, `target`, etc.) but normalizes inconsistencies across browsers. In React 17+, events are no longer pooled (previously, the event object was reused for performance and would be nullified after the handler).

**Q2: What is the difference between `onClick={fn}` and `onClick={fn()}`?**

> `onClick={fn}` passes a function reference — it will be called when clicked. `onClick={fn()}` immediately invokes the function during rendering and passes its return value as the handler. This is a common bug — unless `fn()` returns another function, the click handler will be undefined or have wrong behavior.

**Q3: How do you prevent the default browser behavior in React?**

> Call `e.preventDefault()` inside the event handler. Common use cases: preventing form submission page reload (`onSubmit`), preventing link navigation (`onClick` on `<a>`), preventing drag default behaviors. You cannot return `false` like in jQuery — you must explicitly call `preventDefault()`.

---

## Lesson 07 — Conditional Rendering

### 🧠 Core Concepts

React components can render different UI based on conditions using regular JavaScript.

```jsx
// Method 1: if/else (outside JSX)
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please log in.</h1>;
}

// Method 2: Ternary operator (inline JSX)
function Status({ isOnline }) {
  return <div>Status: {isOnline ? "🟢 Online" : "🔴 Offline"}</div>;
}

// Method 3: Short-circuit (&&) — render or nothing
function Notification({ count }) {
  return <div>{count > 0 && <Badge count={count} />}</div>;
}

// Method 4: Switch (for many conditions)
function Alert({ type, message }) {
  const icon =
    {
      success: "✅",
      warning: "⚠️",
      error: "❌",
      info: "ℹ️",
    }[type] ?? "ℹ️";

  return (
    <div className={`alert alert-${type}`}>
      {icon} {message}
    </div>
  );
}
```

### Common Gotcha with `&&`

```jsx
// ❌ BUG — renders "0" on screen when count is 0
function ItemCount({ count }) {
  return <div>{count && <span>Items: {count}</span>}</div>;
  // When count=0: 0 && ... = 0, React renders "0" as text node!
}

// ✅ Fix — explicitly check boolean
function ItemCount({ count }) {
  return <div>{count > 0 && <span>Items: {count}</span>}</div>;
}

// ✅ Alternative — ternary
function ItemCount({ count }) {
  return <div>{count ? <span>Items: {count}</span> : null}</div>;
}
```

### Returning null to Render Nothing

```jsx
// Returning null from a component renders nothing (no DOM node)
function ErrorMessage({ error }) {
  if (!error) return null;
  return <div className="error">{error.message}</div>;
}
```

### Early Return Pattern

```jsx
// ✅ Use early returns for loading/error states — keeps main render clean
function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <p>User not found.</p>;

  // Happy path — no nesting
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

---

### 🎤 Interview Questions — Lesson 07

**Q1: What are the different ways to conditionally render in React?**

> Four main approaches: (1) if/else statements before the return, (2) ternary operator `condition ? a : b` inline in JSX, (3) logical AND `condition && <Component />` for render-or-nothing, (4) object maps / switch statements for multiple conditions. Returning `null` renders nothing.

**Q2: What is the "0 problem" with `&&` in JSX?**

> When using `{count && <Component />}`, if `count` is `0` (falsy but a valid number), JavaScript short-circuits and returns `0` — which React renders as the text "0". Always ensure the left side evaluates to a boolean: `{count > 0 && <Component />}` or `{!!count && <Component />}`.

---

## Lesson 08 — Lists & Keys

### 🧠 Core Concepts

Rendering lists in React uses `.map()`. Every list item needs a **unique `key` prop** so React can efficiently track, update, and reorder items.

```jsx
function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {" "}
          {/* key goes on outermost element */}
          <img src={product.image} alt={product.name} />
          <span>{product.name}</span>
          <span>${product.price}</span>
        </li>
      ))}
    </ul>
  );
}
```

### Why Keys Matter

```
Without keys, React re-renders the entire list on any change.
With unique keys, React can:
  ✅ Insert items without re-rendering others
  ✅ Reorder items by moving DOM nodes
  ✅ Delete items without affecting siblings
  ✅ Preserve focus, selection, scroll position
```

### Key Rules

```jsx
// ✅ Use stable unique IDs from data
products.map((p) => <Card key={p.id} {...p} />);

// ✅ Can use composite keys
comments.map((c) => <Comment key={`${c.postId}-${c.id}`} {...c} />);

// ❌ Don't use array index as key (when list can reorder/filter)
products.map((p, index) => <Card key={index} {...p} />);
// React sees items by position — reordering causes stale state bugs

// 🟡 Index is OK if list is static and never reorders
const TABS = ["Home", "Profile", "Settings"];
TABS.map((tab, i) => <Tab key={i} label={tab} />); // Fine if tabs never reorder

// ❌ Don't use Math.random() as key
products.map((p) => <Card key={Math.random()} {...p} />);
// New key every render = React unmounts/remounts everything = terrible perf
```

### Nested Lists

```jsx
function CategoryList({ categories }) {
  return (
    <div>
      {categories.map((category) => (
        <section key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item) => (
              <li key={item.id}>{item.name}</li>
              // key scoped to the nearest list — IDs just need to be unique among siblings
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```

### Filtering & Sorting

```jsx
function FilteredList({ items, filter, sortBy }) {
  const displayItems = items
    .filter((item) => item.category === filter || filter === "all")
    .sort((a, b) => a[sortBy]?.localeCompare(b[sortBy]));

  if (displayItems.length === 0) {
    return <p className="empty-state">No items found.</p>;
  }

  return (
    <ul>
      {displayItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

### 🎤 Interview Questions — Lesson 08

**Q1: Why does React need keys in lists?**

> Keys help React's reconciliation algorithm identify which items changed, were added, or removed. Without keys, React can't tell items apart and re-renders the entire list. With stable unique keys, React can perform surgical DOM updates — updating only what changed, preserving the state of unmoved items, and correctly handling animations/focus.

**Q2: Why is using array indexes as keys a bad practice?**

> When the list is reordered or filtered, array positions change. React matches by key, so it thinks `key=0` is still the same item — but it's now a different item in that position. This causes: stale component state, incorrect animations, and potential UI glitches. Use stable IDs from your data instead.

---

## Lesson 09 — Forms & Controlled Components

### 🧠 Core Concepts

In React, form elements should be **controlled components** — meaning React state is the single source of truth for the input's value. The alternative (uncontrolled) uses refs to read DOM values directly.

```
Controlled Component Flow
──────────────────────────────────────────────────
  User types → onChange fires → setState called
      → Re-render → input value = state
      (React owns the value)

Uncontrolled Component Flow
──────────────────────────────────────────────────
  User types → DOM owns the value
  On submit → read value via ref
──────────────────────────────────────────────────
```

### Controlled Inputs

```jsx
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.includes("@")) errs.email = "Invalid email";
    if (password.length < 8) errs.password = "Min 8 characters";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Submit to API
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
        />
        {errors.password && <span role="alert">{errors.password}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
```

### Generic Change Handler

```jsx
// Handle multiple inputs with one handler using name attribute
function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input
        name="age"
        value={form.age}
        onChange={handleChange}
        type="number"
      />
      <input
        name="agree"
        checked={form.agree}
        onChange={handleChange}
        type="checkbox"
      />
    </form>
  );
}
```

### Using React Hook Form (Industry Standard)

```jsx
// npm install react-hook-form
import { useForm } from "react-hook-form";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await submitToApi(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Min 8 characters" },
        })}
        type="password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
}
```

---

### 🎤 Interview Questions — Lesson 09

**Q1: What is the difference between controlled and uncontrolled components?**

> Controlled: React state is the source of truth; every keystroke calls setState via onChange; value prop is set from state. Uncontrolled: the DOM manages its own state; you read values via ref on submit. Controlled is preferred for validation, conditional logic, and predictability. Uncontrolled can be useful for file inputs or integrating with non-React libraries.

**Q2: Why do we use `htmlFor` instead of `for` in React forms?**

> Same reason as `className` — `for` is a reserved JavaScript keyword. React uses `htmlFor` which maps to the DOM's `for` attribute on `<label>` elements.

**Q3: What are popular form libraries for React and why use them?**

> React Hook Form (most popular, performance-focused, minimal re-renders), Formik (feature-rich, older), and Zod/Yup (schema validation). Libraries handle: validation, error messages, touched/dirty state, submission loading states, and more. React Hook Form uses uncontrolled inputs under the hood for performance — only re-renders on error state changes.

---

## Lesson 10 — useEffect Hook

### 🧠 Core Concepts

`useEffect` lets you perform **side effects** in function components — things that happen outside the React render cycle like data fetching, subscriptions, timers, and DOM manipulation.

```
useEffect Lifecycle Diagram
──────────────────────────────────────────────────────
  Component Mounts
      │
      ▼
  Render (JSX returned)
      │
      ▼
  DOM Updated
      │
      ▼
  ┌─ useEffect callback runs ─────────────────┐
  │  (after every render, or conditionally)   │
  └────────────────────────────────────────────┘
      │
  State/Props change → Re-render
      │
      ▼
  ┌─ Cleanup function from PREVIOUS effect ──┐
  │  (returned from useEffect)               │
  └───────────────────────────────────────────┘
      │
      ▼
  ┌─ useEffect callback runs again ──────────┐
  │                                          │
  └───────────────────────────────────────────┘
      │
  Component Unmounts
      │
      ▼
  ┌─ Final cleanup function runs ────────────┐
  └───────────────────────────────────────────┘
──────────────────────────────────────────────────────
```

### Dependency Array Controls

```jsx
import { useEffect, useState } from "react";

// 1. No dependency array — runs after EVERY render
useEffect(() => {
  console.log("Runs after every render");
});

// 2. Empty array — runs ONCE after mount (like componentDidMount)
useEffect(() => {
  console.log("Runs once on mount");
}, []);

// 3. With dependencies — runs when dep values change
useEffect(() => {
  console.log("userId changed to:", userId);
}, [userId]);
```

### Data Fetching Pattern

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // Cleanup flag for race conditions

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!cancelled) setUser(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      cancelled = true;
    }; // Cleanup — prevent setState on unmounted component
  }, [userId]); // Re-fetch when userId changes

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

### Cleanup Examples

```jsx
// Timer cleanup
useEffect(() => {
  const id = setInterval(() => setTime(Date.now()), 1000);
  return () => clearInterval(id);
}, []);

// Event listener cleanup
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// WebSocket cleanup
useEffect(() => {
  const socket = new WebSocket("wss://api.example.com");
  socket.onmessage = (e) => setMessages((m) => [...m, JSON.parse(e.data)]);
  return () => socket.close();
}, []);
```

### ✅ Best Practices

```jsx
// ✅ Always clean up subscriptions, timers, event listeners
// ✅ Use the dependency array correctly — don't lie to React
// ✅ Extract custom hooks for reusable effects
// ✅ Handle race conditions in fetch with cleanup flags or AbortController

// AbortController pattern (modern)
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then((r) => r.json())
    .then(setUser)
    .catch((err) => {
      if (err.name !== "AbortError") setError(err.message);
    });

  return () => controller.abort();
}, [userId]);
```

### ❌ Bad Practices

```jsx
// ❌ Missing dependency in array — stale closure bug
const [count, setCount] = useState(0);
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // count is always 0 (stale!)
  }, 1000);
  return () => clearInterval(id);
}, []); // Missing count!

// ✅ Fix: use functional update
useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  return () => clearInterval(id);
}, []);

// ❌ Fetching without cleanup — sets state on unmounted component
useEffect(() => {
  fetch("/api/data")
    .then((r) => r.json())
    .then(setData);
  // No cleanup — if component unmounts before fetch completes: memory leak warning
}, []);
```

---

### 🎤 Interview Questions — Lesson 10

**Q1: What is the purpose of the cleanup function in useEffect?**

> The cleanup function (returned from useEffect) runs before the next effect or on component unmount. It prevents memory leaks and bugs by: clearing timers (`clearInterval`), removing event listeners, closing sockets, cancelling fetch requests. Without cleanup, you risk "can't perform state update on unmounted component" warnings and memory leaks.

**Q2: What happens if you include a function in useEffect's dependency array?**

> Functions are re-created on every render, so a function in the deps array would cause the effect to re-run on every render (defeating the purpose). Solutions: wrap the function in `useCallback` (stabilizes the reference), define the function inside the effect, or move it outside the component if it doesn't use props/state.

**Q3: How do you avoid race conditions in data fetching with useEffect?**

> Use a cleanup flag `let cancelled = false; return () => { cancelled = true }` to ignore responses for outdated requests. Or use the Fetch `AbortController` API: `const ctrl = new AbortController()`, pass `{ signal: ctrl.signal }` to fetch, return `() => ctrl.abort()`. This cancels the request itself, not just ignores the response.

**Q4: Is useEffect called before or after the DOM update?**

> useEffect runs **after** the DOM has been painted — asynchronously. This means the DOM is ready when the effect runs, preventing layout thrashing. If you need to read/write layout before paint (like measuring element dimensions), use `useLayoutEffect` which runs synchronously after DOM mutations but before paint.

---

## Lesson 11 — useRef Hook

### 🧠 Core Concepts

`useRef` serves two main purposes:

1. **Accessing DOM elements** directly
2. **Storing mutable values** that persist across renders without causing re-renders

```jsx
import { useRef, useEffect, useState } from "react";

// Use 1: DOM reference
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Direct DOM access
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused!" />;
}

// Use 2: Previous value tracking
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count; // Mutate ref, no re-render
  });

  return (
    <div>
      <p>
        Now: {count} | Before: {prevCountRef.current}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}

// Use 3: Timer IDs, interval IDs
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    setRunning(true);
    intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>{time}s</p>
      <button onClick={running ? stop : start}>
        {running ? "Stop" : "Start"}
      </button>
    </div>
  );
}
```

### Key Difference: ref vs state

```
useRef:
  ✅ No re-render on .current change
  ✅ Same object reference across renders
  ✅ Mutations are immediate (synchronous)
  ❌ Changes not reflected in UI

useState:
  ✅ Re-render on change (UI updates)
  ✅ Changes batched and scheduled
  ❌ Can't access latest value inside callbacks (stale closure)
```

### forwardRef — Exposing DOM to Parent

```jsx
import { forwardRef } from "react";

// Allow parent to get ref to internal input
const FancyInput = forwardRef(function FancyInput({ label, ...props }, ref) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
});

// Parent usage
function Form() {
  const inputRef = useRef(null);
  return (
    <>
      <FancyInput ref={inputRef} label="Name" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </>
  );
}
```

---

### 🎤 Interview Questions — Lesson 11

**Q1: What is the difference between useRef and useState?**

> Both persist values across renders, but `useRef` mutations do NOT trigger re-renders — the UI won't update. `useState` updates schedule a re-render. Use `useRef` for: DOM access, timers, previous values, or any mutable value where the current value is needed in logic but doesn't need to display in the UI.

**Q2: When would you use useRef instead of a regular variable?**

> A regular variable inside a component is reset on every render. `useRef` persists the value across renders (like an instance variable). Use it when you need to remember something across renders without causing re-renders.

---

## Lesson 12 — useContext & Context API

### 🧠 Core Concepts

Context provides a way to share data across the component tree **without prop drilling**. Think of it as a global store for a subtree.

```
Without Context (Prop Drilling)
────────────────────────────────────────
  App (has theme)
    ├── Header (passes theme)
    │     └── Nav (passes theme)
    │           └── NavLink (uses theme) ← 3 levels deep!
    └── Main (passes theme)
          └── Card (passes theme)
                └── Button (uses theme) ← 3 levels deep!

With Context
────────────────────────────────────────
  ThemeContext.Provider (has theme)
    ├── Header
    │     └── Nav
    │           └── NavLink ← useContext(ThemeContext) directly!
    └── Main
          └── Card
                └── Button ← useContext(ThemeContext) directly!
────────────────────────────────────────
```

### Creating and Using Context

```jsx
import { createContext, useContext, useState } from "react";

// 1. Create context (with default value)
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// 2. Create provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for consumption (best practice)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// 4. Use in any component
function NavBar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className={`nav nav-${theme}`}>
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}

// 5. Wrap app with provider
function App() {
  return (
    <ThemeProvider>
      <NavBar />
      <Main />
    </ThemeProvider>
  );
}
```

### Auth Context (Real-World Example)

```jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for persisted session
    const token = localStorage.getItem("token");
    if (token)
      validateToken(token)
        .then(setUser)
        .finally(() => setLoading(false));
    else setLoading(false);
  }, []);

  const login = async (credentials) => {
    const user = await apiLogin(credentials);
    localStorage.setItem("token", user.token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) return <FullPageSpinner />;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
```

### Context Performance Gotcha

```jsx
// ❌ Bad — object literal in value causes re-render of ALL consumers on every render
function Provider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{ count, setCount }}>
      {" "}
      {/* New object every render! */}
      {children}
    </MyContext.Provider>
  );
}

// ✅ Good — memoize the value
import { useMemo } from "react";
function Provider({ children }) {
  const [count, setCount] = useState(0);
  const value = useMemo(() => ({ count, setCount }), [count]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
```

---

### 🎤 Interview Questions — Lesson 12

**Q1: When should you use Context vs a state management library?**

> Context is great for: theme, locale, auth user, feature flags — low-frequency updates shared globally. For high-frequency updates (e.g., real-time data, complex state machines with many consumers), use Zustand or Redux — they have better performance optimization tools (selectors, shallow comparison). Context with frequent updates can cause unnecessary re-renders.

**Q2: Does useContext cause re-renders?**

> Yes — every consumer re-renders when the context value changes. This is why memoizing the value object is important (using `useMemo`). You can also split contexts by concern (AuthContext, ThemeContext, CartContext) so changes to one don't re-render consumers of the others.

---

## Lesson 13 — useReducer Hook

### 🧠 Core Concepts

`useReducer` is an alternative to `useState` for **complex state logic**. Inspired by Redux, it follows the `(state, action) => newState` pattern.

```
useReducer Flow
────────────────────────────────────────────────────
  dispatch({ type: 'ACTION', payload: data })
      │
      ▼
  reducer(currentState, action)
      │
      ▼
  Returns new state (pure function, no side effects)
      │
      ▼
  Component re-renders with new state
────────────────────────────────────────────────────
```

### Basic useReducer

```jsx
import { useReducer } from "react";

// State shape
const initialState = { count: 0, step: 1 };

// Reducer — pure function
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "RESET":
      return initialState;
    case "SET_STEP":
      return { ...state, step: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <p>
        Count: {state.count} (step: {state.step})
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <input
        type="number"
        value={state.step}
        onChange={(e) =>
          dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
        }
      />
    </div>
  );
}
```

### Real-World: Shopping Cart

```jsx
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i,
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      {cart.items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input
            type="number"
            value={item.qty}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_QTY",
                payload: { id: item.id, qty: +e.target.value },
              })
            }
          />
          <button
            onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
          >
            Remove
          </button>
        </div>
      ))}
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
```

---

### 🎤 Interview Questions — Lesson 13

**Q1: When should you use useReducer vs useState?**

> `useReducer` shines when: (1) next state depends on multiple previous values, (2) you have many related state transitions, (3) state updates are complex (shopping cart, form wizard, multi-step flow), (4) you want colocated, testable state logic. For simple single-value state (toggle, count, text), `useState` is simpler.

**Q2: What makes a good reducer function?**

> A reducer must be **pure**: given the same state and action, always return the same new state. No side effects (no API calls, no `Math.random()`, no mutations). Always return new objects/arrays, never mutate the state parameter. Handle the default case (unknown actions should return the current state or throw).

---

## Lesson 14 — Custom Hooks

### 🧠 Core Concepts

Custom Hooks are **JavaScript functions that start with `use`** and can call other hooks. They let you extract reusable stateful logic from components.

```
Custom Hook Philosophy
────────────────────────────────────────────────────
  Instead of:                    Extract to:
  Component A (fetch logic) ─→  useFetch(url)
  Component B (fetch logic)     ├── Component A
  Component C (fetch logic)     ├── Component B
                                └── Component C
────────────────────────────────────────────────────
```

### useFetch — Data Fetching Hook

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage
function Posts() {
  const { data: posts, loading, error } = useFetch("/api/posts");

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

### useLocalStorage Hook

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (newValue) => {
    try {
      const val = newValue instanceof Function ? newValue(value) : newValue;
      setValue(val);
      localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.error("localStorage error:", error);
    }
  };

  return [value, set];
}

// Usage — works exactly like useState but persists!
function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      Theme: {theme}
    </button>
  );
}
```

### useDebounce Hook

```jsx
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage — search that waits before firing API call
function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const { data } = useFetch(`/api/search?q=${debouncedQuery}`);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {data?.map((r) => (
        <div key={r.id}>{r.title}</div>
      ))}
    </>
  );
}
```

### Rules of Hooks

```
❌ Don't call hooks inside conditions
❌ Don't call hooks inside loops
❌ Don't call hooks inside nested functions
✅ Call hooks at the top level of function components or custom hooks
✅ Custom hooks must start with "use"
```

---

### 🎤 Interview Questions — Lesson 14

**Q1: What are the rules of hooks and why do they exist?**

> (1) Only call hooks at the top level — not inside conditionals, loops, or nested functions. (2) Only call hooks from React function components or custom hooks. These rules exist because React relies on the order of hook calls to correctly associate state with each hook. If hooks are called conditionally, the order can change between renders, causing React to associate the wrong state with the wrong hook.

**Q2: What makes something a custom hook vs a regular function?**

> A custom hook starts with `use` (by convention, enforced by the eslint-plugin-react-hooks linter), and it calls at least one built-in React hook inside it. A regular utility function cannot call hooks. The `use` prefix signals to React (and linters) that this function follows hook rules.

---

## Lesson 15 — React Router v6

### 🧠 Core Concepts

React Router v6 enables **client-side navigation** in SPAs — switching views without full page reloads.

```bash
npm install react-router-dom
```

### Basic Setup

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  Navigate,
} from "react-router-dom";

// App.jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Layout.jsx — parent route renders children via <Outlet>
function Layout() {
  return (
    <div>
      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

### Router Hooks

```jsx
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

// useParams — get URL parameters
function UserDetail() {
  const { id } = useParams();
  const { data: user } = useFetch(`/api/users/${id}`);
  return <div>{user?.name}</div>;
}

// useNavigate — programmatic navigation
function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (creds) => {
    await login(creds);
    navigate("/dashboard", { replace: true }); // Replace history entry
  };

  const goBack = () => navigate(-1); // Like browser back button
}

// useSearchParams — URL query strings
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const page = Number(searchParams.get("page")) || 1;

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => setSearchParams({ filter: e.target.value, page: 1 })}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
      </select>
    </div>
  );
}

// useLocation — current route info
function Analytics() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
}
```

### Protected Routes

```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;

// After login, redirect back to where they came from
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (creds) => {
    await login(creds);
    navigate(from, { replace: true });
  };
}
```

---

### 🎤 Interview Questions — Lesson 15

**Q1: What is the difference between BrowserRouter and HashRouter?**

> `BrowserRouter` uses the HTML5 History API (`/users/123`) — clean URLs, requires server config to redirect all routes to `index.html`. `HashRouter` uses URL hash (`/#/users/123`) — works without server config (hash never sent to server), but ugly URLs and not great for SEO. Use `BrowserRouter` in production with proper server config.

**Q2: What does the `replace` option in `useNavigate` do?**

> `navigate('/path', { replace: true })` replaces the current history entry instead of pushing a new one. The user can't navigate back to the previous page. Used for login redirects (you don't want users pressing back to the login page after logging in) or redirects from deprecated routes.

**Q3: How do you share data between routes without prop drilling?**

> Options: (1) URL state (`useSearchParams` or `location.state` via navigate), (2) Context API, (3) Global state (Zustand/Redux), (4) React Router's `<Outlet context>` prop for passing data to child routes.

---

## Lesson 16 — Performance Optimization

### 🧠 Core Concepts

React re-renders a component when: its state changes, its props change, or its parent re-renders. Performance tools prevent **unnecessary re-renders**.

```
Re-render Decision Tree
────────────────────────────────────────────────────────────────────
  Parent re-renders
      │
      ▼
  Child — does it need to re-render?
      │
      ├── Default: YES, always re-renders
      │
      ├── With React.memo: compares props (shallow) → skips if same
      │
      └── With React.memo + custom comparator → deep compare if needed
────────────────────────────────────────────────────────────────────
```

### React.memo

```jsx
import { memo } from "react";

// Without memo — re-renders whenever parent re-renders, even if props unchanged
function ExpensiveChart({ data, title }) {
  console.log("Chart rendered");
  return <div>{/* complex chart */}</div>;
}

// With memo — only re-renders if data or title changes (shallow compare)
const ExpensiveChart = memo(function ExpensiveChart({ data, title }) {
  console.log("Chart rendered");
  return <div>{/* complex chart */}</div>;
});

// Custom comparator for deep comparison
const Chart = memo(ExpensiveChart, (prevProps, nextProps) => {
  // Return true to SKIP re-render, false to re-render
  return (
    prevProps.data.length === nextProps.data.length &&
    prevProps.title === nextProps.title
  );
});
```

### useMemo

```jsx
import { useMemo } from "react";

function ProductList({ products, filter, sortBy }) {
  // ❌ Bad — recomputes on every render
  const filtered = products
    .filter((p) => p.category === filter)
    .sort((a, b) => a[sortBy] - b[sortBy]);

  // ✅ Good — only recomputes when dependencies change
  const filtered = useMemo(
    () =>
      products
        .filter((p) => p.category === filter)
        .sort((a, b) => a[sortBy] - b[sortBy]),
    [products, filter, sortBy],
  );

  return (
    <ul>
      {filtered.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### useCallback

```jsx
import { useCallback } from "react";

// ❌ Problem — handleDelete is a new function on every render
// memo on TodoItem won't help because handleDelete always changes
function TodoList({ todos }) {
  const handleDelete = (id) => deleteTodo(id); // New function every render!

  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
  ));
}

// ✅ Fix — useCallback stabilizes the function reference
function TodoList({ todos }) {
  const handleDelete = useCallback((id) => deleteTodo(id), []);
  // Same function reference until dependencies change

  return todos.map((todo) => (
    <MemoTodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
  ));
}

const MemoTodoItem = memo(function TodoItem({ todo, onDelete }) {
  return (
    <li>
      {todo.text} <button onClick={() => onDelete(todo.id)}>✕</button>
    </li>
  );
});
```

### When NOT to Optimize

```jsx
// ❌ Premature optimization — adds complexity with no benefit
// memo, useMemo, useCallback have a small overhead themselves

// Don't memo small/cheap components
const Title = memo(function Title({ text }) {
  return <h1>{text}</h1>; // This is instant, memo overhead > benefit
});

// Don't useMemo for cheap operations
const doubled = useMemo(() => value * 2, [value]); // Just do: value * 2

// Optimization checklist:
// 1. Profile first (React DevTools Profiler)
// 2. Find the actual bottleneck
// 3. Apply targeted optimization
// 4. Measure improvement
```

---

### 🎤 Interview Questions — Lesson 16

**Q1: What is the difference between useMemo and useCallback?**

> `useMemo` memoizes a **computed value** — it runs the function and caches the result. `useCallback` memoizes a **function reference** — it returns the same function instance unless dependencies change. Rule of thumb: `useMemo(() => fn(), deps)` = cache the result; `useCallback(fn, deps)` = cache the function itself.

**Q2: Does React.memo do deep or shallow comparison?**

> Shallow comparison by default — it compares each prop using `Object.is()`. For primitive props (string, number, boolean) this is deep enough. For objects and arrays, it only compares references. If a parent creates a new array/object each render (even with same content), `memo` won't help — pair with `useMemo` for stable references.

**Q3: What is the React Profiler and how do you use it?**

> React DevTools includes a Profiler tab that records component render times and counts. You start recording, interact with the app, stop recording, and analyze the flame graph showing which components rendered, how long they took, and why they rendered. This helps pinpoint actual bottlenecks before applying optimizations.

---

## Lesson 17 — Code Splitting & Lazy Loading

### 🧠 Core Concepts

Splitting your JavaScript bundle so users only download the code they need, improving initial load time.

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// ❌ Default — all routes downloaded upfront
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";

// ✅ Lazy — each page downloaded on first visit
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Reports = lazy(() => import("./pages/Reports"));

function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Suspense>
  );
}
```

### Named Exports with lazy

```jsx
// ❌ lazy() requires default exports
// ✅ Workaround for named exports
const LineChart = lazy(() =>
  import("./charts/LineChart").then((m) => ({ default: m.LineChart })),
);
```

---

### 🎤 Interview Questions — Lesson 17

**Q1: What is code splitting and why does it matter?**

> Code splitting breaks your bundle into smaller chunks that load on demand. Without it, users download your entire app's JavaScript upfront — even code for pages they never visit. With it, the initial bundle is small and fast; additional chunks load as users navigate. React supports this via dynamic `import()` + `React.lazy`.

**Q2: What does Suspense do in the context of lazy loading?**

> `Suspense` catches components that are "suspending" (waiting for data/code) and renders a `fallback` UI (like a spinner) until they're ready. It's the boundary between loading and loaded states. You can nest multiple Suspense boundaries to show granular loading states.

---

## Lesson 18 — Error Boundaries

### 🧠 Core Concepts

Error Boundaries are **class components** (no hook equivalent yet) that catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of crashing the whole app.

```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error }; // Update state to show fallback
  }

  componentDidCatch(error, info) {
    // Log to error reporting service
    console.error("Error:", error);
    console.error("Component Stack:", info.componentStack);
    // logToSentry(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-ui">
            <h2>Something went wrong.</h2>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// Usage — wrap sections of the app
function App() {
  return (
    <ErrorBoundary fallback={<p>App crashed!</p>}>
      <ErrorBoundary fallback={<p>Chart failed to load</p>}>
        <AnalyticsChart />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Feed unavailable</p>}>
        <NewsFeed />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
```

> **Note:** Use the `react-error-boundary` npm package for a modern, hook-friendly alternative:
> `npm install react-error-boundary`

---

### 🎤 Interview Questions — Lesson 18

**Q1: What errors do Error Boundaries NOT catch?**

> Error Boundaries do NOT catch: (1) errors in event handlers (use try/catch), (2) asynchronous code (setTimeout, Promises), (3) server-side rendering errors, (4) errors thrown in the error boundary itself. They only catch errors during rendering, in lifecycle methods, and in constructors of child components.

---

## Lesson 19 — State Management (Zustand & Redux Toolkit)

### 🧠 When to Use Global State

```
Decision Tree for State Location
────────────────────────────────────────────────────
  Is it used in only one component?
    → useState (local)

  Is it shared between a few nearby components?
    → Lift state up / props

  Is it shared across many/distant components?
    → Context API (low-frequency updates)
    → Zustand or Redux (high-frequency / complex)
────────────────────────────────────────────────────
```

### Zustand (Lightweight, Modern)

```jsx
// npm install zustand
import { create } from "zustand";

// Define store
const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
  totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));

// Use anywhere — no providers needed!
function CartIcon() {
  const totalItems = useCartStore((state) => state.totalItems());
  return <div>🛒 {totalItems}</div>;
}

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}
```

### Redux Toolkit (Industry Standard for Large Apps)

```jsx
// npm install @reduxjs/toolkit react-redux
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
      // RTK uses Immer — safe to "mutate" here!
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

// Store
const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

// Provider (wrap app)
function App() {
  return (
    <Provider store={store}>
      <ShoppingApp />
    </Provider>
  );
}

// Components
function CartCount() {
  const total = useSelector((state) =>
    state.cart.items.reduce((s, i) => s + i.qty, 0),
  );
  return <span>{total}</span>;
}

function AddToCart({ product }) {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
  );
}
```

---

### 🎤 Interview Questions — Lesson 19

**Q1: What is the difference between Zustand and Redux?**

> Zustand: minimal boilerplate, no Provider needed, stores are simple JS objects with actions, great for small-medium apps. Redux (Toolkit): more structured/opinionated, excellent DevTools (time-travel debugging), battle-tested for large teams, uses slices/actions/reducers pattern. Both are valid; Zustand is trending for new projects due to simplicity.

**Q2: What is Immer and how does Redux Toolkit use it?**

> Immer allows you to write "mutating" code that is actually immutable under the hood. RTK includes Immer in `createSlice` reducers, so you can do `state.items.push(item)` instead of `[...state.items, item]`. Immer tracks changes and produces a new immutable state automatically.

---

## Lesson 20 — Testing React Apps

### 🧠 Testing Pyramid

```
               /\
              /  \
             / E2E\        Cypress, Playwright
            /──────\       (slow, expensive, high confidence)
           /        \
          /Integration\    React Testing Library
         /──────────────\  (test component behavior)
        /                \
       /    Unit Tests    \  Jest (logic, utils, hooks)
      /────────────────────\(fast, cheap, low confidence)
```

### React Testing Library (RTL)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

```jsx
// Button.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button label="Click me" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Click me" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button label="Submit" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### Testing a Form

```jsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("shows error on invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    await user.type(screen.getByLabelText(/email/i), "notanemail");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it("calls onSubmit with credentials on valid input", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "alice@test.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "alice@test.com",
        password: "password123",
      });
    });
  });
});
```

### Testing Custom Hooks

```jsx
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("initializes with given value", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it("increments correctly", () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
});
```

### ✅ Testing Best Practices

```
✅ Test behavior, not implementation
✅ Use semantic queries (getByRole, getByLabelText) not (getByTestId)
✅ Avoid testing internal state — test what users see
✅ Mock API calls with MSW (Mock Service Worker)
✅ Write tests alongside features, not as an afterthought
```

---

### 🎤 Interview Questions — Lesson 20

**Q1: What is the philosophy of React Testing Library?**

> RTL's guiding principle (by Kent C. Dodds) is: "The more your tests resemble the way your software is used, the more confidence they give you." Test from the user's perspective — what they see and interact with — not internal component implementation details. This makes tests more resilient to refactors.

**Q2: What are the RTL query priority order?**

> RTL recommends queries in this priority: `getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` → `getByDisplayValue` → `getByAltText` → `getByTitle` → `getByTestId` (last resort). `getByRole` is preferred because it also validates accessibility.

---

## Lesson 21 — React Patterns

### Higher-Order Components (HOC)

```jsx
// HOC — function that takes a component and returns an enhanced component
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### Render Props

```jsx
// Component with render prop — consumer controls what's rendered
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });

  return (
    <div onMouseMove={handleMove} style={{ height: 300 }}>
      {render(position)}
    </div>
  );
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <p>
      Mouse at {x}, {y}
    </p>
  )}
/>;
```

### Compound Components

```jsx
// Compound components share implicit state via context
const TabContext = createContext(null)

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  )
}

function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabContext)
  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      className={activeTab === id ? 'tab active' : 'tab'}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  )
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabContext)
  return activeTab === id ? <div role="tabpanel">{children}</div> : null
}

// Attach as static properties (optional but common)
Tabs.List  = TabList
Tabs.Tab   = Tab
Tabs.Panel = TabPanel

// Elegant usage
<Tabs defaultTab="profile">
  <Tabs.List>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="profile"><ProfileContent /></Tabs.Panel>
  <Tabs.Panel id="settings"><SettingsContent /></Tabs.Panel>
</Tabs>
```

---

### 🎤 Interview Questions — Lesson 21

**Q1: What is the difference between HOC, Render Props, and Hooks for code reuse?**

> All three solve cross-cutting concerns (auth, logging, data fetching). HOCs wrap components — can cause "wrapper hell" with many HOCs. Render Props pass rendering control to the consumer — verbose syntax. Custom Hooks (modern) extract stateful logic cleanly — no extra components in the tree, composable, easiest to test. Hooks replaced most HOC/render prop use cases in modern React.

---

## Lesson 22 — React + TypeScript

### 🧠 Core Concepts

TypeScript adds **static type checking** to React — catching bugs at compile time.

```bash
npm create vite@latest my-app -- --template react-ts
```

### Typing Components

```tsx
// Props interface
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger"; // Optional with union
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  disabled = false,
  onClick,
  children,
}) => (
  <button
    className={`btn btn-${variant}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children ?? label}
  </button>
);
```

### Typing useState

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [count, setCount] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
}
```

### Typing useRef and Events

```tsx
function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => inputRef.current?.focus(); // Optional chaining for null safety

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} onChange={handleChange} />
    </form>
  );
}
```

### Typing Custom Hooks

```tsx
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ...
  return { data, loading, error };
}

// Usage — infer the type
const { data } = useFetch<User[]>("/api/users");
// data is User[] | null
```

---

### 🎤 Interview Questions — Lesson 22

**Q1: What is the difference between `React.FC` and a plain function component in TypeScript?**

> `React.FC<Props>` automatically types `children` (as `React.ReactNode`) and the return type. However, it was controversial because it implicitly included `children` even if you didn't want it. Modern TypeScript React (React 18+) removed the implicit `children` from `React.FC`. Many developers prefer typing the props interface directly and using a plain function — it's more explicit and flexible.

**Q2: What is the `as` keyword in TypeScript and when should you avoid it?**

> `as` is a type assertion — you're telling TypeScript "trust me, this is type X". Use it sparingly; it bypasses type safety. Instead of `element as HTMLInputElement`, prefer type guards (`instanceof HTMLInputElement`) or optional chaining (`element?.value`). Type assertions hide real bugs.

---

## Lesson 23 — Accessibility (a11y) in React

### Core Principles (POUR)

```
POUR Principles
────────────────────────────────────────────────────
  P — Perceivable   → alt text, captions, contrast
  O — Operable      → keyboard nav, no timing traps
  U — Understandable → clear labels, error messages
  R — Robust        → works with assistive technology
────────────────────────────────────────────────────
```

### Key Practices

```jsx
// ✅ Semantic HTML is your first a11y tool
function Nav() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
      </ul>
    </nav>
  );
}

// ✅ Accessible form with proper labels
function Form() {
  return (
    <form>
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        type="email"
        aria-required="true"
        aria-describedby="email-hint email-error"
      />
      <div id="email-hint">We'll never share your email</div>
    </form>
  );
}

// ✅ Icon buttons need accessible names
function IconButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} aria-label={label}>
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

// ✅ Live regions for dynamic content
function Notification({ message }) {
  return (
    <div aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}

// ✅ Focus management for modals
function Modal({ isOpen, onClose, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button ref={closeRef} onClick={onClose} aria-label="Close dialog">
        ✕
      </button>
      <h2 id="modal-title">Modal Title</h2>
      {children}
    </div>
  );
}
```

---

### 🎤 Interview Questions — Lesson 23

**Q1: How do you test accessibility in React?**

> Tools: `eslint-plugin-jsx-a11y` (lint-time checks), `@testing-library/jest-dom` (accessible queries in tests), `axe-core` / `jest-axe` (automated a11y audits in tests), browser DevTools accessibility panel, manual testing with screen readers (NVDA, VoiceOver). RTL's `getByRole` queries also encourage accessible markup.

---

## Lesson 24 — Production Build & Deployment

### Build Process

```bash
# Vite build — outputs to /dist
npm run build

# Preview production build locally
npm run preview

# Analyze bundle size
npm install --save-dev rollup-plugin-visualizer
# or: npx source-map-explorer dist/assets/*.js
```

### Environment Variables

```bash
# .env.local (never commit to git)
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=your-dsn-here

# .env.production
VITE_API_URL=https://api.production.com
```

```jsx
// Access in code — Vite requires VITE_ prefix
const apiUrl = import.meta.env.VITE_API_URL;
```

### Deployment Options

```
Platform Comparison
────────────────────────────────────────────────────────────
  Vercel         → Zero-config, automatic deploys from Git
  Netlify        → Similar to Vercel, great CDN
  GitHub Pages   → Free, static sites, gh-pages branch
  AWS S3+CF      → Full control, scalable, more setup
  Docker+nginx   → Containerized, portable, full control
────────────────────────────────────────────────────────────
```

### nginx Config for SPA (React Router support)

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # All routes fallback to index.html (SPA routing)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Performance Checklist

```
✅ Code splitting on routes (React.lazy)
✅ Image optimization (WebP, lazy loading, proper sizing)
✅ Bundle analysis — no large unused dependencies
✅ Tree shaking enabled (Vite does this by default)
✅ Compression (gzip/brotli) on server
✅ CDN for static assets
✅ Core Web Vitals monitoring (LCP, FID, CLS)
✅ Error monitoring (Sentry)
✅ Source maps in production (for debugging, not public)
```

---

### 🎤 Interview Questions — Lesson 24

**Q1: What is the difference between development and production builds in React?**

> Development builds include: detailed error messages, component names in stack traces, React DevTools support, strict mode double-invoking, no minification. Production builds: minified code, tree shaking removes unused code, dead code elimination, optimized for performance, warnings stripped. Always test/benchmark with production builds.

**Q2: How do you handle environment-specific configuration in React?**

> Use `.env` files (`.env`, `.env.local`, `.env.production`). In Vite, prefix with `VITE_` to expose to client code (`import.meta.env.VITE_KEY`). In CRA, use `REACT_APP_` prefix (`process.env.REACT_APP_KEY`). Never put secrets (API keys with write access, private keys) in client-side env vars — they're bundled into the JS and visible to anyone.

---

## 🎯 Final Interview Quick-Reference

### Most Asked React Interview Topics

| Topic        | Key Points                                               |
| ------------ | -------------------------------------------------------- |
| Virtual DOM  | In-memory diffing, reconciliation, efficient DOM updates |
| useState     | Immutability, functional updates, batching               |
| useEffect    | Deps array, cleanup, race conditions                     |
| Custom Hooks | Reusability, starts with `use`, follows hook rules       |
| Performance  | memo, useMemo, useCallback — profile first!              |
| Context      | Avoid for high-frequency updates, memoize value          |
| Keys         | Stable IDs, never index for dynamic lists                |
| Controlled   | React owns value via state + onChange                    |
| TypeScript   | Props interfaces, generics, event types                  |
| Testing      | Behavior-driven, RTL query priority                      |

### Common Interview Code Challenges

```jsx
// 1. Implement a debounce hook
// 2. Build a custom useFetch
// 3. Create a compound Accordion component
// 4. Fix a stale closure bug in useEffect
// 5. Optimize a slow list with memo + useCallback
// 6. Implement infinite scroll
// 7. Build a form with validation
// 8. Create a useLocalStorage hook
// 9. Handle race conditions in fetch
// 10. Implement a simple global store with Context + useReducer
```

---
