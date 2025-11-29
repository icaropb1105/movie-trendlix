import { getTrending, searchMovies } from "./api.js";
import { renderCards } from "./ui.js";

const trendingContainer = document.getElementById("trending-container");
const searchInput = document.getElementById("searchInput");

// Load Trending on Start
document.addEventListener("DOMContentLoaded", async () => {
  const trending = await getTrending();
  renderCards(trending, trendingContainer);
});

// Search
searchInput.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    const results = await searchMovies(searchInput.value);
    renderCards(results, trendingContainer);
  }
});

// Click Details
trendingContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const id = card.dataset.id;
  const type = card.dataset.type;

  window.location.href = `details.html?id=${id}&type=${type}`;
});
