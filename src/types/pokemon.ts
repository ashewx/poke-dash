export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface PokemonAPIResponse {
  id: number;
  name: string;
  abilities: { ability: { name: string } }[];
  sprites: {
    front_default: string | null;
    other?: Record<string, { front_default: string | null }>;
  };
}

export interface SpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
}

export interface GenderResponse {
  id: number;
  name: string;
  pokemon_species_details: {
    pokemon_species: {
      name: string;
    };
  }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  description: string;
  abilities: string[];
  gender: string[];
  sprite: string | null;
}
