import Joi from "joi";
import { validateRequest } from "../utils";

const createUserSchema = (req, res, next) => {
    const { name, age, address } = req.body;
    if (req.user.role != 0) {
        return res.redirect(`/?msg="Deny permission`);
    }
    if (!name || !age || !address) {
        return res.redirect(`/create-user/?msg="Data is empty`);
    }
    if (isNaN(age)) {
        return res.redirect(`/create-user/?msg="Age must be number`);
    }
    next();
};

const editUserSchema = (req, res, next) => {
    const { name, age, address } = req.body;
    const { userId } = req.params;
    if (req.user.role != 0) {
        return res.redirect(`/?msg="Deny permission`);
    }
    if (!name || !age || !address) {
        return res.redirect(`/edit-user/${userId}?msg="Data is empty`);
    }
    if (isNaN(age)) {
        return res.redirect(`/edit-user/${userId}?msg="Age must be number`);
    }
    next();
};
export const validateSchema = { createUserSchema, editUserSchema };
