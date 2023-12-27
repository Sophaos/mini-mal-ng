import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { combineLatest, map, switchMap } from 'rxjs';
import { SeasonsService } from '../../data-access/seasons.service';
import {
  getPagination,
  getPagination2,
} from 'src/app/shared/data-access/models/pagination';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { RouteQueryParams } from 'src/app/shared/data-access/models/routeQueryParams';
import { SeasonData } from 'src/app/shared/data-access/models/seasonData';
import { getCurrentSeason } from 'src/app/shared/utils/currentSeason';
import { Store } from '@ngrx/store';
import {
  selectQueryParams,
  selectRouteParams,
  selectYearsSeasonsData,
} from '../../data-access/season.selectors';
import { SeasonPageActions } from '../../data-access/season.actions';
import { MEDIAS } from '../../data-access/dropdownOptions';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonListComponent implements OnInit {
  seasons$ = this.store.select(selectYearsSeasonsData);
  routeParams$ = this.store.select(selectRouteParams);
  queryParams$ = this.store.select(selectQueryParams);

  animes$ = combineLatest([this.routeParams$, this.queryParams$]).pipe(
    switchMap(([params, queryParams]) =>
      this.getSeasonAnimes(params, queryParams)
    )
  );

  isLoading$ = this.seasonService.isSeasonDataLoading$;

  vm$ = combineLatest([
    this.seasons$,
    this.animes$,
    this.routeParams$,
    this.queryParams$,
    this.isLoading$,
  ]).pipe(
    map(([seasons, animes, routeParams, queryParams, isLoading]) => {
      const seasonOptions = this.seasonOptions(
        seasons?.seasonData,
        routeParams
      );
      const pagination = getPagination2(queryParams, animes.pagination.total);
      const yearsOptions = seasons?.yearOptions;
      return {
        pagination,
        animes: { data: animes.data, isLoading },
        filters: this.getSeasonFilterData(yearsOptions, seasonOptions ?? []),
      };
    })
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seasonService: SeasonsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SeasonPageActions.loadSeasonData());
    const queryParams = this.route.snapshot.queryParams;
    const defaultQueryParams = {
      page: 1,
      limit: 8,
    };
    const updatedQueryParams = { ...defaultQueryParams, ...queryParams };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  getSeasonFilterData(
    years: DropdownOption[],
    seasons: DropdownOption[]
  ): DropdownData[] {
    return [
      {
        label: 'Year',
        value: Number(this.route.snapshot.params['year']),
        param: 'year',
        options: years,
        change: (event: string | number) => this.yearChange(event),
      },
      {
        label: 'Season',
        param: 'season',
        value: this.route.snapshot.params['season'],
        options: seasons,
        change: (event: string | number) => this.seasonChange(event),
      },
      {
        label: 'Media',
        value: this.route.snapshot.queryParams['filter'],
        param: 'filter',
        options: MEDIAS,
      },
    ];
  }

  yearChange(event: string | number) {
    this.router.navigate(
      ['/season', event, this.route.snapshot.params['season']],
      {
        relativeTo: this.route,
        queryParams: this.getQueryParamstWithDefaultPagination(),
        queryParamsHandling: 'merge',
      }
    );
  }

  seasonChange(event: string | number) {
    this.router.navigate(
      ['/season', this.route.snapshot.params['year'], event],
      {
        relativeTo: this.route,
        queryParams: this.getQueryParamstWithDefaultPagination(),
        queryParamsHandling: 'merge',
      }
    );
  }

  seasonOptions = (seasons: SeasonData[], params: Params) =>
    seasons.find((s: SeasonData) => s.year === Number(params['year']))
      ?.seasonOptions;

  getSeasonAnimes = (params: Params, queryParams: Params) =>
    this.seasonService.getSeasonData$({
      year: params['year'] ?? new Date().getFullYear(),
      season: params['season'] ?? getCurrentSeason(),
      filter: queryParams['filter'] ?? 'tv',
      page: queryParams['page'] ?? 1,
      limit: queryParams['limit'] ?? 16,
    });

  updateRouteQueryParams(updatedParams: RouteQueryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(event: PaginatorState) {
    const updatedParams: RouteQueryParams = {
      ...this.route.snapshot.queryParams,
      page: (event.page ?? 0) + 1,
      limit: event.rows,
    };
    this.updateRouteQueryParams(updatedParams);
  }

  getQueryParamstWithDefaultPagination() {
    return {
      ...this.route.snapshot.queryParams,
      page: 1,
      limit: 8,
    };
  }
}
