export interface StarshipProperties {
  created: string;
  edited: string;
  consumables: string;
  name: string;
  cargo_capacity: string;
  films: string[];
  url: string;
}

export interface Starship {
  properties: StarshipProperties;
  _id: string;
  description: string;
  uid: string;
  __v: number;
}

export interface StarshipsResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Starship[];
}
