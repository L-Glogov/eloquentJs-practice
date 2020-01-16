/*

The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

"Make the Group class from the previous exercise iterable.
Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array.
That would work, but it defeats the purpose of this exercise.

It is okay if your iterator behaves strangely when the group is modified during iteration."

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
  [Symbol.iterator]() {
    return  new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.position = 0;
    this.group = group;
  }
  next() {
    if (this.position >= this.group.content.length) {
      return {done: true}
    } else {
      let result = {value: this.group.content[this.position], done: false};
      this.position++;
      return result;
    }
  }
}

// TESTS:

for (let value of Group.from(["a", "b", "c", "d", 1, 76, 42])) {
  console.log(value);
}
