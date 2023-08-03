const fs = require('fs');
const readline = require('readline');

async function calculateTraysOnSushiTrain(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let traysOnTrain = 0;
  let cumulativeScansIn = 0;
  let cumulativeScansOut = 0;
  let adjustments = [];

  for await (const line of rl) {
    const [date, time, scansIn, scansOut] = line.split(',');
    const timestamp = new Date(`${date} ${time}`).getTime();
    cumulativeScansIn += parseInt(scansIn);
    cumulativeScansOut += parseInt(scansOut);

    // Adjustment 1: Add missed scans from 3 hours ago (or 1.5 hours from 4 pm onwards)
    if (timestamp >= 10800000 && traysOnTrain < cumulativeScansIn - cumulativeScansOut) {
      const shelfLife = timestamp >= 57600000 ? 5400000 : 10800000;
      const adjustmentTime = timestamp - shelfLife;
      const traysMissed = cumulativeScansIn - cumulativeScansOut - traysOnTrain;
      adjustments.push({ time: adjustmentTime, trays: traysMissed });
    }

    // Adjustment 2: Add missed scans from 1.5 hours ago (always used from 4 pm onwards)
    if (timestamp >= 5400000 && traysOnTrain < cumulativeScansIn - cumulativeScansOut) {
      const adjustmentTime = timestamp - 5400000;
      const traysMissed = cumulativeScansIn - cumulativeScansOut - traysOnTrain;
      adjustments.push({ time: adjustmentTime, trays: traysMissed });
    }

    traysOnTrain = cumulativeScansIn - cumulativeScansOut;

    // Applying adjustments if any
    for (const adjustment of adjustments) {
      if (timestamp >= adjustment.time) {
        traysOnTrain += adjustment.trays;
      }
    }
  }

  return traysOnTrain;
}

module.exports = calculateTraysOnSushiTrain;