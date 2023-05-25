import express, {Express} from "express";
import * as dotenv from "dotenv";
import userRoutes from './routes/userRoutes';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use('/aplication', userRoutes )
app.get('/', (req, res)=>{
    res.status(200).json("Ураааааа сервер працює")
})
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});