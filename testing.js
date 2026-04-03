let array = [1, 2, 3, 4, 5, 99, 11, 22, 33, 44, 55, 66, 77, 88, 99];

function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      console.log(max);
    }
  }
  return max;
}

console.log(findMax(array));


retu