---
title: "Which Process Should You Fix First? Follow the Time and the Money"
date: 2026-11-28
id: 14
excerpt: "Don't fix the loudest process. Fix the one with the biggest payback. A simple scorecard for ranking processes by hours and dollars saved, with a worked example and two AI prompts."
heroImage: /blog/process-priority-hero.jpg
categories: ["Business AI", "Accounting & Finance Career"]
tags: ["Process Improvement", "Finance Automation", "Prioritisation", "AI Prompts", "Efficiency"]
seoTitle: "Which Process to Automate First: A Simple Scorecard"
metaDescription: "Which process should you fix or automate first? Rank them by hours and dollars saved with this simple scorecard, a worked example and two AI prompts."
updated: 2026-11-28
faq:
  - q: "Which process should I automate first?"
    a: "First stop anything nobody uses. Then pick the process with the highest yearly value of fixing it (time, errors, delays and any income it holds back) that is also reasonably easy to fix. Multiply that value by an ease score from 1 to 5 and start at the top."
  - q: "What do effectiveness and efficiency mean for process improvement?"
    a: "Effectiveness is how much a process moves the numbers that matter. Efficiency is how little time and money it takes. Fix the processes that are high-impact but inefficient first, and stop the ones with no impact at all."
  - q: "How do I calculate the cost of a manual process?"
    a: "Multiply hours per run by how often it runs to get hours per year, then multiply by an hourly cost that includes super and on-costs. Add the yearly cost of errors, rework and late fees."
  - q: "Should I automate a broken process?"
    a: "No. Simplify or remove the unnecessary steps first. Automating a bad process just gets you bad results faster."
  - q: "How often should I review my process priorities?"
    a: "Every quarter is a good rhythm. Once you've fixed the top process, the next one moves up, and new processes appear as the business changes."
---

<blockquote style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>📖 PAUL's Quick Read</strong>
<p>When you want to transform how your team works, don't start with the most annoying process or the shiniest tool. First ask who cares about it. Then start with the one where better <strong>effectiveness and efficiency</strong> saves or earns the most, and that's easy enough to actually fix. Here's the simple scorecard I use, a worked example and two prompts that do the maths for you.</p>
</blockquote>

<img src="/blog/process-priority-hero.jpg" alt="Hand placing a sticky note on a wall - choosing which process to fix first" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0; display: block;">

<p style="text-align: center; color: #6b7280; font-size: 0.95rem; font-style: italic; margin: -1rem 0 2rem;">Photo by Compagnons on Unsplash</p>

<details style="background: #f7f9fc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
  <summary style="cursor: pointer; font-weight: 700; font-size: 1.1rem; color: #1f3a7d;">📑 Table of Contents</summary>
  <ul style="margin-top: 1rem; line-height: 1.8; padding-left: 1.5rem;">
    <li><a href="#short-answer">The Short Answer</a></li>
    <li><a href="#how-i-learned">How I Learned to Pick</a></li>
    <li><a href="#why-now">Why It's Worth Doing Now</a></li>
    <li><a href="#scorecard">The Scorecard, Step by Step</a></li>
    <li><a href="#example">A Worked Example</a></li>
    <li><a href="#traps">Three Traps to Avoid</a></li>
    <li><a href="#your-prompts">Let AI Do the Maths</a></li>
  </ul>
</details>

<h2 id="short-answer">The Short Answer</h2>

<p>Which process should you fix first? <strong>The one where improving it saves or earns the most for the least effort.</strong> First, stop anything nobody uses. Then work out what each process costs a year in hours and dollars, plus any income it holds back, give it an ease score, multiply and start at the top. Not the one that annoys you most. Not the one with the coolest AI demo. The one with the biggest payback.</p>

<p>This follows on from <a href="/blog/your-real-job-in-finance-isnt-the-numbers-its-efficiency" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">why your real job in finance is effectiveness and efficiency</a>. Quick recap: effective means working on what moves the numbers that matter; efficient means doing it with the least time and money, every time. That post is the why. This one's the how.</p>

<h2 id="how-i-learned">How I Learned to Pick</h2>

<p>Wherever I've worked, I've automated what I could. At Coronis, streamlining the processes I inherited freed up more than 40% of my capacity. At Aveo, redesigning manual data entry and reporting removed about 30 hours of work a week.</p>

<p>Neither happened because I fixed everything. They happened because I picked the processes that ate the most time, fixed those properly, then moved on. The early version of me tried to fix everything at once. Early me also had a travel spreadsheet with 14 tabs for a four-day trip. Priorities weren't his strong suit.</p>

<h2 id="why-now">Why It's Worth Doing Now</h2>

<p>There's plenty to fix. A 2026 study found <a href="https://www.cpapracticeadvisor.com/2026/08/11/study-reveals-gap-between-the-ai-ambitions-of-accounting-teams-and-their-ability-to-execute/188332/" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">57% of month-end close cycles take seven days or more</a>, and that teams who set AI up properly are reclaiming around a quarter of their working time. Another put the cost of manual accounts payable at <a href="https://tipalti.com/global-finance-survey-2026/" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">an average of 10 hours a week</a>.</p>

<p>But AI makes it tempting to automate whatever's in front of you. Picking the right process first is what turns "we tried some AI" into hours and dollars you can point to. It's also exactly what leaders mean when a job ad asks for "continuous improvement": keep making the business more effective and more efficient, one process at a time.</p>

<h2 id="scorecard">The Scorecard, Step by Step</h2>

<ol>
  <li><strong>Ask who cares.</strong> For each process, who uses the output and what decision does it change? If nobody can answer, stop it. That's the cheapest, fastest efficiency gain there is (I once found a team reconciling a bank account nobody had heard of).</li>
  <li><strong>List every recurring process.</strong> Brain-dump everything your team does daily, weekly, monthly and yearly. Bills, recs, reporting, payroll, expense claims, invoicing, chasing approvals.</li>
  <li><strong>Measure the time.</strong> Hours per run x runs per year = hours a year. Time it once with a stopwatch if you're guessing. Everyone underestimates.</li>
  <li><strong>Put a dollar figure on it.</strong> Hours a year x an hourly cost that includes super and on-costs. Then add the cost of what goes wrong: errors, rework, late fees, cash sitting idle. And if the process keeps income-earning staff stuck on admin, add the billable or care hours it costs you.</li>
  <li><strong>Score how easy it is to fix.</strong> 1 = a big system project, 5 = a rule, a template or an AI prompt could do it this week. AI has turned a lot of processes that used to be a 1 or 2 into a 4 or 5, so re-score anything you wrote off a year ago.</li>
  <li><strong>Multiply and rank.</strong> Value a year x ease = priority score. The biggest value is your effectiveness; the ease is how quickly you can make it efficient. Start at the top.</li>
  <li><strong>Re-score every quarter.</strong> Once you fix number one, everything moves up a spot.</li>
</ol>

<h2 id="example">A Worked Example</h2>

<p>Here's what the scorecard looks like for a made-up small finance team:</p>

<div style="display: flex; flex-direction: column; gap: 0.75rem; margin: 1.5rem 0;">
  <div style="border: 1px solid #00FF00; border-radius: 12px; overflow: hidden; background: #f0fdf4; box-shadow: 0 1px 3px rgba(31,58,125,0.08);">
    <div style="background: #1f3a7d; color: #ffffff; padding: 0.75rem 1.25rem; font-weight: 700; display: flex; gap: 0.75rem; align-items: baseline;"><span style="color: #00FF00; font-size: 1.2rem;">#1</span><span>Entering supplier bills</span></div>
    <div style="display: flex; gap: 1rem; padding: 0.9rem 1.25rem; flex-wrap: wrap;">
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Cost a year</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">312 hrs + $1,200 late fees ≈ $16,800</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Ease (1–5)</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">4</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Score</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">67,200</p></div>
    </div>
  </div>
  <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #ffffff; box-shadow: 0 1px 3px rgba(31,58,125,0.08);">
    <div style="background: #1f3a7d; color: #ffffff; padding: 0.75rem 1.25rem; font-weight: 700; display: flex; gap: 0.75rem; align-items: baseline;"><span style="color: #00FF00; font-size: 1.2rem;">#2</span><span>Weekly bank reconciliations</span></div>
    <div style="display: flex; gap: 1rem; padding: 0.9rem 1.25rem; flex-wrap: wrap;">
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Cost a year</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">208 hrs ≈ $10,400</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Ease (1–5)</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">5</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Score</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">52,000</p></div>
    </div>
  </div>
  <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #ffffff; box-shadow: 0 1px 3px rgba(31,58,125,0.08);">
    <div style="background: #1f3a7d; color: #ffffff; padding: 0.75rem 1.25rem; font-weight: 700; display: flex; gap: 0.75rem; align-items: baseline;"><span style="color: #00FF00; font-size: 1.2rem;">#3</span><span>Monthly reporting pack</span></div>
    <div style="display: flex; gap: 1rem; padding: 0.9rem 1.25rem; flex-wrap: wrap;">
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Cost a year</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">192 hrs ≈ $9,600</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Ease (1–5)</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">3</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Score</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">28,800</p></div>
    </div>
  </div>
  <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #ffffff; box-shadow: 0 1px 3px rgba(31,58,125,0.08);">
    <div style="background: #1f3a7d; color: #ffffff; padding: 0.75rem 1.25rem; font-weight: 700; display: flex; gap: 0.75rem; align-items: baseline;"><span style="color: #00FF00; font-size: 1.2rem;">#4</span><span>Expense claims</span></div>
    <div style="display: flex; gap: 1rem; padding: 0.9rem 1.25rem; flex-wrap: wrap;">
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Cost a year</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">104 hrs ≈ $5,200</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Ease (1–5)</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">4</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Score</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">20,800</p></div>
    </div>
  </div>
  <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #ffffff; box-shadow: 0 1px 3px rgba(31,58,125,0.08);">
    <div style="background: #1f3a7d; color: #ffffff; padding: 0.75rem 1.25rem; font-weight: 700; display: flex; gap: 0.75rem; align-items: baseline;"><span style="color: #00FF00; font-size: 1.2rem;">#5</span><span>Annual budget model rebuild</span></div>
    <div style="display: flex; gap: 1rem; padding: 0.9rem 1.25rem; flex-wrap: wrap;">
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Cost a year</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">40 hrs ≈ $2,000</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Ease (1–5)</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">2</p></div>
      <div style="flex: 1 1 0; min-width: 0;"><p style="margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Score</p><p style="margin: 0.2rem 0 0; font-weight: 700; color: #1f2937; line-height: 1.35;">4,000</p></div>
    </div>
  </div>
</div>
<p style="color: #6b7280; font-size: 0.9rem; margin-top: -0.5rem;">Example numbers for a small finance team at $50 an hour, not a real business. Score = cost a year x ease.</p>

<p>Notice the monthly reporting pack isn't first, even though it's probably the job everyone moans about. Bill entry quietly costs more, and it's easier to fix. That's exactly the kind of thing the scorecard catches and your gut misses.</p>

<p>This example only counts costs. If a process holds back income, like care staff stuck on paperwork instead of delivering care hours, or tradies chasing paperwork instead of billing, add that lost income too. At Aveo, lifting care-staff utilisation through better rostering and reporting meant more care hours from the same team, and every extra care hour was income.</p>

<p>Not sure what hourly cost to use? Take the salary, divide by about 1,976 working hours a year (38 hours x 52 weeks) and add about 25% for super, leave and on-costs. An $80,000 salary works out at roughly $50 an hour. It doesn't need to be perfect. It needs to be the same for every process so the ranking is fair.</p>

<h3 style="color: #1f3a7d;">What happened to number one?</h3>

<p>In the example, fixing supplier bill entry might mean an AI agent reads bills from the accounts inbox and drafts them in Xero, with a person reviewing and approving (I covered how that works in <a href="/blog/your-bookkeepers-on-holiday-your-ai-agents-arent-xero-over-the-christmas-shutdown" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">AI agents running Xero over the Christmas shutdown</a>). If that cuts 6 hours a week down to 1 hour of review, that's 260 hours, about $13,000 a year, back in the team's pocket. Then bank recs become number one, and you go again.</p>

<h2 id="traps">Three Traps to Avoid</h2>

<ul>
  <li><strong>Fixing the fun one.</strong> The process with the coolest automation isn't always the one worth the most.</li>
  <li><strong>Fixing the rare one.</strong> A painful once-a-year job usually loses to a mildly annoying weekly one. Frequency is where the hours hide.</li>
  <li><strong>Automating a broken process.</strong> Simplify first. Automating a bad process just gets you bad results faster.</li>
</ul>

<h2 id="your-prompts">Let AI Do the Maths</h2>

<p>Two prompts. The first costs out one process when you need a number for your manager. The second builds the whole scorecard and, because priorities change as you fix things, offers to re-score it every quarter on a schedule so you don't have to remember.</p>

<blockquote class="paul-prompt-box" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>📋 PAUL's Prompt (Process Cost Calculator)</strong>
<p>Use it on one process at a time, then put the number in front of your manager.</p>

<details style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
  <summary style="cursor: pointer; font-weight: 700; color: #1f3a7d;">📋 See Full Prompt (Click to Expand)</summary>
  <p class="paul-prompt">You're my process improvement coach. Help me work out what ONE process really costs us.

Interview me one question at a time:
1. What's the process, step by step? (e.g. "entering supplier bills into Xero")
2. How often does it run (daily, weekly, monthly)?
3. How long does each run take, and how many people are involved?
4. What's a rough hourly cost for those people? If I'm not sure, estimate it from their salary and add about 25% for super and on-costs.
5. What goes wrong when it's late or wrong (late fees, errors, rework, unhappy customers or staff)? Estimate a yearly dollar cost.
6. Does this process hold back income? (e.g. fewer billable or care hours because staff are stuck on admin.) Estimate the income it could unlock.
7. Who uses the output, and what decision does it change? If nobody can say, flag it.

Then give me:
1. Hours per year, and the dollar cost of those hours.
2. The yearly cost of errors and delays, and any income it's holding back.
3. The total yearly value of fixing it, in one line I could say to my manager.
4. How effective it is today (does it move a number that matters?) and how efficient it is.
5. The 3 most likely ways to improve it (stop, simplify, automate or hand off), and how many hours each could save.

Show your working so I can check the maths.</p>
</details>

<button type="button" class="paul-copy">📋 Copy prompt</button>
</blockquote>

<blockquote class="paul-prompt-box" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>📋 PAUL's Prompt (Process Priority Scorecard)</strong>
<p>Use it with your team for 30 minutes, then let it re-score each quarter.</p>

<details style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
  <summary style="cursor: pointer; font-weight: 700; color: #1f3a7d;">📋 See Full Prompt (Click to Expand)</summary>
  <p class="paul-prompt">You're my process improvement coach. Help me decide which process to fix first.

Step 1: Interview me to list every recurring process in my team (ask me to brain-dump, then ask follow-ups until we have them all). For each, get: how often it runs, hours per run, people involved, any costs from errors, delays or late fees, any income it holds back (e.g. billable or care hours lost to admin), and who uses the output.

Step 2: Ask me for one blended hourly cost for the team (or estimate it from salaries plus about 25% on-costs).

Step 3: Build a scorecard table with: process, who uses the output, hours per year, time cost per year ($), other costs and income held back per year ($), total value of fixing it per year ($), ease to fix (1 = hard, 5 = easy, with one line on why), and priority score (total value x ease).

Step 4: Rank by priority score. For the top 3, suggest the first practical step to fix each, the tool or AI approach, and a realistic estimate of hours saved.

Step 5: Flag any process nobody uses (stop it, the cheapest fix of all), and any that should be simplified BEFORE it's automated.

Step 6: Ask me if I want this re-scored on a schedule (e.g. the first Monday of each quarter), so the list stays current as we fix things. If yes, save the scorecard and my answers so future runs only ask what's changed. Set up the scheduled task if you can; if you can't, tell me the simplest way to schedule it with the tools I have.

Show your working so I can check the maths.</p>
</details>

<button type="button" class="paul-copy">📋 Copy prompt</button>
</blockquote>

<p>Take the top process to your manager with its yearly cost and the hours you expect to save. If you need a hand building the fix, that's <a href="/services" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">what my coaching sessions are for</a>.</p>

<blockquote style="background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>⬆️ PAUL's LevelUp</strong>
<p>Effective first: stop what nobody uses and focus on what moves the numbers. Then efficient: fix the process with the biggest payback for the least effort. This week, list your team's recurring processes, ask who uses each, cost them in hours and dollars, and pick number one.</p>
</blockquote>

<section style="background: linear-gradient(135deg, #1f3a7d 0%, #2a4fa8 100%); color: white; border-radius: 12px; padding: 2.5rem; margin: 3rem 0; text-align: center;">
  <h3 style="color: white; margin-top: 0;">Not Sure Where to Start?</h3>

  <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; color: white;">I help finance teams and small business owners find their biggest time sinks and fix them with AI, in Brisbane and online across Australia. Book a free 15-minute discovery call.</p>

  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="https://cal.com/app-coaching-xcgvda" style="background: #00FF41; color: #1f3a7d; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block;">Book a Free Discovery Call</a>
    <a href="/services" style="border: 2px solid #00FF41; color: white; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block;">Explore Coaching Services</a>
  </div>
</section>
