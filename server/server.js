const express = require('express');
const { connectToMongoDB } = require('./mongoDB'); // Import the correct mongoDB connection function
const cors = require('cors');
const multer = require('multer');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Express JS
app.use(express.json());
app.use(cors());

// Cek Status koneksi mongoDB
app.get('/api/mongoDB-status', async (req, res) => {
  try {
    // Cek koneksi ke mongoDB pake mongoDB Driver
    await connectToMongoDB() // Call the correct function to check mongoDB status

    // Respon status pake JSON
    res.json({ isConnected: true });
  } catch (error) {
    console.error('Error checking mongoDB status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Kirim status server
app.get('/api/server-status', (req, res) => {
  res.json({ status: 'Online' });
});

// Set Port buat server
const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  // Mulai Koneksi ke mongoDB saat server start
  await connectToMongoDB();
});

// Ambil Data Dari Koleksi sensor_data
app.get('/api/get-sensordata', async (req, res) => {
  try {
    const { database } = await connectToMongoDB()
    const SensorDataCollection = database.collection('sensor_data')
    const data = await SensorDataCollection.find({}).toArray()
    res.json(data)
  }
  catch (error) {
    console.error('Error Mengambil Data dari Sensor Data : ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Ambil Data Dari Koleksi Dataset
app.get('/api/get-dataset', async (req, res) => {
  try {
    const { database } = await connectToMongoDB()
    const SensorDataCollection = database.collection('dataset')
    const data = await SensorDataCollection.find({}).toArray()
    res.json(data)
  }
  catch (error) {
    console.error('Error Mengambil Data dari Dataset : ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Ambil Data Dari Koleksi Normalize
app.get('/api/get-normalize-data', async (req, res) => {
  try {
    const { database } = await connectToMongoDB()
    const SensorDataCollection = database.collection('normalize')
    const data = await SensorDataCollection.find({}).toArray()
    res.json(data)
  }
  catch (error) {
    console.error('Error Mengambil Data dari Dataset Normalisasi : ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Ambil Data Dari Koleksi K-Means Result (Hasil K-Means)
app.get('/api/get-kmeans-result', async (req, res) => {
  try {
    const { database } = await connectToMongoDB()
    const SensorDataCollection = database.collection('kmeans_result')
    const data = await SensorDataCollection.find({}).toArray()
    res.json(data)
  }
  catch (error) {
    console.error('Error Mengambil Data dari K-Means Result : ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Ambil Data Dari Koleksi Elbow Method
app.get('/api/get-elbowmethod', async (req, res) => {
  try {
    const { database } = await connectToMongoDB()
    const SensorDataCollection = database.collection('elbow_method')
    const data = await SensorDataCollection.find({}).toArray()
    res.json(data)
  }
  catch (error) {
    console.error('Error Mengambil Data dari Elbow Method : ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Parsing CSV file agar lebih mudah upload jadi JSON ke mongoDB
function parseCSV(csvString) {
  const rows = csvString.split('\n');
  const headers = rows[0].split(',');
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(',');
    const rowData = {};

    for (let j = 0; j < headers.length; j++) {
      if (headers[j] === 'tanggaljam') {
        // Convert "tanggaljam" to a Date object
        rowData['_id'] = new Date(row[j]);
      } else if (['suhu', 'ph', 'kelembaban', 'kondisi'].includes(headers[j])) {
        rowData[headers[j]] = parseInt(row[j]);
      } else {
        rowData[headers[j]] = row[j];
      }
    }

    data.push(rowData);
  }

  return data;
}

// Fungsi Upload CSV ke mongoDB "uploaded" collection
app.post('/api/upload-csv', upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const csvData = req.file.buffer.toString();

    // Use the connectTomongoDB() function to establish a connection
    const { db, collection } = await connectToMongoDB();

    // Clear the existing data and insert new data
    await collection.deleteMany({});
    await collection.insertMany(parseCSV(csvData));

    res.json({ message: 'CSV file uploaded and data replaced successfully' });
  } catch (error) {
    console.error('Error uploading CSV:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


