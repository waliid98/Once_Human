import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(() => {
  const explicitBase = process.env.VITE_BASE;
  const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_URL);
  const isGithubPages =
    process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";
  const base = explicitBase ?? (!isVercel && isGithubPages ? "/game-website/" : "/");

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
