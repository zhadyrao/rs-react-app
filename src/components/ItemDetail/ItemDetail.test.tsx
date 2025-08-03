import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ItemDetail from './ItemDetail';

vi.mock('../LoadingBar/LoadingBar.tsx', () => ({
  default: () => <div data-testid="loading-bar">Loading...</div>,
}));

const mockStarshipData = {
  result: {
    properties: {
      name: 'X-Wing',
      model: 'T-65 X-wing',
      starship_class: 'Starfighter',
      manufacturer: 'Incom Corporation',
      cost_in_credits: '149999',
      crew: '1',
      passengers: '0',
      cargo_capacity: '110',
      consumables: '1 week',
      max_atmosphering_speed: '1050',
      hyperdrive_rating: '1.0',
      length: '12.5',
      MGLT: '100',
    },
  },
};

describe('ItemDetail', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading bar initially', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockStarshipData,
    } as Response);

    render(<ItemDetail id="1" />);
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument();
    await screen.findByText('X-Wing');
  });

  it('displays starship data on successful fetch', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockStarshipData,
    } as Response);

    render(<ItemDetail id="1" />);

    expect(await screen.findByText('X-Wing')).toBeInTheDocument();
    expect(screen.getByText(/T-65 X-wing/)).toBeInTheDocument();
    expect(screen.getByText(/Starfighter/)).toBeInTheDocument();
    expect(screen.getByText(/Incom Corporation/)).toBeInTheDocument();
    expect(screen.getByText(/149999 credits/)).toBeInTheDocument();
  });

  it('displays error message on fetch failure (non-ok response)', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
    } as Response);

    render(<ItemDetail id="1" />);
    expect(
      await screen.findByText(/Error: Failed to fetch starship/)
    ).toBeInTheDocument();
  });

  it('displays error message on fetch rejection (network error)', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network Error'));

    render(<ItemDetail id="1" />);
    expect(await screen.findByText(/Error: Network Error/)).toBeInTheDocument();
  });
});
