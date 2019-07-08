import MovieBaseTmdb from './movie_base';

export interface MovieCurrentlyPlayingTmdbRequest {
  /** Minumum: 1, Maximum: 1000 */
  page: number;
}

export interface MovieCurrentlyPlayingTmdbResponse {
  page: number;
  results: MovieCurrentlyPlayingTmdb[];
  dates: {
    maximum: string; // Representing a date in yyyy-MM-dd
    minimum: string; // Representing a date in yyyy-MM-dd
  };
  total_pages: number;
  total_results: number;
}

export interface MovieCurrentlyPlayingTmdb extends MovieBaseTmdb {
  genre_ids: number[];
}
