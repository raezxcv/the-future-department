import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = path.resolve('.qa-screenshots');
const DIST_DIR = path.resolve('dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

async function startStaticServer() {
  const indexHtml = await fs.readFile(path.join(DIST_DIR, 'index.html'));
  const server = http.createServer(async (req, res) => {
    const cleanUrl = (req.url || '/').split('?')[0];
    const filePath = path.join(DIST_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);
    try {
      const stat = await fs.stat(filePath);
      if (stat.isFile()) {
        const ext = path.extname(filePath);
        const data = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
        return;
      }
    } catch {}
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(indexHtml);
  });

  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return server;
}

async function main() {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
  const server = await startStaticServer();
  const { port } = server.address();

  const debugPort = 9349;
  const userDataDir = path.resolve('.chrome-qa-profile');
  const chromeProc = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${userDataDir}`,
      `--remote-debugging-port=${debugPort}`,
      `http://127.0.0.1:${port}/`
    ],
    { stdio: 'ignore' }
  );

  let wsUrl = null;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === 'page');
      if (page?.webSocketDebuggerUrl) {
        wsUrl = page.webSocketDebuggerUrl;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 120));
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  const consoleErrors = [];
  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
      consoleErrors.push(JSON.stringify(data.params.args));
    }
    if (data.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(JSON.stringify(data.params.exceptionDetails));
    }
  });

  function sendCDP(method, params = {}) {
    const id = msgId++;
    return new Promise((resolve, reject) => {
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(new Error(data.error.message));
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendCDP('Runtime.enable');
  await sendCDP('Page.enable');

  const routes = [
    { name: 'department', path: '/' },
    { name: 'projects', path: '/projects' },
    { name: 'detail-014', path: '/projects/tfd-014' },
    { name: 'detail-019', path: '/projects/tfd-019' },
    { name: 'detail-023', path: '/projects/tfd-023' },
    { name: 'detail-027', path: '/projects/tfd-027' },
    { name: 'detail-031', path: '/projects/tfd-031' },
    { name: 'detail-036', path: '/projects/tfd-036' },
    { name: 'research', path: '/research' }
  ];

  const viewports = [
    { width: 375, height: 812, label: '375px' },
    { width: 390, height: 844, label: '390px' },
    { width: 768, height: 1024, label: '768px' },
    { width: 1024, height: 768, label: '1024px' },
    { width: 1440, height: 900, label: '1440px' }
  ];

  const report = [];

  for (const route of routes) {
    await sendCDP('Page.navigate', { url: `http://127.0.0.1:${port}${route.path}` });
    await new Promise((r) => setTimeout(r, 300));

    for (const vp of viewports) {
      await sendCDP('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768
      });
      await new Promise((r) => setTimeout(r, 120));

      const evalRes = await sendCDP('Runtime.evaluate', {
        expression: `(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          const brokenImgs = imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
          const overflowX = document.documentElement.scrollWidth > window.innerWidth;
          const h1Count = document.querySelectorAll('h1').length;
          return {
            imgCount: imgs.length,
            brokenImgs,
            overflowX,
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            h1Count
          };
        })()`,
        returnByValue: true
      });

      const stats = evalRes.result.value;
      report.push({
        route: route.path,
        viewport: vp.label,
        ...stats
      });

      if (
        ['department', 'projects', 'detail-014', 'research'].includes(route.name) &&
        (vp.width === 1440 || vp.width === 375)
      ) {
        const shot = await sendCDP('Page.captureScreenshot', { format: 'png' });
        await fs.writeFile(
          path.join(SCREENSHOT_DIR, `${route.name}-${vp.label}.png`),
          Buffer.from(shot.data, 'base64')
        );
      }
    }
  }

  console.log('=== QA VIEWPORT & ASSET REPORT ===');
  const failures = report.filter((r) => r.brokenImgs.length > 0 || r.overflowX || r.h1Count !== 1);
  console.log(`Total route×viewport checks: ${report.length}`);
  console.log(`Broken image / overflow / H1 failures: ${failures.length}`);
  if (failures.length > 0) {
    console.log(JSON.stringify(failures, null, 2));
  }
  console.log(`Console errors: ${consoleErrors.length}`);

  ws.close();
  chromeProc.kill();
  server.close();
  await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
