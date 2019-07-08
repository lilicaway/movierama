import { Injector } from '../injector';
import { createEl, createTextNode } from './dom_helpers/basic';
import './image.css';
import { nowPlayingMoviesComponent } from './now_playing/now_playing_component';
import './page_component.css';
import { searchComponent } from './search/search_component';

export function pageComponent(injector: Injector): HTMLElement {
  const navBar = createEl('nav', {
    attrs: { className: 'menu' },
    children: [
      createEl('ul', [
        createEl('li', {
          attrs: {
            className: 'now-playing-section',
          },
          children: [
            createEl('button', {
              children: [createTextNode('In Theaters')],
              events: [
                {
                  type: 'click',
                  listener: (thisButton: HTMLButtonElement, evt: Event) => {
                    evt.preventDefault();
                    showOnlySection(pageDiv, 'now-playing-section');
                  },
                },
              ],
            }),
          ],
        }),
        createEl('li', {
          attrs: {
            className: 'search-section',
          },
          children: [
            createEl('button', {
              children: [createTextNode('Search Movie')],
              events: [
                {
                  type: 'click',
                  listener: (thisAnchor: HTMLButtonElement, evt: Event) => {
                    evt.preventDefault();
                    showOnlySection(pageDiv, 'search-section');
                  },
                },
              ],
            }),
          ],
        }),
      ]),
    ],
  });
  const main = createEl('main', [
    createEl('section', {
      attrs: { className: 'now-playing-section' },
      children: [nowPlayingMoviesComponent(injector)],
    }),
    createEl('section', {
      attrs: { className: 'search-section' },
      children: [searchComponent(injector)],
    }),
  ]);

  const pageDiv = createEl('div', {
    attrs: { className: 'page' },
    children: [navBar, main],
  });
  showOnlySection(pageDiv, 'now-playing-section');
  return pageDiv;
}

function showOnlySection(pageDiv: HTMLDivElement, sectionClassName: string) {
  for (const section of pageDiv.querySelectorAll('section')) {
    if (section.classList.contains(sectionClassName)) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  }
  for (const section of pageDiv.querySelectorAll('nav li')) {
    if (section.classList.contains(sectionClassName)) {
      section.classList.add('selected');
    } else {
      section.classList.remove('selected');
    }
  }
}
