import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { StarshipClientSide } from '../../components/utils/types.ts';

interface StarshipsState {
  starShipsList?: StarshipClientSide[];
  selected: Record<string, StarshipClientSide>;
  loading?: boolean;
  next?: string | null;
  previous?: string | null;
}

const initialState: StarshipsState = {
  starShipsList: [],
  selected: {},
  loading: false,
  next: null,
  previous: null,
};
export const starshipSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<StarshipClientSide>) => {
      const { id } = action.payload;
      if (state.selected[id]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...rest } = state.selected;
        state.selected = rest;
      } else {
        state.selected[id] = action.payload;
      }
    },
    unselectAll: (state) => {
      state.selected = {};
    },
  },
});

export const { toggleItem, unselectAll } = starshipSlice.actions;
export default starshipSlice.reducer;
