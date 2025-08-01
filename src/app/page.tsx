import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Ready to see the example?</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        <Link href="/posts">Get Started</Link>
      </button>
    </div>
  );
}
