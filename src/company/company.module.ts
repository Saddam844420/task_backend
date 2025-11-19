import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { PrismaService } from '../prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyResolver, PrismaService],
  imports:[AuthModule]
})
export class CompanyModule {}
