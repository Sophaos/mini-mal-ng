import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  EMPTY,
  catchError,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Media } from 'src/app/shared/data-access/models/media';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { Pagination } from 'src/app/shared/data-access/models/pagination';
import { AnimeState } from './anime.reducers';
import { Store } from '@ngrx/store';
import { selectRouteParams, selectQueryParams } from './anime.selectors';
import { AnimeListAPIActions, AnimeListPageActions } from './anime.actions';
import { AnimeQueryParams, AnimeService } from './anime.service';

@Injectable()
export class AnimeEffects {
  loadAnimeListDataFromRouter$ = createEffect(() =>
    this.store.select(selectQueryParams).pipe(
      switchMap((queryParams) => {
        if (queryParams === undefined) return EMPTY;
        const animeParams: AnimeQueryParams = {
          type: queryParams['type'] ?? '',
          status: queryParams['status'] ?? '',
          rating: queryParams['rating'] ?? '',
          order_by: queryParams['order_by'] ?? '',
          q: queryParams['q'] ?? '',
          min_score: queryParams['min_score'] ?? '',
          max_score: queryParams['max_score'] ?? '',
          genres: queryParams['genres'] ?? '',
          sort: queryParams['sort'] ?? '',
          page: queryParams['page'] ?? 1,
          limit: queryParams['limit'] ?? 16,
        };
        return of(
          AnimeListPageActions.loadAnimeListData({ params: animeParams })
        );
      })
    )
  );

  loadAnimeListData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeListPageActions.loadAnimeListData),
      exhaustMap((action) =>
        this.animeService.getAnimeList(action.params).pipe(
          map((response) => {
            const data: Media[] = response.data.map(
              (item) =>
                ({
                  id: item.mal_id,
                  title: item.title,
                  titleEnglish: item.title_english,
                  from: item.aired?.from,
                  episodes: item.episodes,
                  imageSrc: item.images.jpg.image_url,
                  synopsis: item.synopsis,
                  score: item.score,
                  members: item.members,
                  genres: item.genres.map((r) => r.name),
                } satisfies Media)
            );
            const pagination: Pagination = {
              first: response.pagination.current_page,
              rows: response.pagination.items.per_page,
              total: response.pagination.items.total,
            };
            return AnimeListAPIActions.animeListDataLoadedSuccess({
              animeListData: { data, pagination },
            });
          }),
          catchError((error) =>
            of(AnimeListAPIActions.animeListDataLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeListPageActions.loadAnimeGenresData),
      exhaustMap(() =>
        this.animeService.getAnimeGenres().pipe(
          map((response) => {
            const genres: DropdownOption[] = response.data.map((item) => ({
              value: item.mal_id.toString(),
              label: item.name,
            }));
            return AnimeListAPIActions.animeGenresDataLoadedSuccess({
              genres,
            });
          }),
          catchError((error) =>
            of(
              AnimeListAPIActions.animeGenresDataLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  constructor(
    private animeService: AnimeService,
    private actions$: Actions,
    private store: Store<AnimeState>
  ) {}
}
