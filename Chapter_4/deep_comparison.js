/*

The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

"The == operator compares objects by identity. But sometimes you’d prefer to compare the values of their actual properties.
Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties,
where the values of the properties are equal when compared with a recursive call to deepEqual.

To find out whether values should be compared directly (use the === operator for that) or have their properties compared, you can use the typeof operator.
If it produces "object" for both values, you should do a deep comparison.
But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".

The Object.keys function will be useful when you need to go over the properties of objects to compare them."

*/

function deepEqual(val1, val2) {
  if (typeof val1 === "object" && typeof val2 === "object" && val1 !== null && val2 !== null) {
    let arr1 = Object.keys(val1);
    let arr2 = Object.keys(val2);
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      return deepEqual(val1[arr1[i]], val2[arr1[i]]);
    }
  } else {
    return val1 === val2;
  }
}


let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {object: 2, here: {is: "an"}}));
console.log(deepEqual(null, null));
console.log(deepEqual(null, obj));
console.log(deepEqual("A", "A"));
console.log(deepEqual(3, "A"));
