"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  /**
   *
   * starting with a brute force approach,
   * Taking the minimum number of considerations for time and space complexity.
   *
   * */
  const tempLogs = new Map();
  let remainingLogsinSources;

  do {
    let mostOldLog = { date: Infinity };
    let minSourceIdx = -1;
    remainingLogsinSources = false;

    // Managing temp logs based on logSources stack limitations
    for (let index = 0; index < logSources.length; index++) {
      if (!tempLogs.has(index)) {
        const currLog = logSources[index].pop();
        tempLogs.set(index, currLog);


        if (currLog) {
          remainingLogsinSources = true;
        }
      } else if (tempLogs.get(index)) {
        remainingLogsinSources = true;
      }
    }
    
    // Finding most recent log across temp logs
    for (const [sourceIdx, sourceLog] of tempLogs) {
      if (sourceLog && sourceLog.date < mostOldLog.date) {
        mostOldLog = sourceLog;
        minSourceIdx = sourceIdx;
      }
    }

    // Taking into account empty logSources
    if (minSourceIdx !== -1) {
      printer.print(mostOldLog);
      tempLogs.delete(minSourceIdx);
    }
  } while (remainingLogsinSources);

  printer.done();
  return console.log("Sync sort complete.");
};
