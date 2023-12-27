import { createReducer, on } from '@ngrx/store';
import { SeasonAPIActions, SeasonPageActions } from './season.actions';
import { Media } from 'src/app/shared/data-access/models/media';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import {
  YearsSeasonsData,
  initialYearsSeasonsData,
} from 'src/app/shared/data-access/models/yearsSeasonsData';

export interface SeasonState {
  mediaDataLoading: boolean;
  yearsSeasonsDataLoading: boolean;
  mediaData?: DataWithPagination<Media>;
  yearsSeasonsData: YearsSeasonsData;
  errorMessage: string;
}

const intitialState: SeasonState = {
  mediaDataLoading: false,
  yearsSeasonsDataLoading: false,
  mediaData: undefined,
  yearsSeasonsData: initialYearsSeasonsData,
  errorMessage: '',
};

export const seasonReducer = createReducer(
  intitialState,
  on(
    SeasonAPIActions.mediaDataLoadedSuccess,
    (state, { mediaData }) =>
      ({
        ...state,
        mediaDataLoading: false,
        mediaData,
      } satisfies SeasonState)
  ),
  on(
    SeasonAPIActions.mediaDataLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        mediaDataLoading: false,
        errorMessage: message,
      } satisfies SeasonState)
  ),
  on(
    SeasonPageActions.loadMediaData,
    (state) =>
      ({
        ...state,
        mediaDataLoading: true,
        errorMessage: '',
        mediaData: undefined,
      } satisfies SeasonState)
  ),
  on(
    SeasonAPIActions.seasonsDataLoadedSuccess,
    (state, { yearsSeasonsData }) =>
      ({
        ...state,
        yearsSeasonsDataLoading: false,
        yearsSeasonsData,
      } satisfies SeasonState)
  ),
  on(
    SeasonAPIActions.seasonDataLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        yearsSeasonsDataLoading: false,
        errorMessage: message,
      } satisfies SeasonState)
  ),
  on(
    SeasonPageActions.loadSeasonData,
    (state) =>
      ({
        ...state,
        yearsSeasonsDataLoading: true,
        errorMessage: '',
        yearsSeasonsData: initialYearsSeasonsData,
      } satisfies SeasonState)
  )
);
