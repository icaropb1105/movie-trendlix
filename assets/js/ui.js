import { IMG_URL } from "./api.js";

export function renderCards(list, container) {
  if (!list || list.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  container.innerHTML = list
    .map(item => {
      const poster = item.poster_path
        ? `${IMG_URL}${item.poster_path}`
        : "assets/no-image.png"; // fallback

      return `
        <div class="card" data-id="${item.id}" data-type="${item.media_type}">
          <img src="${poster}" alt="${item.title || item.name}">
          <h3>${item.title || item.name}</h3>
          <p class="rating">⭐ ${item.vote_average?.toFixed(1) || "N/A"}</p>
        </div>
      `;
    })
    .join("");
}
