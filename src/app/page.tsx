"use client";
import { useEffect, useState } from "react";
import Head from 'next/head'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody } from "@heroui/react";

import PokeballSpinner from "@/components/PokeballSpinner";
import PokemonType from "@/lib/PokemonType";
import capitalize from "@/lib/capitalize";

interface Pokemon {
  id: number;
  name: string;
  sprite: string | null;
  types: string[];
  height: number;
  weight: number;
}

export default function Home() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const routePokemon = (name: string) => {
    router.push(`/pokemon/${name}`);
  };

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/pokemon/random");
        const data = await res.json();
        setPokemon(data.pokemon);
      } catch {
        setError("Failed to load Pokémon.");
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, []);

  return (
    <>
      <Head>
        <title>Pokémon Gallery</title>
      </Head>
      <div className="font-sans min-h-screen sm:p-10 flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold mb-3">Pokémon Gallery</h1>
        {loading ? (
          <div className="text-lg"><PokeballSpinner /></div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <main className="grid grid-cols-3 grid-rows-3 gap-8 w-full max-w-5xl">
            {pokemon.map((p) => (
              <Card
                key={p.id}
                isPressable
                className="bg-gray-700 shadow-lg rounded-lg flex flex-col items-center p-4"
                onPress={() => routePokemon(p.name)}
              >
                <CardHeader className="mb-0 flex flex-col items-center">
                  {p.sprite ? (
                    <Image
                      src={p.sprite}
                      alt={p.name}
                      width={180}
                      height={180}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-[180px] h-[180px] bg-gray-100 flex items-center justify-center text-black">No Image</div>
                  )}
                  <span className="mt-2 text-lg font-semibold">{capitalize(p.name).replaceAll("-", " ")}</span>
                </CardHeader>
                <CardBody className="flex flex-col items-center">
                  <div className="flex gap-2 mb-1">
                    {p.types.map((type) => (
                      <span key={type} className={`px-2 py-1 rounded text-xs font-medium ${PokemonType[type]}`}>
                        {capitalize(type)}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-300">Height: {p.height} | Weight: {p.weight}</div>
                </CardBody>
              </Card>
            ))}
          </main>
        )}
      </div>
    </>
  );
}
