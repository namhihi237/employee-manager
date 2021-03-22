import bcrypt from "bcryptjs";
import { prisma } from "../../configs";
import { userService } from "../../services";

const viewLogin = (req, res) => {
    res.render("auth/login.pug");
};

const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const user = await prisma.account.findFirst({ where: { userName } });
        if (!user)
            return res.render("auth/login.pug", {
                msg: "userName or password is incorrect",
            });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.render("auth/login.pug", {
                msg: "userName or password is incorrect",
            });
        let sess = req.session;
        sess.user = user;
        if (user.role != 3) return res.redirect("/");
        return res.redirect("/chat");
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
    let { msg, page } = req.query;
    console.log(req.query);
    try {
        let users = [];
        let count = await userService.getCount();
        page = page - 0;
        count = Math.ceil(count / 6);
        if (msg) {
            if (!page) {
                users = await userService.getUsers(1);
                return res.render("home/index.pug", {
                    users,
                    count,
                    page: 1,
                    msg,
                });
            }
            users = await userService.getUsers(page);
            return res.render("home/index.pug", { users, msg, count, page });
        }

        users = await userService.getUsers(page);
        if (page) {
            return res.render("home/index.pug", { users, count, page });
        }
        return res.render("home/index.pug", { users, count, page: 1 });
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
};

const createUserGet = async (req, res, next) => {
    const { msg } = req.query;
    res.render("home/create.pug", { msg });
};

const createUSerPost = async (req, res, next) => {
    let { name, age, address, userName, password } = req.body;
    try {
        age = age - 0;
        if (
            !(await userService.createUser({
                name,
                age,
                address,
                userName,
                password,
            }))
        ) {
            return res.redirect("/create-user?msg=userName has exist");
        }
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        let id = userId - 0;
        if (!(await userService.deleteUser(id))) {
            return res.redirect(`/?msg="User does not exist`);
        }
        res.redirect("/");
    } catch (error) {
        res.redirect("/error");
    }
};

const toggleActive = async (req, res, next) => {
    const { userId } = req.params;
    let id = userId - 0;

    if (!(await userService.toggleActive(id))) {
        return res.redirect(`/?msg="User does not exist`);
    }
    res.redirect("/");
    try {
    } catch (error) {
        res.redirect("/error");
    }
};

const editView = async (req, res, next) => {
    const { userId } = req.params;
    const { msg } = req.query;
    try {
        let id = userId - 0;
        const user = await userService.getUserById(id);
        console.log(user);
        if (!user) {
            return res.redirect(`/?msg="User does not exist`);
        }
        if (msg) {
            return res.render("home/edit.pug", { user, msg });
        }
        res.render("home/edit.pug", { user });
    } catch (error) {
        res.redirect("/error");
    }
};

const saveEdit = async (req, res, next) => {
    const { userId } = req.params;
    let { name, age, address } = req.body;
    try {
        let id = userId - 0;
        age = age - 0;
        const data = { name, age, address };
        if (!(await userService.updateUserById(id, data))) {
            return res.redirect(`/?msg="User does not exist`);
        }
        res.redirect("/");
    } catch (error) {
        res.redirect("/error");
    }
};
const errorPage = async (req, res, next) => {
    res.render("error.pug");
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
    errorPage,
};
