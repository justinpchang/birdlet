import axios from "axios";

const MAX_URLS = 10;
const api = axios.create({
  baseURL: "https://api.flickr.com/services/rest",
  params: {
    api_key: process.env.FLICKR_API_KEY,
    format: "json",
    nojsoncallback: 1,
  },
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Birdlet/1.0 (https://birdlet.vercel.app)",
  },
});

export const getPhotoURLs = async (query: string) => {
  const response = await api.get("/", {
    params: {
      method: "flickr.photos.search",
      text: `bird ${query}`,
      per_page: MAX_URLS,
      sort: "relevance",
    },
  });
  const urls = response.data.photos.photo.map(
    (photo: { server: string; id: string; secret: string }) => {
      const { server, id, secret } = photo;
      return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
    }
  );
  return urls;
};
