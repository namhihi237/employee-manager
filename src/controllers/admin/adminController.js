import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const viewLogin = (req, res) => {
    res.render("auth/login.pug");
};

const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const user = await prisma.account.findFirst({ where: { userName } });
        if (!user)
            return res.render("auth/login.pug", { msg: "userName or password is incorrect" });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.render("auth/login.pug", { msg: "userName or password is incorrect" });
        let sess = req.session;
        sess.user = user;
        res.redirect("/");
    } catch (error) {
        res.render("auth/login.pug");
    }
};

const logout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) next(err);
    });
    res.redirect("/login");
};

const home = async (req, res, next) => {
    const { msg } = req.query;
    let { page } = req.query;
    try {
        let take = 5;
        let users = [];
        let count = await prisma.user.count();
        page = page - 0;
        count = Math.ceil(count / take);
        if (!page) {
            users = await prisma.user.findMany({ skip: 0, take });
            return res.render("home/index.pug", { users, count, page: 1 });
        }

        let skip = (page - 1) * take;
        users = await prisma.user.findMany({ skip, take });
        if (msg) {
            return res.render("home/index.pug", { users, msg, count, page });
        }
        return res.render("home/index.pug", { users, count, page });
    } catch (error) {
        console.log(error);
        res.render("error.pug");
    }
};

const createUserGet = async (req, res, next) => {
    const { msg } = req.query;
    if (req.user.role === 0) {
        return res.render("home/create.pug", { msg });
    }
    return res.redirect(`/?msg="Deny permission`);
};

const createUSerPost = async (req, res, next) => {
    let { name, age, address } = req.body;
    try {
        age = age - 0;
        await prisma.user.create({ data: { name, age, address, active: true } });
        return res.redirect("/");
    } catch (error) {
        res.render("error.pug");
    }
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        if (req.user.role != 0) {
            return res.redirect(`/?msg="Deny permission`);
        }
        let id = userId - 0;
        const user = await prisma.user.findFirst({ where: { id } });
        if (!user) {
            return res.redirect(`/?msg="User does not exist`);
        }
        await prisma.user.delete({ where: { id } });
        res.redirect("/");
    } catch (error) {
        res.render("error.pug");
    }
};

const toggleActive = async (req, res, next) => {
    const { userId } = req.params;
    let id = userId - 0;
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
        return res.redirect(`/?msg="User does not exist`);
    }
    await prisma.user.update({ where: { id }, data: { active: !user.active } });
    res.redirect("/");

    try {
    } catch (error) {
        res.render("error.pug");
    }
};

const editView = async (req, res, next) => {
    const { userId } = req.params;
    const { msg } = req.query;
    try {
        if (req.user.role != 0) {
            return res.redirect(`/?msg="Deny permission`);
        }
        let id = userId - 0;
        const user = await prisma.user.findFirst({ where: { id } });
        if (!user) {
            return res.redirect(`/?msg="User does not exist`);
        }
        if (msg) {
            return res.render("home/edit.pug", { user, msg });
        }
        res.render("home/edit.pug", { user });
    } catch (error) {
        res.render("error.pug");
    }
};

const saveEdit = async (req, res, next) => {
    const { userId } = req.params;
    let { name, age, address } = req.body;
    try {
        let id = userId - 0;
        const user = await prisma.user.findFirst({ where: { id } });
        if (!user) {
            return res.redirect(`/?msg="User does not exist`);
        }
        age = age - 0;
        await prisma.user.update({ where: { id }, data: { name, age, address } });
        return res.redirect("/");
    } catch (error) {
        res.render("error.pug");
    }
};
export const adminController = {
    login,
    viewLogin,
    home,
    logout,
    createUserGet,
    createUSerPost,
    deleteUser,
    toggleActive,
    editView,
    saveEdit,
};
