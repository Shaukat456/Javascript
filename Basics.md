## 🧱 JavaScript Basics — Step-by-Step

We’ll go in logical chunks:

1.  **Variables & Data Types**
2.  **Operators**
3.  **Control Flow (if, else, switch)**
4.  **Loops (for, while)**
5.  **Functions**
6.  **DOM Manipulation**
7.  **Events**
8.  **Objects & Arrays**
9.  **ES6+ Features**
10. **APIs & Fetch**
11. **Async/Await & Promises**
12. **Mini Projects & Real World Use-Cases**

---

## 📦 1. Variables & Data Types

### 🧪 Concept: Variables

Think of variables like containers or "boxes" to store values like numbers, text, etc.

### ✅ Syntax:

```javascript
let name = "Shaukat";
const age = 25;
var city = "Karachi";
```

> 🟨 Use `let` when value may change, `const` when value won’t change, and avoid `var` (older, behaves weirdly in scopes).

---

### 🧾 Real-World Example: User Profile

```javascript
const userName = "Ali";
let userAge = 21;
let isLoggedIn = true;
```

> Like storing user profile information temporarily in your app.

---

### 🧠 Data Types - Deep Dive with Real-World Examples:

| Type      | Example           | Use Case                         |
| --------- | ----------------- | -------------------------------- |
| String    | `"Hello"`         | Usernames, messages              |
| Number    | `42`, `3.14`      | Prices, quantities               |
| Boolean   | `true`, `false`   | Login state, toggles             |
| Null      | `null`            | Empty values                     |
| Undefined | `undefined`       | Unassigned variables             |
| Object    | `{ name: "Ali" }` | Grouped data (user, product)     |
| Array     | `[1, 2, 3]`       | Lists of items (products, tasks) |

---

## 🔤 1. STRING - Text & Characters

**Think of strings like text messages** - anything wrapped in quotes becomes text.

### ✅ Creating Strings

```javascript
let userName = "Ahmed Khan";            Double quotes
let message = 'Welcome to our app!';    Single quotes
let template = `Hello ${userName}`;     Template literals (backticks)
```

### 🛠️ String Methods & Operations

```javascript
let companyName = "  TechCorp Solutions  ";
 Length and basic info
console.log(companyName.length);         19 (includes spaces)

 Cleaning and formatting
console.log(companyName.trim());         "TechCorp Solutions" (removes spaces)
console.log(companyName.toLowerCase());  "  techcorp solutions  "
console.log(companyName.toUpperCase());  "  TECHCORP SOLUTIONS  "

 Searching and checking
console.log(companyName.includes("Tech"));     true
console.log(companyName.startsWith("Tech"));   false (starts with space)
console.log(companyName.indexOf("Corp"));      6

 Extracting parts
console.log(companyName.slice(2, 10));    "TechCorp"
console.log(companyName.substring(2, 10));  "TechCorp"

 Replacing content
console.log(companyName.replace("Solutions", "Industries"));  "  TechCorp Industries  "

 Splitting into arrays
let fullName = "John Michael Smith";
let nameParts = fullName.split(" ");      ["John", "Michael", "Smith"]
```

### 🎯 Practical Example: Form Validation

```javascript
function validateUserInput(userData) {
    let errors = [];

     Name validation
    if (!userData.name || userData.name.trim().length < 2) {
        errors.push("Name must be at least 2 characters long");
    }

     Email validation (basic)
    if (!userData.email.includes("@") || !userData.email.includes(".")) {
        errors.push("Please enter a valid email address");
    }

     Phone validation
    let cleanPhone = userData.phone.replace(/[^\d]/g, "");  Remove non-digits
    if (cleanPhone.length < 10) {
        errors.push("Phone number must have at least 10 digits");
    }

    return errors;
}

 Usage
let user = {
    name: "  John  ",
    email: "john@email.com",
    phone: "(555) 123-4567"
};

let validationErrors = validateUserInput(user);
console.log(validationErrors);  [] (no errors)
```

---

## 🔢 2. NUMBER - Mathematics & Calculations

**Think of numbers like a calculator** - JavaScript handles both integers and decimals.

### ✅ Creating Numbers

```javascript
let age = 25;                     Integer
let price = 29.99;                Decimal
let temperature = -5;             Negative
let scientific = 1.5e6;           Scientific notation (1,500,000)
let infinity = Infinity;          Special number value
let notANumber = NaN;             "Not a Number"
```

### 🧮 Number Methods & Operations

```javascript
let price = 123.456789;

 Rounding and precision
console.log(price.toFixed(2));          "123.46" (string)
console.log(Math.round(price));         123
console.log(Math.ceil(price));          124 (round up)
console.log(Math.floor(price));         123 (round down)

 Number validation
console.log(Number.isInteger(123));     true
console.log(Number.isInteger(123.45));  false
console.log(Number.isNaN(NaN));         true
console.log(Number.isFinite(Infinity));  false

 Parsing strings to numbers
console.log(Number("123.45"));          123.45
console.log(parseInt("123.45"));        123
console.log(parseFloat("123.45"));      123.45

 Math operations
console.log(Math.max(10, 20, 5, 30));   30
console.log(Math.min(10, 20, 5, 30));   5
console.log(Math.random());             Random number 0-1
console.log(Math.pow(2, 3));            8 (2^3)
console.log(Math.sqrt(16));             4
```

### 🎯 Practical Example: Shopping Cart Calculator

## ✅ 3. BOOLEAN - True/False Logic

**Think of booleans like light switches** - they're either ON (true) or OFF (false).

### ✅ Creating Booleans

```javascript
let isLoggedIn = true;
let hasPermission = false;
let isVisible = Boolean(1);           true (truthy conversion)
let isEmpty = Boolean("");            false (falsy conversion)
```

### 🔄 Boolean Operations & Conversions

```javascript
 Truthy and Falsy values
console.log(Boolean("hello"));       true (non-empty string)
console.log(Boolean(""));            false (empty string)
console.log(Boolean(123));           true (non-zero number)
console.log(Boolean(0));             false (zero)
console.log(Boolean([]));            true (array, even if empty)
console.log(Boolean({}));            true (object, even if empty)
console.log(Boolean(null));          false
console.log(Boolean(undefined));     false

 Logical operations
let user = { age: 25, isPremium: true, isActive: true };

 AND - all conditions must be true
let canAccessPremium = user.isActive && user.isPremium && user.age >= 18;

 OR - at least one condition must be true
let canViewContent = user.isActive || user.isPremium;

 NOT - reverse the boolean
let isFreeTier = !user.isPremium;

 Complex conditions
let canEditProfile = user.isActive && (user.isPremium || user.age >= 21);
```

### 🎯 Practical Example: User Permission System

```javascript
class UserPermissions {
    constructor(user) {
        this.user = user;
    }

    canCreatePost() {
        return this.user.isActive && this.user.isVerified;
    }

    canDeletePost(postOwnerId) {
        return this.user.isAdmin ||
               (this.user.isActive && this.user.id === postOwnerId);
    }

    canAccessPremiumContent() {
        return this.user.isActive &&
               (this.user.isPremium || this.user.isAdmin);
    }

    canModerateComments() {
        return this.user.isActive &&
               (this.user.isModerator || this.user.isAdmin);
    }

    getPermissionSummary() {
        return {
            canPost: this.canCreatePost(),
            canModerate: this.canModerateComments(),
            hasPremiumAccess: this.canAccessPremiumContent(),
            isEligibleForUpgrade: !this.user.isPremium && this.user.isActive
        };
    }
}

 Usage
let regularUser = {
    id: 1,
    isActive: true,
    isVerified: true,
    isPremium: false,
    isAdmin: false,
    isModerator: false
};

let permissions = new UserPermissions(regularUser);
console.log(permissions.getPermissionSummary());
 { canPost: true, canModerate: false, hasPremiumAccess: false, isEligibleForUpgrade: true }
```

---

## 🚫 4. NULL - Intentionally Empty

**Think of null like an empty parking spot** - it's deliberately set to "nothing".

### ✅ When to Use Null

```javascript
let selectedFile = null;            No file chosen yet
let currentUser = null;             User not logged in
let searchResults = null;           Search not performed yet
let cachedData = null;              Cache is empty
```

### 🎯 Practical Example: File Upload Handler

```javascript
class FileUploadManager {
    constructor() {
        this.selectedFile = null;
        this.uploadProgress = null;
        this.uploadError = null;
        this.uploadedFileUrl = null;
    }

    selectFile(file) {
         Reset previous state
        this.uploadProgress = null;
        this.uploadError = null;
        this.uploadedFileUrl = null;

         Validate file
        if (!file || file.size > 5 * 1024 * 1024) {  5MB limit
            this.selectedFile = null;
            this.uploadError = "File is too large or invalid";
            return false;
        }

        this.selectedFile = file;
        return true;
    }

    clearUpload() {
        this.selectedFile = null;
        this.uploadProgress = null;
        this.uploadError = null;
        this.uploadedFileUrl = null;
    }

    getStatus() {
        if (this.uploadedFileUrl !== null) {
            return "completed";
        }
        if (this.uploadProgress !== null) {
            return "uploading";
        }
        if (this.uploadError !== null) {
            return "error";
        }
        if (this.selectedFile !== null) {
            return "ready";
        }
        return "empty";
    }
}
```

---

## ❓ 5. UNDEFINED - Not Yet Assigned

**Think of undefined like an empty box with no label** - it exists but has no value.

### ✅ Common Undefined Scenarios

```javascript
let userName;                       Declared but not assigned
console.log(userName);              undefined

let user = { name: "John" };
console.log(user.age);              undefined (property doesn't exist)

function greet(name) {
    console.log(name);              undefined if no argument passed
}
greet();  Called without arguments

let colors = ["red", "blue"];
console.log(colors[5]);             undefined (index doesn't exist)
```

---

## 📦 6. OBJECT - Grouped Data

**Think of objects like a filing cabinet** - organized data with labeled folders (properties).

### ✅ Creating Objects

```javascript
 Object literal (most common)
let user = {
    name: "Sarah Johnson",
    age: 28,
    email: "sarah@example.com",
    isActive: true
};

 Constructor function
function Product(name, price) {
    this.name = name;
    this.price = price;
    this.inStock = true;
}
let laptop = new Product("Gaming Laptop", 1299.99);

 Object.create()
let userTemplate = { isActive: true, role: "user" };
let newUser = Object.create(userTemplate);
```

### 🛠️ Object Methods & Operations

```javascript
let product = {
    name: "Smartphone",
    price: 699,
    category: "Electronics"
};

 Accessing properties
console.log(product.name);            "Smartphone"
console.log(product["price"]);        699

 Adding/modifying properties
product.inStock = true;
product["rating"] = 4.5;

 Object methods
console.log(Object.keys(product));        ["name", "price", "category", "inStock", "rating"]
console.log(Object.values(product));      ["Smartphone", 699, "Electronics", true, 4.5]
console.log(Object.entries(product));     [["name", "Smartphone"], ["price", 699], ...]

 Checking properties
console.log("name" in product);           true
console.log(product.hasOwnProperty("price"));  true

 Deleting properties
delete product.category;

 Object copying
let productCopy = Object.assign({}, product);
let productClone = { ...product };        Spread operator (ES6)
```

---

## 📋 7. ARRAY - Lists of Items

**Think of arrays like a shopping list** - ordered items you can access by position.

### ✅ Creating Arrays

```javascript
 Array literal (most common)
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["John", 25, true, null];

 Array constructor
let colors = new Array("red", "green", "blue");
let emptyArray = new Array(5);  Creates array with 5 empty slots

 Array.from()
let stringArray = Array.from("hello");  ["h", "e", "l", "l", "o"]
```

### 🛠️ Array Methods & Operations

```javascript
let fruits = ["apple", "banana", "orange"];

 Basic operations
console.log(fruits.length);           3
console.log(fruits[0]);               "apple"
console.log(fruits[fruits.length-1]);  "orange" (last item)

 Adding items
fruits.push("grape");                 Add to end
fruits.unshift("mango");              Add to beginning
console.log(fruits);  ["mango", "apple", "banana", "orange", "grape"]

 Removing items
let lastFruit = fruits.pop();         Remove from end, returns "grape"
let firstFruit = fruits.shift();      Remove from beginning, returns "mango"

 Finding items
console.log(fruits.indexOf("banana"));     1
console.log(fruits.includes("apple"));     true
let foundFruit = fruits.find(fruit => fruit.startsWith("o"));  "orange"

 Transforming arrays
let upperFruits = fruits.map(fruit => fruit.toUpperCase());
let longFruits = fruits.filter(fruit => fruit.length > 5);
let totalLength = fruits.reduce((sum, fruit) => sum + fruit.length, 0);

 Sorting
fruits.sort();                        Alphabetical sort
let numbers = [3, 1, 4, 1, 5];
numbers.sort((a, b) => a - b);        Numerical sort: [1, 1, 3, 4, 5]
```

### 🎯 Practical Example: Task Management System

```javascript
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    addTask(title, priority = "medium") {
        const task = {
            id: this.nextId++,
            title: title,
            priority: priority,
            completed: false,
            createdAt: new Date(),
            tags: []
        };
        this.tasks.push(task);
        return task;
    }

    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            task.completedAt = new Date();
        }
        return task;
    }

    getTasksByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    }

    getPendingTasks() {
        return this.tasks.filter(task => !task.completed);
    }

    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }

    searchTasks(searchTerm) {
        return this.tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    getTaskStats() {
        const total = this.tasks.length;
        const completed = this.getCompletedTasks().length;
        const pending = this.getPendingTasks().length;
        const highPriority = this.getTasksByPriority("high").length;

        return { total, completed, pending, highPriority };
    }

    sortTasksByDate() {
        return [...this.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
}

 Usage
const taskManager = new TaskManager();

taskManager.addTask("Complete project documentation", "high");
taskManager.addTask("Review code changes", "medium");
taskManager.addTask("Update website content", "low");
taskManager.completeTask(1);

console.log(taskManager.getTaskStats());
 { total: 3, completed: 1, pending: 2, highPriority: 1 }

console.log(taskManager.getPendingTasks());
console.log(taskManager.searchTasks("code"));
```

---

## 🧪 Test Your Learning

Can you guess what this does?

```javascript
let user = "Sana";
let message = "Welcome, " + user + "!";
console.log(message);
```

✅ Output: `"Welcome, Sana!"`

---

## ⏭️ Next Topic: DOM Manipulation

**DOM Manipulation** is covered in detail in a separate file: `DOM-Manipulation.js`

📄 **What you'll learn in DOM-Manipulation.js:**

- Finding and selecting HTML elements
- Changing content and styles dynamically
- Creating and removing elements
- Real-world projects (Todo List, Image Gallery)
- Performance optimization techniques
- Security best practices
- Modern DOM APIs (MutationObserver, IntersectionObserver)

---

## 🧮 2. Operators - The Math & Logic Tools

### 🔢 Arithmetic Operators

```javascript
let a = 10;
let b = 3;

console.log(a + b);   13 (Addition)
console.log(a - b);   7  (Subtraction)
console.log(a * b);   30 (Multiplication)
console.log(a / b);   3.33... (Division)
console.log(a % b);   1  (Remainder/Modulus)
console.log(a ** b);  1000 (Exponentiation)
```

### 🧠 Real-World Example: Shopping Cart

```javascript
let itemPrice = 25.99;
let quantity = 3;
let taxRate = 0.08;
8 % tax;

let subtotal = itemPrice * quantity;
let tax = subtotal * taxRate;
let total = subtotal + tax;

console.log(`Subtotal: $${subtotal.toFixed(2)}`);
console.log(`Tax: $${tax.toFixed(2)}`);
console.log(`Total: $${total.toFixed(2)}`);
```

### � Comparison Operators

```javascript
let age = 18;

console.log(age == 18);    true (loose equality)
console.log(age === 18);   true (strict equality)
console.log(age == "18");  true (converts string to number)
console.log(age === "18");  false (different types)

console.log(age > 16);     true
console.log(age >= 18);    true
console.log(age < 21);     true
console.log(age <= 17);    false
console.log(age != 20);    true
console.log(age !== "18");  true
```

### ⚡ Logical Operators

```javascript
let isLoggedIn = true;
let isPremium = false;
let age = 25;

 AND (&&) - Both conditions must be true
console.log(isLoggedIn && age >= 18);  true

 OR (||) - At least one condition must be true
console.log(isPremium || age >= 18);  true

 NOT (!) - Reverses the boolean value
console.log(!isPremium);  true
console.log(!isLoggedIn);  false
```

### 🎯 Real-World Example: User Access Control

```javascript
function canAccessContent(user) {
    let isLoggedIn = user.loggedIn;
    let age = user.age;
    let hasPremium = user.premium;
    let isAdmin = user.role === 'admin';

     Can access if: logged in AND (18+ OR premium OR admin)
    return isLoggedIn && (age >= 18 || hasPremium || isAdmin);
}

 Test cases
let user1 = { loggedIn: true, age: 16, premium: false, role: 'user' };
let user2 = { loggedIn: true, age: 16, premium: true, role: 'user' };
let user3 = { loggedIn: true, age: 20, premium: false, role: 'user' };

console.log(canAccessContent(user1));  false (underage, no premium)
console.log(canAccessContent(user2));  true (has premium)
console.log(canAccessContent(user3));  true (18+)
```

---
