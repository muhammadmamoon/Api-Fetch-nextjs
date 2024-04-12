import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-primary">
      <h1 className="text-white text-3xl font-bold mb-8">Welcome to the App!</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-3/4">
        <Link href="/jokes" className="flex justify-center items-center p-4 bg-accent text-white rounded-md shadow-md hover:bg-accent/90 transition">
          Random Posts
        </Link>
        <Link href="/countryGuide" className="flex justify-center items-center p-4 bg-accent text-white rounded-md shadow-md hover:bg-accent/90 transition">
          Country Guide
        </Link>
        <Link href="/dictionaryapi" className="flex justify-center items-center p-4 bg-accent text-white rounded-md shadow-md hover:bg-accent/90 transition">
          Dictionary
        </Link>
        <Link href="/funnyjokes" className="flex justify-center items-center p-4 bg-accent text-white rounded-md shadow-md hover:bg-accent/90 transition">
          Funny Jokes
        </Link>
        <Link href="/numberTrav" className="flex justify-center items-center p-4 bg-accent text-white rounded-md shadow-md hover:bg-accent/90 transition">
          Number Trav
        </Link>
        <Link href="/pokermon" className="flex justify-center items-center p-4 bg-accent text-white rounded-md shadow-md hover:bg-accent/90 transition">
          Pokermon
        </Link>
        <Link href="/reciptApp" className="flex justify-center items-center p-4 bg-accent text-white rounded-md shadow-md hover:bg-accent/90 transition">
          Recipt App
        </Link>
        <a
          href="https://react-weather-app-six-gamma.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center p-4 bg-accent text-white rounded-md shadow-md hover:bg-accent/90 transition"
        >
          Weather App
        </a>
      </div>
    </div>
  );
}
