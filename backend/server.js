const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
let config = require('config');

const app = express();
const port = config.PORT || 5000;


mongoose.connect(config.DBHost, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const conn = mongoose.connection;
conn.once('open', function(){
   console.log("Successfully connected to the database");
});

app.use(express.json());
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('combined'));
}

const episodeRouter = require('./routes/episodes');
app.use('/episodes', episodeRouter);



app.listen(port, ()=> {
    console.log(`Server running on: ${port}`);
});

module.exports = app;