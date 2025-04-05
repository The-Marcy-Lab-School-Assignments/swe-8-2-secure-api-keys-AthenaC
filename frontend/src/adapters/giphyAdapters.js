import { handleFetch } from "./handleFetch.js";

// const API_KEY = process.env.API_KEY;

// Send a fetch request to the /trending endpoint and return the top 3 results
export const getTrendingGifs = async () => {
  return await handleFetch("/api/gifs");
};

export const getGifsBySearch = async (searchTerm) => {};
