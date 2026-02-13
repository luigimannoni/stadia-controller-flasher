/**
 * Async Channel - a simple async producer/consumer queue.
 *
 * Provides a mechanism for one part of the code to produce values
 * that another part asynchronously consumes via Promises.
 * Used primarily for routing HID input reports to the correct handler.
 *
 * @module async-channel
 */

export class AsyncChannel {
  constructor() {
    /** @type {Array<{ resolve: Function, reject: Function }>} */
    this._pendingResolvers = [];
    /** @type {Promise[]} */
    this._pendingPromises = [];
  }

  /**
   * Creates a new pending promise/resolver pair and queues it.
   * Called internally when a send or receive happens with no counterpart ready.
   * @private
   */
  _enqueue() {
    this._pendingPromises.push(
      new Promise((resolve, reject) => {
        this._pendingResolvers.push({ resolve, reject });
      })
    );
  }

  /**
   * Sends a value into the channel.
   *
   * If a receiver is already waiting, the value is delivered immediately.
   * If the value is an Error instance, the waiting receiver's promise is rejected.
   * Otherwise, the receiver's promise is resolved with the value.
   *
   * @param {*} value - The value to send. If an Error, the receiver rejects.
   */
  send(value) {
    if (this._pendingResolvers.length === 0) {
      this._enqueue();
    }

    if (value instanceof Error) {
      this._pendingResolvers.shift().reject(value);
    } else {
      this._pendingResolvers.shift().resolve(value);
    }
  }

  /**
   * Receives the next value from the channel.
   *
   * If a value has already been sent, returns the corresponding promise immediately.
   * Otherwise, creates a new promise that will resolve when the next send() occurs.
   *
   * @returns {Promise<*>} A promise that resolves with the next sent value
   */
  receive() {
    if (this._pendingPromises.length === 0) {
      this._enqueue();
    }
    return this._pendingPromises.shift();
  }
}
