/*

The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

"Write a function that computes the dominant writing direction in a string of text.
Remember that each script object has a direction property that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).
The dominant direction is the direction of a majority of the characters that have a script associated with them.
The characterScript and countBy functions defined earlier in the chapter are probably useful here."

*****WARNING***** this code won't work without the scripts.js file from https://eloquentjavascript.net/code/#5.
To better understand the following code and this excersise it is essential to read chapter 5 of Mr. Haverbeke's book.

*/

function dominantDirection(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({direction}) => direction != "none");

  if (scripts.length == 0) return "script not found";

  return scripts.reduce((a, b) => (a.count > b.count ? a : b)).name;
}


//Below are two functions defined in chapter 5 of eloquentJs, which are called upon in my dominantDirection function which is in itself based on Mr. Haverbeke's textScripts function:

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}
