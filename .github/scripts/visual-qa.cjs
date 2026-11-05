const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  fs.mkdirSync('visual-qa', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const pages = ['/', '/apps/', '/remindq/', '/calcstash/', '/ezalbum/', '/support/', '/remindq/support/', '/remindq/privacy/'];
  const devices = [
    { name: 'iphone', viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1 },
    { name: 'desktop', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }
  ];
  let failures = 0;
  for (const device of devices) {
    const context = await browser.newContext(device);
    const page = await context.newPage();
    for (const route of pages) {
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      const response = await page.goto('http://127.0.0.1:8765' + route, { waitUntil: 'networkidle' });
      const metrics = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
        h1: document.querySelectorAll('h1').length,
        title: document.title,
        body: document.body.getBoundingClientRect().width,
        missingAlt: [...document.querySelectorAll('img')].filter(img => !img.hasAttribute('alt')).length,
        brokenImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src')),
        emptyLinks: [...document.querySelectorAll('a')].filter(a => !((a.innerText || '').trim() || a.getAttribute('aria-label') || a.querySelector('img[alt]'))).length,
        emptyButtons: [...document.querySelectorAll('button')].filter(b => !((b.innerText || '').trim() || b.getAttribute('aria-label'))).length
      }));
      const slug = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replaceAll('/', '-');
      await page.screenshot({ path: path.join('visual-qa', device.name + '-' + slug + '.png'), fullPage: true });
      const reasons = [];
      if (!response || response.status() >= 400) reasons.push('HTTP error');
      if (metrics.scroll > metrics.width + 3) reasons.push('horizontal overflow ' + metrics.scroll + ' > ' + metrics.width);
      if (metrics.h1 !== 1) reasons.push('h1 count ' + metrics.h1);
      if (!metrics.title) reasons.push('missing title');
      if (metrics.missingAlt) reasons.push('images without alt: ' + metrics.missingAlt);
      if (metrics.brokenImages.length) reasons.push('broken images: ' + metrics.brokenImages.join(', '));
      if (metrics.emptyLinks) reasons.push('unlabeled links: ' + metrics.emptyLinks);
      if (metrics.emptyButtons) reasons.push('unlabeled buttons: ' + metrics.emptyButtons);
      if (errors.length) reasons.push('page errors: ' + errors.join(', '));
      console.log(device.name, route, reasons.length ? 'FAIL: ' + reasons.join('; ') : 'PASS');
      if (reasons.length) failures++;
      page.removeAllListeners('pageerror');
    }
    await context.close();
  }
  await browser.close();
  if (failures) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
