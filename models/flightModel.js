// MODEL: menyimpan data & fungsi pengolahnya (tanpa req/res)

// Topik 14 - Maskapai: Jadwal Penerbangan (data dari Tugas 1)
let flights = [
  { id: 1, kodePenerbangan: "XY-512", maskapai: "Nusantara Air", asal: "CGK", tujuan: "DPS", jadwalBerangkat: "2026-10-20T07:30:00+07:00" },
  { id: 2, kodePenerbangan: "QG-880", maskapai: "Citra Wings", asal: "PLM", tujuan: "CGK", jadwalBerangkat: "2026-10-21T09:15:00+07:00" },
  { id: 3, kodePenerbangan: "XY-330", maskapai: "Nusantara Air", asal: "CGK", tujuan: "SUB", jadwalBerangkat: "2026-10-22T13:00:00+07:00" },
];
let nextId = 4;

const getAll = () => flights;

const getByAsal = (asal) => flights.filter((f) => f.asal === asal);

const getById = (id) => flights.find((f) => f.id === id);

const create = ({ kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat }) => {
  const baru = { id: nextId++, kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat };
  flights.push(baru);
  return baru;
};

// penggantian penuh; mengembalikan data baru atau null jika id tidak ada
const update = (id, { kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat }) => {
  const index = flights.findIndex((f) => f.id === id);
  if (index === -1) return null;
  flights[index] = { id, kodePenerbangan, maskapai, asal, tujuan, jadwalBerangkat };
  return flights[index];
};

// mengembalikan true jika berhasil dihapus
const remove = (id) => {
  const index = flights.findIndex((f) => f.id === id);
  if (index === -1) return false;
  flights.splice(index, 1);
  return true;
};

module.exports = { getAll, getByAsal, getById, create, update, remove };
