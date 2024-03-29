import { Router } from "express";

import userRoutes from "./user/user.routes";

const router = Router();

router.get("/", (_, res) => res.send("Welcome to the server"));
router.use("/user", userRoutes);

export default router;
