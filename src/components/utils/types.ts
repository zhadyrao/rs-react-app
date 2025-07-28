export interface StarshipProperties {
  created: string;
  edited: string;
  consumables: string;
  name: string;
  cargo_capacity: string;
  url: string;
}

export interface Starship {
  properties: StarshipProperties;
  _id: string;
  description: string;
  uid: string;
  __v: number;
}

export interface StarshipById {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  max_atmosphering_speed: string;
  MGLT: string;
  hyperdrive_rating: string;
  length: string;
  films: string[];
}

export interface StarshipsResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Starship[];
}
