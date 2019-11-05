var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var episodeSchema = new Schema({
    title: String,
    episode_name: String,
    description: String,
    episode_url: String,
    date: {type: Date, default: Date.now},
    new_release: {type: Boolean, default: true}
});

var Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;