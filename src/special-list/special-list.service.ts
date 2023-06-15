import { Injectable, NotFoundException } from '@nestjs/common';
import { load } from 'cheerio';
import { BoxOfficeDto } from 'src/dtos/box-office.dto';
import { MovieService } from 'src/movie/movie.service';
import { getHtml, movieIdExtractor } from 'src/utils';
import {
  URL_250_MOVIE,
  URL_250_TV_SHOW,
  URL_BOX_OFFICE,
  URL_MOST_POPULAR_MOVIE,
  URL_MOST_POPULAR_TV_SHOW,
} from 'src/values/constant';

const movie: BoxOfficeDto = {
  id: '',
  title: '',
  weekend: '',
  gross: '',
  weeks: '',
  poster: '',
  url: '',
};

@Injectable()
export class SpecialListService {
  constructor(private movieService: MovieService) {}

  async getBoxOffice() {
    const moviePage = await getHtml(URL_BOX_OFFICE);
    if (!moviePage) throw new NotFoundException();
    const $ = load(moviePage.data);
    const boxOffice = [];
    $('tr').each((i, element) => {
      const info = $(element).text().trim().split('\n');
      if (i === 0) return;
      const movieId = movieIdExtractor($('td.posterColumn a').attr('href'));
      const imgWithTag = $(`img[alt="${info[0].trim()}"]`);
      movie.id = movieId;
      movie.title = info[0].trim();
      movie.weekend = info[3].trim();
      movie.gross = info[6].trim();
      movie.weeks = info[8].trim();
      movie.poster = imgWithTag.attr('src');
      movie.url = `https://imdb.com/title/${movieId}`;
      boxOffice.push(movie);
    });
    return boxOffice;
  }

  async getMovieList(url: string) {
    const movieList = [];
    const popularMoviePage = await getHtml(url);
    if (!popularMoviePage) throw new NotFoundException();
    const $ = load(popularMoviePage.data);
    $('tr').each((i, element) => {
      if (i === 0) return;
      const movie = {
        title: '',
        poster: '',
        link: '',
        year: '',
        rating: '',
        movieId: '',
      };
      const movieId = movieIdExtractor($(element).find('a').attr('href'));
      movie.title = $(element).find('td.titleColumn a ').text();
      movie.poster = $(element).find('td.posterColumn img').attr('src');
      movie.link = 'https://imdb.com/title/' + movieId;
      movie.year = $(element)
        .find('td.titleColumn')
        .find('span.secondaryInfo')
        .text()
        .split(')')[0]
        .replace('(', '');
      movie.rating = $(element).find('td.imdbRating strong').text();
      movie.movieId = movieId;
      movieList.push(movie);
    });
    return movieList;
  }
}
