/* eslint-disable max-len */
import {q, qs} from '../helpers/helpers.js';
import {uploadGif} from '../../requests/request-service.js';
import {addUploaded} from '../../data/uploaded.js';
import {loadPage} from './navigation-events.js';
import {UPLOADS} from '../../common/constants.js';

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement The drop zone element where the thumbnail will be updated.
 * @param {File} file The file object representing the image or video.
 * @author Atanas Georgiev
 */
export function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb');

  if (!thumbnailElement) {
    thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('drop-zone__thumb');
    dropZoneElement.appendChild(thumbnailElement);
    const submitButton = document.getElementById('submit');
    submitButton.hidden = false;
  }

  thumbnailElement.dataset.label = file.name;

  if (file.type.startsWith('video/')) {
    thumbnailElement.dataset.label = file.name;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const videoElement = document.createElement('video');
      videoElement.src = reader.result;
      videoElement.autoplay = true;
      videoElement.muted = true;
      videoElement.classList.add('video-preview');
      thumbnailElement.innerHTML = '';
      thumbnailElement.appendChild(videoElement);
      dropZoneElement.removeChild(q('.drop-zone__prompt'));
    };
  } else if (file.type.startsWith('image/gif')) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgElement = document.createElement('img');
      imgElement.src = reader.result;
      imgElement.classList.add('gif-preview');
      thumbnailElement.innerHTML = '';
      thumbnailElement.appendChild(imgElement);
      dropZoneElement.removeChild(q('.drop-zone__prompt'));
    };
  } else {
    // thumbnailElement.style.backgroundImage = null;
    thumbnailElement.innerHTML = '';
    dropZoneElement.removeChild(q('.drop-zone__thumb'));
    const submitButton = document.getElementById('submit');
    submitButton.hidden = true;
    alert('Wrong file extension');
    loadPage(UPLOADS);
  }
}

/**
 * Handles the drop event on the drop zone elements.
 * @author Atanas Georgiev
 */

let isUploading = false;

export const drop = () => {
  qs('.drop-zone__input').forEach((inputElement) => {
    const dropZoneElement = inputElement.closest('.drop-zone');

    dropZoneElement.addEventListener('click', (e) => {
      if (!isUploading) {
        inputElement.click();
      }
    });

    inputElement.addEventListener('change', (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZoneElement.classList.add('drop-zone--over');
    });

    ['dragleave', 'dragend'].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove('drop-zone--over');
      });
    });

    dropZoneElement.addEventListener('drop', (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove('drop-zone--over');
    });
  });
};

export const submit = () => {
  const submitButton = q('#submit');

  submitButton.addEventListener('click', async () => {
    const inputElement = q('.drop-zone__input');
    const file = inputElement.files[0];
    try {
      isUploading = true;
      q('.drop-zone').style.cursor = 'wait';
      loading();
      const result = await uploadGif(file);
      addUploaded(result);
      loadPage(UPLOADS);
      isUploading = false;
    } catch (error) {
      console.log(`Error: ${error}`);
      isUploading = false;
    }
  });
};

/**
 * Displays a loading GIF image when the submit button is clicked.
 * @author Atanas Georgiev
 */
const loading = () => {
  const submitContent = q('.submit_btn');
  const submitButton = q('#submit');
  try {
    submitContent.removeChild(submitButton);
    const loadingGif = document.createElement('img');
    loadingGif.src = 'https://media.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif';
    loadingGif.classList.add('loading-gif');
    submitContent.appendChild(loadingGif);
  } catch (e) {
    console.log(e);
  }
};
