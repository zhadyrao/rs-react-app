import { render, screen } from '@testing-library/react';
import LoadingBar from './LoadingBar';
import { describe, it, expect } from 'vitest';

describe('LoadingBar', () => {
  it('renders loading spinner and text', () => {
    render(<LoadingBar />);

    const spinner = screen.getByRole('status', { hidden: true });
    const loadingText = screen.getByText(/loading/i);

    expect(spinner).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });
});
