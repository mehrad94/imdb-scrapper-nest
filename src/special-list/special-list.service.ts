import { Injectable, NotFoundException } from '@nestjs/common';
import { load } from 'cheerio';
import { BoxOfficeDto } from 'src/dtos/box-office.dto';
import { MovieService } from 'src/movie/movie.service';
import { getHtml, movieIdExtractor } from 'src/utils';
import { URL_BOX_OFFICE } from 'src/values/constant';

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
}
