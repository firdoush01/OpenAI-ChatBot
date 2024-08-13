import express from 'express';
import { config } from 'dotenv'
config();
import morgan from "morgan";
import appRouter from './routes';
import cookieParser from "cookie-parser";

const app = express();


//middleware
app.use(express.json()) //it tells the app that we will be using incoming and outgoing request
app.use(cookieParser(process.env.COOKIE_SECRET))  //cookie parser is used to send cookies from backend to frontend

//remove it in production
app.use(morgan("dev"))

app.use("/api/v1",appRouter)

export default app;