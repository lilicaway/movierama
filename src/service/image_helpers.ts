// tslint:disable-next-line:no-var-requires It doesn't compile from tests otherwise.
const noPosterSvgImage: string = require('./image_no_poster.svg');

export interface PosterRequest {
  path: string;
  // Size values hardcoded from
  // https://developers.themoviedb.org/3/configuration/get-api-configuration
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
}

const SECURE_BASE_URL = 'https://image.tmdb.org/t/p/';

function getPosterFullUrl(req: PosterRequest): string {
  return `${SECURE_BASE_URL}${req.size}${req.path}`;
}

export function getImage(req: PosterRequest): string {
  if (!req.path) {
    return `data:image/svg+xml;utf8,${noPosterSvgImage}`;
  }
  return getPosterFullUrl(req);
}
