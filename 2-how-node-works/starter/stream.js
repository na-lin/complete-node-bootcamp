const fs = require("fs");
const server = require("http").createServer();

// todo : load large file with stream
server.on("require", (req, res) => {
  // todo : solution 1 , take time and memory space
  //   fs.readFile("test-file.txt", (err, data) => {
  //     res.send(data);
  //   });

  //  todo: solution 2
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (data) => {
  //     res.write(data);
  //   });
  //   readable.on("end", () => res.end());
  //   readable.on('err',err=>{console.log(err)
  //     res.statusCode = 500;
  //     res.end('Fild not found!');
  // });

  // todo solution3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});
server.listen(8000, "127.0.0.1", () => console.log("listening....."));
