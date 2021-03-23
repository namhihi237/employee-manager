import { prisma } from "../configs";
import bcrypt from "bcryptjs";
import { panigation } from "../utils";

const getUsers = async (page) => {
    const take = 6;
    return panigation(prisma.user, page, take);
};

const createUser = async (user) => {
    const isUser = await prisma.account.findUnique({
        where: { userName: user.userName },
    });
    if (isUser) return false;

    const hashPasswor = await bcrypt.hash(user.password, 12);
    const newAccount = await prisma.account.create({
        data: { userName: user.userName, password: hashPasswor, role: 3 },
    });

    await prisma.user.create({
        data: {
            accoutId: newAccount.id,
            name: user.name,
            age: user.age,
            address: user.address,
            active: false,
        },
    });
    return true;
};
const getUserById = async (id) => prisma.user.findFirst({ where: { id } });

const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user) return false;
    await prisma.user.delete({ where: { id } });
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
    return true;
};

const getCount = async () => await prisma.user.count();

export const userService = {
    getUsers,
    updateUserById,
    createUser,
    getUserById,
    deleteUser,
    toggleActive,
    getCount,
};
