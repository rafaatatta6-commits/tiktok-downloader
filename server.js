const express = require("express");
const cors = require("cors");
const youtubedl = require("yt-dlp-exec");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "TikTok Downloader API is running" });
});

app.post("/api/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const result = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      skipDownload: true,
      format: "best",
    });

    res.json({
      title: result.title,
      downloadUrl: result.url,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not get video information"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
