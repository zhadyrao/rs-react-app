import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Card from './Card';
import type { StarshipClientSide } from '../utils/types';
import * as hooks from '../utils/hooks';
import * as slice from '../../features/starships/starshipSlice';

vi.mock('../utils/hooks');
vi.mock('../../features/starships/starshipSlice');

describe('<Card />', () => {
  const starship: StarshipClientSide = {
    id: '1',
    name: 'This is Name',
    description: 'Description of starship',
  };

  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch);
    vi.spyOn(hooks, 'useAppSelector').mockImplementation((selectorFn) =>
      selectorFn({
        starshipSlice: {
          selected: {},
        },
      })
    );

    vi.spyOn(slice, 'toggleItem').mockImplementation((payload) => ({
      type: 'starships/toggleItem',
      payload,
    }));
  });

  it('renders starship name and description', () => {
    render(<Card starship={starship} />);

    expect(screen.getByText('This is Name')).toBeInTheDocument();
    expect(
      screen.getByText(/Description of starship was created/)
    ).toBeInTheDocument();
  });

  it('shows checkbox as checked if starship is selected', () => {
    vi.spyOn(hooks, 'useAppSelector').mockImplementation((selectorFn) =>
      selectorFn({
        starshipSlice: {
          selected: {
            [starship.id]: starship,
          },
        },
      })
    );

    render(<Card starship={starship} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('dispatches toggleItem action on checkbox change', () => {
    render(<Card starship={starship} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(slice.toggleItem).toHaveBeenCalledWith(starship);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'starships/toggleItem',
      payload: starship,
    });
  });
});
