import { Module } from '@nestjs/common';
import { SpecialListController } from './special-list.controller';
import { SpecialListService } from './special-list.service';
import { MovieService } from 'src/movie/movie.service';

@Module({
  controllers: [SpecialListController],
  providers: [SpecialListService, MovieService],
})
export class SpecialListModule {}
