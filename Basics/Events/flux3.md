===

# 🟦 React + JavaScript Quiz (40 MCQs – Simple)

---

## 🔹 JavaScript Important Topics (Q1–Q10)

### **Q1.** What will be the output?

```js
console.log(typeof []);
```

A) array
B) object
C) list
D) undefined

---

### **Q2.** What is `===` in JavaScript?

A) Assignment operator
B) Loose equality
C) Strict equality
D) Comparison only for numbers

---

### **Q3.** What will be printed?

```js
let x;
console.log(x);
```

A) null
B) 0
C) undefined
D) Error

---

### **Q4.** What is a closure?

A) A loop inside a function
B) A function with access to outer scope
C) A function that returns nothing
D) A callback function

---

### **Q5.** What will be printed?

```js
console.log(2 + "3");
```

A) 5
B) 23
C) Error
D) undefined

---

### **Q6.** Which one is NOT a primitive type?

A) number
B) string
C) boolean
D) object

---

### **Q7.** What does `Array.map()` return?

A) Same array
B) New array
C) Object
D) Number

---

### **Q8.** What is hoisting?

A) Moving variables to bottom
B) JavaScript ignores variables
C) Variables/functions moved to top
D) Deleting variables

---

### **Q9.** What will be printed?

```js
console.log(Boolean(""));
```

A) true
B) false
C) null
D) Error

---

### **Q10.** Which keyword creates block-scoped variables?

A) var
B) let
C) const
D) Both B and C

---

## 🔹 React Basics & Rendering (Q11–Q20)

### **Q11.** What is React?

A) Database
B) Backend framework
C) UI library
D) Programming language

---

### **Q12.** What does JSX stand for?

A) JavaScript XML
B) Java Syntax Extension
C) JSON XML
D) JavaScript Extra

---

### **Q13.** What is rendering in React?

A) Saving data
B) Showing UI on screen
C) Calling API
D) Writing CSS

---

### **Q14.** What causes a component to re-render?

A) Page refresh
B) State change
C) CSS change
D) Console log

---

### **Q15.** What is `props`?

A) Component state
B) Function
C) Data passed to component
D) Hook

---

### **Q16.** Can props be modified inside a component?

A) Yes
B) No
C) Sometimes
D) Only in class components

---

### **Q17.** What is the virtual DOM?

A) Real browser DOM
B) Copy of real DOM
C) Database
D) API

---

### **Q18.** What is a React component?

A) CSS file
B) JavaScript function/class
C) Database table
D) HTML file

---

### **Q19.** What is conditional rendering?

A) Rendering CSS
B) Rendering based on condition
C) Rendering once
D) Rendering API

---

### **Q20.** Which symbol is used to embed JS in JSX?

A) ()
B) []
C) {}
D) <>

---

## 🔹 Hooks: useState, useEffect, useLayoutEffect (Q21–Q30)

### **Q21.** What does `useState` return?

A) State only
B) Function only
C) State and updater function
D) Object

---

### **Q22.** What will this do?

```js
const [count, setCount] = useState(0);
```

A) Create variable
B) Create state
C) Create prop
D) Create effect

---

### **Q23.** When does `useEffect` run by default?

A) Once
B) On every render
C) Never
D) On click

---

### **Q24.** What does this mean?

```js
useEffect(() => {}, []);
```

A) Runs every time
B) Runs once on mount
C) Runs on unmount
D) Error

---

### **Q25.** What is `useLayoutEffect` mainly used for?

A) API calls
B) Styling
C) DOM measurements before paint
D) State updates

---

### **Q26.** Which hook is synchronous?

A) useState
B) useEffect
C) useLayoutEffect
D) useContext

---

### **Q27.** Hooks can be used in:

A) Class components
B) Functional components
C) Both
D) CSS files

---

### **Q28.** Where should hooks be called?

A) Inside loops
B) Inside conditions
C) At top level of component
D) Inside callbacks

---

### **Q29.** What happens when state updates?

A) Page reloads
B) Component re-renders
C) App crashes
D) Nothing

---

### **Q30.** Which hook shares data globally?

A) useState
B) useEffect
C) useContext
D) useRef

---

## 🔹 Context API, Redux, Git, REST, Next.js (Q31–Q40)

### **Q31.** Why use Context API?

A) Styling
B) Global state sharing
C) Routing
D) API calls

---

### **Q32.** Redux is mainly used for?

A) Routing
B) State management
C) Styling
D) Testing

---

### **Q33.** Redux follows which pattern?

A) MVC
B) MVVM
C) Flux
D) Observer

---

### **Q34.** What is a REST API?

A) UI
B) Database
C) Communication standard
D) Programming language

---

### **Q35.** Which HTTP method is used to fetch data?

A) POST
B) PUT
C) DELETE
D) GET

---

### **Q36.** What does Git do?

A) Runs code
B) Stores UI
C) Version control
D) Hosting

---

### **Q37.** Which command uploads code to remote repo?

A) git clone
B) git pull
C) git push
D) git commit

---

### **Q38.** What is Next.js?

A) CSS framework
B) React framework
C) Backend only
D) Database

---

### **Q39.** One main benefit of Next.js?

A) Faster typing
B) Server-side rendering
C) Better CSS
D) Smaller JS

---

### **Q40.** What is hydration in Next.js?

A) API call
B) Adding event listeners to SSR HTML
C) Styling
D) Routing

---

===

Awesome 👍
Here are **30 SIMPLE JavaScript MCQs** focused on exactly what you asked:

- `.map()`
- `.filter()`
- Callbacks
- Promises
- API (fetch)
- Array & Object traversing

Same **clean, beginner-friendly, exam-ready** style.

---

# 🟦 JavaScript MCQs – Arrays, Callbacks, Promises & API (30 Questions)

---

## 🔹 Arrays, map & filter (Q1–Q12)

### **Q1.** What does `map()` return?

A) Same array
B) New array
C) Object
D) Number

---

### **Q2.** What will be the output?

```js
[1, 2, 3].map((x) => x * 2);
```

A) [1, 2, 3]
B) [2, 4, 6]
C) 6
D) Error

---

### **Q3.** What does `filter()` return?

A) Single value
B) New array
C) Object
D) Boolean

---

### **Q4.** What will be the output?

```js
[1, 2, 3, 4].filter((x) => x > 2);
```

A) [1, 2]
B) [3, 4]
C) [2, 3]
D) Error

---

### **Q5.** Which method is best to transform array values?

A) forEach
B) map
C) filter
D) reduce

---

### **Q6.** What will be the output?

```js
[1, 2, 3].map((x) => x);
```

A) [1, 2, 3]
B) [3, 2, 1]
C) []
D) Error

---

### **Q7.** What will be the output?

```js
[1, 2, 3].filter((x) => x);
```

A) [1, 2, 3]
B) []
C) [true]
D) Error

---

### **Q8.** Which one skips elements based on condition?

A) map
B) filter
C) forEach
D) push

---

### **Q9.** What does `forEach()` return?

A) New array
B) Modified array
C) undefined
D) Object

---

### **Q10.** What will be printed?

```js
let arr = [1, 2, 3];
arr.forEach((x) => console.log(x));
```

A) 1 2 3
B) [1,2,3]
C) undefined
D) Error

---

### **Q11.** What will be the output?

```js
[1, 2, 3].map((x) => x > 1);
```

A) [true, true, true]
B) [false, true, true]
C) [1,2,3]
D) Error

---

### **Q12.** What will be the output?

```js
[1, 2, 3].filter((x) => x > 5);
```

A) [1,2,3]
B) []
C) null
D) Error

---

## 🔹 Array & Object Traversing (Q13–Q20)

### **Q13.** How do you access the first element of an array `arr`?

A) arr(0)
B) arr[0]
C) arr.first
D) arr.get(0)

---

### **Q14.** What will be printed?

```js
let user = { name: "Ali", age: 20 };
console.log(user.name);
```

A) Ali
B) name
C) 20
D) undefined

---

### **Q15.** What will be printed?

```js
let user = { name: "Ali", age: 20 };
console.log(user["age"]);
```

A) Ali
B) name
C) 20
D) undefined

---

### **Q16.** Which loop is best to traverse an array?

A) for
B) for...of
C) while
D) All of the above

---

### **Q17.** Which loop is used for object keys?

A) for
B) for...of
C) for...in
D) while

---

### **Q18.** What will be printed?

```js
let obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key);
}
```

A) 1 2
B) a b
C) {a,b}
D) Error

---

### **Q19.** What will be printed?

```js
let obj = { a: 1, b: 2 };
console.log(Object.keys(obj));
```

A) [1,2]
B) ["a","b"]
C) {a,b}
D) Error

---

### **Q20.** What will be printed?

```js
let arr = [{ x: 1 }, { x: 2 }];
console.log(arr[1].x);
```

A) 1
B) 2
C) x
D) undefined

---

## 🔹 Callbacks, Promises & API (Q21–Q30)

### **Q21.** What is a callback?

A) Function calling itself
B) Function passed to another function
C) Async function
D) Promise

---

### **Q22.** What will be printed?

```js
function test(cb) {
  cb();
}
test(() => console.log("Done"));
```

A) test
B) Done
C) undefined
D) Error

---

### **Q23.** What does `then()` do?

A) Handles resolved promise
B) Handles rejected promise
C) Creates promise
D) Cancels promise

---

### **Q24.** What will be printed?

```js
Promise.resolve(10).then((x) => console.log(x));
```

A) undefined
B) Promise
C) 10
D) Error

---

### **Q25.** What does `catch()` handle?

A) Success
B) Error
C) Data
D) Callback

---

### **Q26.** Which function is used to call APIs in JS?

A) getData
B) fetch
C) request
D) axios only

---

### **Q27.** What does `fetch()` return?

A) Data
B) Promise
C) Object
D) Array

---

### **Q28.** Which method converts response to JSON?

A) JSON.stringify()
B) response.parse()
C) response.json()
D) response.text()

---

### **Q29.** What will be printed?

```js
fetch("url").then((res) => console.log(res));
```

A) Data
B) Promise
C) Response object
D) Error

---

### **Q30.** Which keyword pauses execution inside async function?

A) stop
B) wait
C) await
D) pause

---
