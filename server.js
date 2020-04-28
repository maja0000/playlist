require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const playlist = require('./routes/api/playlists');

const db = require('./config/keys').mongoURI;
// const db = "mongodb://localhost:27017/music"
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected!!'))
  .catch((err) => console.log(err));

app.use('/', playlist);

const port = 5000;

app.listen(port, () => console.log(`server running on ${port}`));
