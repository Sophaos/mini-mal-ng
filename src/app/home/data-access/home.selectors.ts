import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducers';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectTopAiringAnimesLoading = createSelector(
  selectHomeState,
  ({ topAiringAnimesLoading }) => topAiringAnimesLoading
);

export const selectRecentAnimeReviewsLoading = createSelector(
  selectHomeState,
  ({ recentAnimeReviewsLoading }) => recentAnimeReviewsLoading
);

export const selectRecentAnimeRecommendationsLoading = createSelector(
  selectHomeState,
  ({ recentAnimeRecommendationsLoading }) => recentAnimeRecommendationsLoading
);

export const selectTopAiringAnimes = createSelector(
  selectHomeState,
  ({ topAiringAnimes }) => topAiringAnimes
);

export const selectRecentAnimeReviews = createSelector(
  selectHomeState,
  ({ recentAnimeReviews }) => recentAnimeReviews
);

export const selectRecentAnimeRecommendations = createSelector(
  selectHomeState,
  ({ recentAnimeRecommendations }) => recentAnimeRecommendations
);

export const selectPageLoading = createSelector(
  selectHomeState,
  ({
    topAiringAnimesLoading,
    recentAnimeReviewsLoading,
    recentAnimeRecommendationsLoading,
  }) =>
    topAiringAnimesLoading ||
    recentAnimeReviewsLoading ||
    recentAnimeRecommendationsLoading
);

export const selectProductsErrorMessage = createSelector(
  selectHomeState,
  ({ errorMessage }) => errorMessage
);
