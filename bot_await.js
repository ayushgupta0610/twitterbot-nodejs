
require("dotenv").config();

// Twitter library
const { TwitterApi } = require('twitter-api-v2');

// We need to include our configuration file
const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);
// Tell typescript it's a readonly app
const T = twitterClient.readOnly;
const influencers = ["0x5tryker"];

const fetchFollowers = async (user_id) => {
  try {
    const response = await T.v2.following(user_id);
    return response;
  } catch (err) {
    console.log("Error fetching followers:", err);
  }
}

const fetchIds = async () => {
  try {
    const response = await T.v2.usersByUsernames(influencers);
    return response;
  } catch (err) {
    console.log("Error fetching followers:", err);
  }
}

const handleFollowers = async (influencersIds) => {
  try {
    // fetchFollowers()
  } catch (err) {
    console.log("Error handling the influencers' followers list: ", err);
  }
}

fetchIds()
  .then(async (influencersIds) => await handleFollowers(influencersIds))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// ...and then every min after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
// setInterval(fetchFollowers, 1000 * 60 * 1)
