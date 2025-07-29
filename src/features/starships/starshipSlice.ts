import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  Starship,
  StarshipClientSide,
} from '../../components/utils/types.ts';

interface StarshipsState {
  list: StarshipClientSide[];
  selected: Record<string, StarshipClientSide>;
  loading: boolean;
}

const initialState: StarshipsState = {
  list: [],
  selected: {},
  loading: false,
};

export const fetchStarships = createAsyncThunk(
  'starships/fetch',
  async (page: string) => {
    const res = await fetch(
      `https://www.swapi.tech/api/starships?expanded=true&limit=10&page=${page}`
    );
    const data = await res.json();
    return data.results.map((starship: Starship) => ({
      id: String(starship.uid),
      name: starship.properties.name,
      description: starship.properties.created,
    }));
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarships.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
  },
});

export const { toggleItem } = starshipSlice.actions;
export default starshipSlice.reducer;
