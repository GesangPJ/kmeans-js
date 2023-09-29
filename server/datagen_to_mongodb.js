// Dummy Data Generator to MongoDB Collection Sensor_Data
// Data generator untuk membuat data dan memasukkan kedalam MongoDB
const fs = require('fs');
const { connectToMongoDB } = require('./mongoDB');
const { DateTime } = require('luxon');

// Menggunakan dynamic import untuk 'random' module
import('random').then(async (randomModule) => {
  const random = randomModule.default;

  // Fungsi generate tanggaljam
  function random_datetime(start_date, end_date) {
    const randomSeconds = random.int(0, Math.floor((end_date - start_date) / 1000));

    return start_date.plus({ seconds: randomSeconds });
  }

  // Fungsi generate data keseluruhan
  function generate_data() {
    // Menggunakan waktu UTC untuk generate tanggaljam
    const currentDatetimeUTC = DateTime.utc();

    // Menggunakan UTC+7 (Jakarta)
    const tanggaljam = currentDatetimeUTC.plus({ hours: 7 });

    // Generate data lainnya
    const suhu = random.int(15, 35);
    const pH = random.int(0, 14);
    const kelembaban = random.int(30, 80);
    const kondisi = random.int(1, 3);

    return {
      tanggaljam: tanggaljam.toJSDate(),
      suhu,
      pH,
      kelembaban,
      kondisi,
    };
  }

  // Mulai generate data
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push(generate_data());
  }

  data.sort((a, b) => a.tanggaljam - b.tanggaljam);

  try {
    // Koneksi ke MongoDB
    const { database } = await connectToMongoDB();

    // Set akses ke collection 'sensor_data'
    const collection = database.collection('sensor_data');

    // Hapus data yang sudah ada dalam collection dan ganti dengan yang baru
    await collection.deleteMany({});
    await collection.insertMany(data);

    console.log("Berhasil generate data ke MongoDB");
  } catch (error) {
    console.error("Error :", error);
  }
});
