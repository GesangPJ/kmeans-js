// kmeansprocess.js
// Processing K-Means using the 'ml-kmeans' package

const KMeans = require('ml-kmeans'); // Use the correct import statement
const math = require('mathjs');
const { connectToMongoDB } = require('./mongoDB');

const calculateMeanCentroid = (data, k) => {
  const centroid = [];
  for (let i = 0; i < k; i++) {
    const cluster = data.filter((point) => point.label === i);

    const clusterMean = {
      suhu: cluster.reduce((acc, point) => acc + point.suhu, 0) / cluster.length,
      pH: cluster.reduce((acc, point) => acc + point.pH, 0) / cluster.length,
      kelembaban: cluster.reduce((acc, point) => acc + point.kelembaban, 0) / cluster.length,
      kondisi: cluster.reduce((acc, point) => acc + point.kondisi, 0) / cluster.length,
    };

    centroid.push(clusterMean);
  }

  return centroid;
};

const generateRandomCentroid = (data, k) => {
  const centroid = [];
  for (let i = 0; i < k; i++) {
    const randomPoint = data[Math.floor(Math.random() * data.length)];
    centroid.push({
      suhu: randomPoint.suhu,
      pH: randomPoint.pH,
      kelembaban: randomPoint.kelembaban,
      kondisi: randomPoint.kondisi,
    });
  }

  return centroid;
};

const calculateKMeans = async (data, k, maxLoop, centroid) => {
  const result = KMeans(data, k, { maxIterations: maxLoop, tolerance: 1e-4, runs: 1, initialCentroids: centroid }); // Corrected usage

  // Connect to the MongoDB database
  const { database } = await connectToMongoDB();

  // Get a reference to the 'kmeans_result' collection
  const kMeansResultCollection = database.collection('kmeans_result');

  // Create an object to store the K-Means result along with other details
  const kMeansResultData = {
    JumlahCluster: k,
    Perulangan: maxLoop,
    Result: result, // Store the actual K-Means results
    Timestamp: new Date(),
  };

  // Replace the existing document in 'kmeans_result' or insert a new one
  await kMeansResultCollection.replaceOne({}, kMeansResultData, { upsert: true });

  return result; // Return the K-Means results
};

module.exports = { calculateKMeans, calculateMeanCentroid, generateRandomCentroid };
