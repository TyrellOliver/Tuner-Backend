const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getOneSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/song");

const {
  checkName,
  checkArtist,
  checkBoolean,
} = require("../validations/checkSongs");

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

songs.post("/", checkName, checkArtist, checkBoolean, async (req, res) => {
  const body = req.body;
  const newSong = await createSong(body);
  res.status(200).json(newSong);
});

songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json({ error: "Song Not Found" });
  }
});

songs.put("/:id", checkName, checkArtist, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updatedSong = await updateSong(id, body);
  if (updatedSong.id) {
    res.status(200).json(updatedSong);
  } else {
    res.status(404).json({ error: "Song Not Found" });
  }
});

module.exports = songs;
