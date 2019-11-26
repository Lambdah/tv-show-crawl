const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// const uri = process.env.MONGO_URI;
const uri = 'mongodb://localhost/test';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const conn = mongoose.connection;
conn.once('open', function(){
   console.log("Successfully connected to the database");
});

const episodeRouter = require('./routes/episodes');

app.use('/episodes', episodeRouter);

app.listen(port, ()=> {
    console.log(`Server running on: ${port}`);
});

module.exports = app;