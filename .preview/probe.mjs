import { spawn } from "node:child_process";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9334;
const PROFILE = path.resolve(".preview/probe-profile");
const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const chrome = spawn(
    CHROME,
    [
      "--headless=old",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-software-rasterizer",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--no-first-run",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${PROFILE}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  for (let i = 0; i < 60; i += 1) {
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
  const events = [];
  let id = 0;
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message.result ?? message.error);
      pending.delete(message.id);
      return;
    }
    if (message.method === "Runtime.exceptionThrown") {
      events.push(`EXCEPTION: ${message.params.exceptionDetails?.exception?.description?.slice(0, 400)}`);
    }
    if (message.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(message.params.type)) {
      events.push(
        `CONSOLE ${message.params.type}: ${message.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 400)}`,
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

  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true });
    return result?.result?.value;
  };

  console.log("reduced-motion:", await evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"));
  console.log("webgl:", await evaluate("(()=>{try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'))}catch(e){return 'threw: '+e.message}})()"));
  console.log("h2 count:", await evaluate("document.querySelectorAll('h2').length"));
  console.log(
    "first h2 inner spans:",
    await evaluate(
      "JSON.stringify([...document.querySelectorAll('h2')].slice(0,2).map(h=>({text:h.textContent.slice(0,40), transform:getComputedStyle(h.querySelector('span span')||h).transform, opacity:getComputedStyle(h.querySelector('span span')||h).opacity})))",
    ),
  );
  console.log("--- console/exception events ---");
  for (const line of events.slice(0, 25)) console.log(line);

  socket.close();
  chrome.kill();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
