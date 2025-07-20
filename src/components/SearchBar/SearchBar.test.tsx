import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders input with initial value from props', () => {
    render(<SearchBar searchTerm="initial value" onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(
      /search starships/i
    ) as HTMLInputElement;
    expect(input.value).toBe('initial value');
  });

  it('updates input value when user types', () => {
    render(<SearchBar searchTerm="" onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(
      /search starships/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'X-Wing' } });

    expect(input.value).toBe('X-Wing');
  });

  it('calls onSearch with input value when form is submitted', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar searchTerm="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      /search starships/i
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'TIE Fighter' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('TIE Fighter');
  });
});
