import { Data } from '../models/data';
import { PaginationResponse } from './paginationResponse';

export interface DataWithPaginationResponse<T> extends Data<T> {
  pagination: PaginationResponse;
}
