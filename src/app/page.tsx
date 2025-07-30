import Link from "next/dist/client/link";
import Posts from "./components/Posts";

export default function Home() {
  return (
    <div>
      Home page
      <Link href="/posts" className="text-blue-500 hover:underline">
        see all posts
      </Link>
    </div>
  );
}
