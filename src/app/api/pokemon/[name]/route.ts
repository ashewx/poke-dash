import { SpeciesResponse, GenderResponse, PokemonAPIResponse, PokemonDetail } from "@/types/pokemon";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests for Pokémon details.
 * @param req The request object.
 * @param param1 The route parameters.
 * @returns A Response object containing the Pokémon details.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ name: string }> }
): Promise<Response> {
  try {
    const { name }: { name: string } = await context.params;

    // 1. Get Pokémon core data (abilities, id)
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!pokemonRes.ok) {
  return NextResponse.json({ error: "Pokémon not found" }, { status: 404 });
    }
    const pokemon: PokemonAPIResponse = await pokemonRes.json();

    // 2. Get species data (descriptions)
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
    const species: SpeciesResponse = await speciesRes.json();
    const descriptionEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description = descriptionEntry
      ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ")
      : "No description available.";

    // 3. Get gender info
    const genders = ["male", "female", "genderless"];
    const genderResults: string[] = [];
    for (const g of genders) {
      const genderRes: Response = await fetch(`https://pokeapi.co/api/v2/gender/${g}`);
      if (genderRes.ok) {
        const data: GenderResponse = await genderRes.json();
        const hasSpecies: boolean = data.pokemon_species_details.some(
          (d) => d.pokemon_species.name === pokemon.name
        );
        if (hasSpecies) genderResults.push(g);
      }
    }

    // 4. Build response
    const sprite = pokemon.sprites?.other?.["official-artwork"]?.front_default || null;
    const formatted: PokemonDetail = {
      id: pokemon.id,
      name: pokemon.name,
      description,
      abilities: pokemon.abilities.map((a) => a.ability.name),
      gender: genderResults.length > 0 ? genderResults : ["Unknown"],
      sprite,
    };

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch Pokémon details" }, { status: 500 });
  }
}