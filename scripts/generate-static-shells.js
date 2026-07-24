#!/usr/bin/env node
/**
 * Post-build step: generates a real, static index.html for every route
 * (home, services, about, blog index, each blog post, contact, privacy)
 * with the correct <title>, meta description, canonical link, OG/Twitter
 * tags, and JSON-LD schema already baked into the raw HTML — plus a small
 * amount of real visible content (an H1, a paragraph, and real <a href>
 * navigation links).
 *
 * WHY: This is a Create React App single-page app. Without this step, every
 * route serves the exact same generic index.html, and per-page metadata is
 * only added by JavaScript after the app mounts in the browser. Netlify's
 * Prerender extension fixes this for bots on its allowlist (Googlebot,
 * Bingbot, common AI/social crawlers), but anything outside that allowlist
 * — including some AI tools, most third-party SEO auditors, and any bot
 * Netlify hasn't added yet — still sees the generic shell. Baking real
 * static HTML per route removes that dependency entirely: every crawler,
 * allowlisted or not, sees the correct content immediately.
 *
 * SAFE FOR REAL VISITORS: the injected content lives inside <div id="root">,
 * the same element React renders into. When the JS bundle loads,
 * ReactDOM.createRoot(...).render(<App/>) fully replaces it with the real
 * interactive app — same as today, except real users now see meaningful
 * content for an instant instead of a blank page while the bundle loads.
 *
 * SINGLE SOURCE OF TRUTH: all title/description/canonical/schema values
 * come from src/seo-config.js — the exact same file src/App.jsx imports for
 * its client-side <title>/meta injection. Change copy in one place only.
 */

const fs = require('fs');
const path = require('path');
const { organizationSchema, personSchema, pageConfigs } = require('../src/seo-config');

const BUILD_DIR = path.join(__dirname, '../build');
const TEMPLATE_PATH = path.join(BUILD_DIR, 'index.html');
const BLOG_POSTS_PATH = path.join(BUILD_DIR, 'blog-posts.json');
const SITE_URL = 'https://appcoaching.io';

const toAbsolute = (url) => (url && url.startsWith('/') ? `${SITE_URL}${url}` : url);
const escapeHtml = (str) =>
  String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const NAV_LINKS_HTML = `
    <a href="/">Home</a> ·
    <a href="/services">Services</a> ·
    <a href="/about">About</a> ·
    <a href="/blog">Blog</a> ·
    <a href="/contact">Contact</a> ·
    <a href="/privacy">Privacy Policy &amp; Terms</a>`;

function buildBodyHtml({ h1, paragraphs = [], extraLinksHtml = '' }) {
  const paragraphHtml = paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n    ');
  return `
  <div style="max-width:720px;margin:0 auto;padding:2rem 1.5rem;font-family:sans-serif;line-height:1.6;">
    <h1>${escapeHtml(h1)}</h1>
    ${paragraphHtml}
    <nav aria-label="Site navigation">${NAV_LINKS_HTML}</nav>
    ${extraLinksHtml}
  </div>`;
}

function renderPage(template, { title, description, canonical, ogType = 'website', ogImage, schema, bodyHtml }) {
  let html = template;

  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);

  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}"/>`
  );

  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}"/>`
  );

  const ogReplacements = {
    'og:type': ogType,
    'og:url': canonical,
    'og:title': title,
    'og:description': description
  };
  Object.entries(ogReplacements).forEach(([prop, value]) => {
    const re = new RegExp(`<meta property="${prop}" content="[^"]*"\\s*/?>`);
    html = html.replace(re, `<meta property="${prop}" content="${escapeHtml(value)}"/>`);
  });
  if (ogImage) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${escapeHtml(toAbsolute(ogImage))}"/>`
    );
  }

  const twitterReplacements = { 'twitter:title': title, 'twitter:description': description };
  Object.entries(twitterReplacements).forEach(([name, value]) => {
    const re = new RegExp(`<meta name="${name}" content="[^"]*"\\s*/?>`);
    html = html.replace(re, `<meta name="${name}" content="${escapeHtml(value)}"/>`);
  });
  if (ogImage) {
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${escapeHtml(toAbsolute(ogImage))}"/>`
    );
  }

  if (schema) {
    const schemaTag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
    html = html.replace('</head>', `${schemaTag}</head>`);
  }

  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  return html;
}

function writeRoutePage(routePath, html) {
  const dir = routePath === '' ? BUILD_DIR : path.join(BUILD_DIR, routePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✓ build/${routePath ? routePath + '/' : ''}index.html`);
}

try {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('❌ build/index.html not found — run `react-scripts build` first.');
    process.exit(1);
  }
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  console.log('🔧 Generating static per-route SEO shells...');

  // ----- Static site pages (from pageConfigs) -----
  const staticBodyContent = {
    home: {
      h1: 'Your Most Expensive Problem: Confusion',
      paragraphs: [pageConfigs.home.description]
    },
    services: {
      h1: 'APP Coaching Services',
      paragraphs: [
        pageConfigs.services.description,
        'Finance Coaching — personal & business finance strategy, profit margins, cash flow clarity.',
        'Excel Coaching — data analysis, visualization, custom modeling, dashboards, pivot tables, automation.',
        'AI Coaching — prompting, AI workflows, agentic AI, custom AI tools, AI adoption strategy.',
        'Operations & Workflow Coaching — process design, workflow optimization, task automation, systems thinking.'
      ]
    },
    about: {
      h1: 'About Aaron Pacheco',
      paragraphs: [pageConfigs.about.description]
    },
    contact: {
      h1: 'Get in Touch',
      paragraphs: [pageConfigs.contact.description]
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
      schema: config.schema,
      bodyHtml: buildBodyHtml(content)
    });
    writeRoutePage(routeKey === 'home' ? '' : routeKey, html);
  });

  // ----- Blog index + individual posts (from blog-posts.json) -----
  let blogPosts = [];
  if (fs.existsSync(BLOG_POSTS_PATH)) {
    blogPosts = JSON.parse(fs.readFileSync(BLOG_POSTS_PATH, 'utf-8'));
  } else {
    console.warn('⚠️  blog-posts.json not found in build/ — skipping blog pages.');
  }

  const blogIndexLinksHtml = `
    <ul>
      ${blogPosts.map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></li>`).join('\n      ')}
    </ul>`;
  const blogIndexHtml = renderPage(template, {
    title: pageConfigs.blog.title,
    description: pageConfigs.blog.description,
    canonical: pageConfigs.blog.canonical,
    schema: pageConfigs.blog.schema,
    bodyHtml: buildBodyHtml({
      h1: 'APP Coaching Blog',
      paragraphs: [pageConfigs.blog.description],
      extraLinksHtml: blogIndexLinksHtml
    })
  });
  writeRoutePage('blog', blogIndexHtml);

  blogPosts.forEach((post) => {
    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: toAbsolute(post.heroImage),
      author: personSchema,
      datePublished: post.date,
      description: post.excerpt,
      url: canonicalUrl,
      publisher: organizationSchema
    };
    const html = renderPage(template, {
      title: `${post.title} | APP Coaching`,
      description: post.excerpt,
      canonical: canonicalUrl,
      ogType: 'article',
      ogImage: post.heroImage,
      schema: blogSchema,
      bodyHtml: buildBodyHtml({
        h1: post.title,
        paragraphs: [post.excerpt, `Published ${new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })} by Aaron Pacheco.`],
        extraLinksHtml: '<p><a href="/blog">← Back to all posts</a></p>'
      })
    });
    writeRoutePage(`blog/${post.slug}`, html);
  });

  console.log(`✨ Done. ${Object.keys(staticBodyContent).length} site pages + ${blogPosts.length} blog posts generated.`);
} catch (error) {
  console.error('❌ Error generating static shells:', error.message);
  process.exit(1);
}
