require('dotenv').config();

module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@test1-ci6xu.mongodb.net/test?retryWrites=true&w=majority`,
};
