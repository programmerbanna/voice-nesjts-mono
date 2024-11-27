import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ProfessionalResolver } from './professional.resolver';

/**
 * This module is responsible for providing the ProfessionalService
 * Importing the necessary PrismaModule for database interactions.
 */
@Module({
  imports: [PrismaModule],
  providers: [ProfessionalService, ProfessionalResolver],
  exports: [ProfessionalService],
})
export class ProfessionalModule {}
