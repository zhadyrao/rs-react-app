import { configureStore } from '@reduxjs/toolkit';
import { starshipSlice } from './features/starships/starshipSlice.ts';

export const store = configureStore({
  reducer: {
    starshipSlice: starshipSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
