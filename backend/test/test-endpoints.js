let mongoose = require("mongoose");
let Episode = require("../schema/episodeSchema");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../server");
let should = chai.should();
let db_data = require("../mock-data/data");
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe('Episode',function() {
    before(function (done) {
        mongoose.connect('mongodb://localhost/test',
            {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
            .catch(function (err) {
                console.log("Make sure mongo is running locally by - 'sudo mongod'");
                console.error(err)
            });
        mongoose.connection.db.dropDatabase();
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

    it('/episodes retrieve all the episodes in the database', function(done){
        chai.request(server)
            .get('/episodes')
            .end(function(err, res){
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(18);
               done();
            });
    });

    it('/episodes/tv/South Park should get all the episodes of South Park', function(done){
        chai.request(server)
            .get('/episodes/tv/South Park')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
                done();
            });
    });

    it('/episodes/tv/south park should be case insensitive to get all episodes', function(done){
        chai.request(server)
            .get('/episodes/tv/south park')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
                done();
            });
    });

    it('/episodes/tv/Crank Yankers retrieve all Crank Yankers episodes', function(done){
       chai.request(server)
           .get('/episodes/tv/Crank Yankers')
           .end(function(err, res){
               if(err){
                   console.error(err);
               }
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(3);
               done();
           });
    });

    it('/episodes/tv/Danny\'s House retrieve all Danny House episodes', function(done){
        chai.request(server)
            .get('/episodes/tv/Danny\'s House')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
                done();
            });
    });

    it('/episodes/tv/Jasper & Errol\'s First Time retrieve all Jasper & Errol episodes', function(done){
        chai.request(server)
            .get('/episodes/tv/Jasper & Errol\'s First Time')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
                done();
            });
    });

    it('/episodes/tv/Tosh.0 retrieves all Tosh.0 episodes', function(done){
        chai.request(server)
            .get('/episodes/tv/Tosh.0')
            .end(function(err, res){
                if (err){
                    console.error(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
                done();
            })
    });

    it('/episodes/tv/South Park/Tegridy Farms Halloween Special retrieve a single episode', function(done){
        chai.request(server)
            .get('/episodes/tv/South Park/Tegridy Farms Halloween Special')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });
    it('/episodes/tv/South Park/Let Them Eat Goo retrieve a single episode', function(done){
        chai.request(server)
            .get('/episodes/tv/South Park/Let Them Eat Goo')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('/episodes/tv/lkjasdfnml should get 404 error for no tv show', function(done){
        chai.request(server)
            .get('/episodes/tv/lkjasdfnml')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(404);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('/episodes/tv/lkjasdfnml/lkiajdkd should get 404 error for no tv show and episode', function(done){
        chai.request(server)
            .get('/episodes/tv/lkjasdfnml/lkiajdk')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(404);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('/episodes/tv/south park/No Show South Park should get 400 error for exist tv show and no episode', function(done){
        chai.request(server)
            .get('/episodes/tv/South Park/No Show South Park')
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(404);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('/episodes/add/ adds a new tv show and episode', function(done){
        let episode = {
            title: "South Park",
            episode_name: "Cartman Gets an Anal Probe",
            description: "Cartman tells his friends Stan, Kyle, and Kenny he had a dream about being abducted by aliens. The boys realize that this did actually happen when Kyle's baby brother, Ike is abducted also. They manage to rescue Ike while the aliens conclude that cows are the most intelligent species on the planet.",
            episode_url: "https://www.much.com/shows/south-park/episode/1824093/Cartman-Gets-an-Anal-Probe/"
        };
        chai.request(server)
            .post('/episodes/add')
            .send(episode)
            .end(function(err, res){
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.include({status: "Episode Added"});
               done();
            });
    });

    it('/episodes/:id get the id of a tv show episode', function(done){
        let epi_id = new Promise(function(resolve, reject){
            chai.request(server)
                .get('/episodes/tv/South Park/Cartman Gets an Anal Probe')
                .end(function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res.body[0]._id);
                });
        });
        epi_id.then(function(_id){
            chai.request(server)
                .get('/episodes/'+_id)
                .end(function(err, res){
                    if(err){
                        console.error(err)
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.include({
                        title: 'South Park',
                        episode_name: 'Cartman Gets an Anal Probe'});
                    done();
                });
        });
    });

    it('/episodes/:id if the id does not exist, it should give 400', function(done){
        chai.request(server)
            .get('/episodes/kldj390klad903jklam_')
            .end(function(err, res){
               res.should.have.status(400);
               done();
            });
    });

    it('/episodes/update/:id should update the current episode', function(done){
        let epi_id = new Promise(function(resolve, reject){
            chai.request(server)
                .get('/episodes/tv/South Park/Cartman Gets an Anal Probe')
                .end(function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res.body[0]._id);
                });
        });

        epi_id.then(function(_id){
            let episode = {
                title: "South Park",
                episode_name: "Cartman Gets an Anal Probe",
                description: "Updated description",
                episode_url: "https://www.much.com/shows/south-park/episode/57271/Cartman-Gets-an-Anal-Probe/"
            };
            chai.request(server)
                .post('/episodes/update/' + _id)
                .send(episode)
                .end(function(err, res){
                    if (err){
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.include({
                        title: 'South Park',
                        episode_name: 'Cartman Gets an Anal Probe',
                        description: 'Updated description',
                        episode_url: 'https://www.much.com/shows/south-park/episode/57271/Cartman-Gets-an-Anal-Probe/'

                    });
                    done();
                });
        });
    });

    it('/episodes/update/:id should give error if id does not exist', function(done){
        let episode = {
            title: "South Park",
            episode_name: "Cartman Gets an Anal Probe",
            description: "random description",
            episode_url: "https://www.much.com/shows/south-park/episode/57271/Cartman-Gets-an-Anal-Probe/"
        };
        chai.request(server)
            .post('/episodes/update/390nmjsdaklfma90p8')
            .send(episode)
            .end(function(err, res){
                if (err){
                    console.error(err);
                }
                res.should.have.status(404);
                done();
            });
    });

    it('/episodes/update/:id should give 400 error if the json ' +
        'does not have the episode name, description, and url', function(done){
        let epi_id = new Promise(function(resolve, reject){
            chai.request(server)
                .get('/episodes/tv/South Park/Cartman Gets an Anal Probe')
                .end(function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res.body[0]._id);
                });
        });

        epi_id.then(function(_id){
            let episode = {};
           chai.request(server)
               .post('/episodes/update/' + _id)
               .send(episode)
               .end(function(err, res){
                   if (err){
                       console.error(err);
                   }
                   res.should.have.status(400);
                   res.body.should.include({
                       err: "TV show, Episode Name and Episode URL must not be empty"
                   });
                   done();
               });
        });
    });

    it('/episodes/update/:id should give 400 error if json only has episode name', function(done){
        let epi_id = new Promise(function(resolve, reject){
            chai.request(server)
                .get('/episodes/tv/South Park/Cartman Gets an Anal Probe')
                .end(function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res.body[0]._id);
                });
        });

        epi_id.then(function(_id){
            let episode = {
                title: "South Parker"
            };
            chai.request(server)
                .post('/episodes/update/' + _id)
                .send(episode)
                .end(function(err, res){
                    if (err){
                        console.error(err);
                    }
                    res.should.have.status(400);
                    res.body.should.include({
                        err: "TV show, Episode Name and Episode URL must not be empty"
                    });
                    done();
                });
        });
    });

    it('/episodes/update/new/:id updates the episode so new_release is false', function(done){
        let epi_id = new Promise(function(resolve, reject){
            chai.request(server)
                .get('/episodes/tv/South Park/Cartman Gets an Anal Probe')
                .end(function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res.body[0]._id);
                });
        });

        epi_id.then(function(_id){
            let new_r = {new_release:"false"};
            chai.request(server)
                .post('/episodes/update/new/' + _id)
                .send(new_r)
                .end(function(err, res){
                    if(err){
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.include({
                       new_release: false,
                       title: 'South Park',
                       episode_name: 'Cartman Gets an Anal Probe'
                    });
                    done();
                });
        });
    });

    it('/episodes/update/new/:id does not update if the id does not exist', function(done){
        chai.request(server)
            .post('/episodes/update/new/89023nmjiodfjio23dal')
            .send({new_release: "false"})
            .end(function(err, res){
                if(err){
                    console.error(err);
                }
                res.should.have.status(404);
                res.body.should.include({ err: 'No associated id with 89023nmjiodfjio23dal' });
                done();
            });
    });

    it('/episodes/update/new/:id gives 400 when property is not true or false', function(done){
        let epi_id = new Promise(function(resolve, reject){
            chai.request(server)
                .get('/episodes/tv/South Park/Cartman Gets an Anal Probe')
                .end(function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res.body[0]._id);
                });
        });

        epi_id.then(function(_id){
            let new_r = {new_release: "truthy"};
            chai.request(server)
                .post('/episodes/update/new/' + _id)
                .send(new_r)
                .end(function(err, res){
                    res.should.have.status(400);
                    res.body.should.include({ err: 'Property of new_release is a boolean' });
                    done();
                });
        });
    });
});
