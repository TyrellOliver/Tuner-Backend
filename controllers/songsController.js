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

// This handles all the req queries
const queries = async (req, res, next) => {
  const { order, is_favorite } = req.query;
  let allSongs = await getAllSongs();
  // console.log(allSongs);
  if (order === "asc") {
    allSongs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (order === "desc") {
    allSongs.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (is_favorite !== undefined) {
    const isFavorite = is_favorite.toLowerCase() === "true";
    allSongs = allSongs.filter((song) => song.is_favorite === isFavorite);
  }

  res.sortedSongs = allSongs;
  next();
};

// Getting all songs
// localhost:3001/songs/
songs.get("/", queries, async (req, res) => {
  console.log("This is the query string: ", req.query);

  // const allSongs = await getAllSongs();

  if (res.sortedSongs) {
    res.status(200).json(res.sortedSongs);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
});

// Getting one song
songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneSong = await getOneSong(id);
  if (oneSong) {
    res.status(200).json(oneSong);
  } else {
    res.status(404).json({ error: "Song Not Found" });
  }
});

// Creating one song
songs.post("/", checkName, checkArtist, checkBoolean, async (req, res) => {
  const body = req.body;
  const newSong = await createSong(body);
  res.status(200).json(newSong);
});

// Deleting one song
songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json({ error: "Song Not Found" });
  }
});

// Updating a song
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
