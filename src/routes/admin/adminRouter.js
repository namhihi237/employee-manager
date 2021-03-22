import { Router } from "express";
import { adminController } from "../../controllers/admin";
import { validateSchema, authMiddleware, checkRole } from "../../middlewares";
import { ROLE } from "../../constant";
const { ADMIN_ROLE, HR_ROLE, USER_ROLE } = ROLE;

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

adminRouter
    .route("/")
    .get(authMiddleware, checkRole(ADMIN_ROLE, HR_ROLE), home);

adminRouter.route("/logout").get(logout);

adminRouter
    .route("/create-user")
    .get(authMiddleware, checkRole(ADMIN_ROLE), createUserGet);

adminRouter
    .route("/create-user")
    .post(
        authMiddleware,
        checkRole(ADMIN_ROLE),
        createUserSchema,
        createUSerPost
    );

adminRouter
    .route("/delete-user/:userId")
    .get(authMiddleware, checkRole(ADMIN_ROLE), deleteUser);

adminRouter
    .route("/toggle/:userId")
    .get(authMiddleware, checkRole(ADMIN_ROLE, HR_ROLE), toggleActive);

adminRouter
    .route("/edit-user/:userId")
    .get(authMiddleware, checkRole(ADMIN_ROLE), editView);

adminRouter
    .route("/edit-user/:userId")
    .post(authMiddleware, checkRole(ADMIN_ROLE), editUserSchema, saveEdit);
