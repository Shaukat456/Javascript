---
---

## 🔹 Variables & Mutability

### **Q41.** What will be the output?

```python
a = [1, [2], 3]
b = a[1]
print(b)
```

A) [1, 2, 3, 4]
B) [1, 2, 3]
C) [4]
D) [2]

---

### **Q42.** What will be the output?

```python
a = [1, 2]
b = a
b = b + [3]
print(a)
```

A) [1, 2, 3]
B) [3]
C) [1, 2]
D) Error

---

### **Q43.** What will be printed?

```python
x = 10
def f(x):
    x += 5
f(x)
print(x)
```

A) 10
B) 15
C) Error
D) None

---

## 🔹 Lists, Strings & Slicing

### **Q44.** What will be the output?

```python
s = "Python"
print(s[1:4])
```

A) yth
B) ytho
C) Pyt
D) Error

---

### **Q45.** What will be the output?

```python
nums = [1, 2, 3, 4]
print(nums[-2:])
```

A) [3, 4]
B) [2, 3]
C) [4]
D) Error

---

### **Q46.** What will be printed?

```python
nums = [1, 2, 3]
print(nums * 2)
```

A) [1,2,3,1,2,3]
B) [2,4,6]
C) Error
D) None

---

## 🔹 Loops & Control Flow

### **Q47.** What will be the output?

```python
for i in range(3):
    print(i)
else:
    print("Done")
```

A) 0 1 2
B) Done
C) 0 1 2 Done
D) Error

---

### **Q48.** What will be printed?

```python
i = 0
while i < 3:
    i += 1
    if i == 2:
        continue
    print(i)
```

A) 1 2 3
B) 1 3
C) 2 3
D) Error

---

### **Q49.** What will be printed?

```python
for i in range(5):
    if i == 3:
        pass
    print(i)
```

A) 0 1 2 4
B) 0 1 2 3 4
C) 3
D) Error

---

## 🔹 Functions & Arguments

### **Q50.** What will be the output?

```python
def f(a, b=5, c=10):
    return a + b + c

print(f(5, c=20))
```

A) 20
B) 25
C) 30
D) Error

---

### **Q51.** What will be printed?

```python
def f(*args):
    return args

print(type(f(1,2)))
```

A) tuple
B) list
C) dict
D) Error

---

### **Q52.** What will be printed?

```python
def f(a, b, /):
    print(a, b)

f(1, 2)
```

A) 1 2
B) Error
C) None
D) Depends

---

## 🔹 OOP Concepts

### **Q53.** What will be the output?

```python
class A:
    x = 10

class B(A):
    x = 20

print(A.x, B.x)
```

A) 10 10
B) 20 20
C) 10 20
D) Error

---

### **Q54.** What will be the output?

```python
class A:
    def show(self):
        print("A")

class B(A):
    def show(self):
        print("B")

A().show()
```

A) A
B) B
C) Error
D) None

---

### **Q55.** Which concept is demonstrated?

```python
class Shape:
    def area(self):
        pass
```

A) Inheritance
B) Encapsulation
C) Polymorphism
D) Abstraction

---

### **Q56.** What will be the output?

```python
class A:
    def __init__(self):
        self.x = 10

obj = A()
obj.x = 20
print(obj.x)
```

A) 10
B) 20
C) Error
D) None

---

## 🔹 Decorators & Advanced

### **Q57.** What will be the output?

```python
def deco(func):
    def wrapper():
        print("Start")
        func()
        print("End")
    return wrapper

@deco
def hi():
    print("Hi")

hi()
```

A) Hi
B) Start Hi End
C) Start End Hi
D) Error

---

### **Q58.** What will be printed?

```python
print(bool(0), bool(""), bool("0"))
```

A) False False False
B) False True True
C) False False True
D) True False True

---

### **Q59.** What will be printed?

```python
x = None
print(x is None)
```

A) True
B) False
C) Error
D) None

---

### **Q60.** Which statement is TRUE?

A) Functions can return multiple values
B) Python does not support decorators
C) Lists are immutable
D) `pass` exits a loop

---
