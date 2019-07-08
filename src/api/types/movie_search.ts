import MovieBaseTmdb from './movie_base';

export interface MovieSearchTmdbRequest {
  query: string;
  page: number;
}

export interface MovieSearchTmdbResponse {
  page: number;
  results: MovieSearchTmdb[];
  total_results: number;
  total_pages: number;
}

interface MovieSearchTmdb extends MovieBaseTmdb {
  genre_ids: number[];
}
