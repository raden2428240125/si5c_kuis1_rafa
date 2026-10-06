// MIDDLEWARE: penanganan error terpusat

// 404 untuk rute yang tidak terdaftar
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null,
  });
};

// Error handler (4 parameter): JSON rusak -> 400, lainnya -> 500
const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
    return res.status(400).json({
      status: "error",
      message: "Format JSON tidak valid",
      data: null,
    });
  }

  console.error(err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Terjadi kesalahan pada server",
    data: null,
  });
};

module.exports = { notFoundHandler, errorHandler };
