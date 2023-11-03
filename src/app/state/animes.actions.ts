import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AnimeBasicInfo } from '../shared/data-access/AnimeBasicInfo';
import { TopAnimeMangaParams } from '../shared/data-access/top.service';
import {
  SeasonParams,
  SeasonQueryParams,
} from '../season/data-access/seasons.service';
import {
  AnimeQueryParams,
  AnimeQueryParamsWithId,
} from '../anime/data-access/anime.service';

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
    'Load Anime Search': props<{ params?: AnimeQueryParams }>(),
    'Load Anime Full By Id': props<{ id: number }>(),
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
    'Anime Search Loaded Success': props<{ animes: AnimeBasicInfo[] }>(),
    'Anime Full By Id Loaded Success': props<{ anime: AnimeBasicInfo }>(),

    'Top Anime Loaded Error': props<{ message: string }>(),
    'Season Now Loaded Error': props<{ message: string }>(),
    'Season Loaded Error': props<{ message: string }>(),
    'Top Anime By Popularity Loaded Error': props<{ message: string }>(),
    'Top Anime By Airing Loaded Error': props<{ message: string }>(),
    'Top Anime By Upcoming Loaded Error': props<{ message: string }>(),
    'Anime Search Loaded Error': props<{ message: string }>(),
    'Anime Full By Id Loaded Error': props<{ message: string }>(),
  },
});
