#!/usr/bin/env node
import workerpool from "workerpool"
const cacheDirName = process.env.QUARTZ_CACHE_DIR || ".quartz-cache"
const cacheFile = `./${cacheDirName}/transpiled-worker.mjs`
const { parseMarkdown, processHtml } = await import(cacheFile)
workerpool.worker({
  parseMarkdown,
  processHtml,
})
