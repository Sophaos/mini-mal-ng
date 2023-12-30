import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import { AnimeQueryParams } from './anime.service';
import { Media } from 'src/app/shared/data-access/models/media';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { BasicDisplayData } from 'src/app/shared/data-access/models/basicDisplayData';
import { DetailedReview } from 'src/app/shared/data-access/models/detailedReview';
import { Recommendation } from 'src/app/shared/data-access/models/recommendation';
import { ImageData } from 'src/app/shared/data-access/models/imageData';

export const AnimeListPageActions = createActionGroup({
  source: 'Anime List Page',
  events: {
    'Load Anime List Data': props<{ params: AnimeQueryParams }>(),
    'Load Anime Genres Data': emptyProps(),
  },
});

export const AnimeListAPIActions = createActionGroup({
  source: 'Anime List API',
  events: {
    'Anime List Data Loaded Success': props<{
      animeListData: DataWithPagination<Media>;
    }>(),
    'Anime Genres Data Loaded Success': props<{
      genres: DropdownOption[];
    }>(),
    'Anime List Data Loaded Fail': props<{ message: string }>(),
    'Anime Genres Data Loaded Fail': props<{ message: string }>(),
  },
});

export const AnimeDetailsPageActions = createActionGroup({
  source: 'Anime List Page',
  events: {
    'Load Anime Details': props<{ id: string }>(),
    'Load Anime Characters': props<{ id: string }>(),
    'Load Anime Pictures': props<{ id: string }>(),
    'Load Anime Staff': props<{ id: string }>(),
    'Load Anime Reviews': props<{ id: string }>(),
    'Load Anime Recommendations': props<{ id: string }>(),
  },
});

export const AnimeDetailsAPIActions = createActionGroup({
  source: 'Anime Details API',
  events: {
    'Anime Details Loaded Success': props<{
      mediaData: Media;
    }>(),
    'Anime Characters Loaded Success': props<{
      characters: BasicDisplayData[];
    }>(),
    'Anime Pictures Loaded Success': props<{
      images: ImageData[];
    }>(),
    'Anime Staff Loaded Success': props<{
      staff: BasicDisplayData[];
    }>(),
    'Anime Reviews Loaded Success': props<{
      reviews: DetailedReview[];
    }>(),
    'Anime Recommendations Loaded Success': props<{
      recommendations: Recommendation[];
    }>(),
    'Anime Details Loaded Fail': props<{ message: string }>(),
    'Anime Characters Loaded Fail': props<{ message: string }>(),
    'Anime Pictures Loaded Fail': props<{ message: string }>(),
    'Anime Staff Loaded Fail': props<{ message: string }>(),
    'Anime Reviews Loaded Fail': props<{ message: string }>(),
    'Anime Recommendations Loaded Fail': props<{ message: string }>(),
  },
});
