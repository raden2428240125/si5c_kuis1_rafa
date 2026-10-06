// impor modul & muat environment variable dari .env
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const infoRoutes = require("./routes/infoRoutes");
const flightRoutes = require("./routes/flightRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json());
app.use(logger);

// Route
app.use("/", infoRoutes);
app.use("/flights", flightRoutes);

// Penanganan error (harus paling akhir)
app.use(notFoundHandler);
app.use(errorHandler);

// Jalankan server hanya saat bukan production (Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
//abc