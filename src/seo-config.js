// ===== SHARED SEO CONFIG — SINGLE SOURCE OF TRUTH =====
// This file is imported two different ways and must stay plain CommonJS
// (module.exports, no ES `export`/JSX) so both consumers can read it as-is:
//   1. src/App.jsx (via webpack/babel's CommonJS interop, at runtime in the browser)
//      — drives the client-side per-page <title>/<meta>/JSON-LD injection.
//   2. scripts/generate-static-shells.js (via plain `require()` in Node, at build time)
//      — bakes the same title/meta/canonical/JSON-LD into real static HTML per route,
//        so crawlers that don't run JS (or aren't on Netlify's prerender allowlist)
//        still see correct, accurate metadata.
// If you change page titles/descriptions/schema, change them ONLY here.

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'APP Coaching',
  url: 'https://appcoaching.io',
  logo: 'https://appcoaching.io/Aaron_Pacheco_300dpi_001_6x6.jpg',
  description: 'AI, Excel & Finance coaching to move you from confusion to clarity and self-sufficiency.',
  sameAs: ['https://www.linkedin.com/in/aaronpacheco'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'aarcheco@gmail.com',
    url: 'https://cal.com/app-coaching-xcgvda'
  },
  founder: {
    '@type': 'Person',
    name: 'Aaron Pacheco',
    url: 'https://appcoaching.io/about'
  }
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aaron Pacheco',
  url: 'https://appcoaching.io/about',
  image: 'https://appcoaching.io/Aaron_Pacheco_300dpi_001_6x6.jpg',
  jobTitle: 'Founder & Coach - AI, Excel & Finance',
  description: 'Brisbane-based finance professional specializing in Excel mastery, AI coaching, and financial clarity for businesses and individuals.',
  worksFor: {
    '@type': 'Organization',
    name: 'APP Coaching'
  },
  knowsAbout: ['Excel', 'Finance', 'AI', 'Business Operations', 'Coaching'],
  sameAs: ['https://linkedin.com/in/aaronpacheco']
};

const pageConfigs = {
  home: {
    id: 'home',
    title: 'APP Coaching | Affordable Finance, Excel & AI Coaching',
    description: 'Expert coaching in Excel, AI & Finance without premium prices. Build clarity, master efficient systems, and become self-sufficient through practical 1-on-1 coaching.',
    canonical: 'https://appcoaching.io/',
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': ['WebPage', 'Organization'],
      name: 'APP Coaching',
      url: 'https://appcoaching.io/',
      description: 'Expert coaching in Excel, AI & Finance without premium prices. Build clarity, master efficient systems, and become self-sufficient.',
      ...organizationSchema
    }
  },
  services: {
    id: 'services',
    title: 'APP Coaching | Services',
    description: 'Expert coaching in Finance, Excel, AI, and Business Operations—without premium prices. Tailored solutions to move you from confusion to capability.',
    canonical: 'https://appcoaching.io/services',
    schema: {
      '@context': 'https://schema.org',
      '@type': ['WebPage', 'LocalBusiness'],
      name: 'APP Coaching Services',
      description: 'Expert coaching services in AI, Excel, Finance, and Business Operations.',
      url: 'https://appcoaching.io/services',
      hasOfferingDetails: [
        {
          '@type': 'Service',
          name: 'Finance Coaching',
          description: 'Career coaching for young professionals in finance. Personal & business finance strategy, profit margins, cash flow clarity.',
          provider: { '@type': 'Organization', name: 'APP Coaching' },
          areaServed: 'AU'
        },
        {
          '@type': 'Service',
          name: 'Excel Coaching',
          description: 'Data analysis, visualization, custom modeling, dashboards, pivot tables, and automation of repetitive tasks.',
          provider: { '@type': 'Organization', name: 'APP Coaching' },
          areaServed: 'AU'
        },
        {
          '@type': 'Service',
          name: 'AI Coaching',
          description: 'Master prompting, AI workflows, agentic AI, custom AI tools, and AI adoption strategy.',
          provider: { '@type': 'Organization', name: 'APP Coaching' },
          areaServed: 'AU'
        },
        {
          '@type': 'Service',
          name: 'Operations & Workflow Coaching',
          description: 'Process design, workflow optimization, task automation, systems thinking, and operational efficiency.',
          provider: { '@type': 'Organization', name: 'APP Coaching' },
          areaServed: 'AU'
        }
      ]
    }
  },
  about: {
    id: 'about',
    title: 'APP Coaching | About Aaron Pacheco',
    description: 'Meet Aaron Pacheco: Finance professional with 10+ years of experience. Expert in Excel, AI adoption, and Finance coaching—without premium prices.',
    canonical: 'https://appcoaching.io/about',
    schema: {
      '@context': 'https://schema.org',
      '@type': ['ProfilePage', 'AboutPage'],
      name: 'About Aaron Pacheco',
      description: 'Aaron Pacheco - Founder of APP Coaching, finance professional, Excel expert, AI coach, and operations specialist.',
      url: 'https://appcoaching.io/about',
      mainEntity: {
        ...personSchema,
        alumniOf: { '@type': 'EducationalOrganization', name: 'Queensland University of Technology (QUT)' },
        affiliation: [
          { '@type': 'Organization', name: 'Flight Centre' },
          { '@type': 'Organization', name: 'PwC' },
          { '@type': 'Organization', name: 'Coronis Group' },
          { '@type': 'Organization', name: 'Aveo Group' }
        ]
      }
    }
  },
  blog: {
    id: 'blog',
    title: 'APP Coaching | Blog',
    description: 'Career stories, Excel lessons, and AI insights from Aaron Pacheco. Actionable advice to build clarity and self-sufficiency in finance, Excel, and AI.',
    canonical: 'https://appcoaching.io/blog',
    schema: {
      '@context': 'https://schema.org',
      '@type': ['CollectionPage', 'Blog'],
      name: 'APP Coaching Blog',
      description: 'Blog posts about career journeys, clarity, finance, Excel mastery, AI adoption, and self-sufficiency lessons.',
      url: 'https://appcoaching.io/blog',
      author: { ...personSchema },
      publisher: { ...organizationSchema }
    }
  },
  contact: {
    id: 'contact',
    title: 'Book a Discovery Call | Get in Touch | APP Coaching',
    description: 'Ready to move from confusion to clarity? Book a free 15-minute discovery call with Aaron to discuss your coaching needs.',
    canonical: 'https://appcoaching.io/contact',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Get in Touch',
      description: 'Contact APP Coaching to book a discovery call.',
      url: 'https://appcoaching.io/contact'
    }
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy & Terms of Service | APP Coaching',
    description: 'Read APP Coaching\'s Privacy Policy and Terms of Service, covering data collection, cookies, and the terms for using this site and our coaching services.',
    canonical: 'https://appcoaching.io/privacy',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy & Terms of Service',
      description: 'Privacy Policy and Terms of Service for APP Coaching.',
      url: 'https://appcoaching.io/privacy'
    }
  }
};

module.exports = { organizationSchema, personSchema, pageConfigs };
