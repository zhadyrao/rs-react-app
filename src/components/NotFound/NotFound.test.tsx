import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';
import { describe, it, expect } from 'vitest';

describe('NotFound component', () => {
  it('renders 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('renders a link to go back home', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /go back home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
