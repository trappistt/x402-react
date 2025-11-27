import React, { useState } from 'react';
import { X402Provider } from '../../src';

interface DocsLayoutProps {
  children: React.ReactNode;
  currentPage: 'docs' | 'components' | 'about';
  onPageChange: (page: 'docs' | 'components' | 'about') => void;
}

export function DocsLayout({ children, currentPage, onPageChange }: DocsLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <X402Provider facilitator="0x1234567890123456789012345678901234567890">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => {
                  window.location.hash = '';
                  onPageChange('docs');
                }}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity group"
              >
                <img 
                  src="/x402-logo.png" 
                  alt="x402" 
                  className="h-7 w-auto object-contain"
                />
                <span className="hidden sm:inline text-xl font-semibold text-gray-900">@micropay/react</span>
              </button>
              <nav className="hidden md:flex items-center gap-6">
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
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 bg-white shadow-sm">
            <nav className="container px-4 py-4 space-y-1">
              <button
                onClick={() => {
                  onPageChange('docs');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'docs'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Docs
              </button>
              <button
                onClick={() => {
                  onPageChange('components');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'components'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Components
              </button>
              <button
                onClick={() => {
                  onPageChange('about');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'about'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                About
              </button>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-6 lg:px-8 py-12 max-w-4xl">
          {children}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Built for the Coinbase x402 ecosystem
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  GitHub
                </a>
                <a
                  href="https://www.coinbase.com/developer-platform/products/x402"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  x402 Docs
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </X402Provider>
  );
}

