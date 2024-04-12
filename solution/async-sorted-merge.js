"use strict";

// Print all entries, across all of the *async* sources, in chronological order.
const MinHeap = require("./min-heap");
module.exports = async (logSources, printer) => {
  async function getLogsBatch() {
    //create an array of promises to avoid a bottelneck blocking request over logSources
    const promiseArr = logSources.map((logSource) => logSource.popAsync());

    // once we have a array of promises we could extract the logs data
    const logsData = await Promise.all(promiseArr);
    return logsData;
  }

  const logsQueue = new MinHeap();

    /**
   * Due to a time complexity performance,
   * tradding off some space complexity to maintain a cache of the next block of logs to be queued.
   */

  // Initialize logsCache with initial logs from all log sources
  let logsCache = await getLogsBatch();

  while (logsCache.some(item => item !== false)) {
    // Bulk insert all logs from the cache into the queue
    logsCache.forEach((log, idx) => {
      if (log) {
        logsQueue.insert({ value: log.date, sourceIdx: idx, log });
      }
    });

    // Process logs in the queue
    while (!logsQueue.isEmpty()) {
      let { log, sourceIdx } = logsQueue.extractMin();
      printer.print(log);

      // Fetch the next log from the source and update the cache
      const currLog = await logSources[sourceIdx].popAsync();
      logsCache[sourceIdx] = currLog;

      // If the next log is not null, insert it into the queue
      if (currLog) {
        logsQueue.insert({ value: currLog.date, sourceIdx, log: currLog });
      }
    }

    // Refresh the logs in cache
    logsCache = await getLogsBatch();
  }
  
  printer.done();
  console.log("Async sort complete.");
};
