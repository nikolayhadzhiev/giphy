/* eslint-disable max-len */
export const toGifDetailsView = (gif) => {
  return `
  <div id="myModal" class="modal">
  <span class="close">&times;</span>
  <img class="modal-content" id="img01" src="${gif.images.downsized_large.url}"/>
  <div id="caption">${gif.title}</div>
</div>`;
};

export const toGifSimple = (gif) => `
<div class="gif" id="${gif.id}">
  <img src="${gif.images.downsized_large.url}" class="select-gif" id="${gif.id}" alt="${gif.title}">
</div>`;
