import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MasterDetailPage from './MasterDetailPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../ResultsList/ResultsList.tsx', () => ({
  default: ({ currentPage }: { currentPage: string }) => (
    <div data-testid="results-list">Page: {currentPage}</div>
  ),
}));

vi.mock('../ItemDetail/ItemDetail.tsx', () => ({
  default: ({ id }: { id: string }) => (
    <div data-testid="item-detail">Detail ID: {id}</div>
  ),
}));

vi.mock('../NotFound/NotFound.tsx', () => ({
  default: () => <div data-testid="not-found">Not Found</div>,
}));

function renderWithRouter(initialPath: string) {
  window.history.pushState({}, 'Test page', initialPath);

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/:page/:detailsId?" element={<MasterDetailPage />} />
        <Route path="*" element={<div>Fallback</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('MasterDetailPage', () => {
  it('renders ResultsList with valid page and no detailsId', () => {
    renderWithRouter('/2');
    expect(screen.getByTestId('results-list')).toHaveTextContent('Page: 2');
    expect(screen.queryByTestId('item-detail')).not.toBeInTheDocument();
  });

  it('renders ResultsList and ItemDetail when detailsId is present', () => {
    renderWithRouter('/3/abc123');
    expect(screen.getByTestId('results-list')).toHaveTextContent('Page: 3');
    expect(screen.getByTestId('item-detail')).toHaveTextContent(
      'Detail ID: abc123'
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('renders NotFound when page is invalid', () => {
    renderWithRouter('/invalid');
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('navigates back to page view when Close button is clicked', () => {
    renderWithRouter('/4/xyz');

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.getByTestId('results-list')).toHaveTextContent('Page: 4');
  });
});
