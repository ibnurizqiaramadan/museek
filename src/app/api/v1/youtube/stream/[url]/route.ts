"use server";

import { NextRequest, NextResponse } from "next/server";
import { GetVideo } from "@/server/youtube";
import fs from "fs";
import { Readable } from "stream";
import { GetVideoById } from "@/data/layer/queue";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const url = request.nextUrl.pathname.split("/").pop();

  const cookie = await cookies();
  const accessToken = cookie.get("accessToken");

  const accessedAs = request.headers.get("sec-fetch-dest");

  if (accessedAs !== "audio") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  const [video, error] = await GetVideoById(url || "");

  if (error) {
    return NextResponse.json({ error: "No url provided" }, { status: 400 });
  }

  if (!video || video.queue_items[0] === undefined) {
    return NextResponse.json({ error: "No video found" }, { status: 404 });
  }

  const file = await GetVideo(video.queue_items[0].video_id);
  const stat = fs.statSync(file as string);
  const { size } = stat;

  const range = request.headers.get("range");
  if (!range) {
    const fileStream = fs.createReadStream(file as string);
    return new Response(Readable.toWeb(fileStream) as ReadableStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": size.toString(),
        "Accept-Ranges": "bytes",
      },
    });
  }

  const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
  const start = parseInt(startStr, 10);
  const end = endStr ? parseInt(endStr, 10) : size - 1;

  if (isNaN(start) || start >= size || end >= size || start > end) {
    return new Response("Invalid Range", { status: 416 });
  }

  const chunkSize = end - start + 1;
  const fileStream = fs.createReadStream(file as string, { start, end });

  return new Response(Readable.toWeb(fileStream) as ReadableStream, {
    status: 206,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": chunkSize.toString(),
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
    },
  });
}
