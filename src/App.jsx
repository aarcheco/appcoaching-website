import React, { useState } from 'react';

export default function AppCoaching() {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    message: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! I\'ll get back to you soon.');
    setFormData({ firstName: '', lastName: '', email: '', service: '', message: '' });
  };

  const scrollToContact = () => {
    setCurrentPage('contact');
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const CompanyCarousel = () => (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      marginTop: '2rem'
    }}>
      <p style={{ color: '#0f2a4d', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
        Trusted by leading organizations across Australia
      </p>
      <div style={{
        display: 'flex',
        overflow: 'auto',
        gap: '2rem',
        padding: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'scroll 20s linear infinite',
        WebkitOverflowScrolling: 'touch'
      }}>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
        {['PwC', 'Flight Centre', 'RACQ', 'Coronis Group', 'NAC Consulting', 'Aveo', 'yourtown', 'Telstra', 'Tradies Success Academy'].map((company, idx) => (
          <div key={idx} style={{
            background: '#f3f4f6',
            padding: '1.5rem',
            borderRadius: '8px',
            minWidth: '150px',
            textAlign: 'center',
            border: '1px solid #d1d5db',
            flex: '0 0 auto'
          }}>
            <p style={{ color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>
              {company}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
    const sizes = {
      small: { width: '120px', height: '120px' },
      medium: { width: '280px', height: '280px' },
      large: { width: '400px', height: '400px' }
    };
    return (
      <div style={{
        ...sizes[size],
        background: '#e0e7ff',
        border: '2px dashed #0f2a4d',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f2a4d',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textAlign: 'center'
      }}>
        [Photo Placeholder]
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => (
    <nav style={{
      background: '#0f2a4d',
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
    }}>
      <div onClick={() => setCurrentPage('home')} style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', cursor: 'pointer' }}>
        APP<span style={{ color: '#eab308' }}>Coaching</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <span onClick={() => setCurrentPage('services')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9 }}>Services</span>
        <span onClick={() => setCurrentPage('about')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9 }}>About</span>
        <span onClick={() => setCurrentPage('blog')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9 }}>Blog</span>
        <button onClick={scrollToContact} style={{ 
          background: '#eab308', 
          color: '#0f2a4d', 
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          cursor: 'pointer'
        }}>BOOK NOW</button>
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div>
      <section style={{
        background: 'linear-gradient(135deg, #0f2a4d 0%, #1a3a6b 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: '1.2', fontWeight: 'bold' }}>
          Your Skills Are Being<br />
          <span style={{ color: '#eab308' }}>Redefined by Technology.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: '1.6', opacity: '0.95' }}>
          If you're in finance, accounting, business operations, or management, you're feeling it. The tools are changing. Fast. Let's make sure you're not just keeping up—you're ahead.
        </p>
        <button onClick={scrollToContact} style={{
          background: '#eab308',
          color: '#0f2a4d',
          border: 'none',
          padding: '1rem 2.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          BOOK YOUR CONSULTATION →
        </button>
      </section>

      <section style={{
        padding: '4rem 2rem',
        background: 'white',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#0f2a4d', marginBottom: '1.5rem', fontWeight: '600' }}>Why I Started APP Coaching</h2>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem', fontSize: '1rem' }}>
              I'm a qualified accountant. Spent years in audit, finance operations, strategic planning at some of Australia's biggest organizations. Excel was my superpower. I could build models that would make spreadsheet nerds cry tears of joy.
            </p>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem', fontSize: '1rem' }}>
              Then AI happened and basically said: "Cool spreadsheet, Aaron. Here's something that does this in 30 seconds." 🤖
            </p>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem', fontSize: '1rem' }}>
              Suddenly, I realized the real opportunity wasn't in defending Excel—it was in helping people understand how AI can do things Excel traditionally did. But also how to build custom tools with AI that replace manual analysis entirely.
            </p>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem', fontSize: '1rem' }}>
              So I started coaching people on exactly that. And yeah, the name APP? That's because I'm Aaron Paul Pacheco. I figured if I'm building my personal brand, might as well make it memorable.
            </p>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem', fontSize: '1rem' }}>
              Not because I'm a master (I'm still learning every single day). But because I've learned enough to help you avoid the panic I felt when the industry shifted overnight.
            </p>
            <p style={{ color: '#0f2a4d', lineHeight: '1.8', fontWeight: '600', fontSize: '1rem' }}>
              And here's what I've discovered: AI can turn hours of soul-crushing manual work into minutes. Whether it's back-end admin, marketing content, sales documents, meeting notes, file organization, or process automation—AI is lowkey magic.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImagePlaceholder size="large" />
          </div>
        </div>
      </section>

      <CompanyCarousel />

      <section style={{
        background: '#f3f4f6',
        padding: '4rem 2rem'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#0f2a4d', marginBottom: '3rem', textAlign: 'center' }}>The Challenge. The Solution.</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #1a3a6b'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>📊</div>
            <h3 style={{ color: '#0f2a4d', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Drowning in Spreadsheets?</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>Master Excel formulas, pivot tables, Power Query, and dashboards. Turn spreadsheet dread into confidence.</p>
            <p style={{ color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.95rem' }}>→ I offer Excel Mastery Coaching</p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '0.5rem' }}>Learn formulas, automation, data analysis, and dashboards that actually work. Turn spreadsheet dread into spreadsheet confidence.</p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #1a3a6b'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>🤖</div>
            <h3 style={{ color: '#0f2a4d', marginBottom: '0.5rem', fontSize: '1.1rem' }}>AI Feels Overwhelming?</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>Learn Claude, Gemini, ChatGPT, and other AI tools. Master agents, automation, and building custom apps.</p>
            <p style={{ color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.95rem' }}>→ I offer AI & Automation Coaching</p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '0.5rem' }}>Learn how AI agents, Claude, Gemini, and automation workflows can eliminate hours of repetitive work—across marketing, sales, operations, content creation, and more.</p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #1a3a6b'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>📈</div>
            <h3 style={{ color: '#0f2a4d', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Finance Feels Like a Black Box?</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>Understand pricing, profitability, P&L statements, balance sheets, and financial strategy in plain English.</p>
            <p style={{ color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.95rem' }}>→ I offer Finance Literacy Coaching</p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '0.5rem' }}>Learn business finance, cash flow, strategy, and decision-making. No jargon. Just clarity.</p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #1a3a6b'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>👥</div>
            <h3 style={{ color: '#0f2a4d', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Need a Custom Solution?</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>Let's build it together. Process automation, workflow optimization, custom AI apps—whatever solves your problem.</p>
            <p style={{ color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.95rem' }}>→ I offer Custom AI App Building</p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '0.5rem' }}>I build AI-powered applications tailored to your specific problems. Marketing templates, process automation, data tools, creative generation—whatever you need.</p>
          </div>
        </div>
      </section>

      <section style={{
        background: '#eab308',
        color: '#0f2a4d',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Get Ahead?</h2>
        <button onClick={scrollToContact} style={{
          background: '#0f2a4d',
          color: '#eab308',
          border: 'none',
          padding: '0.9rem 2rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          BOOK A CONSULTATION
        </button>
      </section>
    </div>
  );

  // Services Page
  const ServicesPage = () => (
    <div style={{ background: '#f3f4f6', paddingBottom: '3rem' }}>
      <section style={{
        background: 'linear-gradient(135deg, #0f2a4d 0%, #1a3a6b 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Build Your Skills. Your Way.</h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Choose what you need. Master each tool or get a custom solution built.</p>
      </section>

      <section style={{ padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f2a4d', textAlign: 'center', marginBottom: '3rem' }}>Coaching Services</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '3px solid #0f2a4d',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="small" />
              </div>
              <h3 style={{ color: '#0f2a4d', marginBottom: '1rem', fontSize: '1.4rem', textAlign: 'center' }}>📊 Excel Mastery Coaching</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>Master formulas, automation, data analysis, and dashboards. Excel is still the backbone of business—let's make sure you're using it to its full potential.</p>
              <p style={{ color: '#0f2a4d', fontWeight: 'bold', marginBottom: '0.5rem' }}>What You'll Learn:</p>
              <ul style={{ color: '#666', marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                <li>Advanced formulas (IFs, VLOOKUPs, INDEX/MATCH, and more)</li>
                <li>Pivot tables for data analysis</li>
                <li>Power Query for data transformation</li>
                <li>Advanced visualizations and charts</li>
                <li>Automation and time-saving shortcuts</li>
                <li>Building professional dashboards and reports</li>
              </ul>
              <button onClick={scrollToContact} style={{
                width: '100%',
                background: '#eab308',
                color: '#0f2a4d',
                border: 'none',
                padding: '0.9rem',
                fontWeight: 'bold',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>BOOK COACHING</button>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '3px solid #0f2a4d',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="small" />
              </div>
              <h3 style={{ color: '#0f2a4d', marginBottom: '1rem', fontSize: '1.4rem', textAlign: 'center' }}>🤖 AI & Automation Coaching</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>Learn how to leverage AI tools like Claude and Gemini, set up powerful agents, and build custom applications. Master the tools that are reshaping how work gets done.</p>
              <p style={{ color: '#0f2a4d', fontWeight: 'bold', marginBottom: '0.5rem' }}>What You'll Learn:</p>
              <ul style={{ color: '#666', marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                <li>How to set up and master Claude and Gemini</li>
                <li>Building and deploying AI agents for your workflow</li>
                <li>Best-in-class agents and tools for your specific needs</li>
                <li>Recommended platforms and websites for AI automation</li>
                <li>Building custom AI apps for one-off or recurring processes</li>
                <li>Content creation and marketing automation at scale</li>
                <li>Document generation, proposal automation, and more</li>
              </ul>
              <button onClick={scrollToContact} style={{
                width: '100%',
                background: '#eab308',
                color: '#0f2a4d',
                border: 'none',
                padding: '0.9rem',
                fontWeight: 'bold',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>BOOK COACHING</button>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '3px solid #0f2a4d',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="small" />
              </div>
              <h3 style={{ color: '#0f2a4d', marginBottom: '1rem', fontSize: '1.4rem', textAlign: 'center' }}>💰 Finance Literacy Coaching</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>Understand the financial side of your business. From pricing strategy to profitability analysis to reading your numbers—let's make sure you know what's actually happening.</p>
              <p style={{ color: '#0f2a4d', fontWeight: 'bold', marginBottom: '0.5rem' }}>What You'll Learn:</p>
              <ul style={{ color: '#666', marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                <li>Pricing strategy for profitability and competitive advantage</li>
                <li>Service offering utilization and optimization</li>
                <li>Understanding and managing profit margins</li>
                <li>How to read Profit & Loss statements and balance sheets</li>
                <li>Setting up and optimizing accounting systems (Xero and beyond)</li>
                <li>Using AI to quickly analyze personal or business financial health</li>
                <li>Financial strategy and data-driven decision making</li>
              </ul>
              <button onClick={scrollToContact} style={{
                width: '100%',
                background: '#eab308',
                color: '#0f2a4d',
                border: 'none',
                padding: '0.9rem',
                fontWeight: 'bold',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>BOOK COACHING</button>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '3px solid #0f2a4d',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="small" />
              </div>
              <h3 style={{ color: '#0f2a4d', marginBottom: '1rem', fontSize: '1.4rem', textAlign: 'center' }}>🎓 FREE Career Coaching</h3>
              <div style={{ background: '#eab308', color: '#0f2a4d', padding: '0.5rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                FREE when you purchase any other service
              </div>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>For graduate accountants, undergrad students in finance or business, and young finance professionals just starting out. Get guidance on navigating your career, building your skills, and staying ahead in a changing industry.</p>
              <p style={{ color: '#0f2a4d', fontWeight: 'bold', marginBottom: '0.5rem' }}>What's Included:</p>
              <ul style={{ color: '#666', marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                <li>Career strategy and planning</li>
                <li>Skill development guidance</li>
                <li>Industry insights and trends</li>
                <li>Confidence building and mentorship</li>
                <li>Navigating the tech-driven future of finance</li>
              </ul>
              <button onClick={scrollToContact} style={{
                width: '100%',
                background: '#0f2a4d',
                color: '#eab308',
                border: 'none',
                padding: '0.9rem',
                fontWeight: 'bold',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>LEARN MORE</button>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px dashed #1a3a6b',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#0f2a4d', marginBottom: '0.5rem' }}>Not sure where to start?</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Book a free consultation. We'll figure out exactly what you need.</p>
            <button onClick={scrollToContact} style={{
              background: '#1a3a6b',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>BOOK FREE CHAT</button>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f2a4d', textAlign: 'center', marginBottom: '3rem' }}>See It In Action</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', textAlign: 'center', marginBottom: '3rem' }}>Check out examples of apps I've built and sessions with clients</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: '#f3f4f6',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="medium" />
              </div>
              <h3 style={{ color: '#0f2a4d', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Custom App Example</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>AI-powered automation tool built for a client</p>
            </div>

            <div style={{
              background: '#f3f4f6',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="medium" />
              </div>
              <h3 style={{ color: '#0f2a4d', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Loom Tutorial</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Walkthrough of an AI coaching session</p>
            </div>

            <div style={{
              background: '#f3f4f6',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="medium" />
              </div>
              <h3 style={{ color: '#0f2a4d', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Client Session</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Real coaching in action with a finance professional</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div>
      <section style={{
        background: 'linear-gradient(135deg, #0f2a4d 0%, #1a3a6b 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Meet Aaron</h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Accountant. AI enthusiast. Your guide to staying relevant.</p>
      </section>

      <section style={{
        padding: '3rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ color: '#0f2a4d', fontSize: '1.8rem', marginBottom: '1rem' }}>The Background</h2>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem' }}>
              Qualified accountant. Years of experience at Telstra, PwC, Flight Centre, and other major Australian organizations. I've built complex financial models, led audit teams, managed accounting operations, and helped businesses understand their numbers.
            </p>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem' }}>
              But here's the thing: I realized early that the real power isn't in knowing accounting. It's in understanding how to use tools to solve problems. Excel was my first love. AI is my new obsession.
            </p>
            <p style={{ color: '#666', lineHeight: '1.8' }}>
              Now I help finance professionals, business leaders, and corporate teams navigate the technology revolution. Because the future isn't about doing more work manually. It's about doing less work better.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImagePlaceholder size="large" />
          </div>
        </div>

        <div style={{
          background: '#f3f4f6',
          padding: '2rem',
          borderRadius: '12px',
          border: '2px solid #1a3a6b',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#0f2a4d', marginBottom: '1rem' }}>What I Believe</h3>
          <p style={{ color: '#666', lineHeight: '1.8', margin: '0' }}>
            Technology isn't going to disappear. It's going to get faster, smarter, and more capable. The people and businesses who thrive are the ones who learn to leverage it. Not fight it. Learn it. Master it. And then use it to do what you actually care about.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#0f2a4d', marginBottom: '1.5rem' }}>Let's Work Together</h3>
          <button onClick={scrollToContact} style={{
            background: '#0f2a4d',
            color: '#eab308',
            border: 'none',
            padding: '0.9rem 2rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            BOOK A SESSION
          </button>
        </div>
      </section>
    </div>
  );

  // Blog Page
  const BlogPage = () => (
    <div>
      <section style={{
        background: 'linear-gradient(135deg, #0f2a4d 0%, #1a3a6b 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Blog</h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Insights on AI, Excel, automation, and staying ahead in a changing world.</p>
      </section>

      <section style={{
        padding: '3rem 2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #1a3a6b',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#0f2a4d', fontSize: '1.5rem', marginBottom: '0.5rem' }}>How AI Can Automate Your Manual Processes</h3>
          <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1rem' }}>Coming soon</p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Most businesses waste hours on manual, repetitive work. From data entry to document generation to email management—AI agents can handle it all. Learn how to identify where AI can save you time and money.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #1a3a6b',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#0f2a4d', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Excel Skills You Actually Need in 2025</h3>
          <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1rem' }}>Coming soon</p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Excel isn't dying. But the skills people need have changed. Discover which Excel features actually matter, what AI is replacing, and how to stay relevant with spreadsheets in the age of automation.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #1a3a6b',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#0f2a4d', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Finance Literacy for Business Owners: What You Actually Need to Know</h3>
          <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1rem' }}>Coming soon</p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            You don't need an accounting degree. But you do need to understand your business's financial story. Learn the fundamentals that matter, how to read your numbers, and how to make smarter decisions.
          </p>
        </div>

        <div style={{
          background: '#f3f4f6',
          padding: '2rem',
          borderRadius: '12px',
          border: '2px solid #1a3a6b',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#0f2a4d', marginBottom: '1rem' }}>Want to learn more?</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Let's chat about how these concepts apply to your specific situation.</p>
          <button onClick={scrollToContact} style={{
            background: '#0f2a4d',
            color: '#eab308',
            border: 'none',
            padding: '0.9rem 2rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>BOOK A CONSULTATION</button>
        </div>
      </section>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div>
      <section style={{
        background: 'linear-gradient(135deg, #0f2a4d 0%, #1a3a6b 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Let's Talk</h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>No spam. No pushy sales. Just a real conversation about what you need.</p>
      </section>

      <section id="contact-form" style={{
        padding: '3rem 2rem',
        background: '#f3f4f6'
      }}>
        <form onSubmit={handleSubmit} style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'white',
          padding: '2.5rem',
          borderRadius: '12px',
          border: '2px solid #0f2a4d',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.9rem' }}>
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.9rem' }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.9rem' }}>
              I'm Interested In *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleFormChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select an option</option>
              <option value="excel">Excel Mastery Coaching</option>
              <option value="ai">AI & Automation Coaching</option>
              <option value="finance">Finance Literacy Coaching</option>
              <option value="apps">Custom AI App Building</option>
              <option value="career">FREE Career Coaching (Young Finance Professionals)</option>
              <option value="not-sure">Not Sure Yet</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0f2a4d', fontWeight: 'bold', fontSize: '0.9rem' }}>
              Tell Me About Your Situation / Goals *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              required
              rows="5"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            background: '#0f2a4d',
            color: '#eab308',
            border: 'none',
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            SEND MESSAGE →
          </button>
        </form>
      </section>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer style={{
      background: '#0f2a4d',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
      fontSize: '0.9rem'
    }}>
      <p style={{ marginBottom: '1rem' }}>
        © 2026 AppCoaching. All Rights Reserved.
      </p>
      <p style={{ color: '#eab308', fontWeight: 'bold' }}>
        Stay ahead. Stay relevant. Master your tools.
      </p>
    </footer>
  );

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', color: '#1a1a1a', margin: 0, padding: 0 }}>
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'contact' && <ContactPage />}

      <Footer />
    </div>
  );
}