import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  EMPTY,
  catchError,
  exhaustMap,
  map,
  of,
  retry,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { SeasonAPIActions, SeasonPageActions } from './season.actions';
import { Media } from 'src/app/shared/data-access/models/media';
import { SeasonsService } from './seasons.service';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { SeasonData } from 'src/app/shared/data-access/models/seasonData';
import { Pagination } from 'src/app/shared/data-access/models/pagination';
import { SeasonState } from './season.reducers';
import { Store } from '@ngrx/store';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { selectRouteParams, selectQueryParams } from './season.selectors';
import { getCurrentSeason } from 'src/app/shared/utils/currentSeason';

@Injectable()
export class SeasonEffects {
  loadMediaDataFromRouter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      withLatestFrom(
        this.store.select(selectRouteParams),
        this.store.select(selectQueryParams)
      ),
      switchMap(([route, routeParams, queryParams]) => {
        const routeData: RouterNavigationAction = route;
        const segment = routeData.payload.event.url.split('/')[1].split('?')[0];
        if (segment !== 'season') return EMPTY;
        const seasonParams = {
          year: routeParams['year'] ?? new Date().getFullYear(),
          season: routeParams['season'] ?? getCurrentSeason(),
          filter: queryParams['filter'] ?? 'tv',
          page: queryParams['page'] ?? 1,
          limit: queryParams['limit'] ?? 16,
        };

        return of(SeasonPageActions.loadMediaData({ params: seasonParams }));
      })
    )
  );

  loadMediaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeasonPageActions.loadMediaData),
      exhaustMap((action) =>
        this.seasonService.getMediaData(action.params).pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const data: Media[] = response.data.map((item) => ({
              id: item.mal_id,
              title: item.title,
              titleEnglish: item.title_english,
              from: item.aired?.from,
              episodes: item.episodes,
              genres: item.genres.map((r) => r.name),
              imageSrc: item.images.jpg.image_url,
              synopsis: item.synopsis,
              score: item.score,
              members: item.members,
            }));
            const pagination: Pagination = {
              first: response.pagination.current_page,
              rows: response.pagination.items.per_page,
              total: response.pagination.items.total,
            };
            return SeasonAPIActions.mediaDataLoadedSuccess({
              mediaData: { data, pagination },
            });
          }),
          catchError((error) =>
            of(SeasonAPIActions.mediaDataLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  loadSeasonData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeasonPageActions.loadSeasonData),
      exhaustMap(() =>
        this.seasonService.getSeasonData().pipe(
          retry({ count: 3, delay: 1500 }),
          map((res) => {
            const seasonData: SeasonData[] = res.data.map(
              (item) =>
                ({
                  year: item.year,
                  seasonOptions: item.seasons.map(
                    (s: string) =>
                      ({
                        label: s.charAt(0).toUpperCase() + s.slice(1),
                        value: s,
                      } satisfies DropdownOption)
                  ),
                } satisfies SeasonData)
            );
            const yearOptions: DropdownOption[] = seasonData.map(
              (s: SeasonData) =>
                ({
                  label: s.year,
                  value: s.year.toString(),
                } satisfies DropdownOption)
            );
            return SeasonAPIActions.seasonsDataLoadedSuccess({
              yearsSeasonsData: { seasonData, yearOptions },
            });
          }),
          catchError((error) =>
            of(SeasonAPIActions.seasonDataLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  constructor(
    private seasonService: SeasonsService,
    private actions$: Actions,
    private store: Store<SeasonState>
  ) {}
}
