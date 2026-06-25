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

  const ImagePlaceholder = ({ size = 'medium' }) => {
    const sizes = {
      small: { width: '120px', height: '120px' },
      medium: { width: '280px', height: '280px' },
      large: { width: '400px', height: '400px' }
    };
    return (
      <div style={{
        ...sizes[size],
        background: '#e0e7ff',
        border: '2px dashed #1e40af',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1e40af',
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
      background: '#1e40af',
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
        APP<span style={{ color: '#ffd700' }}>Coaching</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <span onClick={() => setCurrentPage('services')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9 }}>Services</span>
        <span onClick={() => setCurrentPage('about')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9 }}>About</span>
        <span onClick={() => setCurrentPage('blog')} style={{ color: 'white', fontSize: '0.95rem', cursor: 'pointer', opacity: 0.9 }}>Blog</span>
        <button onClick={scrollToContact} style={{ 
          background: '#ffd700', 
          color: '#1e40af', 
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
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: '1.2', fontWeight: 'bold' }}>
          Your Skills Are Being<br />
          <span style={{ color: '#ffd700' }}>Redefined by Technology.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: '1.6', opacity: '0.95' }}>
          If you're in finance, accounting, business operations, or management, you're feeling it. The tools are changing. Fast. Let's make sure you're not just keeping up—you're ahead.
        </p>
        <button onClick={scrollToContact} style={{
          background: '#ffd700',
          color: '#1e40af',
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
            <h2 style={{ fontSize: '2.2rem', color: '#1e40af', marginBottom: '1.5rem', fontWeight: '600' }}>Why I Started APP Coaching</h2>
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
            <p style={{ color: '#1e40af', lineHeight: '1.8', fontWeight: '600', fontSize: '1rem' }}>
              And here's what I've discovered: AI can turn hours of soul-crushing manual work into minutes. Whether it's back-end admin, marketing content, sales documents, meeting notes, file organization, or process automation—AI is lowkey magic.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImagePlaceholder size="large" />
          </div>
        </div>
      </section>

      <section style={{
        background: '#f0f9ff',
        padding: '4rem 2rem'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#1e40af', marginBottom: '3rem', textAlign: 'center' }}>The Challenge. The Solution.</h2>
        
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
            border: '2px solid #3b82f6'
          }}>
            <h3 style={{ color: '#1e40af', marginBottom: '0.5rem', fontSize: '1.1rem' }}>📊 Drowning in Spreadsheets?</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>Excel is still the backbone of business. But most people only use 10% of what it can do.</p>
            <p style={{ color: '#1e40af', fontWeight: 'bold', fontSize: '0.95rem' }}>→ I offer Excel Mastery Coaching</p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '0.5rem' }}>Learn formulas, automation, data analysis, and dashboards that actually work. Turn spreadsheet dread into spreadsheet confidence.</p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #3b82f6'
          }}>
            <h3 style={{ color: '#1e40af', marginBottom: '0.5rem', fontSize: '1.1rem' }}>🤖 AI Feels Overwhelming?</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>AI is changing everything. But it's not as complicated as it seems. You just need someone to show you how.</p>
            <p style={{ color: '#1e40af', fontWeight: 'bold', fontSize: '0.95rem' }}>→ I offer AI & Automation Coaching</p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '0.5rem' }}>Learn how AI agents, Claude, Gemini, and automation workflows can eliminate hours of repetitive work—across marketing, sales, operations, content creation, and more.</p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #3b82f6'
          }}>
            <h3 style={{ color: '#1e40af', marginBottom: '0.5rem', fontSize: '1.1rem' }}>💰 Finance Feels Like a Black Box?</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>Whether it's personal or business finances, you need to actually understand what's happening.</p>
            <p style={{ color: '#1e40af', fontWeight: 'bold', fontSize: '0.95rem' }}>→ I offer Finance Literacy Coaching</p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '0.5rem' }}>Learn business finance, cash flow, strategy, and decision-making. No jargon. Just clarity.</p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #3b82f6'
          }}>
            <h3 style={{ color: '#1e40af', marginBottom: '0.5rem', fontSize: '1.1rem' }}>🛠️ Need a Custom Solution?</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>Got a workflow that needs automating? A process to streamline? A tool that doesn't exist yet?</p>
            <p style={{ color: '#1e40af', fontWeight: 'bold', fontSize: '0.95rem' }}>→ I offer Custom AI App Building</p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '0.5rem' }}>I build AI-powered applications tailored to your specific problems. Marketing templates, process automation, data tools, creative generation—whatever you need.</p>
          </div>
        </div>
      </section>

      <section style={{
        background: '#ffd700',
        color: '#1e40af',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Get Ahead?</h2>
        <button onClick={scrollToContact} style={{
          background: '#1e40af',
          color: '#ffd700',
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
    <div style={{ background: '#f0f9ff', paddingBottom: '3rem' }}>
      <section style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Build Your Skills. Your Way.</h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Choose what you need. Master each tool or get a custom solution built.</p>
      </section>

      <section style={{ padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: '#1e40af', textAlign: 'center', marginBottom: '3rem' }}>Coaching Services</h2>
          
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
              border: '3px solid #1e40af',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="small" />
              </div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.4rem', textAlign: 'center' }}>📊 Excel Mastery Coaching</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>Master formulas, automation, data analysis, and dashboards. Excel is still the backbone of business—let's make sure you're using it to its full potential.</p>
              <p style={{ color: '#1e40af', fontWeight: 'bold', marginBottom: '0.5rem' }}>What You'll Learn:</p>
              <ul style={{ color: '#666', marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                <li>Advanced formulas and functions</li>
                <li>Data analysis and visualization</li>
                <li>Automation and time-saving shortcuts</li>
                <li>Building dashboards and reports</li>
              </ul>
              <button onClick={scrollToContact} style={{
                width: '100%',
                background: '#ffd700',
                color: '#1e40af',
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
              border: '3px solid #1e40af',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="small" />
              </div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.4rem', textAlign: 'center' }}>🤖 AI & Automation Coaching</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>Learn how AI agents, Claude, Gemini, and automation workflows can eliminate hours of repetitive work across your business.</p>
              <p style={{ color: '#1e40af', fontWeight: 'bold', marginBottom: '0.5rem' }}>What You'll Learn:</p>
              <ul style={{ color: '#666', marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                <li>AI tools and prompt engineering</li>
                <li>Content creation and marketing automation</li>
                <li>Document and sales proposal generation</li>
                <li>Process automation and file organization</li>
              </ul>
              <button onClick={scrollToContact} style={{
                width: '100%',
                background: '#ffd700',
                color: '#1e40af',
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
              border: '3px solid #1e40af',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="small" />
              </div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.4rem', textAlign: 'center' }}>💰 Finance Literacy Coaching</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>Understand business finance, cash flow, financial strategy, and decision-making. No jargon. Just clarity.</p>
              <p style={{ color: '#1e40af', fontWeight: 'bold', marginBottom: '0.5rem' }}>What You'll Learn:</p>
              <ul style={{ color: '#666', marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                <li>Business finance fundamentals</li>
                <li>Cash flow management</li>
                <li>Financial strategy and planning</li>
                <li>Data-driven decision making</li>
              </ul>
              <button onClick={scrollToContact} style={{
                width: '100%',
                background: '#ffd700',
                color: '#1e40af',
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
              border: '3px solid #1e40af',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <ImagePlaceholder size="small" />
              </div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.4rem', textAlign: 'center' }}>🛠️ Custom AI App Building</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>Got a process that needs automating? A workflow to streamline? A tool your team needs? I build AI-powered custom applications.</p>
              <p style={{ color: '#1e40af', fontWeight: 'bold', marginBottom: '0.5rem' }}>What We Build:</p>
              <ul style={{ color: '#666', marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                <li>Process automation tools</li>
                <li>Marketing and sales tools</li>
                <li>Content generation systems</li>
                <li>Custom business applications</li>
              </ul>
              <button onClick={scrollToContact} style={{
                width: '100%',
                background: '#ffd700',
                color: '#1e40af',
                border: 'none',
                padding: '0.9rem',
                fontWeight: 'bold',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>LET'S BUILD</button>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px dashed #3b82f6',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>Not sure where to start?</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Book a free consultation. We'll figure out exactly what you need.</p>
            <button onClick={scrollToContact} style={{
              background: '#3b82f6',
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
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div>
      <section style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
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
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1rem' }}>The Background</h2>
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
          background: '#f0f9ff',
          padding: '2rem',
          borderRadius: '12px',
          border: '2px solid #3b82f6',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>What I Believe</h3>
          <p style={{ color: '#666', lineHeight: '1.8', margin: '0' }}>
            Technology isn't going to disappear. It's going to get faster, smarter, and more capable. The people and businesses who thrive are the ones who learn to leverage it. Not fight it. Learn it. Master it. And then use it to do what you actually care about.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#1e40af', marginBottom: '1.5rem' }}>Let's Work Together</h3>
          <button onClick={scrollToContact} style={{
            background: '#1e40af',
            color: '#ffd700',
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
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
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
          border: '1px solid #3b82f6',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '0.5rem' }}>How AI Can Automate Your Manual Processes</h3>
          <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1rem' }}>Coming soon</p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Most businesses waste hours on manual, repetitive work. From data entry to document generation to email management—AI agents can handle it all. Learn how to identify where AI can save you time and money.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #3b82f6',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Excel Skills You Actually Need in 2025</h3>
          <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1rem' }}>Coming soon</p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Excel isn't dying. But the skills people need have changed. Discover which Excel features actually matter, what AI is replacing, and how to stay relevant with spreadsheets in the age of automation.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #3b82f6',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Finance Literacy for Business Owners: What You Actually Need to Know</h3>
          <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1rem' }}>Coming soon</p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            You don't need an accounting degree. But you do need to understand your business's financial story. Learn the fundamentals that matter, how to read your numbers, and how to make smarter decisions.
          </p>
        </div>

        <div style={{
          background: '#f0f9ff',
          padding: '2rem',
          borderRadius: '12px',
          border: '2px solid #3b82f6',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>Want to learn more?</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Let's chat about how these concepts apply to your specific situation.</p>
          <button onClick={scrollToContact} style={{
            background: '#1e40af',
            color: '#ffd700',
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
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Let's Talk</h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>No spam. No pushy sales. Just a real conversation about what you need.</p>
      </section>

      <section id="contact-form" style={{
        padding: '3rem 2rem',
        background: '#f0f9ff'
      }}>
        <form onSubmit={handleSubmit} style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'white',
          padding: '2.5rem',
          borderRadius: '12px',
          border: '2px solid #1e40af',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1e40af', fontWeight: 'bold', fontSize: '0.9rem' }}>
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
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1e40af', fontWeight: 'bold', fontSize: '0.9rem' }}>
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
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1e40af', fontWeight: 'bold', fontSize: '0.9rem' }}>
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
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1e40af', fontWeight: 'bold', fontSize: '0.9rem' }}>
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
              <option value="not-sure">Not Sure Yet</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1e40af', fontWeight: 'bold', fontSize: '0.9rem' }}>
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
            background: '#1e40af',
            color: '#ffd700',
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
      background: '#1e40af',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
      fontSize: '0.9rem'
    }}>
      <p style={{ marginBottom: '1rem' }}>
        © 2026 AppCoaching. All Rights Reserved.
      </p>
      <p style={{ color: '#ffd700', fontWeight: 'bold' }}>
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
