"use server";

import YTDlpWrap from "yt-dlp-wrap";
import os from "os";
import fs from "fs";
import { search } from "youtube-search-without-api-key";
import path from "path";

export const Search = async (query: string) => {
  return search(query);
};

export const GetVideo = async (id: string) => {
  try {
    const cookies = path.join(
      os.homedir(),
      ".config",
      "music-guys",
      "cookies.txt",
    );
    console.log(`https://www.youtube.com/watch?v=${id}`);
    const file = `${os.tmpdir()}/music-guys/videos/${id}.mp3`;

    if (fs.existsSync(file)) {
      return file;
    }

    const ytdlp = new YTDlpWrap();
    await ytdlp.execPromise([
      `https://www.youtube.com/watch?v=${id}`,
      "--format",
      "bestaudio",
      "--output",
      file,
      "--cookies",
      cookies,
    ]);
    return file;
  } catch (error) {
    console.error("Error fetching video:", error);
  }
};
