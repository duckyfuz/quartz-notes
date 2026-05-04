import path from "path"
import { readFileSync } from "fs"

/**
 * All constants relating to helpers or handlers
 */
export const ORIGIN_NAME = "origin"
export const UPSTREAM_NAME = "upstream"
export const QUARTZ_SOURCE_BRANCH = "v4"
export const cwd = process.cwd()
export const cacheDirName = process.env.QUARTZ_CACHE_DIR || ".quartz-cache"
export const cacheDir = path.join(cwd, cacheDirName)
export const cacheFile = `./quartz/${cacheDirName}/transpiled-build.mjs`
export const fp = "./quartz/build.ts"
export const { version } = JSON.parse(readFileSync("./package.json").toString())
export const contentCacheFolder = path.join(cacheDir, "content-cache")
