import { createReducer, on } from '@ngrx/store';
import {
  AnimeDetailsAPIActions,
  AnimeListAPIActions,
  AnimeListPageActions,
  AnimeDetailsPageActions,
} from './anime.actions';
import { Media } from 'src/app/shared/data-access/models/media';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import {
  YearsSeasonsData,
  initialYearsSeasonsData,
} from 'src/app/shared/data-access/models/yearsSeasonsData';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { BasicDisplayData } from 'src/app/shared/data-access/models/basicDisplayData';
import { DetailedReview } from 'src/app/shared/data-access/models/detailedReview';
import { Recommendation } from 'src/app/shared/data-access/models/recommendation';

export interface AnimeState {
  animeListDataLoading: boolean;
  genreDataLoading: boolean;
  animeLoading: boolean;
  animePicturesLoading: boolean;
  animeCharactersLoading: boolean;
  animeStaffLoading: boolean;
  animeReviewsLoading: boolean;
  animeRecommendationsLoading: boolean;

  animeListData?: DataWithPagination<Media>;
  genres: DropdownOption[];
  anime?: Media;
  pictures: ImageData[];
  characters: BasicDisplayData[];
  staff: BasicDisplayData[];
  reviews: DetailedReview[];
  recommendations: Recommendation[];
  errorMessage: string;
}

const intitialState: AnimeState = {
  animeListDataLoading: false,
  genreDataLoading: false,
  animeLoading: false,
  animePicturesLoading: false,
  animeCharactersLoading: false,
  animeStaffLoading: false,
  animeReviewsLoading: false,
  animeRecommendationsLoading: false,

  animeListData: undefined,
  anime: undefined,
  genres: [],
  pictures: [],
  characters: [],
  staff: [],
  reviews: [],
  recommendations: [],
  errorMessage: '',
};

export const animeReducer = createReducer(
  intitialState,
  on(
    AnimeListAPIActions.animeListDataLoadedSuccess,
    (state, { animeListData }) =>
      ({
        ...state,
        animeListDataLoading: false,
        animeListData,
      } satisfies AnimeState)
  ),
  on(
    AnimeListAPIActions.animeListDataLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        animeListDataLoading: false,
        errorMessage: message,
      } satisfies AnimeState)
  ),
  on(
    AnimeListPageActions.loadAnimeListData,
    (state) =>
      ({
        ...state,
        animeListDataLoading: true,
        errorMessage: '',
        animeListData: undefined,
      } satisfies AnimeState)
  ),
  on(
    AnimeListAPIActions.animeGenresDataLoadedSuccess,
    (state, { genres }) =>
      ({
        ...state,
        genreDataLoading: false,
        genres,
      } satisfies AnimeState)
  ),
  on(
    AnimeListAPIActions.animeGenresDataLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        genreDataLoading: false,
        errorMessage: message,
      } satisfies AnimeState)
  ),
  on(
    AnimeListPageActions.loadAnimeGenresData,
    (state) =>
      ({
        ...state,
        genreDataLoading: true,
        errorMessage: '',
        genres: [],
      } satisfies AnimeState)
  )
);
