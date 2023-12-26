import { createReducer, on } from '@ngrx/store';
import { HomeAPIActions, HomePageActions } from './home.actions';
import { Media } from 'src/app/shared/data-access/models/media';
import { Review } from 'src/app/shared/data-access/models/review';
import { HomeRecommendation } from 'src/app/shared/data-access/models/homeReview';

export interface HomeState {
  topAiringAnimesLoading: boolean;
  recentAnimeReviewsLoading: boolean;
  recentAnimeRecommendationsLoading: boolean;
  topAiringAnimes: Media[];
  recentAnimeReviews: Review[];
  recentAnimeRecommendations: HomeRecommendation[];
  errorMessage: string;
}

const intitialState: HomeState = {
  topAiringAnimesLoading: false,
  recentAnimeReviewsLoading: false,
  recentAnimeRecommendationsLoading: false,
  topAiringAnimes: [],
  recentAnimeReviews: [],
  recentAnimeRecommendations: [],
  errorMessage: '',
};

export const homeReducer = createReducer(
  intitialState,
  on(
    HomeAPIActions.topAiringAnimesLoadedSuccess,
    (state, { topAiringAnimes }) =>
      ({
        ...state,
        topAiringAnimesLoading: false,
        topAiringAnimes,
      } satisfies HomeState)
  ),
  on(
    HomeAPIActions.topAiringAnimesLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        topAiringAnimesLoading: false,
        errorMessage: message,
      } satisfies HomeState)
  ),
  on(
    HomePageActions.loadTopAiringAnimes,
    (state) =>
      ({
        ...state,
        topAiringAnimesLoading: true,
        errorMessage: '',
        topAiringAnimes: [],
      } satisfies HomeState)
  ),
  on(
    HomeAPIActions.recentAnimeReviewsLoadedSuccess,
    (state, { recentAnimeReviews }) =>
      ({
        ...state,
        recentAnimeReviewsLoading: false,
        recentAnimeReviews,
      } satisfies HomeState)
  ),
  on(
    HomeAPIActions.recentAnimeReviewsLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        recentAnimeReviewsLoading: false,
        errorMessage: message,
      } satisfies HomeState)
  ),
  on(
    HomePageActions.loadRecentAnimeReviews,
    (state) =>
      ({
        ...state,
        recentAnimeRecommendationsLoading: true,
        errorMessage: '',
        recentAnimeReviews: [],
      } satisfies HomeState)
  ),
  on(
    HomeAPIActions.recentAnimeRecommendationsLoadedSuccess,
    (state, { recentAnimeRecommendations }) =>
      ({
        ...state,
        recentAnimeRecommendationsLoading: false,
        recentAnimeRecommendations,
      } satisfies HomeState)
  ),
  on(
    HomeAPIActions.recentAnimeRecommendationsLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        recentAnimeRecommendationsLoading: false,
        errorMessage: message,
      } satisfies HomeState)
  ),
  on(
    HomePageActions.loadRecentAnimeRecommendations,
    (state) =>
      ({
        ...state,
        recentAnimeRecommendationsLoading: true,
        errorMessage: '',
        recentAnimeRecommendations: [],
      } satisfies HomeState)
  )
);
