// kmeansprocess.js

const KMeans = require('kmeans-node');
const math = require('mathjs');
const { connectToMongoDB } = require('./mongoDB');

const calculateMeanCentroid = (data, k) => {
  const centroid = [];
  for (let i = 0; i < k; i++) {
    const cluster = data.filter((point) => point.label === i);

    const clusterMean = cluster.reduce((acc, point) => {
      return math.add(acc, point.features);
    }, math.zeros(cluster[0].features.length));
    centroid.push(math.divide(clusterMean, cluster.length));
  }

  return centroid;
};

const generateRandomCentroid = (data, k) => {
  const centroid = [];
  for (let i = 0; i < k; i++) {
    const randomPoint = data[Math.floor(Math.random() * data.length)].features;
    centroid.push(randomPoint);
  }

  return centroid;
};

const calculateKMeans = async (data, k, maxLoop, centroid) => {
  const kmeans = new KMeans({
    k,
    maxIterations: maxLoop,
    tolerance: 1e-4,
    runs: 1,
    initialCentroids: centroid,
  });

  const result = kmeans.fit(data);

  // After K-Means calculation, you can save the results to MongoDB as you previously did

  // Replace existing data or insert new data in 'kmeans_result' collection
  const { database } = await connectToMongoDB();
  const kMeansResultCollection = database.collection('kmeans_result');

  const kMeansResultData = {
    JumlahCluster: k,
    Perulangan: maxLoop,
    Result: result, // Store the actual K-Means results
    Timestamp: new Date(),
  }

  await kMeansResultCollection.replaceOne({}, kMeansResultData, { upsert: true });

  return result; // Return the K-Means results
}

module.exports = { calculateKMeans, calculateMeanCentroid, generateRandomCentroid };
