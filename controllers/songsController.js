const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getOneSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/song");

// GET all songs
// localhost:3001/songs/
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
});

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneSong = await getOneSong(id);
  if (oneSong) {
    res.status(200).json(oneSong);
  } else {
    res.status(404).json({ error: "Song Not Found" });
  }
});

module.exports = songs;
