/* Import dependencies */
const Express = require("express"); // Import express
// const { URLSearchParams } = require("url"); // import URLSearchParams from url. You can also use form-data (in that case, this line would be const FormData = require('form-data');).
// const axios = require("axios"); // Import Axios
const bodyParser = require("body-parser"); // Import body-parser
const cors = require("cors");
const { fetchIds, fetchFollowing, handleFollowers } = require("./bot_await");

require("dotenv").config();

/* Client Variables */
const port = process.env.PORT || 8080; // Port to host on

/* Define app variables */
const app = Express(); // Create a web app
app.use(cors());

/* Configure the app */
app.use(Express.urlencoded({ extended: false })); // configure the app to parse requests with urlencoded payloads
app.use(Express.json()); // configure the app to parse requests with JSON payloads
app.use(bodyParser.text()); // configure the app to be able to read text

/* Handle GET Requests */
app.get("/", (req, res) => {
  // Handle incoming GET requests to http://localhost:(port)/
  // res.sendFile(path.join(__dirname + '/index.html')); // Send the index.html file
  res.send(
    `<p>Hey, hey! What's up? Looking for next alpha? ;)</p>`
  );
});

// TODO: Update this
app.get("/indigg/*", async (req, res) => {
  const influencerString = req.originalUrl.split("/indigg/");
  const influencersArray = influencerString.split(',');
  const influencerIds = await fetchIds(influencersArray);
//   await handleFollowers


  res.status(200).send(influencerIds);
});

// app.get("*", cors(corsOptions), (req, res) => {
//   res
//     .status(404)
//     .send(
//       "Hey, hey, pal! We really think you're lost. But don't worry, who isn't?"
//     );
// });

app.listen(port, () => {
  // Configure the app to "listen" on the specified port.
  console.log(`App listening! Link: http://localhost:${port}/`); // Log the fact our app is ready to the console.
});
