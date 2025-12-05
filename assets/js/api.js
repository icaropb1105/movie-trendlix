const API_KEY = "d7c284103791f4798cef3554a0f4db4f";
const BASE_URL = "https://api.themoviedb.org/3";

const IMG = "https://image.tmdb.org/t/p/w500";

// Trending
export async function getTrending() {
  const res = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
  const data = await res.json();

  return data.results.map(item => ({
    ...item,
    media_type: item.media_type || (item.title ? "movie" : "tv")
  }));
}

// Search
export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();

  return data.results
    .filter(item => item.media_type === "movie" || item.media_type === "tv")
    .map(item => ({
      ...item,
      media_type: item.media_type || (item.title ? "movie" : "tv")
    }));
}

// Details + cast
export async function getDetails(id, type) {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  return res.json();
}

// Streaming availability
export async function getProviders(id, type) {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results?.BR || data.results?.US || null;
}

export const IMG_URL = IMG;
