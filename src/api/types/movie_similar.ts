import MovieBaseTmdb from './movie_base';

export interface MoviesSimilarTmdbRequest {
  movieId: number;
  page: number;
}

export interface MoviesSimilarTmdbResponse {
  page: number;
  results: MovieSimilarResultTmdb[];
  total_pages: number;
  total_results: number;
}

export interface MovieSimilarResultTmdb extends MovieBaseTmdb {
  genre_ids: number[];
}
