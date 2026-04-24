# Modern JavaScript Mastery

## ES6 → ES2024 | Higher-Order Functions | Closures | Modules

> A complete, sequenced guide built for working developers — foundation first, real-world examples throughout.

---

## How This Guide Is Structured

Before we touch any advanced syntax, you need a mental model of _why_ JavaScript evolved the way it did. Each section builds on the last. Skip nothing.

```
Foundation → ES6+ Syntax → Functions as Data → Scope & Execution → Module Systems
```

---

## Part 0 — The Foundation You Must Understand First

### Why JavaScript keeps getting new syntax

JavaScript runs everywhere: browsers, servers (Node.js), phones, edge workers. The language is governed by **TC39**, a committee that proposes and standardizes new features in yearly releases. ES6 (2015) was a massive leap. Every year since (ES2016–ES2024) adds smaller, targeted improvements.

You will encounter _all_ of these in a real codebase — old code uses older patterns, new code uses modern syntax. Your job is to read both.

### Variables: `var` vs `let` vs `const`

This is the true foundation. Understanding _why_ `var` is problematic explains why everything else exists.

```javascript
// ─── var: function-scoped, hoisted, re-declarable ───────────────
function oldWay() {
  console.log(name); // undefined (NOT an error — var is hoisted)
  var name = "Ali";
  console.log(name); // "Ali"

  if (true) {
    var name = "Sara"; // same variable! overwrites it
  }

  console.log(name); // "Sara" — surprise!
}

// ─── let: block-scoped, not hoisted to usable state ─────────────
function modernWay() {
  // console.log(name); // ReferenceError: Cannot access before initialization
  let name = "Ali";

  if (true) {
    let name = "Sara"; // different variable, scoped to this block
    console.log(name); // "Sara"
  }

  console.log(name); // "Ali" — safe!
}

// ─── const: block-scoped, must be initialized, binding is final ──
const MAX_RETRIES = 3;
// MAX_RETRIES = 5; // TypeError

// IMPORTANT: const on objects/arrays doesn't freeze them
const user = { name: "Ali", age: 28 };
user.age = 29; // ✅ allowed — we're mutating, not reassigning
user.city = "Karachi"; // ✅ allowed
// user = {};          // ❌ TypeError — reassignment is blocked
```

**Rule of thumb used at every professional team:**

1. Default to `const`
2. Use `let` when you know the value will change (loop counters, accumulators)
3. Never use `var` in new code

---

## Part 1 — ES6 to ES2024: Modern Syntax

### 1.1 Template Literals

Before ES6, string concatenation was painful:

```javascript
// ─── Old way ────────────────────────────────────────────────────
const greeting = "Hello, " + user.name + "! You have " + count + " messages.";

// ─── Modern way ─────────────────────────────────────────────────
const greeting = `Hello, ${user.name}! You have ${count} messages.`;

// Any expression works inside ${}
const tax = 0.1;
const price = 299.99;
const receipt = `
  Item: Laptop
  Price: $${price}
  Tax: $${(price * tax).toFixed(2)}
  Total: $${(price * (1 + tax)).toFixed(2)}
`.trim();

// Tagged templates — used by libraries like styled-components, graphql, SQL
const query = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`;
```

---

### 1.2 Destructuring — Extracting Values Cleanly

Destructuring is one of the highest-ROI features you will use every single day.

#### Array Destructuring

```javascript
// ─── Without destructuring ──────────────────────────────────────
const coords = [31.5204, 74.3587];
const lat = coords[0];
const lng = coords[1];

// ─── With destructuring ─────────────────────────────────────────
const [lat, lng] = [31.5204, 74.3587];

// Skip elements with commas
const [, second, , fourth] = [10, 20, 30, 40];
console.log(second, fourth); // 20 40

// Swap variables without a temp variable
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1

// ─── Real world: React useState ─────────────────────────────────
const [isLoading, setIsLoading] = useState(false);
const [userData, setUserData] = useState(null);

// ─── Real world: parsing CSV rows ───────────────────────────────
const csvRow = "Ali Hassan,ali@example.com,Karachi,28";
const [name, email, city, age] = csvRow.split(",");
```

#### Object Destructuring

```javascript
// ─── Basic ──────────────────────────────────────────────────────
const user = {
  id: 1,
  name: "Zara Ahmed",
  email: "zara@example.com",
  role: "admin",
  createdAt: "2023-01-15",
};

const { name, email, role } = user;

// ─── Rename while destructuring ─────────────────────────────────
const { name: userName, email: userEmail } = user;
console.log(userName); // "Zara Ahmed"

// ─── Default values ─────────────────────────────────────────────
const { theme = "light", language = "en" } = userPreferences;

// ─── Nested destructuring ───────────────────────────────────────
const apiResponse = {
  status: 200,
  data: {
    user: {
      id: 42,
      profile: {
        name: "Hassan",
        avatar: "https://cdn.example.com/avatar.jpg",
      },
    },
  },
  meta: { page: 1, total: 100 },
};

const {
  data: {
    user: {
      id,
      profile: { name, avatar },
    },
  },
  meta: { page, total },
} = apiResponse;

// ─── Real world: function parameters ────────────────────────────
// Without destructuring — you must remember argument order
function createOrder(userId, productId, quantity, discount, shippingAddress) {}

// With destructuring — order doesn't matter, self-documenting
function createOrder({
  userId,
  productId,
  quantity,
  discount = 0,
  shippingAddress,
}) {
  console.log(
    `Creating order for user ${userId}: ${quantity}x product ${productId}`,
  );
  const total = quantity * getPrice(productId) * (1 - discount);
  ship(total, shippingAddress);
}

createOrder({
  userId: 42,
  productId: 99,
  quantity: 2,
  shippingAddress: "123 Main St, Karachi",
  // discount is optional, defaults to 0
});

// ─── Real world: extracting from API responses ───────────────────
async function fetchUserProfile(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const {
    data: { name, email, role },
    meta: { lastLogin },
  } = await response.json();

  return { name, email, role, lastLogin };
}
```

#### Destructuring in Loops

```javascript
const employees = [
  { id: 1, name: "Ali", department: "Engineering", salary: 150000 },
  { id: 2, name: "Sara", department: "Design", salary: 120000 },
  { id: 3, name: "Omar", department: "Engineering", salary: 160000 },
];

// Perfect for data transformation
for (const { name, department, salary } of employees) {
  console.log(`${name} (${department}): PKR ${salary.toLocaleString()}`);
}

// With Object.entries()
const config = { apiUrl: "https://api.example.com", timeout: 5000, retries: 3 };

for (const [key, value] of Object.entries(config)) {
  console.log(`${key} = ${value}`);
}
```

---

### 1.3 Spread and Rest — `...` Does Two Things

The three dots `...` have two opposite meanings depending on context. This confuses beginners constantly, so let's be explicit.

**Rest** = gather multiple things _into_ one array/object (used in parameters and destructuring)
**Spread** = expand one thing _into_ multiple (used in function calls and literals)

```javascript
// ─────────────────────────────────────────────────────────────────
// REST: collects remaining elements
// ─────────────────────────────────────────────────────────────────

// In function parameters — must be last
function sum(first, second, ...remaining) {
  console.log(first); // 1
  console.log(second); // 2
  console.log(remaining); // [3, 4, 5]
  return first + second + remaining.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4, 5); // 15

// In array destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// In object destructuring — extract known fields, collect rest
const { id, name, ...metadata } = user;
// metadata = { email, role, createdAt, ... }

// ─── Real world: removing a key from an object ───────────────────
function removePassword(user) {
  const { password, ...safeUser } = user;
  return safeUser; // user without the password field
}

// ─────────────────────────────────────────────────────────────────
// SPREAD: expands into individual elements
// ─────────────────────────────────────────────────────────────────

// Arrays — copying and merging
const fruits = ["apple", "banana"];
const veggies = ["carrot", "spinach"];
const food = [...fruits, ...veggies, "mango"]; // new array, no mutation

// ─── Real world: immutable array updates (Redux/state management) ─
const todos = [
  { id: 1, text: "Buy groceries", done: false },
  { id: 2, text: "Write tests", done: false },
];

// Add item — don't push(), create new array
const addedTodo = [...todos, { id: 3, text: "Deploy to prod", done: false }];

// Remove item
const removedTodo = todos.filter((t) => t.id !== 2);

// Update item
const updatedTodo = todos.map((t) => (t.id === 1 ? { ...t, done: true } : t));

// Objects — merging and overriding
const defaults = { theme: "light", language: "en", notifications: true };
const userPrefs = { theme: "dark", fontSize: 16 };

// Later properties override earlier ones
const merged = { ...defaults, ...userPrefs };
// { theme: "dark", language: "en", notifications: true, fontSize: 16 }

// ─── Real world: building API request options ────────────────────
const baseOptions = {
  headers: { "Content-Type": "application/json" },
  credentials: "include",
};

function post(url, body, extraOptions = {}) {
  return fetch(url, {
    ...baseOptions,
    ...extraOptions,
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ─── Real world: cloning to avoid mutation ───────────────────────
// Shallow clone (nested objects still shared)
const copy = { ...original };

// Deep clone — use structuredClone() in modern environments
const deepCopy = structuredClone(original);
```

---

### 1.4 Optional Chaining `?.` — Safe Property Access

Accessing nested properties on data from an API is one of the most error-prone tasks. Optional chaining solves it cleanly.

```javascript
// ─── The old way: defensive checks everywhere ────────────────────
const streetName =
  user && user.address && user.address.location && user.address.location.street;

// ─── With optional chaining ──────────────────────────────────────
const streetName = user?.address?.location?.street;
// Returns undefined instead of throwing TypeError if any part is null/undefined

// Works with array indexing
const firstTag = blogPost?.tags?.[0];

// Works with method calls
const formattedDate = dateObject?.toLocaleDateString();

// ─── Real world: safely reading API responses ────────────────────
async function getOrderStatus(orderId) {
  const order = await fetchOrder(orderId);

  return {
    status: order?.status ?? "unknown",
    customerName: order?.customer?.profile?.displayName ?? "Guest",
    deliveryAddress:
      order?.shipping?.address?.formatted ?? "No address on file",
    estimatedDelivery: order?.tracking?.eta?.toLocaleDateString() ?? "TBD",
    itemCount: order?.items?.length ?? 0,
  };
}

// Works with function calls — only calls if the method exists
const result = someObject?.optionalMethod?.();

// ─── Real world: feature flags and plugin systems ────────────────
class App {
  constructor(plugins = {}) {
    this.plugins = plugins;
  }

  processPayment(amount) {
    // Call analytics plugin if it's installed
    this.plugins?.analytics?.trackEvent("payment", { amount });

    // Call fraud detection if installed
    const riskScore = this.plugins?.fraudDetection?.assess(amount) ?? 0;

    if (riskScore > 0.8) {
      throw new Error("Payment flagged as high risk");
    }

    return this.chargeCard(amount);
  }
}
```

---

### 1.5 Nullish Coalescing `??` — Precise Defaults

`||` (OR) returns the right side for _any falsy value_: `0`, `""`, `false`, `null`, `undefined`.
`??` (nullish coalescing) returns the right side only for `null` or `undefined`. This is critical when `0` or `""` are valid values.

```javascript
// ─── The problem with || ─────────────────────────────────────────
const port = userConfig.port || 3000;
// Bug: if port is 0 (valid!), this returns 3000

const title = article.title || "Untitled";
// Bug: if title is "" (empty string), this returns "Untitled"

const isAdmin = user.isAdmin || false;
// Bug: if isAdmin is false (intentionally), this still works here
// but consider: user.score || 0 — if score is 0, you get 0 anyway
// but it's semantically wrong

// ─── Nullish coalescing: only triggers on null/undefined ─────────
const port = userConfig.port ?? 3000; // 0 stays as 0
const title = article.title ?? "Untitled"; // "" stays as ""
const count = response.count ?? 0; // 0 stays as 0

// ─── Nullish assignment ??= (ES2021) ─────────────────────────────
// Only assigns if the variable is null or undefined
let user = null;
user ??= { name: "Guest", role: "viewer" };
// user is now { name: "Guest", role: "viewer" }

// ─── Real world: configuration merging ──────────────────────────
function createServer(config = {}) {
  const host = config.host ?? "localhost";
  const port = config.port ?? 8080; // 0 is valid — use ??
  const maxConnections = config.maxConnections ?? 100;
  const timeout = config.timeout ?? 30000; // 0 would mean no timeout
  const debug = config.debug ?? false; // false is valid

  console.log(`Starting server at ${host}:${port}`);
}

// ─── Combine with optional chaining ─────────────────────────────
function displayUserCard(userId) {
  const user = userDatabase.get(userId);

  return {
    name: user?.profile?.displayName ?? "Anonymous",
    avatar: user?.profile?.avatarUrl ?? "/default-avatar.png",
    bio: user?.profile?.bio ?? "No bio provided.",
    followerCount: user?.stats?.followers ?? 0,
    isVerified: user?.verification?.status === "verified",
  };
}
```

---

### 1.6 Arrow Functions — Behavior, Not Just Syntax

Arrow functions are not just shorthand. They behave differently from regular functions in one critical way: they don't have their own `this`. We'll cover that in depth in the closures section — for now, understand the syntax.

```javascript
// ─── Syntax variations ──────────────────────────────────────────
const double = (x) => x * 2; // one param, implicit return
const add = (a, b) => a + b; // two params
const greet = () => "Hello!"; // no params
const withBody = (x) => {
  // block body
  const result = x * 2;
  return result; // explicit return required
};

// Return an object literal — must wrap in parens
const toObj = (name) => ({ name, createdAt: Date.now() });

// ─── Real world: callbacks ───────────────────────────────────────
const prices = [29.99, 149.99, 9.99, 89.99];

const discounted = prices.map((price) => price * 0.9);
const expensive = prices.filter((price) => price > 50);
const total = prices.reduce((sum, price) => sum + price, 0);

// ─── Multiline pipelines ─────────────────────────────────────────
const processOrders = (orders) =>
  orders
    .filter((order) => order.status === "paid")
    .map((order) => ({
      ...order,
      total: order.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    }))
    .sort((a, b) => b.total - a.total);
```

---

### 1.7 ES2017–ES2024 Features You Will Encounter on the Job

#### `async`/`await` (ES2017) — Already Essential

```javascript
// ─── Promise chains (still valid, just less readable) ────────────
fetchUser(id)
  .then((user) => fetchOrders(user.id))
  .then((orders) => processOrders(orders))
  .catch((err) => console.error(err));

// ─── async/await — reads like synchronous code ──────────────────
async function loadUserDashboard(userId) {
  try {
    const user = await fetchUser(userId);
    const [orders, notifications] = await Promise.all([
      fetchOrders(user.id),
      fetchNotifications(user.id),
    ]);

    return { user, orders, notifications };
  } catch (error) {
    console.error("Dashboard load failed:", error.message);
    throw error; // re-throw so the caller can handle it
  }
}
```

#### Object Methods (ES2017)

```javascript
const config = { host: "localhost", port: 3000, debug: true };

Object.keys(config); // ["host", "port", "debug"]
Object.values(config); // ["localhost", 3000, true]
Object.entries(config); // [["host","localhost"], ["port",3000], ["debug",true]]

// Build an object from entries — very useful in transformations
const uppercased = Object.fromEntries(
  Object.entries(config).map(([k, v]) => [k.toUpperCase(), v]),
);
// { HOST: "localhost", PORT: 3000, DEBUG: true }
```

#### Logical Assignment (ES2021)

```javascript
// ||= assigns if falsy
// &&= assigns if truthy
// ??= assigns if null/undefined

let user = getUser();

user.name ||= "Anonymous"; // set default name if falsy
user.preferences &&= sanitize(user.preferences); // only process if it exists
user.sessionToken ??= generateToken(); // generate only if not already set
```

#### `at()` method (ES2022)

```javascript
const items = ["a", "b", "c", "d", "e"];

items.at(0); // "a"  — same as items[0]
items.at(-1); // "e"  — last item (cleaner than items[items.length - 1])
items.at(-2); // "d"  — second to last
```

#### `structuredClone()` (ES2022)

```javascript
// Deep clone without JSON.parse(JSON.stringify()) hacks
const original = {
  name: "Ali",
  scores: [95, 87, 92],
  metadata: { created: new Date() },
};

const clone = structuredClone(original);
clone.scores.push(100); // does not affect original
```

#### `Array.groupBy()` / `Object.groupBy()` (ES2024)

```javascript
const orders = [
  { id: 1, status: "shipped", amount: 150 },
  { id: 2, status: "pending", amount: 75 },
  { id: 3, status: "shipped", amount: 200 },
  { id: 4, status: "cancelled", amount: 50 },
];

const byStatus = Object.groupBy(orders, (order) => order.status);
// {
//   shipped: [{ id:1,... }, { id:3,... }],
//   pending: [{ id:2,... }],
//   cancelled: [{ id:4,... }]
// }
```

---

## Part 2 — Higher-Order Functions: Map, Filter, Reduce

### 2.1 What Is a Higher-Order Function?

A higher-order function (HOF) is any function that:

- **Takes a function as an argument**, or
- **Returns a function**

This is possible because in JavaScript, functions are _first-class values_ — they can be stored in variables, passed around, and returned just like numbers or strings.

```javascript
// Functions stored in variables
const greet = function (name) {
  return `Hello, ${name}`;
};
const greetArrow = (name) => `Hello, ${name}`;

// Function passed as argument
setTimeout(() => console.log("1 second later"), 1000);

// Function returned from function
function multiplier(factor) {
  return (number) => number * factor; // returns a new function
}

const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 2.2 Understanding the Callback Pattern

Before using map/filter/reduce, understand that each accepts a _callback_ — a function you write that defines _what to do_ with each element.

```javascript
// This is forEach — the simplest HOF. No return value.
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function (num, index) {
  console.log(`Index ${index}: ${num}`);
});

// Arrow function — same thing
numbers.forEach((num, index) => console.log(`Index ${index}: ${num}`));
```

### 2.3 `map` — Transform Every Element

`map` creates a _new array_ by applying your callback to every element. The original array is never modified. The new array always has the same length.

```javascript
// Mental model: [a, b, c].map(fn) → [fn(a), fn(b), fn(c)]

const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map((n) => n ** 2); // [1, 4, 9, 16, 25]

// ─── Real world: transform API data for the UI ───────────────────
const apiUsers = [
  {
    id: 1,
    first_name: "Ali",
    last_name: "Hassan",
    is_active: 1,
    created_at: "2023-01-15",
  },
  {
    id: 2,
    first_name: "Sara",
    last_name: "Khan",
    is_active: 0,
    created_at: "2023-03-22",
  },
  {
    id: 3,
    first_name: "Omar",
    last_name: "Baig",
    is_active: 1,
    created_at: "2022-11-08",
  },
];

// Shape the data for what the UI actually needs
const displayUsers = apiUsers.map((user) => ({
  id: user.id,
  fullName: `${user.first_name} ${user.last_name}`,
  isActive: Boolean(user.is_active), // 1/0 → true/false
  joinedDate: new Date(user.created_at).toLocaleDateString("en-PK"),
  initials: `${user.first_name[0]}${user.last_name[0]}`,
}));

// ─── Real world: normalizing prices ─────────────────────────────
const products = [
  { id: 1, name: "Laptop", priceUSD: 999 },
  { id: 2, name: "Mouse", priceUSD: 29 },
  { id: 3, name: "Monitor", priceUSD: 349 },
];

const USD_TO_PKR = 278;

const productsInPKR = products.map((product) => ({
  ...product,
  pricePKR: Math.round(product.priceUSD * USD_TO_PKR),
  priceDisplay: `PKR ${(product.priceUSD * USD_TO_PKR).toLocaleString()}`,
}));

// ─── Real world: generating JSX/HTML from data ───────────────────
// React component
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <span>{user.fullName}</span>
          <span className={user.isActive ? "active" : "inactive"} />
        </li>
      ))}
    </ul>
  );
}
```

### 2.4 `filter` — Keep Elements That Pass a Test

`filter` creates a _new array_ with only the elements for which your callback returns `true`. Original array unchanged. New array can be shorter (or empty).

```javascript
// Mental model: [a,b,c].filter(fn) → keep only where fn returns true

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const evens = numbers.filter((n) => n % 2 === 0); // [2, 4, 6, 8]

// ─── Real world: product search/filter UI ───────────────────────
const inventory = [
  {
    id: 1,
    name: "Laptop",
    category: "electronics",
    price: 150000,
    inStock: true,
    rating: 4.5,
  },
  {
    id: 2,
    name: "T-Shirt",
    category: "clothing",
    price: 1500,
    inStock: true,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Phone",
    category: "electronics",
    price: 89000,
    inStock: false,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Headphones",
    category: "electronics",
    price: 15000,
    inStock: true,
    rating: 4.1,
  },
  {
    id: 5,
    name: "Jeans",
    category: "clothing",
    price: 3500,
    inStock: true,
    rating: 3.9,
  },
];

function filterProducts(products, filters) {
  return products.filter((product) => {
    // Each condition must be true for the product to pass
    if (filters.category && product.category !== filters.category) return false;
    if (filters.inStockOnly && !product.inStock) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.minRating && product.rating < filters.minRating) return false;
    return true;
  });
}

const results = filterProducts(inventory, {
  category: "electronics",
  inStockOnly: true,
  maxPrice: 20000,
  minRating: 4.0,
});
// [{ id: 4, name: "Headphones", ... }]

// ─── Real world: removing invalid/null data ──────────────────────
const rawData = [null, { id: 1 }, undefined, { id: 2 }, null, { id: 3 }];
const cleanData = rawData.filter(Boolean); // removes all falsy values
// [{ id: 1 }, { id: 2 }, { id: 3 }]

// ─── Real world: access control ─────────────────────────────────
function getVisibleMenuItems(menuItems, userRole) {
  return menuItems.filter(
    (item) => !item.requiredRole || item.requiredRole === userRole,
  );
}
```

### 2.5 `reduce` — The Swiss Army Knife

`reduce` is the most powerful and most misunderstood HOF. It iterates over an array and builds up a _single output value_ — which can be a number, string, object, or even another array.

**Signature:** `array.reduce(callback, initialValue)`
**Callback receives:** `(accumulator, currentElement, index, array)`

```javascript
// ─── Simplest form: summing ──────────────────────────────────────
const numbers = [10, 20, 30, 40];
const sum = numbers.reduce((acc, num) => acc + num, 0);
// Step by step:
// acc=0,  num=10 → return 10
// acc=10, num=20 → return 30
// acc=30, num=30 → return 60
// acc=60, num=40 → return 100

// ─── Building an object from an array ───────────────────────────
const users = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" },
  { id: 3, name: "Omar" },
];

// Create a lookup table: { 1: {...}, 2: {...}, 3: {...} }
const usersById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

// Now O(1) lookup instead of O(n) find:
console.log(usersById[2]); // { id: 2, name: "Sara" }

// ─── Real world: shopping cart total with tax ────────────────────
const cart = [
  { name: "Laptop", price: 150000, qty: 1, taxRate: 0.17 },
  { name: "Mouse", price: 2500, qty: 2, taxRate: 0.17 },
  { name: "Book", price: 800, qty: 3, taxRate: 0 }, // books tax-exempt
];

const summary = cart.reduce(
  (acc, item) => {
    const subtotal = item.price * item.qty;
    const tax = subtotal * item.taxRate;

    return {
      subtotal: acc.subtotal + subtotal,
      tax: acc.tax + tax,
      total: acc.total + subtotal + tax,
      itemCount: acc.itemCount + item.qty,
    };
  },
  { subtotal: 0, tax: 0, total: 0, itemCount: 0 },
);

// ─── Real world: grouping data (before Object.groupBy) ───────────
const transactions = [
  { id: 1, type: "income", amount: 50000 },
  { id: 2, type: "expense", amount: 12000 },
  { id: 3, type: "income", amount: 30000 },
  { id: 4, type: "expense", amount: 8000 },
];

const grouped = transactions.reduce((acc, tx) => {
  if (!acc[tx.type]) acc[tx.type] = [];
  acc[tx.type].push(tx);
  return acc;
}, {});

// ─── Real world: flatten nested arrays ──────────────────────────
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
// [1, 2, 3, 4, 5, 6]
// Note: Array.flat() is cleaner for this specific case

// ─── Real world: counting occurrences ───────────────────────────
const tags = ["js", "react", "js", "node", "react", "js", "ts"];

const tagCount = tags.reduce((acc, tag) => {
  acc[tag] = (acc[tag] ?? 0) + 1;
  return acc;
}, {});
// { js: 3, react: 2, node: 1, ts: 1 }
```

### 2.6 Chaining — Building Real Data Pipelines

The real power emerges when you chain these methods. Think of it as an assembly line where data flows through transformations.

```javascript
// ─── Real world: sales report pipeline ──────────────────────────
const salesData = [
  {
    orderId: "A001",
    region: "North",
    product: "Laptop",
    qty: 2,
    unitPrice: 150000,
    status: "completed",
  },
  {
    orderId: "A002",
    region: "South",
    product: "Mouse",
    qty: 5,
    unitPrice: 2500,
    status: "completed",
  },
  {
    orderId: "A003",
    region: "North",
    product: "Monitor",
    qty: 1,
    unitPrice: 45000,
    status: "cancelled",
  },
  {
    orderId: "A004",
    region: "South",
    product: "Laptop",
    qty: 1,
    unitPrice: 150000,
    status: "completed",
  },
  {
    orderId: "A005",
    region: "North",
    product: "Keyboard",
    qty: 3,
    unitPrice: 5000,
    status: "completed",
  },
];

const report = salesData
  // Step 1: only count completed orders
  .filter((order) => order.status === "completed")

  // Step 2: calculate revenue for each order
  .map((order) => ({
    ...order,
    revenue: order.qty * order.unitPrice,
  }))

  // Step 3: group and sum by region
  .reduce((acc, order) => {
    if (!acc[order.region]) {
      acc[order.region] = {
        totalRevenue: 0,
        orderCount: 0,
        topProduct: null,
        maxRevenue: 0,
      };
    }

    acc[order.region].totalRevenue += order.revenue;
    acc[order.region].orderCount += 1;

    if (order.revenue > acc[order.region].maxRevenue) {
      acc[order.region].maxRevenue = order.revenue;
      acc[order.region].topProduct = order.product;
    }

    return acc;
  }, {});

/*
{
  North: { totalRevenue: 315000, orderCount: 2, topProduct: "Laptop" },
  South: { totalRevenue: 162500, orderCount: 2, topProduct: "Laptop" }
}
*/
```

### 2.7 Other Essential Array HOFs

```javascript
// ─── find / findIndex ────────────────────────────────────────────
const user = users.find((u) => u.id === 42); // first match or undefined
const idx = users.findIndex((u) => u.id === 42); // index or -1

// ─── some / every ────────────────────────────────────────────────
const hasAdmin = users.some((u) => u.role === "admin"); // true if ANY match
const allActive = users.every((u) => u.isActive === true); // true if ALL match

// ─── flat / flatMap ──────────────────────────────────────────────
const matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];
matrix.flat(); // [1, 2, 3, 4, 5, 6]
matrix.flat(2); // flattens 2 levels deep

// flatMap = map + flat in one pass (more efficient)
const sentences = ["Hello world", "foo bar baz"];
const words = sentences.flatMap((s) => s.split(" "));
// ["Hello", "world", "foo", "bar", "baz"]

// ─── sort ─────────────────────────────────────────────────────────
// CAUTION: sort mutates the original array — always copy first
const sorted = [...products].sort((a, b) => a.price - b.price); // ascending
const byName = [...products].sort((a, b) => a.name.localeCompare(b.name));
```

---

## Part 3 — Closures, `this` Binding, and Execution Context

This is where JavaScript truly differs from most languages. Master this section and you will understand code that confuses the majority of developers.

### 3.1 Execution Context and the Call Stack

Every time JavaScript runs code, it creates an **execution context** — an environment that tracks:

- What variables exist (the variable environment)
- What `this` refers to
- The outer lexical environment (for scope chain lookups)

```javascript
// Three types of execution context:

// 1. Global execution context — created when the script starts
// "this" in global = window (browser) or {} (Node.js module)

// 2. Function execution context — created each time a function is called
function outer() {
  const x = 10;

  function inner() {
    const y = 20;
    console.log(x + y); // 30 — inner can access outer's variables
  }

  inner(); // new execution context created, pushed to call stack
} // inner's context popped, outer's context popped

outer();

// 3. Eval context — don't use eval
```

### 3.2 Scope Chain — How Variable Lookup Works

When a function references a variable, JavaScript looks in this order:

1. Local scope (current function)
2. Outer function scope (if nested)
3. ... (keeps going up)
4. Global scope
5. `ReferenceError` if not found

```javascript
const appName = "MyApp"; // global

function getGreeting(lang) {
  // lang is local to getGreeting
  const prefix = "Welcome"; // also local to getGreeting

  function buildMessage(user) {
    // user is local to buildMessage
    // Can access: user (own), prefix (outer), lang (outer), appName (global)
    return `${prefix} to ${appName}, ${user}! (${lang})`;
  }

  return buildMessage;
}

const englishGreeter = getGreeting("en");
console.log(englishGreeter("Ali")); // "Welcome to MyApp, Ali! (en)"
```

### 3.3 Closures — Functions That Remember

A closure is a function that _retains access to its lexical scope even after that scope has finished executing_. This is not a trick or edge case — it is a fundamental part of how JavaScript works.

```javascript
function makeCounter() {
  let count = 0; // This variable lives in makeCounter's scope

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    getCount() {
      return count;
    },
  };
  // makeCounter finishes execution... but count is NOT garbage collected
  // because the returned functions still reference it
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount()); // 2

// Each call to makeCounter creates a separate closure
const counterA = makeCounter();
const counterB = makeCounter();
counterA.increment();
counterA.increment();
counterB.increment();
console.log(counterA.getCount()); // 2
console.log(counterB.getCount()); // 1 — completely independent!
```

**Why closures matter in practice:**

```javascript
// ─── 1. Data encapsulation (private state) ───────────────────────
function createBankAccount(initialBalance) {
  let balance = initialBalance; // truly private — no way to access directly
  const transactions = [];

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("Deposit must be positive");
      balance += amount;
      transactions.push({ type: "deposit", amount, balance });
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      transactions.push({ type: "withdrawal", amount, balance });
    },
    getBalance() {
      return balance;
    },
    getHistory() {
      return [...transactions];
    }, // return a copy
  };
}

const account = createBankAccount(10000);
account.deposit(5000);
account.withdraw(2000);
console.log(account.getBalance()); // 13000
// account.balance — undefined. Truly private.

// ─── 2. Function factories ───────────────────────────────────────
function createTaxCalculator(taxRate) {
  return function (price) {
    return {
      original: price,
      tax: price * taxRate,
      total: price * (1 + taxRate),
    };
  };
}

const pakistanTax = createTaxCalculator(0.17);
const euTax = createTaxCalculator(0.2);

console.log(pakistanTax(1000)); // { original: 1000, tax: 170, total: 1170 }
console.log(euTax(1000)); // { original: 1000, tax: 200, total: 1200 }

// ─── 3. Memoization — caching expensive results ──────────────────
function memoize(fn) {
  const cache = new Map(); // closed over by the returned function

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Cache hit!");
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize((n) => {
  // Imagine this takes 2 seconds
  return n * n * n;
});

expensiveCalculation(10); // computed: 1000
expensiveCalculation(10); // cache hit! returns 1000 instantly
expensiveCalculation(20); // computed: 8000

// ─── 4. Event handlers maintaining state ─────────────────────────
function createToggle(element) {
  let isVisible = false; // closed over

  return function toggle() {
    isVisible = !isVisible;
    element.style.display = isVisible ? "block" : "none";
  };
}

// ─── 5. Partial application ──────────────────────────────────────
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function fetchWithAuth(token, url, options) {
  return fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Pre-fill the token — get a new function that only needs url + options
const authedFetch = partial(fetchWithAuth, "my-secret-token");

authedFetch("/api/users");
authedFetch("/api/orders", { method: "POST" });
```

**The classic closure gotcha in loops:**

```javascript
// ─── BUG: var in a loop ──────────────────────────────────────────
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3 — all callbacks share the SAME i (var is function-scoped)
// By the time callbacks run, the loop is done and i = 3

// ─── FIX 1: use let (block-scoped, new binding each iteration) ───
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2 ✅

// ─── FIX 2: use IIFE to capture the value (older style) ──────────
for (var i = 0; i < 3; i++) {
  (function (captured_i) {
    setTimeout(() => console.log(captured_i), 100);
  })(i);
}
// Prints: 0, 1, 2 ✅
```

---

### 3.4 `this` Binding — The Hardest Part

`this` is determined by _how a function is called_, not where it is written (with one exception: arrow functions).

**There are 4 rules, applied in priority order:**

```javascript
// ─── RULE 1: Default binding ─────────────────────────────────────
// When called as a plain function, this = global (or undefined in strict mode)
function showThis() {
  console.log(this);
}
showThis(); // window (browser) | global (Node) | undefined (strict mode)

// ─── RULE 2: Implicit binding ────────────────────────────────────
// When called as a method on an object, this = that object
const user = {
  name: "Ali",
  greet() {
    console.log(`Hi, I'm ${this.name}`); // this = user
  },
};
user.greet(); // "Hi, I'm Ali"

// The trap: method extraction loses its this
const greetFn = user.greet;
greetFn(); // "Hi, I'm undefined" — called as plain function now!

// ─── RULE 3: Explicit binding ────────────────────────────────────
// call(), apply(), bind() let you set this manually

const admin = { name: "Sara" };

user.greet.call(admin); // "Hi, I'm Sara" — call with args: fn.call(thisArg, arg1, arg2)
user.greet.apply(admin); // "Hi, I'm Sara" — apply with args array: fn.apply(thisArg, [args])

const greetAsAdmin = user.greet.bind(admin); // returns a new permanently-bound function
greetAsAdmin(); // "Hi, I'm Sara" — this is locked in forever

// ─── RULE 4: new binding ─────────────────────────────────────────
// When called with new, this = the newly created object
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const ali = new Person("Ali", 28);
console.log(ali.name); // "Ali"
```

**Arrow functions — the exception:**

```javascript
// Arrow functions DO NOT have their own this.
// They inherit this from the enclosing lexical scope (where they are WRITTEN).

// ─── The classic problem this solves ─────────────────────────────
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    // Using a regular function — this is lost inside setInterval's callback
    // setInterval(function() {
    //   this.seconds++; // BUG: this = window here, not the Timer instance
    // }, 1000);

    // Using an arrow function — inherits this from start()
    setInterval(() => {
      this.seconds++; // ✅ this = Timer instance
      console.log(this.seconds);
    }, 1000);
  }
}

const timer = new Timer();
timer.start();

// ─── Real world: React class components (you'll encounter these) ──
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
    // Must bind regular methods or they lose this
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value }); // this = component
  }

  // Alternatively, use class field arrow function (no bind needed)
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.query); // this is always correct
  };
}
```

**`bind`, `call`, `apply` in real scenarios:**

```javascript
// ─── bind: creating reusable methods ─────────────────────────────
class Logger {
  constructor(prefix) {
    this.prefix = prefix;
    // Bind once in constructor so log can be passed around safely
    this.log = this.log.bind(this);
  }

  log(message) {
    console.log(`[${this.prefix}] ${message}`);
  }
}

const apiLogger = new Logger("API");
const dbLogger = new Logger("DB");

// These can now be passed as callbacks without losing this
setTimeout(apiLogger.log, 0, "Request received");
[1, 2, 3].forEach(dbLogger.log); // works correctly

// ─── call: borrowing methods ──────────────────────────────────────
// Array-like objects (NodeList, arguments) don't have array methods
// Old technique (less needed with modern JS)
function sum() {
  return Array.prototype.reduce.call(arguments, (acc, n) => acc + n, 0);
}

// ─── apply: spreading array as arguments ──────────────────────────
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const max = Math.max.apply(null, numbers); // 9
// Modern equivalent: Math.max(...numbers)
```

---

### 3.5 Prototypes and the Class Syntax

Understanding `this` requires knowing how inheritance works under the hood.

```javascript
// ─── Prototype chain — how it really works ───────────────────────
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound.`;
};

function Dog(name, breed) {
  Animal.call(this, name); // call parent constructor with this
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  return `${this.name} barks!`;
};

// ─── ES6 class — same thing, cleaner syntax ──────────────────────
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // calls Animal's constructor
    this.breed = breed;
  }

  bark() {
    return `${this.name} barks!`;
  }

  // Override parent method
  speak() {
    return `${super.speak()} Specifically, it barks.`;
  }
}

const rex = new Dog("Rex", "Labrador");
rex.bark(); // "Rex barks!"
rex.speak(); // "Rex makes a sound. Specifically, it barks."

// ─── Real world: base service class pattern ──────────────────────
class ApiService {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async request(method, endpoint, body = null) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  get(endpoint) {
    return this.request("GET", endpoint);
  }
  post(endpoint, body) {
    return this.request("POST", endpoint, body);
  }
  put(endpoint, body) {
    return this.request("PUT", endpoint, body);
  }
  delete(endpoint) {
    return this.request("DELETE", endpoint);
  }
}

class UserService extends ApiService {
  constructor(token) {
    super("https://api.example.com", token);
  }

  getUser(id) {
    return this.get(`/users/${id}`);
  }
  updateUser(id, data) {
    return this.put(`/users/${id}`, data);
  }
  deleteUser(id) {
    return this.delete(`/users/${id}`);
  }
}

const userService = new UserService("my-token");
const user = await userService.getUser(42);
```

---

## Part 4 — Module Systems: ESM vs CommonJS

### 4.1 Why Modules Exist

Without modules, all code shares one global scope. As projects grow, this causes:

- Name collisions (`var user` in two files = chaos)
- No way to hide implementation details
- Impossible to track dependencies

Modules give each file its own scope, explicit imports, and explicit exports.

### 4.2 CommonJS (CJS) — Node.js Origin

CommonJS was created for Node.js in 2009 and is still used heavily in backend code. You will encounter it in older packages and Node.js scripts.

```javascript
// ─── math.js — exporting ─────────────────────────────────────────
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
const PI = 3.14159;

// Export multiple things
module.exports = { add, subtract, PI };

// OR export one default
module.exports = function add(a, b) {
  return a + b;
};

// ─── app.js — importing ──────────────────────────────────────────
const { add, subtract, PI } = require("./math");
const add = require("./math"); // if single export

// Built-in modules
const fs = require("fs");
const path = require("path");
const http = require("http");

// npm packages
const express = require("express");
const _ = require("lodash");
```

**Key characteristics of CommonJS:**

```javascript
// 1. Synchronous — require() blocks until the module is loaded
//    This is fine for Node.js startup, bad for browsers

// 2. Dynamic — require() can be called anywhere
function loadPlugin(name) {
  if (name === "analytics") {
    const plugin = require("./plugins/analytics"); // conditional import
    return plugin;
  }
}

// 3. module.exports is evaluated once, then cached
// Multiple require() calls return the same object

// ─── Real world CJS: Express server structure ────────────────────

// routes/users.js
const express = require("express");
const router = express.Router();
const { getUser, createUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

router.get("/:id", authMiddleware, getUser);
router.post("/", createUser);

module.exports = router;

// server.js
const express = require("express");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.listen(3000);
```

### 4.3 ES Modules (ESM) — The Standard

ESM is the official JavaScript module system, built into the language spec. It works natively in modern browsers and Node.js (v12+ with `.mjs` extension or `"type": "module"` in package.json).

```javascript
// ─── Named exports ───────────────────────────────────────────────

// utils/math.js
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}
export const PI = 3.14159;

// ─── Default export ──────────────────────────────────────────────
// Use when a module represents one primary thing

// services/UserService.js
export default class UserService {
  constructor(apiClient) {
    this.api = apiClient;
  }
  getUser(id) {
    return this.api.get(`/users/${id}`);
  }
}

// ─── Named imports ───────────────────────────────────────────────
import { add, subtract, PI } from "./utils/math.js";

// Rename on import
import { add as addNumbers } from "./utils/math.js";

// Import everything as namespace
import * as math from "./utils/math.js";
math.add(1, 2);

// Import default
import UserService from "./services/UserService.js";

// Import default + named in one line
import UserService, { USER_ROLES } from "./services/UserService.js";

// ─── Re-exporting (barrel files) ────────────────────────────────
// components/index.js — a common pattern in large codebases
export { Button } from "./Button.js";
export { Modal } from "./Modal.js";
export { Table } from "./Table.js";
export { default as Form } from "./Form.js";

// Now consumers import from one place:
import { Button, Modal, Table, Form } from "./components";

// ─── Dynamic imports (ESM) ───────────────────────────────────────
// Lazy loading — import only when needed
async function loadHeavyFeature() {
  const { HeavyChart } = await import("./HeavyChart.js");
  return new HeavyChart();
}

// Code splitting in React
const LazyDashboard = React.lazy(() => import("./Dashboard.jsx"));
```

### 4.4 CJS vs ESM: The Critical Differences

```
┌──────────────────────┬──────────────────────┬────────────────────────────┐
│ Feature              │ CommonJS (CJS)        │ ES Modules (ESM)           │
├──────────────────────┼──────────────────────┼────────────────────────────┤
│ Syntax               │ require / exports     │ import / export            │
│ Loading              │ Synchronous           │ Asynchronous               │
│ Analysis             │ Runtime (dynamic)     │ Static (parse time)        │
│ Tree shaking         │ Not supported         │ Supported (dead code gone) │
│ Default in browsers  │ No (needs bundler)    │ Yes (native)               │
│ Default in Node.js   │ Yes                   │ With "type":"module"       │
│ Top-level await      │ No                    │ Yes                        │
│ .this in module      │ module.exports        │ undefined                  │
└──────────────────────┴──────────────────────┴────────────────────────────┘
```

```javascript
// ─── Top-level await (ESM only) ──────────────────────────────────
// config.js
const config = await fetch("/api/config").then((r) => r.json());
export { config }; // this works in ESM — would fail in CJS

// ─── Static analysis — why ESM enables tree shaking ──────────────
// ESM: bundlers know at BUILD time what you import
import { add } from "./math.js"; // bundler sees: only 'add' is used

// CJS: unknown until runtime
const math = require("./math"); // bundler must include ALL of math
const fn = math[someVariable]; // could be anything!
```

### 4.5 Real-World Patterns You Will Encounter

```javascript
// ─── Pattern 1: index.js barrel (very common in React projects) ──
// src/hooks/index.js
export { useAuth } from "./useAuth.js";
export { useFetch } from "./useFetch.js";
export { useLocalStorage } from "./useLocalStorage.js";

// In your component — clean single import
import { useAuth, useFetch } from "../hooks";

// ─── Pattern 2: named exports for utilities, default for main ────
// services/api.js
const BASE_URL = "https://api.example.com";

export const createHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
});

export const handleError = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response;
};

// Default export is the main thing this module does
export default class ApiClient {
  constructor(token) {
    this.token = token;
  }

  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: createHeaders(this.token)
    });
    return handleError(response).then(r => r.json());
  }
}

// ─── Pattern 3: interop — using CJS from ESM and vice versa ─────
// In Node.js, you can import CJS modules using ESM syntax
import express from "express"; // works — CJS default export
import { createServer } from "http"; // works — CJS named via destructure

// CJS cannot use import/export natively
// But Babel/TypeScript compiles ESM → CJS during build

// ─── Pattern 4: package.json for dual packages (CJS + ESM) ──────
// package.json — modern libraries ship both
{
  "main": "./dist/cjs/index.js",     // CJS entry
  "module": "./dist/esm/index.js",   // ESM entry (for bundlers)
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js"
    }
  }
}
```

---

## Part 5 — Putting It All Together

A realistic module that uses everything from this guide:

```javascript
// services/orderProcessor.js

// ESM imports
import { createConnection } from "./db.js";
import { sendEmail } from "./email.js";
import { Logger } from "./logger.js";

const logger = new Logger("OrderProcessor");

// Private module-level state (not exported — true encapsulation)
const processedOrderIds = new Set();

// Factory function using closures for private state
function createOrderProcessor({ taxRate = 0.17, currency = "PKR" } = {}) {
  let processedCount = 0; // private via closure

  // Uses destructuring, optional chaining, nullish coalescing
  async function processOrder({ orderId, customer, items = [], discount = 0 }) {
    if (processedOrderIds.has(orderId)) {
      logger.log(`Order ${orderId} already processed`);
      return null;
    }

    // map + reduce pipeline
    const enrichedItems = items
      .filter((item) => item?.quantity > 0) // remove zero-qty items
      .map((item) => ({
        ...item,
        subtotal: item.price * item.quantity,
        taxAmount: item.price * item.quantity * taxRate,
      }));

    const { subtotal, tax, total } = enrichedItems.reduce(
      (acc, item) => ({
        subtotal: acc.subtotal + item.subtotal,
        tax: acc.tax + item.taxAmount,
        total: acc.total + item.subtotal + item.taxAmount,
      }),
      { subtotal: 0, tax: 0, total: 0 },
    );

    const discountedTotal = total * (1 - discount);

    const order = {
      orderId,
      customer: {
        name: customer?.profile?.displayName ?? customer?.name ?? "Guest",
        email: customer?.email ?? null,
        address: customer?.address?.formatted ?? "No address",
      },
      items: enrichedItems,
      summary: {
        subtotal,
        tax,
        discount,
        total: discountedTotal,
        currency,
        displayTotal: `${currency} ${discountedTotal.toLocaleString()}`,
      },
      processedAt: new Date().toISOString(),
    };

    await createConnection().then((db) => db.orders.insert(order));

    // Optional chaining for optional email notification
    (await customer?.email) &&
      sendEmail({
        to: customer.email,
        subject: `Order ${orderId} confirmed`,
        body: `Your total is ${order.summary.displayTotal}`,
      });

    processedOrderIds.add(orderId);
    processedCount++;

    return order;
  }

  return {
    processOrder,
    getProcessedCount: () => processedCount,
  };
}

// Named export for the factory
export { createOrderProcessor };

// Default export — a pre-configured instance for standard use
export default createOrderProcessor({ taxRate: 0.17, currency: "PKR" });
```

```javascript
// main.js — consuming the module

import orderProcessor, {
  createOrderProcessor,
} from "./services/orderProcessor.js";

// Using the default instance
const result = await orderProcessor.processOrder({
  orderId: "ORD-2024-001",
  customer: {
    profile: { displayName: "Ali Hassan" },
    email: "ali@example.com",
    address: { formatted: "123 Main St, Karachi" },
  },
  items: [
    { id: "P1", name: "Laptop", price: 150000, quantity: 1 },
    { id: "P2", name: "Mouse", price: 2500, quantity: 2 },
  ],
  discount: 0.1,
});

console.log(result?.summary.displayTotal); // "PKR 138,375"
```

---

## Cheat Sheet — Quick Reference

### Destructuring

```javascript
const { a, b: renamed, c = "default" } = obj; // object
const [first, , third, ...rest] = arr; // array
function fn({ id, name = "Guest" }) {} // in params
```

### Spread / Rest

```javascript
const merged = { ...obj1, ...obj2 }; // merge objects
const combined = [...arr1, ...arr2]; // merge arrays
function fn(first, ...rest) {} // rest in params
fn(...args); // spread in calls
```

### Safe access

```javascript
obj?.prop?.nested; // optional chaining
arr?.[0]; // optional index
fn?.(); // optional call
value ?? "default"; // nullish coalescing
value ??= "default"; // nullish assignment
```

### HOFs

```javascript
arr.map((x) => transform(x)); // transform each
arr.filter((x) => condition(x)); // keep matching
arr.reduce((acc, x) => acc + x, initial); // accumulate
arr.find((x) => x.id === id); // first match
arr.some((x) => condition(x)); // any match?
arr.every((x) => condition(x)); // all match?
```

### Closures

```javascript
function factory(config) {
  let privateState = 0;
  return {
    method() {
      /* accesses privateState and config */
    },
  };
}
```

### Modules

```javascript
// ESM
export const fn = () => {};
export default class {}
import DefaultExport, { namedExport } from "./module.js";
import * as everything from "./module.js";

// CJS
module.exports = { fn };
const { fn } = require("./module");
```

---

_Built to be read once, referenced forever. All examples reflect patterns you will write and review in real production codebases._
