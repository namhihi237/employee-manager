import { prisma } from "../configs";

const getUsers = async (page) => {
    let users = [];
    const take = 6;
    if (!page) {
        users = await prisma.user.findMany({ skip: 0, take });
    } else if (isNaN(page)) {
    } else if (page <= 0) {
    } else {
        const skip = (page - 1) * take;
        users = await prisma.user.findMany({ skip, take });
    }
    return users;
};
const createUser = async (user) => {
    await prisma.user.create({
        data: { name: user.name, age: user.age, address: user.address, active: true },
    });
};
const getUserById = async (id) => {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
};

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

const getCount = async () => {
    const count = await prisma.user.count();
    return count;
};

export const userService = {
    getUsers,
    updateUserById,
    createUser,
    getUserById,
    deleteUser,
    toggleActive,
    getCount,
};
