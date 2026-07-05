import React, { useState } from 'react';

export default function AppCoaching() {
  const [currentPage, setCurrentPage] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);

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
      description: '• Build your real financial picture\n• Budgeting that sticks\n• Cash flow clarity\n• Debt strategy that works\n• Know where every dollar goes',
      icon: '💰',
      cta: 'show me the money'
    },
    {
      id: 'finance-business',
      title: 'Business Finance Coaching',
      subtitle: 'Profit isn\'t complicated',
      description: '• Custom P&L dashboards\n• Cash flow strategy & forecasting\n• Margin optimization\n• Financial benchmarking\n• See what\'s really happening',
      icon: '📈',
      cta: 'reveal-profit()'
    },
    {
      id: 'ai-personal',
      title: 'AI for Personal Use',
      subtitle: 'AI without the hype',
      description: '• Master prompting workflows\n• Automate the boring stuff\n• Build tools that work for you\n• Save hours every week\n• No buzzwords, just results',
      icon: '🤖',
      cta: 'chat gpt me'
    },
    {
      id: 'ai-business',
      title: 'AI for Business',
      subtitle: 'The ROI is real',
      description: '• AI strategy & implementation\n• Workflow automation\n• Custom AI apps\n• Solve your actual problems\n• Not vendor problems',
      icon: '⚙️',
      cta: 'build-with-ai()'
    },
    {
      id: 'career',
      title: 'Career Coaching',
      subtitle: 'Your next move (free)',
      description: '• LinkedIn profile optimization\n• Interview prep & negotiation\n• Career navigation & strategy\n• Network building\n• FREE for engaged clients',
      icon: '🎯',
      cta: 'level-up()',
      isFree: true
    }
  ];

  // ===== COLOR PALETTE =====
  const colors = {
    darkNavy: '#1F3A7D',
    navy: '#2A4FA8',
    limeGreen: '#76D700',
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
    <nav style={{
      background: colors.darkNavy,
      padding: '1rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      fontFamily: "'Poppins', sans-serif",
      gap: '2rem'
    }}>
      <div onClick={() => setCurrentPage('home')} style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
        APP<span style={{ color: colors.limeGreen, fontSize: '1rem' }}>•</span>Coaching
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
        <span onClick={() => setCurrentPage('home')} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Home</span>
        <span onClick={() => setCurrentPage('services')} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Services</span>
        <span onClick={() => setCurrentPage('about')} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>About</span>
        <span onClick={() => setCurrentPage('blog')} style={{ color: 'white', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Blog</span>
        <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{ background: colors.limeGreen, color: colors.darkNavy, padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>BOOK A CALL</a>
      </div>
    </nav>
  );

  // ===== HOME PAGE =====
  const HomePage = () => (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 50%)`,
        color: 'white',
        padding: 'clamp(2rem, 5vh, 5rem) clamp(1rem, 4vw, 2rem)',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img src="/aaron-hero.jpg" alt="Aaron Pacheco" style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)', width: 'clamp(120px, 25vw, 220px)', height: 'clamp(120px, 25vw, 220px)', borderRadius: '12px', objectFit: 'cover' }} />

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

        <button onClick={() => setCurrentPage('contact')} style={{ background: colors.limeGreen, color: '#4a5568', border: 'none', padding: 'clamp(0.6rem, 2vh, 1rem) clamp(1rem, 4vw, 2.5rem)', fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontWeight: '700', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", whiteSpace: 'nowrap' }}>
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
              flex: 0 0 120px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0.5rem 1rem;
              background: white;
              border-radius: 8px;
              font-weight: 600;
              font-size: 0.85rem;
              color: ${colors.darkNavy};
            }
          `}</style>
          <div className="logo-carousel">
            <div className="logo-item">Deloitte</div>
            <div className="logo-item">EY</div>
            <div className="logo-item">PwC</div>
            <div className="logo-item">KPMG</div>
            <div className="logo-item">Big 4</div>
            <div className="logo-item">Deloitte</div>
            <div className="logo-item">EY</div>
            <div className="logo-item">PwC</div>
            <div className="logo-item">KPMG</div>
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
  const ServicesPage = () => (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`,
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
          Services
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.95', maxWidth: '700px', margin: '0 auto' }}>
          Six ways I can help you unlock your potential in Finance, Excel, AI, and Operations.
        </p>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1.5rem', background: `linear-gradient(135deg, rgba(59, 91, 219, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`, borderRadius: '12px', borderLeft: `4px solid ${colors.limeGreen}` }}>
          <p style={{ fontSize: '1.1rem', color: colors.darkNavy, fontStyle: 'italic', fontFamily: "'Outfit', sans-serif", fontWeight: '700', letterSpacing: '0.5px' }}>
            💡 Pick your play. We'll level up your game.
          </p>
        </div>

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
              {service.isFree && <div style={{ background: colors.limeGreen, color: colors.white, padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', display: 'inline-block', marginBottom: '1.5rem' }}>FREE</div>}
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
    </div>
  );

  // ===== ABOUT PAGE =====
  const AboutPage = () => (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`,
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
          About Me
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.95' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '2rem' }}>
            <div>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                I'm a qualified accountant with over a decade of experience in audit, finance operations, and strategic planning at major organizations across Australia. I started my career making Excel do impossible things—building financial models that told stories, dashboards that brought clarity to chaos, and systems that replaced manual work.
              </p>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                For years, Excel was my superpower. I knew it inside out. And I was proud of that.
              </p>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8' }}>
                Then AI happened. And everything changed.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="/aaron-story.jpg" alt="Aaron's story" style={{ width: '100%', height: '280px', borderRadius: '12px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* THE PROBLEM I REALIZED */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            The Problem I Realized
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="/aaron-problem.jpg" alt="The problem realized" style={{ width: '100%', height: '280px', borderRadius: '12px', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                As I started using AI, I realized something sobering: most people I knew—colleagues, friends, small business owners—were drowning in data. They had Excel spreadsheets, CRM systems, financial reports from their accountants, dashboards they didn't understand.
              </p>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
                But they couldn't extract insight. They were paralyzed by complexity. They couldn't answer simple questions: "Am I profitable?" "Where's my cash going?" "What does this pattern mean?" And they definitely couldn't imagine using AI to solve it.
              </p>
              <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8' }}>
                The real problem wasn't their data or their tools. It was that no one was translating complexity into clarity. No one was showing them how.
              </p>
            </div>
          </div>
        </div>

        {/* THE SOLUTIONS I FOUND */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            The Solutions I Found
          </h2>
          <p style={{ fontSize: '1.1rem', color: colors.textMuted, textAlign: 'center', marginBottom: '3rem', fontStyle: 'italic' }}>
            I realized I could be that translator. I could bridge the gap between data and understanding.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Enable Skills
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.9 }}>
                Teach people Excel and AI so they become self-sufficient, not dependent on me forever.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Build Dashboards
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.9 }}>
                Create dashboards and systems that turn messy data into clear, actionable insights.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Implement AI
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.9 }}>
                Use AI to automate analysis and uncover patterns humans would miss.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', textAlign: 'center', marginBottom: '2rem' }}>
            I'm not your guru. <span style={{ color: colors.limeGreen, fontWeight: '700' }}>I'm your translator.</span> I make your numbers tell your story—so you can make confident decisions. And I do it without the corporate jargon, the ego, or the premium price tag.
          </p>
        </div>

        {/* WHY APP COACHING STANDS OUT */}
        <div style={{ marginBottom: '4rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2.2rem', color: colors.darkNavy, marginBottom: '2rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            Why APP Coaching Stands Out
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ background: `linear-gradient(135deg, ${colors.limeGreen} 0%, ${colors.mediumGreen} 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Real Experience
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                10+ years in real organizations. Not theory. I've built systems at scale, debugged broken dashboards, and coached teams through complexity.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${colors.limeGreen} 0%, ${colors.mediumGreen} 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Practical Focus
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Every recommendation is tested. No buzzwords. No fluff. Just what actually works in the real world.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${colors.limeGreen} 0%, ${colors.mediumGreen} 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Your Success, Not My Ego
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                I succeed when you become self-sufficient. Not when you depend on me. My goal is to work myself out of a job with you.
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${colors.limeGreen} 0%, ${colors.mediumGreen} 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}`, textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                Accessible Pricing
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
          <button onClick={() => setCurrentPage('contact')} style={{
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
  const BlogPage = () => (
    <div>
      <style>{styles}</style>
      <section style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`,
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
          Blog & Resources
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.95' }}>
          Articles on Excel, Finance, AI, and career growth—from Gram & friends.
        </p>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1.5rem', background: `linear-gradient(135deg, rgba(59, 91, 219, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`, borderRadius: '12px', borderLeft: `4px solid ${colors.limeGreen}` }}>
          <p style={{ fontSize: '1.1rem', color: colors.darkNavy, fontStyle: 'italic', fontFamily: "'Outfit', sans-serif", fontWeight: '700', letterSpacing: '0.5px' }}>
            📚 Thoughts on Excel, Finance, AI—and why your spreadsheet isn't the problem.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {[
            { title: 'Excel Formulas That Changed My Life', date: 'Coming soon', topic: 'Excel', slug: '#' },
            { title: 'Understanding Your P&L: A Founder\'s Guide', date: 'Coming soon', topic: 'Finance', slug: '#' },
            { title: 'AI Agents Are Changing Business Operations', date: 'Coming soon', topic: 'AI', slug: '#' }
          ].map((post, idx) => (
            <a key={idx} href={post.slug} style={{
              background: 'white',
              border: `1px solid ${colors.borderGray}`,
              borderRadius: '12px',
              padding: '2rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'block',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.limeGreen; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 255, 65, 0.15)`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.borderGray; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}>
              <div style={{ fontSize: '0.8rem', color: colors.limeGreen, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                {post.topic}
              </div>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700', lineHeight: '1.4' }}>
                {post.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted }}>
                {post.date}
              </p>
            </a>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center', paddingTop: '2rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <p style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '1.5rem' }}>
            New posts coming soon. Subscribe for updates.
          </p>
          <button onClick={() => setCurrentPage('contact')} style={{
            background: colors.limeGreen,
            color: colors.darkNavy,
            border: 'none',
            padding: '0.85rem 2rem',
            borderRadius: '6px',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif"
          }}>
            GET IN TOUCH
          </button>
        </div>
      </section>
    </div>
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

      <Footer />

      {/* Floating "Get in Touch" CTA Button - Bottom Right */}
      <button onClick={() => setCurrentPage('contact')} style={{
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
      }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 65, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 255, 65, 0.3)'; }}>
        💬 Get in Touch
      </button>
    </div>
  );
}
