const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
let config = require('config');
const {User, Show} = require('./schema/userSchema');
const Episode = require('./schema/episodeSchema');
const path = require('path');

const app = express();
app.use(cors());
const port = config.PORT || 5000;


mongoose.connect(config.DBHost, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
const conn = mongoose.connection;
conn.once('open', function(){
   console.log("Successfully connected to the database");
   if(process.env.NODE_ENV !== 'test'){
       // showCrawl();
   }
});

app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('combined'));
}

app.use(express.static(path.join(__dirname, 'build')));

const checkJwt = require('./routes/checkJwt');

app.post('/api/users', checkJwt, (req, res) => {
    const {email} = req.body;
    if (req.user.email !== email) return res.status(401);
    let userQuery = User.where({email: email});
    userQuery.findOne(function(err, user){
       if (err){
           console.error(err);
           return res.status(500).send();
       }
       if (user){
            res.status(200).json(user.subscribedShows);
       }else{
            const newUser = new User({email: email});
            newUser.save(function(err){
               if(err){
                   console.error(err);
                   return res.status(406).send();
               }
            });
       }
    });
});


app.post('/api/users/subscribed', checkJwt, (req, res) =>{
    const email = req.user.email;
    const {tvShow, isSub} = req.body;
    let userQuery = User.where({email: email});
    userQuery.findOne(function(err, user){
        try{
            if (isSub){
                user.subscribedShows.push(new Show({title: tvShow}));
            } else {
                user.subscribedShows = user.subscribedShows.filter(show => show.title !== tvShow);
            }
            user.save();
        }
        catch(err){
            if(err instanceof TypeError){
                console.log("It is a type error");
                user.subscribedShows.push({title: tvShow});
                user.save();
            }else{
                console.error(err);
            }
        }

    });
});

app.post('/api/users/shows/:pagination', checkJwt, (req, res) => {
    const email = req.user.email;
    const pagination = req.params.pagination;
    const pageSize = 24;
    const query = User.findOne({email: email}).select('subscribedShows');
    query.exec((err, shows) => {
        if (err){
            console.log(err);
            res.json({err: 'Error has occurred'});
        }
        const subShows = shows.subscribedShows.map(show => {return new RegExp(show.title, "i")});
        try{
            const episodeQuery = Episode.find({show: {$in: subShows}}).sort({date: -1, episode: -1, season: -1}).limit(pageSize).skip(pageSize*pagination);
            episodeQuery.exec((err, episode) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({error: 'Error has occurred'});
                }
                res.status(200).json(episode);
            });
        } catch (err) {
            console.error('Error' + err);
            res.status(500).json({err: 'Error has occurred'});
        }

    });
});

const episodeRouter = require('./routes/episodes');
app.use('/api/episodes', episodeRouter);

const networkRouter = require('./routes/networks');
app.use('/api/networks', networkRouter);

app.listen(port, ()=> {
    console.log(`Server running on: ${port}`);
});

module.exports = app;