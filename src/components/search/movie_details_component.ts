import { Injector } from '../../injector';
import { MovieFromSearchResult } from '../../model/movie_from_search_result';
import { MovieReview } from '../../model/movie_review';
import { MovieSimilarResult } from '../../model/similar_movies';
import { Trailer } from '../../model/trailer';
import { getImage } from '../../service/image_helpers';
import { MovieDetailsResponse } from '../../service/movie_details_service';
import { createEl, createTextNode } from '../dom_helpers/basic';
import { LoadingIndicator } from '../loading_indicator';
import './movie_details_component.css';

export function movieDetailsComponent(
  injector: Injector,
  movie: MovieFromSearchResult,
): HTMLElement {
  const detailsUlList = createEl('ul', [
    createEl('li', [createTextNode(`Year: ${movie.release_year.toString()}`)]),
    createEl('li', [
      createTextNode(`Vote average: ${movie.vote_average.toString()}`),
    ]),
  ]);
  const loadingIndicator = new LoadingIndicator();
  const similarMoviesDiv = createEl('div', {
    attrs: { className: 'similar-moviews' },
  });

  injector.movieDetailsService
    .getMovieDetails({ movieId: movie.id })
    .then((response: MovieDetailsResponse) => {
      const movieDetails = response.details;
      loadingIndicator.hide();
      detailsUlList.appendChild(
        createEl('li', createTrailerItem(movieDetails.trailers)),
      );
      detailsUlList.appendChild(
        createEl('li', createReviewsItem(movieDetails.reviews)),
      );
      for (const node of createSimilarMoviesItem(movieDetails.similarMoviews)) {
        similarMoviesDiv.appendChild(node);
      }
    });
  return createEl('div', {
    attrs: {
      id: `movie_${movie.id}`,
      className: 'movie-details',
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
          }),
          createEl('div', [
            createTextNode(movie.overview),
            detailsUlList,
            loadingIndicator.asHTMLElement(),
          ]),
        ],
      }),
      similarMoviesDiv,
    ],
  });
}

function createTrailerItem(trailers: Trailer[]): Node[] {
  if (trailers.length === 0) {
    return [createTextNode('Trailers: N/A')];
  }
  return [
    createTextNode('Trailers:'),
    createEl(
      'ul',
      trailers.map(trailer =>
        createEl('li', [
          createEl('a', {
            attrs: { href: trailer.url, target: '_blank' },
            children: [createTextNode(trailer.name)],
          }),
        ]),
      ),
    ),
  ];
}

function createReviewsItem(reviews: MovieReview[]): Node[] {
  if (reviews.length === 0) {
    return [createTextNode('Reviews: N/A')];
  }
  return [
    createTextNode('Reviews:'),
    createEl(
      'ul',
      reviews.map(review => {
        return createEl('li', [
          createTextNode(trimContent(review.content, 400)),
          createTextNode(' '),
          createEl('a', {
            attrs: { href: review.url, target: '_blank' },
            children: [createTextNode('See full review')],
          }),
        ]);
      }),
    ),
  ];
}

function trimContent(content: string, maxSize: number) {
  if (content.length <= maxSize) {
    return content;
  }
  const contentTrimmed = content.slice(0, maxSize);
  const indexLastSpace = contentTrimmed.lastIndexOf(' ');
  if (indexLastSpace === -1) {
    return `${contentTrimmed}...`;
  } else {
    return `${contentTrimmed.slice(0, indexLastSpace)}...`;
  }
}

function createSimilarMoviesItem(similarMovies: MovieSimilarResult[]): Node[] {
  if (similarMovies.length === 0) {
    return [createTextNode('Similar movies: N/A')];
  }
  return [
    createEl('div', {
      attrs: { className: 'similar-movies-title' },
      children: [createTextNode('Similar movies:')],
    }),
    createEl('div', {
      attrs: { className: 'similar-movies-list' },
      children: similarMovies.map(movie => {
        return createEl('div', [
          createEl('img', {
            attrs: {
              src: getImage({ path: movie.poster_path, size: 'w92' }),
              alt: movie.title,
              title: movie.title,
            },
          }),
        ]);
      }),
    }),
  ];
}
