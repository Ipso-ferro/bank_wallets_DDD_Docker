"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const createPool = (config) => {
    const pool = promise_1.default.createPool(config);
    pool.on('connection', () => console.info('Connected to database ...'));
    pool.on('acquire', () => console.info('acquired to database ...'));
    pool.on('release', () => console.info('release from database ...'));
    pool.on('enqueue', () => console.info('Queued to database ...'));
    return pool;
};
exports.createPool = createPool;
