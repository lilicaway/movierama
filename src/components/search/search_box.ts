import { createEl } from '../dom_helpers/basic';

export function createSearchInputBox(callback: (inputValue: string) => void) {
  const input = createEl('input', {
    attrs: {
      type: 'text',
      autofocus: true,
      placeholder: 'Search movie',
    },
    events: [
      {
        type: 'input',
        listener: (thisInput: HTMLInputElement, evt: Event) => {
          const value = thisInput.value;
          setTimeout(() => {
            if (value === thisInput.value) {
              callback(value);
            }
          }, 500);
        },
      },
    ],
  });
  return input;
}
