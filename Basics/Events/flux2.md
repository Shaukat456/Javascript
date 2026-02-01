---
---

### **Q1.** What will be the output?

```javascript
let x = 5;
console.log(x);
```

A) 5
B) undefined
C) null
D) Error

---

### **Q2.** What is the output?

```javascript
let a;
console.log(a);
```

A) null
B) 0
C) undefined
D) Error

---

### **Q3.** What will be printed?

```javascript
let x = "5";
let y = 5;
console.log(x + y);
```

A) 10
B) 55
C) Error
D) undefined

---

### **Q4.** What is the output?

```javascript
console.log(typeof 10);
```

A) number
B) int
C) float
D) object

---

### **Q5.** What will be printed?

```javascript
let arr = [1, 2, 3];
console.log(arr.length);
```

A) 2
B) 3
C) 4
D) Error

---

### **Q6.** What will be the output?

```javascript
let x = 10;
if (x > 5) {
  console.log("Yes");
}
```

A) No output
B) Error
C) Yes
D) false

---

### **Q7.** What is the output?

```javascript
for (let i = 0; i < 2; i++) {
  console.log(i);
}
```

A) 1 2
B) 0 1
C) 0 1 2
D) Error

---

### **Q8.** What will be printed?

```javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 3));
```

A) 23
B) 5
C) undefined
D) Error

---

### **Q9.** What is the output?

```javascript
let x = null;
console.log(x);
```

A) undefined
B) 0
C) null
D) Error

---

### **Q10.** What will be printed?

```javascript
console.log(2 === "2");
```

A) true
B) false
C) undefined
D) Error

---

### **Q11.** What will be printed?

```javascript
function greet(name, callback) {
  callback(name);
}

greet("Ali", function (n) {
  console.log("Hello " + n);
});
```

A) Hello
B) Hello Ali
C) Ali
D) Error

---

### **Q12.** What is a callback function?

A) A function that calls itself
B) A function passed as an argument to another function
C) A function that returns nothing
D) A function inside an object

---

### **Q13.** What will be the output?

```javascript
function add(a, b, cb) {
  cb(a + b);
}

add(2, 3, function (result) {
  console.log(result);
});
```

A) 23
B) 5
C) undefined
D) Error

---

### **Q14.** What will be printed?

```javascript
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
```

A) 1 2 3
B) 0 1 2
C) 0 1
D) Infinite loop

---

### **Q15.** How many times will "Hi" print?

```javascript
let i = 1;
while (i <= 3) {
  console.log("Hi");
  i++;
}
```

A) 2
B) 3
C) 4
D) Infinite

---

### **Q16.** What will be printed?

```javascript
let user = {
  name: "Ali",
  address: {
    city: "Lahore",
  },
};

console.log(user.address.city);
```

A) Ali
B) address
C) Lahore
D) undefined

---

### **Q17.** What will be printed?

```javascript
let user = {
  name: "Ali",
  address: {
    city: "Lahore",
  },
};

console.log(user.address);
```

A) Lahore
B) Ali
C) { city: "Lahore" }
D) undefined

---

### **Q18.** What will be printed?

```javascript
let data = {
  a: {
    b: {
      c: 10,
    },
  },
};

console.log(data.a.b.c);
```

A) a
B) b
C) c
D) 10

---

### **Q19.** What will happen?

```javascript
let i = 0;
while (true) {
  i++;
  if (i === 3) break;
  console.log(i);
}
```

A) 1 2
B) 1 2 3
C) 3
D) Infinite loop

---

### **Q20.** What will be printed?

```javascript
function test(cb) {
  cb();
}

test(function () {
  console.log("Done");
});
```

A) test
B) Done
C) undefined
D) Error

---
