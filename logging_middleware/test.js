const Log = require("./logger");

(async () => {
  console.log("Testing Logging Middleware...");

  await Log(
    "frontend",
    "info",
    "component",
    "Testing logging middleware"
  );

  console.log("Finished");
})();