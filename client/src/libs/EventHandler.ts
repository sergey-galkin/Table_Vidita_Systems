type Handlers = {
  [key: string]: (event: Event) => void
}

export default class {
  element: HTMLElement;
  handlers: Handlers;

  constructor(element: HTMLElement, handlers: Handlers = {}) {
    this.element = element;
    this.handlers = handlers;
  }
  
  add = () => {
    Object.entries(this.handlers).forEach(
      ([event, handler]) => this.element.addEventListener(event, handler)
    )
  }
  
  remove = () => {
    Object.entries(this.handlers).forEach(
      ([event, handler]) => this.element.removeEventListener(event, handler)
    )
  }
}