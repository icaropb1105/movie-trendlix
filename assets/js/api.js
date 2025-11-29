const API_KEY = "d7c284103791f4798cef3554a0f4db4f";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getTrending() {
  const res = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  return data.results;
}

export async function getDetails(id, type) {
  const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits`);
  return res.json();
}
