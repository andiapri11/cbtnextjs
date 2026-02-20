"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let SchoolService = class SchoolService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existing = await this.prisma.school.findUnique({
            where: { slug: data.slug },
        });
        if (existing) {
            throw new common_1.ConflictException('School slug already exists');
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
                        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
    async findOne(id) {
        return this.prisma.school.findUnique({
            where: { id },
            include: { subscription: true },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.school.update({
            where: { id },
            data: { status },
        });
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchoolService);
//# sourceMappingURL=school.service.js.map