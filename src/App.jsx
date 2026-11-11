import React, { useState, useEffect, useCallback } from 'react';

// ===== PAGE CONFIGURATIONS FOR SEO (Static, outside component) =====
// IMPORTANT: this object is intentionally duplicated in scripts/seo-data.js, which the
// build-time static-shell generator (scripts/generate-static-shells.js) reads in plain
// Node. They must be kept byte-for-byte identical (same pattern as generateSlug() in
// scripts/publish-blog.js). Do NOT `require()` a CommonJS file from here — CRA's
// webpack/babel pipeline treats every file under src/ as an ES module, and a plain
// `module.exports =` inside one throws a hard runtime crash ("ES Modules may not assign
// module.exports") that silently breaks the app for every visitor. This bit us once
// already; keep this file self-contained.
const SITE_URL = 'https://appcoaching.io';
const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#aaron`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LINKEDIN_URL = 'https://www.linkedin.com/in/aaronpacheco';
// Google Business Profile (Maps listing) — links the site and the profile for local search
const GOOGLE_MAPS_URL = 'https://maps.google.com/?cid=16175503403108466611';
const LOGO_URL = `${SITE_URL}/Aaron_Pacheco_300dpi_001_6x6.jpg`;

// Local SEO: Brisbane-based, serving Brisbane, Queensland and the rest of Australia online.
// Service-area business — no street address is published on purpose.
const businessAddress = {
  '@type': 'PostalAddress',
  addressLocality: 'Brisbane',
  addressRegion: 'QLD',
  addressCountry: 'AU'
};

const areaServed = [
  { '@type': 'City', name: 'Brisbane', sameAs: 'https://en.wikipedia.org/wiki/Brisbane' },
  { '@type': 'State', name: 'Queensland', sameAs: 'https://en.wikipedia.org/wiki/Queensland' },
  { '@type': 'Country', name: 'Australia' }
];

const serviceList = [
  {
    name: 'AI for Personal Finance Coaching',
    description: 'Use AI tools like ChatGPT, Claude and Gemini to understand spending, budgets, savings goals and big money decisions, in plain English.'
  },
  {
    name: 'AI for Business Finance Coaching',
    description: 'Use AI to read and explain your P&L, cash flow and reports, turn accounting exports into insights, and automate finance admin.'
  },
  {
    name: 'Excel + AI Skills Coaching',
    description: 'Excel and Google Sheets skills, formulas, PivotTables and dashboards, built faster with AI, including custom team training.'
  },
  {
    name: 'Career Coaching for Finance Professionals',
    description: 'AI skills, resume review, interview prep and career strategy for graduates, young accountants and analysts.'
  }
].map((s) => ({
  '@type': 'Service',
  name: s.name,
  serviceType: s.name,
  description: s.description,
  provider: { '@id': BUSINESS_ID },
  areaServed
}));

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Aaron Pacheco',
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/aaron-headshot-professional.jpg`,
  jobTitle: 'Chartered Accountant & AI Finance Coach',
  description: 'Brisbane Chartered Accountant helping everyday Australians, young finance professionals and small business owners unlock their finances with AI.',
  homeLocation: { '@type': 'Place', name: 'Brisbane, Queensland, Australia' },
  worksFor: { '@id': BUSINESS_ID },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Queensland University of Technology (QUT)' },
  knowsAbout: ['Artificial intelligence', 'Personal finance', 'Financial literacy', 'Accounting', 'Prompt engineering', 'Microsoft Excel', 'Coaching'],
  sameAs: [LINKEDIN_URL]
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': BUSINESS_ID,
  name: 'APP Coaching',
  alternateName: 'AppCoaching.io',
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description: 'Brisbane-based 1-on-1 coaching that helps Australians unlock their personal and business finances with AI, in Brisbane and online across Australia.',
  address: businessAddress,
  areaServed,
  founder: { '@id': PERSON_ID },
  knowsAbout: ['Artificial intelligence', 'Personal finance', 'Financial literacy', 'Microsoft Excel'],
  hasMap: GOOGLE_MAPS_URL,
  sameAs: [LINKEDIN_URL, GOOGLE_MAPS_URL],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'aarcheco@gmail.com',
    url: 'https://cal.com/app-coaching-xcgvda',
    areaServed: 'AU',
    availableLanguage: 'English'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Coaching services',
    itemListElement: serviceList.map((service) => ({ '@type': 'Offer', itemOffered: service }))
  }
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'APP Coaching',
  inLanguage: 'en-AU',
  publisher: { '@id': BUSINESS_ID }
};

// Strips the top-level @context so an entity can sit inside an @graph.
const asGraphNode = ({ '@context': _ctx, ...rest }) => rest;

const webPageNode = ({ type = 'WebPage', url, name, description, extra = {} }) => ({
  '@type': type,
  '@id': `${url}#webpage`,
  url,
  name,
  description,
  inLanguage: 'en-AU',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': BUSINESS_ID },
  ...extra
});

const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url }))
});

const pageConfigs = {
  home: {
    id: 'home',
    title: 'AI Finance Coaching in Brisbane | APP Coaching',
    description: 'Unlock your finances with AI. 1-on-1 coaching from a Brisbane Chartered Accountant on using ChatGPT, Claude and Gemini for personal and business finance.',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    lastmod: '2026-11-11',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        asGraphNode(organizationSchema),
        asGraphNode(personSchema),
        websiteSchema,
        webPageNode({
          url: `${SITE_URL}/`,
          name: 'AI Finance Coaching in Brisbane | APP Coaching',
          description: 'Unlock your finances with AI: 1-on-1 coaching from a Brisbane Chartered Accountant, in Brisbane and online across Australia.'
        })
      ]
    }
  },
  services: {
    id: 'services',
    title: 'AI Finance Coaching Services | Brisbane | APP Coaching',
    description: 'AI for personal and business finance, Excel + AI skills and finance career coaching from a Brisbane Chartered Accountant. In Brisbane and online.',
    canonical: `${SITE_URL}/services`,
    lastmod: '2026-11-11',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        webPageNode({
          url: `${SITE_URL}/services`,
          name: 'APP Coaching Services',
          description: 'AI finance coaching in Brisbane and online across Australia.',
          extra: { mainEntity: { '@id': BUSINESS_ID } }
        }),
        asGraphNode(organizationSchema),
        breadcrumb([['Home', `${SITE_URL}/`], ['Services', `${SITE_URL}/services`]])
      ]
    }
  },
  about: {
    id: 'about',
    title: 'About Aaron Pacheco, Brisbane Finance Coach | APP Coaching',
    description: 'Meet Aaron Pacheco: Brisbane Chartered Accountant with 10+ years at PwC, Flight Centre and more, helping Australians unlock their finances with AI.',
    canonical: `${SITE_URL}/about`,
    lastmod: '2026-11-11',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        webPageNode({
          type: ['ProfilePage', 'AboutPage'],
          url: `${SITE_URL}/about`,
          name: 'About Aaron Pacheco',
          description: 'Aaron Pacheco - Brisbane Chartered Accountant and founder of APP Coaching, helping Australians unlock their finances with AI.',
          extra: { mainEntity: { '@id': PERSON_ID } }
        }),
        {
          ...asGraphNode(personSchema),
          affiliation: [
            { '@type': 'Organization', name: 'Flight Centre' },
            { '@type': 'Organization', name: 'PwC' },
            { '@type': 'Organization', name: 'Coronis Group' },
            { '@type': 'Organization', name: 'Aveo Group' }
          ]
        },
        breadcrumb([['Home', `${SITE_URL}/`], ['About', `${SITE_URL}/about`]])
      ]
    }
  },
  blog: {
    id: 'blog',
    title: 'AI & Personal Finance Blog | APP Coaching Brisbane',
    description: 'Practical guides on using AI for personal and business finance from Brisbane Chartered Accountant Aaron Pacheco, with prompts you can use straight away.',
    canonical: `${SITE_URL}/blog`,
    lastmod: '2026-11-11',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        webPageNode({
          type: ['CollectionPage', 'Blog'],
          url: `${SITE_URL}/blog`,
          name: 'APP Coaching Blog',
          description: 'Practical guides on using AI for personal and business finance from Aaron Pacheco.',
          extra: { author: { '@id': PERSON_ID }, publisher: { '@id': BUSINESS_ID } }
        }),
        breadcrumb([['Home', `${SITE_URL}/`], ['Blog', `${SITE_URL}/blog`]])
      ]
    }
  },
  contact: {
    id: 'contact',
    title: 'Book a Free Discovery Call | APP Coaching Brisbane',
    description: 'Book a free 15-minute discovery call with Aaron Pacheco, Brisbane Chartered Accountant and AI finance coach. Online across Australia.',
    canonical: `${SITE_URL}/contact`,
    lastmod: '2026-11-11',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        webPageNode({
          type: 'ContactPage',
          url: `${SITE_URL}/contact`,
          name: 'Book a Discovery Call',
          description: 'Contact APP Coaching in Brisbane to book a free discovery call.'
        }),
        breadcrumb([['Home', `${SITE_URL}/`], ['Contact', `${SITE_URL}/contact`]])
      ]
    }
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy & Terms of Service | APP Coaching',
    description: 'Read APP Coaching\'s Privacy Policy and Terms of Service, covering data collection, cookies, and the terms for using this site and our coaching services.',
    canonical: `${SITE_URL}/privacy`,
    lastmod: '2026-07-24',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy & Terms of Service',
      description: 'Privacy Policy and Terms of Service for APP Coaching.',
      url: `${SITE_URL}/privacy`
    }
  }
};

// Builds the full JSON-LD @graph for one blog post: BlogPosting + breadcrumb (+ FAQPage).
const buildBlogPostSchema = (post) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.heroImage && post.heroImage.startsWith('/') ? `${SITE_URL}${post.heroImage}` : post.heroImage;
  const graph = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      image: image ? [image] : undefined,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      inLanguage: 'en-AU',
      url,
      mainEntityOfPage: url,
      author: { '@id': PERSON_ID, '@type': 'Person', name: 'Aaron Pacheco', url: `${SITE_URL}/about` },
      publisher: { '@id': BUSINESS_ID, '@type': 'ProfessionalService', name: 'APP Coaching', logo: { '@type': 'ImageObject', url: LOGO_URL } },
      isPartOf: { '@id': `${SITE_URL}/blog#webpage` },
      articleSection: post.categories && post.categories.length ? post.categories[0] : undefined,
      keywords: post.tags && post.tags.length ? post.tags.join(', ') : undefined
    },
    breadcrumb([['Home', `${SITE_URL}/`], ['Blog', `${SITE_URL}/blog`], [post.title, url]])
  ];
  if (post.faq && post.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      }))
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
};

// Not part of the shared SEO block above: client-only config for unknown URLs.
// (The static equivalent is build/404.html from scripts/generate-static-shells.js.)
const notFoundConfig = {
  id: 'notfound',
  title: 'Page Not Found | APP Coaching',
  description: 'This page could not be found. Explore finance, Excel and AI coaching from APP Coaching in Brisbane.',
  canonical: null,
  noindex: true,
  schema: null
};

export default function AppCoaching() {
  // ===== BLOG: "Copy prompt" buttons inside PAUL's Prompt boxes =====
  // Post HTML is injected via dangerouslySetInnerHTML, so one delegated listener
  // handles every <button class="paul-copy"> next to a <p class="paul-prompt">.
  useEffect(() => {
    const onClick = async (e) => {
      const btn = e.target.closest && e.target.closest('.paul-copy');
      if (!btn) return;
      const box = btn.closest('.paul-prompt-box') || btn.parentElement;
      const promptEl = box && box.querySelector('.paul-prompt');
      if (!promptEl) return;
      // textContent (not innerText) so it works while the <details> box is collapsed.
      const text = promptEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      const label = btn.textContent;
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = label; }, 2000);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // ===== GOOGLE ANALYTICS & GSC VERIFICATION =====
  useEffect(() => {
    // GSC verification meta tag lives statically in public/index.html (and so in every
    // generated page) — no need to inject a duplicate here.

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-K7SKEBLB50';
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-K7SKEBLB50');
  }, []);

  const [currentPage, setCurrentPage] = useState('home');
  const [leadUnlocked, setLeadUnlocked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [blogLoading, setBlogLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [blogViewMode, setBlogViewMode] = useState('post');
  const [blogSnippetType, setBlogSnippetType] = useState('');
  const [blogSearchTerm, setBlogSearchTerm] = useState('');
  const [expandedSnippets, setExpandedSnippets] = useState({});

  // ===== META TAG MANAGEMENT FOR SEO =====
  const updateMetaTags = (pageConfig) => {
    // Update title
    document.title = pageConfig.title;

    // Update or create meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = pageConfig.description;

    // Update or create canonical URL (the not-found view has none)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!pageConfig.canonical) {
      if (canonical) canonical.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = pageConfig.canonical;
    }

    // Update Open Graph tags
    const ogTags = {
      'og:title': pageConfig.ogTitle || pageConfig.title,
      'og:description': pageConfig.ogDescription || pageConfig.description,
      'og:url': pageConfig.canonical || `${SITE_URL}/`,
      'og:type': pageConfig.ogType || 'website'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    // Update Twitter Card tags
    const twitterTags = {
      'twitter:title': pageConfig.title,
      'twitter:description': pageConfig.description
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    // Reset share image (a blog post may have swapped it for its hero image)
    ['og:image', 'twitter:image'].forEach((key) => {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      const tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (tag) tag.content = LOGO_URL;
    });

    // Robots: only the not-found view is noindex
    setRobotsMeta(pageConfig.noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // One JSON-LD block per page, always id="schema-page". The build-time static
    // pages (scripts/generate-static-shells.js) bake in the same id, so the client
    // replaces it in place instead of leaving a stale or duplicate block behind.
    setPageSchema(pageConfig.schema);
  };

  const setRobotsMeta = (value) => {
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = value;
  };

  const setPageSchema = (schema) => {
    let schemaScript = document.getElementById('schema-page');
    if (!schema) {
      if (schemaScript) schemaScript.remove();
      return;
    }
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'schema-page';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);
  };

  // Same rule as scripts/generate-static-shells.js — keep in sync.
  const getBlogPostTitleTag = (post) => {
    if (post.seoTitle) return post.seoTitle;
    // Skip the " | APP Coaching" suffix on titles that are already long — keeping it
    // would push the <title> well past Google's ~60-char display budget.
    return post.title.length > 45 ? post.title : `${post.title} | APP Coaching`;
  };

  // Helper function to update blog post meta tags and schema
  const updateBlogPostMetaTags = (post) => {
    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
    const description = post.metaDescription || post.excerpt;
    const heroImage = post.heroImage && post.heroImage.startsWith('/') ? `${SITE_URL}${post.heroImage}` : post.heroImage;

    document.title = getBlogPostTitleTag(post);
    setRobotsMeta('index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = description;

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Update OG tags for blog post
    const ogTags = {
      'og:title': post.title,
      'og:description': description,
      'og:url': canonicalUrl,
      'og:type': 'article',
      'og:image': heroImage
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    const twitterTags = { 'twitter:title': post.title, 'twitter:description': description, 'twitter:image': heroImage };
    Object.entries(twitterTags).forEach(([name, content]) => {
      const tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) tag.content = content;
    });

    // BlogPosting + BreadcrumbList (+ FAQPage) — same builder the static pages use
    setPageSchema(buildBlogPostSchema(post));
  };

  // Update meta tags whenever the page or selected blog post changes. One effect (not two)
  // so going from a post back to the blog index also resets the title/description/schema.
  useEffect(() => {
    const post = currentPage === 'blog' && selectedBlogPost ? blogPosts.find(p => p.id === selectedBlogPost) : null;
    if (post) {
      updateBlogPostMetaTags(post);
      return;
    }
    const config = currentPage === 'notfound' ? notFoundConfig : (pageConfigs[currentPage] || pageConfigs.home);
    updateMetaTags(config);
    // The helpers only touch document.head and read module-level constants.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedBlogPost, blogPosts]);

  // Helper function to generate intelligent snippet titles based on content
  const generateSnippetTitle = (type, content) => {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();

    if (type === 'levelup') {
      // Create a clickbait-style summary from the first 2-3 sentences
      const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
      if (sentences.length > 0) {
        let title = sentences[0].trim();
        if (sentences.length > 1 && title.length < 40) {
          title += " — " + sentences[1].trim();
        }
        // Clean up and limit to 85 chars
        return title.substring(0, 85).trim() + (title.length > 85 ? '...' : '');
      }
      return cleanContent.substring(0, 85);
    } else if (type === 'prompt') {
      // For prompts, extract the key instruction
      const lines = cleanContent.split('\n').filter(l => l.trim());
      const firstLine = lines[0].substring(0, 65);
      return `Prompt: ${firstLine}`;
    } else if (type === 'formula') {
      // For formulas, extract formula name or pattern
      const formulaPattern = cleanContent.match(/([A-Z]+\(|[A-Z]+\s+formula)/i);
      if (formulaPattern) {
        return `Formula: ${formulaPattern[0].replace('(', '').trim()}`;
      }
      return `Excel Formula: ${cleanContent.substring(0, 50)}`;
    }
    return cleanContent.substring(0, 85);
  };

  // Helper function to generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // ===== URL ROUTING (clean URLs using History API) =====
  useEffect(() => {
    // Handle initial page load from URL pathname
    const getPageFromPath = (pathname) => {
      // Remove leading/trailing slashes
      const path = pathname.replace(/^\/|\/$/g, '') || 'home';
      const pathParts = path.split('/');
      const pageName = pathParts[0];
      const postSlug = pathParts[1];

      return { pageName, postSlug };
    };

    const VALID_PAGES = ['home', 'services', 'about', 'blog', 'contact', 'privacy'];

    // Unknown URLs show a proper "not found" view (and Netlify serves them with a real
    // HTTP 404 via build/404.html) instead of silently rendering the homepage.
    const applyRoute = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const { pageName, postSlug } = getPageFromPath(window.location.pathname);
      const tooDeep = path.split('/').length > (pageName === 'blog' ? 2 : 1);

      if (!VALID_PAGES.includes(pageName) || tooDeep) {
        setCurrentPage('notfound');
        return;
      }

      if (pageName === 'blog' && postSlug) {
        if (blogPosts.length === 0) {
          // Posts still loading — show the blog shell; this effect re-runs once they arrive.
          setCurrentPage('blog');
          return;
        }
        const post = blogPosts.find(p => p.slug === postSlug);
        if (post) {
          setCurrentPage('blog');
          setSelectedBlogPost(post.id);
        } else {
          setCurrentPage('notfound');
        }
        return;
      }

      setCurrentPage(pageName);
      if (pageName === 'blog') setSelectedBlogPost(null);
    };

    applyRoute();

    // Listen for popstate (back/forward buttons)
    const handlePopstate = () => applyRoute();

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, [blogPosts]);

  // Helper function to load blog posts (memoized with useCallback)
  const loadBlogPosts = useCallback(async () => {
    setBlogLoading(true);
    try {
      // Fetch manifest listing all blog posts (includes pre-parsed metadata)
      const manifestResponse = await fetch('/blog-posts.json');
      const manifest = await manifestResponse.json();

      // Fetch markdown content for each post
      const posts = await Promise.all(manifest.map(async (item) => {
        try {
          const fileResponse = await fetch(`/blog/${item.filename}`);
          const fileContent = await fileResponse.text();

          // Strip frontmatter using regex (YAML front matter between --- delimiters)
          const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
          const match = fileContent.match(frontmatterRegex);
          const bodyContent = match ? match[2] : fileContent;

          return {
            id: item.id,
            title: item.title,
            // Use the manifest's precomputed slug (single source of truth, also used to
            // generate sitemap.xml) rather than recalculating — keeps URLs, sitemap, and
            // routing permanently in sync.
            slug: item.slug || generateSlug(item.title),
            date: item.date,
            updated: item.updated || null,
            excerpt: item.excerpt,
            seoTitle: item.seoTitle || null,
            metaDescription: item.metaDescription || null,
            heroImage: item.heroImage,
            categories: item.categories || [],
            tags: item.tags || [],
            faq: item.faq || [],
            content: bodyContent,
            filename: item.filename
          };
        } catch (err) {
          console.error(`Error loading blog post ${item.filename}:`, err);
          return null;
        }
      }));

      // Filter out null values (manifest already sorted by date, but re-sort to be safe)
      const validPosts = posts.filter(p => p !== null).sort((a, b) => new Date(b.date) - new Date(a.date));
      setBlogPosts(validPosts);
    } catch (err) {
      console.error('Error loading blog posts:', err);
    }
    setBlogLoading(false);
  }, []);

  // ===== BLOG SYSTEM =====
  useEffect(() => {
    loadBlogPosts();
  }, [loadBlogPosts]);

  // Helper function to navigate to a page and update URL (using History API)
  const navigateTo = (page, postSlug = null) => {
    setCurrentPage(page);

    let url = `/${page}`;
    if (page === 'blog' && postSlug) {
      url += `/${postSlug}`;
    } else if (page === 'home') {
      url = '/';
    }

    window.history.pushState({ page, postSlug }, '', url);
  };

  // ===== EMPLOYER LOGOS =====
  const employers = [
    { name: 'QUT', logo: '/QUT-Logo.opt.webp' },
    { name: 'CAANZ', logo: '/images.opt.webp' },
    { name: 'PwC', logo: '/PwC-logo-380x290-1.opt.webp' },
    { name: 'Flight Centre', logo: '/Flight-Centre-Logo-320x320-1.opt.webp' },
    { name: 'Coronis Group', logo: '/Coronis_nbsnnc.opt.webp' },
    { name: 'RACQ', logo: '/racq-insurance-logo.opt.webp' },
    { name: 'Telstra', logo: '/Telstra-logo.opt.webp' },
    { name: 'Aveo Group', logo: '/Aveo-Logo.opt.webp' },
    { name: 'Kids Helpline', logo: '/LOGO133203970002567033.opt.webp' }
  ];

  // ===== SERVICE SEGMENTS =====
  const services = [
    {
      id: 'ai-personal-finance',
      title: 'AI for Your Personal Finances',
      subtitle: 'Your money, finally making sense',
      description: '• Turn your bank data into clear spending insights with AI\n• Budgets, savings goals and "can I afford it?" answers\n• Property and investment numbers explained in plain English\n• Privacy-safe ways to use ChatGPT, Claude and Gemini with money\n• Prompts and simple tools you keep using after we finish',
      icon: '💰',
      cta: 'unlock my finances'
    },
    {
      id: 'ai-business-finance',
      title: 'AI for Your Business Finances',
      subtitle: 'Know what your numbers are telling you',
      description: '• For professionals, consultants and small businesses\n• Use AI to read and explain your P&L, cash flow and reports\n• Turn exports from your accounting software into real insights\n• Simple AI dashboards and monthly money check-ins\n• Automate the boring finance admin with AI',
      icon: '📈',
      cta: 'show me my numbers'
    },
    {
      id: 'excel-ai',
      title: 'Excel + AI Skills',
      subtitle: 'Spreadsheets, supercharged',
      description: '• Excel and Google Sheets, from beginner to confident\n• Formulas, PivotTables and dashboards, built with AI\'s help\n• Get AI to write, check and explain formulas for you\n• Custom, self-marking training for you or your team\n• Know when to use a spreadsheet and when to ask AI',
      icon: '📊',
      cta: '=contact(me)'
    },
    {
      id: 'career',
      title: 'Career Coaching for Finance Pros',
      subtitle: 'Get ahead with AI',
      description: '• For graduates, young accountants and analysts\n• Build the AI skills finance teams are hiring for\n• Resume review, interview prep and negotiation\n• Firm vs industry career paths\n• Straight-talking advice from a Chartered Accountant',
      icon: '🎯',
      cta: 'be real with me'
    }
  ];

  // ===== COLOR PALETTE =====
  const colors = {
    darkNavy: '#1F3A7D',
    navy: '#2A4FA8',
    limeGreen: '#00FF00',
    warmYellow: '#FFD93D',
    mediumGreen: '#10B981',
    charcoal: '#2D3748',
    offWhite: '#F7F9FC',
    lightGray: '#f3f4f6',
    borderGray: '#e5e7eb',
    textDark: '#1a1a1a',
    textMuted: '#666',
    white: '#ffffff'
  };

  const styles = `
    /* Fonts are loaded via <link> in public/index.html <head>, not @import here —
       keeps font requests starting immediately instead of waiting on the JS bundle. */

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      overflow-x: hidden;
    }

    body {
      font-family: 'Inter', sans-serif;
      color: ${colors.textDark};
      background: ${colors.offWhite};
      line-height: 1.6;
    }

    h1, h2, h3, h4 { font-family: 'Poppins', sans-serif; font-weight: 700; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    button {
      transition: all 0.3s ease;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    blockquote {
      transition: all 0.3s ease;
      cursor: pointer;
    }

    blockquote:hover {
      box-shadow: 0 6px 20px rgba(0, 255, 65, 0.2);
      transform: translateY(-2px);
    }

    input, textarea, select {
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: ${colors.limeGreen};
      box-shadow: 0 0 0 3px rgba(0, 255, 65, 0.1);
    }

    /* Mobile Optimization */
    @media (max-width: 768px) {
      h1 { font-size: clamp(1.5rem, 5vw, 2.2rem) !important; }
      h2 { font-size: clamp(1.4rem, 4.5vw, 2rem) !important; }
      h3 { font-size: clamp(1rem, 3vw, 1.3rem) !important; }

      p { font-size: clamp(0.85rem, 2.5vw, 1rem) !important; line-height: 1.7 !important; }

      section { padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 1.5rem) !important; }

      img { max-width: 100% !important; height: auto !important; }

      /* Prevent text from wrapping too tightly */
      div[style*="maxWidth"] { max-width: 100% !important; padding: 0 clamp(1rem, 2vw, 1.5rem) !important; }

      /* Grid adjustments for mobile */
      [style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }

      /* Image sizing in About page */
      img[style*="height: 350px"] { height: 250px !important; }
      img[style*="height: 250px"] { height: 200px !important; }

      /* Responsive image placement */
      [style*="order: 2"] { order: 1 !important; margin-bottom: 1.5rem !important; }
      [style*="order: 1"] { order: 2 !important; }
    }

    @media (max-width: 480px) {
      h1 { font-size: clamp(1.3rem, 5vw, 1.8rem) !important; }
      h2 { font-size: clamp(1.2rem, 4vw, 1.6rem) !important; }
      h3 { font-size: clamp(0.95rem, 2.5vw, 1.1rem) !important; }

      p { font-size: 0.9rem !important; line-height: 1.65 !important; letter-spacing: 0.3px !important; }

      section { padding: 1.5rem 1rem !important; }

      /* Extra spacing for readability on small screens */
      div { word-break: break-word !important; }

      /* Wider line height for better mobile reading */
      button { padding: 0.6rem 1rem !important; font-size: 0.8rem !important; }

      /* Mobile carousel for coaching cards */
      .coaching-cards-mobile {
        display: flex !important;
        overflow-x: auto !important;
        gap: 1rem !important;
        padding: 0 1rem 1rem 1rem !important;
        scroll-snap-type: x mandatory !important;
        -webkit-overflow-scrolling: touch !important;
      }

      .coaching-cards-mobile > div {
        flex: 0 0 calc(100vw - 4rem) !important;
        scroll-snap-align: start !important;
        min-width: calc(100vw - 4rem) !important;
      }

      /* Stack contact form on mobile */
      .contact-grid-mobile {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
      }
    }
  `;

  // ===== NAVIGATION =====
  const Navigation = () => (
    <>
      <nav style={{
        background: colors.darkNavy,
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        fontFamily: "'Poppins', sans-serif",
        gap: '2rem',
        width: '100%'
      }}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap', flex: '0 0 auto', color: 'white', textDecoration: 'none' }}>
          APP<span style={{ color: colors.limeGreen, fontSize: '1rem' }}>•</span>Coaching
        </a>

        {/* Desktop menu */}
        <div style={{ display: 'none', gap: '2rem', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }} className="desktop-menu">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Home</a>
          <a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Services</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>About</a>
          <a href="/blog" onClick={(e) => { e.preventDefault(); navigateTo('blog'); }} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Blog</a>
          <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{ background: colors.limeGreen, color: colors.darkNavy, padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>BOOK A CALL</a>
        </div>

        {/* Mobile: Book a Call button + Hamburger (grouped on right) */}
        <div style={{ display: 'none', gap: '0.75rem', alignItems: 'center', justifyContent: 'flex-end' }} className="mobile-nav-group">
          <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{ background: colors.limeGreen, color: colors.darkNavy, padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }} className="mobile-book-button">BOOK A CALL</a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', padding: 0, fontFamily: "'Poppins', sans-serif", display: 'flex', alignItems: 'center' }} className="mobile-hamburger">
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '54px',
          left: 0,
          right: 0,
          background: colors.darkNavy,
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          padding: '1rem',
          zIndex: 99,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          width: '100%'
        }} className="mobile-menu-dropdown">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('home'); setMobileMenuOpen(false); }} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', padding: '0.75rem 0', borderBottom: `1px solid rgba(255,255,255,0.1)`, textDecoration: 'none' }}>Home</a>
          <a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('services'); setMobileMenuOpen(false); }} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', padding: '0.75rem 0', borderBottom: `1px solid rgba(255,255,255,0.1)`, textDecoration: 'none' }}>Services</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); navigateTo('about'); setMobileMenuOpen(false); }} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', padding: '0.75rem 0', borderBottom: `1px solid rgba(255,255,255,0.1)`, textDecoration: 'none' }}>About</a>
          <a href="/blog" onClick={(e) => { e.preventDefault(); navigateTo('blog'); setMobileMenuOpen(false); }} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', padding: '0.75rem 0', textDecoration: 'none' }}>Blog</a>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-nav-group {
            display: none !important;
          }
          .mobile-menu-dropdown {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-nav-group {
            display: flex !important;
          }
          .mobile-menu-dropdown {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );

  // ===== HOME PAGE =====
  const HomePage = () => {
    const sectionTitle = { fontSize: 'clamp(1.6rem, 4vw, 2rem)', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' };
    const card = { background: 'white', border: `1px solid ${colors.borderGray}`, borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'left' };
    const latestPosts = blogPosts.slice(0, 3);
    return (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, rgba(20, 35, 80, 0.88) 0%, rgba(25, 50, 120, 0.88) 50%), url('/hero-bg-home.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: 'clamp(2rem, 5vh, 5rem) clamp(1rem, 4vw, 2rem)',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img src="/aaron-archive-10.opt.webp" alt="Aaron Pacheco, Brisbane Chartered Accountant and AI finance coach" width="600" height="900" style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)', width: 'clamp(180px, 30vw, 280px)', height: 'auto', borderRadius: '12px', objectFit: 'contain' }} />

        <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.limeGreen, margin: '0 0 0.75rem', fontFamily: "'Poppins', sans-serif" }}>
          AI finance coaching · Brisbane &amp; online across Australia
        </p>

        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: 'clamp(1rem, 2vh, 1.5rem)', lineHeight: '1.15', fontWeight: '800', fontFamily: "'Poppins', sans-serif", maxWidth: '900px' }}>
          Unlock your finances with AI.
        </h1>

        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', maxWidth: '760px', margin: '0 auto clamp(1.5rem, 3vh, 2rem)', lineHeight: '1.8', opacity: '0.98', fontFamily: "'Inter', sans-serif" }}>
          I'm Aaron, a Brisbane <span style={{ color: colors.limeGreen, fontWeight: '700' }}>Chartered Accountant</span>. I help everyday Australians, young finance professionals and small business owners use AI tools like ChatGPT, Claude and Gemini to turn their numbers into <span style={{ color: colors.limeGreen, fontWeight: '700' }}>real answers</span>, in plain English.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{ background: colors.limeGreen, color: colors.darkNavy, padding: 'clamp(0.7rem, 2vh, 1rem) clamp(1.2rem, 4vw, 2.2rem)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: '700', borderRadius: '8px', fontFamily: "'Poppins', sans-serif", textDecoration: 'none', display: 'inline-block' }}>
            BOOK A FREE 15-MIN CALL →
          </a>
          <a href="#free-prompt" style={{ border: `2px solid ${colors.limeGreen}`, color: 'white', padding: 'clamp(0.6rem, 2vh, 0.9rem) clamp(1.2rem, 4vw, 2.2rem)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: '700', borderRadius: '8px', fontFamily: "'Poppins', sans-serif", textDecoration: 'none', display: 'inline-block' }}>
            GET THE FREE AI PROMPT
          </a>
        </div>
      </section>

      {/* Why AI */}
      <section style={{ padding: '4rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={sectionTitle}>Spreadsheets show you data. AI tells you what it means.</h2>
        <p style={{ fontSize: '1.05rem', color: colors.textMuted, lineHeight: '1.8', maxWidth: '760px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
          After 10+ years in finance, I've built more spreadsheets than I'd like to admit. They're great at organising numbers. They're not great at telling you what to do next. AI closes that gap, as long as you know how to ask it the right questions and how to check its answers.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {[
            { step: '1', title: 'Get your numbers', text: 'Your banking app, an export from your accounting software, or that spreadsheet you swear you\'ll update. We start with what you\'ve already got.' },
            { step: '2', title: 'Ask AI the right questions', text: 'Prompts that turn raw numbers into insights: where the money goes, what\'s changing, and what to do about it. Safely, without oversharing.' },
            { step: '3', title: 'Act with confidence', text: 'Check the answers with an accountant\'s eye, make the call, and keep the prompts so you can do it yourself next month.' }
          ].map((s) => (
            <div key={s.step} style={card}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: colors.limeGreen, color: colors.darkNavy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontFamily: "'Poppins', sans-serif", marginBottom: '1rem' }}>{s.step}</div>
              <h3 style={{ fontSize: '1.2rem', color: colors.darkNavy, margin: '0 0 0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>{s.title}</h3>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.7', margin: 0 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who I help */}
      <section style={{ padding: '4rem 1rem', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={sectionTitle}>Who I help</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              { icon: '💰', title: 'Your personal finances', text: 'Budgets, spending, savings goals and the big "can I afford it?" questions. Use AI to finally see where your money goes.' },
              { icon: '🎓', title: 'Your finance career', text: 'Graduates, young accountants and analysts who want the AI skills finance teams are now hiring for.' },
              { icon: '📈', title: 'Your small business', text: 'Professionals, consultants and small businesses who want AI to explain their P&L, cash flow and reports.' }
            ].map((c) => (
              <a key={c.title} href="/services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }} style={{ ...card, textDecoration: 'none', display: 'block' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{c.icon}</div>
                <h3 style={{ fontSize: '1.2rem', color: colors.darkNavy, margin: '0 0 0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>{c.title}</h3>
                <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.7', margin: '0 0 1rem' }}>{c.text}</p>
                <span style={{ color: colors.navy, fontWeight: '700', fontSize: '0.9rem' }}>See how I can help →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section style={{ padding: '4rem 1rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={sectionTitle}>A little about me</h2>
        <img loading="lazy" decoding="async" src="/aaron-headshot-professional.opt.webp" width="600" height="600" alt="Aaron Pacheco, Chartered Accountant" style={{ width: '100%', maxWidth: '240px', borderRadius: '12px', objectFit: 'cover', margin: '0.5rem auto 1.5rem', display: 'block' }} />
        <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', maxWidth: '720px', margin: '0 auto 1rem' }}>
          Brisbane born and bred, Chartered Accountant, and 10+ years in finance at places like PwC, Flight Centre, Telstra and Aveo. I've spent most of that time translating numbers into plain English for people who had better things to do. Now I teach people to get AI to do the heavy lifting, and to know when it's wrong.
        </p>
        <a href="/about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} style={{ color: colors.navy, fontWeight: '700', textDecoration: 'underline', textDecorationColor: colors.limeGreen, textDecorationThickness: '2px' }}>More about me →</a>
      </section>

      <section style={{ padding: '2rem 1rem', background: colors.offWhite, overflow: 'hidden' }}>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: colors.textMuted, marginBottom: '1.5rem', fontWeight: '600' }}>
          Where I've worked and trained
        </p>
        <div style={{ position: 'relative', overflow: 'hidden', background: colors.offWhite }}>
          <style>{`
            @keyframes scrollLogos {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .logo-carousel { display: flex; animation: scrollLogos 16s linear infinite; gap: 2rem; }
            .logo-carousel:hover { animation-play-state: paused; }
            .logo-item { flex: 0 0 140px; display: flex; align-items: center; justify-content: center; padding: 1rem; background: white; border-radius: 8px; font-weight: 600; font-size: 0.75rem; color: ${colors.darkNavy}; min-height: 80px; }
            .logo-item img { max-width: 100%; max-height: 60px; object-fit: contain; }
          `}</style>
          <div className="logo-carousel">
            {[...employers, ...employers].map((employer, idx) => (
              <div key={idx} className="logo-item">
                <img loading="lazy" decoding="async" src={employer.logo} alt={employer.name} width="280" height="158" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section style={{ padding: '4rem 1rem', background: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={sectionTitle}>Latest from the blog</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              {latestPosts.map((post) => (
                <a key={post.id} href={`/blog/${post.slug}`} onClick={(e) => { e.preventDefault(); setSelectedBlogPost(post.id); navigateTo('blog', post.slug); }} style={{ ...card, padding: 0, overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                  {post.heroImage && <img loading="lazy" decoding="async" src={post.heroImage} alt="" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.05rem', color: colors.darkNavy, margin: '0 0 0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', lineHeight: '1.4' }}>{post.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: colors.textMuted, lineHeight: '1.6', margin: 0 }}>{post.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="/blog" onClick={(e) => { e.preventDefault(); setSelectedBlogPost(null); navigateTo('blog'); }} style={{ color: colors.navy, fontWeight: '700', textDecoration: 'underline', textDecorationColor: colors.limeGreen, textDecorationThickness: '2px' }}>See all posts →</a>
            </p>
          </div>
        </section>
      )}

      <section style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={sectionTitle}>Ready to unlock your numbers?</h2>
        <p style={{ fontSize: '1rem', color: colors.textMuted, maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
          Book a free 15-minute discovery call. Tell me what you want answers to, and I'll show you how AI can get you there.
        </p>
        <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{ background: colors.limeGreen, color: colors.darkNavy, padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: '700', borderRadius: '8px', fontFamily: "'Poppins', sans-serif", textDecoration: 'none', display: 'inline-block' }}>
          BOOK DISCOVERY CALL →
        </a>
      </section>
    </div>
    );
  };

  // ===== SERVICES PAGE =====
  const ServicesPage = () => {
    const principles = [
      {
        icon: '💡',
        title: 'Insight, Not Just Data',
        description: 'We use AI to turn your numbers into answers you can act on, and I show you how to check them.'
      },
      {
        icon: '📝',
        title: 'Speaking Plain English',
        description: 'No jargon. No corporate speak. Just clear explanations from someone who has done this for 10+ years.'
      },
      {
        icon: '🤝',
        title: 'Co-Learning Together',
        description: 'We grow as partners. You become independent with these tools, not dependent on me.'
      }
    ];

    return (
      <div>
        <style>{styles}</style>
        <section style={{
          background: `linear-gradient(135deg, rgba(31, 58, 125, 0.85) 0%, rgba(42, 79, 168, 0.85) 100%), url('/hero-bg-services.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: 'clamp(2rem, 4vh, 4rem) clamp(1rem, 4vw, 2rem)',
          textAlign: 'center',
          minHeight: '45vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
            Services
          </h1>
          <p style={{ fontSize: '1rem', opacity: '0.95', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
            1-on-1 coaching from a Brisbane Chartered Accountant, in Brisbane and online across Australia. Use AI tools like ChatGPT, Claude and Gemini to understand your money, your business and your career, and keep the skills for good.
          </p>
        </section>


      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: colors.darkNavy,
          marginBottom: '2rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800',
          textAlign: 'center'
        }}>
          My Services
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '2rem',
          marginTop: '2rem',
          maxWidth: '1000px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {services.map((service) => (
            <div key={service.id} style={{
              background: `linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`,
              border: `1px solid ${colors.borderGray}`,
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              ':hover': { borderColor: colors.limeGreen, boxShadow: '0 8px 24px rgba(0,255,65,0.1)' }
            }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.limeGreen; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 255, 65, 0.15)`; e.currentTarget.style.background = `linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(255, 217, 61, 0.1) 100%)`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.borderGray; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.background = `linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`; }}>
              <div style={{ width: '100px', height: '100px', background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.4rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: colors.charcoal, fontWeight: '600', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif" }}>
                {service.subtitle}
              </p>
              <p style={{ fontSize: '0.9rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'left', whiteSpace: 'pre-line' }}>
                {service.description}
              </p>
              <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{
                background: colors.limeGreen,
                color: colors.darkNavy,
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                width: '100%',
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none'
              }}>
                {service.cta.toUpperCase()}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: 'white',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: colors.darkNavy,
          marginBottom: '2rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800',
          textAlign: 'center'
        }}>
          My Coaching Principles
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {principles.map((principle, idx) => (
            <div key={idx} style={{
              background: `linear-gradient(135deg, #4ade80 0%, rgba(255, 255, 255, 0.9) 100%)`,
              border: `1px solid ${colors.borderGray}`,
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                {principle.icon}
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                color: colors.darkNavy,
                marginBottom: '0.75rem',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '700'
              }}>
                {principle.title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: colors.darkNavy,
                lineHeight: '1.6'
              }}>
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: 'white',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: colors.darkNavy,
          marginBottom: '2rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800',
          textAlign: 'center'
        }}>
          How It Works
        </h2>
        <p style={{
          fontSize: '1rem',
          color: colors.textMuted,
          maxWidth: '800px',
          margin: '0 auto 1rem',
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Start with a free 15-minute discovery call. We'll talk about what you want answers to, and I'll suggest the shortest path to get there. Pricing depends on what you need, and we'll cover it on the call.
        </p>
        <p style={{
          fontSize: '0.95rem',
          color: colors.textMuted,
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Most coaching models want to keep you forever. Mine is the opposite: get you confident with AI and your numbers in as few sessions as possible, ideally just one or two. Coaching is general education, not personal financial advice.
        </p>
      </section>

      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: colors.offWhite,
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: colors.darkNavy,
          marginBottom: '1.5rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800'
        }}>
          Ready to Unlock Your Numbers?
        </h2>
        <p style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
          Book a free 15-minute discovery call. Tell me what you want answers to, and I'll show you how AI can get you there.
        </p>
        <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{
          background: colors.limeGreen,
          color: colors.darkNavy,
          border: 'none',
          padding: '1rem 2.5rem',
          fontSize: '1rem',
          fontWeight: '700',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: "'Poppins', sans-serif",
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          BOOK DISCOVERY CALL →
        </a>
      </section>
    </div>
    );
  };

  // ===== ABOUT PAGE =====
  const AboutPage = () => {
    const h2 = { fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: colors.darkNavy, marginBottom: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' };
    const para = { fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.25rem' };
    const track = [
      { logo: '/PwC-logo-380x290-1.opt.webp', name: 'PwC', role: 'Graduate, Audit', text: 'Where I learned to be fast and accurate at the same time, with someone checking every workpaper.' },
      { logo: '/Flight-Centre-Logo-320x320-1.opt.webp', name: 'Flight Centre Travel Group', role: 'Accountant & Team Leader', text: 'Rebuilt outdated workbooks and broken macros into lean, formula-driven models that saved the team hours every day.' },
      { logo: '/Coronis_nbsnnc.opt.webp', name: 'Coronis Group', role: 'Accountant', text: 'Took finance from paper to paperless, with reporting the CFO and CEO actually used. A 40% efficiency gain in finance operations.' },
      { logo: '/Telstra-logo.opt.webp', name: 'Telstra', role: 'Finance Analyst', text: 'Presented to 70+ junior accountants on turning numbers into plain English decisions.' },
      { logo: '/Aveo-Logo.opt.webp', name: 'Aveo Group', role: 'Commercial Analyst', text: 'Automated manual reporting that saved a colleague 16 hours a week, and built a utilisation dashboard for leadership.' }
    ];
    return (
      <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, rgba(31, 58, 125, 0.88) 0%, rgba(42, 79, 168, 0.88) 100%), url('/aaron-archive-4.opt.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: 'clamp(2rem, 4vh, 4rem) clamp(1rem, 4vw, 2rem)',
        textAlign: 'center',
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
          About Aaron
        </h1>
        <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', opacity: '0.95', maxWidth: '700px', lineHeight: '1.7' }}>
          Chartered Accountant. 10+ years in finance. Now on a mission to help Australians <span style={{ color: colors.limeGreen, fontWeight: '700' }}>unlock their finances with AI</span>.
        </p>
      </section>

      <section style={{ padding: '4rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center' }}>
            <img loading="lazy" decoding="async" src="/aaron-archive-2.opt.webp" width="900" height="600" alt="Aaron Pacheco, Brisbane Chartered Accountant" style={{ width: '100%', height: '380px', borderRadius: '12px', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ ...h2, textAlign: 'left' }}>Why I do this</h2>
            <p style={para}>
              My mum was an accountant, so debits and credits were basically dinner-table conversation. I followed her into it, starting in audit at PwC, then a decade across finance roles at Flight Centre, Coronis, Telstra, Aveo and more.
            </p>
            <p style={para}>
              For years, Excel was my superpower. Then AI turned up and changed the game. A spreadsheet can organise your numbers, but AI can actually explain them: where the money's going, what's changed, and what to do next. That's the gap I spent my career filling by hand, and now anyone can close it in minutes.
            </p>
            <p style={para}>
              The catch is knowing how to ask AI the right questions, how to keep your private data private, and how to spot when it's confidently wrong. That's what I teach. Plain English, no jargon, and the goal is always for you to not need me after a few sessions.
            </p>
            <p style={{ ...para, marginBottom: 0 }}>
              <strong style={{ color: colors.darkNavy }}>My mission:</strong> help everyday Australians, young finance professionals and small business owners unlock real insight from their personal and business finances using AI.
            </p>
          </div>
        </div>

        <div style={{ paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}`, marginBottom: '4rem' }}>
          <h2 style={h2}>Where I've learned</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
            {track.map((t) => (
              <div key={t.name} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center' }}>
                <img loading="lazy" decoding="async" src={t.logo} alt={t.name} width="280" height="158" style={{ height: '50px', maxWidth: '100%', objectFit: 'contain', marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1rem', color: colors.darkNavy, margin: '0 0 0.25rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>{t.name}</h3>
                <p style={{ fontSize: '0.8rem', color: colors.textMuted, margin: '0 0 0.75rem' }}>{t.role}</p>
                <p style={{ fontSize: '0.9rem', color: colors.textMuted, lineHeight: '1.6', margin: 0 }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}`, marginBottom: '4rem' }}>
          <h2 style={h2}>Beyond the numbers</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={para}>
              Brisbane born and bred. I'm a new dad and recently married, which has done wonders for my sleep schedule (it hasn't). Family, old school mates and the people I've met through work are what matter most to me.
            </p>
            <p style={para}>
              Football is my constant. I've played since I was six, came back as a winger after more than two years out injured, and I'm a long-suffering Everton fan who also grew up on Cristiano Ronaldo, Real Madrid, Portugal and the Brisbane Roar. I also make music, and I'm the type to plan a holiday in a spreadsheet (with AI's help these days).
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            <img loading="lazy" decoding="async" src="/aaron-headshot-casual-1.opt.webp" width="500" height="750" alt="Aaron Pacheco, founder of APP Coaching" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            <img loading="lazy" decoding="async" src="/PSX_20241105_115531.opt.webp" width="500" height="375" alt="Aaron Pacheco at a work event" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            <img loading="lazy" decoding="async" src="/aaron-headshot-casual-3.opt.webp" width="500" height="667" alt="Aaron Pacheco, AI finance coach" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            <img loading="lazy" decoding="async" src="/20250329_194859.opt.webp" width="500" height="667" alt="Aaron Pacheco, APP Coaching founder" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ background: 'white', padding: '2.5rem 1.5rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
          <h2 style={{ ...h2, fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)' }}>Why "APP Coaching"?</h2>
          <p style={{ ...para, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            APP stands for Aaron Paul Pacheco. The fact that it also sounds like the thing I help people get the most out of is a happy accident I'm taking full credit for.
          </p>
        </div>

        <section style={{ background: `linear-gradient(135deg, #1f3a7d 0%, #2a4fa8 100%)`, color: 'white', borderRadius: '12px', padding: '2.5rem 1.5rem', margin: '4rem 0 0 0', textAlign: 'center' }}>
          <h3 style={{ color: 'white', margin: '0 0 1rem 0', fontSize: '1.3rem', fontWeight: '700', fontFamily: "'Poppins', sans-serif" }}>Want AI to explain your numbers?</h3>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>Book a free 15-minute discovery call and we'll work out where to start.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{ background: colors.limeGreen, color: '#1f3a7d', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }}>Book a Free Discovery Call</a>
            <a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }} style={{ border: `2px solid ${colors.limeGreen}`, color: colors.limeGreen, padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }}>Explore Services</a>
          </div>
        </section>
      </section>
    </div>
  );
  };

  // ===== PRIVACY POLICY & TERMS PAGE =====
  const NotFoundPage = () => {
    const linkStyle = { color: colors.navy, fontWeight: '700', textDecoration: 'underline', textUnderlineOffset: '3px' };
    const go = (page) => (e) => { e.preventDefault(); navigateTo(page); window.scrollTo(0, 0); };
    return (
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(3rem, 10vh, 6rem) 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.navy, margin: '0 0 0.75rem', fontFamily: "'Poppins', sans-serif" }}>
          Error 404
        </p>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', color: colors.darkNavy, fontFamily: "'Poppins', sans-serif", fontWeight: '800', margin: '0 0 1rem' }}>
          This page doesn't exist
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: colors.textDark, margin: '0 0 2rem' }}>
          The link may be old or mistyped. Here's where most people are headed:
        </p>
        <p style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', margin: 0 }}>
          <a href="/" onClick={go('home')} style={linkStyle}>Home</a>
          <a href="/services" onClick={go('services')} style={linkStyle}>Coaching services</a>
          <a href="/blog" onClick={go('blog')} style={linkStyle}>Blog</a>
          <a href="/contact" onClick={go('contact')} style={linkStyle}>Book a discovery call</a>
        </p>
      </section>
    );
  };

  const PrivacyPage = () => {
    const sectionStyle = { marginBottom: '2.5rem' };
    const h2Style = { fontSize: '1.4rem', color: colors.darkNavy, fontFamily: "'Poppins', sans-serif", fontWeight: '700', marginBottom: '1rem', marginTop: '0.5rem' };
    const pStyle = { fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1rem' };
    const ulStyle = { fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1rem', paddingLeft: '1.5rem' };

    return (
      <div>
        <style>{styles}</style>
        <section style={{
          background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`,
          color: 'white',
          padding: 'clamp(2rem, 4vh, 3.5rem) clamp(1rem, 4vw, 2rem)',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
            Privacy Policy & Terms of Service
          </h1>
          <p style={{ fontSize: '1rem', opacity: '0.9' }}>Last updated: 24 July 2026</p>
        </section>

        <section style={{ padding: '3rem 2rem', background: 'white', maxWidth: '850px', margin: '0 auto' }}>

          <div style={{ background: colors.offWhite, border: `1px solid ${colors.borderGray}`, borderRadius: '8px', padding: '1.5rem', marginBottom: '2.5rem' }}>
            <p style={{ ...pStyle, marginBottom: 0 }}>
              This page covers both our <strong>Privacy Policy</strong> (how we collect and handle your data) and our <strong>Terms of Service</strong> (the rules for using this site and working with APP Coaching). If you have any questions, contact us at <a href="mailto:aaron.appcoaching@gmail.com" style={{ color: colors.darkNavy, textDecoration: 'underline', textDecorationColor: colors.limeGreen }}>aaron.appcoaching@gmail.com</a>.
            </p>
          </div>

          <h2 style={{ fontSize: '1.8rem', color: colors.darkNavy, fontFamily: "'Poppins', sans-serif", fontWeight: '800', marginBottom: '1.5rem' }}>Privacy Policy</h2>

          <div style={sectionStyle}>
            <h2 style={h2Style}>1. Who We Are</h2>
            <p style={pStyle}>
              APP Coaching ("we", "us", "our") is a sole-operator coaching business run by Aaron Pacheco, providing 1-on-1 coaching in Excel, AI, finance, and business operations. This policy explains what personal information we collect through appcoaching.io (the "Site"), why we collect it, and what rights you have over it. We are based in Australia and handle personal information in accordance with the Australian Privacy Principles under the Privacy Act 1988 (Cth), and we've also aligned this policy with common international expectations (including GDPR and CCPA concepts) for visitors outside Australia.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>2. What We Collect</h2>
            <p style={pStyle}>We only collect information that is necessary to run this Site and respond to you. This includes:</p>
            <ul style={ulStyle}>
              <li><strong>Contact form submissions:</strong> your name, email address, service interest, and any message you send us.</li>
              <li><strong>Newsletter sign-ups:</strong> your email address, collected via our email provider (Brevo) when you subscribe.</li>
              <li><strong>Booking details:</strong> if you book a discovery call via Cal.com, that information is collected and processed directly by Cal.com under their own privacy policy.</li>
              <li><strong>Analytics data:</strong> via Google Analytics (GA4), we automatically collect general information such as pages viewed, approximate location (city/country level), device and browser type, and how you arrived at the Site. This data is aggregated and does not directly identify you by name.</li>
              <li><strong>Cookies:</strong> Google Analytics uses cookies to distinguish visitors and understand site usage. You can disable cookies in your browser settings at any time; the Site will still function without them.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>3. How We Use Your Information</h2>
            <ul style={ulStyle}>
              <li>To respond to enquiries submitted through the contact form.</li>
              <li>To send newsletter content you've explicitly opted into (you can unsubscribe at any time via the link in every email).</li>
              <li>To understand how visitors use the Site, so we can improve content and navigation.</li>
              <li>To meet legal or regulatory obligations, where applicable.</li>
            </ul>
            <p style={pStyle}>We do not sell, rent, or trade your personal information to third parties. We do not use your data for advertising retargeting.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>4. Third-Party Services</h2>
            <p style={pStyle}>We rely on a small number of trusted third-party services to run this Site, each of which processes data under their own privacy policy:</p>
            <ul style={ulStyle}>
              <li><strong>Netlify</strong> — website hosting and contact form handling.</li>
              <li><strong>Google Analytics (GA4)</strong> — site usage analytics.</li>
              <li><strong>Brevo (Sendinblue)</strong> — newsletter email delivery and subscriber management.</li>
              <li><strong>Cal.com</strong> — discovery call scheduling and booking.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>5. Data Retention</h2>
            <p style={pStyle}>
              We retain contact form submissions and newsletter subscriber data only for as long as reasonably necessary to respond to you, provide our services, or as required by law. You can request deletion of your data at any time (see Section 7).
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>6. Data Security</h2>
            <p style={pStyle}>
              We take reasonable technical and organisational steps to protect your information, including relying on reputable providers (Netlify, Google, Brevo, Cal.com) that maintain their own industry-standard security practices. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>7. Your Rights</h2>
            <p style={pStyle}>Depending on your location, you may have the right to:</p>
            <ul style={ulStyle}>
              <li>Request access to the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your information.</li>
              <li>Unsubscribe from our newsletter at any time via the link in every email.</li>
              <li>Object to or restrict certain processing of your information.</li>
            </ul>
            <p style={pStyle}>To exercise any of these rights, email <a href="mailto:aaron.appcoaching@gmail.com" style={{ color: colors.darkNavy, textDecoration: 'underline', textDecorationColor: colors.limeGreen }}>aaron.appcoaching@gmail.com</a>. We'll respond within a reasonable timeframe.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>8. Children's Privacy</h2>
            <p style={pStyle}>This Site is not directed at children under 18, and we do not knowingly collect personal information from children.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>9. Changes to This Policy</h2>
            <p style={pStyle}>We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last updated" date at the top of this page.</p>
          </div>

          <hr style={{ border: 'none', borderTop: `2px solid ${colors.borderGray}`, margin: '3rem 0' }} />

          <h2 style={{ fontSize: '1.8rem', color: colors.darkNavy, fontFamily: "'Poppins', sans-serif", fontWeight: '800', marginBottom: '1.5rem' }}>Terms of Service</h2>

          <div style={sectionStyle}>
            <h2 style={h2Style}>1. Acceptance of Terms</h2>
            <p style={pStyle}>
              By accessing or using appcoaching.io, or by booking or purchasing coaching services from APP Coaching, you agree to these Terms of Service. If you do not agree, please do not use the Site or our services.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>2. Not Financial, Legal, or Tax Advice</h2>
            <p style={pStyle}>
              APP Coaching provides educational coaching in Excel, AI tools, finance literacy, and business operations. <strong>Nothing on this Site or provided through coaching sessions constitutes formal financial, investment, legal, accounting, or tax advice.</strong> Aaron Pacheco is not a licensed financial advisor. Coaching is general in nature and intended to help you build your own understanding and skills — it is not a substitute for advice from a licensed professional who understands your specific circumstances. Any decisions you make based on information provided are made at your own discretion and risk.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>3. No Guaranteed Results</h2>
            <p style={pStyle}>
              While we're committed to helping you build genuine skills and clarity, we do not guarantee specific financial, business, or career outcomes from coaching. Results depend on individual effort, circumstances, and factors outside our control.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>4. Use of the Site</h2>
            <p style={pStyle}>You agree to use this Site only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this Site by any third party. You must not attempt to gain unauthorised access to any part of the Site or its underlying systems.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>5. Intellectual Property</h2>
            <p style={pStyle}>
              All content on this Site — including text, graphics, blog posts, logos, and branding — is owned by APP Coaching / Aaron Pacheco unless otherwise stated, and is protected by copyright. You may not reproduce, distribute, or create derivative works from this content without our prior written permission, other than sharing links or brief excerpts with proper attribution.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>6. Coaching Bookings & Payments</h2>
            <p style={pStyle}>
              Discovery calls and coaching sessions are booked via Cal.com. Specific pricing, cancellation, and rescheduling terms will be confirmed directly with you at the time of booking or engagement. Fees paid for coaching services are generally non-refundable once a session has been delivered, except where required by Australian Consumer Law.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>7. Limitation of Liability</h2>
            <p style={pStyle}>
              To the maximum extent permitted by law, APP Coaching and Aaron Pacheco shall not be liable for any indirect, incidental, or consequential damages arising from your use of this Site or our coaching services. Nothing in these Terms excludes any consumer guarantees or rights that cannot be excluded under the Australian Consumer Law.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>8. Third-Party Links</h2>
            <p style={pStyle}>This Site may link to third-party websites and services (such as Cal.com or company sites referenced in blog posts). We are not responsible for the content, accuracy, or practices of any third-party sites.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>9. Governing Law</h2>
            <p style={pStyle}>These Terms are governed by the laws of Queensland, Australia, without regard to conflict of law principles. Any disputes will be subject to the exclusive jurisdiction of the courts of Queensland, Australia.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>10. Changes to These Terms</h2>
            <p style={pStyle}>We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>11. Contact</h2>
            <p style={pStyle}>
              Questions about this Privacy Policy or these Terms of Service can be sent to <a href="mailto:aaron.appcoaching@gmail.com" style={{ color: colors.darkNavy, textDecoration: 'underline', textDecorationColor: colors.limeGreen }}>aaron.appcoaching@gmail.com</a>.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a
              href="/about"
              onClick={(e) => { e.preventDefault(); navigateTo('about'); }}
              style={{ color: colors.darkNavy, fontSize: '0.95rem', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline', textDecorationColor: colors.limeGreen }}
            >
              ← Back to About
            </a>
          </div>

        </section>
      </div>
    );
  };

  // ===== BLOG PAGE =====
  const BlogPage = () => {
    if (selectedBlogPost) {
      // Individual blog post view
      const post = blogPosts.find(p => p.id === selectedBlogPost);
      if (!post) return <div>Post not found</div>;

      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
      };

      return (
        <div>
          <style>{styles}</style>
          {/* Back button header */}
          <section style={{
            background: colors.offWhite,
            padding: '1.5rem 2rem',
            borderBottom: `1px solid ${colors.borderGray}`,
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <button onClick={() => {
              setSelectedBlogPost(null);
              navigateTo('blog');
              window.scrollTo(0, 0);
            }} style={{
              background: `linear-gradient(120deg, ${colors.limeGreen} 0%, rgba(118, 215, 0, 0.2) 100%)`,
              border: 'none',
              color: colors.darkNavy,
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontFamily: "'Poppins', sans-serif"
            }}>
              ← Back to Blog
            </button>
          </section>

          {/* Post content */}
          <article style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '3rem 2rem',
            background: 'white'
          }}>
            <header style={{ marginBottom: '2.5rem' }}>
              <h1 style={{
                fontSize: '2.5rem',
                color: colors.darkNavy,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '800',
                marginBottom: '1rem',
                lineHeight: '1.3'
              }}>
                {post.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {post.categories && post.categories.length > 0 && (
                  <span style={{
                    background: colors.limeGreen,
                    color: colors.darkNavy,
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.35rem 0.7rem',
                    borderRadius: '16px',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {post.categories[0]}
                  </span>
                )}
                <p style={{
                  fontSize: '1rem',
                  color: colors.textMuted,
                  margin: 0
                }}>
                  {formatDate(post.date)}
                </p>
              </div>
            </header>

            {/* HTML content with custom styling */}
            <style>{`
              .blog-content h2 {
                color: ${colors.navy};
                font-size: 1.8rem;
                font-weight: 700;
                margin-top: 2.5rem;
                margin-bottom: 1.5rem;
                font-family: 'Poppins', sans-serif;
              }
              .blog-content h3 {
                color: ${colors.navy};
                font-size: 1.4rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
                font-family: 'Poppins', sans-serif;
              }
              .blog-content p {
                margin-bottom: 1.5rem;
              }
              .blog-content strong {
                font-weight: 700;
                color: ${colors.darkNavy};
                background: rgba(118, 215, 0, 0.2);
                padding: 0.2rem 0.4rem;
                border-radius: 3px;
              }
              .blog-content .paul-copy {
                background: #00FF41;
                color: #1f3a7d;
                border: none;
                border-radius: 6px;
                padding: 0.5rem 1rem;
                font-weight: 700;
                font-family: 'Poppins', sans-serif;
                cursor: pointer;
                margin-top: 1rem;
              }
              .blog-content em {
                font-style: italic;
              }
              .blog-content ul, .blog-content ol {
                padding-left: 1.5rem;
                margin: 0 0 1.5rem;
              }
              .blog-content li {
                margin-bottom: 0.5rem;
              }
              .blog-content blockquote, .blog-content blockquote:hover {
                cursor: auto;
                transform: none;
              }
              .blog-content .paul-prompt {
                font-family: monospace;
                font-size: 0.9rem;
                line-height: 1.7;
                white-space: pre-wrap;
                background: #ffffff;
                border-left: 4px solid #00FF00;
                padding: 1.25rem;
                color: ${colors.navy};
                margin: 1rem 0 0;
                user-select: text;
                -webkit-user-select: text;
              }
              .blog-content hr {
                border: none;
                border-top: 2px solid ${colors.borderGray};
                margin: 2.5rem 0;
              }
              .blog-content blockquote {
                margin: 2rem 0;
              }
            `}</style>
            <div className="blog-content" style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: colors.textDark,
              fontFamily: "'Inter', sans-serif"
            }} dangerouslySetInnerHTML={{ __html: (() => {
              // Convert markdown headings to HTML while preserving inline HTML.
              // Any hand-written JSON-LD in the post body is dropped — the complete
              // BlogPosting/FAQPage schema is generated from front matter instead.
              let html = post.content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
              // Convert ### headings to <h3>
              html = html.replace(/^### (.+)$/gm, (match, text) => {
                return `<h3 style="color: ${colors.navy}; font-size: 1.4rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Poppins', sans-serif;">${text}</h3>`;
              });
              // Convert ## headings to <h2>
              html = html.replace(/^## (.+)$/gm, (match, text) => {
                return `<h2 style="color: ${colors.navy}; font-size: 1.6rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Poppins', sans-serif;">${text}</h2>`;
              });
              // Convert --- to <hr>
              html = html.replace(/^---$/gm, `<hr style="border: none; border-top: 2px solid ${colors.borderGray}; margin: 2.5rem 0;" />`);
              return html;
            })() }} />

            {/* FAQ section — from the post's `faq` front matter; mirrored in the FAQPage schema */}
            {post.faq && post.faq.length > 0 && (
              <section aria-labelledby="post-faq-heading" style={{ marginTop: '3rem' }}>
                <h2 id="post-faq-heading" style={{ color: colors.navy, fontSize: '1.6rem', fontWeight: '700', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif" }}>
                  Frequently Asked Questions
                </h2>
                {post.faq.map((item) => (
                  <details key={item.q} style={{ borderBottom: `1px solid ${colors.borderGray}`, padding: '1rem 0' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: '700', color: colors.darkNavy, fontFamily: "'Poppins', sans-serif", fontSize: '1.05rem' }}>
                      {item.q}
                    </summary>
                    <p style={{ margin: '0.75rem 0 0', lineHeight: '1.7', color: colors.textDark, fontFamily: "'Inter', sans-serif" }}>{item.a}</p>
                  </details>
                ))}
              </section>
            )}

            {/* About the Author section */}
            <div style={{
              borderTop: `2px solid ${colors.borderGray}`,
              marginTop: '3rem',
              paddingTop: '2rem',
              background: `linear-gradient(135deg, rgba(59, 91, 219, 0.03) 0%, rgba(118, 215, 0, 0.03) 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginLeft: '-2rem',
              marginRight: '-2rem',
              marginBottom: '-2rem',
              paddingLeft: '2rem',
              paddingRight: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                color: colors.darkNavy,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '700',
                marginBottom: '1.5rem'
              }}>
                About the Author
              </h3>

              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start'
              }}>
                <img loading="lazy" decoding="async"
                  src="/aaron-headshot-professional.opt.webp"
                  alt="Aaron Pacheco"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                    border: `3px solid ${colors.limeGreen}`
                  }}
                />

                <div>
                  <p style={{
                    margin: '0 0 0.8rem 0',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: colors.textDark
                  }}>
                    <strong style={{ color: colors.darkNavy, fontSize: '1rem' }}>Aaron Pacheco</strong> is a Brisbane Chartered Accountant with 10+ years in finance at PwC, Flight Centre, Telstra, Aveo and more. Through APP Coaching, he helps everyday Australians, young finance professionals and small business owners unlock real insight from their finances using AI tools like ChatGPT, Claude and Gemini.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Posts / Internal Linking */}
            {blogPosts.length > 1 && (
              <div style={{
                marginTop: '3rem',
                paddingTop: '3rem',
                borderTop: `2px solid ${colors.borderGray}`
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: colors.darkNavy,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '700',
                  marginBottom: '2rem'
                }}>
                  More Posts
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem'
                }}>
                  {blogPosts
                    .filter(p => p.id !== selectedBlogPost)
                    .slice(0, 3)
                    .map((relatedPost) => (
                      <a
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedBlogPost(relatedPost.id);
                          navigateTo('blog', relatedPost.slug);
                          window.scrollTo(0, 0);
                        }}
                        style={{
                          display: 'block',
                          textDecoration: 'none',
                          border: `1px solid ${colors.borderGray}`,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          background: 'white'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{
                          background: colors.limeGreen,
                          height: '4px'
                        }} />
                        <div style={{ padding: '1.5rem' }}>
                          <p style={{
                            fontSize: '0.8rem',
                            color: '#15803d',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            margin: '0 0 0.5rem 0'
                          }}>
                            {relatedPost.categories?.[0] || 'General'}
                          </p>
                          <h4 style={{
                            fontSize: '1.1rem',
                            color: colors.darkNavy,
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: '700',
                            marginBottom: '0.8rem',
                            lineHeight: '1.4'
                          }}>
                            {relatedPost.title}
                          </h4>
                          <p style={{
                            fontSize: '0.9rem',
                            color: colors.textMuted,
                            margin: '0 0 1rem 0',
                            lineHeight: '1.6'
                          }}>
                            {relatedPost.excerpt}
                          </p>
                          <p style={{
                            fontSize: '0.85rem',
                            color: colors.textMuted,
                            margin: '0'
                          }}>
                            {formatDate(relatedPost.date)}
                          </p>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </article>
        </div>
      );
    }

    // Blog list view
    return (
      <div>
        <style>{styles}</style>
        <section style={{
          background: `linear-gradient(135deg, rgba(31, 58, 125, 0.85) 0%, rgba(42, 79, 168, 0.85) 100%), url('/hero-bg-home.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: 'clamp(2rem, 4vh, 4rem) clamp(1rem, 4vw, 2rem)',
          textAlign: 'center',
          minHeight: '45vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
            Blog
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1rem)', opacity: '0.95', maxWidth: '700px', lineHeight: '1.7' }}>
            Practical guides on using AI to understand your money, your business and your finance career. Copy-ready prompts, real examples and plain-English explanations from a Chartered Accountant.
          </p>
        </section>

        <section style={{
          padding: '4rem 2rem',
          background: colors.offWhite,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>

          {/* Filters Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* View by toggle */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.darkNavy }}>
                View by:
              </label>
              <select
                value={blogViewMode}
                onChange={(e) => setBlogViewMode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.9rem',
                  borderRadius: '6px',
                  border: `1px solid ${colors.borderGray}`,
                  background: 'white',
                  color: colors.darkNavy,
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <option value="post">Post</option>
                <option value="snippet">Snippet</option>
              </select>
            </div>

            {/* Snippet type filter (only show when Snippet view is selected) */}
            {blogViewMode === 'snippet' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.darkNavy }}>
                  Snippet type:
                </label>
                <select
                  value={blogSnippetType}
                  onChange={(e) => setBlogSnippetType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    fontSize: '0.9rem',
                    borderRadius: '6px',
                    border: `1px solid ${colors.borderGray}`,
                    background: 'white',
                    color: colors.darkNavy,
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  <option value="">All snippets</option>
                  <option value="levelup">PAUL's LevelUp</option>
                  <option value="prompt">PAUL's Prompt</option>
                  <option value="formula">PAUL's Formula</option>
                </select>
              </div>
            )}

            {/* Tag filter - Checkboxes */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.8rem', color: colors.darkNavy }}>
                Filter by Tag:
              </label>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                {blogPosts && blogPosts.length > 0 && (
                  <>
                    {/* Get all unique tags from posts */}
                    {Array.from(new Set(blogPosts.flatMap(post => post.tags || []))).sort().map((tag) => (
                      <label key={tag} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}>
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTags([...selectedTags, tag]);
                            } else {
                              setSelectedTags(selectedTags.filter(t => t !== tag));
                            }
                          }}
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                            accentColor: colors.limeGreen
                          }}
                        />
                        <span style={{ color: colors.darkNavy, fontWeight: '500' }}>
                          {tag}
                        </span>
                      </label>
                    ))}
                  </>
                )}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  style={{
                    marginTop: '0.8rem',
                    fontSize: '0.85rem',
                    color: colors.limeGreen,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    padding: '0',
                    textDecoration: 'underline'
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Search bar */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.darkNavy }}>
              Search:
            </label>
            <input
              type="text"
              placeholder="Search by keyword..."
              value={blogSearchTerm}
              onChange={(e) => {
                setBlogSearchTerm(e.target.value);
              }}
              onBlur={() => {}}
              onFocus={() => {}}
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.95rem',
                borderRadius: '6px',
                border: `1px solid ${colors.borderGray}`,
                fontFamily: "'Inter', sans-serif",
                boxSizing: 'border-box',
                backgroundColor: 'white',
                color: colors.darkNavy,
                WebkitAppearance: 'none',
                appearance: 'none',
                WebkitAutocorrect: 'off',
                WebkitSpellcheck: 'false',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            />
          </div>

          {blogLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: colors.textMuted }}>Loading posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: colors.textMuted, marginBottom: '1rem' }}>
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {/* POST VIEW */}
              {blogViewMode === 'post' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '2rem',
                  marginTop: '2rem'
                }}>
                  {blogPosts
                    .filter((post) => {
                      const tagMatch = selectedTags.length === 0 || (Array.isArray(post.tags) && post.tags.some(tag => selectedTags.includes(tag.trim())));
                      const searchMatch = blogSearchTerm === '' || post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(blogSearchTerm.toLowerCase());
                      return tagMatch && searchMatch;
                    })
                    .map((post) => (
                    <a key={post.id} href={`/blog/${post.slug}`} onClick={(e) => {
                      e.preventDefault();
                      setSelectedBlogPost(post.id);
                      navigateTo('blog', post.slug);
                    }} style={{
                      background: 'white',
                      border: `1px solid ${colors.borderGray}`,
                      borderRadius: '12px',
                      padding: '2rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      textAlign: 'left',
                      width: '100%',
                      position: 'relative',
                      overflow: 'visible'
                    }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.limeGreen; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 255, 65, 0.15)`; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.borderGray; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      {post.tags && post.tags.length > 0 && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '1rem'
                        }}>
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} style={{
                              background: colors.limeGreen,
                              color: colors.darkNavy,
                              fontSize: '0.65rem',
                              fontWeight: '700',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '20px',
                              whiteSpace: 'nowrap',
                              display: 'inline-block',
                              textTransform: 'capitalize',
                              letterSpacing: '0.5px'
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '1rem' }}>
                        <div style={{ fontSize: '1.2rem', color: 'white', fontWeight: '700', background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.limeGreen} 100%)`, width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {post.id}
                        </div>
                      </div>
                      <h2 style={{ fontSize: '1.4rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', lineHeight: '1.4' }}>
                        {post.title}
                      </h2>
                      <p style={{ fontSize: '0.95rem', color: colors.textMuted, marginBottom: '1rem', lineHeight: '1.6' }}>
                        {post.excerpt}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: colors.darkNavy, fontStyle: 'italic', fontWeight: '500' }}>
                        {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </a>
                  ))}
                  {blogPosts.filter((post) => {
                    const tagMatch = selectedTags.length === 0 || (post.tags && post.tags.some(tag => selectedTags.includes(tag)));
                    const searchMatch = blogSearchTerm === '' || post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(blogSearchTerm.toLowerCase());
                    return tagMatch && searchMatch;
                  }).length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                      <p style={{ color: colors.textMuted }}>No posts match your filters. Try adjusting your search.</p>
                    </div>
                  )}
                </div>
              )}

              {/* SNIPPET VIEW */}
              {blogViewMode === 'snippet' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2rem',
                  marginTop: '2rem'
                }}>
                  {blogPosts
                    .filter((post) => {
                      const tagMatch = selectedTags.length === 0 || (Array.isArray(post.tags) && post.tags.some(tag => selectedTags.includes(tag.trim())));
                      const searchMatch = blogSearchTerm === '' || post.title.toLowerCase().includes(blogSearchTerm.toLowerCase());
                      return tagMatch && searchMatch;
                    })
                    .flatMap((post) => {
                      const snippets = [];

                      // Extract PAUL's LevelUp
                      const levelupMatch = post.content.match(/<strong>🎯 PAUL's LevelUp<\/strong>\s*<p>([\s\S]*?)<\/p>/);
                      if (levelupMatch && (!blogSnippetType || blogSnippetType === 'levelup')) {
                        snippets.push({
                          id: `${post.id}-levelup`,
                          type: 'levelup',
                          title: generateSnippetTitle('levelup', levelupMatch[1]),
                          content: levelupMatch[1],
                          postId: post.id,
                          categories: post.categories
                        });
                      }

                      // Extract PAUL's Prompt
                      const promptMatch = post.content.match(/<strong>🤖 PAUL's Prompt<\/strong>[\s\S]*?<pre>([\s\S]*?)<\/pre>/);
                      if (promptMatch && (!blogSnippetType || blogSnippetType === 'prompt')) {
                        snippets.push({
                          id: `${post.id}-prompt`,
                          type: 'prompt',
                          title: generateSnippetTitle('prompt', promptMatch[1].trim()),
                          content: promptMatch[1].trim(),
                          postId: post.id,
                          categories: post.categories
                        });
                      }

                      // Extract PAUL's Formula
                      const formulaMatch = post.content.match(/<strong>📊 PAUL's Formulas<\/strong>[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>/);
                      if (formulaMatch && (!blogSnippetType || blogSnippetType === 'formula')) {
                        snippets.push({
                          id: `${post.id}-formula`,
                          type: 'formula',
                          title: generateSnippetTitle('formula', formulaMatch[1]),
                          content: formulaMatch[1],
                          postId: post.id,
                          categories: post.categories
                        });
                      }

                      return snippets;
                    })
                    .map((snippet) => {
                      const isExpanded = expandedSnippets[snippet.id];
                      const displayText = isExpanded ? snippet.content : snippet.content.substring(0, 150);
                      const needsExpand = snippet.content.length > 150;

                      return (
                        <div
                          key={snippet.id}
                          style={{
                            background: 'linear-gradient(135deg, rgba(118, 215, 0, 0.08) 0%, rgba(42, 79, 168, 0.04) 100%)',
                            border: `1px solid ${colors.borderGray}`,
                            borderRadius: '12px',
                            padding: '2rem',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            textAlign: 'left',
                            width: '100%',
                            position: 'relative',
                            overflow: 'visible'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.limeGreen; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 255, 65, 0.15)`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.borderGray; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                          {snippet.categories && snippet.categories.length > 0 && (
                            <span style={{
                              background: colors.limeGreen,
                              color: colors.darkNavy,
                              fontSize: '0.65rem',
                              fontWeight: '700',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '20px',
                              whiteSpace: 'nowrap',
                              display: 'inline-block',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              marginBottom: '1rem'
                            }}>
                              {snippet.categories[0]}
                            </span>
                          )}
                          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: colors.darkNavy, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            {snippet.type === 'levelup' && '🎯 PAUL\'s LevelUp'}
                            {snippet.type === 'prompt' && '🤖 PAUL\'s Prompt'}
                            {snippet.type === 'formula' && '📊 PAUL\'s Formula'}
                          </div>
                          <h2 style={{ fontSize: '1.2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                            {snippet.title}
                          </h2>
                          <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6', marginBottom: '1rem', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {displayText}
                            {!isExpanded && needsExpand && '...'}
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {needsExpand && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setExpandedSnippets({...expandedSnippets, [snippet.id]: !isExpanded});
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: colors.darkNavy,
                                  fontSize: '0.85rem',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  padding: '0.4rem 0',
                                  transition: 'color 0.2s ease',
                                  textAlign: 'left'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = colors.limeGreen; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = colors.darkNavy; }}
                              >
                                {isExpanded ? '↑ Show Less' : '↓ Show More'}
                              </button>
                            )}
                            <a
                              href={`/blog/${blogPosts.find(p => p.id === snippet.postId)?.slug || ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                const post = blogPosts.find(p => p.id === snippet.postId);
                                if (post) {
                                  setSelectedBlogPost(post.id);
                                  navigateTo('blog', post.slug);
                                }
                              }}
                              style={{
                                background: colors.limeGreen,
                                color: colors.darkNavy,
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.6rem 1.2rem',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'inline-block'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                            >
                              Read Full Post
                            </a>
                          </div>
                          {snippet.categories && snippet.categories.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                              {snippet.categories.slice(0, 2).map((cat, idx) => (
                                <span key={idx} style={{
                                  background: `linear-gradient(135deg, rgba(42, 79, 168, 0.1) 0%, rgba(118, 215, 0, 0.1) 100%)`,
                                  border: `1px solid ${colors.navy}`,
                                  color: colors.navy,
                                  fontSize: '0.65rem',
                                  fontWeight: '600',
                                  padding: '0.3rem 0.6rem',
                                  borderRadius: '12px',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {cat}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  {blogPosts.filter((post) => {
                    const tagMatch = selectedTags.length === 0 || (post.tags && post.tags.some(tag => selectedTags.includes(tag)));
                    const searchMatch = blogSearchTerm === '' || post.title.toLowerCase().includes(blogSearchTerm.toLowerCase());
                    return tagMatch && searchMatch;
                  }).length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: colors.textMuted }}>
                      <p>No snippets match your filters.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    );
  };

  // ===== EMAIL SIGNUP SECTION (APPEARS ON ALL PAGES) =====
  const EmailSignupSection = () => (
    <section id="free-prompt" style={{ padding: '3rem 1rem', background: 'white', borderTop: `1px solid ${colors.borderGray}` }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ textAlign: 'left', border: `1px solid ${colors.borderGray}`, borderLeft: `4px solid ${colors.limeGreen}`, borderRadius: '8px', padding: '2rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.navy, margin: '0 0 0.5rem' }}>Free download</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.darkNavy, fontFamily: "'Poppins', sans-serif", margin: '0 0 0.75rem 0', lineHeight: '1.3' }}>Get my free AI Money Check-up prompt</h3>
          <p style={{ fontSize: '0.95rem', color: colors.textDark, lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
            The exact prompt I use to get ChatGPT, Claude or Gemini to read your spending and tell you what's actually going on, in plain English. Pop in your email and it's yours straight away, plus new AI money tips when I publish them. No spam, unsubscribe anytime.
          </p>

          {leadUnlocked ? (
            <div className="paul-prompt-box">
              <p style={{ fontSize: '0.95rem', color: colors.darkNavy, fontWeight: '700', margin: '0 0 0.75rem' }}>You're in. Here's your prompt:</p>
              <p className="paul-prompt" style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', background: colors.offWhite, borderLeft: `4px solid ${colors.limeGreen}`, padding: '1rem', color: colors.navy, margin: 0 }}>{`Act as my personal finance analyst. I'm in Australia and all amounts are in AUD.

I'll paste my spending by category for the last 3 months (rounded totals, or a cropped screenshot from my banking app with names and account numbers removed). Never ask me for account numbers, BSBs or personal details.

Then:
1. Show my average monthly spend per category in a table.
2. Tell me the 3 biggest changes or surprises, in plain English.
3. Flag any category that looks out of line for my income (I'll tell you my take-home pay).
4. Suggest 3 specific, realistic changes I could try next month, with the estimated monthly saving for each.
5. Ask me one question at a time if you need more information.

Keep it practical. If my numbers don't add up, tell me plainly.`}</p>
              <button type="button" className="paul-copy" style={{ marginTop: '1rem', background: colors.limeGreen, color: colors.darkNavy, border: 'none', borderRadius: '6px', padding: '0.6rem 1.2rem', fontWeight: '700', fontFamily: "'Poppins', sans-serif", cursor: 'pointer' }}>📋 Copy prompt</button>
              <p style={{ fontSize: '0.8rem', color: colors.textMuted, margin: '1rem 0 0' }}>General education, not personal financial advice.</p>
            </div>
          ) : (
            <form
              method="POST"
              target="brevo-signup"
              action="https://769edbac.sibforms.com/serve/MUIFAI68iMXllj39M23qWvg8WXTSI18vSaOLkcgq_FMHHqsKdxJyUM-hDTPk2VZoJECqpjMbOjchkBON3jNJid8LLLgUwQyECMmViX_L5G7qHjZxODx0ilAbRhxVaaJx-nggpmjDfbAQVMqHaPFQHNEkh5cSl3jRu2TCycbc9RnOpkwBXTL0enoMpvOloUurjV3i7kqBMPB6ItqRQA=="
              data-type="subscription"
              onSubmit={() => { setTimeout(() => setLeadUnlocked(true), 300); }}
            >
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.darkNavy }} htmlFor="EMAIL">Email address</label>
              <input type="email" id="EMAIL" name="EMAIL" placeholder="your@email.com" required style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.borderGray}`, borderRadius: '6px', fontSize: '0.95rem', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box', marginBottom: '1rem' }} />
              <button type="submit" style={{ width: '100%', background: colors.limeGreen, color: colors.darkNavy, border: 'none', padding: '0.85rem 2rem', borderRadius: '6px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>
                SEND ME THE PROMPT
              </button>
            </form>
          )}
          <iframe name="brevo-signup" title="Newsletter signup" style={{ display: 'none' }} />
        </div>
      </div>
    </section>
  );

  // ===== CONTACT/BOOKING PAGE =====
  const ContactPage = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', interest: '', message: '' });
    const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error

    const handleContactChange = (e) => {
      const { name, value } = e.target;
      setContactForm((prev) => ({ ...prev, [name]: value }));
    };

    const encodeFormData = (data) => {
      return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
    };

    const handleContactSubmit = (e) => {
      e.preventDefault();
      setFormStatus('submitting');

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({ 'form-name': 'contact', ...contactForm })
      })
        .then(() => {
          setFormStatus('success');
          setContactForm({ name: '', email: '', interest: '', message: '' });
        })
        .catch(() => setFormStatus('error'));
    };

    return (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`,
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
          Let's Talk
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.95' }}>
          Want AI to explain your numbers? Let's talk about what you want answers to.
        </p>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div className="contact-grid-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: colors.darkNavy, marginBottom: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
              Discovery Call
            </h2>
            <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '2rem' }}>
              Tell me about your money, your business or your career, and what you'd love AI to help you understand. I'll show you the quickest path to get there.
            </p>
            <div style={{
              background: 'white',
              border: `2px solid ${colors.limeGreen}`,
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.9rem', color: colors.textMuted, marginBottom: '1rem' }}>
                📅 <strong>15 minutes</strong> • FREE
              </p>
              <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{
                background: colors.limeGreen,
                color: colors.darkNavy,
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                display: 'inline-block',
                textDecoration: 'none',
                marginBottom: '1rem'
              }}>
                BOOK NOW
              </a>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, fontStyle: 'italic', marginTop: '1rem' }}>
                Or fill out the form to the right and I'll be in touch.
              </p>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.8rem', color: colors.darkNavy, marginBottom: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
              Send me a message
            </h2>

            {formStatus === 'success' ? (
              <div style={{
                background: 'white',
                border: `2px solid ${colors.limeGreen}`,
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: colors.darkNavy, marginBottom: '0.5rem' }}>
                  ✅ Message sent!
                </p>
                <p style={{ fontSize: '0.95rem', color: colors.textMuted }}>
                  Thanks for reaching out — I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleContactSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                {/* Hidden fields required for Netlify Forms */}
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.darkNavy }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Aaron"
                    required
                    value={contactForm.name}
                    onChange={handleContactChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${colors.borderGray}`,
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      fontFamily: "'Inter', sans-serif",
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.darkNavy }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    value={contactForm.email}
                    onChange={handleContactChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${colors.borderGray}`,
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      fontFamily: "'Inter', sans-serif",
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.darkNavy }}>
                    Interested In
                  </label>
                  <select
                    name="interest"
                    value={contactForm.interest}
                    onChange={handleContactChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${colors.borderGray}`,
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select a service...</option>
                    <option>AI for Personal Finances</option>
                    <option>AI for Business Finances</option>
                    <option>Excel + AI Skills</option>
                    <option>Career Coaching</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.darkNavy }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="What would you love AI to help you understand about your numbers?"
                    required
                    value={contactForm.message}
                    onChange={handleContactChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${colors.borderGray}`,
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      fontFamily: "'Inter', sans-serif",
                      minHeight: '120px',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {formStatus === 'error' && (
                  <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: 0 }}>
                    Something went wrong sending your message. Please try again, or email aaron.appcoaching@gmail.com directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  style={{
                    background: colors.limeGreen,
                    color: colors.darkNavy,
                    border: 'none',
                    padding: '0.85rem 2rem',
                    borderRadius: '6px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: formStatus === 'submitting' ? 'default' : 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    opacity: formStatus === 'submitting' ? 0.7 : 1
                  }}
                >
                  {formStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
    );
  };

  // ===== FOOTER =====
  const Footer = () => (
    <footer style={{
      background: colors.darkNavy,
      color: 'white',
      textAlign: 'center',
      padding: '2rem 2rem',
      fontSize: '0.9rem',
      fontFamily: "'Poppins', sans-serif",
      marginTop: '3rem'
    }}>
      <p>© 2026 APP Coaching. Unlock your finances with AI.</p>
      <p style={{ fontSize: '0.8rem', opacity: '0.7', marginTop: '0.5rem' }}>
        AI for personal finance • AI for business finance • Excel + AI • Career coaching
      </p>
      <p style={{ fontSize: '0.8rem', opacity: '0.7', marginTop: '0.75rem' }}>
        <a href="/privacy" onClick={(e) => { e.preventDefault(); navigateTo('privacy'); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>Privacy Policy & Terms of Service</a>
      </p>
    </footer>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: colors.textDark, margin: 0, padding: 0, background: colors.offWhite }}>
      <Navigation />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'privacy' && <PrivacyPage />}
      {currentPage === 'notfound' && <NotFoundPage />}

      <EmailSignupSection />
      <Footer />

      {/* Floating "Get in Touch" CTA Button - Bottom Right */}
      <a href="/contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: colors.limeGreen,
        color: colors.darkNavy,
        border: 'none',
        padding: '1rem 1.5rem',
        borderRadius: '50px',
        fontWeight: '700',
        fontSize: '0.9rem',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 4px 16px rgba(0, 255, 65, 0.3)',
        zIndex: 99,
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        display: 'inline-block'
      }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)'; }}>
        💬 Get in Touch
      </a>
    </div>
  );
}
