import Pusher from "pusher";
import { env } from "@/env.mjs";

// This is because SSE is unreliable on serverless functions

export const pusher = env.PUSHER_APP_ID
  ? new Pusher({
      appId: env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      secret: env.PUSHER_SECRET,
      cluster: "eu",
      useTLS: true,
    })
  : null;
