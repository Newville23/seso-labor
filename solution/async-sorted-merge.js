"use strict";

// Print all entries, across all of the *async* sources, in chronological order.
const MinHeap = require("./min-heap");
module.exports = async (logSources, printer) => {
/**
 * Brute force approach, not considering network latency for logSources. That could affect the optimization of the network usage.
 */
    const logsQueue = new MinHeap();

    for (var index = 0; index < logSources.length; index++) {    
      const currLog = await logSources[index].popAsync();
      const item = { value: currLog.date, sourceIdx: index, log: currLog };
      logsQueue.insert(item);
    }

    while(!logsQueue.isEmpty()){
      let { log, sourceIdx } = logsQueue.extractMin();
      printer.print(log);

      const currLog = await logSources[sourceIdx].popAsync();
      if (currLog) {
        logsQueue.insert({ value: currLog.date, sourceIdx, log: currLog });
      }
    }
    printer.done()
    console.log("Async sort complete.");
};
