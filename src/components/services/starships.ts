import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Starship,
  StarshipClientSide,
  StarshipsResponse,
} from '../utils/types.ts';

export const starshipsApi = createApi({
  reducerPath: 'starshipsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.swapi.tech/api/' }),
  endpoints: (builder) => ({
    getStarships: builder.query<
      {
        results: StarshipClientSide[];
        next: string | null;
        previous: string | null;
        totalPages: number;
        totalRecords: number;
      },
      string
    >({
      query: (page) => `starships?expanded=true&limit=10&page=${page}`,
      transformResponse: (response: StarshipsResponse) => ({
        results: response.results.map((starship: Starship) => ({
          id: String(starship.uid),
          name: starship.properties.name,
          description: starship.description ?? starship.properties.created,
        })),
        next: response.next,
        previous: response.previous,
        totalPages: response.total_pages,
        totalRecords: response.total_records,
      }),
    }),
  }),
});

export const { useGetStarshipsQuery } = starshipsApi;
