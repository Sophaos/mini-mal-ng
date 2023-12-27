import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SeasonAPIActions, SeasonPageActions } from './season.actions';
import { Media } from 'src/app/shared/data-access/models/media';
import { SeasonsService } from './seasons.service';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { SeasonData } from 'src/app/shared/data-access/models/seasonData';
import { Pagination } from 'src/app/shared/data-access/models/pagination';

@Injectable()
export class SeasonEffects {
  loadMediaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeasonPageActions.loadMediaData),
      exhaustMap((param) =>
        this.seasonService.getMediaData(param).pipe(
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
                  value: s.year,
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
    private actions$: Actions
  ) {}
}
