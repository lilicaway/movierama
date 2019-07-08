import { Injector } from '../../injector';
import { MovieNowPlaying } from '../../model/movie_now_playing';
import { getImage } from '../../service/image_helpers';
import { createEl, createTextNode, isElHidden } from '../dom_helpers/basic';
import {
  isThereStillRoomAtBottomOfVisibileArea,
  whenScrollIsNearTheBottom,
} from '../dom_helpers/infinite_scroll';
import { LoadingIndicator } from '../loading_indicator';
import './now_playing_component.css';

export function nowPlayingMoviesComponent(injector: Injector): HTMLDivElement {
  const moviesContainer = createEl('div', {
    attrs: { className: 'movies-container' },
  });
  const loadingIndicator = new LoadingIndicator();
  const rootElem = createEl('div', {
    attrs: { className: 'now-playing-movie-container' },
    children: [moviesContainer, loadingIndicator.asHTMLElement()],
  });

  let currentPage = 0;
  let requestInFlight = true;

  const triggerNextPage = async () => {
    if (currentPage !== 0 && isElHidden(rootElem)) {
      return;
    }
    currentPage++;
    requestInFlight = true;
    loadingIndicator.show();

    const resp = await injector.moviewsNowPlayingService.getNowPlaying({
      page: currentPage,
    });

    for (const movieDiv of resp.movies.map(nowPlayingMovieComponent)) {
      moviesContainer.appendChild(movieDiv);
    }
    requestInFlight = false;
    loadingIndicator.hide();

    // Just in case the results so far don't fill all the available space to
    // cover the window.
    if (isThereStillRoomAtBottomOfVisibileArea()) {
      triggerNextPage();
    }
  };

  // Trigger first page a bit later, when the component is already added to the DOM.
  setTimeout(() => {
    triggerNextPage();
  });

  whenScrollIsNearTheBottom({
    triggerOffsetPx: 10,
    callback: () => {
      if (requestInFlight) {
        return;
      }
      triggerNextPage();
    },
  });

  return rootElem;
}

function nowPlayingMovieComponent(movie: MovieNowPlaying): HTMLElement {
  return createEl('div', {
    attrs: {
      id: `movie_${movie.id}`,
      className: 'now-playing-movie',
    },
    children: [
      createEl('div', {
        attrs: { className: 'poster' },
        children: [
          createEl('img', {
            attrs: {
              id: movie.poster_path,
              className: 'w185',
              src: getImage({ path: movie.poster_path, size: 'w185' }),
            },
          }),
        ],
      }),
      createEl('div', {
        attrs: { className: 'info' },
        children: [
          createEl('div', {
            attrs: { className: 'movie-title' },
            children: [createTextNode(movie.title)],
          }),
          createEl('div', [
            createEl('ul', [
              createEl('li', [
                createTextNode(`Year: ${movie.release_year.toString()}`),
              ]),
              createEl('li', [
                createTextNode(`Genre(s): ${movie.genres.join(', ')}`),
              ]),
              createEl('li', [
                createTextNode(
                  `Vote average: ${movie.vote_average.toString()}`,
                ),
              ]),
            ]),
            createTextNode(movie.overview),
          ]),
        ],
      }),
    ],
  });
}
