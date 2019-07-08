import { Injector } from '../injector';
import { MovieDetails } from '../model/movie_details';

export class MovieDetailsService {
  constructor(private readonly injector: Injector) {}

  public async getMovieDetails(
    request: MovieDetailsRequest,
  ): Promise<MovieDetailsResponse> {
    const [
      detailsResponse,
      movieTrailer,
      movieReviews,
      similarMovies,
    ] = await Promise.all([
      this.injector.tmdbApi.getMovieDetails(request),
      this.injector.trailerService.getTrailers(request),
      this.injector.tmdbApi.getMovieReviews({ moveId: request.movieId }),
      this.injector.tmdbApi.getMoviesSimilar({
        movieId: request.movieId,
        page: 1,
      }),
    ]);
    return {
      details: {
        id: detailsResponse.id,
        poster_path: detailsResponse.poster_path,
        title: detailsResponse.title,
        vote_average: detailsResponse.vote_average,
        overview: detailsResponse.overview,
        revenue: detailsResponse.revenue,
        runtime: detailsResponse.runtime || 0,
        genre: detailsResponse.genres.map(genre => genre.name).sort(),
        release_date: detailsResponse.release_date,
        status: detailsResponse.status,
        trailers: movieTrailer.trailers,
        reviews: movieReviews.results.slice(0, 2),
        similarMoviews: similarMovies.results,
      },
    };
  }
}

export interface MovieDetailsRequest {
  movieId: number;
}

export interface MovieDetailsResponse {
  details: MovieDetails;
}
