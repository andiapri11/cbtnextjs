import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Roles(Role.SUPER_ADMIN, Role.ADMIN)
    async create(
        @Body() createUserDto: any,
        @GetUser() currentUser: any,
    ) {
        // If not super admin, must be same school
        if (currentUser.role !== Role.SUPER_ADMIN) {
            createUserDto.schoolId = currentUser.schoolId;

            // Admin cannot create SUPER_ADMIN or other ADMIN for now (simple logic)
            if (createUserDto.role === Role.SUPER_ADMIN) {
                throw new ForbiddenException('Cannot create Super Admin');
            }
        }

        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles(Role.SUPER_ADMIN, Role.ADMIN)
    findAll(@GetUser() currentUser: any) {
        const schoolId = currentUser.role === Role.SUPER_ADMIN ? undefined : currentUser.schoolId;
        return this.usersService.findAll(schoolId);
    }

    @Get('me')
    getMe(@GetUser() user: any) {
        return user;
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @GetUser() currentUser: any) {
        const user = await this.usersService.findOne(id);

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        if (currentUser.role !== Role.SUPER_ADMIN && user.schoolId !== currentUser.schoolId) {
            throw new ForbiddenException('You do not have access to this user');
        }

        return user;
    }
}
