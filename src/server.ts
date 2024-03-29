import http from "http";
import app from ".";
import { connectToDatabase } from "./db";

const port = process.env.PORT;
const server = http.createServer(app);

connectToDatabase(() => {
  server.listen(port, async () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
    console.log(`Swagger docx available on http://127.0.0.1:${port}/v1/api`);
  });
});
