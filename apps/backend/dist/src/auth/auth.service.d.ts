import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    registerSchool(data: {
        schoolName: string;
        adminName: string;
        adminEmail: string;
        password: string;
        slug?: string;
    }): Promise<{
        school: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            address: string | null;
            logo: string | null;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
        };
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
}
