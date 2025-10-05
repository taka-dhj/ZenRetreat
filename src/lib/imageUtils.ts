export const getImageUrl = (imagePath: string | undefined | null): string => {
  const fallbackImage = 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg';

  if (!imagePath) return fallbackImage;

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  const target = e.target as HTMLImageElement;
  if (target.onerror) {
    target.onerror = null;
    target.src = 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg';
  }
};
