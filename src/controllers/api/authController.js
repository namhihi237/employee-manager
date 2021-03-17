import { HttpError } from "../../utils";
import bcrypt from "bcryptjs";
import { envVariables, prisma } from "../../configs";
const { keyAdmin } = envVariables;

const register = async (req, res, next) => {
    const { userName, password, key, role } = req.body;
    try {
        if (key != keyAdmin) throw new HttpError("Deny create admin account", 400);
        const admin = await prisma.account.findFirst({ where: { userName } });
        if (admin) throw new HttpError("userName already exists", 400);
        const hashPassword = await bcrypt.hash(password, 12);
        await prisma.account.create({ data: { userName, password: hashPassword, role } });
        res.status(200).json({
            msg: "Success",
            userName,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const user = await prisma.account.findFirst({ where: { userName } });
        if (!user) throw new HttpError("username or password is incorrect");
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new HttpError("username or password is incorrect");
        let sess = req.session;
        sess.user = user;
        res.status(200).json({
            msg: "Login Success",
            data: {
                role: user.role,
                id: user.id,
                userName: user.userName,
            },
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        req.session.destroy();
        res.status(200).json({
            msg: "Logout success",
        });
    } catch (error) {
        next(error);
    }
};

export const authController = { login, logout, register };
