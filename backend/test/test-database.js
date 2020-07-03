const expect = require('chai').expect;
// const mongoose = require('mongoose');
// const Episode = require('../schema/episodeSchema');
// process.env.NODE_ENV = 'test';
//
// const database_data = [
//     {
//         epi_id: '/shows/south-park/episode/1785418/band-in-china/',
//         show: 'South Park',
//         title: 'Band In China',
//         description: 'AIRED OCTOBER 30, 2019',
//         link: 'http://www.much.com/shows/south-park/episode/1785418/band-in-china/'
//     },
//     {
//         epi_id: '/shows/south-park/episode/1785418/tegridy-farms-halloween-special/',
//         show: 'South Park',
//         title: 'Tegridy Farms Halloween Special',
//         description: 'AIRED OCTOBER 30, 2019',
//         link: 'http://www.much.com/shows/south-park/episode/1785418/tegridy-farms-halloween-special/'
//     },
//     {
//         epi_id: '/shows/south-park/episode/1785417/let-them-eat-goo/',
//         show: 'South Park',
//         title: 'Let Them Eat Goo',
//         description: 'AIRED OCTOBER 30, 2019',
//         link: 'http://www.much.com/shows/south-park/episode/1785417/let-them-eat-goo/'
//     },
//     {
//         epi_id: '/shows/south-park/episode/1785416/shots/',
//         show: 'South Park',
//         title: 'SHOTS!!!',
//         description: 'AIRED OCTOBER 30, 2019',
//         link: 'http://www.much.com/shows/south-park/episode/1785416/shots/'
//     }
// ];
//
// describe('Testing Inputting values to the database', function(){
//     before(function(done){
//         mongoose.connect('mongodb://localhost/test1',
//             {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
//             .catch(function(err){
//                 console.log("Make sure mongo is running locally by - 'sudo mongod' or 'sudo service mongod start'");
//                 console.error(err)
//             });
//         mongoose.connection.dropDatabase(function(){
//
//         });
//         Episode.insertMany(database_data, function(err, docs){
//             if (err){
//                 console.error(err)
//             }
//             done()
//         });
//     });
//
//     after(function(done){
//         const db = mongoose.connection;
//         mongoose.connection.db.dropDatabase(function(){
//             mongoose.connection.close(done);
//         });
//     });
//
//     it('should query all South Park Episodes', function(done){
//         const query = Episode.find({show: "South Park"}, function(err, docs){
//            if (err){
//                console.error(err);
//            }
//            expect(docs).to.have.lengthOf(4);
//            for(let i=0; i < docs.length; i++){
//                expect(docs[i]).to.have.property('unlisted', false);
//            }
//            done();
//         });
//     });
//
//     it('should update all unlisted properties to true', function(done){
//         Episode.updateUnlistedToTrue(function(err, epi){
//             if (err){
//                 console.error(err);
//             }
//         });
//         Episode.find(function(err, epi){
//             if (err){
//                 console.error(err);
//             }
//             for(let i=0; i < epi.length; i++){
//                 expect(epi[i]).to.have.property('unlisted', true);
//             }
//             done();
//         });
//     });
//
//     it('should get a particular episode with this method', function(done){
//         var same_epi = new Episode({
//             epi_id: '/shows/south-park/episode/1785418/band-in-china/',
//             show: 'South Park',
//             title: 'Band In China',
//             description: 'AIRED OCTOBER 30, 2019',
//             link: 'http://www.much.com/shows/south-park/episode/1785418/band-in-china/'
//         });
//         same_epi.findTitleAndEpi(function(err, epi){
//             if(err){
//                 console.error(err);
//             }
//             expect(epi).to.have.an('object');
//             expect(epi).to.have.property('title', 'South Park');
//             expect(epi).to.have.property('episode_name', 'Band In China');
//             done();
//         })
//     });
//
//     it('should update new_release to false in the database', function(done){
//         Episode.updateNewReleaseToFalse(function(err, episodes){
//             for(let i=0; i < episodes.length; i++){
//                 expect(episodes[i]).to.have.properties('new_release', false);
//             }
//             done();
//         });
//     });
//
//     it('should an episode to unlisted false', function(done){
//         var listed_episode = new Episode({
//             epi_id: '/shows/south-park/episode/1785418/band-in-china/',
//             show: 'South Park',
//             title: 'Band In China',
//             description: 'AIRED OCTOBER 30, 2019',
//             link: 'http://www.much.com/shows/south-park/episode/1785418/band-in-china/'
//         });
//         listed_episode.updateEpiToListed(function(err, epi){
//             expect(epi).to.have.property('unlisted', false);
//             done();
//         });
//     });
//
//     it('should not contain duplicates', function(done){
//         var same_epi = new Episode({
//             epi_id: '/shows/south-park/episode/1785418/tegridy-farms-halloween-special/',
//             show: 'South Park',
//             title: 'Tegridy Farms Halloween Special',
//             description: 'AIRED OCTOBER 30, 2019',
//             link: 'http://www.much.com/shows/south-park/episode/1785418/tegridy-farms-halloween-special/'
//         });
//         same_epi.save().then(function(){
//         //    Expect an error because it is trying to save same episode again
//         }).catch(function(err){
//             // console.error(err);
//             Episode.find({show: same_epi.show, title: same_epi.title}, function(err, docs){
//                 expect(docs).to.have.lengthOf(1);
//                 done();
//             });
//         });
//     });
//
//     it('queries for an episode that does not exist', function(done){
//         var new_epi = new Episode({
//             epi_id: '/shows/south-park/episode/1785418/weight-gain-4000/',
//             show: 'South Park',
//             title: 'Weight Gain 4000',
//             description: 'August 27, 1997',
//             link: 'http://www.much.com/shows/south-park/episode/1785418/weight-gain-4000/'
//         });
//         new_epi.findTitleAndEpi(function(err, epi){
//             if(err){
//                 console.error(err);
//             }
//             expect(epi).to.be.null;
//             done();
//         });
//     });
//
//     it('should insert new episode with new_release as true', function(done){
//         var new_epi = new Episode({
//             epi_id: '/shows/south-park/episode/1785418/weight-gain-4000/',
//             show: 'South Park',
//             title: 'Weight Gain 4000',
//             description: 'August 27, 1997',
//             link: 'http://www.much.com/shows/south-park/episode/1785418/weight-gain-4000/'
//         });
//         new_epi.save(function(err, docs){
//             if(err){ console.error(err); }
//             expect(docs).to.have.property('title', 'South Park');
//             expect(docs).to.have.property('episode_name', 'Weight Gain 4000');
//             expect(docs).to.have.property('new_release', true);
//             done();
//         });
//     });
//
//     it('should updateEpiNewReleaseToFalse makes new_release: true to new_release: false', function(done){
//         var old_epi = new Episode({
//             epi_id: '/shows/south-park/episode/1785418/weight-gain-4000/',
//             show: 'South Park',
//             title: 'Weight Gain 4000',
//             description: 'August 27, 1997',
//             link: 'http://www.much.com/shows/south-park/episode/1785418/weight-gain-4000/'
//         });
//         old_epi.updateEpiNewReleaseToFalse(function(err, epi){
//             if(err){ console.error(err) }
//             expect(epi).to.have.property('title', 'South Park');
//             expect(epi).to.have.property('episode_name', 'Weight Gain 4000');
//             expect(epi).to.have.property('new_release', false);
//             done();
//         });
//     });
//
// });