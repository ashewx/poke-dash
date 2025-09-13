import { PokemonFormatted, PokemonAPIResponse,  } from "@/types/randomApi";

/**
 * Get N unique random integers within a specified range.
 * @param n number of unique integers to generate
 * @param min minimum value (inclusive)
 * @param max maximum value (inclusive)
 * @returns array of unique random integers
 */
function getNUniqueRandomInts(n: number, min: number, max: number): number[] {
  const set = new Set<number>();
  while (set.size < n) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(val);
  }
  return Array.from(set);
}

/**
 * Fetches 9 random Pokémon from the PokéAPI.
 * @returns A response containing 9 random Pokémon with their details.
 */
export async function GET(): Promise<Response> {
  try {
    const listRes = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1');
    const listData = await listRes.json();
    const total: number = listData.count;


    const ids = getNUniqueRandomInts(9, 1, total);


    const promises: Promise<PokemonAPIResponse>[] = ids.map(async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return res.json();
    });

    const results = await Promise.all(promises);

    const formatted: PokemonFormatted[] = results.map((p) => {
      return {
        id: p.id,
        name: p.name,
        sprite: p.sprites?.other?.['official-artwork']?.front_default || p.sprites?.front_default,
        types: p.types.map((t) => t.type.name),
        height: p.height,
        weight: p.weight,
      };
    });

    return new Response(JSON.stringify({ pokemon: formatted }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Pokémon' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}