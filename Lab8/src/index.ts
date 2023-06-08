import express, {Express} from "express";
import userRoutes from './routes/user.js';
import postRoutes from './routes/posts.js';
import "reflect-metadata"
import {AppDataSource} from "./database/data-source.js"

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });

const app: Express = express();
const PORT: string | undefined = process.env.PORT;

app.use(express.json());

app.use('/api', userRoutes, postRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});