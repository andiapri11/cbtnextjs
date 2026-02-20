import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        email: string;
        password: string;
        name: string;
        role: Role;
        schoolId?: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        schoolId: string | null;
        createdAt: Date;
    }>;
    findAll(schoolId?: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        schoolId: string | null;
        createdAt: Date;
        school: {
            name: string;
            slug: string | null;
        } | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        schoolId: string | null;
    } | null>;
}
