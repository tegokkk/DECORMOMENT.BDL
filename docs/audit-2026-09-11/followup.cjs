const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('C:/Users/ACER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:960}});
 page.setDefaultTimeout(5000);
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 const result={};
 result.fonts=await page.evaluate(()=>({declared:[...document.fonts].map(f=>({family:f.family,status:f.status})),body:getComputedStyle(document.body).fontFamily,title:getComputedStyle(document.querySelector('h1')).fontFamily,fontRequests:performance.getEntriesByType('resource').filter(e=>e.name.includes('.woff')).map(e=>e.name)}));
 const frame=page.locator('[class*="CoverflowCarousel_carouselFrame"]');
 await frame.focus();await page.keyboard.press('Enter');
 await page.getByRole('dialog').waitFor();
 await page.mouse.move(930,600);
 result.desktopBefore=await page.evaluate(()=>({page:scrollY,modal:document.querySelector('[role="dialog"]').scrollTop}));
 await page.mouse.wheel(0,600);await page.waitForTimeout(800);
 result.desktopAfter=await page.evaluate(()=>({page:scrollY,modal:document.querySelector('[role="dialog"]').scrollTop}));
 await page.keyboard.press('Escape');
 await page.locator('#katalog').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 await page.locator('#katalog img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
 await page.locator('#katalog').screenshot({path:path.join(__dirname,'catalog-1440-loaded.png')});
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 mobile.setDefaultTimeout(5000);
 await mobile.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 result.mobileAccessibility=await mobile.locator('a[data-placement="floating"]').ariaSnapshot();
 const mf=mobile.locator('[class*="CoverflowCarousel_carouselFrame"]');
 await mf.scrollIntoViewIfNeeded();
 await mobile.locator('[aria-roledescription="slide"]').first().tap();
 await mobile.getByRole('dialog').waitFor();
 const cdp=await mobile.context().newCDPSession(mobile);
 const touch=async(type,y)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x:190,y,radiusX:1,radiusY:1,force:1}]});
 result.touchBefore=await mobile.evaluate(()=>({page:scrollY,modal:document.querySelector('[role="dialog"]').scrollTop}));
 await touch('touchStart',700);
 for(let y=675;y>=200;y-=25){await touch('touchMove',y);await mobile.waitForTimeout(16);}
 await touch('touchEnd',0);await mobile.waitForTimeout(400);
 result.touchAfter=await mobile.evaluate(()=>({page:scrollY,modal:document.querySelector('[role="dialog"]').scrollTop}));
 await mobile.screenshot({path:path.join(__dirname,'dialog-touch-scrolled.png')});
 await mobile.getByRole('button',{name:'Tutup detail produk'}).evaluate(e=>e.click());
 result.productChecks=[];
 for(let i=1;i<=5;i++){
  await page.getByRole('button',{name:`Go to slide ${i}`,exact:true}).click();
  await frame.focus();await page.keyboard.press('Enter');
  const title=await page.locator('#dialog-title').innerText();
  const href=await page.locator('a[data-placement="product_dialog"]').getAttribute('href');
  result.productChecks.push({title,message:decodeURIComponent(new URL(href).searchParams.get('text'))});
  await page.keyboard.press('Escape');
 }
 fs.writeFileSync(path.join(__dirname,'followup-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
