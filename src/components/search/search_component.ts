import { Injector } from '../../injector';
import { createEl, createTextNode, isElHidden } from '../dom_helpers/basic';
import {
  isThereStillRoomAtBottomOfVisibileArea,
  whenScrollIsNearTheBottom,
} from '../dom_helpers/infinite_scroll';
import { LoadingIndicator } from '../loading_indicator';
import { createSearchInputBox } from './search_box';
import './search_component.css';
import { searchResultComponent } from './search_result_component';

export function searchComponent(injector: Injector): HTMLElement {
  const searchBoxContainer = createEl('div', {
    attrs: { className: 'search-box' },
    children: [
      createSearchInputBox((inputValue: string) => {
        searchValue = inputValue;
        currentPage = 0;
        lastPageReached = false;
        // Remove previous search results
        while (resultsContainer.firstChild) {
          resultsContainer.removeChild(resultsContainer.firstChild);
        }
        triggerNextPage();
      }),
    ],
  });
  const resultsContainer = createEl('div', {
    attrs: { className: 'results-container' },
  });
  const loadingIndicator = new LoadingIndicator();
  loadingIndicator.hide();
  const rootElem = createEl('div', {
    attrs: { className: 'search-container' },
    children: [
      searchBoxContainer,
      resultsContainer,
      loadingIndicator.asHTMLElement(),
    ],
  });

  let currentPage = 0;
  let requestInFlight = true;
  let lastPageReached = false;
  let searchValue: string;

  const triggerNextPage = async () => {
    if (lastPageReached || searchValue === '') {
      return;
    }
    if (currentPage !== 0 && isElHidden(rootElem)) {
      return;
    }
    currentPage++;
    requestInFlight = true;
    loadingIndicator.show();

    const query = searchValue;
    const response = await injector.searchMovieService.getSearchMovies({
      query,
      page: currentPage,
    });

    if (query !== searchValue) {
      return;
    }
    if (response.totalResults === 0) {
      resultsContainer.appendChild(createTextNode('No results'));
    } else {
      for (const movie of response.results) {
        resultsContainer.appendChild(
          createEl('div', [searchResultComponent(injector, movie)]),
        );
      }
    }
    requestInFlight = false;
    if (currentPage >= response.totalPages) {
      lastPageReached = true;
    }
    loadingIndicator.hide();

    // Just in case the results so far don't fill all the available space to
    // cover the window.
    if (isThereStillRoomAtBottomOfVisibileArea()) {
      triggerNextPage();
    }
  };

  whenScrollIsNearTheBottom({
    triggerOffsetPx: 10,
    callback: () => {
      if (requestInFlight) {
        return;
      }
      triggerNextPage();
    },
  });

  return rootElem;
}
