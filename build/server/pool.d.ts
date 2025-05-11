import mysql, { PoolOptions } from 'mysql2/promise';
export declare const createPool: (config: PoolOptions) => mysql.Pool;
