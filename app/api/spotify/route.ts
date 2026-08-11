import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "8040bfb023be4a209be0ce593ec3df47";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "88f8e5dbf0374f75bfd36f503bc3023d";
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || "AQA2ofSUnTe55pol9ynN5mAFwla22yJJH9428tsX_ooFQiQG-q7LVazRJmZ2pmOsJrmyFJt6QsYhGv1319eudu0QFC6PsnDuzKmmHpcG3PSyKenN5P183hC41Mg-cK5F1ww";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  if (!REFRESH_TOKEN) return null;

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    next: { revalidate: 0 },
  });

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  const defaultResponse = {
    isPlaying: false,
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    album: "Starboy",
    albumImageUrl: "https://i.scdn.co/image/ab67616d0000b2734718e241261b0a43a0d5b10c",
    songUrl: "https://open.spotify.com/track/7lQWRAAufCSm0vxeVCUpN6",
  };

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json(defaultResponse);
    }

    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      if (song && song.item) {
        return NextResponse.json({
          isPlaying: song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((a: any) => a.name).join(", "),
          album: song.item.album.name,
          albumImageUrl: song.item.album.images[0]?.url,
          songUrl: song.item.external_urls.spotify,
        });
      }
    }

    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (recentlyPlayedRes.status === 200) {
      const recentData = await recentlyPlayedRes.json();
      const lastItem = recentData.items?.[0]?.track;

      if (lastItem) {
        return NextResponse.json({
          isPlaying: false,
          title: lastItem.name,
          artist: lastItem.artists.map((a: any) => a.name).join(", "),
          album: lastItem.album.name,
          albumImageUrl: lastItem.album.images[0]?.url,
          songUrl: lastItem.external_urls.spotify,
        });
      }
    }

    return NextResponse.json(defaultResponse);
  } catch (error) {
    return NextResponse.json(defaultResponse);
  }
}
