import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async login(email: string, pass: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            schoolId: user.schoolId
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    async registerSchool(data: {
        schoolName: string;
        adminName: string;
        adminEmail: string;
        password: string;
        slug?: string;
    }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.prisma.$transaction(async (tx) => {
            // 1. Create School
            const school = await tx.school.create({
                data: {
                    name: data.schoolName,
                    slug: (data.slug || null) as any, // Temporary cast until prisma generate succeeds
                    status: 'TRIAL',
                    subscription: {
                        create: {
                            planName: 'TRIAL',
                            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                        }
                    }
                }
            });

            // 2. Create Admin User
            const user = await tx.user.create({
                data: {
                    name: data.adminName,
                    email: data.adminEmail,
                    password: hashedPassword,
                    role: 'ADMIN',
                    schoolId: school.id,
                }
            });

            return {
                school,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            };
        });
    }
}
