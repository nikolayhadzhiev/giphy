export const createGifDetails = () => {
  const modalDiv = document.createElement('div');
  modalDiv.id = 'myModal';
  modalDiv.classList.add('modal');
  const span = document.createElement('span');
  span.classList.add('close');
  span.innerHTML = '&times;';
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modal-container';
  const imgAndCaptionDiv = document.createElement('div');
  imgAndCaptionDiv.id = 'img-caption-div';
  const img = document.createElement('img');
  img.classList.add('modal-content');
  img.id = 'img01';
  const caption = document.createElement('div');
  caption.id = 'caption';
  const favoriteStatus = document.createElement('div');
  favoriteStatus.id = 'favorite-div';
  const copyLink = document.createElement('div');
  copyLink.id = 'copy-link-div';
  const copyLinkIcon = document.createElement('span');
  copyLinkIcon.id = 'copy-link-icon';
  copyLinkIcon.innerHTML = '🔗';
  const gifInfo = document.createElement('div');
  gifInfo.id = 'gif-info-div';

  copyLink.append(copyLinkIcon);

  imgAndCaptionDiv.append(caption);
  imgAndCaptionDiv.append(img);

  gifInfo.append(favoriteStatus);
  gifInfo.append(copyLink);

  modalContainer.append(imgAndCaptionDiv);
  modalContainer.append(gifInfo);

  modalDiv.append(span);
  modalDiv.append(modalContainer);

  document.body.appendChild(modalDiv);
};
