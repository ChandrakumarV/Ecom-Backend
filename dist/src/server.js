"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const uuid_1 = require("uuid");
const http_1 = require("http");
const ServerConfig = () => {
    const app = (0, express_1.default)();
    const server = (0, http_1.createServer)(app);
    const socketIo = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST']
        }
    });
    let todoList = [];
    const todoListNameSpace = socketIo.of('/todo');
    todoListNameSpace.on('connection', (socket) => {
        console.log(console.log('New connection established', socket.id));
        socket.emit('update', todoList);
        // add item
        socket.on('addItem', (item) => {
            console.log('add item', item);
            const newItem = { id: (0, uuid_1.v4)(), value: item };
            todoList.push(newItem);
            console.log(todoList);
            todoListNameSpace.emit('update', todoList);
        });
        // update item
        socket.on('updateItem', (itemObj) => {
            console.log(itemObj);
            const findedItem = todoList.find((item) => item.id === itemObj.id);
            if (findedItem) {
                findedItem.value = itemObj.value;
                todoListNameSpace.emit('update', todoList);
            }
        });
        // delete item
        socket.on('deleteItem', (id) => {
            todoList = todoList.filter((item) => item.id !== id);
            todoListNameSpace.emit('update', todoList);
        });
        socket.off('disconnect', () => {
            console.log('Client disconnected');
        });
    });
    app.use(body_parser_1.default.json());
    app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json({ ok: true, environment: config_1.default.env });
    }));
    app.use(routes_1.default);
    return server;
};
exports.ServerConfig = ServerConfig;
