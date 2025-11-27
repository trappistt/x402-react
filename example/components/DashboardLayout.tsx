import React, { useState, useEffect } from 'react';
import { X402Provider } from '../../src';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: 'docs' | 'components' | 'about';
  onPageChange: (page: 'docs' | 'components' | 'about') => void;
}

export function DashboardLayout({ children, currentPage, onPageChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  type NavItem = { name: string; page: 'docs' | 'components' | 'about'; sectionId: string | null };
  type NavSection = { title: string; items: NavItem[] };

  const navigation: NavSection[] = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Introduction', page: 'docs' as const, sectionId: 'introduction' },
        { name: 'Installation', page: 'docs' as const, sectionId: 'installation' },
        { name: 'Quick Start', page: 'docs' as const, sectionId: 'quick-start' },
      ],
    },
    {
      title: 'Core Components',
      items: [
        { name: 'X402Provider', page: 'components' as const, sectionId: null },
        { name: 'X402Button', page: 'components' as const, sectionId: 'button-variants' },
        { name: 'X402PaymentModal', page: 'components' as const, sectionId: 'payment-modal' },
      ],
    },
    {
      title: 'UI Components',
      items: [
        { name: 'PaymentStatusIndicator', page: 'components' as const, sectionId: 'status-indicator' },
        { name: 'PaymentReceipt', page: 'components' as const, sectionId: 'payment-receipt' },
        { name: 'AssetSelector', page: 'components' as const, sectionId: 'asset-selector' },
      ],
    },
    {
      title: 'Hooks & Utilities',
      items: [
        { name: 'useX402Payment', page: 'components' as const, sectionId: 'programmatic-payments' },
        { name: 'Payment History', page: 'components' as const, sectionId: 'payment-history' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { name: 'About', page: 'about' as const, sectionId: 'about' },
        { name: 'x402 Protocol', page: 'about' as const, sectionId: 'x402-protocol' },
      ],
    },
  ];

  const scrollToSection = (sectionId: string | null) => {
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Scroll to top if no section ID
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Initialize active item based on current page
  useEffect(() => {
    // When page changes, set the first item of that page as active if no item is currently active
    // or if the current active item doesn't belong to the new page
    const currentPageItems = navigation
      .flatMap(section => section.items)
      .filter(item => item.page === currentPage);
    
    const currentActiveItem = currentPageItems.find(item => item.name === activeItem);
    
    if (!currentActiveItem && currentPageItems.length > 0) {
      // Set first item of current page as active
      setActiveItem(currentPageItems[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <X402Provider facilitator="0x1234567890123456789012345678901234567890">
      <div className="min-h-screen bg-gray-50">
        {/* Top Header */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    // Mobile: toggle overlay menu
                    const newState = !mobileMenuOpen;
                    setMobileMenuOpen(newState);
                    setSidebarOpen(newState);
                  } else {
                    // Desktop: toggle sidebar
                    setSidebarOpen(!sidebarOpen);
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {sidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <button
                onClick={() => {
                  window.location.hash = '';
                  onPageChange('docs');
                }}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
              >
                <img 
                  src="/x402-logo.png" 
                  alt="x402" 
                  className="h-8 w-auto object-contain"
                />
                <div className="hidden sm:flex items-center gap-1">
                  <span className="text-sm text-gray-400 group-hover:text-gray-600">/</span>
                  <span className="text-lg font-semibold text-gray-900">x402-react</span>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <nav className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => onPageChange('docs')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'docs'
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Docs
                </button>
                <button
                  onClick={() => onPageChange('components')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'components'
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Components
                </button>
                <button
                  onClick={() => onPageChange('about')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'about'
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  About
                </button>
              </nav>
              <a
                href="https://github.com/trappistt/x402-react"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        <div className="flex relative">
          {/* Mobile Overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => {
                setMobileMenuOpen(false);
                setSidebarOpen(false);
              }}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? 'w-64' : 'w-0'
            } transition-all duration-300 border-r border-gray-200 bg-white ${
              mobileMenuOpen 
                ? 'fixed inset-y-0 left-0 z-50 shadow-xl lg:fixed lg:top-16 lg:left-0 lg:z-auto lg:shadow-none' 
                : 'lg:fixed lg:top-16 lg:left-0'
            }`}
            style={{
              height: mobileMenuOpen ? '100vh' : 'calc(100vh - 4rem)',
            }}
          >
            <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto p-4">
              {/* Search */}
              {sidebarOpen && (
                <div className="mb-6">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400 pointer-events-none">
                      <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300">⌘</kbd>
                      <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300">K</kbd>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              {sidebarOpen && (
                <nav className="space-y-6">
                  {navigation.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.items
                          .filter((item) =>
                            searchQuery
                              ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
                              : true
                          )
                          .map((item) => {
                            // Item is active only if it's the specific active item AND on the correct page
                            const isActive = activeItem === item.name && currentPage === item.page;
                            
                            return (
                              <li key={item.name}>
                                <button
                                  onClick={() => {
                                    setActiveItem(item.name);
                                    onPageChange(item.page);
                                    setMobileMenuOpen(false);
                                    
                                    // Set hash for page navigation
                                    if (item.page === 'docs') {
                                      window.location.hash = '';
                                    } else if (item.page === 'components') {
                                      window.location.hash = '#components';
                                    } else if (item.page === 'about') {
                                      window.location.hash = '#about';
                                    }
                                    
                                    // Scroll to section after page change
                                    scrollToSection(item.sectionId);
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                                    isActive
                                      ? 'bg-gray-100 text-gray-900 font-medium shadow-sm'
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-normal'
                                  }`}
                                >
                                  {item.name}
                                </button>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ))}
                  {searchQuery && navigation.every((section) =>
                    section.items.filter((item) =>
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0
                  ) && (
                    <div className="text-center py-8 text-sm text-gray-500">
                      No results found
                    </div>
                  )}
                </nav>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className={`flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : ''
          }`}>
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
              {children}
            </div>
          </main>
        </div>
      </div>
    </X402Provider>
  );
}

