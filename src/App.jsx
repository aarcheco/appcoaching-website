import React, { useState, useEffect } from 'react';

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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [blogViewMode, setBlogViewMode] = useState('post');
  const [blogSnippetType, setBlogSnippetType] = useState('');
  const [blogSearchTerm, setBlogSearchTerm] = useState('');

  // Helper function to generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // ===== URL ROUTING (hash-based) =====
  useEffect(() => {
    // Handle initial page load from URL hash
    const path = window.location.hash.slice(1) || 'home';
    const pathParts = path.split('/');
    const pageName = pathParts[0];
    const postSlug = pathParts[1];

    if (['home', 'services', 'about', 'blog', 'contact'].includes(pageName)) {
      setCurrentPage(pageName);

      // If viewing a specific blog post by slug
      if (pageName === 'blog' && postSlug && blogPosts.length > 0) {
        const post = blogPosts.find(p => generateSlug(p.title) === postSlug);
        if (post) setSelectedBlogPost(post.id);
      }
    }

    // Listen for hash changes (back/forward buttons)
    const handleHashChange = () => {
      const newPath = window.location.hash.slice(1) || 'home';
      const newPathParts = newPath.split('/');
      const newPageName = newPathParts[0];
      const newPostSlug = newPathParts[1];

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

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [blogPosts]);

  // ===== BLOG SYSTEM =====
  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Helper function to navigate to a page and update URL
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const loadBlogPosts = async () => {
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
            date: item.date,
            excerpt: item.excerpt,
            heroImage: item.heroImage,
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
  };

  const vennSections = {
    finance: {
      title: 'Finance Coaching',
      details: '• Personal & business finance strategy\n• Profit margins, pricing, P&L optimization\n• Cash flow clarity & debt paydown plans\n• Financial benchmarking & analysis\n• Decision-making from your numbers'
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
      details: '• Process automation & optimization\n• CRM integration & data management\n• Workflow streamlining & task automation\n• Operational dashboards\n• Systems thinking & efficiency'
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
    { name: 'PwC', logo: 'https://www.pwc.com/content/dam/pwc/pwccom/en/assets/images/pwc-logo.svg' },
    { name: 'Flight Centre', logo: 'https://flightcentre.com.au/content/dam/fcg/au/images/logo-flight-centre.svg' },
    { name: 'Coronis Group', logo: 'https://www.coronis.com.au/images/logo.svg' },
    { name: 'RACQ', logo: 'https://www.racq.com.au/-/media/project/racq/shared/logo/racq-logo-primary-blue.svg' },
    { name: 'Telstra', logo: 'https://www.telstra.com.au/content/dam/tcom/logo-telstra.svg' },
    { name: 'Aveo Group', logo: 'https://www.aveogroup.com.au/assets/images/aveo-group-logo.svg' },
    { name: 'YourTown', logo: 'https://www.yourtown.com.au/images/logo.svg' },
    { name: 'Tradies Success', logo: 'https://tradiessuccessacademy.com/images/logo.svg' }
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

    input, textarea, select {
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: ${colors.limeGreen};
      box-shadow: 0 0 0 3px rgba(0, 255, 65, 0.1);
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
          I thought I understood my numbers through Xero. Until I connected AI to extract and analyze what was really happening. I thought Excel dashboards told the whole story. Until I realized what AI could reveal. I thought my CRM data was surface-level until I pulled it into Excel and actually dug deep.
          <br /><br />
          That's when I saw it: Finance, Excel, AI, Operations—each powerful alone, but together? They unlock potential you didn't know existed.
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
        background: `linear-gradient(135deg, rgba(20, 35, 80, 0.75) 0%, rgba(25, 50, 120, 0.75) 50%), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80')`,
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
          Stop Pretending You Understand Your Numbers.
        </h1>

        <p style={{ fontSize: 'clamp(0.95rem, 3vw, 1.2rem)', maxWidth: '900px', margin: '0 auto clamp(1rem, 2vh, 2rem)', lineHeight: '1.8', opacity: '0.95', fontFamily: "'Inter', sans-serif" }}>
          <span style={{ color: colors.limeGreen, fontWeight: '700' }}>Business owner?</span> Your P&L, balance sheet, Xero reports—you nod like you get it. You don't. You can't spot cash leaks or know if you're actually profitable. In plain English: flying blind.
          <br />
          <br />
          <span style={{ color: colors.limeGreen, fontWeight: '700' }}>Young professional?</span> Excel models shouldn't take hours. Data analysis shouldn't be painful. With basic Excel + AI, you extract insights in seconds, build dashboards that impress, and feel confident with numbers.
          <br />
          <br />
          <span style={{ color: colors.limeGreen, fontWeight: '700' }}>I empower you.</span> I give you Excel skills, AI knowledge, and the guidance to become self-sufficient. You go from confusion to confidence. You understand your data. You make better decisions.
        </p>

        <button onClick={() => navigateTo('contact')} style={{ background: colors.limeGreen, color: '#4a5568', border: 'none', padding: 'clamp(0.6rem, 2vh, 1rem) clamp(1rem, 4vw, 2.5rem)', fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontWeight: '700', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", whiteSpace: 'nowrap' }}>
          BOOK A CALL →
        </button>
      </section>

      <VennDiagram />

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
          I'm a qualified accountant with 10+ years of real-world experience in finance, operations, and strategic planning. I've built financial models, designed dashboards, and helped teams extract insight from data. But more than that, I'm passionate about something specific: closing the knowledge gap. When I work with you, my goal isn't to be your permanent crutch—it's to empower you with the skills, tools, and confidence to understand your own data and make decisions independently. The reward for me is seeing that moment when it clicks for you. When you realize you CAN read your P&L, you CAN build a dashboard, you CAN prompt AI to analyze your data. That's when I know I've succeeded. Not because you're dependent on me, but because you're self-sufficient.
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
              animation: scrollLogos 30s linear infinite;
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
            {[...employers, employers[0]].map((employer, idx) => (
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
          background: `linear-gradient(135deg, rgba(31, 58, 125, 0.7) 0%, rgba(42, 79, 168, 0.7) 100%), url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: 'clamp(2rem, 5vh, 5rem) clamp(1rem, 4vw, 2rem)',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
            Services
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: '0.95', maxWidth: '700px', margin: '0 auto' }}>
            I'm here to turn your confusion into confidence. Whether you're struggling with Excel, drowning in numbers, or overwhelmed by AI—I meet you where you are, explain it like we're mates over coffee, and walk you through it until it clicks. No jargon. No rushing. Just real coaching.
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
              background: `linear-gradient(135deg, #00FF00 0%, rgba(255, 255, 255, 0.9) 100%)`,
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
          fontSize: '1.1rem',
          color: colors.textMuted,
          marginBottom: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto 1.5rem',
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          One-on-one coaching starting at under $100 per session, up to under $200 depending on the service.
        </p>
        <p style={{
          fontSize: '1rem',
          color: colors.textMuted,
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Traditional business coaching runs $300–$500+ per session. I can charge less because I genuinely love closing knowledge gaps and seeing that lightbulb moment where someone realizes how much time they'll save. That fulfillment is worth more to me than the extra margin.
        </p>
      </section>
    </div>
    );
  };

  // ===== ABOUT PAGE =====
  const AboutPage = () => (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, rgba(31, 58, 125, 0.7) 0%, rgba(42, 79, 168, 0.7) 100%), url('/aaron-headshot-professional.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: 'clamp(2rem, 5vh, 5rem) clamp(1rem, 4vw, 2rem)',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
          About Me
        </h1>
        <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', opacity: '0.95', maxWidth: '700px' }}>
          Qualified accountant. Excel expert. AI adoption coach. Real problems. Real solutions.
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
            <div>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Who I Am Beyond Work
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                I'm a Brisbane lad through and through. Born and raised here, and I breathe this city. But more than anything, I breathe soccer. I've been playing since I was 6—loyal to my local club (we won the league title once in division 7, and honestly? One of my greatest achievements). I also manage a social futsal team where I get together with mates every week. It's how I stay fit, stay sane, and stay connected. My football heroes are Cristiano Ronaldo, Everton, Real Madrid, Portugal. And of course, Brisbane Roar.
              </p>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Off the pitch, I'm a maker. I love making music. I love traveling the world with my wife, discovering new restaurants, experiencing new things, catching great films. We're planning for parenthood, which honestly puts everything into perspective. Life's short. We've got one shot at this. So we should take ourselves and our potential as far as we can go.
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
            <div style={{ textAlign: 'center' }}>
              <img src="/aaron-archive-2.jpg" alt="Aaron's story" style={{ width: '100%', height: '350px', borderRadius: '12px', objectFit: 'cover' }} />
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <img src="/aaron-headshot-casual-1.jpg" alt="Aaron casual" style={{ width: '100%', height: '250px', borderRadius: '8px', objectFit: 'cover' }} />
            <img src="/aaron-headshot-casual-2.jpg" alt="Aaron candid" style={{ width: '100%', height: '250px', borderRadius: '8px', objectFit: 'cover' }} />
            <img src="/aaron-action-outdoor.jpg" alt="Aaron outdoors" style={{ width: '100%', height: '250px', borderRadius: '8px', objectFit: 'cover' }} />
            <img src="/aaron-headshot-casual-3.jpg" alt="Aaron moment" style={{ width: '100%', height: '250px', borderRadius: '8px', objectFit: 'cover' }} />
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
            <div style={{ background: colors.offWhite, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
              <h3 style={{ fontSize: '1.1rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Flight Centre Travel Group
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '1rem', fontStyle: 'italic' }}>
                Accountant & Team Leader
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Found outdated Excel models everywhere. Broken VBA code. Manual data entry everywhere. I rebuilt countless workbooks from the ground up—making them lean, streamlined, formula-driven. Saved employees hours every single day. Those models? Still being used today. That's compound time savings. That's impact.
              </p>
            </div>

            <div style={{ background: colors.offWhite, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
              <h3 style={{ fontSize: '1.1rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Coronis Group
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '1rem', fontStyle: 'italic' }}>
                Accountant
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Their finance was drowning in paper. No automation. No insight for leadership. I ripped it out. Implemented paperless processes. Built insightful reporting that actually meant something to the CFO and CEO. 40% efficiency gain in finance operations. That freed up capacity for people to do value-add work. That's the math that matters.
              </p>
            </div>

            <div style={{ background: colors.offWhite, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
              <h3 style={{ fontSize: '1.1rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Telstra
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '1rem', fontStyle: 'italic' }}>
                Finance Analyst
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Presented to 70+ junior accountants. Topic? How to actually communicate with senior leaders. Finance pros speak their own language—jargon, complexity, numbers nobody gets. I learned that translating insight into plain English is a superpower. It's the difference between a number and a decision. This is the art I'm still mastering.
              </p>
            </div>

            <div style={{ background: colors.offWhite, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
              <h3 style={{ fontSize: '1.1rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Aveo Group
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '1rem', fontStyle: 'italic' }}>
                Commercial Analyst
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Processes loaded with manual data entry. Took hours. Every week. I automated it with PowerQuery and Excel. Saved a colleague 16 hours per week. Also built a dashboard that exposed staff utilization across sites—nurses, domestic attendants. Suddenly leadership could see where capacity was bleeding. Better decisions. Better profitability. Time is money.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: colors.textMuted, textAlign: 'center', marginTop: '2rem', lineHeight: '1.8' }}>
            <strong>The pattern?</strong> Someone invests time to understand a broken system. They fix it. They document it. Then they walk away and the time savings compound forever. That's leverage. That's what I'm here to help you build.
          </p>
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
                Inefficiency Everywhere
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Across every organization I worked in, the same pattern emerged: <strong>inefficiency from data/process to insight/output.</strong> People had data. Systems worked. But turning that into clear, actionable insight? That took forever. Manual spreadsheets. Repetitive data entry. Dashboards nobody understood. Reports that took days to build.
              </p>
              <h3 style={{ fontSize: '1.2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', marginTop: '1.5rem' }}>
                The Finance Industry's Dirty Secret
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                The finance space is stubborn—set in its ways. "That's just how it's done." But here's the thing: with Excel and AI, we can streamline this. We can expose insights more efficiently. We can set up foundational processes and knowledge NOW to close the knowledge gap and reduce manual handling NOW. The time saved compounds over time.
              </p>
              <h3 style={{ fontSize: '1.2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', marginTop: '1.5rem' }}>
                But There's a Bigger Enemy: Fear
              </h3>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8' }}>
                Fear of change. Fear of the unknown. Fear that new tools won't work. This fear <strong>holds us back.</strong> People don't realize the HUGE benefit of spending time thinking about a process BEFORE rolling it out—so it's streamlined from day one. Instead, we patch broken systems forever. And that's a massive waste.
              </p>
            </div>
          </div>
        </div>

        {/* THE COACHING I OFFER */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            The Coaching I Offer
          </h2>

          <div style={{ marginBottom: '3rem', background: colors.offWhite, padding: '2rem', borderRadius: '12px' }}>
            <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Here's the truth I discovered: <strong>time invested upfront in understanding a process, tool, or system saves you HOURS and MONTHS later.</strong>
            </p>
            <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
              You spend time NOW rebuilding that Excel model properly. You spend time NOW automating that manual process. You spend time NOW thinking about how to present data simply. And then? That investment compounds forever. Every single day after, you save time. That's leverage.
            </p>
            <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Now add AI to the equation. AI takes this to another level entirely. You can process MORE data, faster. You can extract insights you didn't know existed. You can automate things you thought were impossible. But only if you understand the fundamentals—the processes, the tools, the systems. AI is the accelerant. Understanding is the fuel.
            </p>
            <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8' }}>
              That's what I teach. That's what I help you build. Time invested now. Benefits compounding forever.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ background: `linear-gradient(135deg, rgba(200, 220, 255, 0.7) 0%, rgba(220, 235, 255, 0.9) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: colors.darkNavy, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💰</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Finance Coaching
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Personal or business—understand your numbers. Your P&L, cash flow, profitability. Make decisions from clarity, not guessing.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, rgba(200, 220, 255, 0.7) 0%, rgba(220, 235, 255, 0.9) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: colors.darkNavy, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Excel & AI Coaching
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Build systems that work for you. Automate the boring stuff. Process data smarter. Save time. Every single day.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, rgba(200, 220, 255, 0.7) 0%, rgba(220, 235, 255, 0.9) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: colors.darkNavy, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Career Coaching
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Stand out. Build skills that matter. Advance your career. Be real about where you're at and where you want to go.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', textAlign: 'center', marginBottom: '2rem' }}>
            I'm not your guru. <span style={{ color: colors.limeGreen, fontWeight: '700' }}>I'm your translator.</span> I make your numbers tell your story—so you can make confident decisions. And I do it without the corporate jargon, the ego, or the premium price tag.
          </p>
        </div>

        {/* WHY IT'S CALLED APP COACHING */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}`, background: colors.offWhite, padding: '3rem 2rem', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '2rem', color: colors.darkNavy, marginBottom: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            Why It's Called "APP Coaching"
          </h2>
          <p style={{ fontSize: '1.05rem', color: colors.textMuted, lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>
            "APP" stands for <strong>Aaron Paul Pacheco</strong>—that's me. But it's really about more than apps.
            <br /><br />
            <strong>It's about accepting new technology.</strong> Challenging whether it can really advantage your business or personal life. Apps are the new thing I'm learning and teaching right now, but the principle is bigger: staying curious. Understanding tools. Asking "how can this help me?"
            <br /><br />
            <strong>Ignorance is a disadvantage.</strong> The people crushing it? They're not afraid of new tools. They learn them. They ask questions. They experiment. Meanwhile, others sit on the sidelines, waiting for the "perfect moment" to upskill.
            <br /><br />
            <strong>APP Coaching represents my belief to continue learning new tech and understand how they help—not just be noise at the dinner table.</strong> I'm here to guide you through that. To show you that the tools you're intimidated by? They're actually tools you can master. And when you do, everything changes.
          </p>
        </div>

        {/* WHY APP COACHING STANDS OUT */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            Why APP Coaching Stands Out
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: `linear-gradient(135deg, rgba(200, 220, 255, 0.7) 0%, rgba(220, 235, 255, 0.9) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: colors.darkNavy, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                💼 Real Experience
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                10+ years in real organizations. Not theory. I've built systems at scale, debugged broken dashboards, and coached teams through complexity.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, rgba(200, 220, 255, 0.7) 0%, rgba(220, 235, 255, 0.9) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: colors.darkNavy, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                🎯 Practical Focus
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Every recommendation is tested. No buzzwords. No fluff. Just what actually works in the real world.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, rgba(200, 220, 255, 0.7) 0%, rgba(220, 235, 255, 0.9) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: colors.darkNavy, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                🚀 Your Success, Not My Ego
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                I succeed when you become self-sufficient. Not when you depend on me. My goal is to work myself out of a job with you.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, rgba(200, 220, 255, 0.7) 0%, rgba(220, 235, 255, 0.9) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: colors.darkNavy, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                💰 Accessible Pricing
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Expert guidance at a fraction of what premium coaches charge. Same quality. Better accessibility.
              </p>
            </div>
          </div>
        </div>


        {/* CTA */}
        <div style={{ marginTop: '3rem', textAlign: 'center', paddingTop: '2rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <p style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '1.5rem' }}>
            Let's translate your numbers into action.
          </p>
          <button onClick={() => navigateTo('contact')} style={{
            background: colors.limeGreen,
            color: colors.darkNavy,
            border: 'none',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '700',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif"
          }}>
            LET'S WORK TOGETHER →
          </button>
        </div>
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
              <p style={{
                fontSize: '1rem',
                color: colors.textMuted,
                margin: 0
              }}>
                {formatDate(post.date)}
              </p>
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
                    <strong style={{ color: colors.darkNavy, fontSize: '1rem' }}>Aaron Pacheco</strong> is a finance analyst and AI coach who helps founders and professionals master Excel, finance strategy, and AI adoption. Over his career across leading Australian organizations (including Flight Centre, PwC, and Aveo), he's built financial models, dashboards, and systems that drive better business decisions. Now he's scaling that expertise through APP Coaching—helping smart people work smarter, not harder.
                  </p>
                  <p style={{
                    margin: '0',
                    fontSize: '0.9rem',
                    color: colors.textMuted,
                    fontStyle: 'italic'
                  }}>
                    🎯 Finance • Excel • AI • Career growth
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      );
    }

    // Blog list view
    return (
      <div>
        <style>{styles}</style>
        <section style={{
          background: `linear-gradient(135deg, rgba(31, 58, 125, 0.7) 0%, rgba(42, 79, 168, 0.7) 100%), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: 'clamp(2rem, 5vh, 5rem) clamp(1rem, 4vw, 2rem)',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
            Blog
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', opacity: '0.95', maxWidth: '700px' }}>
            My digital garden of Excel hacks, AI experiments, and career lessons learned the hard way. Free space to share learnings, tips & tricks, formulas that actually work, AI prompts & use cases, and real teachings.
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

            {/* Category filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.darkNavy }}>
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                <option value="">All Categories</option>
                <option value="Accounting & Finance Career">Accounting & Finance Career</option>
                <option value="Business Finance">Business Finance</option>
                <option value="Personal Finance">Personal Finance</option>
                <option value="Excel">Excel</option>
                <option value="AI">AI</option>
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <input
              type="text"
              placeholder="Search by keyword..."
              value={blogSearchTerm}
              onChange={(e) => setBlogSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.95rem',
                borderRadius: '6px',
                border: `1px solid ${colors.borderGray}`,
                fontFamily: "'Inter', sans-serif",
                boxSizing: 'border-box'
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
                      const categoryMatch = selectedCategory === '' || (post.categories && post.categories.includes(selectedCategory));
                      const searchMatch = blogSearchTerm === '' || post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(blogSearchTerm.toLowerCase());
                      return categoryMatch && searchMatch;
                    })
                    .map((post) => (
                    <button key={post.id} onClick={() => {
                      const slug = generateSlug(post.title);
                      window.location.hash = `blog/${slug}`;
                      setSelectedBlogPost(post.id);
                    }} style={{
                      background: 'white',
                      border: `1px solid ${colors.borderGray}`,
                      borderRadius: '12px',
                      padding: '2rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'block',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      textAlign: 'left',
                      width: '100%'
                    }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.limeGreen; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 255, 65, 0.15)`; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.borderGray; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '1rem' }}>
                        <div style={{ fontSize: '1.2rem', color: 'white', fontWeight: '700', background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.limeGreen} 100%)`, width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {post.id}
                        </div>
                        {post.categories && post.categories.length > 0 && (
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            {post.categories.slice(0, 2).map((cat, idx) => (
                              <span key={idx} style={{
                                background: `linear-gradient(135deg, rgba(42, 79, 168, 0.1) 0%, rgba(118, 215, 0, 0.1) 100%)`,
                                border: `1px solid ${colors.navy}`,
                                color: colors.navy,
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                padding: '0.35rem 0.6rem',
                                borderRadius: '16px',
                                whiteSpace: 'nowrap'
                              }}>
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}
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
                    const categoryMatch = selectedCategory === '' || (post.categories && post.categories.includes(selectedCategory));
                    const searchMatch = blogSearchTerm === '' || post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(blogSearchTerm.toLowerCase());
                    return categoryMatch && searchMatch;
                  }).length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                      <p style={{ color: colors.textMuted }}>No posts match your filters. Try adjusting your search.</p>
                    </div>
                  )}
                </div>
              )}

              {/* SNIPPET VIEW */}
              {blogViewMode === 'snippet' && (
                <div style={{ textAlign: 'center', padding: '3rem 2rem', color: colors.textMuted }}>
                  <p style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                    Snippet view coming soon! Each blog post will include PAUL's LevelUp, Prompts, or Formulas that you can browse and jump to the full post.
                  </p>
                  <p style={{ fontSize: '0.9rem', marginTop: '1rem', fontStyle: 'italic' }}>
                    For now, use the Post view to explore all articles.
                  </p>
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
          Ready to unlock your potential? Book a discovery call or get in touch.
        </p>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: colors.darkNavy, marginBottom: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
              Discovery Call
            </h2>
            <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '2rem' }}>
              Let's talk about your goals, challenges, and how we can work together. No pressure, just an honest conversation about what's possible.
            </p>
            <div style={{
              background: 'white',
              border: `2px solid ${colors.limeGreen}`,
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.9rem', color: colors.textMuted, marginBottom: '1rem' }}>
                📅 <strong>15 minutes</strong> • FREE • All segments welcome
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
              Get in Touch
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
                <textarea placeholder="Tell me about your situation..." style={{
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
