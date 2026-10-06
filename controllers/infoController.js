// CONTROLLER: info API (identitas & daftar endpoint)
const getInfo = (req, res) => {
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
};

module.exports = { getInfo };

