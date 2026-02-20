import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: {
        email: string;
        password: string;
        name: string;
        role: Role;
        schoolId?: string;
    }) {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                schoolId: true,
                createdAt: true,
            },
        });
    }

    async findAll(schoolId?: string) {
        return this.prisma.user.findMany({
            where: schoolId ? { schoolId } : {},
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                schoolId: true,
                createdAt: true,
                school: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                schoolId: true,
            },
        });
    }
}
