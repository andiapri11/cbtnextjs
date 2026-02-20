import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@schola.cbt';
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const superAdmin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: hashedPassword,
            name: 'Super Admin',
            role: Role.SUPER_ADMIN,
        },
    });

    console.log({ superAdmin });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
