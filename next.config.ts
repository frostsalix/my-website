import type { NextConfig } from "next";

const [repoOwner, repoName] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isProjectPagesRepo =
  Boolean(repoOwner) &&
  Boolean(repoName) &&
  repoName.toLowerCase() !== `${repoOwner.toLowerCase()}.github.io`;

const inferredBasePath =
  process.env.GITHUB_ACTIONS === "true" && isProjectPagesRepo
    ? `/${repoName}`
    : "";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
