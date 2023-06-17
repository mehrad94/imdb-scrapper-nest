export const URL_MOVIE_IMAGES = '';
export const URL_MOST_POPULAR_MOVIE = 'https://www.imdb.com/chart/moviemeter';
export const URL_MOST_POPULAR_TV_SHOW = 'https://www.imdb.com/chart/tvmeter';
export const URL_250_TV_SHOW = 'https://www.imdb.com/chart/toptv';
export const URL_250_MOVIE = 'https://www.imdb.com/chart/top';
export const URL_POPULAR_TRAILER = 'https://www.imdb.com/trailers';
export const URL_MOVIE_INFORMATION = (movieId: string) =>
  `https://www.imdb.com/title/${movieId}`;

export const URL_MOVIE_GALLERY = (movieId: string) =>
  `https://www.imdb.com/title/${movieId}/mediaindex`;

export const URL_SEARCH_MULTI = (searchParam: string) =>
  `https://www.imdb.com/find/?q=${searchParam}`;

export const URL_BOX_OFFICE = 'https://www.imdb.com/chart/boxoffice/';
