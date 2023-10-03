import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeasonsService } from '../services/jikan-api/seasons.service';
import { concatMap, map } from 'rxjs';
import { AnimesAPIActions, AnimesPagesActions } from './animes.actions';
import { AnimeBasicInfo } from '../models/AnimeBasicInfo';
import { TopService } from '../services/jikan-api/top.service';

@Injectable()
export class AnimesEffects {
  constructor(
    private actions$: Actions,
    private animeService: SeasonsService,
    private topService: TopService
  ) {}

  loadSeasonNow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadSeasonNow),
      concatMap((action) =>
        this.animeService.getSeasonNow$(action.params).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
              id: item.mal_id,
              images: item.images.jpg.image_url,
              url: item.url,
              title: item.name,
            }));
            return AnimesAPIActions.seasonNowLoadedSuccess({ animes: data });
          })
        )
      )
    )
  );

  loadTopAnime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadTopAnimes),
      concatMap((action) =>
        this.topService.getAnime$(action.params).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
              id: item.mal_id,
              images: item.images.jpg.image_url,
              url: item.url,
              title: item.name,
            }));
            return AnimesAPIActions.topAnimeLoadedSuccess({ animes: data });
          })
        )
      )
    )
  );

  loadTopAnimeByAiring$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadTopAnimesByAiring),
      concatMap((action) =>
        this.topService.getAnime$(action.params).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
              id: item.mal_id,
              images: item.images.jpg.image_url,
              url: item.url,
              title: item.name,
            }));
            return AnimesAPIActions.topAnimeByAiringLoadedSuccess({
              animes: data,
            });
          })
        )
      )
    )
  );

  loadTopAnimeByPopularity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadTopAnimesByPopularity),
      concatMap((action) =>
        this.topService.getAnime$(action.params).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
              id: item.mal_id,
              images: item.images.jpg.image_url,
              url: item.url,
              title: item.name,
            }));
            return AnimesAPIActions.topAnimeByPopularityLoadedSuccess({
              animes: data,
            });
          })
        )
      )
    )
  );

  loadTopAnimeByUpcoming$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadTopAnimesByUpcoming),
      concatMap((action) =>
        this.topService.getAnime$(action.params).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
              id: item.mal_id,
              images: item.images.jpg.image_url,
              url: item.url,
              title: item.name,
            }));
            return AnimesAPIActions.topAnimeByUpcomingLoadedSuccess({
              animes: data,
            });
          })
        )
      )
    )
  );
}
