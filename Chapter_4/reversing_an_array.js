/*

The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

"Arrays have a reverse method that changes the array by inverting the order in which its elements appear.
For this exercise, write two functions, reverseArray and reverseArrayInPlace.
The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order.
The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements.
Neither may use the standard reverse method."

*/

function reverseArray(arr) {
  let newArr = [];
  for (let element of arr) {
    newArr.unshift(element);
  }
  return newArr;
}

function reverseArrayInPlace(arr) {
  let newArr = [];
  for (let element of arr) {
    newArr.unshift(element);
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = newArr[i];
  }
  return arr;
}

//Below we, once again, have Mr. Haverbeke's alternative clever way to solve this problem.

function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
    console.log(array);
  }
  return array;
}

console.log(reverseArray(["A", "B", "C"]));
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
