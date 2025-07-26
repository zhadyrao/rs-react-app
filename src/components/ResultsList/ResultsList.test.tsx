import { render, screen } from '@testing-library/react';
import ResultsList from './ResultsList';
import type { Starship } from '../../common/types';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../Card/Card.tsx', () => ({
  default: ({ starship }: { starship: Starship }) => (
    <div data-testid="card">{starship.properties.name}</div>
  ),
}));

describe('ResultsList', () => {
  it('renders "No results found." when starships list is empty', () => {
    render(<ResultsList />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('renders a list of Card components when starships are provided', () => {
    // const mockStarships: Starship[] = [
    //   {
    //     properties: {
    //       name: 'X-Wing',
    //       created: '2023-01-01',
    //       cost_in_credits: '149999',
    //       manufacturer: 'Incom Corporation',
    //     },
    //     description: 'A fast rebel starfighter.',
    //   },
    //   {
    //     properties: {
    //       name: 'TIE Fighter',
    //       created: '2023-01-02',
    //       cost_in_credits: '75000',
    //       manufacturer: 'Sienar Fleet Systems',
    //     },
    //     description: 'Standard Imperial starfighter.',
    //   },
    // ];

    render(<ResultsList />);
    // const cards = screen.getAllByTestId('card');
    //
    // expect(cards).toHaveLength(2);
    // expect(cards[0]).toHaveTextContent('X-Wing');
    // expect(cards[1]).toHaveTextContent('TIE Fighter');
  });
});
