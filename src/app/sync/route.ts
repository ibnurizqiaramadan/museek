import { NextResponse, NextRequest } from "next/server";
import { CreateQueue, GetQueueByUser } from "@/data/layer/queue";
import { generateJWT, JWT_PAYLOAD } from "@/server/jwt";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const [queueByUser, errorGetQueueByUser] = await GetQueueByUser(userId);
  if (errorGetQueueByUser) {
    return NextResponse.redirect(
      new URL(
        `/error?message=${Buffer.from(
          JSON.stringify(errorGetQueueByUser),
        ).toString("base64")}`,
        req.url,
      ),
    );
  }

  const payload: JWT_PAYLOAD = {
    userId,
    queueId: queueByUser?.queue[0]?.id || "",
  };

  if (!queueByUser?.queue[0]?.id) {
    const [createQueue, errorCreateQueue] = await CreateQueue(userId);
    if (errorCreateQueue) {
      return NextResponse.redirect(
        new URL(
          `/error?message=${Buffer.from(JSON.stringify(errorCreateQueue)).toString("base64")}`,
          req.url,
        ),
      );
    }
    payload.queueId = createQueue?.insert_queue_one.id || "";
  }

  const response = NextResponse.redirect(new URL("/", req.url)); // Redirect to home page

  const jwt = await generateJWT(payload);

  response.cookies.set({
    name: "accessToken",
    value: jwt,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return response;
}
