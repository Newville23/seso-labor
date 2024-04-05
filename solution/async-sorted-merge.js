"use strict";

// Print all entries, across all of the *async* sources, in chronological order.
const MinHeap = require("./min-heap");
module.exports = async (logSources, printer) => {
  const logsQueue = new MinHeap();

  //create an array of promises to avoid a bottelneck blocking request over logSources
  const promiseArr = logSources.map((logSource) => logSource.popAsync());

  // once we have a array of promises we could extract the logs data
  const logsData = await Promise.all(promiseArr);

  // insert the logs to the queue
  logsData.forEach((log, idx) => {
    if (log) {
      logsQueue.insert({ value: log.date, sourceIdx: idx, log });
    }
  });

  while (!logsQueue.isEmpty()) {
    let { log, sourceIdx } = logsQueue.extractMin();
    printer.print(log);

    const currLog = await logSources[sourceIdx].popAsync();
    if (currLog) {
      logsQueue.insert({ value: currLog.date, sourceIdx, log: currLog });
    }
  }
  printer.done();
  console.log("Async sort complete.");
};
