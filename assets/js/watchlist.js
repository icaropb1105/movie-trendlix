const container = document.getElementById("watchlist-container");

document.addEventListener("DOMContentLoaded", () => {
  const items = JSON.parse(localStorage.getItem("watchlist")) || [];

  container.innerHTML = items.map(item => `
    <div class="card">
      <img src="https://image.tmdb.org/t/p/w500${item.poster}">
      <h3>${item.title}</h3>
    </div>
  `).join("");
});
