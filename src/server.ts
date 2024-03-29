import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



import http from "http";
import app from ".";
import "./types";

const port = process.env.PORT;
const server = http.createServer(app);

connectionToDatabase(() => {
  server.listen(port, async () => {
    logger(`Server running on http://127.0.0.1:${port}`);
    logger(`Swagger docx available on http://127.0.0.1:${port}/v1/api`);
  });
});
