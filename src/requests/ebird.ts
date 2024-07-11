import axios from "axios";
import puppeteer from "puppeteer";

const api = axios.create({
  baseURL: "https://api.ebird.org/v2/",
  timeout: 1000,
  headers: {
    "X-eBirdApiToken": process.env.EBIRD_API_KEY,
  },
});

export interface RawBird {
  name: string | undefined;
  howMany: number;
  comName: string; // common name, e.g. "Gambel's Quail"
  sciName: string; // scientific name, e.g. "Callipepla gambelii"
  speciesCode: string; // e.g. "gamqua"
}

export const getBirdsForRegion = async (
  regionID: string
): Promise<RawBird[]> => {
  const response = await api.get(`data/obs/${regionID}/recent`);
  return response.data;
};

// Do not use. This is too slow.
export const getBirdInfo = async (speciesCode: string): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`https://ebird.org/species/${speciesCode}`, {
      waitUntil: "networkidle2",
    });
    const speciesIdentificationText = await page.evaluate(() => {
      return (document?.querySelector(".Species-identification-text") as any)
        ?.innerText;
    });

    return speciesIdentificationText;
  } catch (error) {
    console.error("Error fetching the page:", error);
    return "";
  } finally {
    await browser.close();
  }
};
