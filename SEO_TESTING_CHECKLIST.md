# SEO Testing Checklist - After Deployment

After Netlify deploys the latest changes, verify these critical SEO elements are working correctly.

## ✅ Clean URL Routing (Critical)

### Navigation Tests
- [ ] Visit `appcoaching.io/` → Homepage displays correctly
- [ ] Visit `appcoaching.io/services` → Services page displays correctly  
- [ ] Visit `appcoaching.io/about` → About page displays correctly
- [ ] Visit `appcoaching.io/blog` → Blog page displays correctly
- [ ] Visit `appcoaching.io/contact` → Contact page displays correctly
- [ ] Click navigation links → URL updates to clean URLs (no hash)
- [ ] Browser back/forward buttons work correctly with clean URLs

### Blog Post URLs
- [ ] Visit `appcoaching.io/blog/why-i-started-appcoaching` → Post 001 displays
- [ ] Visit `appcoaching.io/blog/why-i-chose-accounting` → Post 002 displays
- [ ] Click blog post card → URL updates to `/blog/[slug]`
- [ ] Direct links to blog posts work (no page refresh needed)

## 📊 Meta Tags & SEO

### Open Graph Tags
- [ ] Visit any page, view page source → `<meta property="og:title">` present
- [ ] Blog posts have `og:image` pointing to hero image
- [ ] `og:type` is "article" for blog posts, "website" for pages
- [ ] All canonical URLs are correct (use Chrome DevTools Inspector)

### Canonical Tags
- [ ] Every page has `<link rel="canonical">` tag
- [ ] Homepage canonical: `https://appcoaching.io/`
- [ ] Services canonical: `https://appcoaching.io/services`
- [ ] Blog post canonical: `https://appcoaching.io/blog/[slug]`

### Meta Descriptions
- [ ] All pages have unique `<meta name="description">`
- [ ] Descriptions are 150-160 characters
- [ ] Descriptions include target keywords

## 🏗️ Structured Data (Schema.org)

### Google Rich Snippets Validator
1. Visit: [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter each URL and verify:

**Homepage**
- [ ] Has Organization schema
- [ ] Has Person schema for Aaron
- [ ] No validation errors

**Services Page**
- [ ] Has Service schemas for all 4 offerings
- [ ] Each service has proper description

**About Page**  
- [ ] Has detailed Person schema for Aaron
- [ ] Shows education (QUT) and affiliations
- [ ] No validation errors

**Blog Landing Page**
- [ ] Has Blog/CollectionPage schema
- [ ] Author and Publisher information present

**Individual Blog Posts** (test both 001 and 002)
- [ ] Has BlogPosting schema
- [ ] Headline, datePublished, author, description present
- [ ] Hero image is properly referenced
- [ ] No validation errors

## 📍 Google Search Console

### Sitemap & Indexing
1. Visit [Google Search Console](https://search.google.com/search-console)
2. Verify:
- [ ] Sitemap.xml submitted and indexed
- [ ] robots.txt accessible at /robots.txt
- [ ] At least 2 blog posts showing in "Pages" section
- [ ] No crawl errors for clean URL paths

### URL Inspection
Test each type of page using URL Inspection tool:
- [ ] `/` → Shows as indexed
- [ ] `/blog` → Shows as indexed  
- [ ] `/blog/001-slug` → Shows as indexed (or "Discovered not yet indexed" if new)
- [ ] `/services` → Shows as indexed
- [ ] `/about` → Shows as indexed

## 🔍 SEO Best Practices

### Content & Keywords
- [ ] Homepage includes: "AI coaching", "Excel", "Finance"
- [ ] Services page includes service keywords
- [ ] Blog posts use related keywords naturally
- [ ] Internal links point from blog posts to Services page

### Mobile Experience
- [ ] All pages load on mobile without "Enable JavaScript" error
- [ ] Navigation is mobile-friendly (hamburger menu visible)
- [ ] Blog posts readable on mobile (text size adequate)

### Performance (Optional but recommended)
- [ ] Visit [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Test homepage → Should show good scores
- [ ] Test blog post → Should show good scores
- [ ] Test mobile view → Should be performant

## 🚨 Common Issues to Check

If something isn't working:

1. **Clean URLs not working?**
   - Check that `_redirects` file exists in `/public/` folder
   - Netlify rebuild may take 1-2 minutes
   - Do a hard refresh (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)

2. **Meta tags not updating?**
   - Check browser dev tools → Elements tab → `<head>` section
   - Make sure you're viewing the published version (not localhost)
   - Blog post meta tags only show when specific post is selected

3. **Structured data validation errors?**
   - Common issue: Missing required fields in schemas
   - Use Google's Rich Snippet Tester to see detailed errors
   - Error details will show which field is missing

4. **Blog posts not accessible?**
   - Verify blog-posts.json contains all posts
   - Check that post slugs are generated correctly (lowercase, hyphenated)
   - Ensure post filenames match manifest entries

## ✨ Success Metrics

When everything is working:

- ✅ Clean URLs display in browser address bar
- ✅ Direct navigation to any page works
- ✅ Back/forward buttons work correctly
- ✅ Google Rich Results Test shows no errors
- ✅ Blog posts appear in Google Search Console
- ✅ Schema.org markup validates

## 📝 Next Steps After Testing

1. **Monitor Google Search Console daily** for the next week to:
   - Track crawl activity
   - Watch for new indexed pages
   - Check for any new errors

2. **Submit blog posts** to Google for indexing:
   - Use URL Inspection tool in GSC
   - Click "Request Indexing" for each new post

3. **Start publishing content:**
   - Plan 8-10 more blog posts for July
   - Follow the established blog template
   - Include internal links to Services page

4. **Track metrics:**
   - Monitor organic search traffic in GA4
   - Track keyword rankings using [Google Search Console](https://search.google.com/search-console)
   - Measure blog post engagement time

---

**Last Updated:** July 10, 2026  
**Contact:** aaron@appcoaching.io for SEO questions
