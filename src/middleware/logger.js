// A simple request logger middleware that logs method, URL, status, and response time.
const logger = (req, res, next) => {
  const start = Date.now();

  // Listen for when the response finishes to log status + duration
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    );
  });

  next(); // pass control to the next middleware/route
};

module.exports = logger;