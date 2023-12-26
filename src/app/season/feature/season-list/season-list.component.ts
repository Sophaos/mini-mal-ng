import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { combineLatest, map, switchMap } from 'rxjs';
import { SeasonsService } from '../../data-access/seasons.service';
import { getPagination } from 'src/app/shared/data-access/models/pagination';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { RouteQueryParams } from 'src/app/shared/data-access/models/routeQueryParams';
import { SeasonData } from 'src/app/shared/data-access/models/seasonData';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonListComponent implements OnInit {
  seasons$ = this.seasonService.seasons$;
  animes$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
    switchMap(([params, queryParams]) =>
      this.getSeasonAnimes(params, queryParams)
    )
  );

  isLoading$ = this.seasonService.isSeasonDataLoading$;

  vm$ = combineLatest([
    this.seasons$,
    this.animes$,
    this.route.paramMap,
    this.route.queryParamMap,
    this.isLoading$,
  ]).pipe(
    map(([seasons, animes, params, queryParams, isLoading]) => {
      const seasonOptions = this.seasonOptions(seasons.seasonData, params);
      const pagination = getPagination(queryParams, animes.pagination.total);
      const yearsOptions = seasons.yearOptions;
      return {
        pagination,
        animes: { data: animes.data, isLoading },
        filters: this.getSeasonFilterData(yearsOptions, seasonOptions ?? []),
      };
    })
  );

  medias: DropdownOption[] = [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Special' },
    { value: 'ona', label: 'ONA' },
    { value: 'music', label: 'Music' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seasonService: SeasonsService
  ) {}

  ngOnInit(): void {
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
        options: this.medias,
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

  seasonOptions = (seasons: SeasonData[], params: ParamMap) =>
    seasons.find((s: SeasonData) => s.year === Number(params.get('year')))
      ?.seasonOptions;

  getSeasonAnimes = (params: ParamMap, queryParams: ParamMap) =>
    this.seasonService.getSeasonData$({
      year: params.get('year') ?? new Date().getFullYear(),
      season: params.get('season') ?? this.getCurrentSeason(),
      filter: queryParams.get('filter') ?? 'tv',
      page: queryParams.get('page') ?? 1,
      limit: queryParams.get('limit') ?? 16,
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

  getCurrentSeason(): string {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1

    if (currentMonth >= 3 && currentMonth <= 5) {
      return 'spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return 'summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      return 'fall';
    } else {
      return 'winter';
    }
  }
}
