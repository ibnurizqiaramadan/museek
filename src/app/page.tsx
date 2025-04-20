import Layout from "@/components/templates/Layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CreateUser, GetUser } from "@/data/layer/user";
import { decodeJWT } from "@/server/jwt";
import { GetQueueByUser } from "@/data/layer/queue";

async function handleUserCreation() {
  const [user, error] = await CreateUser();
  if (error) {
    console.error("User creation error:", error);
    redirect(
      `/error?message=${Buffer.from(JSON.stringify(error)).toString("base64")}`,
    );
    return;
  }
  return user?.insert_users_one.id;
}

export default async function Home() {
  // read cookie
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;

  const decoded = await decodeJWT(accessToken || "");

  if (!accessToken) {
    const newUserId = await handleUserCreation();
    return redirect(`/sync?userId=${newUserId}`);
  }

  const [user, error] = await GetUser(decoded?.payload?.userId || "");
  if (error || !user?.users[0]?.id) {
    console.error("User retrieval error:", error);
    const newUserId = await handleUserCreation();
    return redirect(`/sync?userId=${newUserId}`);
  }

  const [queue, errorQueue] = await GetQueueByUser(user?.users[0]?.id || "");
  if (errorQueue) {
    console.error("Queue retrieval error:", errorQueue);
    return <div>Error fetching queue</div>;
  }

  return (
    <Layout
      queue={queue?.queue[0]?.queue_items_aggregate?.nodes || []}
      accessToken={accessToken}
    />
  );
}
