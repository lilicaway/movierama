import { MovieBase } from './movie_base';

export interface MovieNowPlaying extends MovieBase {
  release_year: number;
  genres: string[];
}
