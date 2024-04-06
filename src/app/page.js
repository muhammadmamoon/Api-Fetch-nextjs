import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Link href="/jokes" className=" flex justify-center items-center text-red-500">Random Posts</Link>
    </>
  );
}
