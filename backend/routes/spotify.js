const express = require("express");
const router = express.Router();
const querystring = require("querystring");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "8040bfb023be4a209be0ce593ec3df47";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "88f8e5dbf0374f75bfd36f503bc3023d";
let REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || "AQA2ofSUnTe55pol9ynN5mAFwla22yJJH9428tsX_ooFQiQG-q7LVazRJmZ2pmOsJrmyFJt6QsYhGv1319eudu0QFC6PsnDuzKmmHpcG3PSyKenN5P183hC41Mg-cK5F1ww";

const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:5000/api/spotify/callback";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

// Helper function to get access token using refresh_token
async function getAccessToken() {
  if (!REFRESH_TOKEN) return null;

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

// 1. GET /api/spotify - Get Currently Playing or Recently Played Track
router.get("/", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    // Fallback track info if refresh token is not yet authorized or API call fails
    const defaultResponse = {
      isPlaying: false,
      title: "Starboy",
      artist: "The Weeknd, Daft Punk",
      album: "Starboy",
      albumImageUrl: "https://i.scdn.co/image/ab67616d0000b2734718e241261b0a43a0d5b10c",
      songUrl: "https://open.spotify.com/track/7lQWRAAufCSm0vxeVCUpN6",
    };

    if (!accessToken) {
      return res.json(defaultResponse);
    }

    // Try fetching currently playing track
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      if (song && song.item) {
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0]?.url;
        const songUrl = song.item.external_urls.spotify;

        return res.json({
          isPlaying,
          title,
          artist,
          album,
          albumImageUrl,
          songUrl,
        });
      }
    }

    // If not currently playing, fetch recently played track
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (recentlyPlayedRes.status === 200) {
      const recentData = await recentlyPlayedRes.json();
      const lastItem = recentData.items?.[0]?.track;

      if (lastItem) {
        return res.json({
          isPlaying: false,
          title: lastItem.name,
          artist: lastItem.artists.map((a) => a.name).join(", "),
          album: lastItem.album.name,
          albumImageUrl: lastItem.album.images[0]?.url,
          songUrl: lastItem.external_urls.spotify,
        });
      }
    }

    return res.json(defaultResponse);
  } catch (error) {
    console.error("Spotify API error:", error);
    return res.json({
      isPlaying: false,
      title: "Starboy",
      artist: "The Weeknd, Daft Punk",
      album: "Starboy",
      albumImageUrl: "https://i.scdn.co/image/ab67616d0000b2734718e241261b0a43a0d5b10c",
      songUrl: "https://open.spotify.com/track/7lQWRAAufCSm0vxeVCUpN6",
    });
  }
});

// 2. GET /api/spotify/login - Redirect to Spotify Auth
router.get("/login", (req, res) => {
  const scope = "user-read-currently-playing user-read-recently-played";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
      })
  );
});

// 3. GET /api/spotify/callback - OAuth Callback to get Refresh Token
router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  try {
    const tokenRes = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const data = await tokenRes.json();
    if (data.refresh_token) {
      REFRESH_TOKEN = data.refresh_token;
      process.env.SPOTIFY_REFRESH_TOKEN = data.refresh_token;

      res.send(`
        <div style="font-family: sans-serif; background: #09090b; color: white; padding: 40px; text-align: center;">
          <h1 style="color: #1ed760;">Spotify Connected Successfully! 🎉</h1>
          <p>Your Spotify Refresh Token is:</p>
          <input value="${data.refresh_token}" style="width: 80%; padding: 12px; font-family: monospace; background: #18181b; color: #1ed760; border: 1px solid #27272a; border-radius: 8px;" readonly />
          <p style="margin-top: 20px; color: #a1a1aa;">Add <code>SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</code> to your <code>backend/.env</code> file.</p>
          <a href="http://localhost:3000" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #1ed760; color: black; border-radius: 20px; text-decoration: none; font-weight: bold;">Return to Portfolio</a>
        </div>
      `);
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
