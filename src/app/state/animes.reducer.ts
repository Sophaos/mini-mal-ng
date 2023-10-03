import { createReducer, on } from '@ngrx/store';
import { AnimesAPIActions, AnimesPagesActions } from './animes.actions';
import { AppState } from './app.state';

const initialState: AppState = {
  animes: [],
  top: [],
  topAiring: [],
  topUpcoming: [],
  topPopularity: [],
  error: '',
  seasonNow: [],
};
export const animesReducer = createReducer(
  initialState,
  on(AnimesPagesActions.loadAnimes, (state) => ({
    ...state,
  })),
  on(AnimesPagesActions.loadTopAnimes, (state) => ({
    ...state,
  })),
  on(AnimesAPIActions.seasonNowLoadedSuccess, (state, { animes }) => ({
    ...state,
    seasonNow: animes,
  })),
  on(AnimesAPIActions.seasonNowLoadedError, (state, { message }) => ({
    ...state,
    error: message,
  })),
  // on(AnimesAPIActions.topAnimeLoadedSuccess, (state, { animes }) => ({
  //   ...state,
  //   top: animes,
  // })),
  on(AnimesAPIActions.topAnimeLoadedError, (state, { message }) => ({
    ...state,
    error: message,
  })),
  on(AnimesPagesActions.loadTopAnimesByAiring, (state) => ({
    ...state,
    topAiring: [],
  })),
  on(AnimesAPIActions.topAnimeByAiringLoadedSuccess, (state, { animes }) => ({
    ...state,
    topAiring: animes,
  })),
  on(
    AnimesAPIActions.topAnimeByPopularityLoadedSuccess,
    (state, { animes }) => ({
      ...state,
      topPopularity: animes,
    })
  ),
  on(AnimesAPIActions.topAnimeByUpcomingLoadedSuccess, (state, { animes }) => ({
    ...state,
    topUpcoming: animes,
  })),
  on(AnimesPagesActions.loadTopAnimesByPopularity, (state) => ({
    ...state,
    topUpcoming: [],
  })),
  on(AnimesPagesActions.loadTopAnimesByUpcoming, (state) => ({
    ...state,
    topPopular: [],
  }))
);
