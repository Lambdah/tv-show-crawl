const chai = require('chai');
const expect = chai.expect;
const path = require('path');
const config = require('config');
process.env.NODE_ENV = 'test';

const muchScrape = require('../backend/crawler/much/muchScrape');
const muchParse = require('../backend/crawler/much/muchParse');
const cityTVScrape = require('../backend/crawler/cityTV/cityTVScraper');
const cityTVParse = require('../backend/crawler/cityTV/cityTVParse');
const cbcScrape = require('../backend/crawler/cbc/cbcScraper');
const cbcParser = require('../backend/crawler/cbc/cbcParse');


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
                       title: 'South Park',
                       episode: 'Turd Burglars',
                       description: 'AIRED NOVEMBER 27, 2019',
                       link: 'http://www.much.com/shows/south-park/episode/1836304/turd-burglars/'
                   },
                   {
                       epi_id: '/shows/south-park/episode/1824093/board-girls/',
                       title: 'South Park',
                       episode: 'Board Girls',
                       description: 'AIRED NOVEMBER 27, 2019',
                       link: 'http://www.much.com/shows/south-park/episode/1824093/board-girls/'
                   },
                   {
                       epi_id: '/shows/south-park/episode/1816388/season-finale/',
                       title: 'South Park',
                       episode: 'Season Finale',
                       description: 'AIRED NOVEMBER 27, 2019',
                       link: 'http://www.much.com/shows/south-park/episode/1816388/season-finale/'
                   }
               ]);
               expect(episodes[0]).to.have.property('title', 'South Park');
               done();
            });
   });

   it('should not parse any episodes in Nathan For You', function(done){
       muchParse(config.MuchShowDir + "nathan-for-you/index.html")
           .then(function (episodes) {
               expect(episodes).to.be.null;
               done();
           })
           .catch(function(err){
               console.log(err);
           });
   });

   it('parses tosh.0 episodes', function(done){
       muchParse(config.MuchShowDir + "tosh0/index.html")
           .then(function(episodes){
               expect(episodes).to.have.length(2);
               expect(episodes).to.be.a('array');
               expect(episodes[0]).to.have.property('title', 'Tosh.0');
               done();
           });
   });

   it('parses The Simpsons to have no episodes', function(done){
        muchParse(config.MuchShowDir + "the-simpsons/index.html")
            .then(function(episodes){
                expect(episodes).to.be.null;
                done();
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