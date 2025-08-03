import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { ThemeProvider } from '../ThemeContext/ThemeContext'; // adjust path as needed

describe('Navbar', () => {
  const renderWithProviders = () =>
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>
    );

  it('renders Home and About links', () => {
    renderWithProviders();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders theme select dropdown with Light and Dark options', () => {
    renderWithProviders();

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Dark' })).toBeInTheDocument();
  });

  it('can change the theme via the dropdown', () => {
    renderWithProviders();

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('light');

    fireEvent.change(select, { target: { value: 'dark' } });

    expect(select.value).toBe('dark'); // confirms UI update
  });
});
