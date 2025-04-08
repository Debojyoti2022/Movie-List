const API_KEY = "437828b4";
const BASE_URL = "https://www.omdbapi.com/";

// 🔍 Search for movies by title
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  // If API returned an error (e.g., "Movie not found!")
  if (data.Response === "False") {
    console.warn("OMDb Search Error:", data.Error);
    return [];
  }

  return data.Search; // array of movies
};

// 🎬 Get detailed info about a movie by IMDb ID
export const getMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  const data = await response.json();

  if (data.Response === "False") {
    console.warn("OMDb Detail Error:", data.Error);
    return null;
  }

  return data; // full movie object
};
