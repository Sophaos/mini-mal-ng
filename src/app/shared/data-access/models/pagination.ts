import { ParamMap, Params } from '@angular/router';

export interface Pagination {
  first: number;
  rows: number;
  total: number;
}

export function getPagination(queryParams: Params, total: number) {
  const limit = Number(queryParams['limit']);
  const first = Number(queryParams['page']) - 1;
  return {
    first: first * limit,
    rows: limit,
    total,
  };
}
