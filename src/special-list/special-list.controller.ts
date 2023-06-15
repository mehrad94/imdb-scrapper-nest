import { Controller, Get } from '@nestjs/common';
import { SpecialListService } from './special-list.service';
import {
  URL_250_MOVIE,
  URL_250_TV_SHOW,
  URL_MOST_POPULAR_MOVIE,
  URL_MOST_POPULAR_TV_SHOW,
} from 'src/values/constant';

@Controller('special-list')
export class SpecialListController {
  constructor(private specialListService: SpecialListService) {}

  @Get('/movie/box-office')
  async getBoxOffice() {
    return this.specialListService.getBoxOffice();
  }

  @Get('/movie/250')
  async get250Movie() {
    return this.specialListService.getMovieList(URL_250_MOVIE);
  }

  @Get('/movie/popular')
  async getMostPopularMovie() {
    return this.specialListService.getMovieList(URL_MOST_POPULAR_MOVIE);
  }

  @Get('/show/250')
  async get250TvShow() {
    return this.specialListService.getMovieList(URL_250_TV_SHOW);
  }

  @Get('/show/popular')
  async getMostPopularTvShow() {
    return this.specialListService.getMovieList(URL_MOST_POPULAR_TV_SHOW);
  }
}
