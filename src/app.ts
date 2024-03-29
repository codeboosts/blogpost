import "reflect-metadata";
import fs from "fs";
import cors from "cors";
import routes from "./routes";
import { redisConnection } from "./redis";
import path from "path";
import express from "express";
const customCss = fs.readFileSync(__dirname + "/swagger/style.css", "utf8");
const app = express();

app.use((req, res, next) => {
  req.redisClient = redisConnection;
  next();
});
app.get("/redis", async (req, res) => {
  try {
    // Example: Set a key in Redis
    await redisConnection.set("example_key", "Hello, Redis!");

    // Example: Get a key from Redis
    const value = await redisConnection.get("example_key");

    res.send(`Redis Value: ${value}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(morgan("combined"));
app.use("/v1/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
app.use("/v1", routes);
app.use("/floorlevel", express.static(path.join(__dirname, "./images")));
export default app;
