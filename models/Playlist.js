const SongModel = require('./Song');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
  },
  genre: {
    type: String,
    enum: ['pop', 'rap', 'r&b', 'disco', 'classical'],
    lowercase: true,
  },
  // songs: [SongModel.schema],
  songs: [{ type: Schema.Types.ObjectId, ref: 'songs' }],
});
module.exports = Playlist = mongoose.model('playlist', PlaylistSchema);
