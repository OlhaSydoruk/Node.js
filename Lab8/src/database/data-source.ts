import "reflect-metadata"
import {DataSource} from "typeorm"
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as "mysql",
    host: process.env.DB_HOST,
    port: process.env.DOCKER_POSTGRES_PORT ? parseInt(process.env.DOCKER_POSTGRES_PORT) : undefined,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    extra: {
        authPlugins: [
            "caching_sha2_password"
        ]
    },
    synchronize: true,
    logging: false,
    entities: ['src/database/entities/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
    subscribers: ['src/database/subscribers/*.ts']
})