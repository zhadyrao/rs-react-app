import { configureStore } from '@reduxjs/toolkit';
import { starshipsApi } from './components/services/starships.ts';
import { starshipSlice } from './features/starships/starshipSlice.ts';

export const store = configureStore({
  reducer: {
    [starshipsApi.reducerPath]: starshipsApi.reducer,
    selectedStarships: starshipSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starshipsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
