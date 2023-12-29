import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimeState } from './anime.reducers';
import { getRouterSelectors } from '@ngrx/router-store';
import { getPagination } from 'src/app/shared/data-access/models/pagination';

export const selectAnimeState = createFeatureSelector<AnimeState>('anime');

export const { selectRouteParams, selectQueryParams } = getRouterSelectors();

export const selectAnimeListDataLoading = createSelector(
  selectAnimeState,
  ({ animeListDataLoading }) => animeListDataLoading
);

export const selectAnimeListData = createSelector(
  selectAnimeState,
  ({ animeListData }) => animeListData
);

export const selectAnimeList = createSelector(
  selectAnimeState,
  ({ animeListData }) => animeListData?.data
);

export const selectAnimeGenresLoading = createSelector(
  selectAnimeState,
  ({ genreDataLoading }) => genreDataLoading
);

export const selectAnimeGenres = createSelector(
  selectAnimeState,
  ({ genres }) => genres
);

export const selectAnimeListPagination = createSelector(
  selectAnimeState,
  selectQueryParams,
  ({ animeListData }, queryParams) =>
    getPagination(
      queryParams,
      animeListData ? animeListData.pagination.total : 0
    )
);
