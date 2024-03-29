import { Router } from "express";


const router = Router();


router.get("/", (_, res) => res.send("Hello from post!"));


export default router