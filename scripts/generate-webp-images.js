import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

async function generateWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`✅ Generated WebP: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Failed to generate WebP for ${inputPath}:`, error.message);
  }
}

async function generateResponsiveImages(inputPath, baseName, ext) {
  const widths = [320, 640, 768, 1024, 1280, 1536, 1920];
  
  for (const width of widths) {
    const outputName = `${baseName}-${width}w.${ext}`;
    const outputPath = path.join(path.dirname(inputPath), outputName);
    
    try {
      await sharp(inputPath)
        .resize(width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(outputPath);
      console.log(`✅ Generated ${width}w version: ${outputName}`);
      
      // Also generate WebP version
      if (ext !== 'webp') {
        const webpPath = outputPath.replace(`.${ext}`, '.webp');
        await generateWebP(outputPath, webpPath);
      }
    } catch (error) {
      console.error(`❌ Failed to generate ${width}w version:`, error.message);
    }
  }
}

async function processImagesRecursively(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processImagesRecursively(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const baseName = path.basename(entry.name, ext);
      
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        // Generate WebP version
        const webpPath = fullPath.replace(ext, '.webp');
        
        // Check if WebP already exists
        try {
          await fs.access(webpPath);
          console.log(`⏭️  WebP already exists: ${path.basename(webpPath)}`);
        } catch {
          await generateWebP(fullPath, webpPath);
        }
        
        // Generate responsive versions for hero images
        if (entry.name.includes('hero') || entry.name.includes('banner')) {
          console.log(`🖼️  Generating responsive versions for: ${entry.name}`);
          await generateResponsiveImages(fullPath, baseName, ext.slice(1));
        }
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting WebP and responsive image generation...\n');
  
  try {
    // Check if sharp is installed
    try {
      await import('sharp');
    } catch {
      console.error('❌ Sharp is not installed. Please run: npm install --save-dev sharp');
      process.exit(1);
    }
    
    await processImagesRecursively(IMAGES_DIR);
    console.log('\n✨ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error processing images:', error);
    process.exit(1);
  }
}

main();