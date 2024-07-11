import { getBirdsForRegion, RawBird } from "@/requests/ebird";
import { getPhotoURLs } from "@/requests/flickr";
import { NextApiRequest, NextApiResponse } from "next";

type QuizBird = RawBird & {
  imageURLs: string[];
};

export interface QuizData {
  birds: QuizBird[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizData>
) {
  const regionID = req.query.regionID as string;

  // Get observations for the region
  const observedBirds = await getBirdsForRegion(regionID);

  // Enrich observations with photo URLs
  const quizBirds = await Promise.all(
    observedBirds.map(async (bird) => {
      const imageURLs = await getPhotoURLs(bird.comName);
      return { ...bird, imageURLs };
    })
  );

  res.status(200).json({ birds: quizBirds });
}
