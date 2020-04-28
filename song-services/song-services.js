const Playlist = require('../models/Playlist');
// const Song = require('../models/Song');

function addSong(playlistId, song) {
  try {
    console.log('here works!', song, playlistId);
    let playlist = Playlist.findByIdAndUpdate(
      playlistId,
      { $push: { songs: song } },
      { safe: true, upsert: true, new: true }
    );
    console.log('here works too but wont return playlist');

    return playlist;
  } catch (err) {
    return res, 'Error adding song';
  }
}
function updateSong(playlistId, songId, song) {
  try {
    let playlist = Playlist.findOneAndUpdate(
      { _id: playlistId, 'songs._id': songId },
      { $set: { 'songs.$.text': song.text } },
      { useFindAndModify: false }
    );
    return playlist;
  } catch (error) {
    const message = 'Could not update playlist';
    throw new Error(message);
  }
}
async function deleteSong(playlistId, songId, song) {}

// TO DO
// delete song

module.exports = {
  addSong,
  updateSong,
  deleteSong,
};
