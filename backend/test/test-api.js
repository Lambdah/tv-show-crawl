// const config = require('config');
const chai = require('chai');
const expect = chai.expect;
const api = require('../api/OMDb_api');
const {test_data, network_data} = require('../mock-data/data');
process.env.NODE_ENV = 'test'
/**
 * Only 1000 API requests a day for the free tier
 */
/

describe('OMDb api', function(){
    it('gets the data for South Park in the API', function(done){
        api('South Park')
            .then(result => {
                expect(result).to.have.property('tvTitle').to.be.eql('South Park');
                expect(result).to.have.property('synopsis').to.be.a('string');
                expect(result).to.have.property('metaTags').to.include('Comedy');
                expect(result).to.have.property('metaTags').to.include('Animation');
                done();
            });
    });

    it('gets the data for Jasper & Errol\'s First Time in the API', function(done){
        api('Jasper & Errol\'s First Time')
            .then(result => {
                expect(result).to.have.property('tvTitle').to.be.eql('Jasper and Errol\'s First Time');
                expect(result).to.have.property('synopsis').to.be.a('string');
                expect(result).to.have.property('metaTags').to.include('Reality-TV');
                done();
            });
    });

    it('gets data for Tosh.0', function(done){
       api('Tosh.0')
           .then(result => {
               expect(result).to.have.property('tvTitle').to.be.eql('Tosh.0');
               expect(result).to.have.property('synopsis').to.be.a('string');
               expect(result).to.have.property('metaTags').to.include('Comedy');
               done();
           });
    });

    it('does not get any data for TV show that does not exist', function(done){
       api('ShowDoesNotExist')
           .then(result => {
              expect(result).to.have.property('error').to.be.eql('Does not exist.');
              done();
           });
    });
});