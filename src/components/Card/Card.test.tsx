import { render, screen } from '@testing-library/react';
import Card from './Card';
import { describe, it, expect } from 'vitest';
import type { Starship } from '../utils/types';

describe('Card', () => {
  const mockStarship: Starship = {
    _id: '1',
    uid: 'uid-1',
    __v: 0,
    description: 'A powerful capital ship',
    properties: {
      name: 'Millennium Falcon',
      created: '2023-01-01T00:00:00.000Z',
      edited: '2023-01-01T00:00:00.000Z',
      cargo_capacity: '100000',
      consumables: '2 months',
      url: 'http://swapi.tech/api/starships/1',
    },
  };

  it('renders starship name in heading', () => {
    render(<Card starship={mockStarship} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Millennium Falcon'
    );
  });

  it('renders starship description with properties', () => {
    render(<Card starship={mockStarship} />);
    expect(
      screen.getByText(
        /A powerful capital ship was created 2023-01-01T00:00:00.000Z. It costs 100000 and made by 2 months/i
      )
    ).toBeInTheDocument();
  });
});
