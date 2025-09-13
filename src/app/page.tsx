import { Metadata } from 'next';
import Gallery from "./gallery";

export const metadata: Metadata = {
  title: 'Pokemon Gallery',
}

export default function Home() {
  return (
    <>
      <Gallery />
    </>
  );
}
