const imageMap: Record<string, string> = {
  '/cebu2.jpg': 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200',
  '/cebu-mountain.jpg': 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1200',
  // Tokyo Kiyosumi Zen Retreat images
  '/tokyo-kiyosumi-garden.jpg.JPG': '/tokyo-kiyosumi-garden.jpg.JPG',
  '/Kiyosumiteiein.jpg': '/Kiyosumiteiein.jpg',
  '/Reiganji.jpg': '/Reiganji.jpg',
  '/Kintsugi sample.jpg': '/Kintsugi sample.jpg',
};

export const getImageUrl = (imagePath: string | undefined | null): string => {
  const fallbackImage = 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg';

  if (!imagePath) return fallbackImage;

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const fullPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return imageMap[fullPath] || fullPath;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  const target = e.target as HTMLImageElement;
  target.onerror = null;
  target.src = 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg';
};
