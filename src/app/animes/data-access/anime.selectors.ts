import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimeState, animeFeatureKey } from './anime.reducers';
import { getRouterSelectors } from '@ngrx/router-store';
import { getPagination } from 'src/app/shared/data-access/models/pagination';
import { MEDIAS, ORDERS, RATINGS, SORTS, STATUSES } from './dropdownOptions';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';

export const selectAnimeState =
  createFeatureSelector<AnimeState>(animeFeatureKey);

export const { selectRouteParams, selectQueryParams, selectUrl } =
  getRouterSelectors();

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

export const selectAnimeDetails = createSelector(
  selectAnimeState,
  ({ anime }) => anime
);

export const selectAnimePictures = createSelector(
  selectAnimeState,
  ({ pictures }) => pictures
);

export const selectAnimeCharacters = createSelector(
  selectAnimeState,
  ({ characters }) => characters
);

export const selectAnimeStaff = createSelector(
  selectAnimeState,
  ({ staff }) => staff
);

export const selectAnimeReviews = createSelector(
  selectAnimeState,
  ({ reviews }) => reviews
);

export const selectAnimeRecommendations = createSelector(
  selectAnimeState,
  ({ recommendations }) => recommendations
);

export const selectAnimeDetailsLoading = createSelector(
  selectAnimeState,
  ({ animeLoading }) => animeLoading
);

export const selectAnimePicturesLoading = createSelector(
  selectAnimeState,
  ({ animePicturesLoading }) => animePicturesLoading
);

export const selectAnimeCharactersLoading = createSelector(
  selectAnimeState,
  ({ animeCharactersLoading }) => animeCharactersLoading
);

export const selectAnimeStaffLoading = createSelector(
  selectAnimeState,
  ({ animeStaffLoading }) => animeStaffLoading
);

export const selectAnimeReviewsLoading = createSelector(
  selectAnimeState,
  ({ animeReviewsLoading }) => animeReviewsLoading
);

export const selectAnimeRecommendationsLoading = createSelector(
  selectAnimeState,
  ({ animeRecommendationsLoading }) => animeRecommendationsLoading
);

export const selectAnimeErrorMessage = createSelector(
  selectAnimeState,
  ({ errorMessage }) => errorMessage
);

export const selectUrlFirstSegment = createSelector(
  selectUrl,
  (url) => url.split('/')[1].split('?')[0]
);

export const selectAnimeDropdownData = createSelector(
  selectAnimeGenres,
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
        label: 'Rating',
        param: 'rating',
        options: RATINGS,
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
