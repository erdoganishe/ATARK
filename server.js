require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const cookieParser = require('cookie-parser');

// db import

//connect to db 

// set port equal to 3000
const PORT = process.env.PORT || 3000;

// cors + credentinals
app.use(credentials);
app.use(cors(corsOptions));

// jshow json and etc
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// access static data
app.use(express.static(path.join(__dirname, '/public')));

// router
app.use('/', require('./routes/root'));

// api

// auth

// 404

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  