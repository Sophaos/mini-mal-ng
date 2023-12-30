import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimeState, animeFeatureKey } from './anime.reducers';
import { getRouterSelectors } from '@ngrx/router-store';
import { getPagination } from 'src/app/shared/data-access/models/pagination';

export const selectAnimeState =
  createFeatureSelector<AnimeState>(animeFeatureKey);

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
