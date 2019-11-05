const expect = require('chai').expect;
const mongoose = require('mongoose');
const Episode = require('../schema/episodeSchema');

const database_data = [
    {
        epi_id: '/shows/south-park/episode/1785418/band-in-china/',
        title: 'South Park',
        episode: 'Band In China',
        description: 'AIRED OCTOBER 30, 2019',
        link: 'http://www.much.com/shows/south-park/episode/1785418/band-in-china/'
    },
    {
        epi_id: '/shows/south-park/episode/1785418/tegridy-farms-halloween-special/',
        title: 'South Park',
        episode: 'Tegridy Farms Halloween Special',
        description: 'AIRED OCTOBER 30, 2019',
        link: 'http://www.much.com/shows/south-park/episode/1785418/tegridy-farms-halloween-special/'
    },
    {
        epi_id: '/shows/south-park/episode/1785417/let-them-eat-goo/',
        title: 'South Park',
        episode: 'Let Them Eat Goo',
        description: 'AIRED OCTOBER 30, 2019',
        link: 'http://www.much.com/shows/south-park/episode/1785417/let-them-eat-goo/'
    },
    {
        epi_id: '/shows/south-park/episode/1785416/shots/',
        title: 'South Park',
        episode: 'SHOTS!!!',
        description: 'AIRED OCTOBER 30, 2019',
        link: 'http://www.much.com/shows/south-park/episode/1785416/shots/'
    }
];

describe('Testing Inputting values to the database', function(){
    before(function(done){
        mongoose.connect('mongodb://localhost/test1',
            {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
            .catch(function(err){
                console.log("Make sure mongo is running locally by - 'sudo mongod'");
                console.error(err)
            });
        done();
    });

    after(function(done){
        const db = mongoose.connection;
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });

    it('should input new episode', function(done){
        var test_data = new Episode(database_data[0]);
        test_data.save().then(() => done()).catch((err) => console.error(err));
    });


});