"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const config_1 = __importDefault(require("./config"));
const server = (0, server_1.createServer)();
const { port } = config_1.default;
server.listen(port, () => {
    console.log(`Server running on ${port}`);
});
