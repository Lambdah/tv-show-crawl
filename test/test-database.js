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
        Episode.insertMany(database_data, function(err, docs){
            if (err){
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

    it('should query all South Park Episodes', function(done){
        const query = Episode.find({title: "South Park"}, function(err, docs){
           if (err){
               console.error(err);
           }
           expect(docs).to.have.lengthOf(4);
           done();
        });
    });

    it('should get a particular episode with this method', function(done){
        var same_epi = new Episode({
            epi_id: '/shows/south-park/episode/1785418/band-in-china/',
            title: 'South Park',
            episode: 'Band In China',
            description: 'AIRED OCTOBER 30, 2019',
            link: 'http://www.much.com/shows/south-park/episode/1785418/band-in-china/'
        });
        same_epi.findTitleAndEpi(function(err, epi){
            if(err){
                console.error(err);
            }
            expect(epi).to.have.an('object');
            expect(epi).to.have.property('title', 'South Park');
            expect(epi).to.have.property('episode', 'Band In China');
            done();
        })
    });

    it('queries for an episode that does not exist', function(done){
        var new_epi = new Episode({
            epi_id: '/shows/south-park/episode/1785418/weight-gain-4000/',
            title: 'South Park',
            episode: 'Weight Gain 4000',
            description: 'August 27, 1997',
            link: 'http://www.much.com/shows/south-park/episode/1785418/weight-gain-4000/'
        });
        new_epi.findTitleAndEpi(function(err, epi){
           if(err){
               console.error(err);
           }
           expect(epi).to.be.null;
           done();
        });
    });

    it('should update new_release to false', function(done){
        var same_epi = new Episode({
            epi_id: '/shows/south-park/episode/1785418/tegridy-farms-halloween-special/',
            title: 'South Park',
            episode: 'Tegridy Farms Halloween Special',
            description: 'AIRED OCTOBER 30, 2019',
            link: 'http://www.much.com/shows/south-park/episode/1785418/tegridy-farms-halloween-special/'
        });
        same_epi.updateNewRelease(function(err, epi){
            if(err){
                console.error(err);
            }
            if(err){ console.error(err); }
            expect(epi).to.have.property('title', 'South Park');
            expect(epi).to.have.property('episode', 'Tegridy Farms Halloween Special');
            expect(epi).to.have.property('new_release', false);
            done();
        });
    });


});