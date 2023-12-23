import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { combineLatest, map, switchMap } from 'rxjs';
import { SeasonsService } from '../../data-access/seasons.service';
import { getPagination } from 'src/app/shared/data-access/pagination';
import { DropdownData } from 'src/app/shared/data-access/dropdownData';

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
      const seasonOptions = this.seasonOptions(seasons, params);
      const pagination = getPagination(
        queryParams,
        animes.pagination.items.total
      );
      const years = seasons.years;
      return {
        years,
        seasons: seasonOptions,
        pagination,
        animes: { data: animes.data, isLoading },
        filters: this.getSeasonFilterData(years, seasonOptions),
      };
    })
  );

  medias: DropdownData[] = [
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

  getSeasonFilterData(years: DropdownData[], seasons: DropdownData[]) {
    return [
      {
        label: 'Year',
        value: Number(this.route.snapshot.params['year']),
        param: 'year',
        options: years,
        change: (event: any) => this.yearChange(event),
      },
      {
        label: 'Season',
        param: 'season',
        value: this.route.snapshot.params['season'],
        options: seasons,
        change: (event: any) => this.seasonChange(event),
      },
      {
        label: 'Media',
        value: this.route.snapshot.queryParams['filter'],
        param: 'filter',
        options: this.medias,
      },
    ];
  }

  yearChange(event: any) {
    this.router.navigate(
      ['/season', event.value, this.route.snapshot.params['season']],
      {
        relativeTo: this.route,
        queryParams: this.getQueryParamstWithDefaultPagination(),
        queryParamsHandling: 'merge',
      }
    );
  }

  seasonChange(event: any) {
    this.router.navigate(
      ['/season', this.route.snapshot.params['year'], event.value],
      {
        relativeTo: this.route,
        queryParams: this.getQueryParamstWithDefaultPagination(),
        queryParamsHandling: 'merge',
      }
    );
  }

  seasonOptions = (seasons: any, params: ParamMap) =>
    seasons.labels.find((s: any) => s.year === Number(params.get('year')))
      .labels;

  getSeasonAnimes = (params: ParamMap, queryParams: ParamMap) =>
    this.seasonService.getSeasonData$({
      year: params.get('year') ?? new Date().getFullYear(),
      season: params.get('season') ?? this.getCurrentSeason(),
      filter: queryParams.get('filter') ?? 'tv',
      page: queryParams.get('page') ?? 1,
      limit: queryParams.get('limit') ?? 16,
    });

  updateRouteQueryParams(updatedParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(event: PaginatorState) {
    const updatedParams = {
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
      limit: 10,
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
