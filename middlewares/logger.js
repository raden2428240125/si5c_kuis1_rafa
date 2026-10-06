// MIDDLEWARE: mencatat setiap request (method, url, status, durasi)
const logger = (req, res, next) => {
  const mulai = Date.now();
  res.on("finish", () => {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - mulai} ms)`);
  });
  next();
};

module.exports = logger;
