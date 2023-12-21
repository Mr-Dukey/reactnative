const mongoose = require('mongoose');

const User = mongoose.Schema({
    Name: {
        type: String
    },
    Email:{
        type:String
    },
    Phone:{
        type:Number
    }
});

module.exports = mongoose.model('UserTest',User);