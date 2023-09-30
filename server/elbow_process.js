const fetch = require('node-fetch') // Import the 'node-fetch' library to make HTTP requests
const { connectToMongoDB } = require('./mongoDB') // Import your MongoDB connection code
const KMeans = require('./kmeans_process')

// Function to fetch normalized data from the API
async function fetchNormalizedData() {
  try {
    const response = await fetch('http://localhost:3001/api/get-normalize-data') // Change the URL to match your server configuration

    return await response.json()
  } catch (error) {
    console.error('Error fetching normalized data:', error)

    return []
  }
}

// Function to perform the elbow method
async function performElbowMethod(JumlahCluster, perulangan) {
  try {
    // Fetch normalized data
    const normalizedData = await fetchNormalizedData();

    // Perform elbow method calculations using 'normalizedData'
    const maxCluster = parseInt(JumlahCluster);
    const maxLoop = parseInt(perulangan);
    const centroid = null; // You can provide centroid data if needed

    // Create an instance of KMeans and execute clustering
    const kmeans = new KMeans(normalizedData, maxCluster, 'mean', maxLoop, centroid);
    kmeans.execute();

    // Get the process data
    const output = kmeans.getProcess();
    const clusterAcuan = output.cluster[output.cluster.length - 1];
    const centroidAcuan = output.centroid[output.centroid.length - 1];

    // Perform elbow method calculations using 'normalizedData'


    const optimalClusterCount = 3; // Replace with your elbow method result

    // Save the elbow method result to MongoDB
    const { database } = await connectToMongoDB()
    const elbowResultCollection = database.collection('elbow_result')

    // Prepare the data to be saved to MongoDB
    const elbowResultData = {
      JumlahCluster: optimalClusterCount,
      Perulangan: perulangan,
      Result: results, // Replace with your result
      Timestamp: new Date(),
    }

    // Save the data to the 'elbow_result' collection
    await elbowResultCollection.updateOne(
      {},
      { $set: elbowResultData },
      { upsert: true }
    )

    return elbowResultData
  } catch (error) {
    console.error('Error in Elbow Method:', error)

    return { error: 'Error performing Elbow Method' }
  }
}
function elbowOptimize(data, maxCluster, maxLoop, centroid) {
  const results = []
  const process = []

  for (let cluster = 2; cluster <= maxCluster; cluster++) {
    // Initialize the K-Means clustering with 'cluster' number of clusters
    const kmeans = new KMeans(data, cluster, 'mean', maxLoop, centroid)
    kmeans.execute()

    // Get the process data
    const output = kmeans.getProcess()
    const clusterAcuan = output.cluster[output.cluster.length - 1]
    const centroidAcuan = output.centroid[output.centroid.length - 1]

    const temp2 = []
    const process2 = []

    clusterAcuan.forEach((value, key) => {
      const temp1 = []
      const process1 = []
      process1.push(`Cluster - ${cluster}`)
      data[key].forEach((keys, i) => {
        const diff = keys - centroidAcuan[value][i]
        temp1.push(Math.pow(diff, 2));
        process1.push(`(${keys} - ${centroidAcuan[value][i]})^2`)
      });
      const sumSquaredDistance = temp1.reduce((acc, val) => acc + val, 0)
      temp2.push(sumSquaredDistance)
      process1.push(sumSquaredDistance)
      process2.push(process1)
    });

    results.push({ cluster, hasil: temp2.reduce((acc, val) => acc + val, 0) })
    process.push(process2)
  }

  const finalResults = results.map((key, x) => {
    if (x === 0) {
      return { cluster: key.cluster, nilai: key.hasil, selisih: key.hasil }
    } else {
      return {
        cluster: key.cluster,
        nilai: key.hasil,
        selisih: Math.abs(key.hasil - results[x - 1].hasil),
      }
    }
  })

  return { process, hasil: finalResults }
}

module.exports = {
  performElbowMethod,
  fetchNormalizedData,
  elbowOptimize,
}
