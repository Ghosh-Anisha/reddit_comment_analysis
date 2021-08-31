var mongoose = require('mongoose');

var subredditSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    subreddit:
    {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('subreddit', subredditSchema);
