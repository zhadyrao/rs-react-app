export interface StarshipResult {
  uid: string;
  name: string;
  url: string;
}

export interface StarshipsResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: StarshipResult[];
}
