import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role, SubscriptionStatus } from '@prisma/client';

@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN) // Only Super Admin can manage schools
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) { }

    @Post()
    create(@Body() createSchoolDto: { name: string; slug: string; address?: string }) {
        return this.schoolService.create(createSchoolDto);
    }

    @Get()
    findAll() {
        return this.schoolService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.schoolService.findOne(id);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: SubscriptionStatus
    ) {
        return this.schoolService.updateStatus(id, status);
    }
}
