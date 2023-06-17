import axios from 'axios';
import { load } from 'cheerio';

export default async function getIMDbTrailer(imdbUrl: string) {
  try {
    // Fetch IMDb page HTML
    const response = await axios.get(imdbUrl);
    const html = response.data;

    // Load HTML into cheerio
    const $ = load(html);

    // Extract trailer source URL
    const trailerElement = $(
      '.slate a.slate_button[data-event-type="trailer"]',
    );
    const trailerLink = trailerElement.attr('href');

    if (trailerLink) {
      // Fetch trailer page HTML
      const trailerResponse = await axios.get(
        `https://www.imdb.com${trailerLink}`,
      );
      const trailerHtml = trailerResponse.data;

      // Load trailer HTML into cheerio
      const trailer$ = load(trailerHtml);

      // Extract video source URL
      const videoElement = trailer$('video');
      const videoSource = videoElement.find('source').attr('src');

      if (videoSource) {
        console.log('IMDb Trailer Video Link:', videoSource);
      } else {
        console.log('No video source found for the trailer.');
      }
    } else {
      console.log('No trailer found on IMDb.');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}
