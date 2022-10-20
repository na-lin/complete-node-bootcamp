const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req);
});
server.listen(8000, "127.1.1.0", () =>
  console.log("Server is listening at port 8000")
);
