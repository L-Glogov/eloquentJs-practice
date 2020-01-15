/*

The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

"Objects, as generic blobs of values, can be used to build all sorts of data structures. A common data structure is the list (not to be confused with array).
A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

 let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

A nice thing about lists is that they can share parts of their structure.
For example, if I create two new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the binding defined earlier), they are both independent lists, but they share the structure that makes up their last three elements.
The original list is also still a valid three-element list.

Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument.
Also write a listToArray function that produces an array from a list.
Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth. "

*/

function arrayToList(arr) {
    let list = {};
    list.value = arr[0];
    arr.shift();
    list.rest = (arr.length > 0 ? arrayToList(arr) : null);
    return list;
}

function listToArray(list) {
  let arr = [];
  function pushRest(list) {
    arr.push(list.value);
    if (list.rest != null) {
      pushRest(list.rest)
    }
  }
  pushRest(list);
  return arr;
}

// Below you can find Mr. Haverbeke's clever alternative listToArray function:
// function listToArray(list) {
//   let array = [];
//   for (let node = list; node; node = node.rest) {
//     array.push(node.value);
//   }
//   return array;
// }

function prepend(value, list) {
  return {value, rest: list};
}

function nth(list, num) {
  return num > 0 ? (list.rest != null ? nth(list.rest, num - 1) : undefined) : list.value;
}


console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log(nth(arrayToList([10, 20, 30, 55]), 6));
