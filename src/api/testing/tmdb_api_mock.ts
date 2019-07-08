import { TmdbApi } from '../tmdb_api';
import { GenreTmdbResponse } from '../types/genre';
import {
  MovieCurrentlyPlayingTmdbRequest,
  MovieCurrentlyPlayingTmdbResponse,
} from '../types/movie_currently_playing';
import { MovieTmdbRequest, MovieTmdbResponse } from '../types/movie_details';
import {
  MovieReviewsTmdbRequest,
  MovieReviewsTmdbResponse,
} from '../types/movie_reviews';
import {
  MovieSearchTmdbRequest,
  MovieSearchTmdbResponse,
} from '../types/movie_search';
import {
  MoviesSimilarTmdbRequest,
  MoviesSimilarTmdbResponse,
} from '../types/movie_similar';
import {
  MovieVideosTmdbRequest,
  MovieVideosTmdbResponse,
} from '../types/movie_videos';
import getGenres from './getGenres.json';
import getNowPlayingResp from './getNowPlayingResp.json';

export class TmdbApiMock implements TmdbApi {
  public getNowPlaying(
    request: MovieCurrentlyPlayingTmdbRequest,
  ): Promise<MovieCurrentlyPlayingTmdbResponse> {
    return Promise.resolve(getNowPlayingResp);
  }
  public getGenres(): Promise<GenreTmdbResponse> {
    return Promise.resolve(getGenres);
  }

  // If we were to test more things, we would need to implement these
  // similarly to how the methods from above are implemented.
  public searchMovies(
    request: MovieSearchTmdbRequest,
  ): Promise<MovieSearchTmdbResponse> {
    throw new Error('Method not implemented.');
  }
  public getMovieDetails(
    request: MovieTmdbRequest,
  ): Promise<MovieTmdbResponse> {
    throw new Error('Method not implemented.');
  }
  public getMovieVideos(
    request: MovieVideosTmdbRequest,
  ): Promise<MovieVideosTmdbResponse> {
    throw new Error('Method not implemented.');
  }
  public getMovieReviews(
    request: MovieReviewsTmdbRequest,
  ): Promise<MovieReviewsTmdbResponse> {
    throw new Error('Method not implemented.');
  }
  public getMoviesSimilar(
    request: MoviesSimilarTmdbRequest,
  ): Promise<MoviesSimilarTmdbResponse> {
    throw new Error('Method not implemented.');
  }
}
