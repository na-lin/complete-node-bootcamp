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
const apiData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(apiData);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const replacePlaceHolder = function (temp, el) {
  let output = temp.replace(/{%ID%}/g, el.id);
  output = output.replace(/{%PRODUCTNAME%}/g, el.productName);
  output = output.replace(/{%IMAGE%}/g, el.image);
  output = output.replace(/{%FROM%}/g, el.from);
  output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
  output = output.replace(/{%QUANTITY%}/g, el.quantity);
  output = output.replace(/{%PRICE%}/g, el.price);
  output = output.replace(/{%DESCRIPTION%}/g, el.description);

  if (!el.organic) output = output.replace(/{%NON-ORGANIC%}/g, "not-organic");
  return output;
};

const server = http.createServer((req, res) => {
  const pathName = req.url;
  //   overview by adding template to dynamic load json data
  if (pathName === "/" || pathName === "/overview") {
    const cards = productData
      .map((el) => replacePlaceHolder(tempCard, el))
      .join("");
    const overviewHTML = tempOverview.replace(/{%PRODUCT-CARDS%}/, cards);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(overviewHTML);

    // product
  } else if (pathName === "/product") {
    res.end("This is product page from server");

    // api
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-text": "application/json",
    });
    res.end(apiData);

    // Page not found
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
