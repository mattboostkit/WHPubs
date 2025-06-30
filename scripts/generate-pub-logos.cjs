const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

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

// Function to create a logo
function createLogo(pub) {
  const width = 400;
  const height = 200;
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = pub.bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Border
  ctx.strokeStyle = pub.color;
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, width - 20, height - 20);
  
  // Inner border
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, height - 40);
  
  // Text
  ctx.fillStyle = pub.color;
  ctx.font = 'bold 48px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Split text if too long
  const words = pub.name.split(' ');
  if (words.length > 2) {
    // Two lines for longer names
    ctx.font = 'bold 40px Georgia, serif';
    const line1 = words.slice(0, 2).join(' ');
    const line2 = words.slice(2).join(' ');
    ctx.fillText(line1, width / 2, height / 2 - 25);
    ctx.fillText(line2, width / 2, height / 2 + 25);
  } else {
    // Single line
    ctx.fillText(pub.name, width / 2, height / 2);
  }
  
  // Add decorative elements
  ctx.font = '20px Georgia, serif';
  ctx.fillText('EST. 1850', width / 2, height - 35);
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(outputDir, `${pub.slug}-logo.png`);
  fs.writeFileSync(filePath, buffer);
  
  console.log(`Created logo for ${pub.name}: ${filePath}`);
}

// Create a generic WH Pubs logo
function createMainLogo() {
  const width = 400;
  const height = 200;
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(0, 0, width, height);
  
  // Border
  ctx.strokeStyle = '#B79C64';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, width - 20, height - 20);
  
  // Inner border
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, height - 40);
  
  // Text
  ctx.fillStyle = '#B79C64';
  ctx.font = 'bold 60px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WH PUBS', width / 2, height / 2);
  
  // Tagline
  ctx.font = '18px Georgia, serif';
  ctx.fillText('Traditional British Hospitality', width / 2, height - 35);
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(outputDir, 'wh-pubs-logo.png');
  fs.writeFileSync(filePath, buffer);
  
  console.log(`Created main logo: ${filePath}`);
}

// Generate all logos
console.log('Generating pub logos...');
pubs.forEach(createLogo);
createMainLogo();
console.log('Logo generation complete!');