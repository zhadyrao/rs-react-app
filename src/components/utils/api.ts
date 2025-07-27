import type { StarshipsResponse } from './types.ts';

export const fetchStarships = async (
  url: string
): Promise<StarshipsResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: StarshipsResponse = await response.json();
  return data;
};
