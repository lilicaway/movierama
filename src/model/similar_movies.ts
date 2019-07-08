import { MovieBase } from './movie_base';

export interface MovieSimilarResult extends MovieBase {
  genre_ids: number[];
}
