// ROUTE: memetakan alamat ke fungsi Controller memakai express.Router()
const express = require("express");
const router = express.Router();
const controller = require("../controllers/flightController");
const cekApiKey = require("../middlewares/cekApiKey");

// Rute baca: terbuka
router.get("/", controller.getAllFlights);
router.get("/:id", controller.getFlightById);

// Rute ubah data: dilindungi API key
router.post("/", cekApiKey, controller.createFlight);
router.put("/:id", cekApiKey, controller.updateFlight);
router.delete("/:id", cekApiKey, controller.deleteFlight);

module.exports = router;
