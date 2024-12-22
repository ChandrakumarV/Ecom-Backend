import { createServer } from "./server";
import config from "./config";

const server = createServer();
const { port } = config;

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
