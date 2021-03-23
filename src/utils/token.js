import jwt from "jsonwebtoken";
import { envVariables } from "../configs";

const { JWT_SECRET } = envVariables;

export const tokenEncode = (data) => {
    return jwt.sign(data, JWT_SECRET, {
        expiresIn: "8640000",
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
