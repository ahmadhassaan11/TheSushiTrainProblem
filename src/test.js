const calculateTraysOnSushiTrain = require('./sushiTrain');

(async () => {
  const filePath = '/Users/apple/Documents/Sushi Train Example Data/count_dataset_370.csv'; //Path to test CSV file
  try {
    const result = await calculateTraysOnSushiTrain(filePath);
    console.log('Result:', result);
  } catch (error) {
    console.error('Error calculating the result:', error);
  }
})();
