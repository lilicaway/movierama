import { MovieSearchTmdbRequest } from '../api/types/movie_search';
import { Injector } from '../injector';
import { MovieFromSearchResult } from '../model/movie_from_search_result';

export class SearchMovieService {
  constructor(private readonly injector: Injector) {}

  public async getSearchMovies(
    request: SearchMovieRequest,
  ): Promise<SearcMovieResponse> {
    const searchMovieResponse = await this.injector.tmdbApi.searchMovies(
      request,
    );
    return {
      page: searchMovieResponse.page,
      results: searchMovieResponse.results.map(movieTmdb => {
        return {
          ...movieTmdb,
          release_year: new Date(movieTmdb.release_date).getFullYear(),
        };
      }),
      totalResults: searchMovieResponse.total_results,
      totalPages: searchMovieResponse.total_pages,
    };
  }
}

export type SearchMovieRequest = MovieSearchTmdbRequest;

export interface SearcMovieResponse {
  page: number;
  results: MovieFromSearchResult[];
  totalResults: number;
  totalPages: number;
}
