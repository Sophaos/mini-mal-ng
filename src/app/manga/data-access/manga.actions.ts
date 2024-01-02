import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import { Media } from 'src/app/shared/data-access/models/media';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { BasicDisplayData } from 'src/app/shared/data-access/models/basicDisplayData';
import { DetailedReview } from 'src/app/shared/data-access/models/detailedReview';
import { Recommendation } from 'src/app/shared/data-access/models/recommendation';
import { ImageData } from 'src/app/shared/data-access/models/imageData';
import { MangaQueryParams } from './manga.service';

export const MangaListPageActions = createActionGroup({
  source: 'Manga List Page',
  events: {
    'Load Manga List Data': props<{ params: MangaQueryParams }>(),
    'Load Manga Genres Data': emptyProps(),
  },
});

export const MangaListAPIActions = createActionGroup({
  source: 'Manga List API',
  events: {
    'Manga List Data Loaded Success': props<{
      mangaListData: DataWithPagination<Media>;
    }>(),
    'Manga Genres Data Loaded Success': props<{
      genres: DropdownOption[];
    }>(),
    'Manga List Data Loaded Fail': props<{ message: string }>(),
    'Manga Genres Data Loaded Fail': props<{ message: string }>(),
  },
});

export const MangaDetailsPageActions = createActionGroup({
  source: 'Manga List Page',
  events: {
    'Load Manga Details': props<{ id: string }>(),
    'Load Manga Characters': props<{ id: string }>(),
    'Load Manga Pictures': props<{ id: string }>(),
    'Load Manga Reviews': props<{ id: string }>(),
    'Load Manga Recommendations': props<{ id: string }>(),
  },
});

export const MangaDetailsAPIActions = createActionGroup({
  source: 'Manga Details API',
  events: {
    'Manga Details Loaded Success': props<{
      mediaData: Media;
    }>(),
    'Manga Characters Loaded Success': props<{
      characters: BasicDisplayData[];
    }>(),
    'Manga Pictures Loaded Success': props<{
      images: ImageData[];
    }>(),
    'Manga Reviews Loaded Success': props<{
      reviews: DetailedReview[];
    }>(),
    'Manga Recommendations Loaded Success': props<{
      recommendations: Recommendation[];
    }>(),
    'Manga Details Loaded Fail': props<{ message: string }>(),
    'Manga Characters Loaded Fail': props<{ message: string }>(),
    'Manga Pictures Loaded Fail': props<{ message: string }>(),
    'Manga Reviews Loaded Fail': props<{ message: string }>(),
    'Manga Recommendations Loaded Fail': props<{ message: string }>(),
  },
});
