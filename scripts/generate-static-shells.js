#!/usr/bin/env node
/**
 * Post-build step: turns the single-page React build into a crawlable static site.
 *
 * For every route (home, services, about, blog index, each blog post, contact, privacy)
 * it writes a real HTML file with the correct <title>, meta description, canonical,
 * Open Graph/Twitter tags and JSON-LD already in the raw HTML, plus real visible
 * content. Blog posts get their FULL article (not just the excerpt), FAQ section,
 * author bio and related-post links, so search engines and AI assistants that don't
 * run JavaScript (GPTBot, ClaudeBot, PerplexityBot and most others) can read and cite them.
 *
 * It also generates: build/404.html (served by Netlify with a real 404 status),
 * build/sitemap.xml (with image entries and real lastmod dates), build/feed.xml (RSS)
 * and build/llms.txt (a plain-language site summary for AI tools).
 *
 * SAFE FOR REAL VISITORS: the injected content lives inside <div id="root">, the same
 * element React renders into. When the JS bundle loads, ReactDOM.createRoot(...).render(<App/>)
 * replaces it with the interactive app. The JSON-LD block is <script id="schema-page">,
 * which src/App.jsx updates in place, so there is never a stale or duplicate schema block.
 *
 * SEO DATA: titles/descriptions/schema come from ./seo-data.js, a hand-kept duplicate of
 * the same block in src/App.jsx (see the comment there for why it isn't a shared import).
 * This script fails the build if the two copies drift apart.
 */

const fs = require('fs');
const path = require('path');
const { SITE_URL, organizationSchema, personSchema, pageConfigs, buildBlogPostSchema } = require('./seo-data');

const BUILD_DIR = path.join(__dirname, '../build');
const TEMPLATE_PATH = path.join(BUILD_DIR, 'index.html');
const BLOG_POSTS_PATH = path.join(BUILD_DIR, 'blog-posts.json');
const BLOG_MD_DIR = path.join(BUILD_DIR, 'blog');
const APP_JSX_PATH = path.join(__dirname, '../src/App.jsx');
const SEO_DATA_PATH = path.join(__dirname, 'seo-data.js');

const toAbsolute = (url) => (url && url.startsWith('/') ? `${SITE_URL}${url}` : url);
const escapeHtml = (str) =>
  String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const escapeXml = (str) => escapeHtml(str).replace(/'/g, '&apos;');
// JSON inside <script> must not contain "</script" — escape "<" to be safe.
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');
const formatDateAU = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

// ----- Guard: seo-data.js and App.jsx must hold the identical SEO block -----
function assertSeoBlocksInSync() {
  const app = fs.readFileSync(APP_JSX_PATH, 'utf-8');
  const data = fs.readFileSync(SEO_DATA_PATH, 'utf-8');
  const slice = (text, endMarker) => {
    const start = text.indexOf('\nconst SITE_URL =');
    const end = text.indexOf(endMarker, start);
    return start === -1 || end === -1 ? null : text.slice(start, end);
  };
  const appBlock = slice(app, '\n// Not part of the shared SEO block');
  const dataBlock = slice(data, '\nmodule.exports =');
  if (!appBlock || !dataBlock || appBlock.trimEnd() !== dataBlock.trimEnd()) {
    throw new Error(
      'SEO config drift: the block from `const SITE_URL` to the end of buildBlogPostSchema must be identical in scripts/seo-data.js and src/App.jsx.'
    );
  }
}

// ----- Blog content: same transforms as BlogPage in src/App.jsx -----
function renderPostContent(markdownBody) {
  let html = markdownBody.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  html = html.replace(/^### (.+)$/gm, (m, text) => `<h3>${text}</h3>`);
  html = html.replace(/^## (.+)$/gm, (m, text) => `<h2>${text}</h2>`);
  html = html.replace(/^---$/gm, '<hr />');
  return html;
}

function readPostBody(filename) {
  const raw = fs.readFileSync(path.join(BLOG_MD_DIR, filename), 'utf-8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  return match ? match[2] : raw;
}

// Same rule as getBlogPostTitleTag() in src/App.jsx — keep in sync.
const blogPostTitleTag = (post) =>
  post.seoTitle || (post.title.length > 45 ? post.title : `${post.title} | APP Coaching`);

// ----- Static markup -----
const SHELL_CSS = `
  <style>
    .static-shell{max-width:760px;margin:0 auto;padding:2rem 1.25rem 3rem;font-family:Inter,system-ui,sans-serif;line-height:1.7;color:#1a1a1a}
    .static-shell h1,.static-shell h2,.static-shell h3{font-family:Poppins,system-ui,sans-serif;color:#1F3A7D;line-height:1.3}
    .static-shell img{max-width:100%;height:auto}
    .static-shell pre{white-space:pre-wrap;overflow-wrap:anywhere}
    .static-shell nav a{margin-right:.75rem}
    .static-shell .meta{color:#555;font-size:.95rem}
    .static-shell details{border-bottom:1px solid #e5e7eb;padding:.75rem 0}
    .static-shell summary{font-weight:700;cursor:pointer}
  </style>`;

const NAV_HTML = `
    <nav aria-label="Site navigation">
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Book a discovery call</a>
    </nav>`;

const FOOTER_HTML = `
    <footer>
      <p>APP Coaching · AI finance coaching · Brisbane, Queensland, Australia · Online across Australia</p>
      <p><a href="/privacy">Privacy Policy &amp; Terms</a> · <a href="/feed.xml">RSS</a></p>
    </footer>`;

function shell(innerHtml) {
  return `${SHELL_CSS}
  <div class="static-shell">${NAV_HTML}
    ${innerHtml}
    ${FOOTER_HTML}
  </div>`;
}

function simplePageBody({ h1, paragraphs = [], extraHtml = '' }) {
  return shell(`
    <main>
      <h1>${escapeHtml(h1)}</h1>
      ${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n      ')}
      ${extraHtml}
    </main>`);
}

function renderPage(template, { title, description, canonical, ogType = 'website', ogImage, schema, bodyHtml, headExtra = '', noindex = false }) {
  let html = template;

  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}"/>`);

  if (canonical) {
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeHtml(canonical)}"/>`);
  } else {
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '');
  }

  if (noindex) {
    html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex, follow"/>');
  }

  const og = { 'og:type': ogType, 'og:url': canonical || SITE_URL, 'og:title': title, 'og:description': description };
  Object.entries(og).forEach(([prop, value]) => {
    const re = new RegExp(`<meta property="${prop}" content="[^"]*"\\s*/?>`);
    html = html.replace(re, `<meta property="${prop}" content="${escapeHtml(value)}"/>`);
  });
  const twitter = { 'twitter:title': title, 'twitter:description': description };
  Object.entries(twitter).forEach(([name, value]) => {
    const re = new RegExp(`<meta name="${name}" content="[^"]*"\\s*/?>`);
    html = html.replace(re, `<meta name="${name}" content="${escapeHtml(value)}"/>`);
  });
  if (ogImage) {
    const abs = escapeHtml(toAbsolute(ogImage));
    html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${abs}"/>`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${abs}"/>`);
  }

  const schemaTag = schema ? `<script type="application/ld+json" id="schema-page">${jsonForScript(schema)}</script>` : '';
  html = html.replace('</head>', `${headExtra}${schemaTag}</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  return html;
}

function writeFile(relPath, contents) {
  const filePath = path.join(BUILD_DIR, relPath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
  console.log(`  ✓ build/${relPath}`);
}

// Flat "<route>.html", NOT "<route>/index.html": Netlify serves "/services" straight from
// "services.html" with no redirect, keeping one consistent no-trailing-slash URL everywhere.
const writeRoutePage = (routePath, html) => writeFile(routePath === '' ? 'index.html' : `${routePath}.html`, html);

function relatedPostsFor(post, allPosts) {
  const others = allPosts.filter((p) => p.slug !== post.slug);
  const shared = (p) => (p.categories || []).some((c) => (post.categories || []).includes(c));
  return [...others.filter(shared), ...others.filter((p) => !shared(p))].slice(0, 3);
}

try {
  assertSeoBlocksInSync();

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('❌ build/index.html not found — run `react-scripts build` first.');
    process.exit(1);
  }
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  console.log('🔧 Generating static pages, sitemap, feed and llms.txt...');

  const blogPosts = fs.existsSync(BLOG_POSTS_PATH) ? JSON.parse(fs.readFileSync(BLOG_POSTS_PATH, 'utf-8')) : [];
  if (!blogPosts.length) console.warn('⚠️  blog-posts.json not found or empty — skipping blog pages.');

  const latestPostsHtml = blogPosts.length
    ? `<h2>Latest from the blog</h2>
      <ul>
        ${blogPosts.slice(0, 3).map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></li>`).join('\n        ')}
      </ul>`
    : '';

  // ----- Static site pages -----
  const staticBodyContent = {
    home: {
      h1: 'Unlock your finances with AI',
      paragraphs: [
        'AI finance coaching · Brisbane & online across Australia.',
        pageConfigs.home.description,
        'I help everyday Australians, young finance professionals and small business owners use AI tools like ChatGPT, Claude and Gemini to turn their numbers into real answers, in plain English.'
      ],
      extraHtml: `<p><a href="/contact">Book a free 15-minute discovery call</a></p>\n      ${latestPostsHtml}`
    },
    services: {
      h1: 'APP Coaching Services',
      paragraphs: [
        pageConfigs.services.description,
        'AI for Your Personal Finances — turn bank data into spending insights, budgets and savings goals with AI.',
        'AI for Your Business Finances — use AI to explain your P&L, cash flow and reports, and automate finance admin.',
        'Excel + AI Skills — formulas, PivotTables and dashboards, built faster with AI; custom team training.',
        'Career Coaching for Finance Pros — AI skills, resumes, interviews and career strategy for graduates and young accountants.'
      ],
      extraHtml: '<p><a href="/contact">Book a free 15-minute discovery call</a></p>'
    },
    about: {
      h1: 'About Aaron Pacheco',
      paragraphs: [
        pageConfigs.about.description,
        personSchema.description,
        `${personSchema.jobTitle}. Background includes Flight Centre, PwC, Coronis Group, and Aveo Group. Studied at Queensland University of Technology (QUT).`
      ],
      extraHtml: '<p><a href="https://www.linkedin.com/in/aaronpacheco" rel="me">Aaron Pacheco on LinkedIn</a></p>'
    },
    contact: {
      h1: 'Get in Touch',
      paragraphs: [
        pageConfigs.contact.description,
        'The discovery call is a free, no-pressure 15-minute conversation about where confusion is costing you most — in your numbers, your tools, or your career — and whether coaching is the right fit.'
      ],
      extraHtml: '<p><a href="https://cal.com/app-coaching-xcgvda">Book your discovery call</a></p>'
    },
    privacy: {
      h1: 'Privacy Policy & Terms of Service',
      paragraphs: [pageConfigs.privacy.description]
    }
  };

  Object.entries(staticBodyContent).forEach(([routeKey, content]) => {
    const config = pageConfigs[routeKey];
    const html = renderPage(template, {
      title: config.title,
      description: config.description,
      canonical: config.canonical,
      ogType: config.ogType,
      schema: config.schema,
      bodyHtml: simplePageBody(content)
    });
    writeRoutePage(routeKey === 'home' ? '' : routeKey, html);
  });

  // ----- Blog index -----
  const blogIndexList = `
      <ul>
        ${blogPosts
          .map(
            (p) => `<li>
          <h2><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></h2>
          <p class="meta">${formatDateAU(p.date)}</p>
          <p>${escapeHtml(p.excerpt)}</p>
        </li>`
          )
          .join('\n        ')}
      </ul>`;
  writeRoutePage(
    'blog',
    renderPage(template, {
      title: pageConfigs.blog.title,
      description: pageConfigs.blog.description,
      canonical: pageConfigs.blog.canonical,
      schema: pageConfigs.blog.schema,
      bodyHtml: simplePageBody({ h1: 'APP Coaching Blog', paragraphs: [pageConfigs.blog.description], extraHtml: blogIndexList })
    })
  );

  // ----- Blog posts: full article -----
  blogPosts.forEach((post) => {
    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
    const description = post.metaDescription || post.excerpt;
    const articleHtml = renderPostContent(readPostBody(post.filename));

    const faqHtml =
      post.faq && post.faq.length
        ? `<section aria-labelledby="post-faq-heading">
        <h2 id="post-faq-heading">Frequently Asked Questions</h2>
        ${post.faq.map((f) => `<details><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`).join('\n        ')}
      </section>`
        : '';

    const related = relatedPostsFor(post, blogPosts);
    const relatedHtml = related.length
      ? `<aside aria-label="Related posts">
        <h2>More posts</h2>
        <ul>
          ${related.map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></li>`).join('\n          ')}
        </ul>
      </aside>`
      : '';

    const updatedLine = post.updated && post.updated !== post.date ? ` · Updated <time datetime="${post.updated}">${formatDateAU(post.updated)}</time>` : '';

    const body = shell(`
    <nav aria-label="Breadcrumb" class="meta"><a href="/">Home</a> › <a href="/blog">Blog</a> › ${escapeHtml(post.title)}</nav>
    <main>
      <article>
        <header>
          <h1>${escapeHtml(post.title)}</h1>
          <p class="meta">By <a href="/about" rel="author">Aaron Pacheco</a> · <time datetime="${post.date}">${formatDateAU(post.date)}</time>${updatedLine}</p>
        </header>
        <div class="post-content">
${articleHtml}
        </div>
        ${faqHtml}
        <section aria-label="About the author">
          <h2>About the author</h2>
          <p><strong>Aaron Pacheco</strong> is a Brisbane Chartered Accountant and the founder of APP Coaching. He has 10+ years in finance at organisations including PwC, Flight Centre and Aveo, and helps Australians unlock their personal and business finances with AI, in Brisbane and online. <a href="/contact">Book a free discovery call</a>.</p>
        </section>
      </article>
      ${relatedHtml}
    </main>`);

    const headExtra =
      `<meta property="article:published_time" content="${post.date}"/>` +
      `<meta property="article:modified_time" content="${post.updated || post.date}"/>` +
      `<meta property="article:author" content="${SITE_URL}/about"/>` +
      (post.categories && post.categories[0] ? `<meta property="article:section" content="${escapeHtml(post.categories[0])}"/>` : '');

    writeRoutePage(
      `blog/${post.slug}`,
      renderPage(template, {
        title: blogPostTitleTag(post),
        description,
        canonical: canonicalUrl,
        ogType: 'article',
        ogImage: post.heroImage,
        schema: buildBlogPostSchema(post),
        bodyHtml: body,
        headExtra
      })
    );
  });

  // ----- 404 (Netlify serves build/404.html with a real 404 status for unknown URLs) -----
  writeFile(
    '404.html',
    renderPage(template, {
      title: 'Page Not Found | APP Coaching',
      description: 'This page could not be found. Explore AI finance coaching from APP Coaching in Brisbane.',
      canonical: null,
      noindex: true,
      schema: null,
      bodyHtml: simplePageBody({
        h1: "This page doesn't exist",
        paragraphs: ["The link may be old or mistyped. Here's where most people are headed:"],
        extraHtml: '<p><a href="/">Home</a> · <a href="/services">Coaching services</a> · <a href="/blog">Blog</a> · <a href="/contact">Book a discovery call</a></p>'
      })
    })
  );

  // ----- sitemap.xml -----
  const latestPostDate = blogPosts.map((p) => p.updated || p.date).sort().pop();
  const maxDate = (...dates) => dates.filter(Boolean).sort().pop();
  const sitemapEntries = [
    { loc: pageConfigs.home.canonical, lastmod: pageConfigs.home.lastmod, priority: '1.0', image: organizationSchema.logo },
    { loc: pageConfigs.services.canonical, lastmod: pageConfigs.services.lastmod, priority: '0.9' },
    { loc: pageConfigs.about.canonical, lastmod: pageConfigs.about.lastmod, priority: '0.8', image: personSchema.image },
    { loc: pageConfigs.blog.canonical, lastmod: maxDate(pageConfigs.blog.lastmod, latestPostDate), priority: '0.9' },
    ...blogPosts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.updated || p.date, priority: '0.8', image: toAbsolute(p.heroImage), imageTitle: p.title })),
    { loc: pageConfigs.contact.canonical, lastmod: pageConfigs.contact.lastmod, priority: '0.8' },
    { loc: pageConfigs.privacy.canonical, lastmod: pageConfigs.privacy.lastmod, priority: '0.3' }
  ];
  writeFile(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries
  .map(
    (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <priority>${e.priority}</priority>${
      e.image
        ? `
    <image:image>
      <image:loc>${escapeXml(e.image)}</image:loc>
    </image:image>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>
`
  );

  // ----- feed.xml (RSS 2.0) -----
  const rfc822 = (iso) => new Date(`${iso}T00:00:00+10:00`).toUTCString();
  writeFile(
    'feed.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>APP Coaching Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(pageConfigs.blog.description)}</description>
    <language>en-au</language>
${blogPosts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`
  );

  // ----- llms.txt (https://llmstxt.org) -----
  writeFile(
    'llms.txt',
    `# APP Coaching

> APP Coaching (appcoaching.io) is a Brisbane, Queensland-based coaching business run by Aaron Pacheco, a Chartered Accountant with 10+ years in finance at organisations including PwC, Flight Centre and Aveo. Its mission is helping Australians unlock their personal and business finances with AI: 1-on-1 coaching on using ChatGPT, Claude and Gemini for personal finance, small business finance, Excel + AI skills and finance careers, in Brisbane and online across Australia.

Coaching is education, not licensed financial advice: it covers using AI to understand your numbers, budgeting systems, Excel skills and AI workflows, and does not recommend specific financial products. A free 15-minute discovery call is available.

## Main pages

- [Home](${SITE_URL}/): ${pageConfigs.home.description}
- [Services](${SITE_URL}/services): ${pageConfigs.services.description}
- [About Aaron Pacheco](${SITE_URL}/about): ${pageConfigs.about.description}
- [Book a discovery call](${SITE_URL}/contact): ${pageConfigs.contact.description}

## Blog

${blogPosts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.metaDescription || p.excerpt}`).join('\n')}

## Optional

- [RSS feed](${SITE_URL}/feed.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
- [Privacy Policy & Terms](${SITE_URL}/privacy)
`
  );

  console.log(`✨ Done. ${Object.keys(staticBodyContent).length + 1} site pages + ${blogPosts.length} blog posts + 404, sitemap, feed, llms.txt.`);
} catch (error) {
  console.error('❌ Error generating static pages:', error.message);
  process.exit(1);
}
