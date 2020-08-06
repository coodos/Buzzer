const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    user: {
        type: String, 
        required: true
    },
    timeStamp: {
        type: Number,
        required: true
    },
    name: {
        type: String, 
        required: true
    }, 
    schoolAndLoc: {
        type: String, 
        required: true
    }
});

const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response;
