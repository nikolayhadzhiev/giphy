import {toGifSimple} from './gifs-views.js';

export const toUploadView = (uploadedGifs) =>
  `<div class="drop-zone">
    <span class="drop-zone__prompt">DROP FILE HERE OR CLICK TO UPLOAD</span>
    <input type="file" name="myFile" class="drop-zone__input">
    </div>
    <div class="submit_btn">
    <button id="submit" hidden>Submit</button>
    </div>
    <hr id="line"></hr>
    <div id="uploads-gifs">
    <div class="uploads-content">
        ${
  uploadedGifs.map(toGifSimple).join('\n') ||
          '<p>There are no uploaded GIFs.</p>'
}
    </div>
    </div>`;
