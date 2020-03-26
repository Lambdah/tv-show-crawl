var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var episodeSchema = new Schema({
    show: {type: String, required: true},
    episode_name: {type: String, required: true},
    description: String,
    description_alt: String,
    episode_url: {type: String, unique: true},
    date: {type: Date, default: Date.now},
    new_release: {type: Boolean, default: true},
    unlisted: {type: Boolean, default: false},
    episode_poster: String,
    episode_poster_alt: String,
    season: Number,
    episode_num: Number,
    release_date: String},
    {autoIndex: false});

episodeSchema.methods.findTitleAndEpi = function(cb){
    return this.model('Episode').findOne({show: this.show, episode_name: this.episode_name}, cb);
};

episodeSchema.methods.updateEpiNewReleaseToFalse = function(cb){
  return this.model('Episode').findOneAndUpdate({show: this.show, episode_name: this.episode_name},
      {new_release: false},
      {new: true}, cb);
};

episodeSchema.methods.updateEpiToListed = function(cb){
    return this.model('Episode').findOneAndUpdate({show: this.show, episode_name: this.episode_name},
        {unlisted: false},
        {new: true}, cb);
};

episodeSchema.statics.updateNewReleaseToFalse = function(cb){
    return this.model('Episode').updateMany({new_release: true}, {new_release: false}, { new: true }, cb);
};

episodeSchema.statics.updateUnlistedToTrue = function(cb){
    return this.model('Episode').updateMany({unlisted: false}, {"$set": {unlisted: true}}, {new: true}, cb);
};
episodeSchema.statics.updateUnlistedNewReleaseToFalse = function(cb){
    return this.model('Episode').updateMany({unlisted: true}, {"$set": {new_release: false}}, {new: true}, cb);
};

episodeSchema.index({show: 1, episode_name: 1}, {unique: true});

episodeSchema.plugin(uniqueValidator);
var Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;