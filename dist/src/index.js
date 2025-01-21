"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const server_1 = require("./server");
const server = (0, server_1.ServerConfig)();
const { port } = config_1.default;
server.listen(port, () => {
    console.log(`Server running on ${port}`);
});
