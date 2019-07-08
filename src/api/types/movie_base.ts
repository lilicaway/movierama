export default interface MovieBaseTmdb {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string; // Representing a date in yyyy-MM-dd
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string; // | null?
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}
