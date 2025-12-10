import { useEffect } from 'react';

export const useSEO = ({ 
  title, 
  description, 
  canonical, 
  ogImage = "/og-image.jpg",
  ogType = "website",
  keywords = "BRP Technology, mechanical engineering, digital solutions, SEO services, SMO services, digital marketing, Google Business Profile"
}) => {
  const siteUrl = "https://brptechnology.com";
  
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Update description
    updateMetaTag('description', description);
    
    // Update keywords
    updateMetaTag('keywords', keywords);
    
    // Update canonical link
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical ? `${siteUrl}${canonical}` : siteUrl;

    // Update Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', ogType);
    updateMetaTag('og:image', `${siteUrl}${ogImage}`);
    updateMetaTag('og:url', canonical ? `${siteUrl}${canonical}` : siteUrl);

    // Update Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${siteUrl}${ogImage}`);
    updateMetaTag('twitter:card', 'summary_large_image');

  }, [title, description, canonical, ogImage, ogType, keywords, siteUrl]);
};