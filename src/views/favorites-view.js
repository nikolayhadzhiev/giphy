/* eslint-disable max-len */
import {toGifSimple} from './gifs-views.js';

export const displayRandomGif = (gif) => {
  return `<div id="favorites-container"><div class="random" id="${gif.id}">
  <h1>Random GIF:</h1>
  <p>Add some GIFs to favorites to see them here 👇</p>
    <img src="${gif.images.original.url}" class="select-gif" id="${gif.id}" data-random-gif="random-gif" alt="${gif.title}">
    <button id="generate-random-gif-btn" class="random-gif-button">Get another GIF</button>
  </div>
  </div>`;
};

export const toFavoritesView = (favoriteGifs) => {
  return `
  <div id="favorites-container">
    <div id="favorite-gifs">
      <h1>Favorite GIFs:</h1>
      <p>Add some more GIFs to favorites or remove all of them, so you check out some random GIFs 🙀</p>
      <div class="favorites-content">
        ${favoriteGifs.map(toGifSimple).join('\n')}
      </div>
    </div>
  </div>
    `;
};
