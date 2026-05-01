import { spawn } from "node:child_process";
import { mkdir, writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const origin = "https://rhinobotsolutions.com/";
const outRoot = new URL("../docs/research/rhinobot/", import.meta.url);
const shotsRoot = new URL("../docs/design-references/rhinobot/", import.meta.url);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJson(url, attempts = 80) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await wait(150);
  }
  throw lastError ?? new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      } else if (message.method && this.events.has(message.method)) {
        for (const handler of this.events.get(message.method)) handler(message.params);
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  once(method) {
    return new Promise((resolve) => {
      const handlers = this.events.get(method) ?? new Set();
      const handler = (params) => {
        handlers.delete(handler);
        resolve(params);
      };
      handlers.add(handler);
      this.events.set(method, handlers);
    });
  }

  close() {
    this.ws.close();
  }
}

async function makePage(port) {
  const newTarget = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: "PUT",
  }).then((response) => response.json());
  const client = new CdpClient(newTarget.webSocketDebuggerUrl);
  await client.open();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  return client;
}

async function navigate(client, url, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });
  const loaded = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await loaded;
  await wait(2200);
}

async function evaluate(client, expression, awaitPromise = true) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? "Runtime evaluation failed");
  }
  return result.result.value;
}

async function screenshot(client, fileUrl) {
  const metrics = await client.send("Page.getLayoutMetrics");
  const width = Math.ceil(metrics.cssContentSize.width);
  const height = Math.ceil(metrics.cssContentSize.height);
  const shot = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    fromSurface: true,
    clip: { x: 0, y: 0, width, height, scale: 1 },
  });
  await writeFile(fileUrl, Buffer.from(shot.data, "base64"));
  return { width, height };
}

const extractionSource = String.raw`
(() => {
  const styleProps = [
    "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "color",
    "backgroundColor", "backgroundImage", "paddingTop", "paddingRight", "paddingBottom",
    "paddingLeft", "marginTop", "marginBottom", "display", "position", "top", "zIndex",
    "borderRadius", "border", "boxShadow", "transform", "opacity", "transition",
    "backdropFilter"
  ];

  const pickStyles = (element) => {
    const computed = getComputedStyle(element);
    return Object.fromEntries(styleProps.map((prop) => [prop, computed[prop]]));
  };

  const text = (element) => element.textContent.replace(/\s+/g, " ").trim();
  const rect = (element) => {
    const box = element.getBoundingClientRect();
    return {
      x: Math.round(box.x),
      y: Math.round(box.y + window.scrollY),
      width: Math.round(box.width),
      height: Math.round(box.height),
    };
  };

  const colorValues = new Map();
  for (const element of Array.from(document.querySelectorAll("*")).slice(0, 900)) {
    const computed = getComputedStyle(element);
    for (const prop of ["color", "backgroundColor", "borderColor"]) {
      const value = computed[prop];
      if (value && value !== "rgba(0, 0, 0, 0)" && value !== "transparent") {
        colorValues.set(value, (colorValues.get(value) ?? 0) + 1);
      }
    }
  }

  const bgUrls = [...document.querySelectorAll("*")].flatMap((element) => {
    const bg = getComputedStyle(element).backgroundImage;
    if (!bg || bg === "none" || !bg.includes("url(")) return [];
    return [...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((match) => ({
      url: new URL(match[1], location.href).href,
      tag: element.tagName.toLowerCase(),
      className: String(element.className ?? "").slice(0, 120),
      rect: rect(element),
    }));
  });

  const sections = [...document.querySelectorAll("main > section, body > section, section")].map((element, index) => ({
    index,
    tag: element.tagName.toLowerCase(),
    id: element.id,
    className: String(element.className ?? "").slice(0, 180),
    rect: rect(element),
    styles: pickStyles(element),
    headings: [...element.querySelectorAll("h1,h2,h3")].slice(0, 12).map(text),
    text: text(element).slice(0, 1200),
    imageCount: element.querySelectorAll("img").length,
    videoCount: element.querySelectorAll("video").length,
    buttonTexts: [...element.querySelectorAll("button,a")].slice(0, 16).map(text).filter(Boolean),
  }));

  const navItems = [...document.querySelectorAll("header a, nav a")].map((anchor) => ({
    text: text(anchor),
    href: anchor.href,
    rect: rect(anchor),
    styles: pickStyles(anchor),
  }));

  return {
    url: location.href,
    title: document.title,
    meta: [...document.querySelectorAll("meta")].map((meta) => ({
      name: meta.getAttribute("name"),
      property: meta.getAttribute("property"),
      content: meta.getAttribute("content"),
    })),
    links: [...document.querySelectorAll("a[href]")].map((anchor) => ({
      text: text(anchor).slice(0, 160),
      href: anchor.href,
    })),
    fonts: [...new Set([...document.querySelectorAll("body, h1, h2, h3, p, a, button")].map((element) => getComputedStyle(element).fontFamily))],
    colors: [...colorValues.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([value, count]) => ({ value, count })),
    navItems,
    sections,
    assets: {
      images: [...document.querySelectorAll("img")].map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        rect: rect(img),
        parentClass: String(img.parentElement?.className ?? "").slice(0, 120),
      })),
      videos: [...document.querySelectorAll("video")].map((video) => ({
        src: video.currentSrc || video.src || video.querySelector("source")?.src,
        poster: video.poster,
        autoplay: video.autoplay,
        loop: video.loop,
        muted: video.muted,
        rect: rect(video),
      })),
      backgrounds: bgUrls,
      svgCount: document.querySelectorAll("svg").length,
      favicons: [...document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"]')].map((link) => ({
        href: new URL(link.getAttribute("href"), location.href).href,
        rel: link.rel,
        sizes: link.sizes?.toString(),
      })),
    },
    bodyText: text(document.body).slice(0, 20000),
  };
})()
`;

async function getScrollSamples(client) {
  const positions = [0, 120, 600, 1400, 2600, 4200, 6800, 9800, 12800];
  const samples = [];
  for (const y of positions) {
    await evaluate(client, `window.scrollTo(0, ${y}); new Promise((resolve) => setTimeout(resolve, 350));`);
    samples.push(await evaluate(client, String.raw`
      (() => {
        const header = document.querySelector("header");
        const active = document.elementFromPoint(window.innerWidth / 2, 90);
        const computed = header ? getComputedStyle(header) : null;
        return {
          scrollY: Math.round(window.scrollY),
          header: header ? {
            rect: (() => {
              const box = header.getBoundingClientRect();
              return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) };
            })(),
            backgroundColor: computed.backgroundColor,
            backdropFilter: computed.backdropFilter,
            boxShadow: computed.boxShadow,
            position: computed.position,
            transform: computed.transform,
          } : null,
          visibleHeading: [...document.querySelectorAll("h1,h2,h3")].find((heading) => {
            const box = heading.getBoundingClientRect();
            return box.top > 0 && box.top < window.innerHeight;
          })?.textContent.replace(/\s+/g, " ").trim() ?? null,
          topElement: active ? active.tagName.toLowerCase() + "." + String(active.className ?? "").split(" ").slice(0, 3).join(".") : null,
        };
      })()
    `));
  }
  return samples;
}

async function getDropdownSamples(client) {
  await evaluate(client, "window.scrollTo(0, 0);");
  await wait(300);
  const navTargets = await evaluate(client, String.raw`
    [...document.querySelectorAll("header a, header button, nav a, nav button")].map((element, index) => {
      const box = element.getBoundingClientRect();
      return {
        index,
        text: element.textContent.replace(/\s+/g, " ").trim(),
        x: Math.round(box.x + box.width / 2),
        y: Math.round(box.y + box.height / 2),
        width: Math.round(box.width),
        height: Math.round(box.height),
      };
    }).filter((item) => item.width > 0 && item.height > 0)
  `);
  const results = [];
  for (const item of navTargets.filter((target) => /industr|area|service/i.test(target.text))) {
    await client.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: item.x, y: item.y });
    await wait(650);
    results.push({
      trigger: item,
      visibleLinks: await evaluate(client, String.raw`
        [...document.querySelectorAll("a[href], button")].filter((element) => {
          const box = element.getBoundingClientRect();
          return box.width > 0 && box.height > 0 && box.top >= 0 && box.top < window.innerHeight && getComputedStyle(element).visibility !== "hidden";
        }).map((element) => ({
          text: element.textContent.replace(/\s+/g, " ").trim(),
          href: element.href || null,
          className: String(element.className ?? "").slice(0, 120),
          rect: (() => {
            const box = element.getBoundingClientRect();
            return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) };
          })(),
        })).slice(0, 120)
      `),
    });
  }
  return results;
}

async function main() {
  await mkdir(outRoot, { recursive: true });
  await mkdir(shotsRoot, { recursive: true });
  const userDataDir = await mkdtemp(join(tmpdir(), "codex-rhino-chrome-"));
  const port = 9336 + Math.floor(Math.random() * 400);
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-dev-shm-usage",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ], { stdio: "ignore" });

  try {
    await waitForJson(`http://127.0.0.1:${port}/json/version`);
    const desktop = await makePage(port);
    await navigate(desktop, origin, { width: 1440, height: 1200, mobile: false });
    const desktopData = await evaluate(desktop, extractionSource);
    const scrollSamples = await getScrollSamples(desktop);
    const dropdownSamples = await getDropdownSamples(desktop);
    const desktopShot = await screenshot(desktop, new URL("home-desktop-full.png", shotsRoot));
    await writeFile(new URL("home-desktop.json", outRoot), JSON.stringify({
      screenshot: desktopShot,
      extraction: desktopData,
      scrollSamples,
      dropdownSamples,
    }, null, 2));
    desktop.close();

    const mobile = await makePage(port);
    await navigate(mobile, origin, { width: 390, height: 900, mobile: true });
    const mobileData = await evaluate(mobile, extractionSource);
    const mobileShot = await screenshot(mobile, new URL("home-mobile-full.png", shotsRoot));
    await writeFile(new URL("home-mobile.json", outRoot), JSON.stringify({
      screenshot: mobileShot,
      extraction: mobileData,
    }, null, 2));
    mobile.close();

    console.log(JSON.stringify({
      ok: true,
      desktopShot,
      mobileShot,
      sections: desktopData.sections.length,
      links: desktopData.links.length,
      images: desktopData.assets.images.length,
      videos: desktopData.assets.videos.length,
      backgrounds: desktopData.assets.backgrounds.length,
      outRoot: outRoot.pathname,
      shotsRoot: shotsRoot.pathname,
    }, null, 2));
  } finally {
    const exited = new Promise((resolve) => {
      chrome.once("exit", resolve);
    });
    chrome.kill("SIGTERM");
    await Promise.race([exited, wait(1000)]);
    if (chrome.exitCode === null) chrome.kill("SIGKILL");
    await rm(userDataDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
