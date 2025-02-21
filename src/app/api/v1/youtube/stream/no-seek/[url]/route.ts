"use server";

import { NextRequest, NextResponse } from "next/server";
import { GetVideo } from "@/server/youtube";
import fs from "fs";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.pathname.split("/").pop(); // Extracting the last segment as the [url]

  if (!url) {
    return NextResponse.json({ error: "No url provided" }, { status: 400 });
  }

  const file = await GetVideo(url);

  const stat = fs.statSync(file as string);
  const { size } = stat;

  const stream = fs.createReadStream(file as string);
  const readableStream = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(chunk));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
  });
  return new Response(readableStream, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": size.toString(),
    },
  });
}
