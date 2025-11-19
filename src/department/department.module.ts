import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { DepartmentResolver } from './department.resolver';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService,PrismaService, DepartmentResolver],
  imports :[AuthModule]
})
export class DepartmentModule {}
