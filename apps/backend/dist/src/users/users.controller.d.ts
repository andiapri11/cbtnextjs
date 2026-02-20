import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: any, currentUser: any): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        schoolId: string | null;
        createdAt: Date;
    }>;
    findAll(currentUser: any): Promise<{
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
    getMe(user: any): any;
    findOne(id: string, currentUser: any): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        schoolId: string | null;
    }>;
}
