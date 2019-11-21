let mongoose = require("mongoose");
let Episode = require("../backend/schema/episodeSchema");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../backend/server");
let should = chai.should();
let db_data = require("../mock-data/data");

chai.use(chaiHttp);

describe('Episode',function() {
    before(function (done) {
        mongoose.connect('mongodb://localhost/test',
            {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
            .catch(function (err) {
                console.log("Make sure mongo is running locally by - 'sudo mongod'");
                console.error(err)
            });
        Episode.insertMany(db_data, function (err, docs) {
            if (err) {
                console.error(err)
            }
            done()
        });
    });

    after(function(done){
        const db = mongoose.connection;
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });

});
