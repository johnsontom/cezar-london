import { spawn } from "node:child_process";
import path from "node:path";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9341;
const PROFILE = path.resolve(".preview/cdp-verify");
const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, ["--headless=old","--no-sandbox","--disable-gpu","--disable-software-rasterizer","--disable-dev-shm-usage","--hide-scrollbars","--no-first-run",`--remote-debugging-port=${PORT}`,`--user-data-dir=${PROFILE}`,"about:blank"], { stdio: "ignore" });
for (let i = 0; i < 80; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break; } catch {} await sleep(250); }
const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const page = targets.find((t) => t.type === "page");
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { socket.addEventListener("open", res, { once: true }); socket.addEventListener("error", rej, { once: true }); });
const pending = new Map(); let id = 0;
socket.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result ?? m.error); pending.delete(m.id); } });
const send = (method, params = {}) => { id++; const c = id; return new Promise((res) => { pending.set(c, res); socket.send(JSON.stringify({ id: c, method, params })); }); };
const evaluate = async (expression) => { const r = await send("Runtime.evaluate", { expression, returnByValue: true }); return r?.result?.value ?? (r?.exceptionDetails ? "THREW: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text) : "undefined"); };
await send("Runtime.enable"); await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });
const routes = ["/", "/collections", "/gallery", "/about", "/contact", "/new-in", "/products/signature-zip-jacket", "/collections/signature-collection", "/privacy", "/terms", "/no-such-page"];
let dangling = 0;
for (const route of routes) {
  await send("Page.navigate", { url: BASE + route });
  await sleep(2600);
  const aria = JSON.parse(await evaluate(`JSON.stringify([...document.querySelectorAll('[aria-labelledby]')].map(el=>el.getAttribute('aria-labelledby')).filter(l=>!l.split(/\\s+/).every(i=>document.getElementById(i))))`));
  const anchors = JSON.parse(await evaluate(`JSON.stringify([...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href').slice(1)).filter(h=>h&&!document.getElementById(h)))`));
  const imgs = JSON.parse(await evaluate(`JSON.stringify([...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.currentSrc||i.src))`));
  const broken = await evaluate(`JSON.stringify([...document.images].filter(i=>i.complete&&i.naturalWidth===0).length)`);
  const counts = await evaluate(`JSON.stringify({images:document.images.length, broken:${broken}, h1:document.querySelectorAll('h1').length, h2:document.querySelectorAll('h2').length})`);
  dangling += aria.length + anchors.length + JSON.parse(counts).broken;
  console.log(`${route.padEnd(34)} aria=${aria.length} anchors=${anchors.length} ${counts}${aria.length||anchors.length||imgs.length ? " !! " + JSON.stringify({aria,anchors,imgs}) : ""}`);
}
console.log("TOTAL_DANGLING_OR_BROKEN=" + dangling);
socket.close(); chrome.kill();
