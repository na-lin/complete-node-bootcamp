const fs = require("fs");

// todo 1: read context of file
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// todo 2: write context to a file
const textOutput =
  "this content is written by javascript code: hello world! 😄";
fs.writeFileSync("./txt/output.txt", textOutput);
