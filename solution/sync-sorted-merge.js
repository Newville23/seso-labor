"use strict";

// Print all entries, across all of the sources, in chronological order.
const MinHeap = require("./min-heap");

module.exports = (logSources, printer) => {
  const logsHeap = new MinHeap();

  for (var index = 0; index < logSources.length; index++) {    
    const currLog = logSources[index].pop();
    const item = { value: currLog.date, sourceIdx: index, log: currLog };
    logsHeap.insert(item);
  }

  while (!logsHeap.isEmpty()) {
    let { log, sourceIdx } = logsHeap.extractMin();
    printer.print(log);

    const currLog = logSources[sourceIdx].pop();
    if (currLog) {
      logsHeap.insert({ value: currLog.date, sourceIdx, log: currLog });
    }
  }

  printer.done();
  return console.log("Sync sort complete.");
};
