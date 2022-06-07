
require("dotenv").config();

// Twitter library
const { TwitterApi } = require('twitter-api-v2');

// We need to include our configuration file
const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);
// Tell typescript it's a readonly app
const T = twitterClient.readOnly;

function fetchFollowers (user_id) {
  T.v2.following(user_id).then(data => {
    console.log("data: ", data);
  })
  .catch(err => {
    console.log("err: ", err);
  })
}

function fetchId () {

}


// Try to fetch followers as soon as we run the program...
fetchId();
fetchFollowers()
// ...and then every min after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(fetchFollowers, 1000 * 60 * 1)
