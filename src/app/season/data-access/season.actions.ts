import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import { Media } from 'src/app/shared/data-access/models/media';
import { SeasonParams } from 'src/app/shared/data-access/models/seasonParams';
import { YearsSeasonsData } from 'src/app/shared/data-access/models/yearsSeasonsData';

export const SeasonPageActions = createActionGroup({
  source: 'Season Page',
  events: {
    'Load Media Data': props<SeasonParams>(),
    'Load Season Data': emptyProps(),
  },
});

export const SeasonAPIActions = createActionGroup({
  source: 'Home API',
  events: {
    'Media Data Loaded Success': props<{
      mediaData: DataWithPagination<Media>;
    }>(),
    'Seasons Data Loaded Success': props<{
      yearsSeasonsData: YearsSeasonsData;
    }>(),
    'Media Data Loaded Fail': props<{ message: string }>(),
    'Season Data Loaded Fail': props<{ message: string }>(),
  },
});
