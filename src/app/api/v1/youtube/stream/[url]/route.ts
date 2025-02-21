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

  const stat = fs.statSync(file as string); // Get file stats
  const { size } = stat; // Get the size of the file

  const range = request.headers.get("Range");
  if (!range) {
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

  // Parse the range header
  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  let end = parts[1] ? parseInt(parts[1], 10) : size - 1;

  // Validate range
  if (start >= size || end >= size || start > end) {
    return NextResponse.json(
      { error: "Range not satisfiable" },
      { status: 416 },
    );
  }

  // Ensure end does not exceed size
  end = Math.min(end, size - 1); // Ensure end is within bounds

  const stream = fs.createReadStream(file as string, { start, end });

  const readableStream = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(chunk));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": (end - start + 1).toString(),
      "Content-Type": "audio/mpeg",
    },
  });
}
