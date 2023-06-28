import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { load } from 'cheerio';
import { getHtml } from 'src/utils';
import { URL_GENRE } from 'src/values/constant';

@Injectable()
export class UtilityService {
  async getAllMovieGenre() {
    const genres = [];
    const genrePage = await getHtml(URL_GENRE);
    if (!genrePage) throw new InternalServerErrorException();
    const $ = load(genrePage.data);
    $('a[href*="' + 'ft_movie' + '"]').each((i, el) => {
      const genreInfo = { title: '', link: '' };
      genreInfo.link = 'https://imdb.com' + $(el).attr('href');
      genreInfo.title = $(el).find('span').text();
      genres.push(genreInfo);
    });
    if (genres.length <= 0) throw new NotFoundException();
    return genres;
  }
  async getAllTvShowGenre() {
    const genres = [];
    const genrePage = await getHtml(URL_GENRE);
    if (!genrePage) throw new InternalServerErrorException();
    const $ = load(genrePage.data);
    $('a[href*="' + 'ft_tv' + '"]').each((i, el) => {
      const genreInfo = { title: '', link: '' };
      genreInfo.link = 'https://imdb.com' + $(el).attr('href');
      genreInfo.title = $(el).find('span').text();
      genres.push(genreInfo);
    });
    if (genres.length <= 0) throw new NotFoundException();
    return genres;
  }
}
