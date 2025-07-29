// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// app.use(cors());

// const API_KEY = process.env.NEWS_API_KEY;

// const API_KEY = process.env.NEWS_API_KEY;

// app.get("/", (req, res) => {
//   res.send(" News Proxy Backend is running!");
// });

// app.get("/news", async (req, res) => {
//   try {
//     const { category = "general", country = "us" } = req.query;

//     // Build API URL with query params
//     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch news" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();

const API_KEY = process.env.NEWS_API_KEY;

app.get("/news", async (req, res) => {
  try {
    const { category = "general", country = "us" } = req.query;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(500).json({ error: data.message || "NewsAPI error" });
    }

    res.json(data);
  } catch (err) {
    console.error("Backend fetch error:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
