import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public/images/products');

async function optimizeImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.PNG') || file.endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.[Pp][Nn][Gg]$/, '.webp'));
      
      console.log(`Optimizing ${file}...`);
      await sharp(inputPath)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Created ${outputPath}`);
    }
  }
}

optimizeImages().catch(console.error);
