#!/usr/bin/env -S deno run -A --allow-sys=systemCpuInfo --watch=static/,routes/

import "./polyfills/systemCpuInfo.ts";
import "./polyfills/osCpuFallback.ts";

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";

await dev(import.meta.url, "./main.ts", config);
