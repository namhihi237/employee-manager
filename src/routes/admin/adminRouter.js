import { Router } from "express";
import { adminController } from "../../controllers/admin";
import { validateSchema, authMiddleware } from "../../middlewares";
const {
    login,
    viewLogin,
    home,
    logout,
    createUSerPost,
    createUserGet,
    deleteUser,
    toggleActive,
    editView,
    saveEdit,
    errorPage,
} = adminController;
const { createUserSchema, editUserSchema } = validateSchema;

export const adminRouter = Router();

adminRouter.route("/error").get(errorPage);
adminRouter.route("/login").get(viewLogin);
adminRouter.route("/login").post(login);
adminRouter.route("/").get(authMiddleware, home);
adminRouter.route("/logout").get(logout);
adminRouter.route("/create-user").get(authMiddleware, createUserGet);
adminRouter.route("/create-user").post(authMiddleware, createUserSchema, createUSerPost);
adminRouter.route("/delete-user/:userId").get(authMiddleware, deleteUser);
adminRouter.route("/toggle/:userId").get(authMiddleware, toggleActive);
adminRouter.route("/edit-user/:userId").get(authMiddleware, editView);
adminRouter.route("/edit-user/:userId").post(authMiddleware, editUserSchema, saveEdit);
