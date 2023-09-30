const express = require('express')
const { connectToMongoDB } = require('./mongoDB')
const cors = require('cors')
const fetch = require('node-fetch')
const multer = require('multer')

const { calculateKMeans } = require('./kmeansprocess')
const { normalizeData } = require('./dataset_normalization')

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
    const response = await fetch('http://localhost:3001/api/get-sensordata')
    if (!response.ok) {
      throw new Error('Failed to fetch sensor data from the API')
    }

    const sensorData = await response.json()

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
    }))

    // Drop the existing 'normalize' collection and recreate it
    const { database } = await connectToMongoDB();
    await database.dropCollection('normalize');
    await database.createCollection('normalize');

    // Sort normalizedDocuments by 'tanggaljam' in ascending order (oldest first)
    normalizedDocuments.sort((a, b) => a.tanggaljam - b.tanggaljam)

    const normalizeCollection = database.collection('normalize')
    await normalizeCollection.insertMany(normalizedDocuments)

    console.log('Dataset telah dinormalisasi dan disimpan dalam collection normalize')
    console.log('MinMax Values:', minMax)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

// Kirim Parameter K-Means
app.post('/api/post-parameter', async (req, res) => {
  try {
    // Get the parameters from the request body
    const { JumlahCluster, perulangan, centroidType } = req.body

    // Fetch normalized data from /api/get-normalize
    const normalizedData = await fetchNormalizedData()
    const maxCluster = parseInt(JumlahCluster)
    const maxLoop = parseInt(perulangan)

    // Define a variable to hold the centroid data
    let centroid = null;

    // Check the selected centroid type and set the centroid data accordingly
    if (centroidType === 'mean') {
      // Calculate centroid based on mean values here (modify as needed)
      centroid = calculateMeanCentroid(normalizedData, maxCluster)
    } else if (centroidType === 'random') {
      // Generate random centroid values here (modify as needed)
      centroid = generateRandomCentroid(normalizedData, maxCluster)
    } else {
      throw new Error('Invalid centroid type selected')
    }

    // Call the K-Means calculation method with the normalized data and centroid
    const kMeansResults = calculateKMeans(normalizedData, maxCluster, maxLoop, centroid)

    // Save the K-Means results to a MongoDB collection
    const { database } = await connectToMongoDB()
    const kMeansResultCollection = database.collection('kmeans_result')

    const kMeansResultData = {
      JumlahCluster: maxCluster,
      Perulangan: maxLoop,
      Result: kMeansResults,
      Timestamp: new Date(),
    }

    await kMeansResultCollection.updateOne(
      {},
      { $set: kMeansResultData },
      { upsert: true }
    )

    res.json({ message: 'K-Means with elbow optimization completed and results saved.' })
  } catch (error) {
    console.error('Error in K-Means with Elbow Optimization:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Mulai normalisasi berdasarkan permintaan frontend
app.post('/api/start-normalization', async (req, res) => {
  try {
    normalizeAndSaveData(); // Start normalization process
    res.json({ message: 'Normalization process started' })
  } catch (error) {
    console.error('Error starting data normalization:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


// Cek Status koneksi mongoDB
app.get('/api/mongoDB-status', async (req, res) => {
  try {
    // Cek koneksi ke mongoDB pake mongoDB Driver
    await connectToMongoDB() // Call the correct function to check mongoDB status

    // Respon status pake JSON
    res.json({ isConnected: true })
  } catch (error) {
    console.error('Error checking mongoDB status:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Kirim status server
app.get('/api/server-status', (req, res) => {
  res.json({ status: 'Online' });
})

// Set Port buat server
const port = process.env.PORT || 3001
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`)

  // Mulai Koneksi ke mongoDB saat server start
  await connectToMongoDB()
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


