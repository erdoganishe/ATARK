require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const serialIO = require('./middleware/serialIO');
const cookieParser = require('cookie-parser');

// db import
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

//connect to db 
connectDB();

// read/write from arduino
serialIO();

// set port equal to 3000
const PORT = process.env.PORT || 3000;

// favicon
const favicon = require('serve-favicon'); 
app.use(favicon(__dirname + '/favicon.ico'));

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
app.use('/api/user', require("./routes/api/user"));
app.use('/api/lock', require("./routes/api/lock"));
// auth
app.use('/auth', require('./routes/auth'));
// 404
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'view', '404', 'index.html'));
  } else if (req.accepts('json')) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
  