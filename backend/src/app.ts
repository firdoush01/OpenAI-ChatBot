import express from 'express';
import { config } from 'dotenv'
config();
import morgan from "morgan";
import appRouter from './routes';

const app = express();


//middleware
app.use(express.json()) //it tells the app that we will be using incoming and outgoing request

//remove it in production
app.use(morgan("dev"))

app.use("/api/v1",appRouter)

export default app;