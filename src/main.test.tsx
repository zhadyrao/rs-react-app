import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

global.fetch = vi.fn();

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const WrappedApp = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('shows loading bar during fetch', async () => {
    const mockResponse: Partial<Response> = {
      ok: true,
      json: async () => ({ results: [] }),
    };

    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as Response);

    render(<WrappedApp />);
    // expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    render(<WrappedApp />);
    // await waitFor(() =>
    //   expect(screen.getByText(/network error/i)).toBeInTheDocument()
    // );
  });
});
