var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var episodeSchema = new Schema({
    show: {type: String, required: true},
    title: {type: String, required: true},
    description: String,
    description_alt: String,
    link: {type: String, unique: true},
    date: {type: Date, default: Date.now},
    new_release: {type: Boolean, default: true},
    unlisted: {type: Boolean, default: false},
    poster: String,
    poster_alt: String,
    season: Number,
    episode: Number,
    release_date: String},
    {autoIndex: false});

episodeSchema.methods.findTitleAndEpi = function(cb){
    return this.model('Episode').findOne({show: this.show, title: this.title}, cb);
};

episodeSchema.methods.updateEpiNewReleaseToFalse = function(cb){
  return this.model('Episode').findOneAndUpdate({show: this.show, title: this.title},
      {new_release: false},
      {new: true}, cb);
};

episodeSchema.methods.updateEpiToListed = function(cb){
    return this.model('Episode').findOneAndUpdate({show: this.show, title: this.title},
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

episodeSchema.index({show: 1, title: 1}, {unique: true});

episodeSchema.plugin(uniqueValidator);
var Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;