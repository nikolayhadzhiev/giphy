/* eslint-disable max-len */
import { q } from '../helpers/helpers.js';
import { renderFavoriteStatus } from './favorites-events.js';
import { copyGifLinkToClipboard } from '../secondary/copy-gif-link-and-notification.js';

/**
 * Displays the details of a GIF in a modal.
 *
 * @param {object} gif The GIF object containing properties like images
 * @author Nikolay Hadzhiev
 */
export const displayGifDetails = (gif) => {
  const modal = q('#myModal');

  const modalImg = q('#img01');
  const captionText = q('#caption');
  const favDiv = q('#favorite-div');
  const copyLinkDiv = q('#copy-link-div');

  modal.style.display = 'block';
  modalImg.src = gif.images.original.url;
  captionText.innerHTML = gif.title;
  favDiv.innerHTML = renderFavoriteStatus(gif.id);

  const copyLinkText = document.createElement('p');
  copyLinkText.textContent = 'Copy the GIF link';
  copyLinkDiv.append(copyLinkText);

  // Copy gif link to clipboard
  copyGifLinkToClipboard(gif);
};

/**
 * Closes the modal displaying the GIF details.
 * @author Nikolay Hadzhiev
 */
export const closeGifDetails = () => {
  const modal = q('#myModal');
  modal.style.display = 'none';

  document.body.removeChild(modal);
};
