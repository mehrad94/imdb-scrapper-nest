import { Injectable, NotFoundException } from '@nestjs/common';
import { load } from 'cheerio';
import { CastInfoDto } from 'src/dtos/cast-info.dto';
import { getHtml } from 'src/utils';
import {
  URL_MOVIE_GALLERY,
  URL_MOVIE_INFORMATION,
  URL_SEARCH_MULTI,
} from 'src/values/constant';

@Injectable()
export class MovieService {
  async getMovieById(movieId: string) {
    const movieInfo = {
      poster: '',
      movieTitle: '',
      rating: '',
      releasedYear: '',
      pg: '',
      duration: '',
      directors: [],
      writers: [],
      casts: [],
      genres: [],
      storyline: '',
      moreLike: [],
      gallery: [],
    };
    const moviePage = await getHtml(URL_MOVIE_INFORMATION(movieId));
    const galleryPage = await getHtml(URL_MOVIE_GALLERY(movieId));
    if (!moviePage || !galleryPage) throw new NotFoundException();

    const $ = load(moviePage.data);
    const $Gallery = load(galleryPage.data);

    const presentationInfo = $('ul.kdXikI li');
    const ratingInfo = $(
      'div[data-testid=hero-rating-bar__aggregate-rating__score] span',
    );
    const creatorData = $(
      'div.ipc-metadata-list-item__content-container ul.ipc-inline-list',
    );

    // ========================== Directors
    $(creatorData[0]).each((i, director) => {
      movieInfo.directors.push($(director).text());
    });
    // ========================== Writers
    $(creatorData[1])
      .find('li')
      .each((t, tel) => {
        movieInfo.writers.push($(tel).children().text());
      });

    // ========================== Casts
    $('div.sc-bfec09a1-5.kUzsHJ').each((i, el) => {
      const castInfo: CastInfoDto = {
        name: '',
        avatar: '',
        character: '',
        profile: '',
      };
      const avatarLink = $(el)
        .find('div.ipc-media.ipc-media--avatar img')
        .attr('src');

      const castLink = $(el).find('a').attr('href');
      const castInformation = $(el).find('div.sc-bfec09a1-7.dpBDvu a');

      /// ==============
      castInfo.avatar = avatarLink;
      castInfo.profile = 'https://imdb.com/' + castLink;
      castInfo.name = $(castInformation[0]).text();
      castInfo.character = $(castInformation[1]).text();
      movieInfo.casts.push(castInfo);
    });

    // ========================== Genres
    const aElements = $('a[href*="' + '?genres=' + '"]');
    aElements.each((index, element) => {
      movieInfo.genres.push($(element).text());
    });

    // ========================== Storyline
    // const storyline = $('span.sc-cd57914c-2.cXtXlS').text();
    const storyline = $($('p[data-testid="plot"] span')[2]).text();
    // ========================== MoreLikeThis
    $('section[data-testid="MoreLikeThis"]')
      .find('div[data-testid="shoveler-items-container"]')
      .children()
      .each((i, el) => {
        const movieLike = {
          poster: '',
          url: '',
          rating: '',
          title: '',
        };

        movieLike.poster = $(el).find('img.ipc-image').attr('src');
        movieLike.url = 'https://imdb.com' + $(el).find('a').attr('href');
        movieLike.rating = $(el).find('span.ipc-rating-star').text();
        movieLike.title = $(el).find('span[data-testid="title"]').text();
        movieInfo.moreLike.push(movieLike);
      });

    // ========================== Gallery
    $Gallery('div.media_index_thumb_list img').each((i, el) => {
      movieInfo.gallery.push(
        $Gallery(el).attr('src').split('@.')[0] + '@._V1_FMjpg_UX2048_.jpg',
      );
    });

    // ========================== released date
    movieInfo.storyline = storyline;
    movieInfo.poster = $('img.ipc-image').attr('src');
    movieInfo.movieTitle = $('h1[data-testid=hero__pageTitle] span').text();
    movieInfo.rating = $(ratingInfo[0]).text();
    movieInfo.releasedYear = $(
      $('a[href*="' + 'releaseinfo?' + '"]')[2],
    ).text();
    movieInfo.pg = $(presentationInfo[1]).text();
    movieInfo.duration = $(presentationInfo[2]).text();
    return movieInfo;
  }

  async getMoviePoster(movieId: string) {
    const moviePage = await getHtml(URL_MOVIE_INFORMATION(movieId));
    if (!moviePage) throw new NotFoundException();
    const $ = load(moviePage.data);
    const posterUrl = `https://imdb.com${$(
      'div[data-testid="hero-media__poster"] a',
    ).attr('href')}`;
    const posterPage = await getHtml(posterUrl);
    if (!posterPage) throw new NotFoundException();
    const _$ = load(posterPage.data);
    const path = _$('div.kEDMKk img').attr('src');
    if (!path) throw new NotFoundException();
    return { path };
  }

  async searchMulti(query: string) {
    const searchResult = {
      people: [],
      titles: [],
    };
    const moviePage = await getHtml(URL_SEARCH_MULTI(query));

    if (!moviePage) throw new NotFoundException();
    const $ = load(moviePage.data);

    $('section[data-testid="find-results-section-name"]')
      .find('div.ffAEHI ul')
      .children()
      .each((i, el) => {
        const person = {
          link: '',
          avatar: '',
          title: '',
          subtitle: '',
        };
        if (i > 4) return;

        person.link = 'https://imdb.com' + $(el).find('a').attr('href');
        person.title = $(el).find('a').text();
        person.avatar = $(el).find('img').attr('src');
        person.subtitle = $($(el).find('ul').children()[0]).text();
        searchResult.people.push(person);
      });

    $('section[data-testid="find-results-section-title"]')
      .find('div.ffAEHI ul')
      .children()
      .each((i, el) => {
        if (i > 4) return;
        const newTitle = {
          link: '',
          avatar: '',
          title: '',
          year: '',
          stars: [],
        };

        newTitle.link = 'https://imdb.com' + $(el).find('a').attr('href');
        newTitle.title = $(el).find('a').text();
        newTitle.avatar = $(el).find('img').attr('src');
        newTitle.year = $($(el).find('ul').children()[0]).text();
        $($(el).find('ul').children()[1]).each((j, jel) => {
          newTitle.stars.push($(jel).text());
        });
        searchResult.titles.push(newTitle);
      });
    if (searchResult.people.length <= 0 || searchResult.titles.length <= 0)
      throw new NotFoundException();
    return searchResult;
  }
}
