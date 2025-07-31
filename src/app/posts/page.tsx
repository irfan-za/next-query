import React, { Suspense } from "react";
import Posts from "../components/Posts";
import LoadingCard from "../components/LoadingCard";

export default function page() {
  return (
    <div>
      <Suspense
        fallback={Array.from({ length: 6 }, (_, index) => (
          <LoadingCard key={index} />
        ))}
      >
        <Posts />
      </Suspense>
    </div>
  );
}
