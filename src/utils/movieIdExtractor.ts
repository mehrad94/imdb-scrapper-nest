export default function movieIdExtractor(url: string) {
  const regexPattern = /\/title\/(tt\d+)/;
  const match = url.match(regexPattern);
  return match ? match[1] : null;
}
