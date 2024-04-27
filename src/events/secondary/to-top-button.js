import {q} from '../helpers/helpers.js';

/**
 * Displays the "To Top" button when the user scrolls
 * down a certain distance from the top of the document.
 * @author Nikolay Hadzhiev
 */
export const displayToTopButton = () => {
  // Get the button
  const myButton = document.getElementById('to-top-btn');
  document.body.appendChild(myButton);

  // When the user scrolls down 100px
  // from the top of the document, show the button
  window.onscroll = function() {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      myButton.style.opacity = '100%';
    } else {
      myButton.style.opacity = '0%';
    }
  };
};

/**
 * Scrolls to the top of the document when the user
 *  clicks on the "To Top" button.
 * @author Nikolay Hadzhiev
 */
// When the user clicks on the button, scroll to the top of the document
export const toTopButton = () => {
  document.body.scrollIntoView({
    behavior: 'smooth',
  });
};

/**
 * Attaches the toTopButton function to the click
 * event of the "To Top" button.
 * @author Nikolay Hadzhiev
 */
export const scrollToTop = () => {
  q('#to-top-btn').addEventListener('click', toTopButton);
};
