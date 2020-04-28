const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
  },
  artist: {
    type: String,
    lowercase: true,
  },
  album_picture: {
    type: String,
    lowercase: true,
  },
  youtube_url: {
    type: String,
    lowercase: true,
  },
});
module.exports = Song = mongoose.model('song', SongSchema);
