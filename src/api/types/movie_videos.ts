export interface MovieVideosTmdbRequest {
  movieId: number;
}

export interface MovieVideosTmdbResponse {
  id: number;
  results: VideoResultTmdb[];
}

export interface VideoResultTmdb {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: VideoType;
}

export type VideoType =
  | 'Trailer'
  | 'Teaser'
  | 'Clip'
  | 'Featurette'
  | 'Behind the Scenes'
  | 'Bloopers';
