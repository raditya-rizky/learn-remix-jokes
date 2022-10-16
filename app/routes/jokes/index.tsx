import type { Joke } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type loaderData = { randomJoke: Joke };

export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  // console.log(randomRowNumber);

  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });
  const data: loaderData = { randomJoke };
  return json(data);
};

export default function JokesIndexRoute() {
  const data = useLoaderData<loaderData>();
  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{data.randomJoke.content}</p>
      <Link to={data.randomJoke.id}>{data.randomJoke.name} Permalink</Link>
    </div>
  );
}