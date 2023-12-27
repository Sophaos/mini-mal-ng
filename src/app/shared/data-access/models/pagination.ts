import { ParamMap, Params } from '@angular/router';

export interface Pagination {
  first: number;
  rows: number;
  total: number;
}

// TODO: remove this one and use bottom
export function getPagination(queryParams: ParamMap, total: number) {
  const limit = Number(queryParams.get('limit'));
  const first = Number(queryParams.get('page')) - 1;
  return {
    first: first * limit,
    rows: limit,
    total,
  };
}

export function getPagination2(queryParams: Params, total: number) {
  const limit = Number(queryParams['limit']);
  const first = Number(queryParams['page']) - 1;
  return {
    first: first * limit,
    rows: limit,
    total,
  };
}
