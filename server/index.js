//////////////////////////
// Imports
//////////////////////////
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");

//////////////////////////
// Constants
//////////////////////////

const port = 8080;
const pathToDistFolder = path.join(__dirname, "../frontend/dist");
const app = express();

//////////////////////////
// Middleware/Controllers
//////////////////////////
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToDistFolder);

const serveGifs = async (req, res, next) => {
  const url = `https://api.giphy.com/v1/gifs/trending?limit=3&rating=g&api_key=${process.env.API_KEY}`;

  try {
    // This is pretty standard fetching logic
    const response = await fetch(url);
    const data = await response.json();
    const gifs = data.data.map((gif) => ({
      title: gif.title,
      url: gif.images.original.url,
    }));

    // send the fetched data to the client
    res.send(gifs);
  } catch (error) {
    // or send an error. 503 means the service is unavailable
    res.status(503).send(error);
  }
};

// Then, we make that controller available with an endpoint
app.get("/api/gifs", serveGifs);

app.use(logRoutes);
app.use(serveStatic);

//////////////////////////
// Listener
//////////////////////////

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
