const fs = require("fs");
const superagent = require("superagent");
// todo 1: callback hell about http request

fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
  if (err) return console.log(err);
  console.log(data);
  console.log("start to get data from web API");
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.error(err);
      //   console.log(res.body);
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.error(err);
        console.log("Rondom dog image saved to file");
      });
    });
});
