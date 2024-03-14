import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'geo_prishtina',
    migrations: [
        'dist/db/migrations/*.js'
    ],
    entities: [
        // User
        'dist/**/*.entity.js'
    ],
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource