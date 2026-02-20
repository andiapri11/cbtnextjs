require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

async function main() {
    const superAdminEmail = 'superadmin@schola.id';
    const hashedPassword = await bcrypt.hash('superadmin123', 10);

    console.log('Seed start...');

    const superAdmin = await prisma.user.upsert({
        where: { email: superAdminEmail },
        update: {},
        create: {
            email: superAdminEmail,
            password: hashedPassword,
            name: 'Super Admin Schola',
            role: 'SUPER_ADMIN',
        },
    });

    console.log('Done:', superAdmin.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
