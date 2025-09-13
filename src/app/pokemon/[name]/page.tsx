import { Metadata } from "next";
import Info from "./info";
import capitalize from "@/lib/capitalize";

export function generateMetadata({ params }: { params: { name: string } }): Metadata {
  return {
    title: `Pokemon Details - ${capitalize(params.name)}`,
  };
}

export default function Pokemon() {
  return (
    <>
      <Info />
    </>
  );
}