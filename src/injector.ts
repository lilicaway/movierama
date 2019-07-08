import { getApiKey } from './api/api_key';
import { TmdbApi, TmdbApiImpl } from './api/tmdb_api';
import { MovieDetailsService } from './service/movie_details_service';
import { MoviesNowPlayingService } from './service/movies_now_playing_service';
import { SearchMovieService } from './service/search_movie_service';
import { TrailerService } from './service/trailer_service';

export class Injector {
  public readonly tmdbApi: TmdbApi = new TmdbApiImpl(getApiKey());
  public readonly trailerService = new TrailerService(this);
  public readonly searchMovieService = new SearchMovieService(this);
  public readonly movieDetailsService = new MovieDetailsService(this);
  public readonly moviewsNowPlayingService = new MoviesNowPlayingService(this);
}
