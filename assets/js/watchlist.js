import { IMG_URL } from "./api.js";

// DEBUG helper 
window.__watchlist_debug = {
  read() {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  }
};

const container = document.getElementById("watchlist-container");

function renderWatchlist() {
  const list = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (list.length === 0) {
    container.innerHTML = "<p>Your watchlist is empty.</p>";
    return;
  }

  container.innerHTML = list.map((item, index) => {
    const poster = item.poster
      ? `${IMG_URL}${item.poster}`
      : "assets/no-image.png";

    return `
      <div class="card">
        <img src="${poster}" alt="${item.title}">
        <h3>${item.title}</h3>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
  }).join("");

  // fixed
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.onclick = () => {
      const index = btn.dataset.index;
      removeItem(index);
    };
  });
}

function removeItem(index) {
  const list = JSON.parse(localStorage.getItem("watchlist")) || [];
  list.splice(index, 1);
  localStorage.setItem("watchlist", JSON.stringify(list));
  renderWatchlist();
}

renderWatchlist();
