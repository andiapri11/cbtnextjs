import { PrismaService } from '../prisma.service';
import { SubscriptionStatus } from '@prisma/client';
export declare class SchoolService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        slug: string;
        address?: string;
    }): Promise<{
        subscription: {
            id: string;
            schoolId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            planName: string;
            startDate: Date;
            endDate: Date;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        address: string | null;
        logo: string | null;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
    }>;
    findAll(): Promise<({
        subscription: {
            id: string;
            schoolId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            planName: string;
            startDate: Date;
            endDate: Date;
        } | null;
        _count: {
            users: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        address: string | null;
        logo: string | null;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
    })[]>;
    findOne(id: string): Promise<({
        subscription: {
            id: string;
            schoolId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            planName: string;
            startDate: Date;
            endDate: Date;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        address: string | null;
        logo: string | null;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
    }) | null>;
    updateStatus(id: string, status: SubscriptionStatus): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        address: string | null;
        logo: string | null;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
    }>;
}
