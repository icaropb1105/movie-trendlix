import { getDetails } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

const container = document.getElementById("details-container");

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getDetails(id, type);

  container.innerHTML = `
    <h1>${data.title || data.name}</h1>
    <img src="https://image.tmdb.org/t/p/w500${data.poster_path}">
    <p>${data.overview}</p>

    <h3>Cast:</h3>
    <ul>
      ${data.credits.cast.slice(0, 5).map(c => `<li>${c.name} as ${c.character}</li>`).join("")}
    </ul>

    <button id="addWatchlist">Add to Watchlist</button>
  `;

  document.getElementById("addWatchlist").onclick = () => {
    const item = { id, type, title: data.title || data.name, poster: data.poster_path };
    const current = JSON.parse(localStorage.getItem("watchlist")) || [];
    localStorage.setItem("watchlist", JSON.stringify([...current, item]));
    alert("Added!");
  };
});
