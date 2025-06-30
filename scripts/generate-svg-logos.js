import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define pub names and their colors
const pubs = [
  { name: 'The Bull', slug: 'the-bull', color: '#1A1A1A', bgColor: '#B79C64' },
  { name: 'The Crown', slug: 'the-crown', color: '#B79C64', bgColor: '#1A1A1A' },
  { name: 'The Chaser Inn', slug: 'the-chaser-inn', color: '#1A1A1A', bgColor: '#B79C64' },
  { name: 'The Bear Inn', slug: 'the-bear-inn', color: '#B79C64', bgColor: '#1A1A1A' },
  { name: 'The Three Tuns', slug: 'the-three-tuns', color: '#1A1A1A', bgColor: '#B79C64' }
];

// Create output directory
const outputDir = path.join(__dirname, '..', 'public', 'images', 'pub-logos');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to create an SVG logo
function createSVGLogo(pub) {
  const width = 400;
  const height = 200;
  
  // Split text if too long
  const words = pub.name.split(' ');
  let textContent;
  if (words.length > 2) {
    // Two lines for longer names
    const line1 = words.slice(0, 2).join(' ');
    const line2 = words.slice(2).join(' ');
    textContent = `
      <text x="200" y="85" font-size="40" font-weight="bold">${line1}</text>
      <text x="200" y="125" font-size="40" font-weight="bold">${line2}</text>
    `;
  } else {
    // Single line
    textContent = `
      <text x="200" y="100" font-size="48" font-weight="bold">${pub.name}</text>
    `;
  }
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${pub.bgColor}"/>
  
  <!-- Outer border -->
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" 
        fill="none" stroke="${pub.color}" stroke-width="4"/>
  
  <!-- Inner border -->
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" 
        fill="none" stroke="${pub.color}" stroke-width="2"/>
  
  <!-- Main text -->
  <g fill="${pub.color}" font-family="Georgia, serif" text-anchor="middle">
    ${textContent}
    
    <!-- Establishment date -->
    <text x="200" y="165" font-size="20">EST. 1850</text>
  </g>
</svg>`;

  const filePath = path.join(outputDir, `${pub.slug}-logo.svg`);
  fs.writeFileSync(filePath, svg);
  
  console.log(`Created SVG logo for ${pub.name}: ${filePath}`);
}

// Create a generic WH Pubs logo
function createMainSVGLogo() {
  const width = 400;
  const height = 200;
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#1A1A1A"/>
  
  <!-- Outer border -->
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" 
        fill="none" stroke="#B79C64" stroke-width="4"/>
  
  <!-- Inner border -->
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" 
        fill="none" stroke="#B79C64" stroke-width="2"/>
  
  <!-- Main text -->
  <g fill="#B79C64" font-family="Georgia, serif" text-anchor="middle">
    <text x="200" y="100" font-size="60" font-weight="bold">WH PUBS</text>
    
    <!-- Tagline -->
    <text x="200" y="165" font-size="18">Traditional British Hospitality</text>
  </g>
</svg>`;

  const filePath = path.join(outputDir, 'wh-pubs-logo.svg');
  fs.writeFileSync(filePath, svg);
  
  console.log(`Created main SVG logo: ${filePath}`);
}

// Generate all logos
console.log('Generating SVG pub logos...');
pubs.forEach(createSVGLogo);
createMainSVGLogo();
console.log('\nSVG logo generation complete!');
console.log('\nYou can now:');
console.log('1. Upload these logos to Sanity Studio');
console.log('2. Replace them with professional designs later');
console.log('3. Use them as placeholders in the meantime');
console.log('\nLogos are located in: public/images/pub-logos/');