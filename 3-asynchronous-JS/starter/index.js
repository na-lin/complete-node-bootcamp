const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const { get } = require("superagent");
const superagent = require("superagent");
// todo 1: callback hell about http request
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
//   console.log("start to get data from web API");
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.error(err);
//       //   console.log(res.body);
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.error(err);
//         console.log("Rondom dog image saved to file");
//       });
//     });
// });

// todo 2: from callback hell to promise, how to consume promise in node.js
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   if (err) return console.log(err); //* error handle
//   console.log(data);
//   console.log("start to get data from web API");
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.error(err); // error when write is failed.
//         console.log("Rondom dog image saved to file");
//       });
//     })
//     .catch((err) => {
//       //* error handle when get is failed.
//       console.log("catch error by catch() method");
//       console.log(err);
//     });
// });

// todo 3 : build promise, promisify file read and write to get rid of callback function

const readFilePromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) reject("I could not find that file...");
      resolve(data);
    });
  });
};
//// get rid of callback function and less error catch
const writeFilePromise = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) reject("I could not write the content to the file");
      resolve("success");
    });
  });
};
// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePromise("dog-img.txt", res.body.message);
//   })
//   .then(() => console.log("Rondom dog image saved to file"))
//   .catch((err) => {
//     console.log(err);
//   });

// todo 4 : consume promise by async/await

const getDog = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(data);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise("dog-img.txt", res.body.message);
    console.log("Rondom dog image saved to file");
    return "2.ready";
  } catch (err) {
    console.log(err);
  }
};

// return value from async function

// console.log("1. start");
// const x = getDog();
// console.log(x);
// console.log("2. end");

// consume promise by then
// console.log("1. start");
// getDog().then((x) => console.log(x));
// // console.log(x);
// console.log("3. end");

// don't mix it
(async function () {
  console.log("1. start");
  const x = await getDog();
  console.log(x);
  console.log("3. end");
})();
