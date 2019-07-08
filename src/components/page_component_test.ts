import { TmdbApiMock } from '../api/testing/tmdb_api_mock';
import { Injector } from '../injector';
import { pageComponent } from './page_component';

type Mutable<T> = { -readonly [P in keyof T]: T[P] };

describe('pageComponent', () => {
  let component: HTMLElement;
  beforeEach(async () => {
    const injector: Mutable<Injector> = new Injector();

    const tmdbApi = new TmdbApiMock();
    injector.tmdbApi = tmdbApi;
    component = pageComponent(injector);
  });

  it('has a default page', () => {
    expect(nowPlayingSectionVisible(component)).toBe(true);
    expect(nowPlayingMenuSelected(component)).toBe(true);
    expect(searchSectionVisible(component)).toBe(false);
    expect(searchMenuSelected(component)).toBe(false);
  });

  it('changes pages when clicking on menu', () => {
    component
      .querySelector('nav li.search-section')!
      .querySelector('button')!
      .click();

    expect(nowPlayingSectionVisible(component)).toBe(false);
    expect(nowPlayingMenuSelected(component)).toBe(false);
    expect(searchSectionVisible(component)).toBe(true);
    expect(searchMenuSelected(component)).toBe(true);

    component
      .querySelector('nav li.now-playing-section')!
      .querySelector('button')!
      .click();

    expect(nowPlayingSectionVisible(component)).toBe(true);
    expect(nowPlayingMenuSelected(component)).toBe(true);
    expect(searchSectionVisible(component)).toBe(false);
    expect(searchMenuSelected(component)).toBe(false);
  });
});

function nowPlayingSectionVisible(component: HTMLElement): boolean {
  return !component
    .querySelector('section.now-playing-section')!
    .classList.contains('hidden');
}
function nowPlayingMenuSelected(component: HTMLElement): boolean {
  return component
    .querySelector('nav li.now-playing-section')!
    .classList.contains('selected');
}

function searchSectionVisible(component: HTMLElement): boolean {
  return !component
    .querySelector('section.search-section')!
    .classList.contains('hidden');
}
function searchMenuSelected(component: HTMLElement): boolean {
  return component
    .querySelector('nav li.search-section')!
    .classList.contains('selected');
}
