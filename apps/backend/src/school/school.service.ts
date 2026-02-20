import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class SchoolService {
    constructor(private prisma: PrismaService) { }

    async create(data: { name: string; slug: string; address?: string }) {
        const existing = await this.prisma.school.findUnique({
            where: { slug: data.slug },
        });

        if (existing) {
            throw new ConflictException('School slug already exists');
        }

        return this.prisma.school.create({
            data: {
                name: data.name,
                slug: data.slug,
                address: data.address,
                status: 'TRIAL',
                subscription: {
                    create: {
                        planName: 'TRIAL',
                        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trial
                    }
                }
            },
            include: {
                subscription: true,
            },
        });
    }

    async findAll() {
        return this.prisma.school.findMany({
            include: {
                subscription: true,
                _count: {
                    select: { users: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.school.findUnique({
            where: { id },
            include: { subscription: true },
        });
    }

    async updateStatus(id: string, status: SubscriptionStatus) {
        return this.prisma.school.update({
            where: { id },
            data: { status },
        });
    }
}
