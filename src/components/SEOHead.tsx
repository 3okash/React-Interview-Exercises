import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

/**
 * SEOHead component for managing dynamic meta tags
 * Updates document title and meta tags based on the current page
 */
export default function SEOHead({
  title = 'React Interview Exercises - 26 TypeScript & React Practice Examples',
  description = 'Master React interview questions with 26 interactive exercises covering state management, hooks, forms, and real-world app patterns. Built with TypeScript and Tailwind CSS.',
  keywords = 'React, TypeScript, Interview, Exercises, Practice, Tutorial, Hooks, State Management, Forms',
  ogTitle,
  ogDescription,
  canonical = 'https://3okash.github.io/React-Interview-Exercises/'
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (selector: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, selector.replace(/meta\[name="(.*?)"\]/, '$1').replace(/meta\[property="(.*?)"\]/, '$1'));
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update primary meta tags
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', keywords);
    updateMetaTag('meta[name="title"]', title);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', ogTitle || title, 'property');
    updateMetaTag('meta[property="og:description"]', ogDescription || description, 'property');
    updateMetaTag('meta[property="og:url"]', canonical, 'property');

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', ogTitle || title);
    updateMetaTag('meta[name="twitter:description"]', ogDescription || description);
    updateMetaTag('meta[name="twitter:url"]', canonical);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
  }, [title, description, keywords, ogTitle, ogDescription, canonical]);

  return null; // This component doesn't render anything
}
