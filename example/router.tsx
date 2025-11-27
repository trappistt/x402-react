import React from 'react';
import App from './App';
import Showcase from './Showcase';
import DocsApp from './DocsApp';

export default function Router() {
  // Check URL to determine which component to show
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.includes('showcase') || path.includes('showcase.html')) {
      return <Showcase />;
    }
    if (path.includes('docs') || path.includes('components') || path.includes('about')) {
      return <DocsApp />;
    }
  }
  
  // Default to Docs App
  return <DocsApp />;
}

