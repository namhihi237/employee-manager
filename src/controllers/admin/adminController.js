import bcrypt from "bcryptjs";
import { prisma } from "../../configs";
import { userService } from "../../services";

const viewLogin = (req, res) => {
    const { msg } = req.query;
    res.render("auth/login.ejs", { msg });
};

const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const user = await prisma.account.findFirst({ where: { userName } });
        if (!user)
            return res.render("auth/login.ejs", {
                msg: "userName or password is incorrect",
            });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.render("auth/login.ejs", {
                msg: "userName or password is incorrect",
            });

        if (user.role != 3) {
            let sess = req.session;
            sess.user = user;
            return res.redirect("/");
        }

        const userActive = await prisma.user.findFirst({
            where: { accoutId: user.id },
        });
        if (userActive.active) {
            let sess = req.session;
            sess.user = user;
            return res.redirect("/chat");
        }
        return res.redirect("/login?msg=Account is not active");
    } catch (error) {
        console.log(error);
        res.render("auth/login.ejs");
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
                return res.render("home/index.ejs", {
                    users,
                    count,
                    page: 1,
                    msg,
                });
            }
            users = await userService.getUsers(page);
            return res.render("home/index.ejs", { users, msg, count, page });
        }

        users = await userService.getUsers(page);
        if (page && page > 0) {
            return res.render("home/index.ejs", {
                users,
                count,
                page,
                msg: null,
            });
        }
        return res.render("home/index.ejs", {
            users,
            count,
            page: 1,
            msg: null,
        });
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
};

const createUserGet = async (req, res, next) => {
    const { msg } = req.query;
    res.render("home/create.ejs", { msg });
};

const createUSerPost = async (req, res, next) => {
    let { name, age, address, userName, password, email } = req.body;
    try {
        age = age - 0;
        if (
            !(await userService.createUser({
                name,
                age,
                address,
                userName,
                password,
                email,
            }))
        ) {
            return res.redirect("/create-user?msg=userName or email has exist");
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
            return res.render("home/edit.ejs", { user, msg });
        }
        res.render("home/edit.ejs", { user, msg: null });
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
    res.render("error.ejs");
};

const verifyEmail = async (req, res, next) => {
    const { token } = req.params;
    try {
        if (!(await userService.verifyAccout(token))) {
            return res.redirect("/error");
        }
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.redirect("/error");
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
    errorPage,
    verifyEmail,
};
