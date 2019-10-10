const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

(async () => {
  // If process is master
  if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(
        "worker %d died (%s). restarting...",
        worker.process.pid,
        signal || code
      );
      cluster.fork();
    });
  } else {
    // If process is worker
    require("./server.js");
  }
})();
