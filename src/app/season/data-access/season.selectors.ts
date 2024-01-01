import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SeasonState } from './season.reducers';
import { getRouterSelectors } from '@ngrx/router-store';
import { getPagination } from 'src/app/shared/data-access/models/pagination';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { MEDIAS } from './dropdownOptions';

export const selectSeasonState = createFeatureSelector<SeasonState>('season');

export const { selectRouteParams, selectQueryParams, selectRouteParam } =
  getRouterSelectors();

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

export const selectMediaList = createSelector(
  selectSeasonState,
  ({ mediaData }) => mediaData?.data
);

export const selectSeasonPagination = createSelector(
  selectSeasonState,
  selectQueryParams,
  ({ mediaData }, queryParams) =>
    getPagination(queryParams, mediaData ? mediaData.pagination.total : 0)
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
      ?.seasonOptions ?? []
);

export const selectSeasonErrorMessage = createSelector(
  selectSeasonState,
  ({ errorMessage }) => errorMessage
);

export const selectSeasonDropdownData = createSelector(
  selectYearOptions,
  selectSeasonOptions,
  selectRouteParam('year'),
  selectRouteParam('season'),
  (yearsOptions, seasonsOptions, year, season) => {
    const data: DropdownData[] = [
      {
        label: 'Year',
        param: 'year',
        value: year,
        options: yearsOptions,
      },
      {
        label: 'Season',
        param: 'season',
        value: season,
        options: seasonsOptions,
      },
      {
        label: 'Media',
        param: 'filter',
        options: MEDIAS,
      },
    ];
    return data;
  }
);
