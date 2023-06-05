await import("./src/env.mjs");

const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com", // yeah I know
      },
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
