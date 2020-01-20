/*

The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

"Imagine you have written a story and used single quotation marks throughout to mark pieces of dialogue.
Now you want to replace all the dialogue quotes with double quotes, while keeping the single quotes used in contractions like aren’t.

Think of a pattern that distinguishes these two kinds of quote usage and craft a call to the replace method that does the proper replacement."

*/

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(?<!\w)'(?=\w)|(?<=[.,])'(?!\w)/g, '"'));
// → "I'm the cook," he said, "it's my job."

// Below you canb find Mr. Haverbeke's alternativre answer:

console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
