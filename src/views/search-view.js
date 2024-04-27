import { toGifSimple } from "./gifs-views.js";

export const toSearchView = (searchedGifs, searchTerm) => `
<div id="search-gifs">
  <h1>Gifs found for "${searchTerm}":</h1>
  <div class="search-content">
    ${
      searchedGifs.map(toGifSimple).join("\n") ||
      "<p>Search for some gifs 🔝</p>"
    }
  </div>
</div>
`;
