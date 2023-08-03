const express = require('express');
const multer = require('multer');
const calculateTraysOnSushiTrain = require('./sushiTrain');

const app = express();
const upload = multer();

// Serve the static files (including index.html) from the 'src' directory
app.use(express.static(__dirname + '/src'));

// Defining POST endpoint for calculating trays
app.post('/calculate', upload.single('file'), async (req, res) => {
  try {
    const result = await calculateTraysOnSushiTrain(req.file.buffer.toString());
    res.send(result.toString());
  } catch (error) {
    res.status(500).send('Error processing the file.');
  }
});

// Defining GET endpoint to load the UI page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});