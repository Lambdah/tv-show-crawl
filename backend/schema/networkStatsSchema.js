const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const networkStatsSchema = new Schema({
    network: {type: String, required: true},
    episodeCount: {type: Number},
    showCount: {type: Number},
    date: {type: Date, default: Date.now}
})

networkStatsSchema.static('UpdateByNetwork', function(network){
    return this.findOneAndUpdate({network: network._id}, {episodeCount: network.episodeCount, showCount: network.showCount}, {new: true});
});

const NetworkStats = mongoose.model('NetworkStats', networkStatsSchema)
module.exports = NetworkStats;