import { prisma } from "../configs";
import bcrypt from "bcryptjs";

export const initialAccount = async () => {
    try {
        const count = await prisma.account.count();
        if (count != 0) {
            console.log("\x1b[32m%s\x1b[0m", "Account admin and Hr already");
            return;
        }

        const [hashPassAdmin, hashPassHr] = await Promise.all([
            bcrypt.hash("123456", 12),
            bcrypt.hash("123456", 12),
        ]);
        const admin = {
            userName: "admin",
            password: hashPassAdmin,
            role: 0,
        };
        const hr = {
            userName: "hr1",
            password: hashPassHr,
            role: 1,
        };
        await Promise.all([
            prisma.account.create({ data: admin }),
            prisma.account.create({ data: hr }),
        ]);

        console.log(
            "\x1b[32m%s\x1b[0m",
            `Initial Admin (${admin.userName}/123445}) and Hr (${hr.userName}/123456) `
        );
    } catch (error) {
        console.log(error);
    }
};
