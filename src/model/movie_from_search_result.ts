import { MovieBase } from './movie_base';

export interface MovieFromSearchResult extends MovieBase {
  release_year: number;
  genre_ids: number[];
}
