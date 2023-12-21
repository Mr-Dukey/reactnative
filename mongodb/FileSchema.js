const mongoose = require('mongoose');

const Fileup = mongoose.Schema({
    FileName:String,
    path:String
});

module.exports = mongoose.model('FileTest',Fileup);