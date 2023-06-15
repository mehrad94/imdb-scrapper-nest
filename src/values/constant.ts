export const URL_MOVIE_IMAGES = '';
export const URL_MOVIE_INFORMATION = (movieId: string) =>
  `https://www.imdb.com/title/${movieId}`;

export const URL_MOVIE_GALLERY = (movieId: string) =>
  `https://www.imdb.com/title/${movieId}/mediaindex`;

export const URL_SEARCH_MULTI = (searchParam: string) =>
  `https://www.imdb.com/find/?q=${searchParam}`;

export const URL_BOX_OFFICE = 'https://www.imdb.com/chart/boxoffice/';
