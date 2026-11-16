---
title: '25 Common Excel Mistakes I Fixed for Years (and How I Became "Mr Excel" at Flight Centre)'
date: 2026-11-17
id: 9
excerpt: "For years, broken spreadsheets found their way to my desk. Here are the 25 common Excel mistakes I fixed most, why each one hurts, and exactly how I fixed it."
heroImage: /blog/excel-mistakes-hero.jpg
categories: ["Excel", "Accounting & Finance Career"]
tags: ["Excel Mistakes", "Excel Tips", "Power Query", "XLOOKUP", "Spreadsheet Best Practice"]
seoTitle: "Common Excel Mistakes Accountants Make (and How to Fix Them)"
metaDescription: "25 common Excel mistakes I fixed for years as Flight Centre's go-to Excel person, why each one hurts, and the simple fixes, plus an AI prompt to audit your file."
updated: 2026-11-17
faq:
  - q: "What are the most common Excel mistakes?"
    a: "Messy data (monthly tabs, subtotals inside data, numbers stored as text), fragile formulas (hardcodes, nested IFs, VLOOKUP column numbers), manual copy-paste processes, files with no checks or instructions, and slow, bloated workbooks."
  - q: "Is XLOOKUP better than VLOOKUP?"
    a: "For most work, yes. XLOOKUP does an exact match by default and points at the actual return column, so inserting a column won't quietly return the wrong data. Check your Excel version supports it."
  - q: "How do I stop copying and pasting reports every month?"
    a: "Use Power Query to import and clean the data once, then press Refresh each month. Every step runs again automatically."
  - q: "How do I make an Excel file easy to hand over?"
    a: "Keep data in Excel Tables, keep formulas short with helper columns, add a check tab and an instructions tab, and colour-code inputs."
  - q: "Can AI check my Excel formulas?"
    a: "Yes. Upload a copy of the workbook to ChatGPT or Claude, or paste the formulas, and ask it to flag common mistakes. Remove sensitive data first and check your workplace's AI policy."
---

<blockquote style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>📖 PAUL's Quick Read</strong>
<p>At Flight Centre, people from my team, other brands, finance leaders and our offshore team started bringing me their broken spreadsheets, and the "Mr Excel" nickname stuck. Over a decade in finance I've seen the same 25 mistakes again and again. This is the full list, grouped so you can find yours, with the fix I used for each one.</p>
</blockquote>

<img src="/blog/excel-mistakes-hero.jpg" alt="Hands typing on a laptop showing a spreadsheet - common Excel mistakes and how to fix them" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0; display: block;">

<p style="text-align: center; color: #6b7280; font-size: 0.95rem; font-style: italic; margin: -1rem 0 2rem;">Photo by Gorilla ROI Data Connector on Unsplash</p>

<details style="background: #f7f9fc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
  <summary style="cursor: pointer; font-weight: 700; font-size: 1.1rem; color: #1f3a7d;">📑 Table of Contents</summary>
  <ul style="margin-top: 1rem; line-height: 1.8; padding-left: 1.5rem;">
    <li><a href="#mr-excel">How I Became "Mr Excel"</a></li>
    <li><a href="#why-now">Why Now</a></li>
    <li><a href="#data-mistakes">Data Mistakes (1–4)</a></li>
    <li><a href="#formula-mistakes">Formula Mistakes (5–12)</a></li>
    <li><a href="#process-mistakes">Process Mistakes (13–16)</a></li>
    <li><a href="#usability-mistakes">Usability and Reporting Mistakes (17–21)</a></li>
    <li><a href="#control-mistakes">Performance and Control Mistakes (22–25)</a></li>
    <li><a href="#behind-it-all">The Mistake Behind All the Mistakes</a></li>
    <li><a href="#toolkit">My Go-To Fixes Toolkit</a></li>
    <li><a href="#handover-test">The Handover Test</a></li>
  </ul>
</details>

<p>The most common Excel mistakes fall into five groups: messy data, fragile formulas, manual processes, files only their builder understands, and slow, bloated workbooks. Almost all of them have the same cure: clean data in Excel Tables, simple formulas, Power Query instead of copy-paste, a check tab, and a file built so someone else can take it over.</p>

<h2 id="mr-excel">How I Became "Mr Excel"</h2>

<p>From 2017 to 2020 I worked in finance at Flight Centre, from specialist accountant to assistant team leader. My world was bank reconciliations, supplier payment runs, expense reimbursements and month-end reporting, including leading the company-wide overhaul of Accounts Payable reporting, covering over $100M a year, for finance leaders and the CFO.</p>

<p>Somewhere in there, my desk became the drop-off point for broken spreadsheets. My own team, people from other brands, finance leaders, and later the offshore team I helped onboard in India. Recs that wouldn't tie, payment files that took all day, reports nobody trusted. Like a vet, but for workbooks.</p>

<p>I fixed them, rebuilt the templates people relied on, and ran training sessions so colleagues could build and read formulas themselves. Word got around, managers started saying it too, and the nickname stuck: Mr Excel.</p>

<p>The results were what you'd hope: hours saved, fewer errors, files new starters and offshore staff could run without me, and leaders who trusted the numbers. <strong>My rule never changed: build every file so a new accountant could take it over on day one</strong>, ideally without calling me.</p>

<p>The habit followed me. At Coronis I streamlined every process I inherited, freeing up more than 40% of my capacity, and automated bulk journal imports. At Aveo I redesigned manual data entry and reporting, removing about 30 hours of work a week and cutting a weekly utilisation report from three days to one.</p>

<h2 id="why-now">Why Now</h2>

<ul>
  <li>Spreadsheet errors are normal, not rare. Audits summarised by researcher Raymond Panko found <a href="https://www.computerworld.com/article/1704893/sidebar-oops.html" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">errors in 49 of 54 spreadsheets</a>, or 91%.</li>
  <li>Most of the fixes are built into Excel already. <a href="https://support.microsoft.com/en-us/office/about-power-query-in-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">Power Query</a> replaces manual copy-paste ("When you refresh a query, each step runs automatically"), <a href="https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">XLOOKUP</a> does an exact match by default, and <a href="https://support.microsoft.com/en-us/office/overview-of-excel-tables-7ab0bb7d-3a9e-4b56-a3c9-6c94334e492c" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">Excel Tables</a> fill a formula down the whole column instantly.</li>
  <li>And AI can now do the first pass of an audit for you in minutes. There are two prompts for that further down.</li>
</ul>

<h2 id="data-mistakes">Data Mistakes (1–4)</h2>

<p>Most broken files were broken before anyone wrote a formula. <strong>Bad data in means bad numbers out</strong>, no matter how clever the formula.</p>

<h3>1. A new tab for every month</h3>

<p>Jan, Feb, Mar, each its own sheet with the same layout.</p>

<p>Why it hurts: You can't trend the year without stitching twelve tabs together, and every new month means copying a sheet and re-pointing formulas.</p>

<p>The fix: One data table with a Month column. Append each month to the bottom (or let Power Query do it), then report any month or the full year with a pivot.</p>

<h3>2. Subtotals and blank rows inside the data</h3>

<p>Raw data with subtotals, blank spacer rows and notes mixed in.</p>

<p>Why it hurts: Sort it, filter it or pivot it and the subtotals get counted twice. Your total is now creatively wrong.</p>

<p>The fix: Keep raw data raw. One header row, one record per row, no blanks. Do the subtotals in a pivot or a separate report.</p>

<h3>3. Numbers and dates stored as text</h3>

<p>Imports that look like numbers but won't sum, and dates that sort alphabetically. Welcome to green-triangle land.</p>

<p>Why it hurts: SUM quietly skips text, so totals come up short with no error to warn you.</p>

<p>The fix: Convert them properly (Text to Columns, VALUE or DATEVALUE), or better, set the data types once in Power Query so every refresh comes in clean.</p>

<h3>4. Many values crammed into one cell</h3>

<p>"Smith – 3/4 – paid" in a single cell.</p>

<p>Why it hurts: You can't filter by status, sum by date, or look up the customer.</p>

<p>The fix: One value per column. Split existing data with Text to Columns or Power Query's Split Column, and give new templates a separate column for each field.</p>

<h2 id="formula-mistakes">Formula Mistakes (5–12)</h2>

<p>These are the ones that look fine until the day they cost you. <strong>A formula nobody can read is a formula nobody checks.</strong></p>

<h3>5. Hardcoded numbers inside formulas</h3>

<p><code>=B2*1.1</code>, and nobody remembers where the 1.1 came from.</p>

<p>Why it hurts: When the rate changes, someone has to find every formula it's buried in. They won't find them all.</p>

<p>The fix: Put the 10% in a labelled input cell and reference it: <code>=B2*(1+Growth_Rate)</code>.</p>

<h3>6. Monster formulas</h3>

<p>Five nested IFs on one line. I've seen nested IFs deeper than my Everton disappointment.</p>

<p>Why it hurts: Nobody can check it, so nobody does, and when it breaks only the builder can fix it.</p>

<p>The fix: Break it into helper columns with SUMIFS and simple steps, or swap an IF chain for a lookup against a small table.</p>

<h3>7. Fragile VLOOKUPs</h3>

<p><code>=VLOOKUP(A2,Data!A:F,4,FALSE)</code> returns column 4.</p>

<p>Why it hurts: Insert a column in that range and it quietly returns the wrong data. Forget the FALSE and you get an approximate match that looks right but isn't.</p>

<p>The fix: XLOOKUP or INDEX/MATCH, which point at the actual return column. XLOOKUP is an exact match by default.</p>

<h3>8. The wrong $ references</h3>

<p>A formula that works in row 2 and goes haywire when copied down.</p>

<p>Why it hurts: The tax rate cell drifts to an empty cell, and the error repeats a thousand times.</p>

<p>The fix: Lock what shouldn't move with $ (F4 cycles through the options), and test by copying the formula across and down before you trust it.</p>

<h3>9. Whole-column references everywhere</h3>

<p>A:A in heavy formulas across thousands of rows.</p>

<p>Why it hurts: Excel crunches a million rows per reference and the file crawls.</p>

<p>The fix: Turn the data into an Excel Table and use structured references, which grow with the data without dragging in a million empty cells.</p>

<h3>10. Circular references</h3>

<p>A formula that depends on itself, often "fixed" by turning on iterative calculation.</p>

<p>Why it hurts: The numbers can shift every time the file recalculates, and nobody can explain why.</p>

<p>The fix: Find the loop and fix the logic. Only use iterative calculation when the model genuinely needs it, and say so in the instructions tab.</p>

<h3>11. Misaligned SUMIF ranges</h3>

<p>The criteria range is A2:A500, the sum range is C3:C501.</p>

<p>Why it hurts: Everything's off by one row, and SUMIF won't tell you. It just adds up the wrong numbers.</p>

<p>The fix: Use SUMIFS with ranges that line up, or better, Table columns, which always line up.</p>

<h3>12. IFERROR wrapped around everything</h3>

<p>Every error turned into a zero or a blank.</p>

<p>Why it hurts: Real problems, like a missing account code, disappear quietly. The total looks fine and is wrong.</p>

<p>The fix: Only catch errors you expect, and show them on the check tab rather than hiding them.</p>

<h2 id="process-mistakes">Process Mistakes (13–16)</h2>

<p>This is where the hours go. <strong>If you do it by hand every month, it can probably be automated.</strong></p>

<h3>13. Rebuilding the same report by hand every month</h3>

<p>Export, copy, paste, fix the columns, repeat.</p>

<p>Why it hurts: Hours gone every month, and every manual step is a new chance to paste into the wrong row.</p>

<p>The fix: Power Query. Set up the import and cleaning once, then hit Refresh next month.</p>

<h3>14. Links to other workbooks</h3>

<p>A formula pointing at a file on someone's desktop.</p>

<p>Why it hurts: The file moves, gets renamed or its owner leaves, and the links break, or worse, keep showing last month's numbers.</p>

<p>The fix: Bring the data in with Power Query from a shared location, or consolidate it into one file. Check for stray links before you hand anything over.</p>

<h3>15. v2_FINAL_final_USE THIS ONE.xlsx</h3>

<p>Five versions emailed around, and nobody sure which is current.</p>

<p>Why it hurts: People work on the wrong numbers, and two people's changes never meet.</p>

<p>The fix: One source of truth: a single file in a shared location like SharePoint or OneDrive, with version history instead of version names.</p>

<h3>16. No checks</h3>

<p>Nothing in the file proves it's right, so errors get found by the boss.</p>

<p>Why it hurts: In finance, that's the worst way to find out.</p>

<p>The fix: A check tab. Totals tied back to the source, TRUE/FALSE flags for each check, and one cell at the top that says ALL CHECKS OK, or doesn't. Old auditor habit: never trust a number you can't trace.</p>

<h2 id="usability-mistakes">Usability and Reporting Mistakes (17–21)</h2>

<p>A file only its builder understands is a liability. <strong>Build it for the next person, not for you.</strong></p>

<h3>17. Hidden rows, columns and sheets</h3>

<p>"Don't touch column Q."</p>

<p>Why it hurts: Hidden calculations can't be checked, and the next person deletes them by accident.</p>

<p>The fix: Keep workings visible on their own calc tab. If you must tidy up, group rows and columns instead of hiding them, and say what's there in the instructions tab.</p>

<h3>18. No instructions</h3>

<p>Only the builder knows how to run it.</p>

<p>Why it hurts: The builder goes on leave and month-end stops.</p>

<p>The fix: An instructions tab: what the file does, who owns it, the steps to update it, where the inputs come from, and what the checks mean. The second prompt below writes one for you.</p>

<h3>19. Formatting chaos</h3>

<p>Random colours, merged cells everywhere, and formulas that change halfway across a row. Merged cells are the pineapple on pizza of spreadsheets: some people love them, accountants don't.</p>

<p>Why it hurts: Nobody can tell an input from a formula, merged cells break sorting and copying, and that one different formula is the one that's wrong.</p>

<p>The fix: A colour code and a rule. Blue for inputs, black for formulas, and one consistent formula per column. Use Center Across Selection instead of merging.</p>

<h3>20. Stale pivots and pasted values</h3>

<p>Pivots never refreshed, or live numbers pasted as values and left to rot.</p>

<p>Why it hurts: The report says one thing and the data says another.</p>

<p>The fix: Refresh All before every send, and keep live data live. If you need a snapshot, label it with the date.</p>

<h3>21. Pivots built on a fixed range</h3>

<p>The pivot points at A1:F500, and row 501 never makes it in.</p>

<p>Why it hurts: New data silently drops out of the report.</p>

<p>The fix: Build every pivot on an Excel Table, so the source grows with the data.</p>

<h2 id="control-mistakes">Performance and Control Mistakes (22–25)</h2>

<p>The slow, fragile files that make month-end a nightmare. <strong>Fast and boring beats clever and fragile.</strong></p>

<h3>22. Conditional formatting bloat</h3>

<p>Copy and paste a formatted range enough times and you end up with thousands of duplicate rules.</p>

<p>Why it hurts: The file lags on every click.</p>

<p>The fix: Open Manage Rules, delete the duplicates, and apply one rule to the whole Table.</p>

<h3>23. Junk in the file</h3>

<p>Unused named ranges, phantom styles, and objects nobody can see.</p>

<p>Why it hurts: Bigger, slower files, and named ranges pointing at #REF! that confuse everyone.</p>

<p>The fix: A regular clean-out with Name Manager, and rebuilding badly bloated templates from scratch.</p>

<h3>24. Mystery macros</h3>

<p>VBA nobody can read or fix once the builder leaves.</p>

<p>Why it hurts: The macro breaks, and the process it ran breaks with it.</p>

<p>The fix: Replace what you can with Power Query and formulas. Document what's left in plain English.</p>

<h3>25. Key-person files</h3>

<p>One person's file runs a critical process. They go on leave, and it breaks.</p>

<p>Why it hurts: The business depends on one person's memory.</p>

<p>The fix: Everything above: clean data, simple formulas, a check tab, an instructions tab, and training a second person to run it. This is exactly what let new starters and our offshore team run files without me.</p>

<h2 id="behind-it-all">The Mistake Behind All the Mistakes</h2>

<p>Most of the 25 come back to one habit: never learning new functions. Plenty of files are still built like it's 2007, when Excel Tables, Power Query and XLOOKUP would make them simpler, faster and safer. <strong>Learning one new feature a month beats building one more workaround.</strong></p>

<h2 id="toolkit">My Go-To Fixes Toolkit</h2>

<p>Twelve habits fix almost all 25 mistakes. If you only learn a few, start at the top.</p>

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
  <thead>
    <tr><th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid #1f3a7d;">Fix</th><th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid #1f3a7d;">What it does</th><th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid #1f3a7d;">Mistakes it fixes</th></tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Excel Tables (Ctrl+T)</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Ranges grow with the data; formulas fill down automatically</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">9, 11, 21</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">One data tab + pivots</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">All months in one table, reported any way you like</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">1, 2, 20</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Power Query</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Imports and cleans data on Refresh, no copy-paste</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">3, 4, 13, 14</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Inputs → Calcs → Outputs</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">A clear flow anyone can follow</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">5, 17, 19</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">XLOOKUP / INDEX-MATCH</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Lookups that don't break or guess</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">7</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">SUMIFS + helper columns</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Simple steps instead of monster formulas</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">6, 11</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Check tab</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Proves the file ties out before anyone else looks</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">12, 16</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Data validation</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Dropdowns that stop bad inputs at the source</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">3, 4</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">One source of truth</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">A single shared file with version history</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">15</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Instructions tab</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">How to run the file, in plain English</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">18, 24, 25</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Colour code</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Blue inputs, black formulas, one formula per column</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">8, 19</td></tr>
    <tr><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Training sessions</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">Teaching people to build and read formulas</td><td style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb;">25, and the mistake behind them all</td></tr>
  </tbody>
</table>
</div>

<p>For data validation, Microsoft's guide on <a href="https://support.microsoft.com/en-us/office/apply-data-validation-to-cells-29fecbcc-d1b9-42c1-9d76-eff3ce5f7249" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">restricting what users can enter</a> shows you how to set up dropdowns in a couple of minutes.</p>

<h2 id="handover-test">The Handover Test</h2>

<p>Before you send a file on, ask:</p>

<ol>
  <li>Could a new grad find every input without asking me?</li>
  <li>Does every formula in a column match the one above it?</li>
  <li>Can someone read each formula out loud and explain it?</li>
  <li>Does the check tab say ALL CHECKS OK?</li>
  <li>Could someone else run next month's update from the instructions tab alone?</li>
</ol>

<p>Five yeses and you've built a file people will thank you for. <strong>Good Excel is a career move</strong>, especially in a small team where everyone sees who fixed the file, as I wrote in <a href="/blog/corporate-vs-small-business-where-your-career-grows-faster" style="color: #1f3a7d; text-decoration: underline; text-decoration-color: #00FF00; text-decoration-thickness: 2px; font-weight: 600;">Corporate vs Small Business</a>.</p>

<blockquote class="paul-prompt-box" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>📋 PAUL's Prompt (Excel Workbook Auditor)</strong>
<p>Upload a copy of your workbook to ChatGPT or Claude, or paste in the formulas. Remove anything sensitive first and check your workplace's AI policy.</p>

<details style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
  <summary style="cursor: pointer; font-weight: 700; color: #1f3a7d;">📋 See Full Prompt (Click to Expand)</summary>
  <p class="paul-prompt">Act as an experienced finance analyst reviewing an Excel workbook before it's handed to a new team member.
Check every sheet for these problems and list each one you find with its sheet and cell or range:
1. Data: monthly tabs that should be one table, subtotals or blank rows inside data, numbers or dates stored as text, several values in one cell.
2. Formulas: hardcoded numbers, more than 3 nested IFs, VLOOKUP with column numbers or approximate matches, wrong $ references, whole-column references in heavy formulas, circular references, SUMIF ranges that don't line up, IFERROR hiding real errors.
3. Process: links to other workbooks, and anything that looks copied and pasted by hand.
4. Usability: hidden rows, columns or sheets, merged cells, inconsistent formulas across a row or down a column, pivots built on fixed ranges.
5. Performance: duplicated conditional formatting rules and unused named ranges.
For each problem, explain in plain English why it's risky and give the rewritten formula or fix.
Don't change any data. Finish with the 5 fixes that would make this file easiest for a new accountant to take over.</p>
</details>

<button type="button" class="paul-copy">📋 Copy prompt</button>
</blockquote>

<blockquote class="paul-prompt-box" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>📋 PAUL's Prompt (Instructions Tab Writer)</strong>
<p>Paste this into ChatGPT, Claude or Gemini, answer its questions one at a time, and paste the result into a new tab called Read Me.</p>

<details style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
  <summary style="cursor: pointer; font-weight: 700; color: #1f3a7d;">📋 See Full Prompt (Click to Expand)</summary>
  <p class="paul-prompt">Act as a finance analyst helping me write a "read me" instructions tab for an Excel file.
Interview me one question at a time about the file: what it's for, who owns it, where each input comes from, the steps to update it each month, what each check means, and what usually goes wrong.
Wait for my answer before asking the next question.
When you have enough, write the instructions tab as a simple table with these sections: Purpose, Owner, Inputs (source and location), Monthly update steps (numbered), Checks and what to do if one fails, Known issues.
Use plain English a new accountant could follow on day one.</p>
</details>

<button type="button" class="paul-copy">📋 Copy prompt</button>
</blockquote>

<p>Got a file that's giving you grief? Book a free discovery call. If we go ahead with an Excel fix session, we'll sort it out together.</p>

<blockquote style="background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 2rem; margin: 2rem 0; color: #1F3A7D; border-left: 4px solid #00FF00;">
<strong>⬆️ PAUL's LevelUp</strong>
<p>Open the file you use most and run the handover test. Fix one mistake this week, then run the auditor prompt on a copy and see what else it finds.</p>
</blockquote>

<section style="background: linear-gradient(135deg, #1f3a7d 0%, #2a4fa8 100%); color: white; border-radius: 12px; padding: 2.5rem; margin: 3rem 0; text-align: center;">
  <h3 style="color: white; margin-top: 0;">Got a Spreadsheet That's Driving You Mad?</h3>

  <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; color: white;">Book a free 15-minute discovery call. If we go ahead with an Excel fix session, I'm confident we'll resolve whatever's broken, and leave you with a file the next person can actually read.</p>

  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="https://cal.com/app-coaching-xcgvda" style="background: #00FF41; color: #1f3a7d; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block;">Book a Free Discovery Call</a>
    <a href="/services" style="border: 2px solid #00FF41; color: white; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block;">Explore Coaching Services</a>
  </div>
</section>
