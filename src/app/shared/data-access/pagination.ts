import { ParamMap } from '@angular/router';

export interface Pagination {
  first: number;
  rows: number;
  total: number;
}

export function getPagination(queryParams: ParamMap, total: number) {
  const limit = Number(queryParams.get('limit'));
  const first = Number(queryParams.get('page')) - 1;
  return {
    first: first * limit,
    rows: limit,
    total,
  };
}
