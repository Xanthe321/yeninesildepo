import imageCompression from 'browser-image-compression';

export interface ClientCompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string;
}

/**
 * Compress image on client-side before upload
 * This reduces upload time and server load
 */
export async function compressImage(
  file: File,
  options: ClientCompressionOptions = {}
): Promise<File> {
  const {
    maxSizeMB = 2, // Maximum file size in MB
    maxWidthOrHeight = 1920, // Max width or height
    useWebWorker = true,
    fileType = 'image/webp',
  } = options;

  try {
    const compressionOptions = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker,
      fileType,
      initialQuality: 0.85,
    };

    const compressedFile = await imageCompression(file, compressionOptions);

    // Log compression stats
    const originalSize = file.size;
    const compressedSize = compressedFile.size;
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    console.log(
      `Client-side compression: ${(originalSize / 1024).toFixed(2)}KB → ${(compressedSize / 1024).toFixed(2)}KB (${savings}% reduction)`
    );

    return compressedFile;
  } catch (error) {
    console.error('Client-side compression error:', error);
    // If compression fails, return original file
    return file;
  }
}

/**
 * Compress multiple images
 */
export async function compressImages(
  files: File[],
  options?: ClientCompressionOptions
): Promise<File[]> {
  const compressedFiles: File[] = [];

  for (const file of files) {
    if (file.type.startsWith('image/')) {
      const compressed = await compressImage(file, options);
      compressedFiles.push(compressed);
    } else {
      compressedFiles.push(file);
    }
  }

  return compressedFiles;
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Get file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
