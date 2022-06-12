
require("dotenv").config();

// Twitter library
const { TwitterApi } = require('twitter-api-v2');

// We need to include our configuration file
const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);
// Tell typescript it's a readonly app
const T = twitterClient.readOnly;
// const influencers = ["0x5tryker", "TheGameFiFarm", "kkowll", "playtern", "PlayFutureFund", "wassiecapital", "bottomd0g", "NicoVereecke", "SpeculatorArt", "MyNameIsJeff", "0xPrismatic", "cloudxgmf", "0xAikoDai", "chng_raymond", "0xRyze", "paytkaleiwahea", "p_petertherock", "MapleLeafCap", "PlayVentures", "CryptoMaestro", "retripaladin", "shreyansh_27", "ballmatthew", "KenrickLuneX", "fareastwitcher", "GreatBambin0", "EdC", "henricgames", "Fwiz", "nateliason", "SebPark", "Tocelot", "karipelaaja", "mikojava", "gabusch"];
const influencers = ["0x5tryker", "TheGameFiFarm", "kkowll", "playtern", "PlayFutureFund"];

const fetchFollowing = async (user_id) => {
  try {
    const response = await T.v2.following(user_id);
    return response?.data;
  } catch (err) {
    console.log("Error fetching followers:", err);
  }
}

const fetchIds = async () => {
  try {
    const response = await T.v2.usersByUsernames(influencers);
    return response?.data;
  } catch (err) {
    console.log("Error fetching followers:", err);
  }
}

const handleFollowers = async (influencersIds) => {
  try {
    // const followings = influencersIds.map(async ({ id }) => await fetchFollowing(id));
    let followings = [];
    let following;
    for (let i=0; i<influencersIds.length; i++) {
      following = await fetchFollowing(influencersIds[i].id);
      followings.push(following); // Array object of following list of the influencers/vcs 
    }
    console.log("followings: ", followings);
  } catch (err) {
    if (err.code == 429) {
      console.log("Try again after 15min");
    } else {
      console.log("Error handling the influencers' followers list: ", err);
    }
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
// setInterval(fetchFollowing, 1000 * 60 * 1)
