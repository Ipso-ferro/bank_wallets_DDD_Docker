"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    server: {
        apiPort: 8080,
    },
    database: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: String(process.env.PG_PASSWORD),
        port: Number(process.env.PG_PORT),
        database: process.env.PG_DB,
        idleTimeout: Number(process.env.PG_MAX_IDDLE),
        connectTimeout: Number(process.env.PG_MAX_TIMEOUT),
    },
};
