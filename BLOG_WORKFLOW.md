# Blog Publishing Workflow

## For GRAM (Content Agent)

### Where to Save Blog Posts
Save finalized blog posts to:
```
/Users/aaronpacheco/Library/CloudStorage/GoogleDrive-aaron.appcoaching@gmail.com/My Drive/APP Coaching/04_Operations/appcoaching-website/public/blog/
```

Or in short: `appcoaching-website/public/blog/`

### File Naming Convention
Name files with ID prefix + title:
- `001_why_i_started_appcoaching.md`
- `002_excel_formulas_that_changed_my_life.md`
- `003_understanding_your_pl.md`

Format: `NNN_kebab-case-title.md` (where NNN is 001, 002, 003, etc.)

### Required Front Matter
Every blog post MUST start with front matter:

```markdown
---
title: Your Post Title Here
date: 2026-07-08
id: 001
excerpt: A one-sentence summary of what this post is about (appears in blog list)
heroImage: https://images.unsplash.com/photo-xxxxx?w=1200&q=80
---
```

### PAUL's Quick Read (Required)
After the hero image, ALWAYS include a quick read summary (time-poor people scan this first):

```markdown
## <span style="color: #00FF00;">📖 PAUL's Quick Read</span>

One paragraph (30-50 words) summarizing the entire post. Include the main takeaway and why it matters. Use styling for key concepts.

---
```

**Format:**
- One paragraph only
- 30-50 words (rough guide)
- Highlight key phrases/concepts
- No bullet points in the quick read
- Use HTML styling for emphasis (see examples below)

### Font Rendering (Important)

**Note:** Markdown previews may show generic fonts, but all blog posts render with:
- **Headers (h1, h2, h3):** Poppins, weight 700-800
- **Body text:** Inter, weight 400
- **Letter-spacing:** Applied to headers for visual consistency

This matches the APP Coaching homepage fonts exactly. Don't worry if your preview looks like Arial—the live website will have proper brand fonts.

### Styling: Emphasis (IMPORTANT - Pure Markdown Only)

**DO NOT use HTML tags** (`<mark>`, `<u>`, `<span>`, etc.). Use **only pure markdown syntax**:

**For emphasis/highlight key phrases:**
```markdown
**key phrase here** — use bold for important concepts
```

**For italics/secondary emphasis:**
```markdown
*self-sufficient* — use italics for supporting ideas
```

**For special sections (PAUL's Quick Read, callouts):**
```markdown
> **Section Title**
> 
> Your content here. Blockquotes automatically render with lime green container styling.
```

**Examples:**
- ✅ CORRECT: `**working together** to uplift your knowledge`
- ❌ WRONG: `<mark style="...">working together</mark> to uplift your knowledge`
- ✅ CORRECT: Use *italics* for emphasis
- ❌ WRONG: Use `<u>underlines</u>` — this breaks rendering

### Example Post
```markdown
---
title: Why I Started APP Coaching
date: 2026-07-08
id: 001
excerpt: How I discovered the problem of inefficient processes and why I'm solving it
heroImage: https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80
---

![Descriptive alt text](https://images.unsplash.com/photo-xxxxx)

> **📖 PAUL's Quick Read**
>
> This is where the one-paragraph summary goes. Include **key concepts** and emphasize important phrases that summarize the post. Keep it to 3-4 sentences max.

---

## Section Heading

Here's the actual post content. Use **bold** for emphasis and *italics* for secondary emphasis. Keep all text as pure markdown — no HTML tags.

## Another Section

**Key insight:** This is how you highlight important concepts in pure markdown. Much cleaner and renders consistently!
```

### What GRAM Should Do
1. Create/finalize blog post content with Aaron
2. Add front matter (title, date, id, excerpt)
3. Save to `public/blog/` folder with proper naming
4. Tell Aaron: "Blog post ready to publish"

That's it! Everything else is automatic.

---

## For Aaron (Publishing)

### Publishing a Blog Post

Once GRAM saves the post to `public/blog/`:

**Step 1:** Navigate to the repo folder
```bash
cd ~/[your-path-to]/appcoaching-website
```

**Step 2:** Run the publish command
```bash
npm run publish-blog
```

That's it! The script will:
- ✅ Auto-generate the blog manifest (`blog-posts.json`)
- ✅ Commit changes to Git
- ✅ Push to GitHub
- ✅ Netlify auto-deploys → live immediately

### What Happens Behind the Scenes

1. **Manifest Generation**: Script scans `public/blog/` and reads all markdown front matter
2. **Sorting**: Posts sorted by date (newest first)
3. **Git Commit**: Changes staged and committed with message "📝 Publish new blog posts"
4. **GitHub Push**: Commits pushed to `main` branch
5. **Netlify Deploy**: Automatically detects changes and deploys

### Local Preview

Before publishing, you can preview locally:
```bash
npm start
```

Navigate to Blog page → your post appears with live styling/formatting.

### If Git Push Fails

If `npm run publish-blog` shows git errors:
1. Make sure you're in the repo directory
2. Make sure you have git configured (`git config --global user.email`, etc.)
3. Manually run: `git add public/blog public/blog-posts.json && git commit -m "📝 Publish blog posts" && git push origin main`

---

## Workflow Summary

```
GRAM writes post → Saves to public/blog/ → Aaron runs npm run publish-blog
                                              ↓
                                        Git commit & push
                                              ↓
                                        GitHub receives files
                                              ↓
                                        Netlify auto-deploys
                                              ↓
                                        Blog post LIVE
```

## File Structure

```
appcoaching-website/
├── public/
│   ├── blog/                 ← GRAM saves posts here
│   │   ├── 001_why_i_started_appcoaching.md
│   │   ├── 002_excel_formulas.md
│   │   └── 003_understanding_your_pl.md
│   └── blog-posts.json       ← Auto-generated manifest
├── scripts/
│   └── publish-blog.js       ← Publishing script
└── package.json
```

---

## FAQ

**Q: Can I edit a post after publishing?**
A: Yes! Edit the markdown file in `public/blog/`, then run `npm run publish-blog` again.

**Q: What if I want to change the post ID?**
A: Update the `id:` field in the front matter, save, run `npm run publish-blog`.

**Q: How many posts can I have?**
A: As many as you want! The system auto-discovers all markdown files.

**Q: What if I accidentally delete a post?**
A: The markdown file is in Google Drive history, and Git has all versions. No data loss.

**Q: Can GRAM publish directly?**
A: No, only Aaron runs `npm run publish-blog` (requires git/GitHub access). GRAM just saves the post.
