import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeasonsService } from '../season/data-access/seasons.service';
import { concatMap, map } from 'rxjs';
import { AnimesAPIActions, AnimesPagesActions } from './animes.actions';
import { AnimeBasicInfo } from '../shared/data-access/AnimeBasicInfo';
import { TopService } from '../shared/data-access/top.service';
import { AnimeService } from '../anime/data-access/anime.service';

@Injectable()
export class AnimesEffects {
  constructor(
    private actions$: Actions,
    private seasonsService: SeasonsService,
    private topService: TopService,
    private animeService: AnimeService
  ) {}

  loadSeason$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadSeason),
      concatMap((action) =>
        this.seasonsService.getSeason$(action.params).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
              ...item,
              // id: item.mal_id,
              images: item.images.jpg.image_url,
              // url: item.url,
              // title: item.name,
            }));
            return AnimesAPIActions.seasonLoadedSuccess({ animes: data });
          })
        )
      )
    )
  );

  loadSeasonNow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadSeasonNow),
      concatMap((action) =>
        this.seasonsService.getSeasonNow$(action.params).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
              ...item,
              // id: item.mal_id,
              images: item.images.jpg.image_url,
              // url: item.url,
              // title: item.name,
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
              ...item,
              // id: item.mal_id,
              images: item.images.jpg.image_url,
              // url: item.url,
              // title: item.name,
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
              ...item,
              // id: item.mal_id,
              images: item.images.jpg.image_url,
              // url: item.url,
              // title: item.name,
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
              ...item,
              // id: item.mal_id,
              images: item.images.jpg.image_url,
              // url: item.url,
              // title: item.name,
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
              ...item,
              // id: item.mal_id,
              images: item.images.jpg.image_url,
              // url: item.url,
              // title: item.name,
            }));
            return AnimesAPIActions.topAnimeByUpcomingLoadedSuccess({
              animes: data,
            });
          })
        )
      )
    )
  );

  loadSearchAnimes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadAnimeSearch),
      concatMap((action) =>
        this.animeService.getAnimeSearch$(action.params).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
              ...item,
              // id: item.mal_id,
              images: item.images.jpg.image_url,
              // url: item.url,
              // title: item.name,
            }));
            return AnimesAPIActions.animeSearchLoadedSuccess({
              animes: data,
            });
          })
        )
      )
    )
  );

  loadAnimeByFullId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimesPagesActions.loadAnimeFullById),
      concatMap((action) =>
        this.animeService.getAnimeFullById$(action.id).pipe(
          map((response: any) => {
            const data: AnimeBasicInfo = {
              ...response,
              // id: item.mal_id,
              images: response.data.images?.jpg?.image_url,
              // url: item.url,
              // title: item.name,
            };
            return AnimesAPIActions.animeFullByIdLoadedSuccess({
              anime: data,
            });
          })
        )
      )
    )
  );
}
