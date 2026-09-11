const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/ACER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const target = 'http://127.0.0.1:4173';
const dir = __dirname;
const result = { date: '2026-09-11', target, browser: 'Microsoft Edge Chromium headless', responsive: [], pageErrors: [] };
const caption = page => page.locator('[class*="CoverflowCarousel_caption"]').innerText().catch(() => null);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  result.browserVersion = browser.version();
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  page.on('pageerror', error => result.pageErrors.push(error.message));
  await page.goto(target, { waitUntil: 'networkidle' });
  result.meta = await page.evaluate(() => ({ title: document.title, description: document.querySelector('meta[name="description"]')?.content, canonical: document.querySelector('link[rel="canonical"]')?.href || null, og: [...document.querySelectorAll('meta[property^="og:"]')].map(e => ({property:e.getAttribute('property'), content:e.content})), robots:document.querySelector('meta[name="robots"]')?.content || null, schemaCount:document.querySelectorAll('script[type="application/ld+json"]').length }));
  result.initialResources = await page.evaluate(() => performance.getEntriesByType('resource').map(e => ({name:e.name.split('/').pop(), type:e.initiatorType, bytes:e.encodedBodySize})));
  result.links = await page.locator('a').evaluateAll(elements => elements.map(e => ({text:e.innerText, href:e.href, placement:e.dataset.placement, label:e.getAttribute('aria-label')})));
  for (const width of [360, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 960 });
    await page.goto(target, { waitUntil: 'networkidle' });
    const data = await page.evaluate(() => ({ width:innerWidth, scrollWidth:document.documentElement.scrollWidth, bodyHeight:document.body.scrollHeight, fonts:{body:getComputedStyle(document.body).fontFamily,title:getComputedStyle(document.querySelector('h1')).fontFamily}, images:[...document.images].map(e=>({src:e.getAttribute('src'), width:e.naturalWidth, height:e.naturalHeight, loaded:e.complete&&e.naturalWidth>0})), floatingName:document.querySelector('a[data-placement="floating"]')?.innerText, navVisible:getComputedStyle(document.querySelector('header nav')).display !== 'none', smallControls:[...document.querySelectorAll('button')].map(e=>({label:e.getAttribute('aria-label')||e.innerText,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})).filter(e=>e.width>0&&(e.width<44||e.height<44)) }));
    result.responsive.push(data);
    if (width === 390 || width === 1440) {
      await page.screenshot({ path:path.join(dir, `home-${width}.png`), fullPage:true });
      await page.locator('#katalog').screenshot({ path:path.join(dir,`catalog-${width}.png`) });
    }
  }
  await page.getByRole('button', {name:'Go to slide 5',exact:true}).click();
  await delay(600);
  result.filterBefore = await caption(page);
  await page.getByRole('button', {name:'Oval',exact:true}).click();
  await delay(300);
  result.filterOvalAfterFifth = { caption:await caption(page), slides:await page.locator('[aria-roledescription="slide"]').count(), currentDots:await page.locator('button[aria-current="true"]').count() };
  await page.locator('#katalog').screenshot({path:path.join(dir,'filter-bug.png')});
  await page.getByRole('button', {name:'Go to slide 1',exact:true}).click();
  await delay(700);
  result.filterRecovered = await caption(page);
  const frame = page.locator('[class*="CoverflowCarousel_carouselFrame"]');
  await frame.focus();
  await page.keyboard.press('Enter');
  await page.getByRole('dialog').waitFor();
  result.dialog = { text:await page.getByRole('dialog').innerText(), whatsapp:await page.locator('a[data-placement="product_dialog"]').getAttribute('href'), focus:await page.evaluate(()=>document.activeElement?.getAttribute('role')) };
  await page.getByRole('dialog').screenshot({path:path.join(dir,'dialog-1440.png')});
  result.tabFocus = [];
  for (let i=0;i<5;i++) {
    await page.keyboard.press('Tab');
    result.tabFocus.push(await page.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.innerText?.slice(0,80),placement:document.activeElement.dataset.placement,inDialog:!!document.activeElement.closest('[role="dialog"]')})));
  }
  await page.keyboard.press('Escape');
  result.escape = { closed:await page.getByRole('dialog').count()===0, returnedToCarousel:await frame.evaluate(e=>document.activeElement===e) };
  await page.getByRole('button', {name:'Semua',exact:true}).click();
  await page.getByRole('button', {name:'Go to slide 1',exact:true}).click();
  await delay(700);
  const other = page.locator('[aria-roledescription="slide"]').nth(1);
  result.sideClickTarget = await other.locator('img').getAttribute('alt');
  await other.click({position:{x:100,y:100}});
  await delay(250);
  result.sideClickOpened = await page.locator('#dialog-title').innerText().catch(()=>null);
  if (await page.getByRole('dialog').count()) await page.keyboard.press('Escape');
  await page.locator('header a[href="#faq"]').click();
  await delay(500);
  result.anchor = await page.evaluate(()=>({scrollY,headerBottom:document.querySelector('header').getBoundingClientRect().bottom,faqTop:document.querySelector('#faq').getBoundingClientRect().top,faqHeadingTop:document.querySelector('#faq h2').getBoundingClientRect().top}));
  await page.locator('summary').first().click();
  result.faqOpens = await page.locator('details').first().getAttribute('open') !== null;
  await page.setViewportSize({width:390,height:844});
  await page.goto(target,{waitUntil:'networkidle'});
  await frame.focus();
  await page.keyboard.press('Enter');
  await page.getByRole('dialog').waitFor();
  await page.screenshot({path:path.join(dir,'dialog-390.png')});
  result.mobileDialog = await page.getByRole('dialog').evaluate(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,imageHeight:e.querySelector('img').getBoundingClientRect().height,bodyOverflow:getComputedStyle(document.body).overflow}));
  await page.mouse.move(190,400);
  const beforeScroll = await page.evaluate(()=>({page:scrollY,modal:document.querySelector('[role="dialog"]').scrollTop}));
  await page.mouse.wheel(0,600);
  await delay(500);
  result.modalWheel = { before:beforeScroll, after:await page.evaluate(()=>({page:scrollY,modal:document.querySelector('[role="dialog"]').scrollTop})) };
  await page.keyboard.press('Escape');
  const noJs = await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
  await noJs.goto(target,{waitUntil:'networkidle'});
  await noJs.locator('#katalog').screenshot({path:path.join(dir,'catalog-no-js.png')});
  result.noJs = {catalogText:await noJs.locator('#katalog').innerText(),waLinks:await noJs.locator('a[href^="https://wa.me/"]').count()};
  result.assets = [];
  for (const url of ['/robots.txt','/sitemap.xml','/favicon.ico','/404.html']) {
    const response = await page.request.get(target+url);
    result.assets.push({url,status:response.status()});
  }
  fs.writeFileSync(path.join(dir,'browser-results.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify(result,null,2));
  await browser.close();
})().catch(error=>{fs.writeFileSync(path.join(dir,'browser-results-partial.json'),JSON.stringify(result,null,2));console.error(error);process.exit(1);});
