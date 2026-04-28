---
title: "JavaScript Assignment: Preact / React-style JavaScript"
description: "Practice tasks focused on immutable updates, optional chaining, default parameters, and UI-ready JavaScript logic."
---

# JavaScript Assignment: Preact / React-style JavaScript

### 61. Add todo immutably

```js
function addTodo(todos, newTodo) {
  // Write logic here
}
```

Task: Return a new `todos` array with `newTodo` added using spread operator.

### 62. Remove item from array

```js
function removeTodo(todos, id) {
  // Write logic here
}
```

Task: Return a new array after removing the todo with matching `id`.

### 63. Update object inside array

```js
function updateUser(users, id, newName) {
  // Write logic here
}
```

Task: Update the user name where `id` matches using `map()`.

### 64. Toggle boolean value

```js
function toggleStatus(user) {
  // Write logic here
}
```

Task: Return an updated object with `isActive` toggled using spread operator.

### 65. Conditional rendering logic

```js
function showMessage(isLoggedIn) {
  // Write logic here
}
```

Task: Return `"Welcome Back"` if true, otherwise `"Please Login"`.

### 66. Safe nested object access

```js
function getUserCity(user) {
  // Write logic here
}
```

Task: Return user city safely using optional chaining.

### 67. Default parameter function

```js
function greet(name = "Guest") {
  // Write logic here
}
```

Task: Return a greeting message using the default parameter.

### 68. Generate unique categories

```js
function uniqueCategories(products) {
  // Write logic here
}
```

Task: Return unique category names using `Set`.

### 69. Filter search results

```js
function searchUsers(users, keyword) {
  // Write logic here
}
```

Task: Return users whose name includes the keyword.

### 70. Sort products by price

```js
function sortByPrice(products) {
  // Write logic here
}
```

Task: Return products sorted by price in ascending order.

### 71. Format price

```js
function formatPrice(price) {
  // Write logic here
}
```

Task: Return price formatted like `"$100"`.

### 72. Validate email input

```js
function validateEmail(email) {
  // Write logic here
}
```

Task: Return `true` if email includes `"@"`, otherwise `false`.

### 73. Handle input change pattern

```js
function handleInput(user, field, value) {
  // Write logic here
}
```

Task: Return an updated object with the dynamic field updated.

### 74. Disable button logic

```js
function canSubmit(name, email) {
  // Write logic here
}
```

Task: Return `true` only if both `name` and `email` are not empty.

### 75. Count completed tasks

```js
function completedTasks(tasks) {
  // Write logic here
}
```

Task: Return total completed tasks using `filter()`.

### 76. Loading state logic

```js
function fetchMessage(isLoading) {
  // Write logic here
}
```

Task: Return `"Loading..."` if true, else `"Data Loaded"`.

### 77. Prop destructuring example

```js
function displayProfile({ name, role }) {
  // Write logic here
}
```

Task: Return a formatted string using destructured props.

### 78. Merge API response data

```js
function mergeData(oldData, newData) {
  // Write logic here
}
```

Task: Merge old and new data arrays using spread operator.

### 79. Check if item exists

```js
function hasProduct(products, id) {
  // Write logic here
}
```

Task: Return `true` if a product with matching `id` exists using `some()`.

### 80. Transform API data for UI

```js
function getUserNames(users) {
  // Write logic here
}
```

Task: Return an array of only user names using `map()`.

### 81. Handle checkbox toggle in list

```js
function toggleTask(tasks, id) {
  // Write logic here
}
```

Task: Toggle the completed status of the task with matching `id` using `map()`.

### 82. Prepend item in array

```js
function addAtStart(items, newItem) {
  // Write logic here
}
```

Task: Return a new array with `newItem` added at the beginning using spread.

### 83. Update nested object state

```js
function updateAddress(user, newCity) {
  // Write logic here
}
```

Task: Update `user.address.city` using spread operator without mutating original object.

### 84. Reset form values

```js
function resetForm() {
  // Write logic here
}
```

Task: Return an object with `name`, `email`, and `password` as empty strings.

### 85. Check active users

```js
function getActiveUsers(users) {
  // Write logic here
}
```

Task: Return only users where `isActive` is `true` using `filter()`.

### 86. Count total cart price

```js
function totalCartPrice(cart) {
  // Write logic here
}
```

Task: Return the total price using `reduce()`.

### 87. Get latest item

```js
function getLastItem(arr) {
  // Write logic here
}
```

Task: Return the last item of the array.

### 88. Remove falsy values

```js
function cleanArray(arr) {
  // Write logic here
}
```

Task: Remove `false`, `null`, `undefined`, `0`, and empty string using `filter()`.

### 89. Check admin role

```js
function isAdmin(user) {
  // Write logic here
}
```

Task: Return `true` if `user.role` is `"admin"`.

### 90. Capitalize all names

```js
function capitalizeNames(names) {
  // Write logic here
}
```

Task: Return all names with the first letter capitalized using `map()`.

### 91. Flatten nested array

```js
function flattenArray(arr) {
  // Write logic here
}
```

Task: Convert `[[1,2],[3,4]]` into `[1,2,3,4]`.

### 92. Object keys to array

```js
function getKeys(obj) {
  // Write logic here
}
```

Task: Return all object keys as an array.

### 93. Object values to array

```js
function getValues(obj) {
  // Write logic here
}
```

Task: Return all object values as an array.

### 94. Create initials from full name

```js
function getInitials(name) {
  // Write logic here
}
```

Task: Convert `"Ali Khan"` into `"AK"`.

### 95. Debounce-like callback logic

```js
function searchHandler(callback) {
  // Write logic here
}
```

Task: Accept a callback and execute it after 1 second using `setTimeout()`.

### 96. Check if array is empty

```js
function isArrayEmpty(arr) {
  // Write logic here
}
```

Task: Return `true` if array length is 0.

### 97. Truncate long text

```js
function shortText(text) {
  // Write logic here
}
```

Task: Return first 20 characters followed by `"..."` if text is too long.

### 98. Generate random ID

```js
function generateId() {
  // Write logic here
}
```

Task: Return a random number between `1000` and `9999`.

### 99. Remove object property

```js
function removePassword(user) {
  // Write logic here
}
```

Task: Return a new object without the `password` property using destructuring.

### 100. Group students by pass/fail

```js
function resultStatus(marks) {
  // Write logic here
}
```

Task: Return `"Pass"` if `marks >= 40` else return `"Fail"`.
// 81. Function to handle checkbox toggle in list
function toggleTask(tasks, id) {
// Write logic here
}

// Task: Toggle completed status of task with matching id using map().

// 82. Function to prepend item in array
function addAtStart(items, newItem) {
// Write logic here
}

// Task: Return new array with newItem added at the beginning using spread.

// 83. Function to update nested object state
function updateAddress(user, newCity) {
// Write logic here
}

// Task: Update user.address.city using spread operator without mutating original object.

// 84. Function to reset form values
function resetForm() {
// Write logic here
}

// Task: Return object with name, email, and password as empty strings.

// 85. Function to check active users
function getActiveUsers(users) {
// Write logic here
}

// Task: Return only users where isActive is true using filter().

// 86. Function to count total cart price
function totalCartPrice(cart) {
// Write logic here
}

// Task: Return total price using reduce().

// 87. Function to get latest item
function getLastItem(arr) {
// Write logic here
}

// Task: Return the last item of the array.

// 88. Function to remove falsy values
function cleanArray(arr) {
// Write logic here
}

// Task: Remove false, null, undefined, 0, and empty string using filter().

// 89. Function to check admin role
function isAdmin(user) {
// Write logic here
}

// Task: Return true if user role is "admin".

// 90. Function to capitalize all names
function capitalizeNames(names) {
// Write logic here
}

// Task: Return all names with first letter capitalized using map().

// 91. Function to flatten simple nested array
function flattenArray(arr) {
// Write logic here
}

// Task: Convert [[1,2],[3,4]] into [1,2,3,4].

// 92. Function to convert object keys into array
function getKeys(obj) {
// Write logic here
}

// Task: Return all object keys as array.

// 93. Function to convert object values into array
function getValues(obj) {
// Write logic here
}

// Task: Return all object values as array.

// 94. Function to create initials from full name
function getInitials(name) {
// Write logic here
}

// Task: Convert "Ali Khan" into "AK".

// 95. Function to debounce-like basic logic concept
function searchHandler(callback) {
// Write logic here
}

// Task: Accept callback and execute it after 1 second using setTimeout().

// 96. Function to check if array is empty
function isArrayEmpty(arr) {
// Write logic here
}

// Task: Return true if array length is 0.

// 97. Function to truncate long text
function shortText(text) {
// Write logic here
}

// Task: Return first 20 characters followed by "..." if text is too long.

// 98. Function to generate random ID
function generateId() {
// Write logic here
}

// Task: Return a random number between 1000 and 9999.

// 99. Function to remove object property
function removePassword(user) {
// Write logic here
}

// Task: Return new object without password property using destructuring.

// 100. Function to group students by pass/fail
function resultStatus(marks) {
// Write logic here
}

// Task: Return "Pass" if marks >= 40 else return "Fail".
