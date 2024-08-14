const path = require("path");

module.exports = {
  apps: [
    {
      name: "distribution",
      script: "index.ts", // Specify the entry file
      interpreter: "npx", // Use 'npx' as the interpreter
      interpreterArgs: "ts-node", // Use 'ts-node' as an argument for the interpreter
      cwd: path.join(__dirname, "src"), // Ensure this path is correct
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"], // Ignore changes in node_modules
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
