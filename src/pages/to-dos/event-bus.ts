export enum EventBusType {
  TO_DOS_CHANGED = `TO_DOS_CHANGED`,
}

type EventBusMap = {
  [EventBusType.TO_DOS_CHANGED]: unknown,
}

class EventBus {
  private _events = new Map<string, Set<() => unknown>>()

  publish<T extends keyof EventBusMap>(event: T) {
    this._events.get(event)
      ?.forEach((callback) => callback())
  }

  subscribe<T extends keyof EventBusMap>(event: T, callback: () => unknown) {
    if (!this._events.has(event)) {
      this._events.set(event, new Set())
    }

    this._events.get(event)!.add(callback)

    return () => this._events.get(event)
      ?.delete(callback)
  }
}

export const eventBus = new EventBus()
