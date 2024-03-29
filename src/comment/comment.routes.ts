import { Router } from "express";


const router = Router();


router.get("/", (_, res) => res.send("Hello from comment!"));


export default router