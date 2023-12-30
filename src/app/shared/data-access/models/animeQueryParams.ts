export interface AnimeQueryParams {
  filter?: string;
  page?: number | string;
  limit?: number | string;
  q?: string;
  type?: string;
  score?: number | string;
  min_score?: number | string;
  max_score?: number | string;
  status?: string;
  rating?: string;
  sfw?: boolean;
  genres?: string | string;
  genres_exclude?: string;
  order_by?: string;
  sort?: string;
  letter?: string;
  producers?: string;
  start_date?: string;
  end_date?: string;
  preliminary?: string;
}
