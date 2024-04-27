/* eslint-disable max-len */
import {FAVORITES, TRENDING} from './common/constants.js';
import {
  toggleFavoriteStatus,
  getAnotherRandomGif,
} from './events/main/favorites-events.js';
import {loadPage, renderGifDetails} from './events/main/navigation-events.js';
import {handleSearch} from './events/main/search-events.js';
import {
  displayToTopButton,
  scrollToTop,
} from './events/secondary/to-top-button.js';
import {closeGifDetails} from './events/main/display-gif-details.js';
import {changePlaceholderOnHover} from './events/secondary/change-placeholder.js';
import {createGifDetails} from './views/gif-details.view.js';
import {q} from './events/helpers/helpers.js';
import {addToFavoritesNotification} from './events/secondary/add-remove-favorites-notification.js';

document.addEventListener('DOMContentLoaded', () => {
  // add global listener
  document.addEventListener('click', async (e) => {
    // nav events
    if (e.target.classList.contains('nav-link')) {
      await loadPage(e.target.getAttribute('data-page'));
    }

    // display gif details events
    if (e.target.classList.contains('select-gif')) {
      createGifDetails();
      await renderGifDetails(e.target.getAttribute('id'));
    }

    if (e.target.classList.contains('close')) {
      closeGifDetails();
    }

    if (e.target.classList.contains('modal-content')) {
      window.open(e.target.src, '_blank');
    }

    // toggle favorite event
    if (e.target.classList.contains('favorite')) {
      toggleFavoriteStatus(e.target.getAttribute('data-gif-id'));
      // Add to/Remove from favorites notification
      addToFavoritesNotification();
      // refresh favorites page automatically for adding/removing from favorites, only when we are not currently on random gif view
      const favPage = q('[data-page="favorites"]');
      const randomGifView = q('.random');
      if (favPage.classList.contains('active') && !randomGifView) {
        loadPage(FAVORITES);
      }
    }

    // Button to get another random gif on favorites pages
    if (e.target.classList.contains('random-gif-button')) {
      getAnotherRandomGif();
    }
  });

  loadPage(TRENDING);

  // search events
  handleSearch();

  // Show the scroll to top button
  displayToTopButton();

  // Scroll to top button event
  scrollToTop();

  // Change search bar placeholder text
  changePlaceholderOnHover();
});
