import { HttpError } from "../utils";
export const authMiddleware = (req, res, next) => {
    try {
        const sess = req.session;
        if (!sess.user) {
            return res.redirect("/login");
        }
        req.user = sess.user;
        next();
    } catch (error) {
        console.log(error);
    }
};

export const authMiddlewareAPI = (req, res, next) => {
    try {
        const sess = req.session;
        if (!sess.user) {
            throw new HttpError("No authentication", 401);
        }
        req.user = sess.user;
        next();
    } catch (error) {
        next(error);
    }
};
