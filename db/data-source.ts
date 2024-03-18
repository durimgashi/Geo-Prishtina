import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    // type: 'mysql',
    // host: 'localhost',
    // port: 3307,
    // username: 'root',
    // password: 'root',
    // database: 'geo_prishtina',
    // migrations: [
    //     'dist/db/migrations/*.js'
    // ],
    // entities: [
    //     // User
    //     'dist/**/*.entity.js'
    // ],

    type: 'postgres', // Change the type to postgres
    host: 'postgres',
    port: 5432, // PostgreSQL default port is 5432
    username: 'root', // Replace with your PostgreSQL username
    password: 'root', // Replace with your PostgreSQL password
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