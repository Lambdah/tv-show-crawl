// const config = require('config');
const chai = require('chai');
const expect = chai.expect;
const OMDb = require('../api/OMDb_api');
const {test_data, network_data} = require('../mock-data/data');
const Episode = require('../schema/episodeSchema');
const Network = require('../schema/networkSchema');
const mongoose = require('mongoose');
process.env.NODE_ENV = 'test'
/**
 * Only 1000 API requests a day for the free tier
 */
/

describe('OMDb network api', function(){

    after(function(done){
        const db = mongoose.connection;
        db.dropDatabase(() => { done(); });
    });

    it('gets the data for South Park in the API', function(done){
        OMDb(new Network({
            network: 'much',
            tvTitle: 'South Park'
        }))
            .then(result => {
                expect(result).to.have.property('metaTags').to.include('Comedy');
                expect(result).to.have.property('metaTags').to.include('Animation');
                expect(result).to.have.property('synopsis').to.be.a('string');
                result.save(err => {
                    if (err){
                        throw new Error('Error: ' + err);
                    }
                    done()
                });
            });
    });

    it('gets the data for Jasper & Errol\'s First Time in the API', function(done){
        OMDb(new Network({
            network: 'much',
            tvTitle: 'Jasper & Errol\'s First Time'
        }))
            .then(result => {
                expect(result).to.have.property('tvTitle').to.be.eql('Jasper and Errol\'s First Time');
                expect(result).to.have.property('synopsis').to.be.a('string');
                expect(result).to.have.property('metaTags').to.include('Reality-TV');
                result.save(err => {
                    if (err){
                        throw new Error('Error: ' + err);
                    }
                    done()
                });
            });
    });

    it('gets data for Tosh.0', function(done){
        OMDb(new Network({
            network: 'much',
            tvTitle: 'Tosh.0'
        }))
            .then(result => {
                expect(result).to.have.property('tvTitle').to.be.eql('Tosh.0');
                expect(result).to.have.property('synopsis').to.be.a('string');
                expect(result).to.have.property('metaTags').to.include('Comedy');
                result.save(err => {
                    if (err){
                        throw new Error('Error: ' + err);
                    }
                    done();
                });
            });
    });

    it('does not get any data for TV show that does not exist', function(done){
        OMDb(new Network({
            network: 'much',
            tvTitle: 'Does asdfnot existasdf'
        }))
           .then(result => {
              expect(result).to.have.property('error').to.be.eql('Does not exist.');
              done();
           });
    });

    it('checks to see if networks saved in the database', function(done){
        Network.findOne({tvTitle: 'South Park'}, function(err, epi){
           if (err) {
               throw new Error('Error: ' + err);
           }
           expect(epi).to.have.property('network').to.be.eql('much');
           done();
        });
    });
});

describe('OMDb episode api', function(){
    after(function(done){
        const db = mongoose.connection;
        db.dropDatabase(() => { done(); });
    });

    it('gets the episode information of South Park', function(done){
        OMDb(new Episode({
            show: 'South Park',
            episode_name: 'Tegridy Farms Halloween Special',
            season: 23,
            episode_num: 5
        }))
            .then(result => {
                console.log(result);
                expect(result).to.have.property('release_date').to.be.eql('30 Oct 2019');
                done();
            })
    });
});