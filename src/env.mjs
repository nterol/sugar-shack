import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    SECRET_COOKIE_PASSWORD: z.string().min(32),
    JWT_SECRET: z.string().min(32),
    DOMAIN_NAME: z.string(),
    PUSHER_APP_ID: z.string(),
    PUSHER_SECRET: z.string(),
  },

  client: {
    // NEXT_PUBLIC_PUSHER_KEY: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    // NEXT_PUBLIC_PUSHER_KEY: process.env.PUSHER_KEY,
    PUSHER_SECRET: process.env.PUSHER_SECRET,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
