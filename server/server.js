const express = require('express')
const { connectToMongoDB } = require('./mongoDB')
const cors = require('cors')
const multer = require('multer')
const fetch = require('node-fetch')
const { fetchNormalizedData, elbowOptimize } = require('./elbow_process')
const KMeans = require('./kmeans_process')
const { normalizeData } = require('./dataset_normalization') // Import the normalizeData function

const app = express()
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Express JS
app.use(express.json())
app.use(cors())

// Api Normalisasi Dan Simpan Data
const normalizeAndSaveData = async () => {
  try {
    // Make an HTTP GET request to fetch sensor data from the API route
    const response = await fetch('http://localhost:3001/api/get-sensordata');
    if (!response.ok) {
      throw new Error('Failed to fetch sensor data from the API');
    }

    const sensorData = await response.json();

    // Calculate minMax values dynamically
    const minMax = {
      suhu: {
        min: Math.min(...sensorData.map((record) => record.suhu)),
        max: Math.max(...sensorData.map((record) => record.suhu)),
      },
      pH: {
        min: Math.min(...sensorData.map((record) => record.pH)),
        max: Math.max(...sensorData.map((record) => record.pH)),
      },
      kelembaban: {
        min: Math.min(...sensorData.map((record) => record.kelembaban)),
        max: Math.max(...sensorData.map((record) => record.kelembaban)),
      },
      kondisi: {
        min: Math.min(...sensorData.map((record) => record.kondisi)),
        max: Math.max(...sensorData.map((record) => record.kondisi)),
      },
    };

    const { normalizedData } = normalizeData(sensorData, minMax);

    // Convert normalizedData to an array of documents
    const normalizedDocuments = normalizedData.map((record) => ({
      tanggaljam: record.tanggaljam,
      suhu: record.suhu,
      pH: record.pH,
      kelembaban: record.kelembaban,
      kondisi: record.kondisi,
    }));

    // Drop the existing 'normalize' collection and recreate it
    const { database } = await connectToMongoDB();
    await database.dropCollection('normalize');
    await database.createCollection('normalize');

    // Sort normalizedDocuments by 'tanggaljam' in ascending order (oldest first)
    normalizedDocuments.sort((a, b) => a.tanggaljam - b.tanggaljam);

    const normalizeCollection = database.collection('normalize');
    await normalizeCollection.insertMany(normalizedDocuments);

    console.log('Dataset telah dinormalisasi dan disimpan dalam collection normalize');
    console.log('MinMax Values:', minMax);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Kirim Parameter Elbow Method
app.post('/api/post-elbow', async (req, res) => {
  try {
    // Get the parameters from the request body
    const { JumlahCluster, perulangan } = req.body;

    // Perform the elbow method calculation here
    const normalizedData = await fetchNormalizedData();
    const maxCluster = parseInt(JumlahCluster);
    const maxLoop = parseInt(perulangan);
    const centroid = null; // You can provide centroid data if needed

    // Call the elbowOptimize function with the normalized data
    const elbowResults = elbowOptimize(normalizedData, maxCluster, maxLoop, centroid);

    // Save the results to the MongoDB collection 'elbow_result'
    const { database } = await connectToMongoDB();
    const elbowResultCollection = database.collection('elbow_result');

    const elbowResultData = {
      JumlahCluster: maxCluster,
      Perulangan: maxLoop,
      Result: elbowResults,
      Timestamp: new Date(),
    };

    await elbowResultCollection.updateOne(
      {},
      { $set: elbowResultData },
      { upsert: true }
    );

    res.json({ message: 'Elbow method completed and results saved.' });
  } catch (error) {
    console.error('Error in Elbow Method:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


// Simpan Hasil Elbow Method
app.post('/api/save-elbow-result', async (req, res) => {
  try {
    const { JumlahCluster, Perulangan, Result, Timestamp } = req.body;

    // Save the elbow method result to MongoDB
    const { database } = await connectToMongoDB();
    const elbowResultCollection = database.collection('elbow_result');

    const elbowResultData = {
      JumlahCluster,
      Perulangan,
      Result,
      Timestamp,
    };

    await elbowResultCollection.updateOne(
      {},
      { $set: elbowResultData },
      { upsert: true }
    );

    res.json({ message: 'Elbow result saved successfully' });
  } catch (error) {
    console.error('Error saving elbow result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Mulai normalisasi berdasarkan permintaan frontend
app.post('/api/start-normalization', async (req, res) => {
  try {
    normalizeAndSaveData(); // Start normalization process
    res.json({ message: 'Normalization process started' });
  } catch (error) {
    console.error('Error starting data normalization:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


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
})

// Kirim status server
app.get('/api/server-status', (req, res) => {
  res.json({ status: 'Online' });
})

// Set Port buat server
const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  // Mulai Koneksi ke mongoDB saat server start
  await connectToMongoDB();
})

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
})


