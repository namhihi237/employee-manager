import { HttpError } from "../utils";

const checkRole = (...roles) => (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) return res.redirect(`/?msg="Deny permission`);
    next();
};

const checkRoleApi = (...roles) => (req, res, next) => {
    const { role } = req.user;
    try {
        if (!roles.includes(role)) throw new HttpError("Deny permission", 401);
        next();
    } catch (error) {
        next(error);
    }
};

export { checkRole, checkRoleApi };
