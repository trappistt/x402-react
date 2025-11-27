import React from 'react';

export function AboutPage() {
  return (
    <div>
      <div id="about" className="mb-16 scroll-mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          About
        </h1>
        <p className="text-base text-gray-600 leading-7">
          Learn about x402-react and the Coinbase x402 payment protocol
        </p>
      </div>

      <div className="space-y-20">
        {/* What is x402 */}
        <section id="x402-protocol" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">What is x402?</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4 text-base leading-7">
              x402 is an open payment protocol developed by Coinbase that enables instant, automatic stablecoin payments directly over HTTP. By reviving the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">HTTP 402 Payment Required</a> status code, x402 lets services monetize APIs and digital content onchain, allowing clients—both human and machine—to programmatically pay for access without accounts, sessions, or complex authentication.
            </p>
            <p className="text-gray-600 mb-4 text-base leading-7">
              With x402, you can charge per API call, AI inference, or data access using instant USDC payments with blockchain finality. The protocol uses a simple request-response flow where servers respond with payment instructions, clients send payment payloads, and facilitators handle verification and settlement—all without intermediaries or high fees.
            </p>
            <p className="text-gray-600 mb-6 text-base leading-7">
              x402 is designed for a modern internet economy, solving key limitations of legacy payment systems by reducing fees and friction, enabling micropayments and usage-based billing, and supporting machine-to-machine transactions where AI agents can autonomously pay for services.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://docs.cdp.coinbase.com/x402/welcome"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md h-11 px-6 text-sm font-semibold bg-black text-white hover:bg-gray-900 transition-colors shadow-sm hover:shadow-md"
              >
                Read x402 Documentation
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="https://www.coinbase.com/developer-platform/products/x402"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md h-11 px-6 text-sm font-semibold border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Learn about x402 Platform
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Why We Created This */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Why We Created x402-react</h2>
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bridging the Gap Between Protocol and Practice</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                While x402 provides a powerful protocol for programmatic payments, integrating it into React applications required significant boilerplate, payment state management, and error handling. We created x402-react to bridge this gap, providing developers with production-ready components and hooks that abstract away the complexity of the x402 protocol.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our goal is to make x402 payments as simple as adding a button to your React app—no need to understand the underlying HTTP 402 flow, payment payload construction, or facilitator verification. Just import a component and start accepting payments.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">The Importance of Programmatic Commerce</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The internet economy is evolving toward programmatic commerce—where APIs, AI services, and digital content can be monetized automatically without manual payment flows. x402 enables this future by allowing:
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>API services</strong> to charge per request without subscriptions or accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>AI agents</strong> to autonomously pay for API access without human intervention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Content creators</strong> to monetize digital content with instant micropayments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Microservices</strong> to implement usage-based billing with minimal infrastructure</span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                x402-react makes this accessible to React developers, enabling them to participate in the programmatic commerce revolution with just a few lines of code.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Solving Real-World Payment Challenges</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Traditional payment systems come with significant limitations that x402 and x402-react address:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Legacy Systems</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• High transaction fees</li>
                    <li>• Complex setup and integration</li>
                    <li>• Requires accounts and authentication</li>
                    <li>• Not suitable for micropayments</li>
                    <li>• Manual payment flows</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">x402 + x402-react</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Fee-free USDC payments (via Coinbase facilitator)</li>
                    <li>• Simple React component integration</li>
                    <li>• No accounts or sessions required</li>
                    <li>• Optimized for micropayments</li>
                    <li>• Fully programmatic and automatic</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                By providing a React-first library, we're making it easier for developers to build the next generation of monetized applications—from AI-powered services to pay-per-use APIs—without the friction of traditional payment systems.
              </p>
            </div>
          </div>
        </section>

        {/* Why x402-react */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Why x402-react?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Early Adoption</h3>
              </div>
              <p className="text-gray-600">
                Built specifically for Coinbase x402, making it easy to integrate micropayments into your React applications.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Developer Experience</h3>
              </div>
              <p className="text-gray-600">
                Simple API, full TypeScript support, and comprehensive documentation. Get started in minutes, not hours.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Micropayment UX</h3>
              </div>
              <p className="text-gray-600">
                Optimized components and patterns specifically designed for small, frequent payments with minimal friction.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Web3 Integration</h3>
              </div>
              <p className="text-gray-600">
                Seamless blockchain payment handling with support for multiple networks (Base, Solana) and automatic transaction management.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">One-click payment buttons with customizable variants</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Programmatic payment handling with hooks</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Payment status tracking and history management</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Automatic retry logic with exponential backoff</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Network switching (Base, Solana)</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Full TypeScript support with comprehensive types</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Utility functions for payment operations</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Payment modal component with network and asset selection</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Visual status indicators and payment receipts</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Full x402 protocol implementation with facilitator integration</span>
            </div>
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Payment proof handling and automatic retry logic</span>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Getting Started</h2>
          <p className="text-gray-600 mb-6 text-base leading-7">
            Ready to start accepting micropayments? Check out our documentation to get started.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => window.location.hash = ''}
              className="inline-flex items-center justify-center rounded-md h-11 px-6 text-sm font-semibold bg-black text-white hover:bg-gray-900 transition-colors shadow-sm hover:shadow-md"
            >
              View Docs
            </button>
            <button
              onClick={() => window.location.hash = '#components'}
              className="inline-flex items-center justify-center rounded-md h-11 px-6 text-sm font-semibold border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Explore Components
            </button>
          </div>
        </section>

        {/* License */}
        <section className="scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">License</h2>
          <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <p className="text-gray-600 text-base leading-7">
              x402-react is open source and available under the <span className="font-medium text-gray-900">MIT License</span>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

