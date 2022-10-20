//import own module
// todo : how require module work behind the scenes
// console.log(arguments);
// console.log(require("module".wrapper));
// todo: export only one
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(1, 2));
//  todo : export multiple
const Cal = require("./test-module-2");
console.log(Cal.add(4, 5));

// todo : caching
const cal3 = require("./test-module-3");
console.log(cal3.add(1, 2));
console.log(cal3.add(1, 2));
console.log(cal3.add(1, 2));
