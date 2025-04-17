export default function (req, res, next) {
    const originalEnd = res.end;
  
    res.end = function (...args) {
      // If 404, override to 410
      if (res.statusCode === 404) {
        res.statusCode = 410;
      }
      originalEnd.apply(res, args);
    }
  
    next();
  }