import { Data } from './data';
import { Pagination } from './pagination';

export interface DataWithPagination<T> extends Data<T> {
  pagination: Pagination;
}
