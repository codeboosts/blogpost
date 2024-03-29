import { sign, verify } from 'jsonwebtoken'

export type TokenUserType = {
    _id: string;
    email: string;
};

const secretKey = process.env.JWT_SECRET

export const onSignToken = (payload: TokenUserType): string => {
    return sign(payload, secretKey, { expiresIn: "2d" });
};

export const onDecodeToken = (token: string): TokenUserType => {
    try {
        const decoded = verify(token, secretKey) as TokenUserType;
        return decoded;
    } catch (error) {
        throw new Error(error);
    }
};
