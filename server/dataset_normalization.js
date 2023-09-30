// dataset_normalization.js

// Method Normalisasi Dataset
const normalizeData = (data) => {
  const minMax = {}

  // Sort the data based on tanggaljam in ascending order to get the oldest data first
  data.sort((a, b) => new Date(a.tanggaljam) - new Date(b.tanggaljam))

  const normalizedData = data.map((record) => {
    if (!minMax.tanggaljam) {
      minMax.tanggaljam = { min: record.tanggaljam, max: record.tanggaljam }
    } else {
      if (record.tanggaljam < minMax.tanggaljam.min) {
        minMax.tanggaljam.min = record.tanggaljam
      }
      if (record.tanggaljam > minMax.tanggaljam.max) {
        minMax.tanggaljam.max = record.tanggaljam
      }
    }

    return {
      tanggaljam: record.tanggaljam,
      suhu: (record.suhu - 15) / (35 - 15),
      pH: record.pH / 14,
      kelembaban: (record.kelembaban - 30) / (80 - 30),
      kondisi: (record.kondisi - 1) / (3 - 1),
    }
  })

  return { normalizedData, minMax }
}

module.exports = {
  normalizeData,
}
