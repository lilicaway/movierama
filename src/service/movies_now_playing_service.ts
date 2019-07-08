import { GenreTmdb } from '../api/types/genre';
import { Injector } from '../injector';
import { MovieNowPlaying } from '../model/movie_now_playing';

export class MoviesNowPlayingService {
  constructor(private readonly injector: Injector) {}

  public async getNowPlaying(
    request: MoviesNowPlayingRequest,
  ): Promise<MoviesNowPlayingResponse> {
    const [genresMap, nowPlayResponse] = await Promise.all([
      this.getGenresMap(),
      this.injector.tmdbApi.getNowPlaying(request),
    ]);
    return {
      movies: nowPlayResponse.results.map(
        ({
          id,
          poster_path,
          title,
          release_date,
          genre_ids,
          vote_average,
          overview,
        }) => {
          return {
            id,
            poster_path,
            title,
            release_year: new Date(release_date).getFullYear(),
            genres: genre_ids
              .map(genreId => genresMap.get(genreId) || '')
              .sort(),
            vote_average,
            overview,
          };
        },
      ),
      page: nowPlayResponse.page,
      total_pages: nowPlayResponse.total_pages,
      total_results: nowPlayResponse.total_results,
    };
  }

  private async getGenresMap(): Promise<Map<number, string>> {
    const { genres } = await this.injector.tmdbApi.getGenres();

    const genresMap = new Map<number, string>();
    return genres.reduce((accum: Map<number, string>, genre: GenreTmdb) => {
      accum.set(genre.id, genre.name);
      return accum;
    }, genresMap);
  }
}

export interface MoviesNowPlayingRequest {
  /** Minumum: 1, Maximum: 1000 */
  page: number;
}

export interface MoviesNowPlayingResponse {
  page: number;
  movies: MovieNowPlaying[];
  total_pages: number;
  total_results: number;
}
