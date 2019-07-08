import { LoadingIndicator } from './loading_indicator';

describe('LoadingIndicator', () => {
  let loadingIndicator: LoadingIndicator;
  beforeEach(() => {
    loadingIndicator = new LoadingIndicator();
  });

  it('has the expected content', () => {
    expect(loadingIndicator.asHTMLElement().textContent).toEqual('Loading...');
  });

  it('has the expected class name', () => {
    const el = loadingIndicator.asHTMLElement();
    expect(el.classList.contains('hidden')).toBe(false);
    loadingIndicator.hide();
    expect(el.classList.contains('hidden')).toBe(true);
    loadingIndicator.show();
    expect(el.classList.contains('hidden')).toBe(false);
  });
});
