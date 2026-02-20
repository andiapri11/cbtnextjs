import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, SchoolModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
