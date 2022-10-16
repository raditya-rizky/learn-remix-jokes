import type { Joke } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { useLoaderData, Link } from "@remix-run/react";

type loaderData = { joke: Joke };

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
    // select: { content: true },
  });
  if (!joke) throw new Error(`joke not found`);
  const data: loaderData = { joke };
  // console.log(data);
  return json(data);
};

export default function JokeRoute() {
  const data = useLoaderData<loaderData>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}
