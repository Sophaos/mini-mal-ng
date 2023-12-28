import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SeasonState } from './season.reducers';
import { getRouterSelectors } from '@ngrx/router-store';
import { getPagination2 } from 'src/app/shared/data-access/models/pagination';

export const selectSeasonState = createFeatureSelector<SeasonState>('season');

export const { selectRouteParams, selectQueryParams } = getRouterSelectors();

export const selectYearsSeasonsDataLoading = createSelector(
  selectSeasonState,
  ({ yearsSeasonsDataLoading }) => yearsSeasonsDataLoading
);

export const selectYearsSeasonsData = createSelector(
  selectSeasonState,
  ({ yearsSeasonsData }) => yearsSeasonsData
);

export const selectMediaDataLoading = createSelector(
  selectSeasonState,
  ({ mediaDataLoading }) => mediaDataLoading
);

export const selectMediaData = createSelector(
  selectSeasonState,
  ({ mediaData }) => mediaData
);

export const selectSeasonPagination = createSelector(
  selectSeasonState,
  selectQueryParams,
  ({ mediaData }, queryParams) =>
    getPagination2(queryParams, mediaData ? mediaData.pagination.total : 0)
);

export const selectYearOptions = createSelector(
  selectYearsSeasonsData,
  ({ yearOptions }) => yearOptions
);

export const selectSeasonOptions = createSelector(
  selectYearsSeasonsData,
  selectRouteParams,
  ({ seasonData }, routeParams) =>
    seasonData.find((s) => s.year === Number(routeParams['year']))
      ?.seasonOptions
);

export const selectSeasonErrorMessage = createSelector(
  selectSeasonState,
  ({ errorMessage }) => errorMessage
);
