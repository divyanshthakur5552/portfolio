"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, Disc3 } from "lucide-react";
import { motion } from "framer-motion";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album?: string;
  albumImageUrl: string;
  songUrl: string;
}

export default function SpotifyWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSpotifyTrack = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      let res;
      try {
        res = await fetch(`${backendUrl}/api/spotify`, { cache: "no-store" });
      } catch {
        res = await fetch("/api/spotify", { cache: "no-store" });
      }
      if (res.ok) {
        const data = await res.json();
        setTrack(data);
      }
    } catch (err) {
      console.error("Error fetching Spotify data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotifyTrack();
    const interval = setInterval(fetchSpotifyTrack, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 shrink-0" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3.5 bg-zinc-800 rounded w-32" />
          <div className="h-2.5 bg-zinc-800/60 rounded w-20" />
        </div>
      </div>
    );
  }

  if (!track) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 sm:gap-4 w-full"
    >
      {/* Track Album Art */}
      <a
        href={track.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 border border-zinc-800 shadow-md group"
      >
        <img
          src={track.albumImageUrl}
          alt={track.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        {track.isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Disc3 className="w-4 h-4 text-emerald-400 animate-spin" />
          </div>
        )}
      </a>

      {/* Song Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-xs sm:text-sm text-white hover:text-emerald-400 transition-colors truncate font-sans tracking-tight"
            title={track.title}
          >
            {track.title}
          </a>
          {track.isPlaying && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 shrink-0">
              <span className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 h-full bg-emerald-400 animate-[bounce_1s_infinite_100ms]" />
                <span className="w-0.5 h-full bg-emerald-400 animate-[bounce_1s_infinite_300ms]" />
                <span className="w-0.5 h-full bg-emerald-400 animate-[bounce_1s_infinite_200ms]" />
              </span>
            </span>
          )}
        </div>
        <p className="text-[11px] sm:text-xs text-zinc-400 truncate font-sans leading-tight" title={track.artist}>
          {track.artist}
        </p>
      </div>

      {/* External Link Icon */}
      <a
        href={track.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-500 hover:text-white transition-colors p-1 shrink-0"
        aria-label="Listen on Spotify"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}
