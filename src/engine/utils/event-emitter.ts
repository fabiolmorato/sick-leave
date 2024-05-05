export class EventEmitter {
  private handlers: { [eventName: string]: Function[] } = {};

  on (eventName: string, handler: Function) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }

    this.handlers[eventName].push(handler);
  }

  emit (eventName: string, ...args: any[]) {
    const handlers = this.handlers[eventName];
    if (!handlers) return;

    for (const handler of handlers) {
      handler(...args);
    }
  }
}
