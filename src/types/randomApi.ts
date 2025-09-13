export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAPIResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      [key: string]: {
        front_default: string | null;
      };
    };
  };
  types: PokemonType[];
  height: number;
  weight: number;
}


export interface PokemonFormatted {
  id: number;
  name: string;
  sprite: string | null;
  types: string[];
  height: number;
  weight: number;
}