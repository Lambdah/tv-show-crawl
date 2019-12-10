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

describe('Testing that web crawler is getting the correct information', function(){
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