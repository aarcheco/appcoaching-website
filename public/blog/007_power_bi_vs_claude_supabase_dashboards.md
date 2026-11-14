---
title: "Power BI Took Me Months. Claude and Supabase Took Minutes."
date: 2026-11-15
id: 007
excerpt: "I spent months on one Power BI dashboard in corporate. Claude built me a finance dashboard in minutes. Here's how to build a dashboard with AI, and where Power BI still wins."
heroImage: /blog/ai-dashboard-hero.jpg
categories: ["Business AI", "Accounting & Finance Career"]
tags: ["Power BI", "Supabase", "Claude", "AI Dashboards", "Data Modelling"]
seoTitle: "Build a Dashboard With AI: Power BI vs Claude + Supabase"
metaDescription: "How to build a dashboard with AI using Claude and Supabase, from a Chartered Accountant who spent months on one Power BI dashboard. Plus where Power BI still wins."
updated: 2026-11-15
faq:
  - q: "Can I build a dashboard with AI instead of Power BI?"
    a: "Yes. Load your data into a database like Supabase, connect Claude, and ask it to design the tables and build the dashboard. Power BI still suits large companies that need strict governance."
  - q: "What is a star schema in Power BI?"
    a: "A way of organising data into fact tables, which hold events like transactions, and dimension tables, which describe things like dates, products and customers. Microsoft recommends it so Power BI can filter and summarise data efficiently."
  - q: "How do I connect Claude to Supabase?"
    a: "Through Supabase's MCP server, which lets Claude list your tables, apply migrations and run SQL. Scope it to one test project and keep manual approval on while you learn."
  - q: "Is Power BI still worth learning in 2026?"
    a: "If you work in a large organisation that runs on Microsoft, yes. Otherwise, AI tools and basic SQL will get you to a working dashboard much faster."
  - q: "Is it safe to put company data into AI tools?"
    a: "Check your workplace's AI policy first, use a test project, and remove personal details such as names and account numbers."
---

<blockquote style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>📖 PAUL's Quick Read</strong>
<p>I once spent the best part of three months on a single Power BI dashboard. Recently Claude built me a finance dashboard in minutes. Put Supabase underneath as the database, and Claude can also design the schema that links your finance data to everything around it. Here's how that setup works, and when Power BI is still worth the pain.</p>
</blockquote>

<img src="/blog/ai-dashboard-hero.jpg" alt="Analytics dashboard with charts on a laptop screen - build a dashboard with AI using Claude and Supabase" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0; display: block;">

<p style="text-align: center; color: #6b7280; font-size: 0.95rem; font-style: italic; margin: -1rem 0 2rem;">Photo by Luke Chesser on Unsplash</p>

<details style="background: #f7f9fc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
  <summary style="cursor: pointer; font-weight: 700; font-size: 1.1rem; color: #1f3a7d;">📑 Table of Contents</summary>
  <ul style="margin-top: 1rem; line-height: 1.8; padding-left: 1.5rem;">
    <li><a href="#power-bi-era">My Three-Month Power BI Era</a></li>
    <li><a href="#old-way">Why the Old Way Is Getting Old</a></li>
    <li><a href="#data-model">How Supabase and Claude Handle the Data Model</a></li>
    <li><a href="#how-to">How to Build a Dashboard With AI (Supabase + Claude)</a></li>
    <li><a href="#power-bi-wins">Where Power BI Still Wins</a></li>
    <li><a href="#check-numbers">Check the Numbers Like an Auditor</a></li>
    <li><a href="#work-smarter">Why Work Harder?</a></li>
  </ul>
</details>

<p>You can now build a dashboard with AI in minutes instead of weeks. Put your data in a Supabase database, connect Claude to it, and ask Claude to design the tables and build the dashboard for you. Power BI still earns its keep in big companies with strict governance, but for most analysts and small businesses it's a lot of modelling for a few charts.</p>

<h2 id="power-bi-era">My Three-Month Power BI Era</h2>

<p>Before I worked in an AI-forward small business, I was a corporate analyst. Part of the job was building Power BI reports for leadership, and my main dashboard took one to three months from first data pull to the version people actually used.</p>

<p>Most of that time wasn't the charts. It was the data model: fact tables, dimension tables, surrogate keys, a date table, relationships that refused to relate, and DAX measures that worked perfectly until someone added a slicer. Then the feedback round. "Can we see it by region?" Back to the model.</p>

<p>I'm a Chartered Accountant. I enjoy a good reconciliation more than most people enjoy a long weekend. But I was spending more time making the data fit the tool than answering the question the business actually asked. The dashboard looked great. I just can't get those months back.</p>

<p>Fast forward to now. In an AI-forward small business, I asked Claude to build a finance dashboard and had <strong>a working version in minutes</strong>. I checked the numbers twice, because old auditor habits die hard. The obvious next question: what if Claude also handled the part that ate my Power BI months, the data model? That's where Supabase comes in.</p>

<p>Started from the bottom (of a fact table), now we're here.</p>

<h2 id="old-way">Why the Old Way Is Getting Old</h2>

<p>This isn't me saying Power BI is bad. It's me saying the setup cost is huge for what most people need.</p>

<ul>
  <li>Microsoft's own <a href="https://learn.microsoft.com/power-bi/guidance/star-schema" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">star schema guidance</a> walks through fact tables, dimension tables, surrogate keys, slowly changing dimensions and role-playing dimensions. That's all before you write your first DAX measure. (Slowly changing dimensions is also how I'd describe my progress learning them.)</li>
  <li>Supabase's <a href="https://supabase.com/features/mcp-server" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">MCP server</a> lets AI tools like Claude "design tables, generate migrations, and manage schema", and run reports with SQL. The modelling you used to learn for months, Claude now proposes for you to approve.</li>
  <li>Employers have noticed. In February 2026, <a href="https://hiringlab.indeed.com/au/blog/2026/04/01/nothing-artificial-about-australian-ai-adoption/" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">43% of data and analytics job ads on Indeed in Australia mentioned AI</a>.</li>
</ul>

<h2 id="data-model">How Supabase and Claude Handle the Data Model</h2>

<p>Supabase is a Postgres database with a friendly web dashboard. For finance reporting, the usual setup looks like this:</p>

<ul>
  <li>A transactions table holds every line: date, account, amount, description.</li>
  <li>Lookup tables describe what the transactions belong to: your chart of accounts, budgets, customers or suppliers, and a date table.</li>
  <li>Related datasets sit alongside, such as invoices, headcount, a sales pipeline or bank feeds.</li>
  <li>Foreign keys link them. In Supabase's words, <a href="https://supabase.com/docs/guides/database/tables" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">"Foreign keys are how you express a relationship between two tables"</a>, so a transaction knows its account and an invoice knows its customer.</li>
  <li>Views do the reporting. A view is a saved query that behaves like a table, such as "budget vs actual by month" or "revenue by customer".</li>
</ul>

<p>If that sounds familiar, it should. Transactions are the fact table and the lookups are the dimensions. <strong>It's the same star schema idea Power BI wanted from me, minus the three months.</strong></p>

<p>The difference is who does the work. Through Supabase's MCP connection, Claude can <a href="https://supabase.com/docs/guides/ai-tools/mcp" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">list your tables, apply migrations and run SQL</a>. So it reads your data, proposes the tables, keys and views, and builds them once you approve. Then it queries those views and turns them into an interactive dashboard.</p>

<h2 id="how-to">How to Build a Dashboard With AI (Supabase + Claude)</h2>

<ol>
  <li>Get your data out. Export your finance data to CSV from your accounting system or bank, plus one related dataset you want to link, such as invoices or budgets. Remove names and account numbers.</li>
  <li>Put it in Supabase. Create a Supabase account and a new project, then <a href="https://supabase.com/docs/guides/database/import-data" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">import each CSV through the Table Editor</a> (files up to 100MB). Use a test project, not live customer data, until you trust the setup.</li>
  <li>Connect Claude safely. Add Supabase's MCP server to Claude and <a href="https://supabase.com/docs/guides/ai-tools/mcp" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">scope it to that one project</a>. Keep manual approval on, so you review each change before it runs. Once the schema is built, switch to read-only mode for day-to-day reporting.</li>
  <li>Let Claude design the schema. Ask it to propose the tables, foreign keys and reporting views that link your datasets. Approve it, or ask "why?" until it makes sense. No surrogate-key lecture required.</li>
  <li>Ask for the dashboard. Claude queries the views and builds an interactive dashboard. Then tweak it in plain English: "add a 12-month trend", "split by customer".</li>
</ol>

<blockquote class="paul-prompt-box" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>📋 PAUL's Prompt (Dashboard Builder)</strong>
<p>Paste this into Claude once it's connected to your Supabase project.</p>

<details style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
  <summary style="cursor: pointer; font-weight: 700; color: #1f3a7d;">📋 See Full Prompt (Click to Expand)</summary>
  <p class="paul-prompt">You're connected to my Supabase project. Act as a finance data analyst. Don't change anything without my OK.
1. List the tables in my project and summarise what data I have in plain English.
2. Propose a reporting schema that links my datasets: which table holds the transactions, which lookup tables describe them (accounts, dates, customers, budgets), the foreign keys between them, and 3-5 reporting views (e.g. budget vs actual by month). Explain each choice in one line.
3. Once I approve, apply the changes as migrations.
4. Build an interactive dashboard from the views: income and spending by month, a 12-month trend, budget vs actual, and the 10 largest transactions.
5. Show me the SQL behind every chart so I can check the numbers.
6. List anything in the data that looks wrong (duplicates, missing dates, transactions with no matching account).</p>
</details>

<button type="button" class="paul-copy">📋 Copy prompt</button>
</blockquote>

<h2 id="power-bi-wins">Where Power BI Still Wins</h2>

<p>To be fair to my old mate Power BI, there are two places I'd still pick it:</p>

<ul>
  <li>Enterprise governance. When hundreds of people see the same numbers, you need row-level security, audit trails and central sign-off. Power BI is built for that.</li>
  <li>Companies already on Microsoft. If the licences are paid, IT supports it and everyone knows where the report lives, learn it properly.</li>
</ul>

<p>If that's your world, keep going. If you're an analyst building reports for one team, or a small business owner who wants to see your numbers this week, start with AI.</p>

<h2 id="check-numbers">Check the Numbers Like an Auditor</h2>

<p>My PwC audit days taught me one rule: never trust a number you can't trace. Reconcile the dashboard totals back to your source. Does the monthly total match your bank or accounting system? Ask Claude for the SQL behind each chart and spot-check a few rows. <strong>AI is fast; it isn't always right.</strong></p>

<p>And check your workplace's AI policy before connecting any company data.</p>

<h2 id="work-smarter">Why Work Harder?</h2>

<p>I'm not against hard work. I'm against pointless work. The months you save on modelling are months you can spend on the thing the dashboard was for: <strong>the decision</strong>.</p>

<p>Moving from corporate to an AI-forward small team is how I discovered this. I wrote about that move in <a href="/blog/corporate-vs-small-business-where-your-career-grows-faster" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">Corporate vs Small Business: Where Your Career Grows Faster</a>, and if you'd rather start with something simpler, my <a href="/blog/black-friday-2026-in-australia-how-to-budget-for-it-with-ai" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">Black Friday budget with AI</a> post is a gentle first step.</p>

<blockquote style="background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>⬆️ PAUL's LevelUp</strong>
<p>This week, export one table you already report on, load it into a Supabase test project and ask Claude to build the dashboard. Time it. Then decide whether your next three months belong to a data model.</p>
</blockquote>

<section style="background: linear-gradient(135deg, #1f3a7d 0%, #2a4fa8 100%); color: white; border-radius: 12px; padding: 2.5rem; margin: 3rem 0; text-align: center;">
  <h3 style="color: white; margin-top: 0;">Want to Build Your First AI Dashboard?</h3>

  <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; color: white;">I'll walk you through setting up Supabase and Claude on your own data, and checking the numbers like an auditor would. Book a free 15-minute discovery call.</p>

  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="https://cal.com/app-coaching-xcgvda" style="background: #00FF41; color: #1f3a7d; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block;">Book a Free Discovery Call</a>
    <a href="/services" style="border: 2px solid #00FF41; color: white; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block;">Explore Coaching Services</a>
  </div>
</section>
