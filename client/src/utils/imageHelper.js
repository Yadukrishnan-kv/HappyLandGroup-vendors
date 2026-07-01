export const DEFAULT_TOUR_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%"><rect width="100%" height="100%" fill="%23050b18"/><circle cx="400" cy="250" r="120" fill="rgba(23, 51, 232, 0.15)"/><circle cx="400" cy="250" r="30" stroke="%23E5B52B" stroke-width="2" fill="none"/><path d="M400 200 L400 300 M350 250 L450 250" stroke="%23E5B52B" stroke-width="2"/><text x="400" y="340" fill="%23D6E2FF" font-family="sans-serif" font-size="18" text-anchor="middle" font-style="italic" letter-spacing="2">Happy Land Group Ventures</text><text x="400" y="370" fill="%238FA3C7" font-family="sans-serif" font-size="11" text-anchor="middle" letter-spacing="4">LUXURY EXCURSION</text></svg>';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_TOUR_IMAGE;
  if (imagePath.startsWith('data:') || imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // If it's a relative path from the backend uploads folder
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
  const backendBase = apiUrl.replace(/\/api\/?$/, '');
  
  if (imagePath.startsWith('/uploads/') || imagePath.startsWith('uploads/')) {
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    // Use /api/uploads so reverse proxy routes it to Express
    return `${backendBase}/api${cleanPath}`;
  }
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${backendBase}/api${cleanPath}`;
};

export const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = DEFAULT_TOUR_IMAGE;
};
