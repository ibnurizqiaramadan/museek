"use server";

import YTDlpWrap from "yt-dlp-wrap";
import os from "os";
import fs from "fs";
import { search } from "youtube-search-without-api-key";
import path from "path";

export const Search = async (query: string) => {
  try {
    return await search(query);
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

export const GetVideo = async (id: string) => {
  if (!id) {
    console.error("Invalid video ID provided");
    return null;
  }

  try {
    const dir = path.join(os.homedir(), "music-guys", "videos");
    const file = path.join(dir, `${id}.mp3`);

    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Return cached file if it exists
    if (fs.existsSync(file)) {
      // Verify file integrity
      try {
        const stats = fs.statSync(file);
        if (stats.size > 0) {
          return file;
        }
        // If file exists but is empty/corrupt, remove it and re-download
        fs.unlinkSync(file);
      } catch (err) {
        console.error("Error checking cached file:", err);
        // File might be corrupt or inaccessible, try to remove it
        try {
          fs.unlinkSync(file);
        } catch (unlinkErr) {
          console.error("Failed to remove corrupt file:", unlinkErr);
        }
      }
    }

    // Download video if not cached
    const cookies = path.join(os.homedir(), "music-guys", "cookies.txt");
    console.log(`Downloading https://www.youtube.com/watch?v=${id}`);

    const ytdlp = new YTDlpWrap();

    try {
      // Try with bestaudio format first
      await ytdlp.execPromise([
        `https://www.youtube.com/watch?v=${id}`,
        "--format",
        "bestaudio",
        "--output",
        file,
        "--cookies",
        cookies,
        "--force-overwrites",
        "--no-playlist",
        "--retries",
        "3",
      ]);
    } catch (error) {
      console.warn(
        "Failed to download with bestaudio format, trying fallback options:",
        error,
      );

      try {
        // Try with more flexible format selection
        await ytdlp.execPromise([
          `https://www.youtube.com/watch?v=${id}`,
          "--format",
          "ba/b[acodec!=none]/best",
          "--extract-audio",
          "--audio-format",
          "mp3",
          "--output",
          file,
          "--cookies",
          cookies,
          "--force-overwrites",
          "--no-playlist",
          "--retries",
          "3",
        ]);
      } catch (fallbackError) {
        console.error("All download attempts failed:", fallbackError);

        // Try one more time with less restrictive settings
        try {
          await ytdlp.execPromise([
            `https://www.youtube.com/watch?v=${id}`,
            "--extract-audio",
            "--audio-format",
            "mp3",
            "--output",
            file,
            "--cookies",
            cookies,
            "--force-overwrites",
            "--no-playlist",
            "--retries",
            "3",
            "--ignore-errors",
          ]);
        } catch (lastError) {
          console.error("Final download attempt failed:", lastError);
          throw new Error("Could not download audio from this video");
        }
      }
    }

    // Verify the downloaded file exists
    if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
      throw new Error("Failed to download video or empty file");
    }

    return file;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};
