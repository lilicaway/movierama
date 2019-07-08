import { GenreTmdbResponse } from './types/genre';
import {
  MovieCurrentlyPlayingTmdbRequest,
  MovieCurrentlyPlayingTmdbResponse,
} from './types/movie_currently_playing';
import { MovieTmdbRequest, MovieTmdbResponse } from './types/movie_details';
import {
  MovieReviewsTmdbRequest,
  MovieReviewsTmdbResponse,
} from './types/movie_reviews';
import {
  MovieSearchTmdbRequest,
  MovieSearchTmdbResponse,
} from './types/movie_search';
import {
  MoviesSimilarTmdbRequest,
  MoviesSimilarTmdbResponse,
} from './types/movie_similar';
import {
  MovieVideosTmdbRequest,
  MovieVideosTmdbResponse,
} from './types/movie_videos';

export interface TmdbApi {
  getNowPlaying(
    request: MovieCurrentlyPlayingTmdbRequest,
  ): Promise<MovieCurrentlyPlayingTmdbResponse>;

  getGenres(): Promise<GenreTmdbResponse>;
  getMovieDetails(request: MovieTmdbRequest): Promise<MovieTmdbResponse>;
  getMovieVideos(
    request: MovieVideosTmdbRequest,
  ): Promise<MovieVideosTmdbResponse>;
  getMovieReviews(
    request: MovieReviewsTmdbRequest,
  ): Promise<MovieReviewsTmdbResponse>;
  getMoviesSimilar(
    request: MoviesSimilarTmdbRequest,
  ): Promise<MoviesSimilarTmdbResponse>;
  searchMovies(
    request: MovieSearchTmdbRequest,
  ): Promise<MovieSearchTmdbResponse>;
}

export class TmdbApiImpl implements TmdbApi {
  constructor(
    private readonly apiKey: string,
    private readonly language = 'en_US',
  ) {}

  /** https://developers.themoviedb.org/3/movies/get-now-playing */
  public async getNowPlaying(
    request: MovieCurrentlyPlayingTmdbRequest,
  ): Promise<MovieCurrentlyPlayingTmdbResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=${this.language}&page=${request.page}`,
    );
    if (response.status !== 200) {
      return Promise.reject(
        `Error ${response.status} - ${response.statusText}`,
      );
    }
    return response.json();
  }

  /** https://developers.themoviedb.org/3/genres */
  public async getGenres(): Promise<GenreTmdbResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=${this.language}`,
    );
    if (response.status !== 200) {
      return Promise.reject(
        `Error ${response.status} - ${response.statusText}`,
      );
    }
    return response.json();
  }

  /** https://developers.themoviedb.org/3/search/search-movies */
  public async searchMovies(
    request: MovieSearchTmdbRequest,
  ): Promise<MovieSearchTmdbResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=${this.language}&query=${request.query}&page=${request.page}`,
    );
    if (response.status !== 200) {
      return Promise.reject(
        `Error ${response.status} - ${response.statusText}`,
      );
    }
    const searchResponse = await response.json();
    return searchResponse;
  }

  /** https://developers.themoviedb.org/3/movies/get-movie-details */
  public async getMovieDetails(
    request: MovieTmdbRequest,
  ): Promise<MovieTmdbResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${encodeURIComponent(
        request.movieId,
      )}?api_key=${this.apiKey}&language=${this.language}`,
    );
    if (response.status !== 200) {
      return Promise.reject(
        `Error ${response.status} - ${response.statusText}`,
      );
    }
    const movieResponse: MovieTmdbResponse = await response.json();
    return movieResponse;
  }

  /** https://developers.themoviedb.org/3/movies/get-movie-videos */
  public async getMovieVideos(
    request: MovieVideosTmdbRequest,
  ): Promise<MovieVideosTmdbResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${encodeURIComponent(
        request.movieId,
      )}/videos?api_key=${this.apiKey}&language=${this.language}`,
    );
    if (response.status !== 200) {
      return Promise.reject(
        `Error ${response.status} - ${response.statusText}`,
      );
    }
    const movieVideos: MovieVideosTmdbResponse = await response.json();
    return movieVideos;
  }

  /** https://developers.themoviedb.org/3/movies/get-movie-reviews */
  public async getMovieReviews(
    request: MovieReviewsTmdbRequest,
  ): Promise<MovieReviewsTmdbResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${encodeURIComponent(
        request.moveId,
      )}/reviews?api_key=${this.apiKey}&language=${this.apiKey}`,
    );
    if (response.status !== 200) {
      return Promise.reject(
        `Error ${response.status} - ${response.statusText}`,
      );
    }
    const movieReviews = await response.json();
    return movieReviews;
  }

  /** https://developers.themoviedb.org/3/movies/get-similar-movies */
  public async getMoviesSimilar(
    request: MoviesSimilarTmdbRequest,
  ): Promise<MoviesSimilarTmdbResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${encodeURIComponent(
        request.movieId,
      )}/similar?api_key=${this.apiKey}&language=${this.language}&page=${
        request.page
      }`,
    );
    if (response.status !== 200) {
      return Promise.reject(
        `Error ${response.status} - ${response.statusText}`,
      );
    }
    const similarMovies = await response.json();
    return similarMovies;
  }
}
