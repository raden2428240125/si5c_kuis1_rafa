// CONTROLLER: menangani request, validasi, dan response
const Flight = require("../models/flightModel");

const notFound = (res, id) =>
  res.status(404).json({
    status: "error",
    message: `Data dengan id ${id} tidak ditemukan`,
    data: null,
  });

// Mengembalikan pesan error (string) atau null jika valid
function validasi(body) {
  const { kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat } = body || {};
  if (!kodePenerbangan || !maskapai || !asal || !tujuan || !jadwalBerangkat) {
    return "kodePenerbangan, maskapai, asal, tujuan, dan jadwalBerangkat wajib diisi";
  }
  return null;
}

const getAllFlights = (req, res) => {
  const { asal } = req.query;
  if (asal) return res.json(Flight.getByAsal(asal));
  res.json(Flight.getAll());
};

const getFlightById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = Flight.getById(id);
  if (!data) return notFound(res, id);
  res.json(data);
};

const createFlight = (req, res) => {
  const pesan = validasi(req.body);
  if (pesan) return res.status(400).json({ status: "error", message: pesan, data: null });

  const baru = Flight.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Data jadwal penerbangan berhasil ditambahkan",
    data: baru,
  });
};

const updateFlight = (req, res) => {
  const id = parseInt(req.params.id);
  if (!Flight.getById(id)) return notFound(res, id);

  const pesan = validasi(req.body);
  if (pesan) return res.status(400).json({ status: "error", message: pesan, data: null });

  const diperbarui = Flight.update(id, req.body);
  res.status(200).json({
    status: "success",
    message: `Data jadwal penerbangan dengan id ${id} berhasil diperbarui`,
    data: diperbarui,
  });
};

const deleteFlight = (req, res) => {
  const id = parseInt(req.params.id);
  if (!Flight.remove(id)) return notFound(res, id);

  res.status(200).json({
    status: "success",
    message: `Data jadwal penerbangan dengan id ${id} berhasil dihapus`,
    data: null,
  });
};

module.exports = { getAllFlights, getFlightById, createFlight, updateFlight, deleteFlight };
