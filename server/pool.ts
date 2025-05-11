import mysql, { PoolOptions } from 'mysql2/promise';

export const createPool = (config: PoolOptions): mysql.Pool => {
    const pool = mysql.createPool(config);
    pool.on('connection', () => console.info('Connected to database ...'));
    pool.on('acquire', () => console.info('acquired to database ...'));
    pool.on('release', () => console.info('release from database ...'));
    pool.on('enqueue', () => console.info('Queued to database ...'));
    return pool;
};
