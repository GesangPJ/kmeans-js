// JS Dummy data Generator
// Generate data ke MongoDB

const fs = require('fs');
const { connectToMongoDB } = require('./mongoDB');
const { DateTime } = require('luxon');

// Gunakan dynamic import untuk module random
import('random').then(async (randomModule) => {
  const random = randomModule.default;

  // Fungsi generate tanggaljam
  function random_datetime(start_date, end_date) {
    const randomSeconds = random.int(0, Math.floor((end_date - start_date) / 1000));

    return start_date.plus({ seconds: randomSeconds })
  }

  // Function to generate random data based on your criteria
  function generate_data() {
    const tanggaljam = random_datetime(DateTime.fromISO('2023-01-01'), DateTime.fromISO('2023-12-31'))
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

  // Mulai Generate data
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push(generate_data())
  }

  data.sort((a, b) => a.tanggaljam - b.tanggaljam)

  try {
    // Koneksi ke MongoDB
    const { database } = await connectToMongoDB()

    // Akses koleksi 'sensor_data'
    const collection = database.collection('sensor_data');

    // Ganti data yang ada dengan data yang digenerate
    await collection.deleteMany({})
    await collection.insertMany(data)

    console.log("Data Berhasil dimasukkan ke MongoDB")
  } catch (error) {
    console.error("An error occurred:", error)
  }
});
