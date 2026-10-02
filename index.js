require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

// Configure multer memory storage (no need to save files permanently to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File upload endpoint matching the HTML form input name "upfile"
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'Please upload a file' });
  }

  // Extract metadata from the uploaded file object
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});