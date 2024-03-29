import { NextFunction, Response, RequestHandler } from "express";
import { onDecodeToken } from "../common/utils/tokenManager";
import User from "../user/schema/user.schema";
import { UnauthorizedException } from "../error/exceptions";

export const authentication = (): RequestHandler => {
    return async (req: RequestType, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader.split(" ")[1];

            if (!token) throw new UnauthorizedException();

            const decodeToken = onDecodeToken(token);

            const user = await User.findById(decodeToken._id);
            if (!user) throw new UnauthorizedException();


            req.currentUser = decodeToken;

            return next();
        } catch (error) {
            res.status(error.status ?? 500).json({ error: error.message });
        }
    };
};
