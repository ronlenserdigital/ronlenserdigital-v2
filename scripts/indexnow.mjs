#!/usr/bin/env node
/**
 * Push every sitemap URL to IndexNow.
 *
 * One POST to api.indexnow.org reaches Bing, Yandex, Naver, Seznam and Yep.
 * Bing matters most here and not only for Bing: ChatGPT search, Copilot and
 * DuckDuckGo all draw on that index, so this is an AI-visibility lever as
 * much as a search one.
 *
 * Google does not participate. It tested the protocol in 2022 and declined.
 * Google discovery stays on sitemaps, internal links and URL Inspection, so
 * do not read a 200 here as "submitted to Google".
 *
 * Usage: npm run indexnow           (after a build, reads dist/sitemap.xml)
 */

import { readFile } from "node:fs/promises";

const HOST = "www.ronlenserdigital.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const key = (await readFile(new URL("../.indexnow-key", import.meta.url), "utf8")).trim();
const xml = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");

const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("No URLs found in dist/sitemap.xml. Run npm run build first.");
  process.exit(1);
}

console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList,
  }),
});

const body = await res.text();

// 200 accepted, 202 accepted pending key verification (normal on first run)
if (res.status === 200 || res.status === 202) {
  console.log(`OK ${res.status}. ${urlList.length} URLs submitted.`);
  if (res.status === 202) {
    console.log("202 means the key is being verified. Expect 200 next time.");
  }
} else {
  console.error(`Failed ${res.status}: ${body}`);
  process.exit(1);
}

for (const u of urlList) console.log("  " + u);
