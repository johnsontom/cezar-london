import { spawn } from "node:child_process";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9336;
const PROFILE = path.resolve(".preview/probe2-profile");
const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const chrome = spawn(
    CHROME,
    [
      "--headless=old",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--no-first-run",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${PROFILE}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  for (let i = 0; i < 80; i += 1) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break;
    } catch {}
    await sleep(250);
  }
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = targets.find((t) => t.type === "page");
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    socket.addEventListener("open", res, { once: true });
    socket.addEventListener("error", rej, { once: true });
  });
  const pending = new Map();
  let id = 0;
  socket.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m.result ?? m.error);
      pending.delete(m.id);
    }
  });
  const send = (method, params = {}) => {
    id += 1;
    const cur = id;
    return new Promise((resolve) => {
      pending.set(cur, resolve);
      socket.send(JSON.stringify({ id: cur, method, params }));
    });
  };
  const evaluate = async (expression) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true }))?.result?.value;

  await send("Runtime.enable");
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1600,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: `${BASE}/` });
  await sleep(4000);
  await send("Runtime.evaluate", {
    expression: "document.querySelector('#collections')?.scrollIntoView({block:'start'})",
  });
  await sleep(4000);

  console.log("network idle images:", await evaluate("document.images.length"));
  console.log(
    await evaluate(`JSON.stringify([...document.images].slice(0,6).map(img=>({
      src: (img.currentSrc||img.src).slice(-60),
      complete: img.complete,
      nw: img.naturalWidth,
      nh: img.naturalHeight,
      op: getComputedStyle(img).opacity,
      vis: getComputedStyle(img).visibility,
      w: Math.round(img.getBoundingClientRect().width),
      h: Math.round(img.getBoundingClientRect().height)
    })), null, 1)`),
  );
  const shot = await send("Page.captureScreenshot", { format: "png" });
  const { writeFileSync } = await import("node:fs");
  writeFileSync(path.resolve(".preview/probe-collections.png"), Buffer.from(shot.data, "base64"));
  socket.close();
  chrome.kill();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
