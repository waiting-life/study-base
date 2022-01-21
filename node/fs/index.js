const fs = require("fs");
const path = require("path");

const notes = "/users/joe/notes.txt";
console.log(path.dirname(notes));
console.log(path.basename(notes));
console.log(path.extname(notes));
console.log(path.basename(notes, path.extname(notes)));

console.log(path.resolve("index.js"));

console.log(path.resolve("test", "index.js"));

console.log(path.normalize("/users/wangqiaojuan/projects/..//test.txt"));

const filePath = process.cwd();
console.log(path.parse(filePath));

console.log(path.relative(filePath, path.join(filePath, "index.js")));
