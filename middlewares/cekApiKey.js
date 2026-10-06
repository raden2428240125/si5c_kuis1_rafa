// MIDDLEWARE: melindungi rute POST, PUT, DELETE dengan API key (header x-api-key)
const cekApiKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      status: "error",
      message: "API key tidak valid atau tidak ditemukan",
      data: null,
    });
  }
  next();
};

module.exports = cekApiKey;
