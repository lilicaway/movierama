import { GenreTmdb } from './genre';
import MovieBaseTmdb from './movie_base';

export interface MovieTmdbRequest {
  movieId: number;
}

/**
 * https://developers.themoviedb.org/3/movies/get-movie-details
 */
export interface MovieTmdbResponse extends MovieBaseTmdb {
  belongs_to_collection?: object;
  budget: number;
  genres: GenreTmdb[];
  homepage?: string;
  imdb_id?: string;
  production_companies: ProductionCompanyTmdb[];
  production_countries: ProductionCountryTmdb[];
  revenue: number;
  runtime?: number;
  spoken_languages: SpokenLanguageTmdb[];
  status: MovieStatus;
  tagline?: string;
}

export interface ProductionCompanyTmdb {
  name: string;
  id: number;
  logo_path?: string;
  origin_country: string;
}

export interface ProductionCountryTmdb {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguageTmdb {
  iso_639_1: string;
  name: string;
}

export type MovieStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';
