export interface PaginationResponse {
  last_visible_page: number;
  has_next_page: boolean;
  items: Items;
  current_page: number;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}
