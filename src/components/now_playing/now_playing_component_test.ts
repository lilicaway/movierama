import { TmdbApiMock } from '../../api/testing/tmdb_api_mock';
import { Injector } from '../../injector';
import {
  MoviesNowPlayingRequest,
  MoviesNowPlayingResponse,
} from '../../service/movies_now_playing_service';
import { isLoadingIndicatorShowing } from '../loading_indicator';
import { nowPlayingMoviesComponent } from './now_playing_component';

type Mutable<T> = { -readonly [P in keyof T]: T[P] };

describe('nowPlayingMoviesComponent', () => {
  let injector: Mutable<Injector>;
  let response: Promise<MoviesNowPlayingResponse>;
  let component: HTMLElement;

  beforeEach(async () => {
    jasmine.clock().install();

    injector = new Injector();

    const tmdbApi = new TmdbApiMock();
    injector.tmdbApi = tmdbApi;

    // We want to intercept the call to the service and store the response
    // from the call to the original one.
    const original = injector.moviewsNowPlayingService.getNowPlaying;
    spyOn(injector.moviewsNowPlayingService, 'getNowPlaying').and.callFake(
      (request: MoviesNowPlayingRequest): Promise<MoviesNowPlayingResponse> => {
        response = original.call(injector.moviewsNowPlayingService, request);
        return response;
      },
    );

    component = nowPlayingMoviesComponent(injector);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('shows the movies', async () => {
    document.body.appendChild(component);

    expect(document.querySelectorAll('.now-playing-movie').length).toBe(0);
    expect(isLoadingIndicatorShowing(document)).toBe(true);

    jasmine.clock().tick(1);
    await response;

    expect(document.querySelectorAll('.now-playing-movie').length).toBe(20);
    expect(isLoadingIndicatorShowing(document)).toBe(false);
  });
});
