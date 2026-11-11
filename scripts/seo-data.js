#!/usr/bin/env node
// ===== SEO CONFIG FOR BUILD-TIME USE (Node, CommonJS) =====
// IMPORTANT: this is intentionally a duplicate of the pageConfigs/organizationSchema/
// personSchema block in src/App.jsx, kept in sync by hand (same pattern as
// generateSlug() in scripts/publish-blog.js). It must live under scripts/, not src/ —
// files under src/ are run through CRA's webpack/babel pipeline, which treats them as
// ES modules; a plain `module.exports =` in one throws a hard runtime crash in the
// browser ("ES Modules may not assign module.exports"). This file is only ever
// `require()`'d directly by plain Node scripts (scripts/generate-static-shells.js),
// which never touches webpack, so CommonJS here is safe.
//
// If you change page titles/descriptions/schema, update BOTH this file and the
// matching block in src/App.jsx. Everything from `const SITE_URL` down to the end of
// `pageConfigs` must stay byte-for-byte identical in both files.

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

module.exports = { SITE_URL, organizationSchema, personSchema, pageConfigs, buildBlogPostSchema };
