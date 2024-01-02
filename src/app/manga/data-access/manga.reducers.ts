import { createReducer, on } from '@ngrx/store';
import {
  MangaDetailsAPIActions,
  MangaListAPIActions,
  MangaListPageActions,
  MangaDetailsPageActions,
} from './manga.actions';
import { Media } from 'src/app/shared/data-access/models/media';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { BasicDisplayData } from 'src/app/shared/data-access/models/basicDisplayData';
import { DetailedReview } from 'src/app/shared/data-access/models/detailedReview';
import { Recommendation } from 'src/app/shared/data-access/models/recommendation';
import { ImageData } from 'src/app/shared/data-access/models/imageData';

export interface MangaState {
  mangaListDataLoading: boolean;
  genreDataLoading: boolean;
  mangaLoading: boolean;
  mangaPicturesLoading: boolean;
  mangaCharactersLoading: boolean;
  mangaReviewsLoading: boolean;
  mangaRecommendationsLoading: boolean;

  mangaListData?: DataWithPagination<Media>;
  genres: DropdownOption[];
  manga?: Media;
  pictures: ImageData[];
  characters: BasicDisplayData[];
  reviews: DetailedReview[];
  recommendations: Recommendation[];
  errorMessage: string;
}

const intitialState: MangaState = {
  mangaListDataLoading: false,
  genreDataLoading: false,
  mangaLoading: false,
  mangaPicturesLoading: false,
  mangaCharactersLoading: false,
  mangaReviewsLoading: false,
  mangaRecommendationsLoading: false,

  mangaListData: undefined,
  manga: undefined,
  genres: [],
  pictures: [],
  characters: [],
  reviews: [],
  recommendations: [],
  errorMessage: '',
};

export const mangaFeatureKey = 'manga';

export const mangaReducer = createReducer(
  intitialState,
  on(
    MangaListAPIActions.mangaListDataLoadedSuccess,
    (state, { mangaListData }) =>
      ({
        ...state,
        mangaListDataLoading: false,
        mangaListData,
      } satisfies MangaState)
  ),
  on(
    MangaListAPIActions.mangaListDataLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        mangaListDataLoading: false,
        errorMessage: message,
      } satisfies MangaState)
  ),
  on(
    MangaListPageActions.loadMangaListData,
    (state) =>
      ({
        ...state,
        mangaListDataLoading: true,
        errorMessage: '',
        mangaListData: undefined,
      } satisfies MangaState)
  ),
  on(
    MangaListAPIActions.mangaGenresDataLoadedSuccess,
    (state, { genres }) =>
      ({
        ...state,
        genreDataLoading: false,
        genres,
      } satisfies MangaState)
  ),
  on(
    MangaListAPIActions.mangaGenresDataLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        genreDataLoading: false,
        errorMessage: message,
      } satisfies MangaState)
  ),
  on(
    MangaListPageActions.loadMangaGenresData,
    (state) =>
      ({
        ...state,
        genreDataLoading: true,
        errorMessage: '',
        genres: [],
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaDetailsLoadedSuccess,
    (state, { mediaData }) =>
      ({
        ...state,
        mangaLoading: false,
        manga: mediaData,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaDetailsLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        mangaLoading: false,
        errorMessage: message,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsPageActions.loadMangaDetails,
    (state) =>
      ({
        ...state,
        mangaLoading: true,
        mangaRecommendationsLoading: true, // used like this for api rate limit
        mangaReviewsLoading: true, // used like this for api rate limit
        errorMessage: '',
        pictures: [],
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaPicturesLoadedSuccess,
    (state, { images }) =>
      ({
        ...state,
        mangaPicturesLoading: false,
        pictures: images,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaPicturesLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        mangaPicturesLoading: false,
        errorMessage: message,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsPageActions.loadMangaPictures,
    (state) =>
      ({
        ...state,
        mangaPicturesLoading: true,
        errorMessage: '',
        pictures: [],
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaCharactersLoadedSuccess,
    (state, { characters }) =>
      ({
        ...state,
        mangaCharactersLoading: false,
        characters,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaCharactersLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        mangaCharactersLoading: false,
        errorMessage: message,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsPageActions.loadMangaCharacters,
    (state) =>
      ({
        ...state,
        mangaCharactersLoading: true,
        errorMessage: '',
        characters: [],
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaReviewsLoadedSuccess,
    (state, { reviews }) =>
      ({
        ...state,
        mangaReviewsLoading: false,
        reviews,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaReviewsLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        mangaReviewsLoading: false,
        errorMessage: message,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsPageActions.loadMangaReviews,
    (state) =>
      ({
        ...state,
        mangaReviewsLoading: true,
        errorMessage: '',
        reviews: [],
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaRecommendationsLoadedSuccess,
    (state, { recommendations }) =>
      ({
        ...state,
        mangaRecommendationsLoading: false,
        recommendations,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsAPIActions.mangaRecommendationsLoadedFail,
    (state, { message }) =>
      ({
        ...state,
        mangaRecommendationsLoading: false,
        errorMessage: message,
      } satisfies MangaState)
  ),
  on(
    MangaDetailsPageActions.loadMangaRecommendations,
    (state) =>
      ({
        ...state,
        mangaRecommendationsLoading: true,
        errorMessage: '',
        recommendations: [],
      } satisfies MangaState)
  )
);
