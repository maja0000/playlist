const express = require('express');
const router = express.Router();
const SongService = require('../../song-services/song-services');

const Playlist = require('../../models/Playlist');
const Song = require('../../models/Song');

// get all playlists
// localhost:5000/
// works

router.get('/', (req, res, next) => {
  Playlist.find()
    .sort({ title: 1 })
    .then((p) => res.json(p))
    .catch(next);
});
// get all songs
// localhost:5000/songs
// works

router.get('/songs', (req, res, next) => {
  Song.find()
    .sort({ title: 1 })
    .then((s) => res.json(s))
    .catch(next);
});
// get playlist by id
// localhost:5000/id
// works

router.get('/:id', (req, res, next) => {
  Playlist.findById(req.params.id)
    .then((s) => res.json(s))
    .catch(next);
});

// get song by id
// localhost:5000/songs/id
// works

router.get('/songs/:id', (req, res, next) => {
  Song.findById(req.params.id)
    .then((s) => res.json(s))
    .catch(next);
});

// create new playlist
// localhost:5000/
// works

router.post('/', (req, res, next) => {
  const data = req.body;
  const newPlaylist = new Playlist(data);
  newPlaylist
    .save()
    .then((p) => res.json(p))
    .catch(next);
});

// create song outside any playlist
// localhost:5000/song
// works

router.post('/song', (req, res, next) => {
  const data = req.body;
  const newSong = new Song(data);
  newSong
    .save()
    .then((s) => res.json(s))
    .catch(next);
});

// create/add new song into a playlist
// localhost:5000/id/song
// ❌❌❌ // doesnt work

router.post('/:id/songs', async (req, res) => {
  try {
    const resData = await SongService.addSong(req.params.id, req.body);
    return res, resData, 'Your song has been added';
  } catch (err) {
    return res, 'Error adding song';
  }
});

// edit song inside playlist
// localhost:5000/:id/songs/:songid
// ❌❌❌ // doesnt work

router.put('/:id/songs/:songid', async (req, res, next) => {
  try {
    const resData = await SongService.updateSong(
      req.params.id,
      req.params.songs_id,
      req.body
    );
    return responses.returnDataSuccess(res, resData, 'Updated song');
  } catch (err) {
    return next(err);
  }
});

// delete playlist
// localhost:5000/:id
// works

router.delete('/:id', (req, res) => {
  Playlist.findById(req.params.id)
    .then((p) =>
      p.remove().then(() => res.json({ res: 'playlist succesfully deleted' }))
    )
    .catch((err) => res.status(404).json({ res: 'failed to delete' }));
});

// update playlist
// localhost:5000/:id
// works
router.put('/:id', (req, res, next) => {
  Playlist.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((p) => res.json(p))
    .catch(next);
});

// update song
// localhost:5000/songs/:id
// works
router.put('/songs/:id', (req, res, next) => {
  Song.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((p) => res.json(p))
    .catch(next);
});

module.exports = router;
