import { Controller, Get } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Controller('utility')
export class UtilityController {
  constructor(private utilityService: UtilityService) {}

  @Get('/genre/movie')
  getAllMovieGenre() {
    return this.utilityService.getAllMovieGenre();
  }

  @Get('/genre/show')
  getAllTvShowGenre() {
    return this.utilityService.getAllTvShowGenre();
  }
}
