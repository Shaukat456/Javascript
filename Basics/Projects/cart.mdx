# 🛒 Build a Real E-Commerce Shopping Cart

### Master Functions · Callbacks · Spread · Rest · Destructuring

> **What you'll build:** A fully working shopping cart system — the same logic
> that powers real stores like Amazon and Daraz. Add items, remove them, apply
> discount codes, calculate totals, and generate an order summary.
>
> **Run it with:** `node cart.js`

---

## Why a Shopping Cart?

Every e-commerce website in the world has a cart system under the hood.
When you click "Add to Cart" on Daraz or Amazon, JavaScript functions exactly
like the ones you'll write here are running in the background.

This project uses every concept deliberately — not artificially.
Each concept appears because it is **the right tool for that job**.

---

## The Data We're Working With

Before writing any logic, understand the shape of our data.
A product comes from a store catalogue. A cart item is a product + a quantity.

```js
// A product in the store
const product = {
  id: "SKU-001",
  name: "Wireless Headphones",
  price: 4500, // in PKR
  category: "Electronics",
  inStock: true,
};

// A cart item = product + how many the user wants
const cartItem = {
  product: { ...product },
  quantity: 2,
};

// The cart itself
const cart = {
  id: "CART-XYZ",
  items: [],
  discountCode: null,
};
```

> **Notice:** A cart item _wraps_ a product rather than duplicating its fields.
> This is intentional — if the product price changes, we only update it in one place.

---

## Step 1 — Create a Cart (Functions)

### Concept: Functions

A **function** is a named, reusable block of code.
The key word is _reusable_ — you write the logic once, call it anywhere.

```js
function createCart() {
  // Each cart gets a unique ID using the current timestamp
  return {
    id: "CART-" + Date.now(),
    items: [],
    discountCode: null,
  };
}
```

> **Why a function here?**
> Every user session needs its own fresh cart object. Without a function,
> you'd write `{ id: ..., items: [], discountCode: null }` every single time —
> and if you ever need to add a new field (like `createdAt`), you'd have to
> find and update every single place. With a function, you change it once.

```js
const cart = createCart();
console.log(cart);
// { id: 'CART-1718200000000', items: [], discountCode: null }
```

---

## Step 2 — Add a Product to the Cart (Object Destructuring)

### Concept: Object Destructuring

When a function receives a complex object, you often need only certain fields.
**Object destructuring** extracts them cleanly in one line.

```js
function addToCart(cart, product, quantity = 1) {
  // Destructure only the fields we need from product
  // Instead of: product.id, product.name, product.price everywhere
  const { id, name, price, inStock } = product;

  // Guard: don't add out-of-stock items
  if (!inStock) {
    console.log(`❌ "${name}" is out of stock.`);
    return cart;
  }

  // Check if this product already exists in the cart
  const existingItem = cart.items.find((item) => item.product.id === id);

  if (existingItem) {
    // Item already in cart — just increase quantity
    existingItem.quantity += quantity;
    console.log(
      `🔄 Updated "${name}" — quantity is now ${existingItem.quantity}`,
    );
  } else {
    // New item — push it to the cart
    cart.items.push({ product, quantity });
    console.log(`✅ Added "${name}" — PKR ${price} × ${quantity}`);
  }

  return cart;
}
```

> **Why destructure `product` here?**
> Look at the guard check: `if (!inStock)` and the log `"${name}"`.
> Without destructuring, these would be `product.inStock` and `product.name`.
> With just 2-3 uses that's fine — but a real `addToCart` function touches
> many fields many times. Destructuring once at the top keeps the rest clean.

> **`quantity = 1` — Default Parameter:**
> If the caller doesn't pass a quantity, it defaults to 1.
> This mirrors real cart behaviour — clicking "Add to Cart" adds one item.

**Test it:**

```js
const cart = createCart();

const headphones = {
  id: "SKU-001",
  name: "Wireless Headphones",
  price: 4500,
  category: "Electronics",
  inStock: true,
};
const tshirt = {
  id: "SKU-002",
  name: "Cotton T-Shirt",
  price: 850,
  category: "Clothing",
  inStock: true,
};
const laptop = {
  id: "SKU-003",
  name: "Gaming Laptop",
  price: 95000,
  category: "Electronics",
  inStock: false,
};

addToCart(cart, headphones);
addToCart(cart, tshirt, 3);
addToCart(cart, laptop); // ❌ out of stock
addToCart(cart, headphones, 1); // 🔄 already in cart, quantity updates
```

---

## Step 3 — Remove an Item (Callbacks)

### Concept: Callbacks — Part 1

A **callback** is a function you pass into another function as an argument.
The receiving function calls it at the right moment.

JavaScript's built-in array methods — `.filter()`, `.find()`, `.map()`, `.sort()` —
all work this way. You provide the _rule_, they handle the _looping_.

```js
function removeFromCart(cart, productId) {
  const before = cart.items.length;

  // `.filter()` keeps items where the callback returns true
  // We keep every item EXCEPT the one matching productId
  cart.items = cart.items.filter(function (item) {
    return item.product.id !== productId;
  });

  const after = cart.items.length;

  if (before === after) {
    console.log(`⚠️  Product ${productId} was not in the cart.`);
  } else {
    console.log(`🗑️  Removed product ${productId} from cart.`);
  }

  return cart;
}
```

> **Why a callback instead of a manual loop?**
> Without `.filter()`, you'd write:
>
> ```js
> const remaining = [];
> for (let i = 0; i < cart.items.length; i++) {
>   if (cart.items[i].product.id !== productId) {
>     remaining.push(cart.items[i]);
>   }
> }
> cart.items = remaining;
> ```
>
> `.filter()` with a callback does this in one line. You focus on the _rule_
> (`id !== productId`), not the mechanics of looping and building a new array.

**Arrow function version (same thing, shorter syntax):**

```js
function removeFromCart(cart, productId) {
  const before = cart.items.length;
  cart.items = cart.items.filter((item) => item.product.id !== productId);
  const after = cart.items.length;

  before === after
    ? console.log(`⚠️  Product ${productId} not found.`)
    : console.log(`🗑️  Removed product ${productId}.`);

  return cart;
}
```

---

## Step 4 — Update Quantity (Callbacks + Destructuring Together)

Here both concepts work _together_, which is how real code looks.

```js
function updateQuantity(cart, productId, newQuantity) {
  if (newQuantity < 1) {
    // If user sets quantity to 0 or less, remove the item entirely
    return removeFromCart(cart, productId);
  }

  // .find() returns the FIRST item where the callback returns true
  // It stops searching as soon as it finds a match — efficient
  const item = cart.items.find((item) => item.product.id === productId);

  if (!item) {
    console.log(`⚠️  Product ${productId} not in cart.`);
    return cart;
  }

  // Destructure the product out of the found item
  const { name } = item.product;

  item.quantity = newQuantity;
  console.log(`✏️  "${name}" quantity updated to ${newQuantity}`);

  return cart;
}
```

> **`.find()` vs `.filter()`:**
>
> - `.filter()` → returns a **new array** of ALL matches.
> - `.find()` → returns the **first single match** (or `undefined`).
>
> Use `.find()` when you expect exactly one result (like finding by unique ID).
> Use `.filter()` when you expect multiple results (like filtering by category).

---

## Step 5 — Apply a Discount Code (Functions + Callbacks)

Discount codes are a perfect example of why callbacks make your code extensible.
Instead of hardcoding every discount rule, we store rules as functions.

```js
// A "registry" of discount codes and their rules
// Each value is a FUNCTION (callback) that takes the subtotal and returns the discount amount
const discountRules = {
  SAVE10: (subtotal) => subtotal * 0.1, // 10% off
  SAVE20: (subtotal) => subtotal * 0.2, // 20% off
  FLAT500: (subtotal) => (subtotal >= 2000 ? 500 : 0), // PKR 500 off orders above 2000
  STUDENT: (subtotal) => subtotal * 0.15, // 15% student discount
};

function applyDiscount(cart, code) {
  const upperCode = code.toUpperCase();

  // Check if the code exists in our registry
  const rule = discountRules[upperCode];

  if (!rule) {
    console.log(`❌ "${code}" is not a valid discount code.`);
    return cart;
  }

  cart.discountCode = upperCode;
  console.log(`🎟️  Discount code "${upperCode}" applied!`);
  return cart;
}
```

> **Why store discount rules as functions (callbacks)?**
> Look at `"FLAT500"`: the discount is _conditional_ — it only applies if the
> order is above PKR 2000. If we stored discount values as plain numbers,
> we couldn't express this logic.
>
> By storing _functions_, each rule can have its own complex logic.
> Adding a new discount code means adding one line to `discountRules` —
> you never touch `applyDiscount` itself. This is called the
> **Open/Closed Principle**: open for extension, closed for modification.

---

## Step 6 — Calculate the Total (Callbacks + Destructuring)

### Concept: Callbacks — Part 2 (`.reduce()`)

`.reduce()` is the most powerful array method. It processes every item
and accumulates a single result — perfect for totals.

```js
function calculateTotal(cart) {
  if (cart.items.length === 0) {
    return { subtotal: 0, discount: 0, deliveryFee: 0, total: 0 };
  }

  // .reduce() with a callback to sum up all item prices
  // For each item: price × quantity, add to running total
  const subtotal = cart.items.reduce((runningTotal, item) => {
    // Destructure price from the nested product object
    const { price } = item.product;
    const { quantity } = item;
    return runningTotal + price * quantity;
  }, 0); // <-- 0 is the starting value of runningTotal

  // Calculate discount by calling the stored rule function (callback)
  let discount = 0;
  if (cart.discountCode) {
    const rule = discountRules[cart.discountCode];
    discount = rule(subtotal); // call the discount function with the subtotal
  }

  // Free delivery above PKR 3000
  const deliveryFee = subtotal - discount >= 3000 ? 0 : 200;

  const total = subtotal - discount + deliveryFee;

  return { subtotal, discount, deliveryFee, total };
}
```

> **How `.reduce()` works step by step:**
> Imagine the cart has 3 items: PKR 4500, PKR 2550, PKR 1200.
>
> | Iteration | `runningTotal` (before) | Item Price | `runningTotal` (after) |
> | --------- | ----------------------- | ---------- | ---------------------- |
> | 1         | 0                       | 4500       | 4500                   |
> | 2         | 4500                    | 2550       | 7050                   |
> | 3         | 7050                    | 1200       | 8250                   |
>
> Final result: `8250`. The callback runs once per item, each time
> receiving the result of the previous run.

> **Nested destructuring — `item.product.price`:**
> We could write `item.product.price` directly, but `const { price } = item.product`
> is cleaner inside a loop where we reference it multiple times.

---

## Step 7 — Add Multiple Items at Once (Rest Parameters + Spread)

### Concept: Rest Parameters (`...items`)

What if the user wants to add a bundle of products at once?
**Rest parameters** let a function accept any number of arguments.

```js
function addBundleToCart(cart, ...products) {
  // `products` is now an ARRAY of everything passed after `cart`
  // Rest parameters always produce an array, no matter how many args are passed

  console.log(`\n📦 Adding bundle of ${products.length} items...`);

  products.forEach((product) => {
    addToCart(cart, product);
  });

  return cart;
}
```

> **Rest parameters vs a regular array argument:**
>
> ```js
> // With rest — natural to call:
> addBundleToCart(cart, headphones, tshirt, laptop);
>
> // Without rest — you'd have to manually wrap in an array:
> addBundleToCart(cart, [headphones, tshirt, laptop]);
> ```
>
> Rest parameters make the _call site_ read like plain English.
> The function handles the array wrapping internally.

---

## Step 8 — Merge Two Carts (Spread Operator)

### Concept: Spread Operator (`...`)

Spread does the opposite of rest: it _expands_ an array or object
into individual pieces.

**Real scenario:** A user shops without logging in (guest cart),
then logs in. We need to merge their guest cart into their saved cart.

```js
function mergeCarts(primaryCart, guestCart) {
  console.log(`\n🔀 Merging guest cart into main cart...`);

  // Spread the guest cart items — loop over each one
  guestCart.items.forEach((guestItem) => {
    // Destructure for readability
    const { product, quantity } = guestItem;

    // Check if this product already exists in the primary cart
    const existing = primaryCart.items.find((i) => i.product.id === product.id);

    if (existing) {
      existing.quantity += quantity; // combine quantities
      console.log(
        `  🔄 Merged "${product.name}" — new quantity: ${existing.quantity}`,
      );
    } else {
      // Spread the guestItem to create a fresh copy, not a reference
      primaryCart.items.push({ ...guestItem });
      console.log(`  ✅ Added "${product.name}" from guest cart`);
    }
  });

  return primaryCart;
}
```

> **Why `{ ...guestItem }` instead of just `guestItem`?**
> In JavaScript, objects are passed by reference. If you push `guestItem`
> directly, the primary cart and guest cart share the _same object in memory_.
> Changing quantity in one would affect the other.
>
> Spreading creates a **shallow copy** — a brand new object with the same values.
> This prevents accidental cross-cart mutations.

**Spread to clone and modify an item:**

```js
function changeItemPrice(item, newPrice) {
  // Creates a new item object with all original fields, but price overridden
  return {
    ...item,
    product: { ...item.product, price: newPrice },
  };
}
```

> **Nested spread** — because `item.product` is itself an object,
> we need to spread it separately too. A single `{ ...item }` would
> still share the same `product` reference inside.

---

## Step 9 — Generate Order Summary (Array Destructuring)

### Concept: Array Destructuring

Array destructuring unpacks values from an array by **position**.

```js
function generateSummary(cart) {
  const { subtotal, discount, deliveryFee, total } = calculateTotal(cart);

  // Sort items by total price (highest first) using a comparator callback
  const sortedItems = [...cart.items].sort((a, b) => {
    return b.product.price * b.quantity - a.product.price * a.quantity;
  });

  // Array destructuring — pull out top 2 most expensive items by position
  const [mostExpensive, secondMost] = sortedItems;

  // Destructure the cart's id as well
  const { id: cartId, discountCode } = cart;

  console.log("\n" + "=".repeat(45));
  console.log("           🧾 ORDER SUMMARY");
  console.log("=".repeat(45));
  console.log(`  Cart ID       : ${cartId}`);
  console.log(`  Items         : ${cart.items.length}`);
  console.log("");

  // Loop with destructuring inside the callback
  cart.items.forEach(({ product, quantity }) => {
    const { name, price } = product;
    const lineTotal = price * quantity;
    console.log(
      `  • ${name.padEnd(22)} PKR ${String(price).padStart(6)} × ${quantity} = PKR ${lineTotal}`,
    );
  });

  console.log("-".repeat(45));
  console.log(`  Subtotal      : PKR ${subtotal}`);

  if (discount > 0) {
    console.log(`  Discount (${discountCode}) : - PKR ${discount.toFixed(0)}`);
  }

  console.log(
    `  Delivery      : ${deliveryFee === 0 ? "FREE 🎉" : "PKR " + deliveryFee}`,
  );
  console.log("=".repeat(45));
  console.log(`  TOTAL         : PKR ${total.toFixed(0)}`);
  console.log("=".repeat(45));

  if (mostExpensive) {
    const { name: topName } = mostExpensive.product;
    console.log(`\n  💸 Biggest spend: "${topName}"`);
  }

  if (secondMost) {
    const { name: secondName } = secondMost.product;
    console.log(`  🥈 Second biggest: "${secondName}"`);
  }
}
```

> **`const [mostExpensive, secondMost] = sortedItems`:**
> This pulls `sortedItems[0]` into `mostExpensive` and `sortedItems[1]`
> into `secondMost` — in one line.
>
> This is cleaner than:
>
> ```js
> const mostExpensive = sortedItems[0];
> const secondMost = sortedItems[1];
> ```
>
> The real power is when you need several values from an array at once.

> **Destructuring inside a `.forEach()` callback:**
>
> ```js
> cart.items.forEach(({ product, quantity }) => { ... })
> ```
>
> Instead of receiving the whole `item` object and writing `item.product`
> and `item.quantity` everywhere, we destructure right in the parameter.
> This tells anyone reading the code exactly what shape each item has.

> **`{ id: cartId }` — Destructuring with renaming:**
> `const { id: cartId } = cart` means: take the `id` property, but call
> the variable `cartId` in this scope. Useful when `id` is too generic
> a name or conflicts with something else.

---

## Step 10 — The Full Program

```js
// =============================================
//  E-COMMERCE SHOPPING CART — Complete Program
// =============================================

// --- Product Catalogue ---
const headphones = {
  id: "SKU-001",
  name: "Wireless Headphones",
  price: 4500,
  category: "Electronics",
  inStock: true,
};
const tshirt = {
  id: "SKU-002",
  name: "Cotton T-Shirt",
  price: 850,
  category: "Clothing",
  inStock: true,
};
const sneakers = {
  id: "SKU-003",
  name: "Running Sneakers",
  price: 6200,
  category: "Footwear",
  inStock: true,
};
const laptop = {
  id: "SKU-004",
  name: "Gaming Laptop",
  price: 95000,
  category: "Electronics",
  inStock: false,
};
const backpack = {
  id: "SKU-005",
  name: "Travel Backpack",
  price: 2800,
  category: "Accessories",
  inStock: true,
};

// --- Build the Cart ---
const cart = createCart();

// Add a bundle using rest parameters
addBundleToCart(cart, headphones, tshirt, sneakers);

// Try to add an out-of-stock item
addToCart(cart, laptop);

// Add another and update quantity
addToCart(cart, backpack);
updateQuantity(cart, "SKU-002", 2); // want 2 t-shirts
updateQuantity(cart, "SKU-001", 0); // changed mind on headphones — removes it

// --- Guest Cart Merge ---
const guestCart = createCart();
addToCart(guestCart, headphones, 1); // was in guest cart
addToCart(guestCart, sneakers, 2); // extra pair

mergeCarts(cart, guestCart);

// --- Apply Discount ---
applyDiscount(cart, "SAVE10");

// --- Generate Summary ---
generateSummary(cart);
```

---

## 🗺️ Concept Map — Every Tool and Where It Was Used

| Concept                       | Where Used                                              | Why It Was The Right Tool                  |
| ----------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| **Functions**                 | `createCart`, `addToCart`, `calculateTotal`, all others | Reusable, named, single-purpose logic      |
| **Default Parameters**        | `addToCart(cart, product, quantity = 1)`                | Sensible fallback, cleaner call sites      |
| **Object Destructuring**      | `addToCart`, `calculateTotal`, `generateSummary`        | Extract only needed fields cleanly         |
| **Destructuring in params**   | `.forEach(({ product, quantity })`                      | Self-documenting, no repetitive `item.x`   |
| **Destructuring with rename** | `{ id: cartId }`                                        | Avoid name collisions, add clarity         |
| **Array Destructuring**       | `const [mostExpensive, secondMost]`                     | Pull indexed values in one line            |
| **Rest Parameters**           | `addBundleToCart(cart, ...products)`                    | Accept unlimited args, clean call site     |
| **Spread (array clone)**      | `[...cart.items].sort(...)`                             | Sort a copy, never mutate the original     |
| **Spread (object clone)**     | `{ ...guestItem }`, `{ ...item.product }`               | Safe copy without shared references        |
| **Callbacks (`.filter()`)**   | `removeFromCart`                                        | Declarative removal by rule                |
| **Callbacks (`.find()`)**     | `updateQuantity`, `mergeCarts`                          | Find first match efficiently               |
| **Callbacks (`.reduce()`)**   | `calculateTotal`                                        | Accumulate a single value from array       |
| **Callbacks (`.sort()`)**     | `generateSummary`                                       | Custom sort order via comparator           |
| **Stored callbacks**          | `discountRules` object                                  | Each rule is a function — fully extensible |

---

## 💡 The Three Biggest Lessons

**1. Callbacks give you flexibility.**
`discountRules` stores _functions_ as values. When you call `rule(subtotal)`,
you are invoking a stored callback. This is how plugin systems, event handlers,
and middleware work in real frameworks like Express.js.

**2. Spread protects your data.**
Every time we sort or merge, we spread first. In real applications, mutating
shared data causes bugs that are almost impossible to trace. Make spreading
a habit whenever you work with arrays and objects you don't own.

**3. Destructuring is documentation.**

```js
cart.items.forEach(({ product, quantity }) => { ... })
```

Anyone reading this knows immediately that each cart item has a `product`
and a `quantity`. You haven't written a single comment — the code documents itself.

---

## 🏋️ Exercises

**Easy:** Write `clearCart(cart)` that empties all items. It should return the cart and log how many items were removed.

**Medium:** Write `getItemsByCategory(cart, category)` using `.filter()` with a callback. It should return an array of items matching the given category string.

**Hard:** Write `applyCouponStack(cart, ...codes)` using rest parameters that applies multiple discount codes and picks whichever gives the **highest** discount. Use `.map()` to calculate each discount and `.reduce()` to find the maximum.

**Challenge:** Write `exportCart(cart)` that returns a plain summary object using destructuring and spread — no original references, fully cloned. Then write `importCart(summary)` that reconstructs a working cart from it.

---

> 🎓 **The real world doesn't use these concepts in isolation.**
> Notice how Step 9 uses callbacks, destructuring, spread, and rest parameters
> all in the same function. That's how production JavaScript looks.
> Comfort with each concept individually is the beginning —
> combining them fluidly is mastery.
