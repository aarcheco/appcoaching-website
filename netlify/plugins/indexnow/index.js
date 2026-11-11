// Pings IndexNow (Bing, Yandex, Seznam, Naver…) with every page in the sitemap after a
// successful PRODUCTION deploy, so new and updated posts are picked up within hours.
// Google doesn't use IndexNow; it finds changes through sitemap.xml as usual.
// Never fails the build: any error is logged and ignored.
const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'appcoaching.io';
const KEY = '96b4339d365dce5da46420d23ebbedf8'; // must match public/96b4339d365dce5da46420d23ebbedf8.txt

const post = (body) => new Promise((resolve, reject) => {
  const data = JSON.stringify(body);
  const req = https.request({
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(data) },
    timeout: 15000
  }, (res) => { res.resume(); resolve(res.statusCode); });
  req.on('timeout', () => req.destroy(new Error('timeout')));
  req.on('error', reject);
  req.write(data);
  req.end();
});

module.exports = {
  onSuccess: async ({ constants }) => {
    if (process.env.CONTEXT !== 'production') {
      console.log('IndexNow: skipped (not a production deploy)');
      return;
    }
    try {
      const sitemap = fs.readFileSync(path.join(constants.PUBLISH_DIR, 'sitemap.xml'), 'utf-8');
      const urlList = [...sitemap.matchAll(/<loc>(https:\/\/appcoaching\.io[^<]*)<\/loc>/g)].map((m) => m[1]);
      if (!urlList.length) { console.log('IndexNow: no URLs found in sitemap'); return; }
      const status = await post({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList });
      console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${status}`);
    } catch (err) {
      console.log('IndexNow: ping failed (ignored):', err.message);
    }
  }
};
