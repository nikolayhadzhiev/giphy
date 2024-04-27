/* eslint-disable max-len */
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../../data/favorites.js';
import { q } from '../helpers/helpers.js';
import { loadRandomGif } from '../../requests/request-service.js';
import { EMPTY_HEART, FULL_HEART } from '../../common/constants.js';

/**
 * Toggles the favorite status of a GIF based on the provided gifId.
 * If the GIF is already in favorites, it removes it; otherwise, it adds it.
 *
 * @param {string} gifId The ID of the GIF to toggle the favorite status.
 * @author Nikolay Hadzhiev
 */
export const toggleFavoriteStatus = (gifId) => {
  const favorites = getFavorites();

  if (favorites.includes(gifId)) {
    removeFavorite(gifId);
  } else {
    addFavorite(gifId);
  }

  q('#favorite-div').innerHTML = renderFavoriteStatus(gifId);
};

export const renderFavoriteStatus = (gifId) => {
  const favorites = getFavorites();

  return favorites.includes(gifId)
    ? `<span class="favorite active" data-gif-id="${gifId}">${FULL_HEART}</span><p>Remove from favorites</p>`
    : `<span class="favorite" data-gif-id="${gifId}">${EMPTY_HEART}</span><p>Add to favorites</p>`;
};

/**
 * Loads and displays another random GIF by updating the image source,
 * ID, and alt attribute of the current GIF.
 * @author Nikolay Hadzhiev
 */
export const getAnotherRandomGif = async () => {
  const getNewGif = await loadRandomGif();
  const currentGif = q('img[data-random-gif="random-gif"]');
  currentGif.src = getNewGif.images.original.url;
  currentGif.id = getNewGif.id;
  currentGif.alt = getNewGif.title;
};
