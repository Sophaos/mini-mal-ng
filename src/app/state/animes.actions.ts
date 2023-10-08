import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AnimeBasicInfo } from '../models/AnimeBasicInfo';
import { TopAnimeMangaParams } from '../services/jikan-api/top.service';
import {
  SeasonParams,
  SeasonQueryParams,
} from '../services/jikan-api/seasons.service';
import { AnimeQueryParams } from '../services/jikan-api/anime.service';

export const AnimesPagesActions = createActionGroup({
  source: 'Animes Page',
  events: {
    'Load Season Now': props<{ params?: SeasonQueryParams }>(),
    'Load All': emptyProps(),
    'Load Top Animes': props<{ params?: TopAnimeMangaParams }>(),
    'Load Top Animes By Popularity': props<{ params?: TopAnimeMangaParams }>(),
    'Load Top Animes By Airing': props<{ params?: TopAnimeMangaParams }>(),
    'Load Top Animes By Upcoming': props<{ params?: TopAnimeMangaParams }>(),
    'Load Season': props<{ params: SeasonParams }>(),
    'Load Animes': props<{ params?: AnimeQueryParams }>(),
  },
});

export const AnimesAPIActions = createActionGroup({
  source: 'Animes API',
  events: {
    'Season Now Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Season Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Top Anime Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Top Anime By Airing Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Top Anime By Popularity Loaded Success': props<{
      animes: AnimeBasicInfo[];
    }>(),
    'Top Anime By Upcoming Loaded Success': props<{
      animes: AnimeBasicInfo[];
    }>(),
    'Animes Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Top Anime Loaded Error': props<{ message: string }>(),
    'Season Now Loaded Error': props<{ message: string }>(),
    'Season Loaded Error': props<{ message: string }>(),
    'Top Anime By Popularity Loaded Error': props<{ message: string }>(),
    'Top Anime By Airing Loaded Error': props<{ message: string }>(),
    'Top Anime By Upcoming Loaded Error': props<{ message: string }>(),
    'Animes Loaded Error': props<{ message: string }>(),
  },
});
