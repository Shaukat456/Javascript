const a = [1, 2, 3, "s"];

// if any element is not a number dont add it

var d = a.reduce((sum, f) => {
  if (typeof f === "number") {
    return sum + f;
  }
  return sum;
}, 0);

console.log(d);
// const basicPromise = new Promise((resolve, reject) => {
//   console.log("⏳ Promise executor runs immediately");

//   // Simulate async operation
//   setTimeout(() => {
//     const success = Math.random() > 0.3; // 70% success rate

//     if (success) {
//       resolve("✅ Operation successful!");
//     } else {
//       reject("❌ Operation failed!");
//     }
//   }, 1);
// });
