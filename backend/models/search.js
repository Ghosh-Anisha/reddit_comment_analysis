var mongoose = require('mongoose');

var subRedditSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    subReddit:
    {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('subReddit', subRedditSchema);
