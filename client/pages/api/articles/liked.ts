import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const getLikedArticles = async () => {
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_HOST}:8000/articles/liked`
  );
  const data = await response.json();
  return data;
};

export const reloadLikedArticles = async (id: string) => {
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_HOST}:8000/articles/liked?reload=${id}`
  );
  const data = await response.json();
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(404).end();
  } else {
    if (req.method === "GET") {
      const query = req.query;
      if (!query.reload) {
        const data = await getLikedArticles();
        return res.json(data);
      } else {
        const data = await reloadLikedArticles(query.reload as string);
        return res.json(data);
      }
    }
  }
}
