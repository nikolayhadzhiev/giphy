import { q } from '../helpers/helpers.js';

let isClicked = false;

/**
 * Displays a notification when the GIF's link is copied.
 * @author Nikolay Hadzhiev
 */
export const copyGifLinkToClipboard = (gif) => {
  const copyLinkIcon = q('#copy-link-icon');
  const modalContent = q('#myModal');
  const closeBtn = q('.close');

  copyLinkIcon.addEventListener('click', () => {
    if (!isClicked) {
      isClicked = true;

      const gifLink = gif.images.original.url;
      navigator.clipboard.writeText(gifLink);

      const copyLinkNotification = document.createElement('div');
      copyLinkNotification.id = 'notification-div';
      copyLinkNotification.classList.add('active');

      const notificationText = document.createElement('p');
      notificationText.textContent = 'Link copied to clipboard!';
      copyLinkNotification.append(notificationText);

      modalContent.prepend(copyLinkNotification);
      closeBtn.style.top = '60px';

      setTimeout(() => {
        isClicked = false;
        closeBtn.style.top = '15px';
        copyLinkNotification.classList.remove('active');
        setTimeout(() => {
          modalContent.removeChild(copyLinkNotification);
        }, 300);
      }, 2000);
    }
  });
};
