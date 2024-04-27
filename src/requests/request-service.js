import {
  GIPHY_API_KEY,
  MIN_DISPLAY_LIMIT,
  MEDIUM_DISPLAY_LIMIT,
  MAX_DISPLAY_LIMIT,
  RATING,
} from '../common/constants.js';

export const loadSelectedGif = async (id) => {
  try {
    const request = await fetch(
      `https://api.giphy.com/v1/gifs/${id}?api_key=${GIPHY_API_KEY}&rating=${RATING}`
    );

    const requestJSON = await request.json();
    return requestJSON.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const loadSearchGifs = async (searchTerm = '') => {
  try {
    const request = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=${MAX_DISPLAY_LIMIT}&rating=${RATING}`
    );

    const requestJSON = await request.json();
    return requestJSON.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const loadTrendingGifs = async (
  offset = 0,
  limit = MAX_DISPLAY_LIMIT
) => {
  try {
    const request = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&rating=${RATING}&offset=${offset}`
    );

    const requestJSON = await request.json();
    return requestJSON.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const loadRandomGif = async () => {
  try {
    const gif = await fetch(
      `https://api.giphy.com/v1/gifs/random/?api_key=${GIPHY_API_KEY}&limit=${MIN_DISPLAY_LIMIT}&rating=${RATING}`
    );

    const gifJson = await gif.json();

    return gifJson.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const uploadGif = async (sourceFile) => {
  try {
    const data = new FormData();
    data.append('file', sourceFile);
    const uploadUrl = 'https://upload.giphy.com/v1/gifs?api_key=';

    const response = await fetch(`${uploadUrl}${GIPHY_API_KEY}`, {
      method: 'POST',
      body: data,
    });

    const result = await response.json();

    const uploadedGif = await loadSelectedGif(result.data.id);

    return uploadedGif;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};
