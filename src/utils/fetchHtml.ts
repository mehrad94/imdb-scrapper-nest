import * as https from 'https';

export default async function fetchHTML(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    https
      .get(url, (response) => {
        let html = '';

        response.on('data', (chunk) => {
          html += chunk;
        });

        response.on('end', () => {
          resolve(html);
        });
      })
      .on('error', (error) => {
        reject(`Failed to fetch HTML: ${error.message}`);
      });
  });
}
