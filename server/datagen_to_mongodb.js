// Dummy Data Generator to MongoDB Collection Sensor_Data
const fs = require('fs');
const { connectToMongoDB } = require('./mongoDB');
const { DateTime } = require('luxon');

// Use a dynamic import to load the 'random' module
import('random').then(async (randomModule) => {
  const random = randomModule.default;

  // Function to generate a random datetime within a given range
  function random_datetime(start_date, end_date) {
    const randomSeconds = random.int(0, Math.floor((end_date - start_date) / 1000));

    return start_date.plus({ seconds: randomSeconds });
  }

  // Function to generate random data based on your criteria
  function generate_data() {
    const tanggaljam = random_datetime(DateTime.fromISO('2023-01-01'), DateTime.fromISO('2023-12-31'));
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

  // Generate data
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push(generate_data());
  }

  data.sort((a, b) => a.tanggaljam - b.tanggaljam);

  try {
    // Establish the MongoDB connection
    const { database } = await connectToMongoDB();

    // Access the 'sensor_data' collection
    const collection = database.collection('sensor_data');

    // Insert data into the collection
    await collection.insertMany(data);
    console.log("Data has been inserted into MongoDB.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
