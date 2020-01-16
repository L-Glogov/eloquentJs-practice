/*

The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

"The standard JavaScript environment provides another data structure called Set. Like an instance of Map, a set holds a collection of values.
Unlike Map, it does not associate other values with those—it just tracks which values are part of the set.
A value can be part of a set only once—adding it again doesn’t have any effect.

Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods.
Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group.

Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.

Give the class a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it."

*/


class Group {
  constructor() {
    this.content = [];
  }
  add(item) {
    if (this.content.indexOf(item) === -1) this.content.push(item);
  }
  delete(item) {
    if (this.content.indexOf(item) >= 0) this.content.splice(this.content.indexOf(item), 1);
  }
  has(item) {
    return this.content.includes(item);
  }
  static from(collection) {
    let group = new Group;
    for (let element of collection) {
      group.add(element);
    }
    return group;
  }
}

// TESTS:

let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));
console.log(group.content);
