const express = require('express');
const app = express();

const cors = require('cors');

const songsController = require('./controllers/songsController');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/songs', songsController);


app.get('/',(req,res)=>{
    res.send(`Welcome to the server!`)
})

module.exports = app;