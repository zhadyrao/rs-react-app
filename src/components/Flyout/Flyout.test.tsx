import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import Flyout from './Flyout';
import { useAppDispatch, useAppSelector } from '../utils/hooks.ts';
import { downloadCSV } from '../utils/download.ts';
import type { StarshipClientSide } from '../utils/types.ts';

vi.mock('../utils/hooks', async () => {
  const actual = await vi.importActual('../utils/hooks');
  return {
    ...actual,
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
  };
});

vi.mock('../utils/download', () => ({
  downloadCSV: vi.fn(),
}));

vi.mock('../../features/starships/starshipSlice', () => ({
  unselectAll: vi.fn(),
}));

describe('Flyout component', () => {
  const mockDispatch = vi.fn();
  const mockUseAppSelector = useAppSelector as unknown as Mock;
  const mockUseAppDispatch = useAppDispatch as unknown as Mock;
  const mockDownloadCSV = downloadCSV as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  it('should not render if no items are selected', () => {
    mockUseAppSelector.mockReturnValue([]);
    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });

  it('should render with selected items', () => {
    const selectedItems: StarshipClientSide[] = [
      { id: '1', name: 'Fighter', description: 'this is description1' },
    ];
    mockUseAppSelector.mockReturnValue(selectedItems);
    render(<Flyout />);
    expect(screen.getByText(/1 item\(s\) selected/)).toBeInTheDocument();
    expect(screen.getByText(/Unselect all/)).toBeInTheDocument();
    expect(screen.getByText(/Download/)).toBeInTheDocument();
  });

  it('should call downloadCSV with correct arguments when "Download" is clicked', () => {
    const selectedItems: StarshipClientSide[] = [
      { id: '1', name: 'Fighter', description: 'this is description1' },
      { id: '2', name: 'Bomber', description: 'this is description2' },
    ];
    mockUseAppSelector.mockReturnValue(selectedItems);
    render(<Flyout />);
    fireEvent.click(screen.getByText(/Download/));
    expect(mockDownloadCSV).toHaveBeenCalledWith(selectedItems, '2_items.csv');
  });
});
