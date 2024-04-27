/* eslint-disable max-len */
import {CONTAINER_SELECTOR} from '../../common/constants.js';
import {loadSearchGifs} from '../../requests/request-service.js';
import {toSearchView} from '../../views/search-view.js';
import {q, qs} from '../helpers/helpers.js';

export const renderSearchGifs = async (searchTerm) => {
  try {
    const searchedGifs = await loadSearchGifs(searchTerm);
    q(CONTAINER_SELECTOR).innerHTML = toSearchView(searchedGifs, searchTerm);
  } catch (e) {
    console.log(e.mess,
    );
  }
};

const noActiveTab = () => {
  const navs = qs('a.nav-link');

  Array.from(navs).forEach((element) => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  });
};

// Function to enable the use of enter and search button for searching gifs
export const handleSearch = () => {
  // Click search button to search gifs
  q('#btnSearch').addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const searchTerm = q('input#search').value.trim();
      if (searchTerm) {
        noActiveTab();
        await renderSearchGifs(searchTerm);
        q('input#search').value = '';
      }
    } catch (e) {
      console.log(e.message);
    }
  });

  // Hit enter to search gifs
  q('#search').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      try {
        e.preventDefault();
        const searchTerm = q('input#search').value.trim();
        if (searchTerm) {
          noActiveTab();
          await renderSearchGifs(searchTerm);
          q('input#search').value = '';
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  });
};
