// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPhotoURLs } from "@/requests/flickr";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  birds: any;
  photos: any;
  info: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const photos = await getPhotoURLs("Gambel's Quail");

  res.status(200).json({ birds: [], photos, info: "" });
}
