const express = require('express');
const path = require('path');
const multer = require('multer'); // For handling file uploads
const calculateTraysOnSushiTrain = require('./sushiTrain');

const app = express();

// Setting up Multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Serving the frontend HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint for calculating trays on sushi train
app.post('/calculate', upload.single('file'), async (req, res) => {
  const filePath = req.file.path; // Path to the uploaded file
  try {
    const result = await calculateTraysOnSushiTrain(filePath);
    res.send(result.toString()); // Send the result back as a string
  } catch (error) {
    console.error('Error calculating the result:', error);
    res.status(500).send('Error calculating the result.');
  }
});

const port = 3000; 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
