import { MovieBase } from './movie_base';
import { MovieReview } from './movie_review';
import { MovieSimilarResult } from './similar_movies';
import { Trailer } from './trailer';

export interface MovieDetails extends MovieBase {
  genre: string[];
  revenue: number;
  runtime: number | null;
  release_date: string;
  trailers: Trailer[];
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  reviews: MovieReview[];
  similarMoviews: MovieSimilarResult[];
}
