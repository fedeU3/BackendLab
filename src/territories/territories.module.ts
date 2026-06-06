import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Territory } from './territory.entity';
import { TerritoriesController } from './territories.controller';
import { TerritoriesService } from './territories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Territory], 'northwind')],
  controllers: [TerritoriesController],
  providers: [TerritoriesService],
})
export class TerritoriesModule {}
