import React, { useState, useEffect, useCallback } from 'react';

// ===== PAGE CONFIGURATIONS FOR SEO (Static, outside component) =====
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'APP Coaching',
  url: 'https://appcoaching.io',
  logo: 'https://appcoaching.io/logo.png',
  description: 'AI, Excel & Finance coaching to move you from confusion to clarity and self-sufficiency.',
  sameAs: ['https://linkedin.com/company/appcoaching', 'https://twitter.com/appcoaching'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
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
    title: 'Your Most Expensive Problem: Confusion | APP Coaching',
    description: 'Move from confusion to clarity. 1-on-1 AI, Excel & Finance coaching by Aaron Pacheco. Unlock self-sufficiency in your business and career.',
    canonical: 'https://appcoaching.io/',
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': ['WebPage', 'Organization'],
      name: 'APP Coaching',
      url: 'https://appcoaching.io/',
      description: 'Move from confusion to clarity with 1-on-1 AI, Excel & Finance coaching by Aaron Pacheco.',
      ...organizationSchema
    }
  },
  services: {
    id: 'services',
    title: 'Coaching Services | AI, Excel & Finance | APP Coaching',
    description: 'Expert coaching in AI, Excel, Finance, and Business Operations. Tailored solutions to move you from confusion to capability.',
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
    title: 'About Aaron Pacheco | Finance Expert & AI Coach | APP Coaching',
    description: 'Meet Aaron Pacheco: Qualified finance professional, Excel expert, AI coach, and operations specialist. 10+ years across top Australian companies.',
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
    title: 'Blog | Career Stories & Lessons | APP Coaching',
    description: 'Read about Aaron\'s journey from confusion to clarity. Career stories, lessons, and actionable PAUL\'s Quick Reads for self-sufficiency.',
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
  }
};

export default function AppCoaching() {
  // ===== GOOGLE ANALYTICS & GSC VERIFICATION =====
  useEffect(() => {
    // Add GSC verification meta tag
    const gscMeta = document.createElement('meta');
    gscMeta.name = 'google-site-verification';
    gscMeta.content = 'yi5jdpycQ4YPGxXSuWdH3vUpoVVGPuFO-RMCbwCybgc';
    document.head.appendChild(gscMeta);

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
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [blogLoading, setBlogLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
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

    // Update or create canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageConfig.canonical;

    // Update Open Graph tags
    const ogTags = {
      'og:title': pageConfig.ogTitle || pageConfig.title,
      'og:description': pageConfig.ogDescription || pageConfig.description,
      'og:url': pageConfig.canonical,
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

    // Add schema.org markup if provided
    if (pageConfig.schema) {
      let schemaScript = document.getElementById(`schema-${pageConfig.id}`);
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = `schema-${pageConfig.id}`;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(pageConfig.schema);
    }
  };

  // Helper function to update blog post meta tags and schema
  const updateBlogPostMetaTags = (post) => {
    const canonicalUrl = `https://appcoaching.io/blog/${post.slug}`;

    // Update title and meta description
    document.title = `${post.title} | APP Coaching`;

    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = post.excerpt;

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
      'og:description': post.excerpt,
      'og:url': canonicalUrl,
      'og:type': 'article',
      'og:image': post.heroImage
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

    // Add BlogPosting schema
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: post.heroImage,
      author: personSchema,
      datePublished: post.date,
      description: post.excerpt,
      url: canonicalUrl,
      publisher: organizationSchema
    };

    let schemaScript = document.getElementById('schema-blog-post');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'schema-blog-post';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(blogSchema);
  };

  // Update meta tags when page changes
  useEffect(() => {
    const config = pageConfigs[currentPage] || pageConfigs.home;
    updateMetaTags(config);
  }, [currentPage]);

  // Update blog post meta tags when post is selected
  useEffect(() => {
    if (currentPage === 'blog' && selectedBlogPost && blogPosts.length > 0) {
      const post = blogPosts.find(p => p.id === selectedBlogPost);
      if (post) {
        updateBlogPostMetaTags(post);
      }
    }
  }, [selectedBlogPost, currentPage, blogPosts]);

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

    const { pageName, postSlug } = getPageFromPath(window.location.pathname);

    if (['home', 'services', 'about', 'blog', 'contact'].includes(pageName)) {
      setCurrentPage(pageName);

      // If viewing a specific blog post by slug
      if (pageName === 'blog' && postSlug && blogPosts.length > 0) {
        const post = blogPosts.find(p => generateSlug(p.title) === postSlug);
        if (post) setSelectedBlogPost(post.id);
      }
    } else {
      // Default to home if invalid path
      setCurrentPage('home');
    }

    // Listen for popstate (back/forward buttons)
    const handlePopstate = () => {
      const { pageName: newPageName, postSlug: newPostSlug } = getPageFromPath(window.location.pathname);

      if (['home', 'services', 'about', 'blog', 'contact'].includes(newPageName)) {
        setCurrentPage(newPageName);

        if (newPageName === 'blog' && newPostSlug && blogPosts.length > 0) {
          const post = blogPosts.find(p => generateSlug(p.title) === newPostSlug);
          if (post) setSelectedBlogPost(post.id);
        } else if (newPageName === 'blog') {
          setSelectedBlogPost(null);
        }
      }
    };

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
            slug: generateSlug(item.title),
            date: item.date,
            excerpt: item.excerpt,
            heroImage: item.heroImage,
            categories: item.categories || [],
            tags: item.tags || [],
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

  const vennSections = {
    finance: {
      title: 'Finance Coaching',
      details: '• Career coaching for young professionals in finance\n• Finance analysts & accountants—from confusion to clarity\n• Personal & business finance strategy\n• Profit margins, pricing, P&L optimization\n• Cash flow clarity & debt paydown plans\n• Decision-making from your numbers'
    },
    excel: {
      title: 'Excel Coaching',
      details: '• Data analysis & visualization\n• Custom modeling & dashboards\n• Pivot tables & advanced formulas\n• Automating repetitive tasks\n• Building spreadsheet systems that scale'
    },
    ai: {
      title: 'AI Coaching',
      details: '• Master prompting & AI workflows\n• Agentic AI & automation\n• Build custom AI tools (solo or co-build)\n• Integrate AI into existing processes\n• AI adoption strategy & implementation'
    },
    operations: {
      title: 'Operations & Workflow',
      details: '• Process design & workflow optimization\n• Task automation & systems thinking\n• Operational clarity & efficiency\n• Building sustainable business rhythms\n• Scaling what works'
    },
    financeExcel: {
      title: 'Finance + Excel',
      details: '• Financial models that tell your story\n• Budget & forecast automation\n• P&L analysis & reporting systems\n• Cash flow dashboards\n• Custom business intelligence'
    },
    financeAI: {
      title: 'Finance + AI',
      details: '• AI-powered financial analysis\n• Automated reporting & insights\n• Pattern detection in financial data\n• Faster decision-making tools\n• Predictive financial planning'
    },
    excelAI: {
      title: 'Excel + AI',
      details: '• AI enhancing Excel workflows\n• Intelligent data processing\n• Next-level analysis & visualization\n• AI-powered formula generation\n• Workflow automation in Excel'
    },
    financeOps: {
      title: 'Finance + Operations',
      details: '• Profitability through efficiency\n• Cost control & margin optimization\n• Utilization tracking & improvement\n• Financial metrics for operations\n• Revenue per resource analysis'
    },
    excelOps: {
      title: 'Excel + Operations',
      details: '• Process dashboards & monitoring\n• Workflow metrics & KPIs\n• Data-driven operations management\n• Capacity planning & resource tracking\n• Operational visibility systems'
    },
    aiOps: {
      title: 'AI + Operations',
      details: '• Automation of manual processes\n• Workflow intelligence & optimization\n• AI-powered process improvement\n• Task automation & orchestration\n• Operational AI strategy'
    },
    center: {
      title: 'Unlock Hidden Potential',
      details: '• Custom solutions combining all four\n• Finance + Excel + AI + Operations\n• Your unique business problems solved\n• Co-built implementations\n• Results-driven approach'
    }
  };

  // ===== EMPLOYER LOGOS =====
  const employers = [
    { name: 'QUT', logo: '/QUT-Logo.jpg' },
    { name: 'CAANZ', logo: '/images.png' },
    { name: 'PwC', logo: '/PwC-logo-380x290-1.gif' },
    { name: 'Flight Centre', logo: '/Flight-Centre-Logo-320x320-1.png' },
    { name: 'Coronis Group', logo: '/Coronis_nbsnnc.webp' },
    { name: 'RACQ', logo: '/racq-insurance-logo.webp' },
    { name: 'Telstra', logo: '/Telstra-logo.jpg' },
    { name: 'Aveo Group', logo: '/Aveo-Logo.png' },
    { name: 'Kids Helpline', logo: '/LOGO133203970002567033.jpg' },
    { name: 'Tradies Success', logo: '/tradies_success_academy_logo.jpeg' }
  ];

  // ===== SERVICE SEGMENTS =====
  const services = [
    {
      id: 'excel',
      title: 'Excel Learners',
      subtitle: 'No more spreadsheet anxiety',
      description: '• Formulas, pivot tables, dashboards\n• Stop using Excel like a typewriter\n• Build systems that scale\n• Data visualization & analysis\n• Automation of manual tasks',
      icon: '📊',
      cta: '=contact(me)'
    },
    {
      id: 'finance-personal',
      title: 'Personal Finance Coaching',
      subtitle: 'Your money, decoded',
      description: '• Build your real financial picture\n• Property investment & ROI analysis\n• Budgeting that sticks\n• Build spreadsheets/apps for clarity\n• Unlock a different view of your finances\n• Know where every dollar goes',
      icon: '💰',
      cta: 'show me the money'
    },
    {
      id: 'finance-business',
      title: 'Business Finance Coaching',
      subtitle: 'Profit isn\'t complicated',
      description: '• Build spreadsheets/apps for clarity\n• Connect AI/Claude to Xero systems\n• Understand profit margins\n• Price your services to make money\n• Unlock a different view of your business\n• See what\'s really happening',
      icon: '📈',
      cta: 'help me grow'
    },
    {
      id: 'ai-personal',
      title: 'AI for Personal Use',
      subtitle: 'AI without the hype',
      description: '• Use Claude/ChatGPT/Gemini to design graphics & images\n• Link AI to your email & calendar\n• Query your data straight from Claude\n• Write emails directly from AI\n• Build apps like party games & photobooths\n• No buzzwords, just results',
      icon: '🤖',
      cta: 'build an app? finally!'
    },
    {
      id: 'ai-business',
      title: 'AI for Business',
      subtitle: 'The ROI is real',
      description: '• Connect Claude to Xero & accounting systems\n• Custom AI apps & dashboards\n• AI for job management & operations\n• Agentic AI - agents that do the work\n• Build better marketing tactics\n• Replace & streamline workflows',
      icon: '⚙️',
      cta: 'automate and save'
    },
    {
      id: 'career',
      title: 'Career Coaching',
      subtitle: 'Your next move',
      description: '• Resume review & optimization\n• Interview prep & negotiation\n• For finance & accounting professionals\n• Young CAs & high school students\n• Firm vs industry career paths\n• Career navigation & strategy',
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
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap');

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

  // ===== VENN DIAGRAM COMPONENT =====
  const VennDiagram = () => (
    <div style={{
      padding: '3rem 2rem',
      background: colors.offWhite,
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        color: colors.darkNavy,
        marginBottom: '2rem',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '800',
        letterSpacing: '-1px'
      }}>
        How I Can Help You
      </h2>

      <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '800px' }}>
        <svg viewBox="0 0 900 650" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}>
          <circle cx="280" cy="320" r="140" fill={colors.limeGreen} opacity={hoveredSection === 'finance' ? '0.25' : '0.15'} stroke={colors.limeGreen} strokeWidth={hoveredSection === 'finance' ? '3' : '2'} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={() => setHoveredSection('finance')} onMouseLeave={() => setHoveredSection(null)} />
          <circle cx="620" cy="320" r="140" fill={colors.warmYellow} opacity={hoveredSection === 'excel' ? '0.25' : '0.15'} stroke={colors.warmYellow} strokeWidth={hoveredSection === 'excel' ? '3' : '2'} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={() => setHoveredSection('excel')} onMouseLeave={() => setHoveredSection(null)} />
          <circle cx="450" cy="150" r="140" fill={colors.darkNavy} opacity={hoveredSection === 'ai' ? '0.25' : '0.15'} stroke={colors.darkNavy} strokeWidth={hoveredSection === 'ai' ? '3' : '2'} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={() => setHoveredSection('ai')} onMouseLeave={() => setHoveredSection(null)} />
          <circle cx="450" cy="490" r="140" fill={colors.mediumGreen} opacity={hoveredSection === 'operations' ? '0.25' : '0.15'} stroke={colors.mediumGreen} strokeWidth={hoveredSection === 'operations' ? '3' : '2'} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={() => setHoveredSection('operations')} onMouseLeave={() => setHoveredSection(null)} />
          <text x="200" y="360" fontSize="20" fontWeight="700" fill={colors.darkNavy} fontFamily="'Poppins', sans-serif" textAnchor="middle" style={{ pointerEvents: 'none' }}>FINANCE</text>
          <text x="700" y="360" fontSize="20" fontWeight="700" fill={colors.darkNavy} fontFamily="'Poppins', sans-serif" textAnchor="middle" style={{ pointerEvents: 'none' }}>EXCEL</text>
          <text x="450" y="95" fontSize="20" fontWeight="700" fill={colors.darkNavy} fontFamily="'Poppins', sans-serif" textAnchor="middle" style={{ pointerEvents: 'none' }}>AI</text>
          <text x="450" y="575" fontSize="20" fontWeight="700" fill={colors.darkNavy} fontFamily="'Poppins', sans-serif" textAnchor="middle" style={{ pointerEvents: 'none' }}>OPERATIONS</text>
        </svg>
      </div>

      {hoveredSection && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'white',
          border: `2px solid ${colors.limeGreen}`,
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '2rem auto 0',
          animation: 'fadeIn 0.3s ease',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            color: colors.darkNavy,
            marginBottom: '1rem',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '700'
          }}>
            {vennSections[hoveredSection].title}
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: colors.textMuted,
            lineHeight: '1.8',
            margin: 0,
            whiteSpace: 'pre-line'
          }}>
            {vennSections[hoveredSection].details}
          </p>
        </div>
      )}

      {!hoveredSection && (
        <p style={{
          fontSize: '1.1rem',
          color: colors.textMuted,
          maxWidth: '750px',
          margin: '2rem auto 0',
          lineHeight: '1.8'
        }}>
          Over my career, I've learned that confusion doesn't come from one area alone—it's built into the gaps between them. Finance, Excel, AI, Operations. Each is powerful on its own. But when you weave them together? That's when clarity emerges. That's when you move from confusion to confidence. The problems you solve and the questions you answer become more effective, more elegant, more yours. I'm here to help you see those connections and build capability across all of them.
        </p>
      )}
    </div>
  );

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
        <div onClick={() => navigateTo('home')} style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
          APP<span style={{ color: colors.limeGreen, fontSize: '1rem' }}>•</span>Coaching
        </div>

        {/* Desktop menu */}
        <div style={{ display: 'none', gap: '2rem', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }} className="desktop-menu">
          <span onClick={() => navigateTo('home')} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Home</span>
          <span onClick={() => navigateTo('services')} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Services</span>
          <span onClick={() => navigateTo('about')} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>About</span>
          <span onClick={() => navigateTo('blog')} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Blog</span>
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
          <span onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', padding: '0.75rem 0', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>Home</span>
          <span onClick={() => { navigateTo('services'); setMobileMenuOpen(false); }} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', padding: '0.75rem 0', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>Services</span>
          <span onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', padding: '0.75rem 0', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>About</span>
          <span onClick={() => { navigateTo('blog'); setMobileMenuOpen(false); }} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', padding: '0.75rem 0' }}>Blog</span>
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
  const HomePage = () => (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, rgba(20, 35, 80, 0.85) 0%, rgba(25, 50, 120, 0.85) 50%), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80')`,
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
        <img src="/aaron-archive-10.jpg" alt="Aaron Pacheco" style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)', width: 'clamp(200px, 35vw, 320px)', height: 'auto', borderRadius: '12px', objectFit: 'contain' }} />

        <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)', marginBottom: 'clamp(1rem, 2vh, 1.5rem)', lineHeight: '1.2', fontWeight: '800', fontFamily: "'Poppins', sans-serif", maxWidth: '900px' }}>
          Your Most Expensive Problem: Confusion.
        </h1>

        <div style={{ fontSize: 'clamp(0.95rem, 3vw, 1.2rem)', maxWidth: '900px', margin: '0 auto clamp(1rem, 2vh, 2rem)', lineHeight: '1.9', opacity: '0.98', fontFamily: "'Inter', sans-serif" }}>
          <p style={{ marginBottom: '1.2rem' }}>
            <span style={{ color: colors.limeGreen, fontWeight: '700' }}>Confusion about your numbers.</span> Confusion in how to use <span style={{ color: colors.limeGreen, fontWeight: '700' }}>Excel efficiently.</span> Confusion about <span style={{ color: colors.limeGreen, fontWeight: '700' }}>which AI tools</span> actually work. Confusion about your <span style={{ color: colors.limeGreen, fontWeight: '700' }}>processes and workflows.</span>
          </p>
          <p style={{ marginBottom: '1.2rem' }}>
            It's the silent killer of productivity—bleeding <span style={{ color: colors.limeGreen, fontWeight: '700' }}>time and money</span> without you realizing it. Whether you're a business owner flying blind on your P&L, or a professional drowning in manual spreadsheets—<span style={{ color: colors.limeGreen, fontWeight: '700' }}>confusion is costing you.</span>
          </p>
          <p>
            I help you transform <span style={{ color: colors.limeGreen, fontWeight: '700' }}>confusion into confidence</span> through optimized Excel, AI mastery, and streamlined systems. Fast. Efficient. Self-sufficient. So you can move forward with <span style={{ color: colors.limeGreen, fontWeight: '700' }}>clarity and empowerment.</span>
          </p>
        </div>

        <button onClick={() => navigateTo('contact')} style={{ background: colors.limeGreen, color: '#4a5568', border: 'none', padding: 'clamp(0.6rem, 2vh, 1rem) clamp(1rem, 4vw, 2.5rem)', fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontWeight: '700', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", whiteSpace: 'nowrap' }}>
          BOOK A CALL →
        </button>
      </section>

      {/* How I Can Help You - Services Section */}
      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: colors.darkNavy,
          marginBottom: '1rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800',
          textAlign: 'center'
        }}>
          How I Can Help You
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              icon: '💰',
              title: 'Finance Literacy',
              description: 'Understand your numbers deeply. Build clarity around profit, cash flow, and financial decisions that drive your business forward.'
            },
            {
              icon: '📊',
              title: 'Excel & AI Skills',
              description: 'Master the tools that move the needle. Build efficient systems, automate your workflows, and leverage AI to accelerate your results.'
            },
            {
              icon: '🚀',
              title: 'Career Mentoring',
              description: 'Develop the clarity and confidence to advance. Work on your professional growth, systems thinking, and becoming indispensable in your role.'
            }
          ].map((pillar, idx) => (
            <div key={idx} style={{
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
              justifyContent: 'space-between'
            }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.limeGreen; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 255, 65, 0.15)`; e.currentTarget.style.background = `linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(255, 217, 61, 0.1) 100%)`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.borderGray; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.background = `linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`; }}>
              <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem' }}>
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.8' }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <VennDiagram />

      {/* Synthesized Systems Paragraph */}
      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '1.1rem',
          color: colors.darkNavy,
          lineHeight: '1.9',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Here's what I've learned: <span style={{ fontWeight: '700', textDecoration: 'underline' }}>The real power isn't in any single tool.</span> Excel alone won't move you forward. AI without structure is just noise. Finance without systems is firefighting.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            It's when you understand how <span style={{ fontWeight: '700', textDecoration: 'underline' }}>these systems work together</span>—how your Excel models feed your financial analysis, how AI accelerates your learning, how your processes and workflows connect to your actual business outcomes—that everything changes.
          </p>
          <p>
            The more you recognize their interconnectedness, the more <span style={{ fontWeight: '700', fontStyle: 'italic' }}>confident and capable</span> you become working cross-functionally. You see patterns others miss. You move faster. You have real <span style={{ fontWeight: '700', fontStyle: 'italic' }}>insight</span> instead of just data.
          </p>
        </div>
      </section>

      {/* My Coaching Style - Principles Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'white',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: colors.darkNavy,
          marginBottom: '1rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800',
          textAlign: 'center'
        }}>
          My Coaching Style
        </h2>
        <p style={{
          fontSize: '1rem',
          color: colors.textMuted,
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          This is how I work. This is what you can expect.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {[
            {
              icon: '💡',
              title: 'Confusion → Confidence',
              description: 'Transform what feels overwhelming into actionable clarity you can trust and act on.'
            },
            {
              icon: '📝',
              title: 'Speaking Plain English',
              description: 'No jargon. No corporate speak. Clear language that moves people from confusion to understanding.'
            },
            {
              icon: '🤝',
              title: 'Co-Learning Together',
              description: 'We grow as partners. You become independent with these tools, not dependent on me.'
            }
          ].map((principle, idx) => (
            <div key={idx} style={{
              background: `linear-gradient(135deg, #4ade80 0%, rgba(255, 255, 255, 0.9) 100%)`,
              border: `1px solid ${colors.borderGray}`,
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
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

      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'white', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2rem',
          color: colors.darkNavy,
          marginBottom: '1.5rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800'
        }}>
          A Little About Me
        </h2>
        <div style={{ marginBottom: '2rem' }}>
          <img src="/aaron-headshot-professional.jpg" alt="Aaron" style={{ width: '100%', maxWidth: '300px', borderRadius: '12px', objectFit: 'cover', margin: '0 auto 1.5rem' }} />
        </div>
        <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', maxWidth: '750px', margin: '0 auto' }}>
          I'm a <span style={{ color: colors.darkNavy, fontWeight: '700' }}>qualified finance professional and analyst</span> based in Australia with 10+ years of real-world experience turning <span style={{ color: colors.darkNavy, fontWeight: '700' }}>confusion into clarity.</span> I've built financial models, designed dashboards, and helped Australian and international teams extract insight from data using Excel, AI, and optimized systems. My mission: <span style={{ color: colors.darkNavy, fontWeight: '700' }}>close the knowledge gap</span> and <span style={{ color: colors.darkNavy, fontWeight: '700' }}>empower you</span> to become self-sufficient. When I work with you, my goal isn't lifelong coaching—it's moving you from <span style={{ color: colors.darkNavy, fontWeight: '700' }}>confusion to confidence</span> as fast as possible. The reward for me is that moment when it clicks: when you realize you CAN read your numbers, CAN build systems, CAN use AI strategically. That's success.
        </p>
      </section>

      <section style={{ padding: '2rem 2rem', background: colors.offWhite, overflow: 'hidden' }}>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: colors.textMuted, marginBottom: '1.5rem', fontWeight: '600' }}>
          I've worked here!
        </p>
        <div style={{ position: 'relative', overflow: 'hidden', background: colors.offWhite }}>
          <style>{`
            @keyframes scrollLogos {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .logo-carousel {
              display: flex;
              animation: scrollLogos 16s linear infinite;
              gap: 2rem;
            }
            .logo-carousel:hover {
              animation-play-state: paused;
            }
            .logo-item {
              flex: 0 0 140px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 1rem;
              background: white;
              border-radius: 8px;
              font-weight: 600;
              font-size: 0.75rem;
              color: ${colors.darkNavy};
              min-height: 80px;
            }
            .logo-item img {
              max-width: 100%;
              max-height: 60px;
              object-fit: contain;
              filter: brightness(0.9);
              transition: filter 0.3s ease;
            }
            .logo-item:hover img {
              filter: brightness(1);
            }
          `}</style>
          <div className="logo-carousel">
            {[...employers, ...employers].map((employer, idx) => (
              <div key={idx} className="logo-item">
                <img
                  src={employer.logo}
                  alt={employer.name}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  style={{ display: 'block' }}
                />
                <span style={{ display: 'none' }}>{employer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'white', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2rem',
          color: colors.darkNavy,
          marginBottom: '1.5rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800'
        }}>
          Ready to Unlock Your Potential?
        </h2>
        <p style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Book a free 15-minute discovery call. Let's talk about your goals and how we can work together.
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
          display: 'inline-block',
          marginBottom: '2rem'
        }}>
          BOOK DISCOVERY CALL →
        </a>
      </section>

    </div>
  );

  // ===== SERVICES PAGE =====
  const ServicesPage = () => {
    const principles = [
      {
        icon: '💡',
        title: 'Confusion → Confidence',
        description: 'Transform what feels overwhelming into actionable clarity you can trust and act on.'
      },
      {
        icon: '📝',
        title: 'Speaking Plain English',
        description: 'No jargon. No corporate speak. Clear language that moves people from confusion to understanding.'
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
          background: `linear-gradient(135deg, rgba(31, 58, 125, 0.85) 0%, rgba(42, 79, 168, 0.85) 100%), url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80')`,
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
            I turn <span style={{ fontWeight: '700' }}>confusion into confidence</span>—in as few sessions as possible. As an Australian-based finance professional, I work with professionals locally and globally to build your <span style={{ fontWeight: '700' }}>self-sufficiency.</span> Excel mastery. AI competence. Optimized processes. Fast. Efficient. Done.
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
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
          Pricing
        </h2>
        <p style={{
          fontSize: '1rem',
          color: colors.textMuted,
          marginBottom: '2rem',
          maxWidth: '800px',
          margin: '0 auto 2rem',
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          One-on-one coaching for <span style={{ fontWeight: '600', textDecoration: 'underline', textDecorationColor: colors.limeGreen, textDecorationThickness: '2px', textUnderlineOffset: '2px' }}>under $200</span> per session, depending on the service.
        </p>
        <p style={{
          fontSize: '0.95rem',
          color: colors.textMuted,
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Traditional business coaching charges monthly or continuously, hoping to keep you as a client long-term. My goal is the opposite: turn you from <span style={{ textDecoration: 'underline', textDecorationColor: colors.limeGreen, textDecorationThickness: '2px', textUnderlineOffset: '2px', color: colors.darkNavy, fontWeight: '600' }}>confusion to confidence</span> in as few sessions as possible—ideally just one. I want you <span style={{ fontStyle: 'italic', color: colors.darkNavy, fontWeight: '600' }}>self-sufficient and saving money</span> from my coaching as quickly as possible. That's my win.
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
          Ready to Eliminate the Confusion?
        </h2>
        <p style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
          Book a free 15-minute discovery call. Let's talk about where confusion is costing you the most, and how we can work together to close that gap.
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
  const AboutPage = () => (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, rgba(31, 58, 125, 0.85) 0%, rgba(42, 79, 168, 0.85) 100%), url('/aaron-archive-4.jpg')`,
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
          About Me
        </h1>
        <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1rem)', opacity: '0.95', maxWidth: '700px', lineHeight: '1.7' }}>
          A career spanning more than ten years, <span style={{ fontWeight: '700' }}>gradually converting my own confusion to clarity</span> about my purpose and my capability. Finance professional. Excel strategist. AI learner. I help you move from <span style={{ color: colors.limeGreen }}>confusion to confidence</span>—in your numbers, your tools, your career.
        </p>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* MY STORY */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            My Story
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="/aaron-archive-2.jpg" alt="Aaron's story" style={{ width: '100%', height: '350px', borderRadius: '12px', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Who I Am Beyond Work
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                What matters most to me outside work is the people around me—friends I've known since school, mates I've made along the way in different workplaces, and of course, my family and extended family. Spending quality time with my cousins and loved ones is something I genuinely cherish. I'm also deeply passionate about making and playing music, and I love traveling the world with my wife—discovering new restaurants, experiencing new places, catching great films. We're planning for parenthood, which honestly puts everything into perspective. Life's short, and we should take ourselves and our potential as far as we can go.
              </p>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Football is my constant. I've been playing since I was 6—loyal to my local club, managing a social futsal team where I get together with mates every week. It's how I stay fit, stay sane, and stay connected. My football heroes are Cristiano Ronaldo, Real Madrid, Portugal. And of course, Brisbane Roar. But here's the thing: I'm in my thirties, well past my physical prime. Yet I'm obsessed with continuously improving—not just my game, but my team's game too. It's about tactics, strategy, understanding the nuances of play, and managing muscle and fatigue smarter. That same drive to improve, to find leverage, to build systems that work—that's exactly what I bring to coaching.
              </p>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', marginTop: '2rem' }}>
                My Professional Journey
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                I'm a qualified accountant with over a decade of experience in audit, finance operations, and strategic planning across Australian organizations. I started my career making Excel do impossible things—building financial models that told stories, dashboards that brought clarity to chaos, and systems that replaced manual work.
              </p>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                For years, Excel was my superpower. I knew it inside out. And I was proud of that. But here's what I've learned: <strong>the finance industry is changing fast.</strong> Skills that were essential 10 years ago are becoming obsolete. Will Excel formulas even be necessary in 5 years? Who knows. That uncertainty? It spurs me on. I refuse to be stuck in old ways. I'd rather take risks, learn constantly, and stay ahead than wake up regretting that I didn't adapt. Even if it costs me—the minimum I get is knowledge.
              </p>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8' }}>
                Then AI happened. And everything changed again. And I leaned in.
              </p>
            </div>
          </div>

          <h3 style={{
            fontSize: '1.3rem',
            color: colors.darkNavy,
            marginBottom: '1.5rem',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '700',
            textAlign: 'center'
          }}>
            A Few Candid Moments
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem'
          }}>
            <img src="/aaron-headshot-casual-1.jpg" alt="Aaron moment" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            <img src="/PSX_20241105_115531.jpg" alt="Aaron candid" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            <img src="/aaron-headshot-casual-3.jpg" alt="Aaron memory" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            <img src="/PSX_20171114_215601.jpg" alt="Aaron moment" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            <img src="/WP_20161020_19_07_16_Rich.jpg" alt="Aaron candid" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            <img src="/20250329_194859.jpg" alt="Aaron memory" style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
          </div>
        </div>

        {/* WHERE I'VE LEARNED - TRACK RECORD */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            Where I've Learned (The Track Record)
          </h2>
          <p style={{ fontSize: '1.1rem', color: colors.textMuted, textAlign: 'center', marginBottom: '3rem', lineHeight: '1.8' }}>
            These aren't just jobs. They're places where I invested time to understand broken processes, rebuilt them, and watched the time savings compound. Here's what I learned.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: colors.offWhite, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="/Flight-Centre-Logo-320x320-1.png" alt="Flight Centre" style={{ height: '60px', objectFit: 'contain', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Flight Centre Travel Group
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '1rem', fontStyle: 'italic' }}>
                Accountant & Team Leader
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Outdated Excel models everywhere. Broken VBA code. Manual data entry eating up hours. I rebuilt countless workbooks from the ground up—lean, streamlined, formula-driven. Saved employees hours every single day. Those models? Still being used today. That's compound time savings.
              </p>
            </div>

            <div style={{ background: colors.offWhite, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="/Coronis_nbsnnc.webp" alt="Coronis" style={{ height: '60px', objectFit: 'contain', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Coronis Group
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '1rem', fontStyle: 'italic' }}>
                Accountant
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Finance drowning in paper. No automation. No insight for leadership. I transformed it—paperless processes, insightful reporting that meant something to the CFO and CEO. 40% efficiency gain in finance operations. That freed up capacity for value-add work.
              </p>
            </div>

            <div style={{ background: colors.offWhite, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="/Telstra-logo.jpg" alt="Telstra" style={{ height: '60px', objectFit: 'contain', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Telstra
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '1rem', fontStyle: 'italic' }}>
                Finance Analyst
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Presented to 70+ junior accountants on turning insight into plain English. Finance pros drown in jargon and complexity—I learned that translating numbers into decisions is a superpower. It's the difference between data and understanding. This is the art I'm still mastering.
              </p>
            </div>

            <div style={{ background: colors.offWhite, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="/Aveo-Logo.png" alt="Aveo Group" style={{ height: '60px', objectFit: 'contain', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Aveo Group
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '1rem', fontStyle: 'italic' }}>
                Commercial Analyst
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Processes buried in manual data entry taking up hours every week. I automated with PowerQuery and Excel—saved a colleague 16 hours weekly. Built a dashboard that exposed staff utilization so leadership could see where capacity was bleeding. Better visibility. Better decisions. Better profitability.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: colors.textMuted, textAlign: 'center', marginTop: '2rem', lineHeight: '1.8' }}>
            <strong>The pattern?</strong> Someone invests time to understand a broken system. They fix it. They document it. Then they walk away and the time savings compound forever. That's leverage. That's what I'm here to help you build.
          </p>

          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: `2px solid ${colors.borderGray}`, textAlign: 'center' }}>
            <style>{`
              @keyframes scrollLogos {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .logo-carousel {
                display: flex;
                animation: scrollLogos 16s linear infinite;
                gap: 2rem;
              }
              .logo-carousel:hover {
                animation-play-state: paused;
              }
              .logo-item {
                flex: 0 0 140px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                background: white;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.75rem;
                color: #1f3a7d;
                min-height: 80px;
              }
              .logo-item img {
                max-width: 100%;
                max-height: 60px;
                object-fit: contain;
                filter: brightness(0.9);
                transition: filter 0.3s ease;
              }
              .logo-item:hover img {
                filter: brightness(1);
              }
            `}</style>
            <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
              Where I've Made My Impact
            </h3>
            <div style={{ position: 'relative', overflow: 'hidden', marginTop: '2rem' }}>
              <div className="logo-carousel">
                {[...employers, ...employers].map((employer, idx) => (
                  <div key={idx} className="logo-item">
                    <img
                      src={employer.logo}
                      alt={employer.name}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* THE PROBLEM I REALIZED */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            The Problem I Realized
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <div style={{ textAlign: 'center', order: 2 }}>
              <img src="/aaron-archive-4.jpg" alt="The problem realized" style={{ width: '100%', height: '280px', borderRadius: '12px', objectFit: 'cover' }} />
            </div>
            <div style={{ order: 1 }}>
              <h3 style={{ fontSize: '1.2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Confusion is Expensive
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Across every organization I worked in, <strong>confusion about processes, systems, and data cost real money and time.</strong> Not because people were incompetent—because they lacked knowledge or confidence to use available tools effectively. Manual spreadsheets instead of dashboards. Repetitive data entry instead of automation. Reports taking days instead of minutes. That confusion? It compounds. Every single day.
              </p>
              <h3 style={{ fontSize: '1.2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', marginTop: '1.5rem' }}>
                The Real Cost: Lack of Self-Sufficiency
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                The businesses that stayed stuck weren't lacking resources. They were lacking <strong>knowledge and capability.</strong> People didn't understand their numbers. They couldn't build their own systems. They couldn't leverage new tools like AI because they hadn't built the foundation. So they stayed dependent. Stuck. Unable to move forward with confidence.
              </p>
              <h3 style={{ fontSize: '1.2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', marginTop: '1.5rem' }}>
                The Solution: Investment in Capability
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8' }}>
                The businesses that thrived invested time upfront—understanding their processes, building proper systems, developing skills. That investment paid off immediately. Less time wasted on confusion. More time spent on what matters. More money in the pocket. That's leverage. That's what I'm here to help you build.
              </p>
            </div>
          </div>
        </div>

        {/* MY JOURNEY - How I Got Here */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            How I Got Here – Why I'm Confident Now
          </h2>
          <div style={{ background: colors.offWhite, padding: '2.5rem', borderRadius: '12px', lineHeight: '1.9' }}>
            <p style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '1.5rem' }}>
              My journey wasn't linear. For over a decade, I worked inside organizations—learning, building, solving problems. I moved from confusion to clarity. I learned that the real value isn't in knowing everything; it's in knowing how to find answers, build systems, and translate complexity into action. I've made mistakes. I've rebuilt things. I've watched smart people stay stuck because they didn't have guidance—not because they weren't capable.
            </p>
            <p style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '1.5rem' }}>
              <strong style={{ color: colors.darkNavy }}>Now I have something to share.</strong> I've lived through the confusion-to-clarity journey myself. I've got real-world expertise from roles at Flight Centre, PwC, Coronis, Telstra, and Aveo. I understand what it takes to move from guessing to knowing—from inefficient processes to systems that work. I've built financial models. Automated workflows. Turned data into decisions. And I've watched how powerful it is when someone finally understands their numbers, their systems, their potential.
            </p>
            <p style={{ fontSize: '1rem', color: colors.textMuted }}>
              That confidence? It comes from knowing that the path I took works. And I'm now in a position where I genuinely want to help others walk it too—with the expertise and real-world knowledge I've earned, so they can grow, become more capable, and build the self-sufficiency that actually matters.
            </p>
          </div>
        </div>

        {/* TESTIMONIALS CAROUSEL */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            What Others Are Saying
          </h2>
          <p style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '3rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            Real feedback from people who've worked through the journey from confusion to confidence.
          </p>

          <style>{`
            @keyframes scrollTestimonials {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-100% - 2rem)); }
            }
            .testimonials-carousel {
              display: flex;
              animation: scrollTestimonials 20s linear infinite;
              gap: 2rem;
              padding: 1rem 0;
            }
            .testimonials-carousel:hover {
              animation-play-state: paused;
            }
            .testimonial-card {
              flex: 0 0 320px;
              background: white;
              border: 1px solid ${colors.borderGray};
              border-radius: 12px;
              padding: 2rem;
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              box-shadow: 0 2px 8px rgba(0,0,0,0.06);
              transition: all 0.3s ease;
            }
            .testimonials-carousel .testimonial-card:hover {
              box-shadow: 0 8px 24px rgba(0,255,65,0.1);
              border-color: ${colors.limeGreen};
            }
          `}</style>

          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="testimonials-carousel">
              {[
                {
                  name: 'Client Name',
                  role: 'Finance Manager',
                  text: 'Working with Aaron transformed how I understand my numbers. From confusion to confidence in just a few sessions.'
                },
                {
                  name: 'Client Name',
                  role: 'Small Business Owner',
                  text: 'The Excel systems I built with Aaron save me hours every week. Best investment I made for my business.'
                },
                {
                  name: 'Client Name',
                  role: 'Accountant',
                  text: "Aaron's approach to translating complexity into plain English is exactly what I needed. Highly recommend."
                },
                {
                  name: 'Client Name',
                  role: 'Finance Analyst',
                  text: "I went from feeling overwhelmed to actually understanding my workflow. Aaron teaches in a way that sticks."
                },
                {
                  name: 'Client Name',
                  role: 'Operations Manager',
                  text: 'The systems we built together have become part of our daily workflow. Efficiency gains were immediate.'
                },
                {
                  name: 'Client Name',
                  role: 'Career-Changer',
                  text: 'Aaron helped me build confidence in skills I thought I was bad at. Now Excel feels like a superpower.'
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="testimonial-card">
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ fontSize: '1.2rem', color: colors.limeGreen }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.7', flexGrow: 1 }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p style={{ fontSize: '0.95rem', color: colors.darkNavy, fontWeight: '700', margin: '0 0 0.25rem' }}>
                      {testimonial.name}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: colors.textMuted, margin: 0 }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
              {/* Duplicate for infinite scroll */}
              {[
                {
                  name: 'Client Name',
                  role: 'Finance Manager',
                  text: 'Working with Aaron transformed how I understand my numbers. From confusion to confidence in just a few sessions.'
                },
                {
                  name: 'Client Name',
                  role: 'Small Business Owner',
                  text: 'The Excel systems I built with Aaron save me hours every week. Best investment I made for my business.'
                },
                {
                  name: 'Client Name',
                  role: 'Accountant',
                  text: "Aaron's approach to translating complexity into plain English is exactly what I needed. Highly recommend."
                },
                {
                  name: 'Client Name',
                  role: 'Finance Analyst',
                  text: "I went from feeling overwhelmed to actually understanding my workflow. Aaron teaches in a way that sticks."
                },
                {
                  name: 'Client Name',
                  role: 'Operations Manager',
                  text: 'The systems we built together have become part of our daily workflow. Efficiency gains were immediate.'
                },
                {
                  name: 'Client Name',
                  role: 'Career-Changer',
                  text: 'Aaron helped me build confidence in skills I thought I was bad at. Now Excel feels like a superpower.'
                }
              ].map((testimonial, idx) => (
                <div key={`dup-${idx}`} className="testimonial-card">
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ fontSize: '1.2rem', color: colors.limeGreen }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.7', flexGrow: 1 }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p style={{ fontSize: '0.95rem', color: colors.darkNavy, fontWeight: '700', margin: '0 0 0.25rem' }}>
                      {testimonial.name}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: colors.textMuted, margin: 0 }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* WHY IT'S CALLED APP COACHING */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}`, background: colors.offWhite, padding: '3rem 2rem', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '2rem', color: colors.darkNavy, marginBottom: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            Why It's Called "APP Coaching"
          </h2>
          <p style={{ fontSize: '1.05rem', color: colors.textMuted, lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>
            "APP" stands for <strong>Aaron Paul Pacheco</strong>—that's me. But it's really about more than apps. It's about accepting new technology, experimenting with tools that actually work, and staying <span style={{ fontStyle: 'italic', color: colors.darkNavy, fontWeight: '600' }}>curious in a world that breeds confusion</span>. The people moving from <span style={{ color: colors.darkNavy, fontWeight: '700' }}>confusion to clarity to confidence</span> aren't afraid of new tools—they learn them, experiment, and build the <span style={{ fontWeight: '600' }}>capability</span> to use them. Meanwhile, others stay stuck waiting for the "perfect moment." APP Coaching represents my belief that continuous learning is the difference between confusion and capability.
          </p>
        </div>

        {/* DISCOVERY CTA - Matching Blog Post Style */}
        <section style={{ background: `linear-gradient(135deg, #1f3a7d 0%, #2a4fa8 100%)`, color: 'white', borderRadius: '12px', padding: '2.5rem', margin: '4rem 0 0 0', textAlign: 'center' }}>
          <h3 style={{ color: 'white', margin: '0 0 1rem 0', fontSize: '1.3rem', fontWeight: '700', fontFamily: "'Poppins', sans-serif" }}>Ready to Close the Gap?</h3>

          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>Book a free 15-minute discovery call. Let's talk about where confusion is costing you the most and how we can build your path to clarity and self-sufficiency.</p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{ background: colors.limeGreen, color: '#1f3a7d', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }}>Book a Free Discovery Call</a>
            <a href="/services" style={{ border: `2px solid ${colors.limeGreen}`, color: colors.limeGreen, padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }}>Explore Services</a>
          </div>
        </section>
      </section>
    </div>
  );

  // ===== BLOG PAGE =====
  const BlogPage = () => {
    if (selectedBlogPost) {
      // Individual blog post view
      const post = blogPosts.find(p => p.id === selectedBlogPost);
      if (!post) return <div>Post not found</div>;

      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
              window.location.hash = 'blog';
              window.scrollTo(0, 0);
            }} style={{
              background: 'transparent',
              border: 'none',
              color: colors.limeGreen,
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              padding: 0,
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
              .blog-content em {
                font-style: italic;
                color: ${colors.navy};
                text-decoration: underline;
                text-decoration-color: ${colors.limeGreen};
                text-decoration-thickness: 2px;
                text-underline-offset: 2px;
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
            }} dangerouslySetInnerHTML={{ __html: post.content }} />

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
                <img
                  src="/aaron-headshot-professional.jpg"
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
                    <strong style={{ color: colors.darkNavy, fontSize: '1rem' }}>Aaron Pacheco</strong> is a finance professional who specializes in streamlining inefficient paths from input and data processing to clear output and actionable insight. Across his career at Flight Centre, PwC, Aveo, and others, he's built financial models, dashboards, and systems that cut through the noise and eliminate laborious manual work. His focus: turning confusion into clarity so you can make better decisions faster. Through APP Coaching, he's now scaling that expertise—helping smart people close the gap between confusion and confidence.
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
                      <div
                        key={relatedPost.id}
                        onClick={() => {
                          setSelectedBlogPost(relatedPost.id);
                          window.location.hash = `blog/${generateSlug(relatedPost.title)}`;
                          window.scrollTo(0, 0);
                        }}
                        style={{
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
                            color: colors.limeGreen,
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
                      </div>
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
          background: `linear-gradient(135deg, rgba(31, 58, 125, 0.85) 0%, rgba(42, 79, 168, 0.85) 100%), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80')`,
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
            Here's where you'll find everything I've learned over 10+ years closing the gap between confusion and confidence. Real lessons from building Excel systems, using AI strategically, and growing financially and professionally. Tips, tricks, formulas, prompts—and the thinking behind them. As I continue learning and pushing, I'm sharing it all here.
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

            {/* Tag filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.darkNavy }}>
                Filter by Tag:
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
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
                <option value="">All Tags</option>
                <option value="Career Growth">Career Growth</option>
                <option value="Business Systems">Business Systems</option>
                <option value="Efficiency">Efficiency</option>
                <option value="AI Adoption">AI Adoption</option>
                <option value="Accounting">Accounting</option>
                <option value="Career Evolution">Career Evolution</option>
                <option value="Finance Skills">Finance Skills</option>
              </select>
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
                      const tagMatch = !selectedTag || selectedTag === '' || (Array.isArray(post.tags) && post.tags.some(tag => tag.trim() === selectedTag.trim()));
                      const searchMatch = blogSearchTerm === '' || post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(blogSearchTerm.toLowerCase());
                      return tagMatch && searchMatch;
                    })
                    .map((post) => (
                    <button key={post.id} onClick={() => {
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
                      <h3 style={{ fontSize: '1.4rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', lineHeight: '1.4' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: '0.95rem', color: colors.textMuted, marginBottom: '1rem', lineHeight: '1.6' }}>
                        {post.excerpt}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: colors.darkNavy, fontStyle: 'italic', fontWeight: '500' }}>
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </button>
                  ))}
                  {blogPosts.filter((post) => {
                    const tagMatch = selectedTag === '' || (post.tags && post.tags.includes(selectedTag));
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
                      const tagMatch = !selectedTag || selectedTag === '' || (Array.isArray(post.tags) && post.tags.some(tag => tag.trim() === selectedTag.trim()));
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
                          <h3 style={{ fontSize: '1.2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                            {snippet.title}
                          </h3>
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
                            <button
                              onClick={() => {
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
                                textAlign: 'center'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                            >
                              Read Full Post
                            </button>
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
                    const tagMatch = selectedTag === '' || (post.tags && post.tags.includes(selectedTag));
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
    <section style={{ padding: '3rem 2rem', background: 'white', borderTop: `1px solid ${colors.borderGray}` }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form method="POST" action="https://769edbac.sibforms.com/serve/MUIFAI68iMXllj39M23qWvg8WXTSI18vSaOLkcgq_FMHHqsKdxJyUM-hDTPk2VZoJECqpjMbOjchkBON3jNJid8LLLgUwQyECMmViX_L5G7qHjZxODx0ilAbRhxVaaJx-nggpmjDfbAQVMqHaPFQHNEkh5cSl3jRu2TCycbc9RnOpkwBXTL0enoMpvOloUurjV3i7kqBMPB6ItqRQA==" data-type="subscription">
          <div style={{ textAlign: 'left', background: `rgba(255, 255, 255, 1)`, border: `1px solid ${colors.borderGray}`, borderRadius: '8px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.darkNavy, fontFamily: "'Poppins', sans-serif", margin: '0 0 0.75rem 0', lineHeight: '1.3' }}>Subscribe to learn tips & follow my own learning journey!</h3>

            <p style={{ fontSize: '0.95rem', color: colors.textDark, lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>I share Excel tricks, financial tips (business + personal), and AI prompts I'm learning and applying across my day job, side hustles, and personal investments so I can build and grow fast! Real learnings from real work. Follow my progress!</p>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.darkNavy }} htmlFor="EMAIL">Email address</label>
              <input
                type="email"
                id="EMAIL"
                name="EMAIL"
                placeholder="your@email.com"
                required
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

            <button
              type="submit"
              style={{
                width: '100%',
                background: colors.limeGreen,
                color: colors.darkNavy,
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              SUBSCRIBE
            </button>
          </div>
        </form>
      </div>
    </section>
  );

  // ===== CONTACT/BOOKING PAGE =====
  const ContactPage = () => (
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
          Ready to move from confusion to clarity? Let's talk about your goals and build your path to self-sufficiency.
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
              Let's talk about where <span style={{ fontWeight: '600' }}>confusion is costing you</span> most—in your numbers, your tools, or your career. I'll help you see the path forward with <span style={{ fontWeight: '600' }}>clarity and confidence.</span>
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
              Build Your Path to Self-Sufficiency
            </h2>
            <form style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.darkNavy }}>
                  Your Name
                </label>
                <input type="text" placeholder="Aaron" style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.borderGray}`,
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontFamily: "'Inter', sans-serif"
                }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.darkNavy }}>
                  Email
                </label>
                <input type="email" placeholder="your@email.com" style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.borderGray}`,
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontFamily: "'Inter', sans-serif"
                }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.darkNavy }}>
                  Interested In
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.borderGray}`,
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: 'white'
                }}>
                  <option>Select a service...</option>
                  <option>Excel Coaching</option>
                  <option>Personal Finance</option>
                  <option>Business Finance</option>
                  <option>AI for Personal Use</option>
                  <option>AI for Business</option>
                  <option>Career Coaching</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.darkNavy }}>
                  Message
                </label>
                <textarea placeholder="Tell me about the confusion you're facing..." style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.borderGray}`,
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontFamily: "'Inter', sans-serif",
                  minHeight: '120px',
                  resize: 'vertical'
                }} />
              </div>

              <button type="submit" style={{
                background: colors.limeGreen,
                color: colors.darkNavy,
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif"
              }}>
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );

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
      <p>© 2026 AppCoaching. Enabling self-sufficiency through Excel, AI, and coaching.</p>
      <p style={{ fontSize: '0.8rem', opacity: '0.7', marginTop: '0.5rem' }}>
        Coaching • Excel • Finance • AI • Operations
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

      <EmailSignupSection />
      <Footer />

      {/* Floating "Get in Touch" CTA Button - Bottom Right */}
      <button onClick={() => navigateTo('contact')} style={{
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
        transition: 'all 0.3s ease'
      }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)'; }}>
        💬 Get in Touch
      </button>
    </div>
  );
}
