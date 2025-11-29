export function renderCards(list, container) {
  container.innerHTML = list.map(item => `
    <div class="card" data-id="${item.id}" data-type="${item.media_type}">
      <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" />
      <h3>${item.title || item.name}</h3>
    </div>
  `).join("");
}
