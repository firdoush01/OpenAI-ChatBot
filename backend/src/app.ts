import express from 'express';
import { config } from 'dotenv'
config();
import morgan from "morgan";
import appRouter from './routes';
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();


//middleware
app.use(express.json()) //it tells the app that we will be using incoming and outgoing request
app.use(cookieParser(process.env.COOKIE_SECRET))  //cookie parser is used to send cookies from backend to frontend

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
//remove it in production
app.use(morgan("dev"))

app.use("/api/v1",appRouter)

export default app;