var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var episodeSchema = new Schema({
    title: {type: String, required: true},
    episode: {type: String, required: true},
    description: String,
    episode_url: {type: String, unique: true},
    date: {type: Date, default: Date.now},
    new_release: {type: Boolean, default: true}},
    {autoIndex: false});

episodeSchema.methods.findTitleAndEpi = function(cb){
    return this.model('Episode').findOne({title: this.title, episode: this.episode}, cb);
};

episodeSchema.statics.updateNewRelaseToFalse = function(cb){
    return this.model('Episode').updateMany({new_release: true}, {new_release: false}, { new: true },cb)
};

episodeSchema.index({title: 1, episode: 1}, {unique: true});

episodeSchema.plugin(uniqueValidator);
var Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;