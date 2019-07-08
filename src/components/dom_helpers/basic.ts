// This file contains the utilities to be able to create HTML elements using
// plain vanilla Javascript + DOM.
// It allows to write the elements in a hierarchical way, in a similar way as
// one would write real HTML.

export function createTextNode(text: string) {
  return document.createTextNode(text);
}

export function createEl<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  params?: ElemParams<K> | Node[],
): HTMLElementTagNameMap[K] {
  const elem = document.createElement(tagName);
  if (!params) {
    return elem;
  }
  if (Array.isArray(params)) {
    addAllChildren(elem, params);
    return elem;
  }
  if (params.attrs) {
    for (const attrName in params.attrs) {
      if (!params.attrs.hasOwnProperty(attrName)) {
        continue;
      }
      const attrValue = params.attrs[attrName];
      if (attrValue != null) {
        elem[attrName] = attrValue!;
      }
    }
  }
  if (params.events) {
    for (const event of params.events) {
      elem.addEventListener(
        event.type,
        (evt: Event) => {
          event.listener(elem, evt);
        },
        event.options,
      );
    }
  }
  addAllChildren(elem, params.children);
  return elem;
}

function addAllChildren(elem: HTMLElement, children: Node[] | undefined) {
  if (children) {
    for (const child of children) {
      elem.appendChild(child);
    }
  }
}

export interface ElemParams<K extends keyof HTMLElementTagNameMap> {
  attrs?: Partial<HTMLElementTagNameMap[K]>;
  children?: Node[];
  events?: Array<SupportedEvent<K>>;
}

export interface SupportedEvent<K extends keyof HTMLElementTagNameMap> {
  type: string;
  listener: (thisElem: HTMLElementTagNameMap[K], evt: Event) => void;
  options?: boolean | AddEventListenerOptions;
}

// https://stackoverflow.com/a/21696585/5404394
export function isElHidden(el: HTMLElement) {
  return el.offsetParent === null;
}
