/**
 * The first letter in SOLID is 'S' and stands for Single Responsibility.
 * This means that classes, and functions, in our programs must have only a single reason to change.
 * In other words, they should be doing isolated, specialized pieces of work, and as a result,
 * there should be only reason for them to change.
 */

const fs = require('fs');

// To understand this principle, let's create a Journal class to, well, journal our ideas and thoughts on a daily basis.
class Journal {
  constructor() {
    this.count = 0;
    this.entries = {};
  }

  addEntry(text) {
    let c = ++this.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }
}

let journal = new Journal();
journal.addEntry('Today was a great day!');
journal.addEntry('I made a new friend today');
console.log(journal.toString());

// So far so good. Now suppose we also want to save the journal to a file.
// Where do we put the code? If we put it directly inside the Journal class, we might create
// a method called save(filename). But this leads to some problems, because we'll want to do
// more operations on the file system: load the journal from file, examine its length, etc.
// Also, even more later on, we might want to load the journal from a URL, or maybe from a
// database. With time, unforeseen requirements may develop; for instance, saving the journal
// without the index entries but displaying it with index entries.

// Also, and here comes the punch!, the Journal may not be the only object needing these
// facilities in your system. There might also be music players, slot machines, etc.

// Imagine all the mess created if we keep down this path naively!

// The solution?

// Create specialized classes for persistence and other common operations that have no
// knowledge of the existence of the Journal or other objects that will be using them.

// Let's do it!

class PersistenceManager {
  // pre-persistence operations, if any
  preprocess(j) {
  }

  saveToFile(journal, fileName) {
    fs.writeFileSync(fileName, journal.toString());
    // Here, too, note that the saveToFile() method doesn't know what a Journal is.
    // All it knows is that the object passed in has a toString() method, which will
    // return the contents to be persisted to the disk.
  }
}

const persistenceManager = new PersistenceManager();
let fileName = './journal.txt';
persistenceManager.saveToFile(journal, fileName);