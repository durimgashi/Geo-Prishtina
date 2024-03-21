import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres', 
    host: 'postgres',
    port: 5432, 
    username: 'root', 
    password: 'root', 
    database: 'geo_prishtina',
    migrations: [
        'dist/db/migrations_postgres/*.js'
    ],
    entities: [
        // User
        'dist/**/*.entity.js'
    ],
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource