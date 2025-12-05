import { getTrending, searchMovies } from "./api.js";
import { renderCards } from "./ui.js";

const trendingContainer = document.getElementById("trending-container");
const searchInput = document.getElementById("searchInput");

// Load Trending on Start
document.addEventListener("DOMContentLoaded", async () => {
  trendingContainer.innerHTML = "<p>Loading...</p>";

  const trending = await getTrending();
  renderCards(trending, trendingContainer);
});

// Search
searchInput.addEventListener("keyup", async (e) => {
  if (e.key !== "Enter") return;

  const query = searchInput.value.trim();
  if (!query) return;

  trendingContainer.innerHTML = "<p>Searching...</p>";

  const results = await searchMovies(query);
  renderCards(results, trendingContainer);
});

// Redirect to details
trendingContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const id = card.dataset.id;
  const type = card.dataset.type;

  window.location.href = `details.html?id=${id}&type=${type}`;
});
