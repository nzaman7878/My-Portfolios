import React from 'react';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-[var(--color-surface)] border-thin rounded-xl m-4">
      <div className="flex flex-col items-center gap-6 max-w-lg">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-serif font-bold text-[var(--color-primary-text)]">Something went wrong</h2>
          <p className="text-[var(--color-secondary-text)] font-light">
            We encountered an unexpected error while loading this section.
          </p>
        </div>

        <div className="w-full text-left bg-[var(--color-background)] p-4 rounded border border-[var(--color-border-custom)] overflow-x-auto">
          <pre className="text-red-400 text-xs font-mono">
            {error.message}
          </pre>
        </div>

        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-6 py-3 bg-[var(--color-accent-secondary)] text-white font-medium rounded hover:bg-opacity-90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
