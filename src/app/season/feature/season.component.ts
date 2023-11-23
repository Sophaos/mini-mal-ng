import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { SeasonsService } from '../data-access/seasons.service';
import { __param } from 'tslib';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent {
  defaultQueryParams = {
    page: 1,
    limit: 10,
    filter: 'tv',
  };

  yearFormControl = new FormControl(Number(this.route.snapshot.params['year']));
  seasonFormControl = new FormControl(this.route.snapshot.params['season']);
  mediaFormControl = new FormControl(
    this.route.snapshot.queryParams['filter'] ?? this.defaultQueryParams.filter
  );

  year$ = this.yearFormControl.valueChanges.pipe(
    startWith(Number(this.route.snapshot.params['year'])),
    tap((res) =>
      this.router.navigate(
        ['/season', res, this.route.snapshot.params['season']],
        {
          relativeTo: this.route,
          queryParams: this.defaultQueryParams,
          queryParamsHandling: 'merge',
        }
      )
    )
  );

  season$ = this.seasonFormControl.valueChanges.pipe(
    startWith(this.route.snapshot.params['season']),
    tap((res) => {
      this.router.navigate(
        ['/season', this.route.snapshot.params['year'], res],
        {
          relativeTo: this.route,
          queryParams: {
            ...this.defaultQueryParams,
            ...this.route.snapshot.queryParams,
          },
          queryParamsHandling: 'merge',
        }
      );
    }),
    tap((res) => console.log(res, 'coco'))
  );

  media$ = this.mediaFormControl.valueChanges.pipe(
    startWith(
      this.route.snapshot.queryParams['filter'] ??
        this.defaultQueryParams.filter
    ),
    tap((res) => {
      let updatedQueryParams = {
        page: 1,
        limit: 10,
        filter: res,
      };

      updatedQueryParams = {
        ...this.defaultQueryParams,
        ...updatedQueryParams,
      };
      this.updateRouteQueryParams(updatedQueryParams);
    })
  );

  seasons$ = this.seasonService.seasons$;
  animes$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
    switchMap(([params, queryParams]) =>
      this.getSeasonAnimes(params, queryParams)
    )
  );

  vm$ = combineLatest([
    this.seasons$,
    this.animes$,
    this.route.paramMap,
    this.route.queryParamMap,
    this.year$,
    this.media$,
    this.season$,
  ]).pipe(
    map(([seasons, animes, params, queryParams]) => ({
      seasons,
      seasonLabels: this.getSeasonData(seasons, params),
      pagination: this.getPagination(queryParams, animes),
      animes,
    })),
    tap((res) => console.log(res))
  );

  layout: any = 'list';
  activeItem: MenuItem | undefined;
  year = new Date().getFullYear();
  medias: any = [
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
  getSeasonData(seasons: any, params: ParamMap) {
    const labels = seasons.labels.find(
      (s: any) => s.year === Number(params.get('year'))
    ).labels;
    return {
      labels,
      season: labels.find((l: any) => l.label === params.get('season')),
    };
  }

  getYear = (year: number) => year;

  getPagination = (queryParams: ParamMap, animes: any) => ({
    first:
      (Number(queryParams.get('page')) - 1) * Number(queryParams.get('limit')),
    rows: Number(queryParams.get('limit')),
    total: animes.pagination.items.total,
  });

  getSeasonAnimes = (params: ParamMap, queryParams: ParamMap) =>
    this.seasonService.getSeason$({
      year: Number(params.get('year')),
      season: params.get('season') ?? this.getCurrentSeason(),
      filter: queryParams.get('filter') ?? 'tv',
      page: Number(queryParams.get('page')),
      limit: Number(queryParams.get('limit')),
    });

  updateRouteQueryParams(updatedParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(event: PaginatorState) {
    const currentParams = this.route.snapshot.queryParams;
    const updatedParams = {
      ...currentParams,
      page: (event.page ?? 0) + 1,
      limit: event.rows,
    };
    this.updateRouteQueryParams(updatedParams);
  }

  onActiveItemChange(event: MenuItem) {
    const year = this.route.snapshot.params['year'];
    this.router.navigate(['/season', year, event.label]);
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
