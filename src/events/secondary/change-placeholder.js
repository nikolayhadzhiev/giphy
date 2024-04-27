import {q} from '../helpers/helpers.js';

/**
 * Changes the placeholder text of the search input field based on the mouse hover events.
 * @author Nikolay Hadzhiev
 */
export const changePlaceholderOnHover = () => {
  const searchBar = q('#search');
  searchBar.addEventListener('mouseover', () => {
    searchBar.placeholder =
      'Type a keyword and hit enter or click the search button...';
  });

  searchBar.addEventListener('mouseout', () => {
    searchBar.placeholder = 'Looking for a GIF?';
  });
};
