import { PoolOptions } from "mysql2/promise";

type Config = {
    readonly server: ServerConfig;
    readonly database: PoolOptions;
};

type ServerConfig = {
    readonly apiPort: number;
};


export const config: Config = {
    server: {
        apiPort: Number(process.env.SERVER_PORT),
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
