import axios from 'axios';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.5',
};

async function getHtml(url: string) {
  try {
    return await axios.get(url, { headers });
  } catch (e) {
    console.log({ e });
    return false;
  }
}

export default getHtml;
