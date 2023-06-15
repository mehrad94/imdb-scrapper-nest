import axios from 'axios';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0; KTXN B661806394A77455T1297416P1) like Gecko',
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
