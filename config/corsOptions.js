const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1 || !origin 
    || origin === 'http://127.0.0.1:3000' 
    || origin === 'http://192.168.0.108:3000'){ // REMOVE || !origin
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;