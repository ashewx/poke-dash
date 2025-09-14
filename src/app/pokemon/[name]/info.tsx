"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import PokeballSpinner from "@/components/PokeballSpinner";

interface PokemonDetail {
  id: number;
  name: string;
  description: string;
  abilities: string[];
  gender: string[];
  sprite: string | null;
}

const genderClasses: Record<string, string> = {
  male: "gender-male",
  female: "gender-female",
  genderless: "gender-genderless",
};

export default function Info() {
  const router = useRouter();
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const res = await fetch(`/api/pokemon/${name}`);
        if (!res.ok) {
          router.replace('/404');
          return;
        }
        const data = await res.json();
        setPokemon(data);
      } catch {
        router.replace('/404');
      } finally {
        setLoading(false);
      }
    }
    if (name) fetchDetails();
  }, [name, router]);

  return (
    <div className="font-sans min-h-screen sm:p-10 flex flex-col items-center gap-2 justify-center">
      <div className="w-full max-w-xl flex items-center mb-2">
        <div className="flex-1 flex justify-start">
          <Button color="primary" onClick={() => router.push('/')}> 
            Back to Gallery
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-3xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">Pokémon Details</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <Card className="bg-gray-700 shadow-lg rounded-lg flex flex-col items-center p-6 w-full max-w-xl">
        { loading || !pokemon ? (<PokeballSpinner />): (
          <>
            <CardHeader className="mb-0 flex flex-col items-center">
              {pokemon.sprite ? (
                <Image
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  width={300}
                  height={300}
                  className="object-contain"
                />
              ) : (
                <div className="w-[180px] h-[180px] bg-gray-100 flex items-center justify-center text-black mb-2">No Image</div>
              )}
              <span className="mt-2 text-2xl font-semibold text-white capitalize tracking-wide drop-shadow-lg">
                {pokemon.name.replaceAll("-", " ")}
              </span>
            </CardHeader>
            <CardBody className="flex flex-col items-center w-full text-center">
              <p className="mb-4 text-gray-200 text-lg italic max-w-md">
                {pokemon.description}
              </p>
              <div className="mb-4 w-full">
                <span className="font-semibold text-blue-300">Abilities:</span>
                <ul className="flex justify-center items-center gap-2 mt-2">
                  {pokemon.abilities.map((a) => (
                    <li key={a} className="capitalize px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow w-fit">
                      {a.replaceAll("-", " ")}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4 w-full">
                <span className="font-semibold text-purple-300">Gender:</span>
                <ul className="flex justify-center items-center gap-2 mt-2">
                  {pokemon.gender.map((a) => (
                    <li key={a} className={`capitalize px-3 py-1 rounded-full text-sm font-medium shadow ${genderClasses[a]}`}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </>
        )}
      </Card>
    </div>
  );
}