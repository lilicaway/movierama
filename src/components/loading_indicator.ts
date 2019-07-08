import { createEl, createTextNode } from './dom_helpers/basic';
import './loading_indicator.css';

export class LoadingIndicator {
  private readonly div: HTMLDivElement;

  constructor() {
    this.div = createEl('div', {
      attrs: { className: 'loading-indicator' },
      children: [createTextNode('Loading...')],
    });
  }

  public asHTMLElement(): HTMLElement {
    return this.div;
  }

  public hide() {
    this.div.classList.add('hidden');
  }
  public show() {
    this.div.classList.remove('hidden');
  }
}

export function isLoadingIndicatorShowing(ancestor: HTMLElement | Document) {
  return !ancestor
    .querySelector('.loading-indicator')!
    .classList.contains('hidden');
}
