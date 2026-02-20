import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: Record<string, any>): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    registerSchool(data: any): Promise<{
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
