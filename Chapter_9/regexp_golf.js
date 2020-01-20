/*
The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

Code golf is a term used for the game of trying to express a particular program in as few characters as possible.
Similarly, regexp golf is the practice of writing as tiny a regular expression as possible to match a given pattern, and only that pattern.

For each of the following items, write a regular expression to test whether any of the given substrings occur in a string.
The regular expression should match only strings containing one of the substrings described. Do not worry about word boundaries unless explicitly mentioned.
When your expression works, see whether you can make it any smaller.

    car and cat

    pop and prop

    ferret, ferry, and ferrari

    Any word ending in ious

    A whitespace character followed by a period, comma, colon, or semicolon

    A word longer than six letters

    A word without the letter e (or E)

Refer to the table in the chapter summary for help. Test each solution with a few test strings."

*/
let regexp1 = /ca[tr]/;

let regexp2 = /pr?op/;

let regexp3 = /ferr(et|y|ari)/;

let regexp4 = /ious\b/;

let regexp5 = /\s[.,;:]/;

let regexp6 = /\w{7,}/;

let regexp7 = /\b([a-d]|[f-z])+\b/i;


//TESTS from the book EloquentJs:

verify(regexp1,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(regexp2,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(regexp3,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(regexp4,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(regexp5,
       ["bad punctuation ."],
       ["escape the period"]);

verify(regexp6,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(regexp7,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}
