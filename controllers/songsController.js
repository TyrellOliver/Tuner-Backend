const express = require("express");
const songs = express.Router();


songs.get('/',(req,res)=>{
    res.json({songs:'Welcome to the songs route'})
});



module.exports = songs;