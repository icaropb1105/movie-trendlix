import { IMG_URL } from "./api.js";

const container = document.getElementById("watchlist-container");

document.addEventListener("DOMContentLoaded", () => {
  renderWatchlist();
});

function renderWatchlist() {
  const items = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (items.length === 0) {
    container.innerHTML = "<p>Your watchlist is empty.</p>";
    return;
  }

  container.innerHTML = items
    .map(item => {
      const poster = item.poster
        ? `${IMG_URL}${item.poster}`
        : "assets/no-image.png";

      return `
        <div class="card" data-id="${item.id}" data-type="${item.type}">
          <img src="${poster}">
          <h3>${item.title}</h3>
          <button class="remove" data-id="${item.id}">Remove</button>
        </div>
      `;
    })
    .join("");

  // remove event
  container.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", () => {
      removeItem(btn.dataset.id);
    });
  });
}

function removeItem(id) {
  const list = JSON.parse(localStorage.getItem("watchlist")) || [];
  const updated = list.filter(i => i.id != id);

  localStorage.setItem("watchlist", JSON.stringify(updated));
  renderWatchlist();
}
