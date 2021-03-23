import { envVariables, prisma } from "../configs";
import bcrypt from "bcryptjs";
import {
    panigation,
    sendEmail,
    tokenEncode,
    verifyToken,
    sendMail,
} from "../utils";

const getUsers = async (page) => {
    const take = 6;
    return panigation(prisma.user, page, take);
};

const createUser = async (user) => {
    const isUser = await prisma.account.findUnique({
        where: { userName: user.userName },
    });
    if (isUser) return false;
    const isEmail = await prisma.user.findUnique({
        where: { email: user.email },
    });
    if (isEmail) return false;
    const hashPasswor = await bcrypt.hash(user.password, 12);
    const newAccount = await prisma.account.create({
        data: { userName: user.userName, password: hashPasswor, role: 3 },
    });

    const newUser = await prisma.user.create({
        data: {
            accoutId: newAccount.id,
            email: user.email,
            name: user.name,
            age: user.age,
            address: user.address,
            active: false,
        },
    });
    const token = tokenEncode({ id: newUser.id, email: newUser.email });
    sendMail(
        user.email,
        "Verify to account",
        `http://localhost/verify:${envVariables.port}/${token}`
    );
    return true;
};

const getUserById = async (id) => prisma.user.findFirst({ where: { id } });

const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user) return false;

    await Promise.all(
        [prisma.user.delete({ where: { id } })],
        prisma.account.delete({ where: { accoutId: user.accoutId } })
    );
    return true;
};

const updateUserById = async (id, data) => {
    const user = await getUserById(id);
    if (!user) return false;
    await prisma.user.update({
        where: { id },
        data: { name: data.name, age: data.age, address: data.address },
    });
    return true;
};

const toggleActive = async (id) => {
    const user = await getUserById(id);
    if (!user) return false;
    await prisma.user.update({ where: { id }, data: { active: !user.active } });
    let text = "";
    if (user.active == false) text = `Your Acccout has been active`;
    else text = text = `Your Acccout has been inactive`;
    sendMail(user.email, `Notification status accout`, text);
    return true;
};

const getCount = async () => await prisma.user.count();

const verifyAccout = async (token) => {
    try {
        const user = verifyToken(token);
        await prisma.user.update({
            where: { email: user.email },
            data: { active: true },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const userService = {
    getUsers,
    updateUserById,
    createUser,
    getUserById,
    deleteUser,
    toggleActive,
    getCount,
    verifyAccout,
};
