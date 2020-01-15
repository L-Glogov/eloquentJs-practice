/*

The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

"Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays."

*/

function flatten(arr) {
  return arr.reduce((a, b) => {
    return a.concat(b);
  })
}

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
