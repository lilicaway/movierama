/** Response type for GET /genre/movie/list */
export interface GenreTmdbResponse {
  genres: GenreTmdb[];
}

export interface GenreTmdb {
  id: number;
  name: string;
}
