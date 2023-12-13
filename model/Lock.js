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
    keys: [String],
    isAbleToChange:{
        type: Boolean,
        required: false,
        
    },
    log: [String]

});

module.exports = mongoose.model('Lock', lockSchema);