import { Router } from "express";
import { adminController } from "../../controllers/admin";
import { validateSchema, authMiddleware, checkRole } from "../../middlewares";
import { ROLE } from "../../constant";
const { ADMIN_ROLE, HR_ROLE, USER_ROLE } = ROLE;

const { createUserSchema, editUserSchema } = validateSchema;

export const adminRouter = Router();

adminRouter.route("/error").get(adminController.errorPage);

adminRouter.route("/login").get(adminController.viewLogin);

adminRouter.route("/login").post(adminController.login);

adminRouter.route("/verify/:token").get(adminController.verifyEmail);

adminRouter
    .route("/")
    .get(authMiddleware, checkRole(ADMIN_ROLE, HR_ROLE), adminController.home);

adminRouter.route("/logout").get(adminController.logout);

adminRouter
    .route("/create-user")
    .get(authMiddleware, checkRole(ADMIN_ROLE), adminController.createUserGet);

adminRouter
    .route("/create-user")
    .post(
        authMiddleware,
        checkRole(ADMIN_ROLE),
        createUserSchema,
        adminController.createUSerPost
    );

adminRouter
    .route("/delete-user/:userId")
    .get(authMiddleware, checkRole(ADMIN_ROLE), adminController.deleteUser);

adminRouter
    .route("/toggle/:userId")
    .get(
        authMiddleware,
        checkRole(ADMIN_ROLE, HR_ROLE),
        adminController.toggleActive
    );

adminRouter
    .route("/edit-user/:userId")
    .get(authMiddleware, checkRole(ADMIN_ROLE), adminController.editView);

adminRouter
    .route("/edit-user/:userId")
    .post(
        authMiddleware,
        checkRole(ADMIN_ROLE),
        editUserSchema,
        adminController.saveEdit
    );
