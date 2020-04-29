const chai = require('chai');
const expect = chai.expect;
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const Episode = require('../schema/episodeSchema');
process.env.NODE_ENV = 'test';

const muchScrape = require('../crawler/much/muchScrape');
const muchParse = require('../crawler/much/muchParse');
const cityTVScrape = require('../crawler/cityTV/cityTVScraper');
const cityTVParse = require('../crawler/cityTV/cityTVParse');
const cbcScrape = require('../crawler/cbc/cbcScraper');
const cbcParser = require('../crawler/cbc/cbcParse');
const {crawlManager, episodeInputDatabase} = require('../crawler/crawlManager');

describe('Testing web crawlers for home page for show links', function(){
   it('should webcrawl MUCH website', function(done){
       muchScrape(config.MuchHomeIndex)
           .then(function(links){
              expect(links).to.have.length(6);
              expect(links).to.be.a('array');
              done();
           });
   });

   it('should webcrawl TV shows on CityTV', function(done){
      cityTVScrape(config.CityTvHomeIndex)
          .then(function(links){
              expect(links).to.have.length(49);
              expect(links).to.be.a('array');
              done();
          });
   });

   it('should webcrawl TV shows on CBC', function(done){
      cbcScrape(config.CBCHomeIndex)
          .then(function(links){
              expect(links).to.have.length(71);
              expect(links).to.be.a('array');
              done();
          });
   });
});

describe('Testing that web parser MUCH is getting the correct information', function(){
   it('should parses South Park episodes', function(done){
        muchParse(config.MuchShowDir + "south-park/index.html")
            .then(function(episodes){
               expect(episodes).to.have.length(3);
               expect(episodes).to.be.a('array');
               expect(episodes).to.eql([
                   {
                       epi_id: '/shows/south-park/episode/1836304/turd-burglars/',
                       show: 'South Park',
                       episode: 'Turd Burglars',
                       description: 'AIRED NOVEMBER 27, 2019',
                       link: 'http://www.much.com/shows/south-park/episode/1836304/turd-burglars/'
                   },
                   {
                       epi_id: '/shows/south-park/episode/1824093/board-girls/',
                       show: 'South Park',
                       episode: 'Board Girls',
                       description: 'AIRED NOVEMBER 27, 2019',
                       link: 'http://www.much.com/shows/south-park/episode/1824093/board-girls/'
                   },
                   {
                       epi_id: '/shows/south-park/episode/1816388/season-finale/',
                       show: 'South Park',
                       episode: 'Season Finale',
                       description: 'AIRED NOVEMBER 27, 2019',
                       link: 'http://www.much.com/shows/south-park/episode/1816388/season-finale/'
                   }
               ]);
               expect(episodes[0]).to.have.property('title', 'South Park');
               done();
            })
            .catch(function(err){
                console.log(err);
            });
   });

   it('should not parse any episodes in Nathan For You', function(done){
       muchParse(config.MuchShowDir + "nathan-for-you/index.html")
           .then(function (episodes) {
               expect(episodes).to.be.null;
               done();
           })
           .catch(function(err){
               console.error(err);
           });
   });

   it('parses tosh.0 episodes', function(done){
       muchParse(config.MuchShowDir + "tosh0/index.html")
           .then(function(episodes){
               expect(episodes).to.have.length(2);
               expect(episodes).to.be.a('array');
               expect(episodes[0]).to.have.property('title', 'Tosh.0');
               done();
           })
           .catch(function(err){
               console.log(err);
           });
   });

   it('parses The Simpsons to have no episodes', function(done){
        muchParse(config.MuchShowDir + "the-simpsons/index.html")
            .then(function(episodes){
                expect(episodes).to.be.null;
                done();
            })
            .catch(function(err){
                console.error(err);
            });
   });
});

describe('Testing web parser for cityTV is retrieving the correct information', function(){
    it('parses episodes from dancing with the stars', function(done){
        cityTVParse(config.CityTvShowDir + "dancing-with-the-stars/index.html")
            .then(function(episodes){
                expect(episodes).to.have.length(11);
                expect(episodes).to.be.a('array');
                for(let i=0; i < episodes.length; i++){
                    expect(episodes[i]).to.have.property('title', 'Dancing With The Stars');
                }
                done();
            })
            .catch(function(err){
                console.error(err);
            });
    });

    it('parses episodes from Hell\'s kitchen', function(done){
        cityTVParse(config.CityTvShowDir + "hells-kitchen/index.html")
            .then(function(episode){
                expect(episode).to.have.length(16);
                expect(episode).to.be.a('array');
                for(let i=0; i < episode.length; i++){
                    expect(episode[i]).to.have.property("title", "Hell's Kitchen");
                }
                done();
            })
            .catch(function(err){
                console.error(err);
            });
    });

    it('parses episodes from bachelorette', function(done){
       cityTVParse(config.CityTvShowDir + "the-bachelorette-reunion/index.html")
           .then(function(episode){
               expect(episode).to.have.length(1);
               expect(episode).to.be.a('array');
               expect(episode[0]).to.have.property("title", "The Bachelorette Reunion");
               done();
           })
           .catch(function(err){
               console.error(err);
           });
    });

    it('parses no episodes from price is right', function(done){
       cityTVParse(config.CityTvShowDir + "the-price-is-right/index.html")
           .then(function(episode){
               expect(episode).to.be.null;
               done();
           })
           .catch(function(err){
               console.error(err);
           });
    });
});

describe('Testing parser for CBC is retrieving the correct information', function(){
   it('parses everything indigenous with no episodes', function(done){
       cbcParser(config.CBCShowDir + "everything-indigenous/index.html")
           .then(function(episode){
                expect(episode).to.be.null;
                done();
           })
           .catch(function(err){
               console.error(err);
           });
   });

   it('parses kim\'s convenience episodes', function(done){
       cbcParser(config.CBCShowDir + "kims-convenience/index.html")
           .then(function(episode){
               expect(episode).to.have.length(13);
               expect(episode).to.be.a('array');
               for(let i=0; i < episode.length; i++){
                   expect(episode[i]).to.have.property("title", "kim's convenience");
               }
               done();
           })
           .catch(function(err){
               console.error(err);
           });
   });

    it('parses marketplace episodes', function(done){
        cbcParser(config.CBCShowDir + "marketplace/index.html")
            .then(function(episode){
               expect(episode).to.have.length(20);
               expect(episode).to.be.a('array');
               for(let i=0; i < episode.length; i++){
                   expect(episode[i]).to.have.property("title", "marketplace");
               }
               done();
            })
            .catch(function(err){
                console.error(err);
            });
    });

    it('parses Mr. D episodes', function(done){
        cbcParser(config.CBCShowDir + "mr-d/index.html")
            .then(function(episode){
                expect(episode).to.have.length(8);
                expect(episode).to.be.a('array');
                for(let i=0; i < episode.length; i++){
                    expect(episode[i]).to.have.property("title", "mr. d");
                }
                done();
            })
            .catch(function(err){
                console.error(err)
            });
    });

    it('parses Murdoch Mystery episodes', function(done){
       cbcParser(config.CBCShowDir + "murdoch-mysteries/index.html")
           .then(function(episode){
               expect(episode).to.have.length(10);
               expect(episode).to.be.a('array');
               for(let i=0; i < episode.length; i++){
                   expect(episode[i]).to.have.property("title", "murdoch mysteries");
               }
               done();
           })
           .catch(function(err){
               console.error(err);
           });
    });

    it('parses Anne with an E episodes', function(done){
       cbcParser(config.CBCShowDir + "anne-with-an-e/index.html")
           .then(function(episode){
              expect(episode).to.have.length(11);
              expect(episode).to.be.a('array');
              for(let i=0; i < episode.length; i++){
                  expect(episode[i]).to.have.property("title", "anne with an e");
              }
              done();
           })
           .catch(function(err){
               console.error(err);
           });
    });
});

var database_1 =
    [{
    "show": "Crank Yankers",
    "title": "Sarah Silverman, Tiffany Haddish & Kevin Nealon",
    "description": "AIRED OCTOBER 30, 2019",
    "link": "http://www.much.com/shows/crank-yankers/episode/1811367/sarah-silverman-tiffany-haddish-and-kevin-nealon/"
    },
    {
        "show": "Crank Yankers",
        "title": "Jimmy Kimmel, Tracy Morgan & David Alan Grier",
        "description": "AIRED OCTOBER 30, 2019",
        "link": "http://www.much.com/shows/crank-yankers/episode/1786809/jimmy-kimmel-tracy-morgan-and-david-alan-grier/"
    }];


var mock_webcrawl_data_1 =
    [
        {
            "epi_id": "/shows/crank-yankers/episode/1786809/jimmy-kimmel-tracy-morgan-and-david-alan-grier/",
            "show": "Crank Yankers",
            "episode": "Jimmy Kimmel, Tracy Morgan & David Alan Grier",
            "description": "AIRED OCTOBER 30, 2019",
            "link": "http://www.much.com/shows/crank-yankers/episode/1786809/jimmy-kimmel-tracy-morgan-and-david-alan-grier/"
        },
        {
            "epi_id": "/shows/crank-yankers/episode/1786808/sarah-silverman-abbi-jacobson-and-will-forte/",
            "show": "Crank Yankers",
            "episode": "Sarah Silverman, Abbi Jacobson & Will Forte",
            "description": "AIRED OCTOBER 30, 2019",
            "link": "http://www.much.com/shows/crank-yankers/episode/1786808/sarah-silverman-abbi-jacobson-and-will-forte/"
        }
    ];

describe('Tests with the crawl manager', function(){
    before(function(done){
        mongoose.connection.dropDatabase();
        Episode.insertMany(database_1, function(err, docs){
           if (err){
               console.error(err);
           }
        done();
        });
    });

    after(function(done){
        mongoose.connection.dropDatabase(function(err){
            if (err){
                console.error(err);
            }
            done();
        });
    });

    it('web crawler input data to the database', function(done){
        Episode.updateUnlistedToTrue(function(err, epi){
            if (err){
                console.error(err);
            }
            expect(epi).to.have.property("n", 2);
        });
        episodeInputDatabase(mock_webcrawl_data_1)
            .then(function(){
                Episode.updateUnlistedNewReleaseToFalse(function(){
                    done();
                });
            });
    });

    it('the database should contain three documents', function(done){
        Episode.find({}, function(err, docs){
           expect(docs).to.be.an('array');
           expect(docs).to.have.length(3);
           done();
        });
    });

    it('expects episodes that are not crawled to be unlisted', function(done){
        Episode.findOne({
                "show": "Crank Yankers",
                "title": "Sarah Silverman, Tiffany Haddish & Kevin Nealon"},
            function(err, epi){
                if(err){
                    console.error(err);
                }
                expect(epi).to.have.property("unlisted", true);
                expect(epi).to.have.property("new_release", false);
                done();
            });
    });

    it('expects episodes that is in the database and crawled before to still not be unlisted but no longer new_release', function(done){
        Episode.findOne({
            "show": "Crank Yankers",
            "title": "Jimmy Kimmel, Tracy Morgan & David Alan Grier"
        }, function(err, epi){
            if(err){
                console.error(err);
            }
            expect(epi).to.have.property("unlisted", false);
            expect(epi).to.have.property("new_release", false);
            done();
        });
    });

    it('expects episode that has not been crawled before to not be unlisted and new_release', function(done){
        Episode.findOne({
            "show": "Crank Yankers",
            "title": "Sarah Silverman, Abbi Jacobson & Will Forte"
        }, function(err, epi){
            expect(epi).to.have.property("unlisted", false);
            expect(epi).to.have.property("new_release", true);
            done();
        });
    });
});