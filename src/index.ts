import * as dotenv from 'dotenv'
dotenv.config()
import * as cors from "cors";
import * as express from "express";
import routes from "./routes";


const app = express();

app.use(express.json());
app.use(cors());
app.use("/v1", routes);

export default app;
