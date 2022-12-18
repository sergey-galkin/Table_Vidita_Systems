export default class {
  constructor(element, handlers = {}) {
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