import express from 'express';
import { config } from 'dotenv'
config();

const app = express();

//middleware
app.use(express.json()) //it tells the app that we will be using incoming and outgoing request

export default app;