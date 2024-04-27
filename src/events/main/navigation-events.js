/* eslint-disable max-len */
import {
  ABOUT,
  UPLOADS,
  CONTAINER_SELECTOR,
  FAVORITES,
  TRENDING,
  MAX_DISPLAY_LIMIT,
} from '../../common/constants.js';
import {
  loadRandomGif,
  loadSelectedGif,
  loadTrendingGifs,
} from '../../requests/request-service.js';
import { toAboutView } from '../../views/about-view.js';
import { toFavoritesView } from '../../views/favorites-view.js';
import { toTrendingView } from '../../views/trending-view.js';
import { toUploadView } from '../../views/upload-view.js';
import { q, setActiveNav } from '../helpers/helpers.js';
import { getFavorites } from '../../data/favorites.js';
import { drop, submit } from './upload-events.js';
import { displayGifDetails } from './display-gif-details.js';
import { displayRandomGif } from '../../views/favorites-view.js';
import { getUploaded } from '../../data/uploaded.js';

// public API
/**
 * Renders the searched gifs based on the provided search term.
 *
 * @param {string} page The page to load. It can be one of the following constants: TRENDING, UPLOADS, FAVORITES, ABOUT
 */
export const loadPage = async (page = '') => {
  switch (page) {
    case TRENDING:
      setActiveNav(TRENDING);
      return await renderTrending();

    case UPLOADS:
      setActiveNav(UPLOADS);
      return await renderUploads();

    case FAVORITES:
      setActiveNav(FAVORITES);
      return renderFavorites();

    case ABOUT:
      setActiveNav(ABOUT);
      return renderAbout();

    /* if the app supports error login, use default to log mapping errors */
    default:
      return null;
  }
};

/**
 * Display GIFs details.
 * @author Nikolay Hadzhiev
 */
export const renderGifDetails = async (id = null) => {
  try {
    const singleGif = await loadSelectedGif(id);
    displayGifDetails(singleGif);
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Display trending GIFs with infinite scroll.
 * @author Nikolay Hadzhiev
 */
// private functions
const renderTrending = async () => {
  try {
    const currentPage = q('.nav-link.active').getAttribute('data-page');
    if (currentPage !== 'trending') return;

    let loading = false;
    let offset = 0;

    // Initial load of trending GIFs
    const trendingGifs = await loadTrendingGifs(offset);
    q(CONTAINER_SELECTOR).innerHTML = toTrendingView(trendingGifs);

    window.addEventListener('scroll', async () => {
      const containerHeight = q(CONTAINER_SELECTOR).offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (!loading && scrollY + windowHeight >= containerHeight) {
        loading = true; // Set loading to true to prevent concurrent loading
        offset += MAX_DISPLAY_LIMIT; // Adjust the offset

        // Update the existing content with the newly fetched GIFs
        const newTrendingGifs = await loadTrendingGifs(offset);
        q('.trending-content').innerHTML += toTrendingView(newTrendingGifs);

        loading = false; // Set loading back to false when loading is complete
      }
    });
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Renders the uploaded GIFs.
 * @author Atanas Georgiev
 */
const renderUploads = async () => {
  const uploadedGifs = getUploaded();
  q(CONTAINER_SELECTOR).innerHTML = toUploadView(uploadedGifs);
  drop();
  submit();
};

/**
 * Renders a random GIF.
 * @author Nikolay Hadzhiev
 */
export const renderRandomGif = async () => {
  try {
    const randomGif = await loadRandomGif();
    q(CONTAINER_SELECTOR).innerHTML = displayRandomGif(randomGif);
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Renders the favorite GIFs.
 * @author Nikolay Hadzhiev
 */
const renderFavoriteGifs = async () => {
  try {
    const favorites = getFavorites();

    const favoritesPromises = favorites.map((id) => loadSelectedGif(id));
    const favoriteGifs = await Promise.all(favoritesPromises);

    q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(favoriteGifs);
  } catch (e) {
    console.log(e.message);
  }
};

const renderFavorites = () => {
  if (getFavorites().length > 0) {
    return renderFavoriteGifs();
  } else {
    return renderRandomGif();
  }
};

const renderAbout = () => {
  q(CONTAINER_SELECTOR).innerHTML = toAboutView();
};
