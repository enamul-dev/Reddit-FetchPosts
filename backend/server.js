const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/reddit/:subreddit", async (req, res) => {
  try {
    const { subreddit } = req.params;

    const url = `https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=${encodeURIComponent(subreddit)}&limit=25&sort=desc`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});