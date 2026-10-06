/**
 * Local visual-QA harness (not part of the app).
 * Drives headless Chrome over CDP to capture screenshots and surface any
 * client-side exceptions. Set SOFTWARE_GL=1 to exercise the WebGL emblem.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = Number(process.env.PORT ?? 9333);
const OUT = path.resolve(".preview/shots");
const PROFILE = path.resolve(".preview/cdp-profile");
const BASE = process.env.BASE_URL ?? "http://localhost:3111";

const SHOTS = [
  { name: "01-home-hero", url: "/", w: 1600, h: 1000 },
  { name: "02-home-collections", url: "/", w: 1600, h: 1000, scrollTo: "#collections" },
  { name: "03-home-chrome", url: "/", w: 1600, h: 1000, scrollTo: "#chrome-emblem-heading" },
  { name: "04-home-edit", url: "/", w: 1600, h: 1000, scrollTo: "#the-edit-heading" },
  { name: "05-home-campaign", url: "/", w: 1600, h: 1000, scrollTo: "#campaign-heading" },
  { name: "06-home-story", url: "/", w: 1600, h: 1000, scrollTo: "#brand-story-heading" },
  { name: "07-home-gallery", url: "/", w: 1600, h: 1000, scrollTo: "#gallery-preview-heading" },
  { name: "08-home-enquire", url: "/", w: 1600, h: 1000, scrollTo: "#enquire" },
  { name: "20-mobile-hero", url: "/", w: 390, h: 844 },
  { name: "21-mobile-collections", url: "/", w: 390, h: 844, scrollTo: "#collections" },
  { name: "22-mobile-edit", url: "/", w: 390, h: 844, scrollTo: "#the-edit-heading" },
  { name: "23-mobile-chrome", url: "/", w: 390, h: 844, scrollTo: "#chrome-emblem-heading" },
  { name: "24-mobile-gallery-page", url: "/gallery", w: 390, h: 844 },
  { name: "25-tablet-collections", url: "/collections", w: 834, h: 1112 },
  { name: "30-collections", url: "/collections", w: 1600, h: 1000 },
  { name: "31-collection-signature", url: "/collections/signature-collection", w: 1600, h: 1000 },
  { name: "32-new-in", url: "/new-in", w: 1600, h: 1000 },
  { name: "33-product", url: "/products/signature-zip-jacket", w: 1600, h: 1000 },
  { name: "34-gallery", url: "/gallery", w: 1600, h: 1000 },
  { name: "35-about", url: "/about", w: 1600, h: 1000 },
  { name: "36-contact", url: "/contact", w: 1600, h: 1000 },
  { name: "37-privacy", url: "/privacy", w: 1600, h: 1000 },
  { name: "38-not-found", url: "/no-such-page", w: 1600, h: 1000 },
];

const shots = process.env.SHOT_FILTER
  ? SHOTS.filter((shot) => shot.name.includes(process.env.SHOT_FILTER))
  : SHOTS;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDevTools() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("Chrome DevTools endpoint never became available");
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  rmSync(PROFILE, { recursive: true, force: true });

  const chrome = spawn(
    CHROME,
    [
      "--headless=old",
      "--no-sandbox",
      ...(process.env.SOFTWARE_GL
        ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"]
        : ["--disable-gpu", "--disable-software-rasterizer"]),
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${PROFILE}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  await waitForDevTools();
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = targets.find((target) => target.type === "page");
  if (!page) throw new Error("No page target found");

  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  const pending = new Map();
  const problems = [];
  let id = 0;
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message.result ?? message.error);
      pending.delete(message.id);
      return;
    }
    if (message.method === "Runtime.exceptionThrown") {
      problems.push(
        `EXCEPTION ${message.params.exceptionDetails?.url ?? ""}: ${
          message.params.exceptionDetails?.exception?.description?.slice(0, 300) ??
          message.params.exceptionDetails?.text
        }`,
      );
    }
    if (
      message.method === "Runtime.consoleAPICalled" &&
      message.params.type === "error"
    ) {
      problems.push(
        `CONSOLE ERROR: ${message.params.args
          .map((arg) => arg.value ?? arg.description)
          .join(" ")
          .slice(0, 300)}`,
      );
    }
  });

  const send = (method, params = {}) => {
    id += 1;
    const current = id;
    return new Promise((resolve) => {
      pending.set(current, resolve);
      socket.send(JSON.stringify({ id: current, method, params }));
    });
  };

  await send("Page.enable");
  await send("Runtime.enable");

  // Warm up: let the app know the intro curtain has already played.
  await send("Page.navigate", { url: BASE });
  await sleep(3000);
  await send("Runtime.evaluate", {
    expression: "try{sessionStorage.setItem('cezar-intro','1')}catch(e){}",
  });

  for (const shot of shots) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: shot.w,
      height: shot.h,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send("Page.navigate", { url: BASE + shot.url });
    await sleep(4500);
    if (shot.scrollTo) {
      await send("Runtime.evaluate", {
        expression: `document.querySelector(${JSON.stringify(shot.scrollTo)})?.scrollIntoView({block:'start'});`,
      });
      await sleep(3200);
    }
    const result = await send("Page.captureScreenshot", { format: "png" });
    if (result?.data) {
      writeFileSync(path.join(OUT, `${shot.name}.png`), Buffer.from(result.data, "base64"));
      process.stdout.write(`captured ${shot.name}\n`);
    } else {
      process.stdout.write(`FAILED ${shot.name}: ${JSON.stringify(result)}\n`);
    }
  }

  process.stdout.write(`\n--- client problems (${problems.length}) ---\n`);
  for (const problem of [...new Set(problems)].slice(0, 20)) {
    process.stdout.write(`${problem}\n`);
  }

  socket.close();
  chrome.kill();
}

main().catch((error) => {
  process.stderr.write(`${error.stack}\n`);
  process.exit(1);
});
