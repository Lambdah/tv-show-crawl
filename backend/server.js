const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
let config = require('config');
const {crawlManager} = require('./crawler/crawlManager');
const User = require('./schema/userSchema');

const app = express();
const port = config.PORT || 5000;


mongoose.connect(config.DBHost, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
const conn = mongoose.connection;
conn.once('open', function(){
   console.log("Successfully connected to the database");
   if(process.env.NODE_ENV !== 'test'){
       // crawlManager();
   }
});

app.use(express.json());
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('combined'));
}

const checkJwt = require('./routes/checkJwt');

app.post('/users', checkJwt, (req, res) => {
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

app.get('/users/subscribed', checkJwt, (req, res) => {
   const {email} = req.user.email;
   let userQuery = User.where({email: email});
   userQuery.findOne(function(err, user){
      if(err) return res.status(500).send();
      res.status(200).json({subscribedShows: user.subscribedShows});
   });
});

app.post('/users/subscribed', checkJwt, (req, res) =>{
    const email = req.user.email;
    const {tvShow} = req.body;
    let userQuery = User.where({email: email});
    userQuery.findOne(function(err, user){
        if (err) return res.status(500).send();
        const isSubscribed = user.subscribedShows.includes(tvShow);
        if(isSubscribed){
            return user.subscribedShows = user.subscribedShows.filter(show => show !== tvShow);
        }else{
            return user.subscribedShows.append(tvShow);
        }
    }).then(function(user){
        user.save(function(err){
            if (err){
                console.error(err);
                res.status(500).send();
            }
        });
    });
});

const episodeRouter = require('./routes/episodes');
app.use('/episodes', episodeRouter);

const networkRouter = require('./routes/networks');
app.use('/networks', networkRouter);




app.listen(port, ()=> {
    console.log(`Server running on: ${port}`);
});

module.exports = app;