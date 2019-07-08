import { Injector } from '../../injector';
import { MovieFromSearchResult } from '../../model/movie_from_search_result';
import { createEl, createTextNode } from '../dom_helpers/basic';
import {
  collapseSection,
  toggleExpansion,
} from '../dom_helpers/collapse_expand';
import { movieDetailsComponent } from './movie_details_component';
import './search_result_component.css';

export function searchResultComponent(
  injector: Injector,
  movie: MovieFromSearchResult,
): HTMLElement {
  const placeHolderForDetails = createEl('div', {
    attrs: { className: 'search-result-details' },
  });
  collapseSection(placeHolderForDetails);

  return createEl('div', {
    attrs: {
      id: `movie_${movie.id}`,
      className: 'search-result',
    },
    children: [
      createEl('div', {
        attrs: { className: 'search-result-summary' },
        children: [
          createEl('button', {
            attrs: { className: 'movie-title' },
            events: [
              {
                type: 'click',
                listener: (thisButton: HTMLButtonElement, evt: Event) => {
                  if (placeHolderForDetails.childNodes.length === 0) {
                    placeHolderForDetails.appendChild(
                      movieDetailsComponent(injector, movie),
                    );
                    setTimeout(() => {
                      toggleExpansion(placeHolderForDetails);
                    });
                  } else {
                    toggleExpansion(placeHolderForDetails);
                  }
                },
              },
            ],
            children: [
              createTextNode(`${movie.title} (${movie.release_year})`),
            ],
          }),
        ],
      }),
      placeHolderForDetails,
    ],
  });
}
