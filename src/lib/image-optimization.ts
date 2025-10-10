import sharp from 'sharp';

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
}

/**
 * Optimize image using sharp
 * Resizes and compresses the image while maintaining aspect ratio
 */
export async function optimizeImage(
  buffer: Buffer,
  options: ImageOptimizationOptions = {}
): Promise<Buffer> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 80,
    format = 'webp',
  } = options;

  try {
    let pipeline = sharp(buffer);

    // Get image metadata to check current dimensions
    const metadata = await pipeline.metadata();

    // Only resize if image is larger than max dimensions
    if (metadata.width && metadata.width > maxWidth || metadata.height && metadata.height > maxHeight) {
      pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Convert to specified format and compress
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ quality });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
        break;
      case 'png':
        pipeline = pipeline.png({ quality, compressionLevel: 9 });
        break;
    }

    const optimizedBuffer = await pipeline.toBuffer();

    // Log compression stats
    const originalSize = buffer.length;
    const optimizedSize = optimizedBuffer.length;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

    console.log(`Image optimized: ${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB (${savings}% reduction)`);

    return optimizedBuffer;
  } catch (error) {
    console.error('Image optimization error:', error);
    // If optimization fails, return original buffer
    return buffer;
  }
}

/**
 * Get optimized file extension based on format
 */
export function getOptimizedExtension(originalFilename: string, format: 'jpeg' | 'webp' | 'png' = 'webp'): string {
  const nameWithoutExt = originalFilename.substring(0, originalFilename.lastIndexOf('.')) || originalFilename;

  const extensions: Record<string, string> = {
    jpeg: '.jpg',
    webp: '.webp',
    png: '.png',
  };

  return nameWithoutExt + extensions[format];
}

/**
 * Optimize image for thumbnails (smaller size, lower quality)
 */
export async function optimizeImageThumbnail(buffer: Buffer): Promise<Buffer> {
  return optimizeImage(buffer, {
    maxWidth: 640,
    maxHeight: 480,
    quality: 70,
    format: 'webp',
  });
}

/**
 * Optimize image for full size display
 */
export async function optimizeImageFull(buffer: Buffer): Promise<Buffer> {
  return optimizeImage(buffer, {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 85,
    format: 'webp',
  });
}
