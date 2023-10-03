import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAnimesState = createFeatureSelector<AppState>('animes');

export const selectAnimes = createSelector(
  selectAnimesState,
  (animesState) => animesState.animes
);

export const selectTop = createSelector(
  selectAnimesState,
  (animesState) => animesState.top
);

export const selectTopAiring = createSelector(
  selectAnimesState,
  (animesState) => animesState.topAiring
);

export const selectTopPopularity = createSelector(
  selectAnimesState,
  (animesState) => animesState.topPopularity
);

export const selectTopUpcoming = createSelector(
  selectAnimesState,
  (animesState) => animesState.topUpcoming
);

export const selectSeasonNow = createSelector(
  selectAnimesState,
  (animesState) => animesState.seasonNow
);
