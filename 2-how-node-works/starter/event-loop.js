const fs = require("fs");
const crypto = require("crypto");
// todo 1: event loop
// setTimeout(() => console.log("Timer 1 finished"), 0);

// setImmediate(() => console.log("Immediate 1 finished"));

// fs.readFile("text-file.txt", () => {
//   console.log("I/O finished");
//   console.log("---outside event loop----------");

//   setTimeout(() => console.log("Timer 2 finished"), 0);
//   setTimeout(() => console.log("Timer 3 finished"), 3000);

//   setImmediate(() => console.log("Immediate 2 finished")); // wait at polling phase
// //   get execute immediate once per tick

//   process.nextTick(() => console.log("process.nextTick"));
//   //   in this case, run immediately after the I/O polling callback is called
// });

// console.log("Hello from top-level code");

//  todo 2: thread pool
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;
setTimeout(() => console.log("Timer 1 finished"), 0);

setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("text-file.txt", () => {
  console.log("I/O finished");
  //   console.log("---outside event loop----------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);

  setImmediate(() => console.log("Immediate 2 finished")); // wait at polling phase
  //   get execute immediate once per tick

  process.nextTick(() => console.log("process.nextTick"));
  //   in this case, run immediately after the I/O polling callback is called

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
});

console.log("Hello from top-level code");
