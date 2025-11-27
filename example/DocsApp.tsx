import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { DocsPage } from './pages/DocsPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { AboutPage } from './pages/AboutPage';
import '../src/styles.css';

export default function DocsApp() {
  const getInitialPage = (): 'docs' | 'components' | 'about' => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#components') return 'components';
      if (hash === '#about') return 'about';
    }
    return 'docs';
  };

  const [currentPage, setCurrentPage] = useState<'docs' | 'components' | 'about'>(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#components') setCurrentPage('components');
      else if (hash === '#about') setCurrentPage('about');
      else setCurrentPage('docs');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: 'docs' | 'components' | 'about') => {
    setCurrentPage(page);
    const hash = page === 'docs' ? '' : `#${page}`;
    window.history.pushState(null, '', hash || window.location.pathname);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'docs':
        return <DocsPage />;
      case 'components':
        return <ComponentsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <DocsPage />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={handlePageChange}>
      {renderPage()}
    </DashboardLayout>
  );
}

