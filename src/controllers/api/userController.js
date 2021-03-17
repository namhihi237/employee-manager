import { PrismaClient } from "@prisma/client";
import { HttpError } from "../../utils";
const prisma = new PrismaClient();

const getUsers = async (req, res, next) => {
    const { page } = req.query;
    try {
        let users = [];
        if (!page) {
            users = await prisma.user.findMany();
        } else if (isNaN(page)) {
        } else if (page <= 0) {
        } else {
            const take = 4;
            const skip = (page - 1) * take;
            users = await prisma.user.findMany({ skip, take });
        }
        res.status(200).json({
            msg: "Success",
            data: {
                users,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findFirst({ where: { id: userId - 0 } });
        res.status(200).json({
            msg: "Success",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    const { role } = req.user;
    const { name, age, address } = req.body;
    try {
        if (role != 0) throw new HttpError("Deny permission", 401);
        await prisma.user.create({ data: { name, age, address, active: true } });
        res.status(200).json({
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const { role } = req.user;
    const { name, age, address } = req.body;
    const { userId } = req.params;
    try {
        let id = userId - 0;
        if (role != 0) throw new HttpError("Deny permission", 401);
        const user = await prisma.user.findFirst({ where: { id } });
        if (!user) throw new HttpError("User does not exist", 404);
        await prisma.user.update({ where: { id }, data: { name, age, address } });
        res.status(200).json({
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { role } = req.user;
    const { userId } = req.params;
    try {
        let id = userId - 0;
        if (role != 0) throw new HttpError("Deny permission", 401);
        const user = await prisma.user.findFirst({ where: { id } });
        if (!user) throw new HttpError("User does not exist", 404);
        await prisma.user.delete({ where: { id } });
        res.status(200).json({
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

const toggleActiveUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        let id = userId - 0;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new HttpError("User does not exist", 404);
        await prisma.user.update({ where: { id }, data: { active: !user.active } });
        res.status(200).json({
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

export const userController = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    toggleActiveUser,
};
