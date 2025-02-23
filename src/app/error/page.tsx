"use client";

import { useSearchParams } from "next/navigation";
import { Code, Button } from "@heroui/react";
import React, { Suspense } from "react";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") ?? "";

  const error = message
    ? JSON.parse(Buffer.from(message, "base64").toString("utf-8"))
    : null;

  console.log("error", error);
  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-4 p-4">
      <h3 className="text-white text-2xl font-bold">Error 😭</h3>
      <Code className="w-auto max-w-screen-md h-auto text-white text-wrap p-4 text-center">
        {error ? JSON.stringify(error, null, 2) : "Unknown error"}
      </Code>
      <h4 className="text-white text-sm">
        If the error persists, please contact the developer.
      </h4>
      <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
        <Button
          variant="ghost"
          color="primary"
          onPress={() => {
            window.open("discord://-/users/257147179297144833", "_blank");
          }}
          className="w-full md:w-auto"
        >
          Contact Developer
        </Button>
        <Button
          variant="ghost"
          color="danger"
          onPress={() => {
            window.open("https://discord.gg/UhY7r8x", "_blank");
          }}
          className="w-full md:w-auto"
        >
          Join Discord
        </Button>
        <Button
          variant="ghost"
          color="primary"
          onPress={() => {
            window.location.href = "/";
          }}
          className="w-full md:w-auto"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
