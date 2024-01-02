import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MangaState, mangaFeatureKey } from './manga.reducers';
import { getRouterSelectors } from '@ngrx/router-store';
import { getPagination } from 'src/app/shared/data-access/models/pagination';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { MEDIAS, ORDERS, SORTS, STATUSES } from './dropdownOptions';
// import { MEDIAS, ORDERS, RATINGS, SORTS, STATUSES } from './dropdownOptions';
// import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';

export const selectMangaState =
  createFeatureSelector<MangaState>(mangaFeatureKey);

export const { selectRouteParams, selectQueryParams } = getRouterSelectors();

export const selectMangaListDataLoading = createSelector(
  selectMangaState,
  ({ mangaListDataLoading }) => mangaListDataLoading
);

export const selectMangaListData = createSelector(
  selectMangaState,
  ({ mangaListData }) => mangaListData
);

export const selectMangaList = createSelector(
  selectMangaState,
  ({ mangaListData }) => mangaListData?.data
);

export const selectMangaGenresLoading = createSelector(
  selectMangaState,
  ({ genreDataLoading }) => genreDataLoading
);

export const selectMangaGenres = createSelector(
  selectMangaState,
  ({ genres }) => genres
);

export const selectMangaListPagination = createSelector(
  selectMangaState,
  selectQueryParams,
  ({ mangaListData }, queryParams) =>
    getPagination(
      queryParams,
      mangaListData ? mangaListData.pagination.total : 0
    )
);

export const selectMangaDetails = createSelector(
  selectMangaState,
  ({ manga }) => manga
);

export const selectMangaPictures = createSelector(
  selectMangaState,
  ({ pictures }) => pictures
);

export const selectMangaCharacters = createSelector(
  selectMangaState,
  ({ characters }) => characters
);

export const selectMangaReviews = createSelector(
  selectMangaState,
  ({ reviews }) => reviews
);

export const selectMangaRecommendations = createSelector(
  selectMangaState,
  ({ recommendations }) => recommendations
);

export const selectMangaDetailsLoading = createSelector(
  selectMangaState,
  ({ mangaLoading }) => mangaLoading
);

export const selectMangaPicturesLoading = createSelector(
  selectMangaState,
  ({ mangaPicturesLoading }) => mangaPicturesLoading
);

export const selectMangaCharactersLoading = createSelector(
  selectMangaState,
  ({ mangaCharactersLoading }) => mangaCharactersLoading
);

export const selectMangaReviewsLoading = createSelector(
  selectMangaState,
  ({ mangaReviewsLoading }) => mangaReviewsLoading
);

export const selectMangaRecommendationsLoading = createSelector(
  selectMangaState,
  ({ mangaRecommendationsLoading }) => mangaRecommendationsLoading
);

export const selectMangaErrorMessage = createSelector(
  selectMangaState,
  ({ errorMessage }) => errorMessage
);

export const selectMangaDropdownData = createSelector(
  selectMangaGenres,
  (genres) => {
    const data: DropdownData[] = [
      {
        label: 'Media',
        param: 'type',
        options: MEDIAS,
      },
      {
        label: 'Genre(s)',
        param: 'genres',
        options: genres,
        multi: true,
      },
      {
        label: 'Status',
        param: 'status',
        options: STATUSES,
      },
      {
        label: 'Order By',
        param: 'order_by',
        options: ORDERS,
      },
      {
        label: 'Sort',
        param: 'sort',
        options: SORTS,
      },
    ];
    return data;
  }
);
