export interface MovieReviewsTmdbRequest {
  moveId: number;
}

export interface MovieReviewsTmdbResponse {
  id: number;
  page: number;
  results: ReviewResultTmdb[];
  total_pages: number;
  total_results: number;
}

export interface ReviewResultTmdb {
  id: number;
  author: string;
  content: string;
  url: string;
}
