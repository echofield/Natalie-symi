#!/usr/bin/env node

/**
 * build-partners.js
 *
 * Generates static HTML files for MAISON partnership and catalogue editions.
 *
 * Usage:
 *   node maison/build-partners.js
 *
 * This script:
 * 1. Reads partner data from maison/partners/*.json
 * 2. Triggers Next.js static export
 * 3. Copies and renames HTML files to maison/ directory
 *
 * Output:
 *   maison/maison-natali.html
 *   maison/maison-hegetfunds.html
 *   maison/maison-catalogue.html
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PARTNERS_DIR = path.join(__dirname, 'partners');
const OUTPUT_DIR = path.join(__dirname);
const OUT_DIR = path.join(__dirname, '..', 'out');

console.log('\n🏗️  MAISON Static Build\n');

// Read all partner JSON files
function getPartners() {
  const files = fs.readdirSync(PARTNERS_DIR);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const slug = file.replace('.json', '');
      const data = JSON.parse(fs.readFileSync(path.join(PARTNERS_DIR, file), 'utf-8'));
      return { slug, data };
    });
}

// Build Next.js static export
function buildStatic() {
  console.log('📦 Building Next.js static export...\n');
  try {
    execSync('npm run build', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    console.log('\n✅ Static build complete\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Copy and rename HTML files
function copyHTMLFiles(partners) {
  console.log('📄 Copying HTML files...\n');

  // Copy partnership editions
  partners.forEach(({ slug }) => {
    const sourcePath = path.join(OUT_DIR, 'partnership', slug, 'index.html');
    const destPath = path.join(OUTPUT_DIR, `maison-${slug}.html`);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`   ✓ maison-${slug}.html`);
    } else {
      console.warn(`   ⚠ Warning: ${sourcePath} not found`);
    }
  });

  // Copy catalogue edition
  const catalogueSource = path.join(OUT_DIR, 'catalogue', 'index.html');
  const catalogueDest = path.join(OUTPUT_DIR, 'maison-catalogue.html');

  if (fs.existsSync(catalogueSource)) {
    fs.copyFileSync(catalogueSource, catalogueDest);
    console.log('   ✓ maison-catalogue.html');
  } else {
    console.warn(`   ⚠ Warning: ${catalogueSource} not found`);
  }

  console.log('\n✅ HTML files copied to maison/\n');
}

// Main execution
function main() {
  const partners = getPartners();

  console.log(`Found ${partners.length} partner(s):`);
  partners.forEach(({ slug, data }) => {
    console.log(`   • ${data.name} (${slug})`);
  });
  console.log('');

  buildStatic();
  copyHTMLFiles(partners);

  console.log('✨ Done! Static HTML files ready in maison/\n');
  console.log('Note: The HTML files reference assets in the /out/_next directory.');
  console.log('For deployment, upload both maison/*.html and the out/_next/ folder.\n');
  console.log('Next steps:');
  console.log('   • Test locally: npm run dev, visit /partnership/natali');
  console.log('   • Deploy: upload maison/*.html + out/_next/ to hosting\n');
}

main();
