import { VideoResultTmdb } from '../api/types/movie_videos';
import { Injector } from '../injector';
import { Trailer } from '../model/trailer';

export class TrailerService {
  constructor(private readonly injector: Injector) {}

  public async getTrailers(
    request: TrailerServiceRequest,
  ): Promise<TrailerServiceResponse> {
    const videosOfMovieResponse = await this.injector.tmdbApi.getMovieVideos(
      request,
    );

    return {
      trailers: videosOfMovieResponse.results
        .filter(video => video.type === 'Trailer')
        .map(getTrailerFromVideoResultTmdb)
        .filter((trailer: Trailer | undefined): trailer is Trailer => {
          return trailer !== undefined;
        }),
    };
  }
}

function getTrailerFromVideoResultTmdb(
  video: VideoResultTmdb,
): Trailer | undefined {
  if (video.site.toLowerCase() === 'youtube') {
    return {
      name: video.name,
      url: `https://www.youtube.com/watch?v=${video.key}`,
    };
  } else if (video.site.toLowerCase() === 'vimeo') {
    return { name: video.name, url: `https://vimeo.com/${video.key}` };
  } else {
    // We don't throw an exception to avoid breaking the page, but we log it, to
    // at least be able to debug if it happens.
    // tslint:disable-next-line:no-console
    console.error(`Unsupported video site: '${video.site}' in video:`, video);
    return undefined;
  }
}

interface TrailerServiceRequest {
  movieId: number;
}

interface TrailerServiceResponse {
  trailers: Trailer[];
}
