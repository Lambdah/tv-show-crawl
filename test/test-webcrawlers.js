const chai = require('chai');
const should = chai.expect;
const path = require('path');
const config = require('config');
process.env.NODE_ENV = 'test';

const muchScrape = require('../backend/crawler/much/muchScrape');

describe('Testing web crawlers', function(){
   it('should webcrawl MUCH website', function(done){
       muchScrape(config.MuchHomeIndex)
           .then(function(links){
              console.log(links);
              expect(links).to.have.length(6);
              expect(links).to.be.a('array');
              done();
           });
   });
});