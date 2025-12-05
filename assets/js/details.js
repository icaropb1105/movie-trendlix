import { getDetails, getProviders, IMG_URL } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

const container = document.getElementById("details-container");

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getDetails(id, type);
  const providers = await getProviders(id, type);

  const poster = data.poster_path
    ? `${IMG_URL}${data.poster_path}`
    : "assets/no-image.png";

  const streamList = providers?.flatrate
    ? providers.flatrate.map(p => `<li>${p.provider_name}</li>`).join("")
    : "<li>Not available in your region</li>";

  container.innerHTML = `
    <h1>${data.title || data.name}</h1>

    <div class="details-wrapper">

      <img src="${poster}" class="poster">

      <div class="details-text">

        <p>${data.overview}</p>

        <div class="info-row">
          <p><strong>Rating:</strong> ⭐ ${data.vote_average.toFixed(1)}</p>
          <p><strong>Release:</strong> ${data.release_date || data.first_air_date}</p>
        </div>

        <h3>Cast</h3>
        <ul>
          ${data.credits.cast.slice(0, 6).map(c => `<li>${c.name} (${c.character})</li>`).join("")}
        </ul>

        <h3>Where to Watch</h3>
        <ul>${streamList}</ul>

        <button id="addWatchlist">Add to Watchlist</button>

      </div>
    </div>
  `;

  // WATCHLIST
  document.getElementById("addWatchlist").onclick = () => {
    const item = {
      id,
      type,
      title: data.title || data.name,
      poster: data.poster_path
    };

    const list = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (list.some(i => i.id == id)) {
      alert("Already in your watchlist.");
      return;
    }

    localStorage.setItem("watchlist", JSON.stringify([...list, item]));
    alert("Added to Watchlist!");
  };
});
