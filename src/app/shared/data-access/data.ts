import { Pagination } from './pagination';

export interface Data<T> {
  data: T[];
  pagination: Pagination;
}
