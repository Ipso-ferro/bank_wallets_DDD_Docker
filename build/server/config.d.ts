import { PoolOptions } from "mysql2/promise";
type Config = {
    readonly server: ServerConfig;
    readonly database: PoolOptions;
};
type ServerConfig = {
    readonly apiPort: number;
};
export declare const config: Config;
export {};
