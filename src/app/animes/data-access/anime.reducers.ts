import { createReducer, on } from '@ngrx/store';
import {
  AnimeDetailsAPIActions,
  AnimeListAPIActions,
  AnimeListPageActions,
  AnimeDetailsPageActions,
} from './anime.actions';
import { Media } from 'src/app/shared/data-access/models/media';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { BasicDisplayData } from 'src/app/shared/data-access/models/basicDisplayData';
import { DetailedReview } from 'src/app/shared/data-access/models/detailedReview';
import { Recommendation } from 'src/app/shared/data-access/models/recommendation';
import { ImageData } from 'src/app/shared/data-access/models/imageData';

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

export const animeFeatureKey = 'anime';

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
  ),
  on(
    AnimeDetailsAPIActions.animeDetailsLoadedSuccess,
    (state, { mediaData }) =>
      ({
        ...state,
        animeLoading: false,
        anime: mediaData,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeDetailsLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        animeLoading: false,
        errorMessage: message,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsPageActions.loadAnimeDetails,
    (state) =>
      ({
        ...state,
        animeLoading: true,
        errorMessage: '',
        pictures: [],
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animePicturesLoadedSuccess,
    (state, { images }) =>
      ({
        ...state,
        animePicturesLoading: false,
        pictures: images,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animePicturesLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        animePicturesLoading: false,
        errorMessage: message,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsPageActions.loadAnimePictures,
    (state) =>
      ({
        ...state,
        animePicturesLoading: true,
        errorMessage: '',
        pictures: [],
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeCharactersLoadedSuccess,
    (state, { characters }) =>
      ({
        ...state,
        animeCharactersLoading: false,
        characters,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeCharactersLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        animeCharactersLoading: false,
        errorMessage: message,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsPageActions.loadAnimeCharacters,
    (state) =>
      ({
        ...state,
        animeCharactersLoading: true,
        errorMessage: '',
        characters: [],
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeStaffLoadedSuccess,
    (state, { staff }) =>
      ({
        ...state,
        animeStaffLoading: false,
        staff,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeStaffLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        animeStaffLoading: false,
        errorMessage: message,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsPageActions.loadAnimeStaff,
    (state) =>
      ({
        ...state,
        animeStaffLoading: true,
        errorMessage: '',
        staff: [],
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeReviewsLoadedSuccess,
    (state, { reviews }) =>
      ({
        ...state,
        animeReviewsLoading: false,
        reviews,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeReviewsLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        animeReviewsLoading: false,
        errorMessage: message,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsPageActions.loadAnimeReviews,
    (state) =>
      ({
        ...state,
        animeReviewsLoading: true,
        errorMessage: '',
        reviews: [],
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeRecommendationsLoadedSuccess,
    (state, { recommendations }) =>
      ({
        ...state,
        animeRecommendationsLoading: false,
        recommendations,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsAPIActions.animeRecommendationsLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        animeRecommendationsLoading: false,
        errorMessage: message,
      } satisfies AnimeState)
  ),
  on(
    AnimeDetailsPageActions.loadAnimeRecommendations,
    (state) =>
      ({
        ...state,
        animeRecommendationsLoading: true,
        errorMessage: '',
        recommendations: [],
      } satisfies AnimeState)
  )
);
