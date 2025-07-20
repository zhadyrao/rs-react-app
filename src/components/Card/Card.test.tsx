import type { Starship } from '../../common/types';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

describe('Card component', () => {
  const mockStarship: Starship = {
    description: 'A powerful starship',
    properties: {
      name: 'Millennium Falcon',
      created: '2023-07-17',
      cost_in_credits: '100000',
      manufacturer: 'Corellian Engineering Corporation',
    },
  };

  it('renders the starship name as a heading', () => {
    render(<Card starship={mockStarship} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Millennium Falcon'
    );
  });

  it('renders the starship description and properties in the paragraph', () => {
    render(<Card starship={mockStarship} />);
    const expectedText =
      'A powerful starship was created 2023-07-17. It costs 100000 and made by Corellian Engineering Corporation';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('applies the correct styling classes', () => {
    render(<Card starship={mockStarship} />);
    const card = screen.getByRole('heading').closest('div');
    expect(card).toHaveClass('border', 'rounded', 'p-4', 'shadow');
  });
});
