import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders current page', () => {
    render(
      <Pagination
        currentPage="2"
        next="true"
        previous="true"
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getByText(/Page 2/)).toBeInTheDocument();
  });

  it('calls onPageChange with previous page when Previous clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage="3"
        previous="true"
        next="true"
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Previous/i }));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when Next clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage="3"
        previous="true"
        next="true"
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(handlePageChange).toHaveBeenCalledWith(4);
  });

  it('disables Previous button if no previous', () => {
    render(
      <Pagination
        currentPage="1"
        previous={null}
        next="true"
        onPageChange={vi.fn()}
      />
    );

    const prevButton = screen.getByRole('button', { name: /Previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button if no next', () => {
    render(
      <Pagination
        currentPage="1"
        previous="true"
        next={null}
        onPageChange={vi.fn()}
      />
    );

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });
});
