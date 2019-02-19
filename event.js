/**
 * event bus
 *
 * @version  1.0
 * @author  liejiangmai
 * @module   event.js
 */
// 发布订阅模式
//  on;
//  emit;
//  off;
export default class Event {
  _stores = {};
  on(event, fn, ctx) {
    if (typeof fn != "function") {
      console.warn("fn must be function");
      return;
    }

    if (!this._stores[event]) {
      this._stores[event] = [];
    }
    this._stores[event].push({ cb: fn, ctx: ctx });
  }

  emit(...args) {
    const event = args[0];
    const _store = this._stores[event];

    if (_store) {
      funcArgs = args.slice(1);
      for (let i = 0; i < _store.length; i++) {
        _store[i].cb.apply(_store[i].ctx, funcArgs);
      }
    }
  }

  off(...args) {
    const event = args[0];
    const fn = args[1];
    // all;
    if (!args.length) {
      this._stores = {};
      return;
    }

    const _store = this._stores[event];
    if (!_store) {
      return;
    }
    // specific all event;
    if (args.length == 1) {
      this._stores[event] = [];
      return;
    }
    // remove specific handler
    for (let i = 0; i < _store.length; i++) {
      let cb = _store[i].cb;
      if (cb === fn) {
        _store.splice(i, 1);
        break;
      }
    }
  }
}
