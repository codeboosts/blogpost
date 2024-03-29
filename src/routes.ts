import { Router } from "express";

import userRoutes from "./user/user.routes";
import postRoutes from "./post/post.routes";
import commentRoutes from "./comment/comment.routes";

const router = Router();

router.get("/", (_, res) => res.send("Welcome to the server"));
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

export default router;
