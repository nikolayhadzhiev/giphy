import {toGifSimple} from './gifs-views.js';

export const toTrendingView = (trendingGifs) => `
<div id="trending-gifs">
  <div class="trending-content">
    ${
  trendingGifs.map(toGifSimple).join('\n') ||
      '<p>There are no trending gifs.</p>'
}
  </div>
</div>
`;
