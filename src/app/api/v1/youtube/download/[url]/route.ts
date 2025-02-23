"use server";

import { NextRequest, NextResponse } from "next/server";
import { GetVideo } from "@/server/youtube";
import fs from "fs";
import { promisify } from "util";
import { GetVideoById } from "@/data/layer/queue";
export async function GET(request: NextRequest) {
  const url = request.nextUrl.pathname.split("/").pop();
  const [video, error] = await GetVideoById(url || "");

  if (error) {
    return NextResponse.json({ error: "No url provided" }, { status: 400 });
  }

  const filename = request.nextUrl.searchParams.get("filename");

  if (!url) {
    return NextResponse.json({ error: "No url provided" }, { status: 400 });
  }

  const file = await GetVideo(video?.queue_items[0]?.video_id || "");
  if (!file) {
    return NextResponse.json({ error: "Could not get video" }, { status: 500 });
  }

  // Read file as buffer
  const readFile = promisify(fs.readFile);
  const buffer = await readFile(file); // Buffer type

  // Set headers to trigger a file download
  const response = new NextResponse(buffer, { status: 200 });
  response.headers.set(
    "Content-Disposition",
    `attachment; filename="${filename ?? file.split("/").pop()}"`,
  );
  response.headers.set("Content-Type", "audio/mpeg");

  return response;
}
