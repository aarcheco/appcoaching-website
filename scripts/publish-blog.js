#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '../public/blog');
const MANIFEST_PATH = path.join(__dirname, '../public/blog-posts.json');
const MANIFEST_ONLY = process.argv.includes('--manifest-only');

// IMPORTANT: This must stay byte-for-byte identical to generateSlug() in src/App.jsx.
// The manifest's `slug` field is the single source of truth for blog post URLs —
// App.jsx consumes it directly instead of recalculating, and sitemap.xml should be
// generated from these same values, so the three never drift out of sync again.
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

console.log('📝 Generating blog manifest...');

try {
  // Read all markdown files from blog directory (exclude template files)
  const files = fs.readdirSync(BLOG_DIR).filter(file =>
    file.endsWith('.md') &&
    !file.includes('TEMPLATE') &&
    !file.includes('template')
  );

  if (files.length === 0) {
    console.log('⚠️  No markdown files found in public/blog/');
    process.exit(0);
  }

  // Extract metadata from each post
  const manifest = files.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: bodyContent } = matter(content);

    return {
      id: data.id,
      filename: file,
      title: data.title,
      slug: generateSlug(data.title),
      date: data.date,
      excerpt: data.excerpt,
      heroImage: data.heroImage
    };
  });

  // Sort by date descending
  manifest.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Write manifest file
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`✅ Manifest generated: ${manifest.length} post(s) found`);

  // Only commit and push if not in manifest-only mode
  if (!MANIFEST_ONLY) {
    console.log('\n📤 Committing to Git...');

    try {
      execSync('git add public/blog public/blog-posts.json', { stdio: 'inherit' });
      execSync('git commit -m "📝 Publish new blog posts"', { stdio: 'inherit' });

      console.log('\n🚀 Pushing to GitHub...');
      execSync('git push origin main', { stdio: 'inherit' });

      console.log('\n✨ Done! Netlify will auto-deploy in a few moments.');
    } catch (gitError) {
      console.log('\n⚠️  Git operation warning:');
      console.log('   Make sure you\'re in the repo directory and have git configured.');
      console.log('   You can manually run: git add public/blog public/blog-posts.json && git commit -m "📝 Publish blog posts" && git push origin main');
      process.exit(1);
    }
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
