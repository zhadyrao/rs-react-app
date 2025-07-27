import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders the heading', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'About App author Page'
    );
  });

  it('renders the author description', () => {
    render(<AboutPage />);
    expect(screen.getByText(/my name is zhadyra/i)).toBeInTheDocument();
  });

  it('renders the RS school profile link', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', {
      name: /view my profile in rs school/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      'https://app.rs.school/profile?githubId=zhadyrao'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
