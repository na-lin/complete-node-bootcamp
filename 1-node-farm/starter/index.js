const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
// TODO 1: File module
// // todo : read and write file synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOutput =
//   "this content is written by javascript code: hello world! 😄";
// fs.writeFileSync("./txt/output.txt", textOutput);

// // todo: read and write file asynchronous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   //   console.error(err);
//   //   console.log(err, data);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.writeFile("./txt/final.txt", `${data1}\n${data2}`, "utf-8", (err) => {
//       if (err) console.log("fail to write");
//       console.log("writed");
//     });
//   });
// });
// console.log("start to reading content from file");

//TODO 2: create a simple web server
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is overview from server");
  } else if (pathName === "/product") {
    res.end("This is product page from server");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const product = JSON.parse(data);
      res.writeHead(200, {
        "Content-text": "application/json",
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not Founded!</h1>");
  }
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
