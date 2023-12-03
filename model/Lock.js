const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lockSchema = new Schema({
    uId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    adress: {
        type: String,
        require: true
    },

});

module.exports = mongoose.model('Lock', lockSchema);