import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  hello() {
    return true;
  }

  @Get('/:movieId')
  getMovieById(@Param() { movieId }) {
    return this.movieService.getMovieById(movieId);
  }

  @Get('/poster/:movieId')
  getMoviePoster(@Param() { movieId }) {
    return this.movieService.getMoviePoster(movieId);
  }

  @Get('/s/:searchParameter')
  searchMulti(@Param() { searchParameter }) {
    return this.movieService.searchMulti(searchParameter);
  }
}
