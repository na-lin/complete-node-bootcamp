const fs = require("fs");

// TODO 1: File module
// todo : read and write file synchronous way

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOutput =
  "this content is written by javascript code: hello world! 😄";
fs.writeFileSync("./txt/output.txt", textOutput);

// todo: read and write file asynchronous way

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  //   console.error(err);
  //   console.log(err, data);
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.writeFile("./txt/final.txt", `${data1}\n${data2}`, "utf-8", (err) => {
      if (err) console.log("fail to write");
      console.log("writed");
    });
  });
});
console.log("start to reading content from file");
