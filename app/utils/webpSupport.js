export const checkWebPSupport = async () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return blob.type === 'image/webp';
  } catch (e) {
    return false;
  }
};
