"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeFutureTimestamp = void 0;
/**
 * The computeFutureTimestamp function calculates a future timestamp based on the current date and time, incremented by a specified number of minutes.
 */
const computeFutureTimestamp = (minutes) => new Date(Date.now() + minutes * 60 * 1000);
exports.computeFutureTimestamp = computeFutureTimestamp;
