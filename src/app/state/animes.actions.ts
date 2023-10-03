import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AnimeBasicInfo } from '../models/AnimeBasicInfo';
import { TopAnimeMangaParams } from '../services/jikan-api/top.service';
import { SeasonQueryParams } from '../services/jikan-api/seasons.service';

export const AnimesPagesActions = createActionGroup({
  source: 'Animes Page',
  events: {
    'Load animes': emptyProps(),
    'Load Season Now': props<{ params?: SeasonQueryParams }>(),
    'Load All': emptyProps(),
    'Load Top Animes': props<{ params?: TopAnimeMangaParams }>(),
    'Load Top Animes By Popularity': props<{ params?: TopAnimeMangaParams }>(),
    'Load Top Animes By Airing': props<{ params?: TopAnimeMangaParams }>(),
    'Load Top Animes By Upcoming': props<{ params?: TopAnimeMangaParams }>(),
  },
});

export const AnimesAPIActions = createActionGroup({
  source: 'Animes API',
  events: {
    'Season Now Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Season Now Loaded Error': props<{ message: string }>(),
    'Top Anime Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Top Anime Loaded Error': props<{ message: string }>(),
    'Top Anime By Popularity Loaded Success': props<{
      animes: AnimeBasicInfo[];
    }>(),
    'Top Anime By Popularity Loaded Error': props<{ message: string }>(),
    'Top Anime By Airing Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Top Anime By Airing Loaded Error': props<{ message: string }>(),
    'Top Anime By Upcoming Loaded Success': props<{
      animes: AnimeBasicInfo[];
    }>(),
    'Top Anime By Upcoming Loaded Error': props<{ message: string }>(),
  },
});
