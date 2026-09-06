import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    /**
     * Whether the real API is behind this deployment — a flag, deliberately, and never
     * the address.
     *
     * `lib/data/source.ts` runs in the browser and has to know which implementation to
     * pick; `lib/server/backend.ts` runs on the server and is the only thing that may
     * know where the backend is. A `NEXT_PUBLIC_` URL would answer both questions with
     * one value and put the second answer in the bundle, which is exactly what moving
     * the token into an HttpOnly cookie was for.
     *
     * Derived here so there is still one variable to set. `env` is inlined at build
     * time, so this is decided when the application is built, not when it is served.
     */
    BAROMETR_LIVE: process.env.BAROMETR_API_URL ? "1" : "",
  },
};

export default nextConfig;
