const { createServer } = require("http");
const app = require("./app");

const { port } = require("./config");

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
