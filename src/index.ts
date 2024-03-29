import cors from "cors";
import routes from "./routes";
import express from "express";
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());
app.use("/v1", routes);

export default app;
