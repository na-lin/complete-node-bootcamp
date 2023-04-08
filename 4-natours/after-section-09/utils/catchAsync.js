module.exports = fn => {
  // return function, then express can call it when
  // user hit request, router
  return (req, res, next) => {
    fn(req, res, next).catch(next);
    // async fn return promise
    // promise is rejected when there is error
    // catch error
    // err => next(err), auto pass err into next when call it
  };
};
