
require("dotenv").config();

// Twitter library
const { TwitterApi } = require('twitter-api-v2');

// We need to include our configuration file
const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);
// Tell typescript it's a readonly app
const T = twitterClient.readOnly;

const fetchFollowers = (user_id) => {
  T.v2.following(user_id).then(data => {
    console.log("data: ", data);
  })
  .catch(err => {
    console.log("err: ", err);
  })
}

module.exports = {
  fetchFollowers
}