// kmeans_process.js

class KMeans {
  constructor(data, clusterCount, method, maxLoop, centroid) {
    // Constructor for K-Means class
    // Initialize instance variables and parameters
    this.data = data;
    this.clusterCount = clusterCount;
    this.method = method;
    this.maxLoop = maxLoop;
    this.centroid = centroid;
    this.cluster = [];
    this.data_cluster = [];
    this.distance = [];
    this.dimensi = this.data[0].length;
  }

  execute() {
    // Implement the K-Means clustering logic here
    for (let i = 0; ; i++) {
      this.cluster[i] = [];

      if (i === 0) {
        this.data_cluster[i] = this.centroid;
        this.centroid_allof[i] = this.data_cluster[i];
      } else {
        this.data_cluster[i] = this.data_cluster[i - 1];
        this.centroid_allof[i] = this.data_cluster[i];
      }

      // Cari Jarak
      this.distance[i] = [];

      for (const c of this.data) {
        const distance_data = [];
        for (const d of this.data_cluster[i]) {
          const cluster_data = new Array(this.dimensi).fill(0);

          for (let x = 0; x < this.dimensi; x++) {
            cluster_data[x] = Math.pow(Math.abs(c[x] - d[x]), 2);
          }

          distance_data.push(Math.sqrt(cluster_data.reduce((acc, val) => acc + val, 0)));
        }
        this.distance[i].push(distance_data);
      }

      // Cluster
      let x = 0;
      for (const key of this.distance[i]) {
        const min = Math.min(...key);
        const c = key.indexOf(min);
        this.cluster[i][x] = c;
        x++;
      }

      // Repoint
      this.data_cluster[i] = [];

      for (const [key, value] of Object.entries(this.cluster[i])) {
        if (!this.data_cluster[i][value]) {
          this.data_cluster[i][value] = [];
        }
        this.data_cluster[i][value].push(this.data[key]);
      }

      this.data_cluster_temp = this.data_cluster[i];
      this.data_cluster[i] = [];

      for (const [key, value] of Object.entries(this.data_cluster_temp)) {
        const temp = Array(this.dimensi).fill(0);
        for (const [keys, values] of Object.entries(value)) {
          for (const [keyx, valuem] of Object.entries(values)) {
            temp[keyx] = (temp[keyx] || 0) + valuem[keyx];
          }
        }

        for (let x1 = 0; x1 < this.dimensi; x1++) {
          this.data_cluster[i][key][x1] = temp[x1] / value.length;
        }
      }

      const temp2 = [];
      const max_temp2 = Object.keys(this.data_cluster[i]);
      const maxIndex = Math.max(...max_temp2);

      for (let u = 0; u <= maxIndex; u++) {
        if (this.data_cluster[i][u]) {
          temp2[u] = this.data_cluster[i][u];
        }
      }

      this.data_cluster[i] = temp2;

      if (i > 0) {
        if (this.stoploop(i)) {
          break;
        }
      }
    }
  }

  stoploop(i) {
    if (this.cluster.length > 1) {
      const last_index_cluster = this.cluster.length - 1;
      for (let x = 0; x < this.cluster[last_index_cluster].length; x++) {
        if (this.cluster[last_index_cluster][x] !== this.cluster[last_index_cluster - 1][x]) {
          return false;
        } else if (i > this.maxLoop - 2) {
          return true;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  getProcess() {
    // Return the cluster and centroid data for further processing
    return {
      cluster: this.cluster,
      centroid: this.centroid_allof,
    };
  }
}

module.exports = KMeans; // Export the KMeans class
