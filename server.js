//require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
//const cors = require('cors');

// set port equal to 3000
const PORT = process.env.PORT || 3000;

// jshow json and etc
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// access static data
app.use(express.static(path.join(__dirname, '/public')));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  