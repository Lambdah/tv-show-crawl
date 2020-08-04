const assert = require('chai').assert;
const process = require('process')
const {spawn} = require('child_process')
const {describe} = require('mocha')
const AWS = require("aws-sdk");
const Dynamo = require("../dynamoDB/dynamo");


function spawnDocker(){
    const docker = spawn("docker", ["run", "-p", "8000:8000", "amazon/dynamodb-local"]);
    docker.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    docker.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    docker.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    docker.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });

    docker.on("exist", code => {
        console.log(`Exiting the code ${code}`);
    });

    docker.on('exit', () => {
        console.log("Stopping");
        process.exit(0);
    })

    process.on('SIGINT', () => {
        console.log("Interrupt")
        process.exit(0);
    });
    return docker;
}

function killDocker(docker){
    setTimeout(() => docker.kill('SIGINT'), 3000);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dbConnFactory(){
    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
    });
    return new AWS.DynamoDB();
}

const episodeData0 = [
    {
        "show": "What About Joan?",
        "title": "Free Speech",
        "info": {
            "date": 1593799938120,
            "new_release": true,
            "unlisted": false,
            "link": "https://www.ctv.ca/What-About-Joan/Video/S1E5-Free-Speech-vid1759897",
            "description": "Joan competes with other teachers to get money for her speech team after the school board cuts the budget.",
            "season": 1,
            "episode": 5,
            "poster": "https://images2.9c9media.com/image_asset/2019_9_4_b92bf664-1f0b-441c-9064-9882cbdf11d0_png_1920x1081.jpg",
            "network": "ctv"
        }
    },
    {
        "show": "What About Joan?",
        "title": "Betsy's Wedding",
        "info": {
            "date": 1593799938104,
            "new_release": true,
            "unlisted": false,
            "link": "https://www.ctv.ca/What-About-Joan/Video/S1E9-Betsys-Wedding-vid1759901",
            "description": "Joan's plans for Betsy and Mark's wedding go awry after a blizzard blankets Chicago.",
            "season": 1,
            "episode": 9,
            "poster": "https://images2.9c9media.com/image_asset/2019_9_4_c50e9297-86e0-4951-a087-fa5472912644_png_1920x1081.jpg",
            "network": "ctv"
        }
    },
    {
        "show": "The Flying Nun",
        "title": "Speak the Speech, I Pray You",
        "info": {
            "date": 1593799936696,
            "new_release": true,
            "unlisted": false,
            "link": "https://www.ctv.ca/The-Flying-Nun/Video/S3E3-Speak-the-Speech-I-Pray-You-vid1835414",
            "description": "Sister Bertrille gives a shy priest the confidence to face San Tanco.",
            "season": 3,
            "episode": 3,
            "poster": "https://images2.9c9media.com/image_asset/2020_1_15_91c08870-8356-46d7-9d52-f01fee8c1be8_png_1920x1080.jpg",
            "network": "ctv"
        }
    },
    {
        "show": "The Flying Nun",
        "title": "The Candid Commercial",
        "info": {
            "date": 1593799936618,
            "new_release": true,
            "unlisted": false,
            "link": "https://www.ctv.ca/The-Flying-Nun/Video/S3E22-The-Candid-Commercial-vid1835433",
            "description": "Sister Bertrille wins a washing machine by appearing in a commercial.",
            "season": 3,
            "episode": 22,
            "poster": "https://images2.9c9media.com/image_asset/2020_1_16_79a4c3e5-aff8-4523-97ff-052c31b01fbe_png_1920x1080.jpg",
            "network": "ctv"
        }
    }
    ,
    {
        "show": "The Flying Nun",
        "title": "The Dumbest Kid in School",
        "info": {
            "date": 1593799936635,
            "new_release": true,
            "unlisted": false,
            "link": "https://www.ctv.ca/The-Flying-Nun/Video/S3E18-The-Dumbest-Kid-in-School-vid1835429",
            "description": "The convent loses its biggest prankster, but Joey finds a father and a new home.",
            "season": 3,
            "episode": 18,
            "poster": "https://images2.9c9media.com/image_asset/2020_1_15_39a3b088-c7b4-40ad-8945-42bdd1398ece_png_1920x1080.jpg",
            "network": "ctv"
        }
    },
    {
        "show": "Judge Tyco",
        "title": "BANA WEEKEND WASTE YUTE",
        "info": {
            "date": 1593800024028,
            "new_release": true,
            "unlisted": false,
            "link": "https://www.much.com/shows/judge-tyco/episode/1589637/bana-weekend-waste-yute/",
            "season": 0,
            "episode": 0,
            "poster": "https://images2.9c9media.com/image_asset/2019_1_21_6e30793a-c870-4c53-9671-011dd8377217_jpg_1920x1080.jpg?size=200",
            "network": "much"
        }
    }
    ,
    {
        "show": "Judge Tyco",
        "title": "BLESSING LOOM BEEF",
        "info": {
            "date": 1593800024024,
            "new_release": true,
            "unlisted": false,
            "link": "https://www.much.com/shows/judge-tyco/episode/1589652/blessing-loom-beef/",
            "season": 0,
            "episode": 0,
            "poster": "https://images2.9c9media.com/image_asset/2019_1_21_8ccf25e8-9d08-4b38-9685-5109643d274e_JPG_1920x1080.jpg?size=200",
            "network": "much"
        }
    }
]

describe('#Dynamodb', function(){

    const docker = spawnDocker();
    const dynamo = new Dynamo("us-west-2", "http://localhost:8000")

    before(async function(){
        await sleep(4000);
    });

    after(async function(){
        await sleep(2000);
        killDocker(docker);
    });



    it('tests to see if Episodes table is created', function(done){
        dynamo.createEpisodesTable()
            .then(async function(){
                const conn = dbConnFactory();
                await conn.describeTable({TableName: "Episodes"}, async function (err, data) {
                    if (err) {
                        console.error(JSON.stringify(err, null, 2));
                    } else {
                        assert.equal(data.Table.ItemCount, 0, 'Table Episode was just created so contains no data.');
                        await sleep(1000);
                        done();
                    }
                })
            }).catch(function(err){
               console.error(JSON.stringify(err, null, 2));
               assert.fail('Failed to create the episode table.')
            });
    });

    it('tests to see if Shows table is created', function(done) {
        dynamo.createShowTable()
            .then(async function () {
                const conn = dbConnFactory();
                await conn.describeTable({TableName: "Shows"}, async function (err, data) {
                    if (err) {
                        console.error(JSON.stringify(err, null, 2));
                    } else {
                        assert.equal(data.Table.ItemCount, 0, 'Table was just created so contains no data.');
                        await sleep(1000);
                        done();
                    }
                })

            })
            .catch(function (err) {
                console.error(JSON.stringify(err, null, 2));
                assert.fail('Failed to create the shows table.')
            });
    })

    it('tests to see if the User table is created', function(done) {
       dynamo.createUserTable()
           .then(async function(){
                const conn = dbConnFactory();
                await conn.describeTable({TableName: "Users"}, async function(err, data) {
                    if (err){
                        console.error(JSON.stringify(err, null, 2));
                    } else {
                        assert.equal(data.Table.ItemCount, 0, 'Table was just created so contains no data.');
                        await sleep(1000);
                        done();
                    }
                })
           })
           .catch(function(err){
               console.error(JSON.stringify(err, null, 2));
               assert.fail('Failed to create the User\'s table.')
           });
    });

    it('inserts data into the DynamoDB Episode\'s table', function(done){
        Promise.all(episodeData0.map(episode => {
            return dynamo.insertEpisode(episode);
        }))
        .then(function(){
            done();
        })
        .catch(function(err){
            console.error(JSON.stringify(err, null, 2));
            assert.fail('Failed to insert episode data');
        });

    });

    it('queries What About Joan? DynamoDB Episodes table', function (done){
        try{
            dynamo.queryEpisode({show: "What About Joan?"})
                .then(function(data){
                    assert.equal(data.ScannedCount, 2, "Only two episodes were inserted");
                    done();
                })
        } catch (err) {
            console.error("Error " + JSON.stringify(err, null, 2));
            assert.fail('Failed to query What About Joan? Episodes table.');
        }
    });

    it('queries Judge Tyco DynamoDB Episodes table', function(done) {
        try {
            dynamo.queryEpisode({show: 'Judge Tyco'})
                .then(function(data){
                    assert.equal(data.ScannedCount, 2, "Only two episodes were inserted");
                    done();
                })
        } catch (err) {
            console.error("Error " + JSON.stringify(err, null, 2));
            assert.fail("Failed to query Judge Tyco episodes table.")
        }
    });

    it('queries The Flying Nun Episodes table', function(done) {
        try {
            dynamo.queryEpisode({show: 'Flying Nun'})
                .then(function(data){
                    assert.equal(data.ScannedCount, 3, "Only three episodes were inserted");
                    done();
                });
        } catch (err) {
            console.error("Error " + JSON.stringify(err, null, 2));
            assert.fail("Failed to query The Flying Nun episodes table.")
        }
    });

})