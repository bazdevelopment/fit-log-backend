/**
 * The computeFutureTimestamp function calculates a future timestamp based on the current date and time, incremented by a specified number of minutes.
 */
export const computeFutureTimestamp = (minutes: number) =>
  new Date(Date.now() + minutes * 60 * 1000);
