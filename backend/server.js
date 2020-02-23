const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
let config = require('config');
const {crawlManager} = require('./crawler/crawlManager');

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

const episodeRouter = require('./routes/episodes');
app.use('/episodes', episodeRouter);

const networkRouter = require('./routes/networks');
app.use('/networks', networkRouter);

app.post('/users/', checkJwt, (req, res) => {
   const {username} = req.body;
   res.status(200).send();
});


app.listen(port, ()=> {
    console.log(`Server running on: ${port}`);
});

module.exports = app;