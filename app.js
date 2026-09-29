// impor express
const express = require("express");
// instansiasi aplikasi express
const app = express();
// PORT: dari environment variable (Vercel) atau 3000 (lokal)
const PORT = process.env.PORT || 3000;

// Middleware agar req.body (JSON) dapat dibaca
app.use(express.json());

// Data sementara (disimpan di memori, hilang saat server restart)
// Topik 14 - Maskapai: Jadwal Penerbangan
let flights = [
  {
    id: 1,
    kodePenerbangan: "XY-512",
    maskapai: "Nusantara Air",
    asal: "CGK",
    tujuan: "DPS",
    jadwalBerangkat: "2026-10-20T07:30:00+07:00",
  },
  {
    id: 2,
    kodePenerbangan: "QG-880",
    maskapai: "Citra Wings",
    asal: "PLM",
    tujuan: "CGK",
    jadwalBerangkat: "2026-10-21T09:15:00+07:00",
  },
  {
    id: 3,
    kodePenerbangan: "XY-330",
    maskapai: "Nusantara Air",
    asal: "CGK",
    tujuan: "SUB",
    jadwalBerangkat: "2026-10-22T13:00:00+07:00",
  },
];
let nextId = 4; // penghitung id untuk data baru

// Validasi field wajib (kodePenerbangan*, maskapai*, asal*, tujuan*, jadwalBerangkat*)
// Mengembalikan pesan error (string) atau null jika valid
function validasi(body) {
  const { kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat } = body || {};

  if (!kodePenerbangan || !maskapai || !asal || !tujuan || !jadwalBerangkat) {
    return "kodePenerbangan, maskapai, asal, tujuan, dan jadwalBerangkat wajib diisi";
  }
  return null;
}

// GET / -> info API (identitas & daftar endpoint)
app.get("/", (req, res) => {
  res.json({
    nama: "R. A. Rafa Lutfyah",
    npm: "2428240125",
    kelas: "SI5C",
    topik: "14 - Maskapai: Jadwal Penerbangan",
    endpoints: [
      "GET /flights",
      "GET /flights/:id",
      "GET /flights?asal=nilai",
      "POST /flights",
      "PUT /flights/:id",
      "DELETE /flights/:id",
    ],
  });
});

// GET /flights -> semua data, atau hasil filter ?asal=...
app.get("/flights", (req, res) => {
  const { asal } = req.query;

  if (asal) {
    const hasil = flights.filter((f) => f.asal === asal);
    return res.json(hasil); // array langsung, boleh kosong []
  }

  res.json(flights); // array langsung, tanpa status/message
});

// GET /flights/:id -> satu data berdasarkan id
app.get("/flights/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = flights.find((f) => f.id === id);

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.json(data); // objek langsung, tanpa status/message
});

// POST /flights
// Body: { "kodePenerbangan": "XY-512", "maskapai": "Nusantara Air", "asal": "CGK", "tujuan": "DPS", "jadwalBerangkat": "2026-10-20T07:30:00+07:00" }
app.post("/flights", (req, res) => {
  const pesan = validasi(req.body);

  // validasi: field wajib kosong -> 400
  if (pesan) {
    return res.status(400).json({ status: "error", message: pesan, data: null });
  }

  const { kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat } = req.body;
  const baru = { id: nextId++, kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat };

  flights.push(baru);

  // berhasil -> 201 + data yang baru dibuat
  res.status(201).json({
    status: "success",
    message: "Data jadwal penerbangan berhasil ditambahkan",
    data: baru,
  });
});

// PUT /flights/2
// Body: seluruh field wajib (penggantian penuh)
app.put("/flights/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = flights.findIndex((f) => f.id === id);

  // data tidak ada -> 404
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const pesan = validasi(req.body);

  // field wajib kosong -> 400
  if (pesan) {
    return res.status(400).json({ status: "error", message: pesan, data: null });
  }

  const { kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat } = req.body;
  const diperbarui = { id, kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat };

  flights[index] = diperbarui;

  res.status(200).json({
    status: "success",
    message: `Data jadwal penerbangan dengan id ${id} berhasil diperbarui`,
    data: diperbarui,
  });
});

// DELETE /flights/2
app.delete("/flights/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = flights.findIndex((f) => f.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  flights.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: `Data jadwal penerbangan dengan id ${id} berhasil dihapus`,
    data: null,
  });
});

// Middleware catch-all -> route yang tidak terdaftar (harus paling akhir)
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null,
  });
});

// Menjalankan server hanya saat bukan production (Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// Ekspor app agar bisa berjalan sebagai serverless function di Vercel
module.exports = app;