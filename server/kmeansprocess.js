// kmeansprocess.js
// Processing K-Means menggunakan module kmeans-node

const KMeans = require('ml-kmeans')
const math = require('mathjs')
const { connectToMongoDB } = require('./mongoDB')

const calculateMeanCentroid = (data, k) => {
  const centroid = []
  for (let i = 0; i < k; i++) {
    const cluster = data.filter((point) => point.label === i)

    const clusterMean = {
      suhu: cluster.reduce((acc, point) => acc + point.suhu, 0) / cluster.length,
      pH: cluster.reduce((acc, point) => acc + point.pH, 0) / cluster.length,
      kelembaban: cluster.reduce((acc, point) => acc + point.kelembaban, 0) / cluster.length,
      kondisi: cluster.reduce((acc, point) => acc + point.kondisi, 0) / cluster.length,
    }

    centroid.push(clusterMean)
  }

  return centroid
}

const generateRandomCentroid = (data, k) => {
  const centroid = []
  for (let i = 0; i < k; i++) {
    const randomPoint = data[Math.floor(Math.random() * data.length)]
    centroid.push({
      suhu: randomPoint.suhu,
      pH: randomPoint.pH,
      kelembaban: randomPoint.kelembaban,
      kondisi: randomPoint.kondisi,
    })
  }

  return centroid
}

const calculateKMeans = async (data, k, maxLoop, centroid) => {
  const kmeans = new KMeans({
    k,
    maxIterations: maxLoop,
    tolerance: 1e-4,
    runs: 1,
    initialCentroids: centroid,
  })

  const result = kmeans.fit(data)

  // Replace existing data or insert new data in 'kmeans_result' collection
  const { database } = await connectToMongoDB();
  const kMeansResultCollection = database.collection('kmeans_result')

  const kMeansResultData = {
    JumlahCluster: k,
    Perulangan: maxLoop,
    Result: result, // Store the actual K-Means results
    Timestamp: new Date(),
  }

  await kMeansResultCollection.replaceOne({}, kMeansResultData, { upsert: true })

  return result; // Return the K-Means results
}

module.exports = { calculateKMeans, calculateMeanCentroid, generateRandomCentroid }
