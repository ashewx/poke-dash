import { Metadata } from "next";
import Info from "./info";
import capitalize from "@/lib/capitalize";

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const parameters = await params;
  return {
    title: `Pokemon Details - ${capitalize(parameters.name)}`,
  };
}

export default function Pokemon() {
  return (
    <>
      <Info />
    </>
  );
}