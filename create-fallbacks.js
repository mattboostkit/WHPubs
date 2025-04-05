const fs = require('fs');
const { createCanvas } = require('canvas');

// Function to create a fallback image
function createFallbackImage(width, height, text, filename) {
  console.log(`Creating ${filename}...`);
  
  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, width, height);
  
  // Draw border
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, width - 8, height - 8);
  
  // Draw text
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WH PUBS', width / 2, height / 2 - 30);
  
  ctx.font = '24px Arial';
  ctx.fillText(text, width / 2, height / 2 + 30);
  
  // Save to file
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(`public/images/${filename}`, buffer);
  
  console.log(`Created ${filename}`);
}

// Create fallback images
try {
  createFallbackImage(800, 400, 'Menu Image', 'menu-fallback.jpg');
  createFallbackImage(800, 400, 'Event Image', 'event-fallback.jpg');
  createFallbackImage(800, 400, 'Blog Thumbnail', 'blog-fallback.jpg');
  createFallbackImage(1200, 600, 'Blog Detail Image', 'blog-detail-fallback.jpg');
  createFallbackImage(800, 400, 'Content Image', 'content-fallback.jpg');
  console.log('All fallback images created successfully!');
} catch (error) {
  console.error('Error creating fallback images:', error);
  
  // Alternative approach - create simple colored rectangles
  console.log('Trying alternative approach...');
  
  const simpleCanvas = createCanvas(800, 400);
  const ctx = simpleCanvas.getContext('2d');
  
  // Menu fallback
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, 800, 400);
  fs.writeFileSync('public/images/menu-fallback.jpg', simpleCanvas.toBuffer('image/jpeg'));
  
  // Event fallback
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, 800, 400);
  fs.writeFileSync('public/images/event-fallback.jpg', simpleCanvas.toBuffer('image/jpeg'));
  
  // Blog fallbacks
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, 800, 400);
  fs.writeFileSync('public/images/blog-fallback.jpg', simpleCanvas.toBuffer('image/jpeg'));
  fs.writeFileSync('public/images/content-fallback.jpg', simpleCanvas.toBuffer('image/jpeg'));
  
  const largeCanvas = createCanvas(1200, 600);
  const lgCtx = largeCanvas.getContext('2d');
  lgCtx.fillStyle = '#94a3b8';
  lgCtx.fillRect(0, 0, 1200, 600);
  fs.writeFileSync('public/images/blog-detail-fallback.jpg', largeCanvas.toBuffer('image/jpeg'));
  
  console.log('Created simple fallback images');
}
