import axios from 'axios';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/5342 (KHTML, like Gecko) Chrome/38.0.870.0 Mobile Safari/5342',
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
