/* eslint-disable max-len */
import {q} from '../helpers/helpers.js';

let notificationActive = false;

export const addToFavoritesNotification = () => {
  const favHeart = q('.favorite');
  const modalContent = q('#myModal');
  const closeBtn = q('.close');

  if (notificationActive) {
    return;
  }

  const addedToFavNotification = document.createElement('div');
  addedToFavNotification.id = 'notification-div';
  addedToFavNotification.classList.add('active');

  const notificationText = document.createElement('p');
  if (favHeart.classList.contains('active')) {
    notificationText.textContent = `The GIF was added successfully to Favorites!`;
  } else {
    notificationText.textContent = `The GIF was removed successfully from Favorites!`;
  }

  addedToFavNotification.append(notificationText);

  modalContent.prepend(addedToFavNotification);
  closeBtn.style.top = '60px';
  notificationActive = true;

  setTimeout(() => {
    closeBtn.style.top = '15px';
    addedToFavNotification.classList.remove('active');
    setTimeout(() => {
      modalContent.removeChild(addedToFavNotification);
      notificationActive = false;
    }, 300);
  }, 2000);
};
