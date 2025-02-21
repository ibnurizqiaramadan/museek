import { NextRequest, NextResponse } from "next/server";
import { Search } from "@/server/youtube";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  if (!query) {
    return NextResponse.json(
      {
        status: 400,
        error: "Query is required",
      },
      { status: 400 },
    );
  }
  const searchResult = await Search(query);
  return NextResponse.json(
    {
      status: 200,
      data: {
        length: searchResult.length,
        items: searchResult,
      },
    },
    { status: 200 },
  );
}
