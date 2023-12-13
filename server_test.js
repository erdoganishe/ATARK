require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const {SerialPort, SpacePacketParser} = require('serialport');
const Readline = require('@serialport/parser-readline');


const port = new SerialPort({path:'COM4', baudRate: 9600 });
//const lineStream = port.pipe(new Readline());
port.on('data', function(data){
  console.log("Data: " + data);
});


// const parser = port.pipe(new ReadLine());

// parser.on('data', console.log);

// port.write('ROBOT PLEASE RESPOND\n');
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
//app.use(cookieParser());

// access static data
app.use(express.static(path.join(__dirname, '/public')));



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
