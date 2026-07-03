import React, { useState } from 'react';

export default function AppCoaching() {
  const [currentPage, setCurrentPage] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);

  const vennSections = {
    finance: {
      title: 'Finance Coaching',
      details: 'Personal & business finance. Profit margins, pricing, P&L, cash flow, debt paydown.'
    },
    excel: {
      title: 'Excel Coaching',
      details: 'Data analysis, bespoke modeling, dashboards. How AI reads and outputs Excel.'
    },
    ai: {
      title: 'AI Coaching',
      details: 'Master prompting. Agentic AI. Build custom apps—solo or co-build with you.'
    },
    operations: {
      title: 'Operations & Workflow',
      details: 'Process automation, CRM integration, workflow streamlining, task automation.'
    },
    financeExcel: {
      title: 'Finance + Excel',
      details: 'Financial models, budgets, forecasting, analysis. Tools to understand your numbers.'
    },
    financeAI: {
      title: 'Finance + AI',
      details: 'AI-powered financial insights, automated analysis, faster decision-making.'
    },
    excelAI: {
      title: 'Excel + AI',
      details: 'AI enhancing Excel workflows, intelligent data processing, next-level analysis.'
    },
    financeOps: {
      title: 'Finance + Operations',
      details: 'Profitability through efficiency. Cost control, utilization, margin optimization.'
    },
    excelOps: {
      title: 'Excel + Operations',
      details: 'Process dashboards, workflow metrics, data-driven operations management.'
    },
    aiOps: {
      title: 'AI + Operations',
      details: 'Automation, workflow intelligence, AI-powered process optimization.'
    },
    center: {
      title: 'Unlock Hidden Potential',
      details: 'Where all four converge. Custom solutions combining Finance, Excel, AI, and Operations.'
    }
  };

  // ===== SERVICE SEGMENTS =====
  const services = [
    {
      id: 'excel',
      title: 'Excel Learners',
      subtitle: 'No more VLOOKUP anxiety',
      description: 'Master formulas, pivot tables, dashboards. Stop using Excel like a typewriter—start using it like the superpower it is. From "=SUM(A1:A2)" to custom dashboards that tell your story.',
      icon: '📊'
    },
    {
      id: 'finance-personal',
      title: 'Personal Finance Coaching',
      subtitle: 'Your money, decoded',
      description: 'Stop guessing. Build your real financial picture: budgeting that sticks, cash flow clarity, debt strategy that works. Know where every dollar goes and why.',
      icon: '💰'
    },
    {
      id: 'finance-business',
      title: 'Business Finance Coaching',
      subtitle: 'Profit isn\'t complicated',
      description: 'Custom P&L dashboards, cash flow strategy, margin optimization. See what\'s really happening in your business—not just what Xero shows.',
      icon: '📈'
    },
    {
      id: 'ai-personal',
      title: 'AI for Personal Use',
      subtitle: 'AI without the AI-hype',
      description: 'Master prompting, automate the boring stuff, build tools that actually work for you. Use AI to save hours every week—without the buzzwords.',
      icon: '🤖'
    },
    {
      id: 'ai-business',
      title: 'AI for Business',
      subtitle: 'The ROI is real',
      description: 'AI strategy, workflow automation, custom AI apps. Solve your actual problems—not the problems AI vendors want you to have.',
      icon: '⚙️'
    },
    {
      id: 'career',
      title: 'Career Coaching',
      subtitle: 'Your next move (on us)',
      description: 'LinkedIn makeover, interview prep, career navigation. FREE for engaged clients—because building your network matters.',
      icon: '🎯',
      isFree: true
    }
  ];

  // ===== COLOR PALETTE =====
  const colors = {
    darkNavy: '#1F3A7D',
    navy: '#2A4FA8',
    limeGreen: '#00FF41',
    warmYellow: '#FFD93D',
    mediumGreen: '#10B981',
    charcoal: '#2D3748',
    offWhite: '#F7F9FC',
    lightGray: '#f3f4f6',
    borderGray: '#e5e7eb',
    textDark: '#1a1a1a',
    textMuted: '#666'
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
        fontSize: '2.2rem',
        color: colors.darkNavy,
        marginBottom: '2rem',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '800'
      }}>
        Where the Potential Unlocks
      </h2>

      <p style={{ fontSize: '0.95rem', color: colors.textMuted, marginBottom: '2rem' }}>
        Hover over any section to explore
      </p>

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
          <rect x="350" y="280" width="200" height="80" fill="white" stroke={colors.limeGreen} strokeWidth={hoveredSection === 'center' ? '3' : '2'} rx="8" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={() => setHoveredSection('center')} onMouseLeave={() => setHoveredSection(null)} opacity={hoveredSection === 'center' ? '1' : '0.9'} />
          <text x="450" y="310" fontSize="16" fontWeight="700" fill={colors.darkNavy} fontFamily="'Poppins', sans-serif" textAnchor="middle" style={{ pointerEvents: 'none' }}>Unlock Hidden</text>
          <text x="450" y="335" fontSize="16" fontWeight="700" fill={colors.darkNavy} fontFamily="'Poppins', sans-serif" textAnchor="middle" style={{ pointerEvents: 'none' }}>Potential</text>
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
          animation: 'fadeIn 0.3s ease'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            color: colors.darkNavy,
            marginBottom: '0.5rem',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '700'
          }}>
            {vennSections[hoveredSection].title}
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: colors.textMuted,
            lineHeight: '1.6',
            margin: 0
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
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div onClick={() => setCurrentPage('home')} style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        APP<span style={{ color: colors.limeGreen, fontSize: '1.3rem' }}>•</span>Coaching
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <span onClick={() => setCurrentPage('services')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Services</span>
        <span onClick={() => setCurrentPage('about')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>About</span>
        <span onClick={() => setCurrentPage('blog')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Blog</span>
        <a href="https://cal.com/app-coaching-xcgvda" target="_blank" rel="noopener noreferrer" style={{ background: colors.limeGreen, color: colors.darkNavy, padding: '0.75rem 1.5rem', borderRadius: '6px', border: 'none', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", textDecoration: 'none', display: 'inline-block' }}>BOOK A CALL</a>
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
        padding: '5rem 2rem',
        textAlign: 'center',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ marginBottom: '2rem', width: '220px', height: '220px', background: `linear-gradient(135deg, rgba(0, 255, 65, 0.2) 0%, rgba(255, 217, 61, 0.2) 100%)`, border: `2px dashed ${colors.limeGreen}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.navy, fontWeight: '600', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
          Your photo here
        </div>

        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2', fontWeight: '800', fontFamily: "'Poppins', sans-serif", maxWidth: '900px' }}>
          Coaching Plus Something Better:<br />
          <span style={{ color: colors.limeGreen }}>A Study Buddy.</span>
        </h1>

        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: '1.8', opacity: '0.95', fontFamily: "'Inter', sans-serif" }}>
          Most coaches outline options, teach you some theory and leave you to figure it out. I can take it one step further and develop and co-build solutions that help with your specific Finance, Excel, AI, operations challenges—whether <span style={{ color: colors.limeGreen, fontWeight: '700' }}>business</span> or <span style={{ color: colors.warmYellow, fontWeight: '700' }}>personal</span>.
          <br />
          <br />
          Listening to your real problems helps me learn which will ultimately help you learn through my guidance and partnership. Think of it as <span style={{ color: colors.limeGreen, fontWeight: '700' }}>co-learning</span>—or a friendly <span style={{ color: colors.limeGreen, fontWeight: '700' }}>study buddy</span> who's genuinely invested in your growth at a fraction of what premium coaching rates would cost.
        </p>

        <button onClick={() => setCurrentPage('contact')} style={{ background: colors.limeGreen, color: colors.darkNavy, border: 'none', padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: '700', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>
          BOOK A CALL →
        </button>
      </section>

      <VennDiagram />

      <section style={{ padding: '3rem 2rem', textAlign: 'center', background: colors.offWhite }}>
        <p style={{ color: colors.textMuted, fontSize: '1rem' }}>
          ✅ Step 2 Complete: Venn Diagram + How It All Connects Section
        </p>
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
              <div style={{ width: '100px', height: '100px', background: `linear-gradient(135deg, ${colors.limeGreen} 0%, ${colors.warmYellow} 100%)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.4rem', color: colors.darkNavy, marginBottom: '0.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: colors.charcoal, fontWeight: '600', marginBottom: '1rem', fontFamily: "'Poppins', sans-serif" }}>
                {service.subtitle}
              </p>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {service.description}
              </p>
              {service.isFree && <div style={{ background: colors.limeGreen, color: colors.darkNavy, padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', display: 'inline-block', marginBottom: '1.5rem' }}>FREE</div>}
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
                BOOK A CALL
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
          About Aaron
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.95' }}>
          Qualified accountant. Excel expert. AI adoption coach.
        </p>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: colors.offWhite,
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem', alignItems: 'start' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '200px', height: '200px', background: `linear-gradient(135deg, rgba(0, 255, 65, 0.2) 0%, rgba(255, 217, 61, 0.2) 100%)`, border: `2px dashed ${colors.limeGreen}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.navy, fontWeight: '600', fontSize: '0.85rem', textAlign: 'center', padding: '1rem', margin: '0 auto' }}>
              Photo placeholder
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '2rem', color: colors.darkNavy, marginBottom: '1.5rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800' }}>
              The Journey
            </h2>
            <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
              I'm a qualified accountant with years of experience in audit, finance operations, and strategic planning at major organizations across Australia. Excel was my superpower—I could build financial models that made numbers tell their story.
            </p>
            <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Then AI happened. And it changed everything.
            </p>
            <p style={{ fontSize: '1rem', color: colors.textMuted, lineHeight: '1.8' }}>
              I realized the real opportunity wasn't defending Excel—it was helping people understand how AI can do things Excel traditionally did, faster. But also how to build custom tools with AI that replace entire workflows. That's when AppCoaching was born.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: `2px solid ${colors.borderGray}` }}>
          <h2 style={{ fontSize: '2rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '800', textAlign: 'center' }}>
            Philosophy
          </h2>
          <p style={{ fontSize: '0.95rem', color: colors.textMuted, textAlign: 'center', marginBottom: '2rem', fontFamily: "'Outfit', sans-serif", fontStyle: 'italic' }}>
            "I'm not your guru. I'm your study buddy who actually knows the answer."
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ background: `linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                ✓ Co-Learning, Not Guru
              </h3>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.7' }}>
                I'm still learning every single day. My clients benefit from that—real-time learning, honest conversations, and genuine partnership.
              </p>
            </div>
            <div style={{ background: `linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                ✓ Your Real Problems
              </h3>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.7' }}>
                No cookie-cutter solutions. I listen deeply to your challenges and co-build custom solutions tailored to your situation.
              </p>
            </div>
            <div style={{ background: `linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                ✓ Fraction of Premium Rates
              </h3>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.7' }}>
                You get expert guidance at a fraction of what premium coaches charge. Same results, accessible pricing.
              </p>
            </div>
            <div style={{ background: `linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(255, 217, 61, 0.05) 100%)`, padding: '2rem', borderRadius: '12px', border: `1px solid ${colors.borderGray}` }}>
              <h3 style={{ fontSize: '1.3rem', color: colors.darkNavy, marginBottom: '1rem', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                ✓ Practical Over Theory
              </h3>
              <p style={{ fontSize: '0.95rem', color: colors.textMuted, lineHeight: '1.7' }}>
                Real problems. Real solutions. Not buzzwords. Every recommendation is tested in practice.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center', paddingTop: '2rem', borderTop: `2px solid ${colors.borderGray}` }}>
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
              <p style={{ fontSize: '1rem', color: colors.limeGreen, fontWeight: '700', marginBottom: '1.5rem' }}>
                Cal.com booking link will be available soon
              </p>
              <p style={{ fontSize: '0.85rem', color: colors.textMuted, fontStyle: 'italic' }}>
                In the meantime, fill out the form to the right and I'll be in touch.
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
      <p>© 2026 AppCoaching. Built with ❤️ by DEX.</p>
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
