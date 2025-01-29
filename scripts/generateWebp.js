const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath, outputPath, originalSize) {
  // Попробуем разные варианты сжатия
  const attempts = [
    {
      quality: 85,
      effort: 6,
      smartSubsample: true,
      mixed: true
    },
    {
      quality: 90,
      nearLossless: true,
      effort: 6,
      smartSubsample: true
    },
    {
      quality: 95,
      effort: 6,
      smartSubsample: true
    }
  ];

  let bestSize = Infinity;
  let bestConfig = null;
  let bestOutputPath = null;

  for (let i = 0; i < attempts.length; i++) {
    const tempOutputPath = `${outputPath}.temp${i}`;
    try {
      await sharp(inputPath)
        .webp(attempts[i])
        .toFile(tempOutputPath);

      const stat = await fs.stat(tempOutputPath);
      if (stat.size < bestSize) {
        bestSize = stat.size;
        bestConfig = attempts[i];
        if (bestOutputPath) {
          await fs.unlink(bestOutputPath);
        }
        bestOutputPath = tempOutputPath;
      } else {
        await fs.unlink(tempOutputPath);
      }
    } catch (error) {
      console.error(`Error during optimization attempt ${i}:`, error);
    }
  }

  if (bestOutputPath && bestSize < originalSize) {
    await fs.rename(bestOutputPath, outputPath);
    return bestSize;
  } else if (bestOutputPath) {
    // Если все варианты больше оригинала, используем оригинальный формат
    await fs.unlink(bestOutputPath);
    const originalExt = path.extname(inputPath).toLowerCase();
    await fs.copyFile(inputPath, outputPath.replace('.webp', originalExt));
    return originalSize;
  }

  return originalSize;
}

async function convertToWebP(directory) {
  try {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        await convertToWebP(filePath);
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const originalSize = stat.size;
        
        const newSize = await optimizeImage(filePath, outputPath, originalSize);
        const compressionRatio = ((originalSize - newSize) / originalSize * 100).toFixed(2);
        const useWebP = newSize < originalSize;
        const originalExt = path.extname(file).toLowerCase();
        
        console.log(
          `Converted ${file} (${originalExt}) to ${useWebP ? 'WebP' : `keeping ${originalExt}`}. ` +
          `Size ${compressionRatio >= 0 ? 'reduction' : 'increase'}: ${Math.abs(compressionRatio)}% ` +
          `(${(originalSize/1024).toFixed(2)}KB -> ${(newSize/1024).toFixed(2)}KB)`
        );
      }
    }
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

// Start conversion from public/images directory
convertToWebP(path.join(process.cwd(), 'public', 'images'));
