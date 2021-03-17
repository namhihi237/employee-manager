import { HttpError } from "../../utils";
import { userService } from "../../services";
const getUsers = async (req, res, next) => {
    const { page } = req.query;
    try {
        const users = await userService.getUsers(page);
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
        const id = userId - 0;
        const user = await userService.getUserById(id);
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
        await userService.createUser({ name, age, address });
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
        const data = { name, age, address };
        if (!(await userService.updateUserById(id, data)))
            throw new HttpError("User does not exist", 404);
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
        if (!(await userService.deleteUser(id))) throw new HttpError("User does not exist", 404);
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
        if (!(await userService.toggleActive(id))) throw new HttpError("User does not exist", 404);
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
