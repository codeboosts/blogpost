import app from ".";
import { connectToDatabase } from "./db";

const port = process.env.PORT;

connectToDatabase(() => {
  app.listen(port, async () => {
    console.log(`Server base bath is http://127.0.0.1:${port}/v1`);
  });
});
