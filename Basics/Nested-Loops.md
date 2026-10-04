# Nested Loops in JavaScript

A **nested loop** simply means:

> **One loop running inside another loop.**

Before jumping into syntax, understand the mental model. This is the most important part.

---

## 1. Basic idea

Normal loop:

```js
for (let i = 1; i <= 3; i++) {
    console.log(i);
}
```

Output:

```text
1
2
3
```

Now put another loop inside it:

```js
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 3; j++) {
        console.log(i, j);
    }

}
```

Output:

```text
1 1
1 2
1 3

2 1
2 2
2 3

3 1
3 2
3 3
```

The key idea:

> **For every single iteration of the outer loop, the inner loop runs completely.**

---

# 2. Understand it visually

Imagine:

```text
Outer loop
│
├── i = 1
│   ├── j = 1
│   ├── j = 2
│   └── j = 3
│
├── i = 2
│   ├── j = 1
│   ├── j = 2
│   └── j = 3
│
└── i = 3
    ├── j = 1
    ├── j = 2
    └── j = 3
```

So if:

```text
Outer loop = 3 iterations
Inner loop = 3 iterations
```

the inner statement executes:

```text
3 × 3 = 9 times
```

This multiplication idea is **extremely important**.

---

# 3. Trace it step by step

Consider:

```js
for (let i = 1; i <= 2; i++) {

    for (let j = 1; j <= 3; j++) {
        console.log(i, j);
    }

}
```

### Outer loop starts

```text
i = 1
```

Now JavaScript enters the inner loop.

```text
j = 1 → print 1 1
j = 2 → print 1 2
j = 3 → print 1 3
```

Inner loop finishes.

Then outer loop increments:

```text
i = 2
```

Inner loop starts again:

```text
j = 1 → print 2 1
j = 2 → print 2 2
j = 3 → print 2 3
```

Then:

```text
i = 3
```

Outer condition:

```js
3 <= 2
```

false.

Everything stops.

---

# 4. The most important rule

Remember:

> **Outer loop changes slowly. Inner loop changes quickly.**

For:

```js
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(i, j);
    }
}
```

Think:

```text
i = 1
    j = 1
    j = 2
    j = 3

i = 2
    j = 1
    j = 2
    j = 3

i = 3
    j = 1
    j = 2
    j = 3
```

---

# 5. Real-world analogy: classrooms and students

Imagine a university has:

```text
Class A
    Ali
    Ahmed
    Hamza

Class B
    Sara
    Ayesha
    Fatima

Class C
    Usman
    Bilal
    Hassan
```

You have:

```text
Classes
   ↓
Students inside each class
```

That's naturally a nested-loop problem.

```js
let classes = [
    ["Ali", "Ahmed", "Hamza"],
    ["Sara", "Ayesha", "Fatima"],
    ["Usman", "Bilal", "Hassan"]
];

for (let i = 0; i < classes.length; i++) {

    for (let j = 0; j < classes[i].length; j++) {

        console.log(classes[i][j]);

    }

}
```

Output:

```text
Ali
Ahmed
Hamza
Sara
Ayesha
Fatima
Usman
Bilal
Hassan
```

Here:

```text
Outer loop → classes
Inner loop → students
```

This is one of the most common reasons nested loops exist.

---

# 6. Nested arrays

Nested loops become especially important when working with **2D arrays**.

For example:

```js
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```

Think of this as:

```text
        Column
       0  1  2

Row 0  1  2  3
Row 1  4  5  6
Row 2  7  8  9
```

We can traverse it using:

```js
for (let row = 0; row < matrix.length; row++) {

    for (let col = 0; col < matrix[row].length; col++) {

        console.log(matrix[row][col]);

    }

}
```

Output:

```text
1
2
3
4
5
6
7
8
9
```

---

# 7. Why `matrix[row][col]`?

This is very important.

Suppose:

```js
matrix = [
    [1, 2, 3],
    [4, 5, 6]
];
```

If:

```js
row = 0
```

then:

```js
matrix[row]
```

means:

```js
matrix[0]
```

which gives:

```js
[1, 2, 3]
```

Then:

```js
col = 1
```

so:

```js
matrix[row][col]
```

becomes:

```js
matrix[0][1]
```

which gives:

```text
2
```

So:

```text
matrix[row][col]
      ↓     ↓
    which  which
     row  column
```

---

# 8. Real-world example: seating arrangement

Imagine a cinema:

```text
Row 0 → Seat 0, Seat 1, Seat 2
Row 1 → Seat 0, Seat 1, Seat 2
Row 2 → Seat 0, Seat 1, Seat 2
```

You could represent it:

```js
let seats = [
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"]
];
```

Then:

```js
for (let row = 0; row < seats.length; row++) {

    for (let seat = 0; seat < seats[row].length; seat++) {

        console.log("Seat:", seats[row][seat]);

    }

}
```

This pattern can be used for:

* cinema seats
* classroom seats
* airplane seats
* parking slots
* hotel rooms
* warehouse locations

---

# 9. Nested loops + conditions

Now let's make it more interesting.

Suppose:

```js
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```

Find all even numbers:

```js
for (let row = 0; row < matrix.length; row++) {

    for (let col = 0; col < matrix[row].length; col++) {

        if (matrix[row][col] % 2 === 0) {
            console.log(matrix[row][col]);
        }

    }

}
```

Output:

```text
2
4
6
8
```

Notice how we're combining:

```text
Nested loop
     +
Condition
     +
Array
```

This is much closer to real programming.

---

# 10. Nested loops for multiplication tables

Suppose you want tables from 2 to 5.

```js
for (let table = 2; table <= 5; table++) {

    for (let number = 1; number <= 10; number++) {

        console.log(`${table} × ${number} = ${table * number}`);

    }

}
```

The outer loop chooses the table:

```text
2
3
4
5
```

The inner loop generates:

```text
1 → 10
```

So conceptually:

```text
Table 2
  ×1
  ×2
  ×3
  ...
  ×10

Table 3
  ×1
  ×2
  ...
```

---

# 11. Nested loops and patterns

This is where nested loops are commonly taught because they're excellent for understanding the concept.

### Print a rectangle

```js
for (let row = 1; row <= 3; row++) {

    let line = "";

    for (let col = 1; col <= 5; col++) {
        line += "*";
    }

    console.log(line);
}
```

Output:

```text
*****
*****
*****
```

Why?

Outer loop:

```text
3 rows
```

Inner loop:

```text
5 stars per row
```

Therefore:

```text
3 × 5
```

---

# 12. Make a triangle

Now change the inner loop.

```js
for (let row = 1; row <= 5; row++) {

    let line = "";

    for (let col = 1; col <= row; col++) {
        line += "*";
    }

    console.log(line);
}
```

Output:

```text
*
**
***
****
*****
```

Notice:

When:

```text
row = 1
```

inner loop runs 1 time.

When:

```text
row = 2
```

inner loop runs 2 times.

And so on.

The outer loop controls **how many rows**.

The inner loop controls **what happens inside each row**.

---

# 13. Real-world example: departments → employees

Consider:

```js
let departments = [
    {
        name: "Physics",
        employees: ["Ali", "Ahmed"]
    },
    {
        name: "Computer Science",
        employees: ["Sara", "Ayesha", "Hamza"]
    }
];
```

We can process them:

```js
for (let department of departments) {

    console.log("Department:", department.name);

    for (let employee of department.employees) {

        console.log("Employee:", employee);

    }

}
```

Output:

```text
Department: Physics
Employee: Ali
Employee: Ahmed

Department: Computer Science
Employee: Sara
Employee: Ayesha
Employee: Hamza
```

This structure is very realistic.

For example:

```text
Company
  ↓
Departments
  ↓
Employees
```

Or:

```text
University
  ↓
Departments
  ↓
Students
```

Or:

```text
E-commerce
  ↓
Categories
  ↓
Products
```

---

# 14. E-commerce example

Imagine:

```js
let store = [
    {
        category: "Laptops",
        products: ["Dell", "HP", "Lenovo"]
    },
    {
        category: "Phones",
        products: ["iPhone", "Samsung", "Pixel"]
    }
];
```

You could display everything:

```js
for (let category of store) {

    console.log("Category:", category.category);

    for (let product of category.products) {

        console.log("Product:", product);

    }

}
```

Output:

```text
Category: Laptops
Product: Dell
Product: HP
Product: Lenovo

Category: Phones
Product: iPhone
Product: Samsung
Product: Pixel
```

This is the kind of structure you encounter when working with APIs and databases.

---

# 15. Three levels of nested loops

You can technically nest loops further:

```js
for (let i = 0; i < 3; i++) {

    for (let j = 0; j < 3; j++) {

        for (let k = 0; k < 3; k++) {

            console.log(i, j, k);

        }

    }

}
```

This produces:

```text
3 × 3 × 3 = 27
```

iterations.

But don't automatically think:

> "More nested loops = better."

Deep nesting can make code difficult to understand and can become expensive for large datasets.

---

# 16. A very important concept: complexity

Suppose:

```js
for (let i = 0; i < 100; i++) {

    for (let j = 0; j < 100; j++) {

        console.log(i, j);

    }

}
```

The inner statement executes:

```text
100 × 100 = 10,000
```

times.

If both become 1,000:

```text
1000 × 1000 = 1,000,000
```

This is why nested loops matter when you eventually study **algorithmic complexity / Big O**.

A typical nested loop like this is:

```text
O(n²)
```

Don't worry about Big O yet; just remember:

> **Nested loops often mean the work grows multiplicatively.**

---

# 17. `break` inside nested loops

This is an interesting one.

```js
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 5; j++) {

        if (j === 3) {
            break;
        }

        console.log(i, j);
    }

}
```

Output:

```text
1 1
1 2
2 1
2 2
3 1
3 2
```

The `break` exits the **inner loop**, not both loops.

Think:

```text
Outer loop
    ↓
Inner loop
    ↓
break
    ↓
Exit inner loop
    ↓
Outer loop continues
```

This is a common source of confusion.

---

# 18. `continue` inside nested loops

Similarly:

```js
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 5; j++) {

        if (j === 3) {
            continue;
        }

        console.log(i, j);
    }

}
```

The inner loop skips `j = 3`.

Output:

```text
1 1
1 2
1 4
1 5

2 1
2 2
2 4
2 5

3 1
3 2
3 4
3 5
```

---

# 19. One powerful real-world problem

Suppose an online store has products:

```js
let products = [
    { name: "Laptop", tags: ["electronics", "computer"] },
    { name: "Phone", tags: ["electronics", "mobile"] },
    { name: "Book", tags: ["education", "reading"] }
];
```

We want to find products tagged `"electronics"`.

```js
for (let product of products) {

    for (let tag of product.tags) {

        if (tag === "electronics") {
            console.log(product.name);
        }

    }

}
```

Output:

```text
Laptop
Phone
```

Here we have:

```text
Products
   ↓
Each product
   ↓
Its tags
   ↓
Check each tag
```

That's a genuine nested-data problem.

---

# 20. The core mental model

Whenever you see data like:

```text
A
 ├── B
 ├── B
 └── B

A
 ├── B
 ├── B
 └── B
```

or:

```text
rows
 └── columns
```

or:

```text
departments
 └── employees
```

or:

```text
categories
 └── products
```

or:

```text
classes
 └── students
```

you should immediately think:

> **"There may be a nested-loop problem here."**

---

# 21. Practice problems

Try these **without looking at the solution first**.

### Problem 1 — Rectangle

Print:

```text
*****
*****
*****
*****
```

using nested loops.

---

### Problem 2 — Triangle

Print:

```text
*
**
***
****
*****
```

---

### Problem 3 — Multiplication tables

Print tables from `1` to `5`, each from `1` to `10`.

---

### Problem 4 — 2D array

Given:

```js
let matrix = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
];
```

Print every value using nested loops.

---

### Problem 5 — Find a number

Given:

```js
let matrix = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
];
```

Find `50`.

Your output should be something like:

```text
Found at row 1, column 1
```

---

### Problem 6 — Find all even numbers

Given:

```js
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```

Print:

```text
2
4
6
8
```

---

### Problem 7 — Student system

Given:

```js
let classes = [
    ["Ali", "Ahmed"],
    ["Sara", "Ayesha"],
    ["Hamza", "Usman"]
];
```

Print:

```text
Class 1
Ali
Ahmed

Class 2
Sara
Ayesha

Class 3
Hamza
Usman
```

---

## The one sentence to remember

> **Outer loop handles the groups; inner loop handles the items inside each group.**

For example:

```text
University
   ↓
Classes              ← outer loop
   ↓
Students             ← inner loop
```

Once this clicks, nested loops stop looking complicated—they become a way of **walking through hierarchical or 2D data**.
