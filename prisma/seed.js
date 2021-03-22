//prisma db push --preview-feature
//prisma db seed --preview-feature
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
async function main() {
    const [hashPassAdmin, hashPassHr] = await Promise.all([
        bcrypt.hash("123456", 12),
        bcrypt.hash("123456", 12),
    ]);
    const admin = await prisma.account.upsert({
        where: { userName: "admin" },
        update: {},
        create: {
            userName: "admin",
            password: hashPassAdmin,
            role: 0,
        },
    });
    const hr = await prisma.account.upsert({
        where: { userName: "hr1" },
        update: {},
        create: {
            userName: "hr1",
            password: hashPassHr,
            role: 1,
        },
    });
    console.log({ admin, hr }, { pass: "123456" });
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
