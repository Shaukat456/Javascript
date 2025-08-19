## **1. What is Control Flow?**

Control flow is **the order in which your code runs** and how you can change that order based on conditions.

💡 **Analogy:**
Think of it like a **traffic system**:

- Green light → go straight
- Red light → stop
- Yellow light → slow down
- Detour sign → take another path

Without control flow, your program is like a car that drives straight forever — no turns, no stops.

---

## **2. Decision Making Statements**

---

### **a) `if` Statement**

Runs code **only if** the condition is true.

if (condition) {
// code runs if condition is true
}

**Example:**

```javascript
let temperature = 30;
if (temperature > 25) {
  console.log("It's hot outside!");
}
```

💡 _Real-world:_
If it’s raining, take an umbrella.

---

### **b) `if...else`**

Adds an alternative path.

**Example:**

```javascript
let age = 16;
if (age >= 18) {
  console.log("You can vote");
} else {
  console.log("You are too young to vote");
}
```

💡 _Real-world:_
If shop is open → enter, else → go home.

---

### **c) `if...else if...else`**

Checks multiple conditions in order.

**Example:**

```javascript
let marks = 72;

if (marks >= 80) {
  console.log("Grade A");
} else if (marks >= 60) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}
```

💡 _Real-world:_
If weather = sunny → go park
Else if weather = cloudy → go café
Else → stay home

---

### **d) `switch` Statement**

Cleaner way to handle multiple possible values of a variable.

**Example:**

```javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  default:
    console.log("Just another day");
}
```

You now know:

1. **if, else, else if** → decision making
2. **switch** → clean multi-choice

---

## **💻 Mini Project**

**Number Guessing Game**

```javascript
let secret = 7;
let guess;

do {
  guess = Number(prompt("Guess the number (1-10):"));

  if (guess > secret) {
    console.log("Too high!");
  } else if (guess < secret) {
    console.log("Too low!");
  }
} while (guess !== secret);

console.log("🎉 Correct!");
```
