
# JavaScript Assignment — Asynchronous JavaScript



### Topics Covered

* Synchronous vs asynchronous JavaScript
* Execution order
* `setTimeout()`
* `setInterval()`
* Callbacks
* Callback functions
* Callback nesting
* Promises
* Promise states
* `.then()`
* `.catch()`
* `.finally()`
* `async`
* `await`
* `try...catch`
* Error handling
* Fetch API
* JSON
* API requests
* DOM + asynchronous JavaScript
* Arrays / objects + async data
* Event loop basics

---

# Part A — Code-Based Questions

## Questions 1–25

### 1. Synchronous Code

What will be the output?

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Write the exact order.

---

### 2. First Async Example

Predict the output:

```javascript
console.log("A");

setTimeout(function() {
    console.log("B");
}, 1000);

console.log("C");
```

What will print first, second, and third?

---

### 3. Multiple Timers

Predict the output:

```javascript
console.log("Start");

setTimeout(function() {
    console.log("One");
}, 2000);

setTimeout(function() {
    console.log("Two");
}, 1000);

console.log("End");
```

Do **not** assume the code executes from top to bottom only.

---

### 4. Zero Milliseconds

What will be the output?

```javascript
console.log("A");

setTimeout(function() {
    console.log("B");
}, 0);

console.log("C");
```

Why doesn't `B` necessarily appear immediately?

---

### 5. Timer Order

Predict the output:

```javascript
setTimeout(function() {
    console.log("First");
}, 3000);

setTimeout(function() {
    console.log("Second");
}, 1000);

setTimeout(function() {
    console.log("Third");
}, 2000);
```

What is the order?

---

### 6. `setInterval()`

What will this program do?

```javascript
let count = 1;

const timer = setInterval(function() {
    console.log(count);
    count++;
}, 1000);
```

Will it stop automatically?

If not, how could you stop it?

---

### 7. `clearInterval()`

What will happen?

```javascript
let count = 1;

const timer = setInterval(function() {

    console.log(count);

    count++;

    if (count > 3) {
        clearInterval(timer);
    }

}, 1000);
```

How many numbers will be printed?

---

### 8. Callback Function

What is the output?

```javascript
function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function finished() {
    console.log("Finished");
}

greet("Ali", finished);
```

Which function is the callback?

---

### 9. Callback + `setTimeout`

Predict the output:

```javascript
function process(callback) {

    setTimeout(function() {
        console.log("Processing complete");
        callback();
    }, 1000);

}

process(function() {
    console.log("Callback executed");
});
```

---

### 10. Callback Order

What will be printed?

```javascript
console.log("Start");

setTimeout(function() {
    console.log("Timer");
}, 1000);

console.log("End");
```

Explain why `"End"` appears before `"Timer"`.

---

### 11. Nested Callbacks

Predict the output:

```javascript
setTimeout(function() {

    console.log("Step 1");

    setTimeout(function() {

        console.log("Step 2");

        setTimeout(function() {
            console.log("Step 3");
        }, 1000);

    }, 1000);

}, 1000);
```

What problem might occur if a program had dozens of nested callbacks?

---

### 12. Creating a Promise

What will be printed?

```javascript
const promise = new Promise(function(resolve, reject) {

    resolve("Success");

});

promise.then(function(result) {
    console.log(result);
});
```

---

### 13. Promise Rejection

What happens here?

```javascript
const promise = new Promise(function(resolve, reject) {

    reject("Something went wrong");

});

promise
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
        console.log(error);
    });
```

---

### 14. Promise with Timer

Predict the output:

```javascript
const promise = new Promise(function(resolve) {

    setTimeout(function() {
        resolve("Data received");
    }, 2000);

});

console.log("Waiting...");

promise.then(function(data) {
    console.log(data);
});
```

---

### 15. Promise States

A Promise starts here:

```javascript
const promise = new Promise(function(resolve, reject) {

});
```

What state is the Promise initially in?

What happens when:

```javascript
resolve();
```

is called?

What happens when:

```javascript
reject();
```

is called?

---

### 16. Promise Chaining

Predict the output:

```javascript
Promise.resolve(10)

    .then(function(number) {
        return number * 2;
    })

    .then(function(number) {
        return number + 5;
    })

    .then(function(number) {
        console.log(number);
    });
```

---

### 17. `.catch()`

What will happen?

```javascript
Promise.reject("Error!")

    .then(function() {
        console.log("Success");
    })

    .catch(function(error) {
        console.log(error);
    });
```

Will `"Success"` be printed?

---

### 18. `.finally()`

Predict the output:

```javascript
Promise.resolve("Done")

    .then(function(result) {
        console.log(result);
    })

    .finally(function() {
        console.log("Finished");
    });
```

What is the purpose of `finally()`?

---

### 19. `async` Function

What will this function return?

```javascript
async function greet() {
    return "Hello";
}

console.log(greet());
```

Will it directly return the string `"Hello"`?

---

### 20. `await`

Predict the output:

```javascript
function getData() {

    return new Promise(function(resolve) {

        setTimeout(function() {
            resolve("Data received");
        }, 1000);

    });
}

async function main() {

    console.log("Start");

    const result = await getData();

    console.log(result);

    console.log("End");
}

main();
```

Write the order of output.

---

### 21. `async/await` + Function

What will be printed?

```javascript
function getNumber() {

    return Promise.resolve(10);

}

async function calculate() {

    const number = await getNumber();

    console.log(number * 2);
}

calculate();
```

---

### 22. Error Handling with `try/catch`

What will happen?

```javascript
async function test() {

    try {

        throw new Error("Something went wrong");

    } catch (error) {

        console.log(error.message);

    }

}

test();
```

Why is `try/catch` useful with asynchronous code?

---

### 23. Promise + Array

Predict the output:

```javascript
function getStudents() {

    return Promise.resolve([
        "Ali",
        "Sara",
        "Ahmed"
    ]);

}

async function showStudents() {

    const students = await getStudents();

    for (let i = 0; i < students.length; i++) {
        console.log(students[i]);
    }

}

showStudents();
```

Which previously learned concepts are being combined here?

---

### 24. Async + DOM

HTML:

```html
<button id="btn">Load</button>
<p id="result"></p>
```

JavaScript:

```javascript
function getData() {

    return new Promise(function(resolve) {

        setTimeout(function() {
            resolve("Data loaded!");
        }, 2000);

    });

}

const button = document.getElementById("btn");
const result = document.getElementById("result");

button.addEventListener("click", async function() {

    result.textContent = "Loading...";

    const data = await getData();

    result.textContent = data;

});
```

What will the user see:

1. Immediately after clicking?
2. After 2 seconds?

---

### 25. Complete Async Flow

Predict the output:

```javascript
function getUser() {

    return new Promise(function(resolve) {

        setTimeout(function() {
            resolve({
                name: "Ali",
                age: 20
            });
        }, 1000);

    });

}

async function showUser() {

    console.log("Loading user...");

    const user = await getUser();

    console.log(user.name);
    console.log(user.age);

}

showUser();

console.log("Program continues...");
```

Write the exact output order.

Then explain **why** `"Program continues..."` appears before the user data.

---

# Part B — Theory & Conceptual Questions

## Questions 26–40

### 26. Synchronous vs Asynchronous

Explain the difference between **synchronous** and **asynchronous** JavaScript.

Give a real-world analogy for each.

---

### 27. Why Do We Need Asynchronous JavaScript?

Imagine a website needs to download data from a server.

Why would it be problematic if JavaScript completely stopped everything while waiting for the server?

Give a real-world example.

---

### 28. `setTimeout()`

What does:

```javascript
setTimeout()
```

do?

Explain what the following parameters represent:

```javascript
setTimeout(callback, 2000);
```

Does `2000` mean the callback executes exactly at 2000 milliseconds?

Explain.

---

### 29. `setInterval()`

What is the difference between:

```javascript
setTimeout()
```

and:

```javascript
setInterval()
```

Give one practical use case for each.

---

### 30. Callback Functions

What is a callback function?

Why are callbacks particularly useful in asynchronous programming?

Use an example such as:

```javascript
setTimeout(callback, 1000);
```

---

### 31. Callback Hell

What is **callback hell**?

Why can deeply nested callbacks make a program difficult to maintain?

Draw or write a simple example.

---

### 32. Promise

What is a Promise?

Explain the three main Promise states:

```text
Pending
Fulfilled
Rejected
```

---

### 33. `resolve()` and `reject()`

What is the purpose of:

```javascript
resolve()
```

and:

```javascript
reject()
```

When would you use each?

---

### 34. `.then()` and `.catch()`

Explain the purpose of:

```javascript
.then()
```

and:

```javascript
.catch()
```

Which one handles successful completion?

Which one handles errors?

---

### 35. Promise Chaining

What does **Promise chaining** mean?

Explain the general structure:

```javascript
promise
    .then(...)
    .then(...)
    .then(...)
    .catch(...);
```

Why can chaining be cleaner than nested callbacks?

---

### 36. `async`

What does the `async` keyword do when placed before a function?

Explain why:

```javascript
async function getData() {
    return "Hello";
}
```

returns a Promise.

---

### 37. `await`

What does `await` do?

Where can `await` normally be used?

Explain what happens to the execution of the **async function** while it waits.

---

### 38. `async/await` vs Promises

Compare:

```javascript
promise
    .then(...)
    .catch(...);
```

with:

```javascript
async function test() {
    try {
        await promise;
    } catch (error) {
        
    }
}
```

What problem does `async/await` make easier to read?

---

### 39. Fetch API

What is the purpose of:

```javascript
fetch()
```

Why is `fetch()` commonly used in modern web applications?

What does it allow your website to communicate with?

---

### 40. JSON and APIs

Explain the relationship between:

```text
Website
   ↓
JavaScript
   ↓
Fetch
   ↓
API
   ↓
JSON
   ↓
JavaScript Objects
   ↓
DOM
```

Give an example of information a website might retrieve from an API.

---

# Part C — Application & Problem-Solving

## Questions 41–45

These questions combine **async JavaScript with everything learned previously**.

---

# 41. Delayed Greeting App

Create a webpage containing:

```text
Name input
Greet button
Message area
```

When the user clicks the button:

1. Display:

```text
Loading...
```

2. Wait for 2 seconds using `setTimeout()` / Promise.
3. Then display:

```text
Hello, Ali!
```

### Requirements

Use:

* DOM
* `.value`
* Event listener
* Function
* Promise
* `async/await`
* `setTimeout()`
* Template literals

---

# 42. Fake Student API

Create a function:

```javascript
getStudents()
```

that returns a Promise containing:

```javascript
[
    { name: "Ali", marks: 80 },
    { name: "Sara", marks: 45 },
    { name: "Ahmed", marks: 72 }
]
```

Simulate a server delay of **2 seconds**.

Then create:

```javascript
async function showStudents()
```

which:

1. Awaits the students.
2. Loops through them.
3. Displays their names and marks.
4. Displays `"Pass"` or `"Fail"` based on marks.

### Expected conceptual flow

```text
getStudents()
      ↓
Promise
      ↓
await
      ↓
Array of Objects
      ↓
Loop
      ↓
Condition
      ↓
DOM
```

---

# 43. Async Search Application

Build a student-search webpage.

### Data

```javascript
const students = [
    { name: "Ali", marks: 80 },
    { name: "Sara", marks: 90 },
    { name: "Ahmed", marks: 65 },
    { name: "Usman", marks: 72 }
];
```

Create a function:

```javascript
searchStudent(name)
```

that returns a Promise.

Simulate a server delay of **1 second**.

The function should:

* Search the array.
* Resolve with the student if found.
* Reject if the student doesn't exist.

Then use:

```javascript
async/await
```

to display the result on the webpage.

### Requirements

Use:

* Array
* Objects
* Function
* Loop
* Condition
* Promise
* `resolve`
* `reject`
* `async`
* `await`
* `try/catch`
* DOM
* Event listener

---

# 44. API Data + DOM

Use the Fetch API to retrieve data from a public API.

Your program should:

1. Have a **Load Data** button.
2. Show:

```text
Loading...
```

while waiting.
3. Fetch data from an API.
4. Convert the response into JSON.
5. Loop through the returned data.
6. Dynamically create HTML elements.
7. Display the information on the webpage.
8. Handle errors using `try/catch`.

### Conceptual structure

```text
Button Click
     ↓
async function
     ↓
fetch()
     ↓
await response
     ↓
response.json()
     ↓
await JSON
     ↓
Array / Objects
     ↓
Loop
     ↓
createElement()
     ↓
appendChild()
     ↓
Webpage
```

---

# 45. Mini Project — Async Student Dashboard

Build a small **Student Dashboard** that simulates getting data from a backend server.

### UI

Create:

```text
┌──────────────────────────────┐
│      Student Dashboard       │
│                              │
│       [ Load Students ]      │
│                              │
│      Loading...              │
│                              │
│  Ali      85      A          │
│  Sara     72      B          │
│  Ahmed    45      Fail       │
│                              │
└──────────────────────────────┘
```

### Step 1 — Simulate API

Create:

```javascript
function fetchStudents()
```

that returns a Promise.

Simulate a **2-second server delay**.

---

### Step 2 — Handle Data

Use:

```javascript
async function loadStudents()
```

and:

```javascript
await fetchStudents();
```

---

### Step 3 — Process Data

Use a function:

```javascript
getGrade(marks)
```

to determine:

```text
80+      → A
60–79    → B
50–59    → C
Below 50 → Fail
```

---

### Step 4 — Render Data

Loop through the students and dynamically create:

```text
Name
Marks
Grade
```

using the DOM.

---

### Step 5 — Loading State

Before the Promise completes:

```text
Loading students...
```

After successful completion:

```text
Students loaded successfully.
```

---

### Step 6 — Error Handling

Use:

```javascript
try {
    
} catch (error) {
    
}
```

If something goes wrong, display:

```text
Unable to load students.
```

---

### Step 7 — Required Concepts

Your project **must** contain:

* `const`
* `let`
* Variables
* Operators
* `if / else`
* `&&` / `||`
* Arrays
* Objects
* Functions
* Loops
* DOM
* Events
* `setTimeout`
* Promise
* `resolve`
* `reject`
* `async`
* `await`
* `try/catch`
* Dynamic DOM creation

---

# The Big Picture

At this stage, students should understand the evolution of their JavaScript:

```text
VARIABLES
   ↓
OPERATORS
   ↓
CONDITIONS
   ↓
ARRAYS + OBJECTS
   ↓
LOOPS
   ↓
FUNCTIONS
   ↓
DOM
   ↓
EVENTS
   ↓
ASYNCHRONOUS JS
   ↓
PROMISES
   ↓
ASYNC / AWAIT
   ↓
FETCH / APIs
   ↓
REAL WEB APPLICATION
```

And the key mental model for asynchronous JavaScript is:

```text
Normal JavaScript:

Task A
  ↓
Task B
  ↓
Task C
  ↓
Task D


Asynchronous JavaScript:

Start Task A
     ↓
Long operation starts
     ↓
JavaScript can continue
     ↓
Other work happens
     ↓
Long operation finishes
     ↓
Callback / Promise continuation
     ↓
Process result
```

The important distinction students should understand is:

> **`async/await` does not make a slow operation magically fast. It gives us a cleaner way to write code that has to wait for something without blocking the rest of the application.**

That concept becomes the foundation for working with **APIs, databases, authentication, file uploads, real-time applications, and modern frontend/backend JavaScript.**
