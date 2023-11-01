const express = require("express");
const songs = express.Router();

// GET all songs
// localhost:3001/songs/
songs.get('/',(req,res)=>{
    res.json({songs:'Welcome to the songs route'})
});



module.exports = songs;