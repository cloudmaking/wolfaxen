import "./polyfills/systemCpuInfo.ts";
import "./polyfills/osCpuFallback.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

await start(manifest);
