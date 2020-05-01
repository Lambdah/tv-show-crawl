var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var networkSchema = new Schema({
    network: {type: String, required: true},
    title: {type: String, unique: true},
    synopsis: {type: String},
    metaTags: {type: [String]},
    poster: {type: String},
    episodeCount: {type: Number}
});

networkSchema.static('updateEpisodeCount', function(count){
    return this.findOneAndUpdate({title: count._id}, {episodeCount: count.episodeCount}, {new: true});
});

networkSchema.plugin(uniqueValidator);
var Network = mongoose.model('Network', networkSchema);
module.exports = Network;