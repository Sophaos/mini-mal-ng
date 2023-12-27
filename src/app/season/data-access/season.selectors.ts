import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SeasonState } from './season.reducers';

export const selectSeasonState = createFeatureSelector<SeasonState>('season');

export const selectYearsSeasonsDataLoading = createSelector(
  selectSeasonState,
  ({ yearsSeasonsDataLoading }) => yearsSeasonsDataLoading
);

export const selectYearsSeasonsData = createSelector(
  selectSeasonState,
  ({ yearsSeasonsData }) => yearsSeasonsData
);

export const selectSeasonErrorMessage = createSelector(
  selectSeasonState,
  ({ errorMessage }) => errorMessage
);
