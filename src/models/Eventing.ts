type CallBack = () => void;
export class Eventing {
  events: { [key: string]: CallBack[] } = {};
  on(eventName: string, callback: CallBack): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handelers = this.events[eventName];
    if (!handelers || handelers.length === 0) {
      return;
    }
    handelers.forEach((callback) => {
      callback();
    });
  }
}
 