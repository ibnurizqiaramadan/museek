"use server";

import { NextRequest, NextResponse } from "next/server";
import { GetVideo } from "@/server/youtube";
import fs from "fs";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.pathname.split("/").pop();
  const filename = request.nextUrl.searchParams.get("filename");

  if (!url) {
    return NextResponse.json({ error: "No url provided" }, { status: 400 });
  }

  const file = await GetVideo(url);
  if (!file) {
    return NextResponse.json({ error: "Could not get video" }, { status: 500 });
  }

  const fileStream = fs.createReadStream(file);
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    fileStream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    fileStream.on("end", () => resolve(Buffer.concat(chunks)));
    fileStream.on("error", reject);
  });

  // Set headers to trigger a file download
  const response = new NextResponse(buffer, { status: 200 });
  response.headers.set(
    "Content-Disposition",
    `attachment; filename="${filename ?? file.split("/").pop()}"`,
  );
  response.headers.set("Content-Type", "audio/mpeg");

  return response;
}
