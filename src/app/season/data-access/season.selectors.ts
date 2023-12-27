import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SeasonState } from './season.reducers';
import { getRouterSelectors } from '@ngrx/router-store';

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

// export const selectYearsSeasonsDataLoading = createSelector(
//   selectSeasonState,
//   ({ mediaDataLoading }) => mediaDataLoading
// );

// export const selectYearsSeasonsData = createSelector(
//   selectSeasonState,
//   ({ yearsSeasonsData }) => yearsSeasonsData
// );

export const selectSeasonErrorMessage = createSelector(
  selectSeasonState,
  ({ errorMessage }) => errorMessage
);
